import { AnchorProgram } from "../anchorProgram";
import { ERR_EMPTY_PROGRAM_ID } from "../constants";
import { getConnection, ProgramIds, provider } from "../provider";
import { isEmptyString } from "../utils/commonUtil";
import { chainAmountToHuman } from "../utils/numUtil";
import { getSplTokenAccount } from "../utils/solanaUtil";
import { getLstRate } from "./rate";

/**
 * Get user's SOL balance
 * @returns SOL balance
 */
export const getUserSolBalance = async () => {
  const connection = getConnection();
  if (!connection || !provider._provider.publicKey) return;

  const balance = await connection.getBalance(provider._provider.publicKey);
  const solBalance = chainAmountToHuman(balance);

  return solBalance;
};

/**
 * Get user's stakingToken balance
 * @returns stakingToken balance
 */
export const getUserStakingTokenBalance = async (programIds: ProgramIds) => {
  const { lsdProgramId, stakeManagerAddress } = programIds;
  if (isEmptyString(lsdProgramId) || isEmptyString(stakeManagerAddress)) {
    throw new Error(ERR_EMPTY_PROGRAM_ID);
  }

  const anchorProgram = new AnchorProgram(programIds);
  await anchorProgram.init();

  const { stakingTokenMintAddress } = anchorProgram;
  return await getTokenBalance(stakingTokenMintAddress);
};

/**
 * Get user's LST balance
 * @returns LST balance
 */
export const getUserLstBalance = async (programIds: ProgramIds) => {
  const { lsdProgramId, stakeManagerAddress } = programIds;
  if (isEmptyString(lsdProgramId) || isEmptyString(stakeManagerAddress)) {
    throw new Error(ERR_EMPTY_PROGRAM_ID);
  }

  const anchorProgram = new AnchorProgram(programIds);
  await anchorProgram.init();

  const { lsdTokenMintAddress } = anchorProgram;

  return await getTokenBalance(lsdTokenMintAddress);
};

/**
 * Get user's staked token amount
 * @returns user's staked token amount
 */
export const getUserStakedAmount = async (programIds: ProgramIds) => {
  const lstBalance = await getUserLstBalance(programIds);
  const lstRate = await getLstRate(programIds);
  if (!lstBalance || !lstRate) return;

  return Number(lstBalance) * Number(lstRate) + "";
};

const getTokenBalance = async (mintAddress: string) => {
  const connection = getConnection();
  if (!connection || !provider._provider.publicKey) return;

  const tokenAccountPubkey = await getSplTokenAccount(
    connection,
    provider._provider.publicKey.toString() || "",
    mintAddress
  );
  if (!tokenAccountPubkey) return "0";

  const tokenAccountBalance = await connection.getTokenAccountBalance(
    tokenAccountPubkey.pubkey
  );
  if (!tokenAccountBalance || !tokenAccountBalance.value) return "0";

  return tokenAccountBalance.value.uiAmount + "";
};
