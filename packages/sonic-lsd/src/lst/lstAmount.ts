import { PublicKey } from "@solana/web3.js";
import { getConnection, provider } from "../provider";
import { getLstRate } from "./rate";

/**
 * Get total LST suppy amount
 * @returns total LST amount
 */
export const getTotalLstAmount = async () => {
  const connection = getConnection();
  if (!connection) return;

  try {
    const { lsdTokenMintAddress } = provider._programIds;
    const totalSupply = await connection.getTokenSupply(
      new PublicKey(lsdTokenMintAddress)
    );
    if (!totalSupply || !totalSupply.value) return;

    return totalSupply.value.uiAmount + "";
  } catch (err: any) {
    return;
  }
};

/**
 * Get total staked SONIC amount
 * @returns total staked SONIC amount
 */
export const getTotalStakedAmount = async () => {
  const totalLstAmount = await getTotalLstAmount();
  const lstRate = await getLstRate();
  if (!totalLstAmount || !lstRate) return;

  return Number(totalLstAmount) * Number(lstRate) + "";
};
