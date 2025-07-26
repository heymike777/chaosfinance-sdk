// New class-based API for Node.js with multiple keypairs
export { SonicLSD } from "./SonicLSD";
export type { SonicLSDConfig } from "./SonicLSD";

// Legacy static API (for backward compatibility)
export {
  type SolanaProvider,
  type ProgramIds,
  register,
  updatePublicKey,
  registerChain,
  registerWallet,
} from "./provider";

export {
  stakeSonic,
  unstakeLstSonic,
  getUserWithdrawInfo,
  withdrawSonic,
  type WithdrawInfo,
} from "./staking";

export {
  getLsdTokenAddress,
  getLstApr,
  getLstRate,
  getPlatformFeeCommission,
  getUserLstBalance,
  getUserMinStakeAmount,
  getUserSolBalance,
  getUserSonicBalance,
  getTotalLstAmount,
  getTotalStakedAmount,
  getUserStakedAmount,
} from "./lst";
