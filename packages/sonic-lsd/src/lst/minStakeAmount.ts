import { anchorProgram } from "../anchorProgram";
import { provider } from "../provider";
import { chainAmountToHuman } from "../utils/numUtil";

/**
 * Get minimum stake amount from stakeManager
 * @returns minStakeAmount
 */
export const getUserMinStakeAmount = async () => {
  const { program } = anchorProgram;
  if (!program) return;

  const stakeManagerAccount = await program.account.stakeManager.fetch(
    provider._programIds.stakeManagerAddress
  );

  return chainAmountToHuman(stakeManagerAccount.minStakeAmount.toString());
};
