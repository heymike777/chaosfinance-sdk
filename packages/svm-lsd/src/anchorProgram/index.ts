import { Keypair, PublicKey } from "@solana/web3.js";
import { AnchorProvider, Program, setProvider } from "@coral-xyz/anchor";
import {
  getConnection,
  ProgramIds,
  provider,
  SignAllTransactions,
  SignTransaction,
} from "../provider";
import { IDL, LsdProgram } from "../idl/lsd_program";
import { getTotalStakedAmount } from "../lst/lstAmount";
import { getUserLstBalance, getUserStakingTokenBalance } from "../lst/balance";
import {
  getUserWithdrawInfo,
  stakeToken,
  unstakeLstToken,
  withdrawToken,
} from "../staking";

export class AnchorProgram {
  lsdProgramId: string = "";
  stakeManagerAddress: string = "";
  lsdTokenMintAddress: string = "";
  stakingTokenMintAddress: string = "";

  program: Program<LsdProgram> | null = null;
  initialized: boolean = false;

  constructor(programIds: ProgramIds) {
    const { lsdProgramId, stakeManagerAddress } = programIds;
    this.lsdProgramId = lsdProgramId;
    this.stakeManagerAddress = stakeManagerAddress;
  }

  public async init() {
    const connection = getConnection();
    if (!connection || !provider._provider) return;

    const anchorProvider = new AnchorProvider(
      connection,
      {
        signTransaction: provider._provider.signTransaction as any,
        signAllTransactions: provider._provider.signAllTransactions as any,
        publicKey: provider._provider.publicKey || PublicKey.default,
      },
      {}
    );
    setProvider(anchorProvider);

    const programId = new PublicKey(this.lsdProgramId);
    const program = new Program<LsdProgram>(IDL, programId);

    this.program = program;

    await this.updateTokenMintProgramIds();
  }

  public async updateTokenMintProgramIds() {
    if (!this.program) return;
    const stakeManagerAccount = await this.program.account.stakeManager.fetch(
      this.stakeManagerAddress
    );
    this.lsdTokenMintAddress = stakeManagerAccount.lsdTokenMint.toString();
    this.stakingTokenMintAddress =
      stakeManagerAccount.stakingTokenMint.toString();
    // provider._programIds.lsdTokenMintAddress =
    //   stakeManagerAccount.lsdTokenMint.toString();
    // provider._programIds.stakingTokenMintAddress =
    //   stakeManagerAccount.stakingTokenMint.toString();

    // const totalStakedAmount = await getTotalStakedAmount();
    // console.log({ totalStakedAmount });

    // const tokenBalance = await getUserStakingTokenBalance();
    // console.log({ tokenBalance });
    // const lstBalance = await getUserLstBalance();
    // console.log({ lstBalance });

    // if (this.initialized) return;
    // this.initialized = true;
    // const tx = await stakeToken(1);
    // const tx = await unstakeLstToken(1);
    // console.log(tx);
    // await getUserWithdrawInfo();
    // const tx = await withdrawToken();
    // console.log(tx);
  }
}

// export const anchorProgram = new AnchorProgram();

// export const initAnchorProgram = () => {
//   if (!provider._provider) return;
//   anchorProgram.init();
// };
