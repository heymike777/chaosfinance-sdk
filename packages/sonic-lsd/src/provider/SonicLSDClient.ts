import { Connection, PublicKey, Transaction, Keypair } from "@solana/web3.js";
import { AnchorProvider, Program, setProvider } from "@coral-xyz/anchor";
import { IDL, LsdProgram } from "../idl/lsd_program";
import { isEmptyString } from "../utils/commonUtil";
import {
  ERR_EMPTY_ENDPOINT,
  ERR_EMPTY_PROGRAM_ID,
  ERR_EMPTY_PROJECT_ID,
} from "../constants";

export type SignTransaction = (tx: Transaction) => Promise<Transaction>;
export type SignAllTransactions = (
  txs: Transaction[]
) => Promise<Transaction[]>;

export interface SolanaProvider {
  restEndpoint: string;
  signTransaction: SignTransaction;
  signAllTransactions: SignAllTransactions;
  publicKey: PublicKey;
}

export interface ProgramIds {
  lsdProgramId: string;
  stakeManagerAddress: string;
}

interface ProgramIdsWithTokenMint extends ProgramIds {
  lsdTokenMintAddress: string;
  sonicTokenMintAddress: string;
}

export class SonicLSDClient {
  private _provider: Partial<SolanaProvider>;
  private _programIds: ProgramIdsWithTokenMint;
  private _connection: Connection | null;
  private _projectId: string;
  private _anchorProgram: Program<LsdProgram> | null;
  private _keypair: Keypair | null;

  constructor() {
    this._provider = {};
    this._programIds = {
      lsdProgramId: "",
      stakeManagerAddress: "",
      lsdTokenMintAddress: "",
      sonicTokenMintAddress: "",
    };
    this._connection = null;
    this._projectId = "";
    this._anchorProgram = null;
    this._keypair = null;
  }

  /**
   * Initialize the client with provider and program IDs
   * @param solanaProvider provider info
   * @param programIds addresses of programs
   * @param projectId project id
   * @throws Error if any of programIds, projectId, restEndpoint is empty
   */
  public register(
    solanaProvider: SolanaProvider,
    programIds: ProgramIds,
    projectId: string
  ) {
    if (isEmptyString(solanaProvider.restEndpoint)) {
      throw new Error(ERR_EMPTY_ENDPOINT);
    }
    if (
      isEmptyString(programIds.lsdProgramId) ||
      isEmptyString(programIds.stakeManagerAddress)
    ) {
      throw new Error(ERR_EMPTY_PROGRAM_ID);
    }
    if (isEmptyString(projectId)) {
      throw new Error(ERR_EMPTY_PROJECT_ID);
    }

    this._provider = solanaProvider;
    this._programIds.lsdProgramId = programIds.lsdProgramId;
    this._programIds.stakeManagerAddress = programIds.stakeManagerAddress;
    this._connection = new Connection(solanaProvider.restEndpoint);
    this._projectId = projectId;

    this.initAnchorProgram();
  }

  /**
   * Initialize the client with chain configuration
   * @param restEndpoint RPC rest endpoint
   * @param lsdProgramId
   * @param stakeManagerAddress
   * @param projectId
   * @throws Error if any of programIds, projectId, restEndpoint is empty
   */
  public registerChain(
    restEndpoint: string,
    lsdProgramId: string,
    stakeManagerAddress: string,
    projectId: string
  ) {
    if (isEmptyString(restEndpoint)) {
      throw new Error(ERR_EMPTY_ENDPOINT);
    }
    if (isEmptyString(lsdProgramId) || isEmptyString(stakeManagerAddress)) {
      throw new Error(ERR_EMPTY_PROGRAM_ID);
    }
    if (isEmptyString(projectId)) {
      throw new Error(ERR_EMPTY_PROJECT_ID);
    }

    this._provider.restEndpoint = restEndpoint;
    this._programIds.lsdProgramId = lsdProgramId;
    this._programIds.stakeManagerAddress = stakeManagerAddress;
    this._connection = new Connection(restEndpoint);
    this._projectId = projectId;

    this.initAnchorProgram();
  }

