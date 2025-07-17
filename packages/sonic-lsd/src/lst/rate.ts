import { anchorProgram } from "../anchorProgram";
import { getConnection, provider } from "../provider";
import { chainAmountToHuman } from "../utils/numUtil";

/**
 * Get LST rate
 * @returns LST rate
 */
export const getLstRate = async () => {
  const { program } = anchorProgram;
  const connection = getConnection();
  if (!program || !connection) return;

  const stakeManagerAccount = await program.account.stakeManager.fetch(
    provider._programIds.stakeManagerAddress
  );

  return chainAmountToHuman(stakeManagerAccount.rate.toString());
};
