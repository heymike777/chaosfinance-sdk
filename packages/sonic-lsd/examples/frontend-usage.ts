import { SonicLSD } from '../src/SonicLSD';
import { PublicKey } from '@solana/web3.js';
// import * as React from 'react'; // Uncomment if using React

// Example configuration
const config = {
  restEndpoint: 'https://api.mainnet-beta.solana.com',
  lsdProgramId: 'your_lsd_program_id_here',
  stakeManagerAddress: 'your_stake_manager_address_here',
  projectId: 'your_project_id_here'
};

// Example wallet adapter interface (similar to @solana/wallet-adapter)
interface WalletAdapter {
  publicKey: PublicKey;
  signTransaction: (transaction: any) => Promise<any>;
  signAllTransactions: (transactions: any[]) => Promise<any[]>;
  connected: boolean;
}

class FrontendStakingApp {
  private sonicLSD: SonicLSD;
  private wallet: WalletAdapter | null = null;

  constructor() {
    this.sonicLSD = new SonicLSD(config);
  }

  /**
   * Connect wallet to the SDK
   */
  connectWallet(wallet: WalletAdapter) {
    this.wallet = wallet;
    
    if (wallet.connected && wallet.publicKey) {
      this.sonicLSD.setWallet(
        wallet.signTransaction,
        wallet.signAllTransactions,
        wallet.publicKey
      );
      console.log('✅ Wallet connected:', wallet.publicKey.toString());
    }
  }

  /**
   * Disconnect wallet
   */
  disconnectWallet() {
    this.wallet = null;
    console.log('❌ Wallet disconnected');
  }

  /**
   * Check if wallet is connected
   */
  isWalletConnected(): boolean {
    return this.sonicLSD.isWalletConnected();
  }

  /**
   * Get user's public key
   */
  getPublicKey(): PublicKey | undefined {
    return this.sonicLSD.getPublicKey();
  }

  /**
   * Get user's SOL balance
   */
  async getSolBalance(): Promise<string | undefined> {
    if (!this.isWalletConnected()) {
      throw new Error('Wallet not connected');
    }
    return this.sonicLSD.getLST().getUserSolBalance();
  }

  /**
   * Get user's SONIC balance
   */
  async getSonicBalance(): Promise<string | undefined> {
    if (!this.isWalletConnected()) {
      throw new Error('Wallet not connected');
    }
    return this.sonicLSD.getLST().getUserSonicBalance();
  }

  /**
   * Get user's LST balance
   */
  async getLstBalance(): Promise<string | undefined> {
    if (!this.isWalletConnected()) {
      throw new Error('Wallet not connected');
    }
    return this.sonicLSD.getLST().getUserLstBalance();
  }

  /**
   * Stake SONIC tokens
   */
  async stakeSonic(amount: number): Promise<string | undefined> {
    if (!this.isWalletConnected()) {
      throw new Error('Wallet not connected');
    }
    return this.sonicLSD.getStaking().stakeSonic(amount);
  }

  /**
   * Unstake LST tokens
   */
  async unstakeLst(amount: number): Promise<string | undefined> {
    if (!this.isWalletConnected()) {
      throw new Error('Wallet not connected');
    }
    return this.sonicLSD.getStaking().unstakeLstSonic(amount);
  }

  /**
   * Get withdrawal information
   */
  async getWithdrawInfo() {
    if (!this.isWalletConnected()) {
      throw new Error('Wallet not connected');
    }
    return this.sonicLSD.getStaking().getUserWithdrawInfo();
  }

  /**
   * Withdraw unstaked SONIC
   */
  async withdrawSonic(): Promise<string | undefined> {
    if (!this.isWalletConnected()) {
      throw new Error('Wallet not connected');
    }
    return this.sonicLSD.getStaking().withdrawSonic();
  }

  /**
   * Get platform statistics
   */
  async getPlatformStats() {
    const [apr, rate, totalStaked, totalLst] = await Promise.all([
      this.sonicLSD.getLST().getLstApr(),
      this.sonicLSD.getLST().getLstRate(),
      this.sonicLSD.getLST().getTotalStakedAmount(),
      this.sonicLSD.getLST().getTotalLstAmount()
    ]);

    return {
      apr: (apr || 0) * 100,
      rate: rate || '0',
      totalStaked: totalStaked || '0',
      totalLst: totalLst || '0'
    };
  }
}

