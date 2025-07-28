import { AnchorProgram } from "../anchorProgram";
import { ERR_EMPTY_PROGRAM_ID } from "../constants";
import { getConnection, ProgramIds, provider } from "../provider";
import { isEmptyString } from "../utils/commonUtil";
import { chainAmountToHuman } from "../utils/numUtil";

/**
 * Get LST rate
 * @returns LST rate
 */
export const getLstRate = async (programIds: ProgramIds) => {
  const { lsdProgramId, stakeManagerAddress } = programIds;
  if (isEmptyString(lsdProgramId) || isEmptyString(stakeManagerAddress)) {
    throw new Error(ERR_EMPTY_PROGRAM_ID);
  }

  const anchorProgram = new AnchorProgram(programIds);
  await anchorProgram.init();
  const { program } = anchorProgram;
  const connection = getConnection();
  if (!program || !connection) return;

  const stakeManagerAccount = await program.account.stakeManager.fetch(
    stakeManagerAddress
  );

  return chainAmountToHuman(stakeManagerAccount.rate.toString());
};
