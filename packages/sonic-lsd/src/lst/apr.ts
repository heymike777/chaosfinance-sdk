import { anchorProgram } from "../anchorProgram";
import { provider } from "../provider";
import { chainAmountToHuman } from "../utils/numUtil";

/**
 * Get LST APR
 * @returns LST APR
 */
export const getLstApr = async () => {
  let apr = 0.0717;

  const { program } = anchorProgram;
  if (!program) return apr;

  try {
    const stakeManagerAccount = await program.account.stakeManager.fetch(
      provider._programIds.stakeManagerAddress
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
