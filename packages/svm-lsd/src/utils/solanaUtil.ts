import { Connection, PublicKey, Signer, Transaction } from "@solana/web3.js";
import { SignTransaction } from "../provider";
import {
  CANCELLED_ERR_MESSAGE1,
  CANCELLED_ERR_MESSAGE2,
  CANCELLED_ERR_MESSAGE3,
  CANCELLED_ERR_MESSAGE4,
  CANCELLED_ERR_MESSAGE5,
  NIGHTLY_CANCELLED_MSG1,
} from "../constants";

export async function getSplTokenAccount(
  connection: Connection,
  userAddress: string | undefined,
  lsdTokenMintAddress: string
) {
  if (!userAddress) {
    return null;
  }
  try {
    const acc = await connection.getParsedTokenAccountsByOwner(
      new PublicKey(userAddress),
      {
        mint: new PublicKey(lsdTokenMintAddress),
      }
    );

    if (acc.value && acc.value.length > 0) {
      return acc.value[0];
    }
  } catch (err) {
    return null;
  }

  return null;
}

export async function sendSolanaTransaction(
  transaction: Transaction,
  connection: Connection,
  signTransaction: SignTransaction,
  userPubkey: PublicKey,
  signers?: Signer[]
) {
  try {
    let { blockhash } = await connection.getLatestBlockhash();
    transaction.recentBlockhash = blockhash;
    transaction.feePayer = userPubkey;

    if (signers) {
      transaction.partialSign(...signers);
    }

    let transferSigned = await signTransaction(transaction);

    const txHash = await connection.sendRawTransaction(
      transferSigned.serialize(),
      {
        skipPreflight: true,
      }
    );
    return txHash;
  } catch (err: any) {
    if (typeof err === "string" && err === NIGHTLY_CANCELLED_MSG1) {
      throw new Error(CANCELLED_ERR_MESSAGE1);
    }
    throw new Error(err.message);
  }
}

export const isSolanaCancelError = (err: any) => {
  return (
    err.message.indexOf(CANCELLED_ERR_MESSAGE1) >= 0 ||
    err.message.indexOf(CANCELLED_ERR_MESSAGE2) >= 0 ||
    err.message.indexOf(CANCELLED_ERR_MESSAGE3) >= 0 ||
    err.message.indexOf(CANCELLED_ERR_MESSAGE4) >= 0 ||
    err.message.indexOf(CANCELLED_ERR_MESSAGE5) >= 0
  );
};
