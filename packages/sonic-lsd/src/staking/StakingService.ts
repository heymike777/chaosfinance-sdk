import {
  Keypair,
  PublicKey,
  SystemProgram,
  SYSVAR_RENT_PUBKEY,
  Transaction,
  TransactionResponse,
} from "@solana/web3.js";
import {
  ASSOCIATED_TOKEN_PROGRAM_ID,
  createAssociatedTokenAccountInstruction,
  getAssociatedTokenAddress,
} from "@solana/spl-token";
import { createMemoInstruction } from "@solana/spl-memo";
import { BN } from "@coral-xyz/anchor";
import { SonicLSDClient } from "../provider/SonicLSDClient";
import {
  getSplTokenAccount,
  isSolanaCancelError,
  sendSolanaTransaction,
} from "../utils/solanaUtil";
import {
  chainAmountToHuman,
  isValidNum,
  toChainAmount,
} from "../utils/numUtil";
import {
  ERR_NOT_A_VALID_NUMBER,
  ERR_SPL_TOKEN_ACCOUNT_NOT_FOUND,
  ERR_TX_FAILED,
  ERR_TX_REJECTED,
  ERR_WALLET_NOT_REGISTERED,
} from "../constants";
import { sleep } from "../utils/commonUtil";
import { getLsdTokenAddress } from "../lst";

const POOL_SEED = "pool_seed";
const TX_RETRY_COUNT = 20;

export interface WithdrawInfo {
  overallAmount: string;
  claimableAmount: string;
  remainingTimeInSeconds: number;
}

export class StakingService {
  private client: SonicLSDClient;

  constructor(client: SonicLSDClient) {
    this.client = client;
  }

  /**
   * Stake SONIC to LSD Program
   * @param amount amount of SONIC to stake
   * @returns transaction hash
   */
  public async stakeSonic(amount: string | number): Promise<string | undefined> {
    if (!isValidNum(amount)) {
      throw new Error(ERR_NOT_A_VALID_NUMBER);
    }

    try {
      const provider = this.client.getProvider();
      if (!provider.publicKey || !provider.signTransaction)
        throw new Error(ERR_WALLET_NOT_REGISTERED);

      const connection = this.client.getConnection();
      if (!provider || !connection || !this.client.getAnchorProgram()) return;
      const userAddress = provider.publicKey.toString();

      const { sonicTokenMintAddress } = getLsdTokenAddress();
      const tokenProgramId = await this.client.getTokenProgramId(sonicTokenMintAddress);
      if (!tokenProgramId) return;

      const programIds = this.client.getProgramIds();
      const lsdProgramPubkey = new PublicKey(programIds.lsdProgramId);
      const stakeManagerPubkey = new PublicKey(programIds.stakeManagerAddress);
      const lsdTokenMintPubkey = new PublicKey(programIds.lsdTokenMintAddress);
      const tokenProgramPubkey = new PublicKey(tokenProgramId);
      const sonicTokenMintPubkey = new PublicKey(
        programIds.sonicTokenMintAddress
      );

      const [stakePoolPubkey] = PublicKey.findProgramAddressSync(
        [Buffer.from(POOL_SEED), stakeManagerPubkey.toBuffer()],
        lsdProgramPubkey
      );

      const transaction = new Transaction();

      const userLsdTokenAddress = await getAssociatedTokenAddress(
        lsdTokenMintPubkey,
        provider.publicKey,
        true,
        tokenProgramPubkey
      );
      const userSonicTokenAddress = await getAssociatedTokenAddress(
        sonicTokenMintPubkey,
        provider.publicKey,
        true,
        tokenProgramPubkey
      );
      const poolSonicTokenAddress = await getAssociatedTokenAddress(
        sonicTokenMintPubkey,
        stakePoolPubkey,
        true,
        tokenProgramPubkey
      );

      const userLsdTokenAccount = await connection.getAccountInfo(
        new PublicKey(userLsdTokenAddress)
      );

      if (!userLsdTokenAccount) {
        const createInstruction = createAssociatedTokenAccountInstruction(
          provider.publicKey,
          userLsdTokenAddress,
          provider.publicKey,
          lsdTokenMintPubkey,
          tokenProgramPubkey
        );
        transaction.add(createInstruction);
      }

      const anchorInstruction = await this.client.getAnchorProgram()!.methods
        .stake(toChainAmount(amount))
        .accounts({
          user: provider.publicKey,
          stakeManager: stakeManagerPubkey,
          stakePool: stakePoolPubkey,
          lsdTokenMint: lsdTokenMintPubkey,
          sonicTokenMint: sonicTokenMintPubkey,
          userLsdTokenAccount: userLsdTokenAddress,
          userSonicTokenAccount: userSonicTokenAddress,
          poolSonicTokenAccount: poolSonicTokenAddress,
          tokenProgram: tokenProgramPubkey,
          associatedTokenProgram: ASSOCIATED_TOKEN_PROGRAM_ID,
          systemProgram: SystemProgram.programId,
        })
        .instruction();
      transaction.add(anchorInstruction);

      const memoInstruction = createMemoInstruction(`1:${this.client.getProjectId()}`, [
        provider.publicKey,
      ]);
      transaction.add(memoInstruction);

      const txHash = await sendSolanaTransaction(
        transaction,
        connection,
        provider.signTransaction,
        provider.publicKey
      );

      let retryCount = 0;
      let transactionDetail: TransactionResponse | null | undefined = undefined;

      while (retryCount < TX_RETRY_COUNT && txHash) {
        retryCount++;
        transactionDetail = await connection.getTransaction(txHash, {
          commitment: "finalized",
        });
        if (transactionDetail) {
          break;
        }
        await sleep(3000);
      }

      if (!transactionDetail || transactionDetail.meta?.err) {
        throw new Error(ERR_TX_FAILED);
      }

      return txHash;
    } catch (err: any) {
      if (isSolanaCancelError(err)) {
        throw new Error(ERR_TX_REJECTED);
      }
      throw new Error(err.message);
    }
  }

