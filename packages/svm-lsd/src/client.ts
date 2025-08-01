import {
  SolanaProvider,
  ProgramIds,
  register,
  updatePublicKey,
} from "./provider";

import {
  getUserLstBalance,
  getUserSolBalance,
  getUserStakedAmount,
  getUserStakingTokenBalance,
  getTotalLstAmount,
  getTotalStakedAmount,
  getLstRate,
  getLstApr,
  getTokenProgramIds,
  getUserMinStakeAmount,
  getUnbondingDuration,
} from "./lst";

import {
  stakeToken,
  unstakeLstToken,
  withdrawToken,
  getUserWithdrawInfo,
  WithdrawInfo,
} from "./staking";

/**
 * Lightweight wrapper around the existing functional API that enables
 * consumers (for example a Node.js service) to keep *separate* SDK instances
 * – each with their own provider / key-pair – without interfering with one
 * another.  Internally, every public method re-registers its own provider
 * before delegating to the original function, ensuring that the correct
 * wallet & connection details are applied.
 *
 * NOTE: because the underlying implementation still relies on a global
 * singleton under the hood, calls on *different* client instances should be
 * awaited sequentially to avoid provider collisions.  This class at least
 * provides ergonomic separation for typical sequential workflows.
 */
export class LsdClient {
  private readonly solanaProvider: SolanaProvider;
  private readonly programIds: ProgramIds;
  private readonly projectId: string;

  constructor(
    solanaProvider: SolanaProvider,
    programIds: ProgramIds,
    projectId: string
  ) {
    this.solanaProvider = solanaProvider;
    this.programIds = programIds;
    this.projectId = projectId;
  }

  /* --------------------------------------------------------------------- */
  /* Internal helpers                                                      */
  /* --------------------------------------------------------------------- */

  /**
   * Ensure that the global provider singleton points at *this* instance's
   * configuration before executing a public SDK call.
   */
  private syncProvider() {
    register(this.solanaProvider, this.projectId);
    updatePublicKey(this.solanaProvider.publicKey);
  }

  /* --------------------------------------------------------------------- */
  /* Balance helpers                                                       */
  /* --------------------------------------------------------------------- */

  async getUserSolBalance() {
    this.syncProvider();
    return getUserSolBalance();
  }

  async getUserLstBalance() {
    this.syncProvider();
    return getUserLstBalance(this.programIds);
  }

  async getUserStakingTokenBalance() {
    this.syncProvider();
    return getUserStakingTokenBalance(this.programIds);
  }

  async getUserStakedAmount() {
    this.syncProvider();
    return getUserStakedAmount(this.programIds);
  }

  /* --------------------------------------------------------------------- */
  /* LST-level helpers                                                     */
  /* --------------------------------------------------------------------- */

  async getTotalLstAmount() {
    this.syncProvider();
    return getTotalLstAmount(this.programIds);
  }

  async getTotalStakedAmount() {
    this.syncProvider();
    return getTotalStakedAmount(this.programIds);
  }

  async getLstRate() {
    this.syncProvider();
    return getLstRate(this.programIds);
  }

  async getLstApr(defaultApr = 0.09) {
    this.syncProvider();
    return getLstApr(this.programIds, defaultApr);
  }

  async getTokenProgramIds() {
    this.syncProvider();
    return getTokenProgramIds(this.programIds);
  }

  async getUserMinStakeAmount() {
    this.syncProvider();
    return getUserMinStakeAmount(this.programIds);
  }

  async getUnbondingDuration() {
    this.syncProvider();
    return getUnbondingDuration(this.programIds);
  }

  /* --------------------------------------------------------------------- */
  /* Staking flows                                                         */
  /* --------------------------------------------------------------------- */

  async stakeToken(amount: string | number) {
    this.syncProvider();
    return stakeToken(amount, this.programIds);
  }

  async unstakeLstToken(amount: string | number) {
    this.syncProvider();
    return unstakeLstToken(amount, this.programIds);
  }

  async withdrawToken() {
    this.syncProvider();
    return withdrawToken(this.programIds);
  }

  async getUserWithdrawInfo(): Promise<WithdrawInfo | undefined> {
    this.syncProvider();
    return getUserWithdrawInfo(this.programIds);
  }
} 