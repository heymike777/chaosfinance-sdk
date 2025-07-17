import { Keypair, PublicKey } from "@solana/web3.js";
import { AnchorProvider, Program, setProvider } from "@coral-xyz/anchor";
import {
  getConnection,
  provider,
  SignAllTransactions,
  SignTransaction,
} from "../provider";
import { IDL, LsdProgram } from "../idl/lsd_program";

class AnchorProgram {
  program: Program<LsdProgram> | null = null;

  constructor() {}

  public init() {
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

    const programId = new PublicKey(provider._programIds.lsdProgramId);
    const program = new Program<LsdProgram>(IDL, programId);

    this.program = program;

    this.updateTokenMintProgramIds();
  }

  public async updateTokenMintProgramIds() {
    if (!this.program) return;
    try {
      const stakeManagerAccount = await this.program.account.stakeManager.fetch(
        provider._programIds.stakeManagerAddress
      );
      provider._programIds.lsdTokenMintAddress =
        stakeManagerAccount.lsdTokenMint.toString();
      provider._programIds.sonicTokenMintAddress =
        stakeManagerAccount.sonicTokenMint.toString();
    } catch (err: any) {
      console.log(err);
    }
  }
}

export const anchorProgram = new AnchorProgram();

export const initAnchorProgram = () => {
  if (!provider._provider) return;
  anchorProgram.init();
};
