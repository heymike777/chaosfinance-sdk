import { anchorProgram } from "../anchorProgram";
import { getConnection, provider } from "../provider";
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
 * Get user's SONIC balance
 * @returns SONIC balance
 */
export const getUserSonicBalance = async () => {
  const connection = getConnection();
  if (!connection || !provider._provider.publicKey || !anchorProgram.program)
    return;

  const tokenAccountPubkey = await getSplTokenAccount(
    connection,
    provider._provider.publicKey.toString(),
    provider._programIds.sonicTokenMintAddress
  );
  if (!tokenAccountPubkey) return "0";

  const tokenAccountBalance = await connection.getTokenAccountBalance(
    tokenAccountPubkey.pubkey
  );
  if (!tokenAccountBalance || !tokenAccountBalance.value) return "0";

  return tokenAccountBalance.value.uiAmount + "";
};

/**
 * Get user's LST balance
 * @returns LST balance
 */
export const getUserLstBalance = async () => {
  const connection = getConnection();
  if (!connection || !provider._provider.publicKey || !anchorProgram.program)
    return;

  const tokenAccountPubkey = await getSplTokenAccount(
    connection,
    provider._provider.publicKey.toString(),
    provider._programIds.lsdTokenMintAddress
  );
  if (!tokenAccountPubkey) return "0";

  const tokenAccountBalance = await connection.getTokenAccountBalance(
    tokenAccountPubkey.pubkey
  );
  if (!tokenAccountBalance || !tokenAccountBalance.value) return "0";

  return tokenAccountBalance.value.uiAmount + "";
};

/**
 * Get user's staked SONIC amount
 * @returns user's staked SONIC amount
 */
export const getUserStakedAmount = async () => {
  const lstBalance = await getUserLstBalance();
  const lstRate = await getLstRate();
  if (!lstBalance || !lstRate) return;

  return Number(lstBalance) * Number(lstRate) + "";
};