  /**
   * Register wallet with signing functions
   * @param signTransaction
   * @param signAllTransactions
   * @param publicKey
   */
  public registerWallet(
    signTransaction: SignTransaction,
    signAllTransactions: SignAllTransactions,
    publicKey: PublicKey
  ) {
    this._provider.signTransaction = signTransaction;
    this._provider.signAllTransactions = signAllTransactions;
    this._provider.publicKey = publicKey;

    this.initAnchorProgram();
  }

  /**
   * Set keypair for Node.js usage
   * @param keypair Solana keypair
   */
  public setKeypair(keypair: Keypair) {
    this._keypair = keypair;
    
    // Create signing functions for the keypair
    const signTransaction: SignTransaction = async (tx: Transaction) => {
      tx.feePayer = keypair.publicKey;
      tx.recentBlockhash = (await this._connection!.getLatestBlockhash()).blockhash;
      tx.sign(keypair);
      return tx;
    };

    const signAllTransactions: SignAllTransactions = async (txs: Transaction[]) => {
      const blockhash = (await this._connection!.getLatestBlockhash()).blockhash;
      return txs.map(tx => {
        tx.feePayer = keypair.publicKey;
        tx.recentBlockhash = blockhash;
        tx.sign(keypair);
        return tx;
      });
    };

    this.registerWallet(signTransaction, signAllTransactions, keypair.publicKey);
  }

  /**
   * Update user's publicKey
   * @param publicKey user's publicKey
   */
  public updatePublicKey(publicKey: PublicKey) {
    if (this._provider) {
      this._provider.publicKey = publicKey;
      this.initAnchorProgram();
    }
  }

  /**
   * Get connection instance
   */
  public getConnection(): Connection | null {
    if (this._provider && this._provider.restEndpoint) {
      return new Connection(this._provider.restEndpoint);
    }
    return this._connection;
  }

  /**
   * Get token program ID
   */
  public async getTokenProgramId(sonicTokenMintAddress: string): Promise<string | undefined> {
    const connection = this.getConnection();
    if (!connection || !this._provider) return;

    const sonicAccountInfo = await connection.getAccountInfo(
      new PublicKey(sonicTokenMintAddress)
    );
    if (!sonicAccountInfo) return;

    return sonicAccountInfo.owner.toString();
  }

  /**
   * Get program IDs
   */
  public getProgramIds(): ProgramIdsWithTokenMint {
    return { ...this._programIds };
  }

  /**
   * Get provider
   */
  public getProvider(): Partial<SolanaProvider> {
    return { ...this._provider };
  }

  /**
   * Get project ID
   */
  public getProjectId(): string {
    return this._projectId;
  }

  /**
   * Get anchor program
   */
  public getAnchorProgram(): Program<LsdProgram> | null {
    return this._anchorProgram;
  }

  /**
   * Get keypair
   */
  public getKeypair(): Keypair | null {
    return this._keypair;
  }

  /**
   * Initialize anchor program
   */
  private initAnchorProgram() {
    const connection = this.getConnection();
    if (!connection || !this._provider) return;

    const anchorProvider = new AnchorProvider(
      connection,
      {
        signTransaction: this._provider.signTransaction as any,
        signAllTransactions: this._provider.signAllTransactions as any,
        publicKey: this._provider.publicKey || PublicKey.default,
      },
      {}
    );
    setProvider(anchorProvider);

    const programId = new PublicKey(this._programIds.lsdProgramId);
    const program = new Program<LsdProgram>(IDL, programId);

    this._anchorProgram = program;

    this.updateTokenMintProgramIds();
  }

  /**
   * Update token mint program IDs
   */
  private async updateTokenMintProgramIds() {
    if (!this._anchorProgram) return;
    try {
      const stakeManagerAccount = await this._anchorProgram.account.stakeManager.fetch(
        this._programIds.stakeManagerAddress
      );
      this._programIds.lsdTokenMintAddress =
        stakeManagerAccount.lsdTokenMint.toString();
      this._programIds.sonicTokenMintAddress =
        stakeManagerAccount.sonicTokenMint.toString();
    } catch (err: any) {
      console.log(err);
    }
  }
} 