// React hook example (if using React)
// Uncomment the React import above and this example if using React
/*
function useSonicLSD() {
  const [app] = React.useState(() => new FrontendStakingApp());
  const [isConnected, setIsConnected] = React.useState(false);
  const [balances, setBalances] = React.useState({
    sol: '0',
    sonic: '0',
    lst: '0'
  });

  const connectWallet = React.useCallback(async (wallet: WalletAdapter) => {
    try {
      app.connectWallet(wallet);
      setIsConnected(true);
      
      // Load initial balances
      const [sol, sonic, lst] = await Promise.all([
        app.getSolBalance(),
        app.getSonicBalance(),
        app.getLstBalance()
      ]);

      setBalances({
        sol: sol || '0',
        sonic: sonic || '0',
        lst: lst || '0'
      });
    } catch (error) {
      console.error('Failed to connect wallet:', error);
    }
  }, [app]);

  const disconnectWallet = React.useCallback(() => {
    app.disconnectWallet();
    setIsConnected(false);
    setBalances({ sol: '0', sonic: '0', lst: '0' });
  }, [app]);

  const stakeSonic = React.useCallback(async (amount: number) => {
    try {
      const txHash = await app.stakeSonic(amount);
      console.log('Staking successful:', txHash);
      
      // Refresh balances
      const [sol, sonic, lst] = await Promise.all([
        app.getSolBalance(),
        app.getSonicBalance(),
        app.getLstBalance()
      ]);

      setBalances({
        sol: sol || '0',
        sonic: sonic || '0',
        lst: lst || '0'
      });

      return txHash;
    } catch (error) {
      console.error('Staking failed:', error);
      throw error;
    }
  }, [app]);

  return {
    isConnected,
    balances,
    connectWallet,
    disconnectWallet,
    stakeSonic,
    unstakeLst: app.unstakeLst.bind(app),
    getWithdrawInfo: app.getWithdrawInfo.bind(app),
    withdrawSonic: app.withdrawSonic.bind(app),
    getPlatformStats: app.getPlatformStats.bind(app)
  };
}
*/

// Vanilla JavaScript usage example
async function vanillaJSExample() {
  console.log('🌐 Frontend Usage Example\n');

  const app = new FrontendStakingApp();

  // Simulate wallet connection (in real app, this would come from wallet adapter)
  const mockWallet: WalletAdapter = {
    publicKey: new PublicKey('11111111111111111111111111111111'), // Example public key
    signTransaction: async (tx) => {
      console.log('Signing transaction...');
      return tx;
    },
    signAllTransactions: async (txs) => {
      console.log('Signing multiple transactions...');
      return txs;
    },
    connected: true
  };

  try {
    // Connect wallet
    app.connectWallet(mockWallet);
    console.log('Wallet connected successfully\n');

    // Get balances
    console.log('💰 Getting balances...');
    const [solBalance, sonicBalance, lstBalance] = await Promise.all([
      app.getSolBalance(),
      app.getSonicBalance(),
      app.getLstBalance()
    ]);

    console.log(`SOL Balance: ${solBalance || '0'}`);
    console.log(`SONIC Balance: ${sonicBalance || '0'}`);
    console.log(`LST Balance: ${lstBalance || '0'}\n`);

    // Get platform stats
    console.log('📊 Getting platform statistics...');
    const stats = await app.getPlatformStats();
    console.log('Platform Stats:', stats);

    // Example staking (commented out to avoid actual transactions)
    /*
    console.log('🔄 Staking SONIC...');
    const txHash = await app.stakeSonic(100);
    console.log('Staking transaction:', txHash);
    */

  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

// Export for use in other modules
export { FrontendStakingApp, vanillaJSExample };
// export { useSonicLSD }; // Uncomment if using React

// Run example if this file is executed directly
if (require.main === module) {
  vanillaJSExample().catch(console.error);
} 