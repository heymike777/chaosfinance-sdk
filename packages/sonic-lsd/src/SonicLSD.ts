import { Keypair, PublicKey } from "@solana/web3.js";
import { SonicLSDClient, SolanaProvider, ProgramIds } from "./provider/SonicLSDClient";
import { StakingService } from "./staking/StakingService";
import { LSTService } from "./lst/LSTService";

export interface SonicLSDConfig {
  restEndpoint: string;
  lsdProgramId: string;
  stakeManagerAddress: string;
  projectId: string;
}

export class SonicLSD {
  private client: SonicLSDClient;
  private stakingService: StakingService;
  private lstService: LSTService;

  constructor(config: SonicLSDConfig) {
    this.client = new SonicLSDClient();
    this.client.registerChain(
      config.restEndpoint,
      config.lsdProgramId,
      config.stakeManagerAddress,
      config.projectId
    );
    
    this.stakingService = new StakingService(this.client);
    this.lstService = new LSTService(this.client);
  }

  /**
   * Set keypair for this instance
   * @param keypair Solana keypair
   */
  public setKeypair(keypair: Keypair) {
    this.client.setKeypair(keypair);
  }

  /**
   * Set wallet with custom signing functions (for frontend usage)
   * @param signTransaction
   * @param signAllTransactions
   * @param publicKey
   */
  public setWallet(
    signTransaction: (tx: any) => Promise<any>,
    signAllTransactions: (txs: any[]) => Promise<any[]>,
    publicKey: PublicKey
  ) {
    this.client.registerWallet(signTransaction, signAllTransactions, publicKey);
  }

  /**
   * Get the underlying client instance
   */
  public getClient(): SonicLSDClient {
    return this.client;
  }

  /**
   * Get staking service
   */
  public getStaking(): StakingService {
    return this.stakingService;
  }

  /**
   * Get LST service
   */
  public getLST(): LSTService {
    return this.lstService;
  }

  /**
   * Get user's public key
   */
  public getPublicKey(): PublicKey | undefined {
    const provider = this.client.getProvider();
    return provider.publicKey;
  }

  /**
   * Check if wallet is connected
   */
  public isWalletConnected(): boolean {
    const provider = this.client.getProvider();
    return !!(provider.publicKey && provider.signTransaction);
  }
}

// Export types for convenience
export type { SolanaProvider, ProgramIds } from "./provider/SonicLSDClient";
export type { WithdrawInfo } from "./staking/StakingService"; 