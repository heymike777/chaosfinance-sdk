import { provider } from "../provider";

export { getUserMinStakeAmount } from "./minStakeAmount";
export { getLstApr } from "./apr";
export { getLstRate } from "./rate";
export { getPlatformFeeCommission } from "./feeComission";
export {
  getUserLstBalance,
  getUserSolBalance,
  getUserSonicBalance,
  getUserStakedAmount,
} from "./balance";
export { getTotalLstAmount, getTotalStakedAmount } from "./lstAmount";

export const getLsdTokenAddress = () => {
  return {
    lsdTokenMintAddress: provider._programIds.lsdTokenMintAddress,
    sonicTokenMintAddress: provider._programIds.sonicTokenMintAddress,
  };
};
