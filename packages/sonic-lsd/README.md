# Sonic LSD SDK

A TypeScript SDK for interacting with the Sonic LSD (Liquid Staking Derivatives) protocol on Solana.

## Features

- **Multiple Instance Support**: Create multiple instances for different keypairs
- **Node.js Optimized**: Designed for server-side applications
- **Frontend Compatible**: Still supports frontend wallet connections
- **TypeScript**: Full TypeScript support with type safety

## Installation

```bash
npm install @chaosfinance/sonic-lsd
# or
yarn add @chaosfinance/sonic-lsd
```

## Quick Start

### Node.js Usage (Multiple Keypairs)

```typescript
import { SonicLSD, Keypair } from '@chaosfinance/sonic-lsd';
import { Connection } from '@solana/web3.js';

// Configuration
const config = {
  restEndpoint: 'https://api.mainnet-beta.solana.com',
  lsdProgramId: 'your_lsd_program_id',
  stakeManagerAddress: 'your_stake_manager_address',
  projectId: 'your_project_id'
};

// Create multiple instances for different keypairs
const sonicLSD1 = new SonicLSD(config);
const sonicLSD2 = new SonicLSD(config);

// Set different keypairs
const keypair1 = Keypair.fromSecretKey(/* your secret key */);
const keypair2 = Keypair.fromSecretKey(/* another secret key */);

sonicLSD1.setKeypair(keypair1);
sonicLSD2.setKeypair(keypair2);

// Now you can use both instances independently
const balance1 = await sonicLSD1.getLST().getUserSolBalance();
const balance2 = await sonicLSD2.getLST().getUserSolBalance();

// Stake with different keypairs
const txHash1 = await sonicLSD1.getStaking().stakeSonic(100);
const txHash2 = await sonicLSD2.getStaking().stakeSonic(50);
```

### Frontend Usage (Single Wallet)

```typescript
import { SonicLSD } from '@chaosfinance/sonic-lsd';

const config = {
  restEndpoint: 'https://api.mainnet-beta.solana.com',
  lsdProgramId: 'your_lsd_program_id',
  stakeManagerAddress: 'your_stake_manager_address',
  projectId: 'your_project_id'
};

const sonicLSD = new SonicLSD(config);

// Connect wallet (assuming you have a wallet adapter)
sonicLSD.setWallet(
  wallet.signTransaction,
  wallet.signAllTransactions,
  wallet.publicKey
);

// Use the SDK
const balance = await sonicLSD.getLST().getUserSolBalance();
const txHash = await sonicLSD.getStaking().stakeSonic(100);
```

## API Reference

### SonicLSD Class

The main class for interacting with the Sonic LSD protocol.

#### Constructor

```typescript
new SonicLSD(config: SonicLSDConfig)
```

**Config Interface:**
```typescript
interface SonicLSDConfig {
  restEndpoint: string;        // Solana RPC endpoint
  lsdProgramId: string;        // LSD program ID
  stakeManagerAddress: string; // Stake manager address
  projectId: string;           // Project ID
}
```

#### Methods

##### `setKeypair(keypair: Keypair)`
Set a Solana keypair for this instance (Node.js usage).

##### `setWallet(signTransaction, signAllTransactions, publicKey)`
Set wallet signing functions and public key (frontend usage).

##### `getStaking(): StakingService`
Get the staking service for staking operations.

##### `getLST(): LSTService`
Get the LST service for balance and rate queries.

##### `getPublicKey(): PublicKey | undefined`
Get the current public key.

##### `isWalletConnected(): boolean`
Check if a wallet is connected to this instance.

### StakingService

Handles all staking-related operations.

#### Methods

##### `stakeSonic(amount: string | number): Promise<string | undefined>`
Stake SONIC tokens and receive lstSONIC.

##### `unstakeLstSonic(amount: string | number): Promise<string | undefined>`
Unstake lstSONIC tokens.

##### `getUserWithdrawInfo(): Promise<WithdrawInfo | undefined>`
Get user's withdrawal information.

##### `withdrawSonic(): Promise<string | undefined>`
Withdraw unstaked SONIC tokens.

