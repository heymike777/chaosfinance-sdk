import { PublicKey } from "@solana/web3.js";
import { SonicLSDClient } from "../provider/SonicLSDClient";
import { getUserMinStakeAmount } from "./minStakeAmount";
import { getLstApr } from "./apr";
import { getLstRate } from "./rate";
import { getPlatformFeeCommission } from "./feeComission";
import {
  getUserLstBalance,
  getUserSolBalance,
  getUserSonicBalance,
  getUserStakedAmount,
} from "./balance";
import { getTotalLstAmount, getTotalStakedAmount } from "./lstAmount";
import { provider as globalProvider } from "../provider";
import { anchorProgram as globalAnchorProgram } from "../anchorProgram";

export class LSTService {
  private client: SonicLSDClient;

  constructor(client: SonicLSDClient) {
    this.client = client;
  }

  /**
   * Get LSD token addresses
   */
  public getLsdTokenAddress() {
    const programIds = this.client.getProgramIds();
    return {
      lsdTokenMintAddress: programIds.lsdTokenMintAddress,
      sonicTokenMintAddress: programIds.sonicTokenMintAddress,
    };
  }

  /**
   * Temporarily set global provider state and execute function
   */
  private async withGlobalProvider<T>(fn: () => Promise<T>): Promise<T> {
    // Store original state
    const originalProvider = { ...globalProvider };
    const originalAnchorProgram = globalAnchorProgram.program;

    try {
      // Set global state to match our client
      Object.assign(globalProvider, {
        _provider: this.client.getProvider(),
        _programIds: this.client.getProgramIds(),
        _connection: this.client.getConnection(),
        _projectId: this.client.getProjectId(),
      });
      globalAnchorProgram.program = this.client.getAnchorProgram();

      // Execute the function
      return await fn();
    } finally {
      // Restore original state
      Object.assign(globalProvider, originalProvider);
      globalAnchorProgram.program = originalAnchorProgram;
    }
  }

  /**
   * Get user's minimum stake amount
   */
  public async getUserMinStakeAmount(): Promise<string | undefined> {
    return this.withGlobalProvider(() => getUserMinStakeAmount());
  }

  /**
   * Get LST APR
   */
  public async getLstApr(): Promise<number | undefined> {
    return this.withGlobalProvider(() => getLstApr());
  }

  /**
   * Get LST rate
   */
  public async getLstRate(): Promise<string | undefined> {
    return this.withGlobalProvider(() => getLstRate());
  }

  /**
   * Get platform fee commission
   */
  public async getPlatformFeeCommission(): Promise<string | undefined> {
    return this.withGlobalProvider(() => getPlatformFeeCommission());
  }

  /**
   * Get user's LST balance
   */
  public async getUserLstBalance(): Promise<string | undefined> {
    return this.withGlobalProvider(() => getUserLstBalance());
  }

  /**
   * Get user's SOL balance
   */
  public async getUserSolBalance(): Promise<string | undefined> {
    return this.withGlobalProvider(() => getUserSolBalance());
  }

  /**
   * Get user's SONIC balance
   */
  public async getUserSonicBalance(): Promise<string | undefined> {
    return this.withGlobalProvider(() => getUserSonicBalance());
  }

  /**
   * Get user's staked amount
   */
  public async getUserStakedAmount(): Promise<string | undefined> {
    return this.withGlobalProvider(() => getUserStakedAmount());
  }

  /**
   * Get total LST amount
   */
  public async getTotalLstAmount(): Promise<string | undefined> {
    return this.withGlobalProvider(() => getTotalLstAmount());
  }

  /**
   * Get total staked amount
   */
  public async getTotalStakedAmount(): Promise<string | undefined> {
    return this.withGlobalProvider(() => getTotalStakedAmount());
  }
} 