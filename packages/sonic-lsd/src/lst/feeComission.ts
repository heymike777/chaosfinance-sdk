import { anchorProgram } from "../anchorProgram";
import { getConnection, provider } from "../provider";

/**
 * Get platform fee commission
 * @returns platform fee commission
 */
export const getPlatformFeeCommission = async (): Promise<
  string | undefined
> => {
  const { program } = anchorProgram;
  const connection = getConnection();
  if (!program || !connection) return;

  const stakeManagerAccount = await program.account.stakeManager.fetch(
    provider._programIds.stakeManagerAddress
  );

  return stakeManagerAccount.platformFeeCommission.toString();
};
