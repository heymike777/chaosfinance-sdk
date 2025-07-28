import { Connection, PublicKey, Transaction } from "@solana/web3.js";
// import { anchorProgram, initAnchorProgram } from "../anchorProgram";
import { isEmptyString } from "../utils/commonUtil";
import {
  ERR_EMPTY_ENDPOINT,
  ERR_EMPTY_PROGRAM_ID,
  ERR_EMPTY_PROJECT_ID,
} from "../constants";

export type SignTransaction = (tx: Transaction) => Promise<Transaction>;
export type SignAllTransactions = (
  txs: Transaction[]
) => Promise<Transaction[]>;

export interface SolanaProvider {
  restEndpoint: string;
  signTransaction: SignTransaction;
  signAllTransactions: SignAllTransactions;
  publicKey: PublicKey;
}

export interface ProgramIds {
  lsdProgramId: string;
  stakeManagerAddress: string;
}

interface ProgramIdsWithTokenMint extends ProgramIds {
  lsdTokenMintAddress: string;
  stakingTokenMintAddress: string;
}

export const provider: {
  _provider: Partial<SolanaProvider>;
  // _programIds: ProgramIdsWithTokenMint;
  _connection: Connection | null;
  _projectId: string;
} = {
  _provider: {},
  // _programIds: {
  //   lsdProgramId: "",
  //   stakeManagerAddress: "",
  //   lsdTokenMintAddress: "",
  //   stakingTokenMintAddress: "",
  // },
  _connection: null,
  _projectId: "",
};

/**
 * Register provider and program ids
 * @param solanaProvider provider info
 * @param projectId project id
 * @throws Error if any of projectId, restEndpoint is empty
 */
export const register = (solanaProvider: SolanaProvider, projectId: string) => {
  if (isEmptyString(solanaProvider.restEndpoint)) {
    throw new Error(ERR_EMPTY_ENDPOINT);
  }
  // if (
  //   isEmptyString(programIds.lsdProgramId) ||
  //   isEmptyString(programIds.stakeManagerAddress)
  // ) {
  //   throw new Error(ERR_EMPTY_PROGRAM_ID);
  // }
  if (isEmptyString(projectId)) {
    throw new Error(ERR_EMPTY_PROJECT_ID);
  }

  provider._provider = solanaProvider;
  // provider._programIds.lsdProgramId = programIds.lsdProgramId;
  // provider._programIds.stakeManagerAddress = programIds.stakeManagerAddress;
  provider._connection = new Connection(solanaProvider.restEndpoint);
  provider._projectId = projectId;

  // initAnchorProgram();
};

/**
 *
 * @param restEndpoint RPC rest endpoint
 * @param lsdProgramId
 * @param stakeManagerAddress
 * @throws Error if any of programIds, projectId, restEndpoint is empty
 */
export const registerChain = (
  restEndpoint: string,
  // lsdProgramId: string,
  // stakeManagerAddress: string,
  projectId: string
) => {
  if (isEmptyString(restEndpoint)) {
    throw new Error(ERR_EMPTY_ENDPOINT);
  }
  // if (isEmptyString(lsdProgramId) || isEmptyString(stakeManagerAddress)) {
  //   throw new Error(ERR_EMPTY_PROGRAM_ID);
  // }
  if (isEmptyString(projectId)) {
    throw new Error(ERR_EMPTY_PROJECT_ID);
  }

  provider._provider.restEndpoint = restEndpoint;
  // provider._programIds.lsdProgramId = lsdProgramId;
  // provider._programIds.stakeManagerAddress = stakeManagerAddress;
  provider._connection = new Connection(restEndpoint);

  // initAnchorProgram();
};

/**
 * Register wallet
 * @param signTransaction
 * @param signAllTransactions
 * @param publicKey
 */
export const registerWallet = (
  signTransaction: SignTransaction,
  signAllTransactions: SignAllTransactions,
  publicKey: PublicKey
) => {
  provider._provider.signTransaction = signTransaction;
  provider._provider.signAllTransactions = signAllTransactions;
  provider._provider.publicKey = publicKey;

  // initAnchorProgram();
};

/**
 * Update user's publicKey
 * @param publicKey user's publicKey
 */
export const updatePublicKey = (publicKey: PublicKey) => {
  if (provider._provider) {
    provider._provider.publicKey = publicKey;
    // initAnchorProgram();
  }
};

export const getConnection = () => {
  if (provider._provider && provider._provider.restEndpoint) {
    return new Connection(provider._provider.restEndpoint);
  }
};

export const getTokenProgramId = async (sonicTokenMintAddress: string) => {
  const connection = getConnection();
  if (!connection || !provider._provider) return;

  const sonicAccountInfo = await connection.getAccountInfo(
    new PublicKey(sonicTokenMintAddress)
  );
  if (!sonicAccountInfo) return;

  return sonicAccountInfo.owner.toString();
};
