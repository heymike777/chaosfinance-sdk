import { SonicLSD } from '../src/SonicLSD';
import { Keypair } from '@solana/web3.js';

// Example configuration
const config = {
  restEndpoint: 'https://api.mainnet-beta.solana.com',
  lsdProgramId: 'your_lsd_program_id_here',
  stakeManagerAddress: 'your_stake_manager_address_here',
  projectId: 'your_project_id_here'
};

async function exampleUsage() {
  console.log('🚀 Sonic LSD SDK - Node.js Multiple Keypairs Example\n');

  // Create multiple instances for different keypairs
  const sonicLSD1 = new SonicLSD(config);
  const sonicLSD2 = new SonicLSD(config);

  // Generate example keypairs (in real usage, you'd load from files or environment)
  const keypair1 = Keypair.generate();
  const keypair2 = Keypair.generate();

  console.log('📝 Setting up keypairs...');
  sonicLSD1.setKeypair(keypair1);
  sonicLSD2.setKeypair(keypair2);

  console.log(`Keypair 1: ${keypair1.publicKey.toString()}`);
  console.log(`Keypair 2: ${keypair2.publicKey.toString()}\n`);

  try {
    // Check if wallets are connected
    console.log('🔗 Checking wallet connections...');
    console.log(`Keypair 1 connected: ${sonicLSD1.isWalletConnected()}`);
    console.log(`Keypair 2 connected: ${sonicLSD2.isWalletConnected()}\n`);

    // Get balances for both keypairs
    console.log('💰 Getting balances...');
    const balance1 = await sonicLSD1.getLST().getUserSolBalance();
    const balance2 = await sonicLSD2.getLST().getUserSolBalance();

    console.log(`Keypair 1 SOL balance: ${balance1 || '0'} SOL`);
    console.log(`Keypair 2 SOL balance: ${balance2 || '0'} SOL\n`);

    // Get platform information
    console.log('📊 Getting platform information...');
    const apr = await sonicLSD1.getLST().getLstApr();
    const rate = await sonicLSD1.getLST().getLstRate();
    const totalStaked = await sonicLSD1.getLST().getTotalStakedAmount();

    console.log(`Current APR: ${(apr || 0) * 100}%`);
    console.log(`Current LST Rate: ${rate || '0'}`);
    console.log(`Total Staked: ${totalStaked || '0'} SONIC\n`);

    // Example staking (commented out to avoid actual transactions)
    /*
    console.log('🔄 Staking SONIC...');
    const txHash1 = await sonicLSD1.getStaking().stakeSonic(100);
    const txHash2 = await sonicLSD2.getStaking().stakeSonic(50);

    console.log(`Keypair 1 staking tx: ${txHash1}`);
    console.log(`Keypair 2 staking tx: ${txHash2}\n`);
    */

    // Get withdrawal info
    console.log('📋 Getting withdrawal information...');
    const withdrawInfo1 = await sonicLSD1.getStaking().getUserWithdrawInfo();
    const withdrawInfo2 = await sonicLSD2.getStaking().getUserWithdrawInfo();

    console.log('Keypair 1 withdrawal info:', withdrawInfo1);
    console.log('Keypair 2 withdrawal info:', withdrawInfo2);

  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

// Advanced example: Managing multiple instances
class StakingManager {
  private instances: Map<string, SonicLSD> = new Map();

  constructor(private config: any) {}

  addKeypair(name: string, keypair: Keypair) {
    const instance = new SonicLSD(this.config);
    instance.setKeypair(keypair);
    this.instances.set(name, instance);
    console.log(`✅ Added keypair: ${name}`);
  }

  async getBalancesForAll() {
    const balances = new Map();
    for (const [name, instance] of this.instances) {
      const balance = await instance.getLST().getUserSolBalance();
      balances.set(name, balance);
    }
    return balances;
  }

  async stakeForAll(amount: number) {
    const promises = Array.from(this.instances.values()).map(instance =>
      instance.getStaking().stakeSonic(amount)
    );
    return Promise.all(promises);
  }

  getInstance(name: string): SonicLSD | undefined {
    return this.instances.get(name);
  }
}

async function advancedExample() {
  console.log('\n🔧 Advanced Example: Staking Manager\n');

  const manager = new StakingManager(config);
  
  // Add multiple keypairs
  const keypairs = [
    { name: 'wallet1', keypair: Keypair.generate() },
    { name: 'wallet2', keypair: Keypair.generate() },
    { name: 'wallet3', keypair: Keypair.generate() }
  ];

  keypairs.forEach(({ name, keypair }) => {
    manager.addKeypair(name, keypair);
  });

  // Get all balances
  const balances = await manager.getBalancesForAll();
  console.log('💰 All balances:', Object.fromEntries(balances));

  // Access individual instances
  const wallet1 = manager.getInstance('wallet1');
  if (wallet1) {
    const balance = await wallet1.getLST().getUserSolBalance();
    console.log(`Wallet 1 balance: ${balance} SOL`);
  }
}

// Run examples
if (require.main === module) {
  exampleUsage()
    .then(() => advancedExample())
    .catch(console.error);
}

export { exampleUsage, advancedExample, StakingManager }; 