  /**
   * Unstake lstSONIC from LSD Program
   * @param amount amount of lstSONIC to unstake
   * @returns transaction hash
   */
  public async unstakeLstSonic(amount: string | number): Promise<string | undefined> {
    if (!isValidNum(amount)) {
      throw new Error(ERR_NOT_A_VALID_NUMBER);
    }

    try {
      const provider = this.client.getProvider();
      if (!provider.publicKey || !provider.signTransaction)
        throw new Error(ERR_WALLET_NOT_REGISTERED);

      const connection = this.client.getConnection();
      if (!provider || !connection || !this.client.getAnchorProgram()) return;
      const userAddress = provider.publicKey.toString();

      const { sonicTokenMintAddress } = getLsdTokenAddress();
      const tokenProgramId = await this.client.getTokenProgramId(sonicTokenMintAddress);
      if (!tokenProgramId) return;

      const programIds = this.client.getProgramIds();
      const stakeManagerPubkey = new PublicKey(programIds.stakeManagerAddress);
      const lsdTokenMintPubkey = new PublicKey(programIds.lsdTokenMintAddress);
      const tokenProgramPubkey = new PublicKey(tokenProgramId);

      const splTokenAccount = await getSplTokenAccount(
        connection,
        userAddress,
        programIds.lsdTokenMintAddress
      );

      if (!splTokenAccount) {
        throw new Error(ERR_SPL_TOKEN_ACCOUNT_NOT_FOUND);
      }

      const transaction = new Transaction();

      const unstakeAccountKeypair = Keypair.generate();
      const unstakeAccountRent =
        await connection.getMinimumBalanceForRentExemption(100);

      const createAccountInstruction = SystemProgram.createAccount({
        fromPubkey: provider.publicKey,
        newAccountPubkey: unstakeAccountKeypair.publicKey,
        lamports: unstakeAccountRent,
        space: 100,
        programId: stakeManagerPubkey,
      });

      const anchorInstruction = await this.client.getAnchorProgram()!.methods
        .unstake(toChainAmount(amount))
        .accounts({
          user: provider.publicKey,
          rentPayer: provider.publicKey,
          stakeManager: stakeManagerPubkey,
          lsdTokenMint: lsdTokenMintPubkey,
          userLsdTokenAccount: splTokenAccount.pubkey,
          unstakeAccount: unstakeAccountKeypair.publicKey,
          tokenProgram: tokenProgramPubkey,
          associatedTokenProgram: ASSOCIATED_TOKEN_PROGRAM_ID,
          systemProgram: SystemProgram.programId,
          rent: SYSVAR_RENT_PUBKEY,
        })
        .instruction();

      transaction.add(anchorInstruction);

      const txHash = await sendSolanaTransaction(
        transaction,
        connection,
        provider.signTransaction,
        provider.publicKey,
        [unstakeAccountKeypair]
      );

      let retryCount = 0;
      let transactionDetail: TransactionResponse | null | undefined = undefined;

      while (retryCount < TX_RETRY_COUNT && txHash) {
        retryCount++;
        transactionDetail = await connection.getTransaction(txHash, {
          commitment: "finalized",
        });
        if (transactionDetail) {
          break;
        }
        await sleep(3000);
      }

      if (!transactionDetail || transactionDetail.meta?.err) {
        throw new Error(ERR_TX_FAILED);
      }

      return txHash;
    } catch (err: any) {
      if (isSolanaCancelError(err)) {
        throw new Error(ERR_TX_REJECTED);
      }
      throw new Error(err.message);
    }
  }

