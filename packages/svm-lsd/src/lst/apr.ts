import { AnchorProgram } from "../anchorProgram";
import { ProgramIds, provider } from "../provider";
import { isEmptyString } from "../utils/commonUtil";
import { chainAmountToHuman } from "../utils/numUtil";

/**
 * Get LST APR
 * @returns LST APR
 */
export const getLstApr = async (programIds: ProgramIds, defaultApr = 0.09) => {
  const { stakeManagerAddress } = programIds;

  let apr = defaultApr;
  if (isEmptyString(stakeManagerAddress)) return apr;

  const anchorProgram = new AnchorProgram(programIds);
  await anchorProgram.init();

  const { program } = anchorProgram;
  if (!program) return apr;

  try {
    const stakeManagerAccount = await program.account.stakeManager.fetch(
      stakeManagerAddress
    );

    const epochRates = stakeManagerAccount.eraRates;
    if (!epochRates) return apr;

    if (epochRates.length <= 2) return apr;

    let eraLength = 7;
    if (epochRates.length < eraLength + 2) {
      eraLength = 1;
    }

    const beginEraIndex = epochRates.length - eraLength - 1;
    const endEraIndex = epochRates.length - 1;

    const beginRate = Number(
      chainAmountToHuman(epochRates[beginEraIndex].rate.toString())
    );
    const endRate = Number(
      chainAmountToHuman(epochRates[endEraIndex].rate.toString())
    );

    const timeDiff = stakeManagerAccount.eraSeconds * eraLength;

    if (beginRate !== 1 && endRate !== 1) {
      apr =
        (365.25 * 24 * 60 * 60 * (endRate - beginRate)) / beginRate / timeDiff;
    }

    return apr;
  } catch (err: any) {
    return apr;
  }
};
