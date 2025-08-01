// @ts-nocheck
import { Keypair, Transaction } from "@solana/web3.js";
import {
  LsdClient,
  SolanaProvider,
  ProgramIds,
} from "@heymike/chaosfinance-svm";

/*
 * Utility: convert a generated Keypair into the signer interface
 * expected by the SDK.  In real projects you would load an existing
 * keypair (file, env, secret-manager, …) instead of generating one.
 */
const makeSigner = (kp: Keypair) => ({
  signTransaction: async (tx: Transaction) => {
    tx.sign(kp);
    return tx;
  },
  signAllTransactions: async (txs: Transaction[]) => {
    txs.forEach((tx) => tx.sign(kp));
    return txs;
  },
  publicKey: kp.publicKey,
});

async function main() {
  // ---------------------------------------------------------------------
  // 1.  Prepare providers (RPC endpoint + wallet) for two separate users
  // ---------------------------------------------------------------------
  const keypairA = Keypair.generate();
  const keypairB = Keypair.generate();

  const providerA: SolanaProvider = {
    restEndpoint: "https://api.mainnet-beta.solana.com",
    ...makeSigner(keypairA),
  };

  const providerB: SolanaProvider = {
    restEndpoint: "https://api.mainnet-beta.solana.com",
    ...makeSigner(keypairB),
  };

  // ---------------------------------------------------------------------
  // 2.  Chain-level identifiers (replace with real program IDs)
  // ---------------------------------------------------------------------
  const programIds: ProgramIds = {
    lsdProgramId: "ENTER_LSD_PROGRAM_ID_HERE",
    stakeManagerAddress: "ENTER_STAKE_MANAGER_ADDRESS_HERE",
  };

  // ---------------------------------------------------------------------
  // 3.  Create independent SDK instances for each wallet
  // ---------------------------------------------------------------------
  const sdkA = new LsdClient(providerA, programIds, "project-a");
  const sdkB = new LsdClient(providerB, programIds, "project-b");

  // ---------------------------------------------------------------------
  // 4.  Interact with the chain.  Because the underlying SDK uses a
  //     global provider under the hood, run calls sequentially when
  //     switching between instances to avoid race conditions.
  // ---------------------------------------------------------------------

  const balanceA = await sdkA.getUserSolBalance();
  console.log("User A SOL balance:", balanceA);

  const balanceB = await sdkB.getUserSolBalance();
  console.log("User B SOL balance:", balanceB);

  // Stake 1 token for user A
  await sdkA.stakeToken("1");
  console.log("User A staked 1 token");

  // Withdraw any claimable amount for user B
  await sdkB.withdrawToken();
  console.log("User B withdrew claimable amount");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
}); 