  /**
   * Get user's withdraw info from LSD Program
   * @returns user withdraw info
   */
  public async getUserWithdrawInfo(): Promise<WithdrawInfo | undefined> {
    try {
      const provider = this.client.getProvider();
      if (!provider.publicKey || !provider.signTransaction)
        throw new Error(ERR_WALLET_NOT_REGISTERED);

      const connection = this.client.getConnection();
      if (!provider || !connection || !this.client.getAnchorProgram()) return;

      const programIds = this.client.getProgramIds();
      const stakeManagerAccount =
        await this.client.getAnchorProgram()!.account.stakeManager.fetch(
          new PublicKey(programIds.stakeManagerAddress)
        );

      const { withdrawableIndex, eraSeconds, stakeInfos, sspStakingPeriod } =
        stakeManagerAccount;

      const accounts = await connection.getParsedProgramAccounts(
        new PublicKey(programIds.lsdProgramId),
        {
          filters: [
            { dataSize: 96 },
            {
              memcmp: {
                offset: 40,
                bytes: provider.publicKey.toString(),
              },
            },
          ],
        }
      );

      let overallWithdrawAmount = new BN(0);
      let withdrawableAmount = new BN(0);
      let remainingTimes: number[] = [];

      const accountRequests = accounts.map((account) => {
        return (async () => {
          try {
            if (!this.client.getAnchorProgram()) return;
            const unstakeAccount =
              await this.client.getAnchorProgram()!.account.unstakeAccount.fetch(
                account.pubkey
              );

            const { amount, withdrawIndex } = unstakeAccount;
            overallWithdrawAmount.iadd(amount);
            if (withdrawIndex.lte(withdrawableIndex)) {
              withdrawableAmount.iadd(amount);
              remainingTimes.push(0);
              return;
            }

            const _amount = withdrawIndex.sub(withdrawableIndex);
            let _total = new BN(0);
            let _endtime = new BN(0);
            let _remainingTime = new BN(0);

            if (stakeInfos.length === 0) {
              _remainingTime = sspStakingPeriod.add(eraSeconds);
            } else {
              for (let stakeInfo of stakeInfos) {
                _total.iadd(stakeInfo.amount.add(stakeInfo.reward));
                _endtime = stakeInfo.endAt;
                if (_total.gte(_amount)) {
                  break;
                }
              }
              const curTs = new BN(Math.floor(new Date().getTime() / 1000));
              _remainingTime = _endtime.add(eraSeconds).sub(curTs);
            }
            remainingTimes.push(_remainingTime);
          } catch {}
        })();
      });

      await Promise.all(accountRequests);

      const minRemainingTime = Math.min(...remainingTimes);
      return {
        overallAmount: chainAmountToHuman(overallWithdrawAmount.toString()),
        claimableAmount: chainAmountToHuman(withdrawableAmount.toString()),
        remainingTimeInSeconds: minRemainingTime < 0 ? 0 : minRemainingTime,
      };
    } catch (err: any) {}
  }

