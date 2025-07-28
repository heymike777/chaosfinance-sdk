# Chaos Finance LSD package

> Chaos Finance is the first liquid staking protocol for the Sonic Chain, enabling users to maximize capital efficiency while securing the network.

Chaos Finance provided JavaScript packages for application developers, making the adoption fast and robust.

## @chaosfinance/sonic-lsd
Sonic Lsd package provides all functionalities for developer, such as:

- stake Sonic
- unstake sSonic
- withdraw Sonic
- get apr
- get rate
- get total staked amount
- get total lst amount


### Install 

```shell
npm install @chaosfinance/sonic-lsd --save
```

### Usage

e.g. Stake Sonic

```javascript
import { stakeSonic } from '@chaosfinance/sonic-lsd';
 
const stakeTxHash = await stakeSonic(stakeAmount)
if (stakeTxHash) {
    // handle success logic
} else {
    // alert user with failed messages
}
```

Read detail documentation on [Chaos Sonic LSD JS SDK](https://docs.chaosfinance.xyz/docs/js-client-sdk)

## @chaosfinance/svm-vault

Apart from sonic-lsd, Chaos Finance developed staking vault for any token ecosystem to unlock staking utility, increase token demand, and enable sustainable rewards — all with composability into the broader DeFi landscape.

SVM Vault package works like sonic lsd package in every aspect, but under the hood they are different. 

1. SVM Vault supports any SPL token
2. Each vault has its own configuration, reward mechanisms, and on-chain logic tailored to the associated token
3. It enables anyone to launch and manage their vault with minimal effort


### Install 

```shell
npm install @chaosfinance/svm-vault --save
```

### Usage

e.g. Stake Token with svm vault

```javascript
import { stakeToken } from '@chaosfinance/svm-vault';
 
try {
  const txHash = await stakeToken(100, programIds); // Stake 100 tokens
  console.log('Staking transaction:', txHash);
} catch (error) {
  console.error('Staking failed:', error.message);
}
```

Read detail documentation on [Staking Vault JS SDK
](https://docs.chaosfinance.xyz/docs/staking-vault-js-client-sdk)