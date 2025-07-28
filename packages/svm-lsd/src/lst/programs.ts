import { AnchorProgram } from "../anchorProgram";
import { ERR_EMPTY_PROGRAM_ID } from "../constants";
import { ProgramIds } from "../provider";
import { isEmptyString } from "../utils/commonUtil";

export const getTokenProgramIds = async (programIds: ProgramIds) => {
  const { lsdProgramId, stakeManagerAddress } = programIds;
  if (isEmptyString(lsdProgramId) || isEmptyString(stakeManagerAddress)) {
    throw new Error(ERR_EMPTY_PROGRAM_ID);
  }

  const anchorProgram = new AnchorProgram(programIds);
  try {
    await anchorProgram.init();
    const { lsdTokenMintAddress, stakingTokenMintAddress } = anchorProgram;
    return {
      lsdTokenMintAddress,
      stakingTokenMintAddress,
    };
  } catch (err: any) {
    return undefined;
  }
};