### LSTService

Handles balance and rate queries.

#### Methods

##### `getUserSolBalance(): Promise<string | undefined>`
Get user's SOL balance.

##### `getUserSonicBalance(): Promise<string | undefined>`
Get user's SONIC balance.

##### `getUserLstBalance(): Promise<string | undefined>`
Get user's lstSONIC balance.

##### `getUserStakedAmount(): Promise<string | undefined>`
Get user's total staked SONIC amount.

##### `getLstApr(): Promise<number | undefined>`
Get current LST APR.

##### `getLstRate(): Promise<string | undefined>`
Get current LST rate.

##### `getPlatformFeeCommission(): Promise<string | undefined>`
Get platform fee commission.

##### `getTotalLstAmount(): Promise<string | undefined>`
Get total LST supply.

##### `getTotalStakedAmount(): Promise<string | undefined>`
Get total staked SONIC amount.

##### `getUserMinStakeAmount(): Promise<string | undefined>`
Get minimum stake amount.

## Examples

### Advanced Node.js Usage

```typescript
import { SonicLSD, Keypair } from '@chaosfinance/sonic-lsd';

class StakingManager {
  private instances: Map<string, SonicLSD> = new Map();

  constructor(config: SonicLSDConfig) {
    this.config = config;
  }

  addKeypair(name: string, keypair: Keypair) {
    const instance = new SonicLSD(this.config);
    instance.setKeypair(keypair);
    this.instances.set(name, instance);
  }

  async stakeForAll(amount: number) {
    const promises = Array.from(this.instances.values()).map(instance =>
      instance.getStaking().stakeSonic(amount)
    );
    return Promise.all(promises);
  }

  async getBalancesForAll() {
    const balances = new Map();
    for (const [name, instance] of this.instances) {
      const balance = await instance.getLST().getUserSolBalance();
      balances.set(name, balance);
    }
    return balances;
  }
}

// Usage
const manager = new StakingManager(config);
manager.addKeypair('wallet1', keypair1);
manager.addKeypair('wallet2', keypair2);

const balances = await manager.getBalancesForAll();
const txHashes = await manager.stakeForAll(100);
```

### Error Handling

```typescript
try {
  const txHash = await sonicLSD.getStaking().stakeSonic(100);
  console.log('Staking successful:', txHash);
} catch (error) {
  if (error.message.includes('ERR_TX_REJECTED')) {
    console.log('Transaction was rejected by user');
  } else if (error.message.includes('ERR_TX_FAILED')) {
    console.log('Transaction failed on chain');
  } else {
    console.log('Other error:', error.message);
  }
}
```

## Migration from Legacy API

If you're using the legacy static API, here's how to migrate:

### Before (Legacy)
```typescript
import { registerChain, setKeypair, stakeSonic } from '@chaosfinance/sonic-lsd';

registerChain(endpoint, programId, stakeManager, projectId);
setKeypair(keypair);
const txHash = await stakeSonic(100);
```

### After (New API)
```typescript
import { SonicLSD } from '@chaosfinance/sonic-lsd';

const sonicLSD = new SonicLSD({
  restEndpoint: endpoint,
  lsdProgramId: programId,
  stakeManagerAddress: stakeManager,
  projectId: projectId
});

sonicLSD.setKeypair(keypair);
const txHash = await sonicLSD.getStaking().stakeSonic(100);
```

## Error Codes

- `ERR_EMPTY_ENDPOINT`: RPC endpoint is empty
- `ERR_EMPTY_PROGRAM_ID`: Program ID is empty
- `ERR_EMPTY_PROJECT_ID`: Project ID is empty
- `ERR_WALLET_NOT_REGISTERED`: No wallet is connected
- `ERR_NOT_A_VALID_NUMBER`: Invalid number provided
- `ERR_TX_FAILED`: Transaction failed on chain
- `ERR_TX_REJECTED`: Transaction was rejected by user
- `ERR_SPL_TOKEN_ACCOUNT_NOT_FOUND`: Token account not found

## License

MIT 