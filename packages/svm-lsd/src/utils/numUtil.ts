import { BN } from "@coral-xyz/anchor";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";

export const isValidNum = (num: string | number) => {
  if (num === "" || num === undefined || num === null || isNaN(Number(num))) {
    return false;
  }
  return true;
};

export const chainAmountToHuman = (num: string | number) => {
  if (!isValidNum(num)) {
    return "--";
  }
  const factor = LAMPORTS_PER_SOL;

  return Number(num) / Number(factor) + "";
};

export const toChainAmount = (num: string | number) => {
  if (!isValidNum(num)) {
    return new BN(0);
  }

  return new BN((Number(num) * LAMPORTS_PER_SOL).toFixed(0));
};