  /**
   * Withdraw unstaked SONIC
   * @returns transaction hash
   */
  public async withdrawSonic(): Promise<string | undefined> {
    try {
      const provider = this.client.getProvider();
      if (!provider.publicKey || !provider.signTransaction)
        throw new Error(ERR_WALLET_NOT_REGISTERED);

      const connection = this.client.getConnection();
      if (!provider || !connection || !this.client.getAnchorProgram()) return;
      const userAddress = provider.publicKey.toString();

      const { sonicTokenMintAddress } = getLsdTokenAddress();
      const tokenProgramId = await this.client.getTokenProgramId(sonicTokenMintAddress);
      if (!tokenProgramId) return;

      const programIds = this.client.getProgramIds();
      const stakeManagerAccount =
        await this.client.getAnchorProgram()!.account.stakeManager.fetch(
          new PublicKey(programIds.stakeManagerAddress)
        );
      const { withdrawableIndex } = stakeManagerAccount;

      const unstakeAccounts = await connection.getParsedProgramAccounts(
        new PublicKey(programIds.lsdProgramId),
        {
          filters: [
            { dataSize: 96 },
            {
              memcmp: {
                offset: 40,
                bytes: provider.publicKey.toString(),
              },
            },
          ],
        }
      );

      const transaction = new Transaction();

      const stakeManagerPubkey = new PublicKey(programIds.stakeManagerAddress);
      const lsdProgramPubkey = new PublicKey(programIds.lsdProgramId);
      const [stakePoolPubkey] = PublicKey.findProgramAddressSync(
        [Buffer.from(POOL_SEED), stakeManagerPubkey.toBuffer()],
        lsdProgramPubkey
      );
      const sonicTokenMintPubkey = new PublicKey(
        programIds.sonicTokenMintAddress
      );
      const tokenProgramPubkey = new PublicKey(tokenProgramId);

      const userSonicTokenAddress = await getAssociatedTokenAddress(
        sonicTokenMintPubkey,
        provider.publicKey,
        true,
        tokenProgramPubkey
      );

      const userSonicTokenAccount = await connection.getAccountInfo(
        userSonicTokenAddress
      );
      if (!userSonicTokenAccount) {
        const ataInstruction = createAssociatedTokenAccountInstruction(
          provider.publicKey,
          userSonicTokenAddress,
          provider.publicKey,
          sonicTokenMintPubkey,
          tokenProgramPubkey
        );
        transaction.add(ataInstruction);
      }

      const poolSonicTokenAddress = await getSplTokenAccount(
        connection,
        stakePoolPubkey.toString(),
        programIds.sonicTokenMintAddress
      );

      const accountRequests = unstakeAccounts.map((account) => {
        return (async () => {
          if (!this.client.getAnchorProgram()) return;
          const unstakeAccount =
            await this.client.getAnchorProgram()!.account.unstakeAccount.fetch(
              account.pubkey
            );
          const { withdrawIndex } = unstakeAccount;

          if (withdrawIndex.lte(withdrawableIndex)) {
            const anchorInstruction = await this.client.getAnchorProgram()!.methods
              .withdraw()
              .accounts({
                user: provider.publicKey,
                stakeManager: stakeManagerPubkey,
                stakePool: stakePoolPubkey,
                unstakeAccount: account.pubkey,
                sonicTokenMint: sonicTokenMintPubkey,
                userSonicTokenAccount: userSonicTokenAddress,
                poolSonicTokenAccount: poolSonicTokenAddress?.pubkey,
                tokenProgram: tokenProgramPubkey,
                associatedTokenProgram: ASSOCIATED_TOKEN_PROGRAM_ID,
                systemProgram: SystemProgram.programId,
              })
              .instruction();
            transaction.add(anchorInstruction);
          }
        })();
      });

      await Promise.all(accountRequests);

      const txHash = await sendSolanaTransaction(
        transaction,
        connection,
        provider.signTransaction,
        provider.publicKey
      );

      let retryCount = 0;
      let transactionDetail: TransactionResponse | null | undefined = undefined;

      while (retryCount < TX_RETRY_COUNT && txHash) {
        retryCount++;
        transactionDetail = await connection.getTransaction(txHash, {
          commitment: "finalized",
        });
        if (transactionDetail) {
          break;
        }
        await sleep(3000);
      }

      if (!transactionDetail || transactionDetail.meta?.err) {
        throw new Error(ERR_TX_FAILED);
      }

      return txHash;
    } catch (err: any) {
      if (isSolanaCancelError(err)) {
        throw new Error(ERR_TX_REJECTED);
      }
      throw new Error(err.message);
    }
  }
} 