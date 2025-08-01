export type LsdProgram = {
  version: "0.1.0";
  name: "lsd_program";
  instructions: [
    {
      name: "initializeStakeManager";
      accounts: [
        {
          name: "admin";
          isMut: false;
          isSigner: true;
        },
        {
          name: "rentPayer";
          isMut: true;
          isSigner: true;
        },
        {
          name: "stakeManager";
          isMut: true;
          isSigner: false;
        },
        {
          name: "stakingPool";
          isMut: false;
          isSigner: false;
        },
        {
          name: "lsdTokenMint";
          isMut: true;
          isSigner: false;
        },
        {
          name: "stakingTokenMint";
          isMut: false;
          isSigner: false;
        },
        {
          name: "stakeManagerStakingTokenAccount";
          isMut: true;
          isSigner: false;
        },
        {
          name: "tokenProgram";
          isMut: false;
          isSigner: false;
        },
        {
          name: "associatedTokenProgram";
          isMut: false;
          isSigner: false;
        },
        {
          name: "systemProgram";
          isMut: false;
          isSigner: false;
        }
      ];
      args: [
        {
          name: "params";
          type: {
            defined: "InitializeStakeManagerParams";
          };
        }
      ];
    },
    {
      name: "transferStakeManagerAdmin";
      accounts: [
        {
          name: "admin";
          isMut: false;
          isSigner: true;
        },
        {
          name: "stakeManager";
          isMut: true;
          isSigner: false;
        }
      ];
      args: [
        {
          name: "newAdmin";
          type: "publicKey";
        }
      ];
    },
    {
      name: "acceptStakeManagerAdmin";
      accounts: [
        {
          name: "pendingAdmin";
          isMut: false;
          isSigner: true;
        },
        {
          name: "stakeManager";
          isMut: true;
          isSigner: false;
        }
      ];
      args: [];
    },
    {
      name: "configStakeManager";
      accounts: [
        {
          name: "admin";
          isMut: false;
          isSigner: true;
        },
        {
          name: "stakeManager";
          isMut: true;
          isSigner: false;
        }
      ];
      args: [
        {
          name: "params";
          type: {
            defined: "ConfigStakeManagerParams";
          };
        }
      ];
    },
    {
      name: "createMetadata";
      accounts: [
        {
          name: "feeAndRentPayer";
          isMut: true;
          isSigner: true;
        },
        {
          name: "admin";
          isMut: false;
          isSigner: true;
        },
        {
          name: "stakeManager";
          isMut: true;
          isSigner: false;
        },
        {
          name: "lsdTokenMint";
          isMut: true;
          isSigner: false;
        },
        {
          name: "metadataAccount";
          isMut: true;
          isSigner: false;
        },
        {
          name: "tokenProgram";
          isMut: false;
          isSigner: false;
        },
        {
          name: "metadataProgram";
          isMut: false;
          isSigner: false;
        },
        {
          name: "systemProgram";
          isMut: false;
          isSigner: false;
        },
        {
          name: "sysvarInstruction";
          isMut: false;
          isSigner: false;
        }
      ];
      args: [
        {
          name: "params";
          type: {
            defined: "CreateMetadataParams";
          };
        }
      ];
    },
    {
      name: "stake";
      accounts: [
        {
          name: "user";
          isMut: false;
          isSigner: true;
        },
        {
          name: "rentPayer";
          isMut: true;
          isSigner: true;
        },
        {
          name: "stakeManager";
          isMut: true;
          isSigner: false;
        },
        {
          name: "lsdTokenMint";
          isMut: true;
          isSigner: false;
        },
        {
          name: "stakingTokenMint";
          isMut: false;
          isSigner: false;
        },
        {
          name: "userLsdTokenAccount";
          isMut: true;
          isSigner: false;
        },
        {
          name: "userStakingTokenAccount";
          isMut: true;
          isSigner: false;
        },
        {
          name: "stakeManagerStakingTokenAccount";
          isMut: true;
          isSigner: false;
        },
        {
          name: "tokenProgram";
          isMut: false;
          isSigner: false;
        },
        {
          name: "associatedTokenProgram";
          isMut: false;
          isSigner: false;
        },
        {
          name: "systemProgram";
          isMut: false;
          isSigner: false;
        }
      ];
      args: [
        {
          name: "stakeAmount";
          type: "u64";
        }
      ];
    },
    {
      name: "unstake";
      accounts: [
        {
          name: "user";
          isMut: false;
          isSigner: true;
        },
        {
          name: "rentPayer";
          isMut: true;
          isSigner: true;
        },
        {
          name: "stakeManager";
          isMut: true;
          isSigner: false;
        },
        {
          name: "lsdTokenMint";
          isMut: true;
          isSigner: false;
        },
        {
          name: "userLsdTokenAccount";
          isMut: true;
          isSigner: false;
        },
        {
          name: "unstakeAccount";
          isMut: true;
          isSigner: true;
        },
        {
          name: "tokenProgram";
          isMut: false;
          isSigner: false;
        },
        {
          name: "associatedTokenProgram";
          isMut: false;
          isSigner: false;
        },
        {
          name: "systemProgram";
          isMut: false;
          isSigner: false;
        }
      ];
      args: [
        {
          name: "unstakeAmount";
          type: "u64";
        }
      ];
    },
    {
      name: "withdraw";
      accounts: [
        {
          name: "user";
          isMut: false;
          isSigner: true;
        },
        {
          name: "rentPayer";
          isMut: true;
          isSigner: true;
        },
        {
          name: "stakeManager";
          isMut: true;
          isSigner: false;
        },
        {
          name: "unstakeAccount";
          isMut: true;
          isSigner: false;
        },
        {
          name: "stakingTokenMint";
          isMut: false;
          isSigner: false;
        },
        {
          name: "userStakingTokenAccount";
          isMut: true;
          isSigner: false;
        },
        {
          name: "stakeManagerStakingTokenAccount";
          isMut: true;
          isSigner: false;
        },
        {
          name: "tokenProgram";
          isMut: false;
          isSigner: false;
        },
        {
          name: "associatedTokenProgram";
          isMut: false;
          isSigner: false;
        },
        {
          name: "systemProgram";
          isMut: false;
          isSigner: false;
        }
      ];
      args: [];
    },
    {
      name: "eraNew";
      accounts: [
        {
          name: "stakeManager";
          isMut: true;
          isSigner: false;
        }
      ];
      args: [];
    },
    {
      name: "eraBond";
      accounts: [
        {
          name: "feeAndRentPayer";
          isMut: true;
          isSigner: true;
        },
        {
          name: "stakeManager";
          isMut: true;
          isSigner: false;
        },
        {
          name: "stakingTokenMint";
          isMut: false;
          isSigner: false;
        },
        {
          name: "stakeManagerStakingTokenAccount";
          isMut: true;
          isSigner: false;
        },
        {
          name: "stakingPool";
          isMut: true;
          isSigner: false;
        },
        {
          name: "stakingPoolStakingTokenAccount";
          isMut: true;
          isSigner: false;
        },
        {
          name: "stakingStakeAccount";
          isMut: true;
          isSigner: false;
        },
        {
          name: "stakingProgram";
          isMut: false;
          isSigner: false;
        },
        {
          name: "tokenProgram";
          isMut: false;
          isSigner: false;
        },
        {
          name: "associatedTokenProgram";
          isMut: false;
          isSigner: false;
        },
        {
          name: "systemProgram";
          isMut: false;
          isSigner: false;
        }
      ];
      args: [];
    },
    {
      name: "eraUnbond";
      accounts: [
        {
          name: "feeAndRentPayer";
          isMut: true;
          isSigner: true;
        },
        {
          name: "stakeManager";
          isMut: true;
          isSigner: false;
        },
        {
          name: "stakingPool";
          isMut: true;
          isSigner: false;
        },
        {
          name: "stakingStakeAccount";
          isMut: true;
          isSigner: false;
        },
        {
          name: "stakingUnstakeAccount";
          isMut: true;
          isSigner: true;
        },
        {
          name: "stakingProgram";
          isMut: false;
          isSigner: false;
        },
        {
          name: "systemProgram";
          isMut: false;
          isSigner: false;
        }
      ];
      args: [];
    },
    {
      name: "eraWithdraw";
      accounts: [
        {
          name: "feeAndRentPayer";
          isMut: true;
          isSigner: true;
        },
        {
          name: "stakeManager";
          isMut: true;
          isSigner: false;
        },
        {
          name: "stakingPool";
          isMut: true;
          isSigner: false;
        },
        {
          name: "stakingTokenMint";
          isMut: false;
          isSigner: false;
        },
        {
          name: "stakeManagerStakingTokenAccount";
          isMut: true;
          isSigner: false;
        },
        {
          name: "stakingPoolStakingTokenAccount";
          isMut: true;
          isSigner: false;
        },
        {
          name: "stakingUnstakeAccount";
          isMut: true;
          isSigner: false;
        },
        {
          name: "stakingProgram";
          isMut: false;
          isSigner: false;
        },
        {
          name: "tokenProgram";
          isMut: false;
          isSigner: false;
        },
        {
          name: "associatedTokenProgram";
          isMut: false;
          isSigner: false;
        },
        {
          name: "systemProgram";
          isMut: false;
          isSigner: false;
        }
      ];
      args: [];
    },
    {
      name: "eraActive";
      accounts: [
        {
          name: "rentPayer";
          isMut: true;
          isSigner: true;
        },
        {
          name: "admin";
          isMut: true;
          isSigner: false;
        },
        {
          name: "stakeManager";
          isMut: true;
          isSigner: false;
        },
        {
          name: "lsdTokenMint";
          isMut: true;
          isSigner: false;
        },
        {
          name: "stakingTokenMint";
          isMut: false;
          isSigner: false;
        },
        {
          name: "stakeManagerStakingTokenAccount";
          isMut: true;
          isSigner: false;
        },
        {
          name: "platformFeeRecipient";
          isMut: true;
          isSigner: false;
        },
        {
          name: "stakingPool";
          isMut: true;
          isSigner: false;
        },
        {
          name: "stakingPoolStakingTokenAccount";
          isMut: true;
          isSigner: false;
        },
        {
          name: "stakingStakeAccount";
          isMut: true;
          isSigner: false;
        },
        {
          name: "stakingProgram";
          isMut: false;
          isSigner: false;
        },
        {
          name: "tokenProgram";
          isMut: false;
          isSigner: false;
        },
        {
          name: "associatedTokenProgram";
          isMut: false;
          isSigner: false;
        },
        {
          name: "systemProgram";
          isMut: false;
          isSigner: false;
        }
      ];
      args: [];
    }
  ];
  accounts: [
    {
      name: "stakeManager";
      type: {
        kind: "struct";
        fields: [
          {
            name: "creator";
            type: "publicKey";
          },
          {
            name: "index";
            type: "u8";
          },
          {
            name: "admin";
            type: "publicKey";
          },
          {
            name: "pendingAdmin";
            type: "publicKey";
          },
          {
            name: "poolSeedBump";
            type: "u8";
          },
          {
            name: "lsdTokenMint";
            type: "publicKey";
          },
          {
            name: "stakingProgram";
            type: "publicKey";
          },
          {
            name: "stakingTokenMint";
            type: "publicKey";
          },
          {
            name: "stakingPool";
            type: "publicKey";
          },
          {
            name: "stakingMinStakeAmount";
            type: "u64";
          },
          {
            name: "eraSeconds";
            type: "i64";
          },
          {
            name: "eraOffset";
            type: "i64";
          },
          {
            name: "minStakeAmount";
            type: "u64";
          },
          {
            name: "platformFeeCommission";
            type: "u64";
          },
          {
            name: "rateChangeLimit";
            type: "u64";
          },
          {
            name: "unbondingDuration";
            type: "u64";
          },
          {
            name: "eraStatus";
            type: {
              defined: "EraStatus";
            };
          },
          {
            name: "latestEra";
            type: "u64";
          },
          {
            name: "rate";
            type: "u64";
          },
          {
            name: "eraBond";
            type: "u64";
          },
          {
            name: "eraUnbond";
            type: "u64";
          },
          {
            name: "pendingBond";
            type: "u64";
          },
          {
            name: "pendingUnbond";
            type: "u64";
          },
          {
            name: "active";
            type: "u64";
          },
          {
            name: "totalPlatformFee";
            type: "u64";
          },
          {
            name: "eraRates";
            type: {
              vec: {
                defined: "EraRate";
              };
            };
          },
          {
            name: "reserved";
            docs: ["Reserved space for future upgrades. Do not use."];
            type: {
              array: ["u8", 256];
            };
          }
        ];
      };
    },
    {
      name: "unstakeAccount";
      type: {
        kind: "struct";
        fields: [
          {
            name: "stakeManager";
            type: "publicKey";
          },
          {
            name: "user";
            type: "publicKey";
          },
          {
            name: "amount";
            type: "u64";
          },
          {
            name: "withdrawableEra";
            type: "u64";
          },
          {
            name: "reserved";
            docs: ["Reserved space for future upgrades. Do not use."];
            type: {
              array: ["u8", 128];
            };
          }
        ];
      };
    }
  ];
  types: [
    {
      name: "ConfigStakeManagerParams";
      type: {
        kind: "struct";
        fields: [
          {
            name: "minStakeAmount";
            type: {
              option: "u64";
            };
          },
          {
            name: "platformFeeCommission";
            type: {
              option: "u64";
            };
          },
          {
            name: "rateChangeLimit";
            type: {
              option: "u64";
            };
          }
        ];
      };
    },
    {
      name: "InitializeStakeManagerParams";
      type: {
        kind: "struct";
        fields: [
          {
            name: "eraSeconds";
            type: "i64";
          },
          {
            name: "index";
            type: "u8";
          }
        ];
      };
    },
    {
      name: "CreateMetadataParams";
      type: {
        kind: "struct";
        fields: [
          {
            name: "tokenName";
            type: "string";
          },
          {
            name: "tokenSymbol";
            type: "string";
          },
          {
            name: "tokenUri";
            type: "string";
          }
        ];
      };
    },
    {
      name: "EraRate";
      type: {
        kind: "struct";
        fields: [
          {
            name: "era";
            type: "u64";
          },
          {
            name: "rate";
            type: "u64";
          }
        ];
      };
    },
    {
      name: "EraStatus";
      type: {
        kind: "enum";
        variants: [
          {
            name: "EraUpdated";
          },
          {
            name: "Bonded";
          },
          {
            name: "Unbonded";
          },
          {
            name: "ActiveUpdated";
          }
        ];
      };
    }
  ];
  events: [
    {
      name: "EventEraActive";
      fields: [
        {
          name: "era";
          type: "u64";
          index: false;
        },
        {
          name: "rate";
          type: "u64";
          index: false;
        },
        {
          name: "platformFee";
          type: "u64";
          index: false;
        }
      ];
    },
    {
      name: "EventEraBond";
      fields: [
        {
          name: "era";
          type: "u64";
          index: false;
        }
      ];
    },
    {
      name: "EventEraNew";
      fields: [
        {
          name: "newEra";
          type: "u64";
          index: false;
        }
      ];
    },
    {
      name: "EventEraUnbond";
      fields: [
        {
          name: "era";
          type: "u64";
          index: false;
        }
      ];
    },
    {
      name: "EventEraWithdraw";
      fields: [
        {
          name: "era";
          type: "u64";
          index: false;
        }
      ];
    },
    {
      name: "EventStake";
      fields: [
        {
          name: "era";
          type: "u64";
          index: false;
        },
        {
          name: "staker";
          type: "publicKey";
          index: false;
        },
        {
          name: "stakeAmount";
          type: "u64";
          index: false;
        },
        {
          name: "lsdTokenAmount";
          type: "u64";
          index: false;
        },
        {
          name: "stakeManager";
          type: "publicKey";
          index: false;
        }
      ];
    },
    {
      name: "EventUnstake";
      fields: [
        {
          name: "era";
          type: "u64";
          index: false;
        },
        {
          name: "staker";
          type: "publicKey";
          index: false;
        },
        {
          name: "unstakeAccount";
          type: "publicKey";
          index: false;
        },
        {
          name: "unstakeAmount";
          type: "u64";
          index: false;
        },
        {
          name: "stakingTokenAmount";
          type: "u64";
          index: false;
        },
        {
          name: "stakeManager";
          type: "publicKey";
          index: false;
        }
      ];
    },
    {
      name: "EventWithdraw";
      fields: [
        {
          name: "era";
          type: "u64";
          index: false;
        },
        {
          name: "user";
          type: "publicKey";
          index: false;
        },
        {
          name: "unstakeAccount";
          type: "publicKey";
          index: false;
        },
        {
          name: "withdrawAmount";
          type: "u64";
          index: false;
        },
        {
          name: "stakeManager";
          type: "publicKey";
          index: false;
        }
      ];
    }
  ];
  errors: [
    {
      code: 6000;
      name: "ProgramIdNotMatch";
      msg: "Program id not match";
    },
    {
      code: 6001;
      name: "RemainingAccountsNotMatch";
      msg: "Remaining accounts not match";
    },
    {
      code: 6002;
      name: "AdminNotMatch";
      msg: "Admin not match";
    },
    {
      code: 6003;
      name: "ParamsNotMatch";
      msg: "params not match";
    },
    {
      code: 6004;
      name: "PlatformFeeRecipientNotMatch";
      msg: "Platform fee recipient not match";
    },
    {
      code: 6005;
      name: "StakeAmountTooLow";
      msg: "Stake amount too low";
    },
    {
      code: 6006;
      name: "UnstakeUserNotMatch";
      msg: "Unstake user not match";
    },
    {
      code: 6007;
      name: "BalanceNotEnough";
      msg: "Balance not enough";
    },
    {
      code: 6008;
      name: "CalculationFail";
      msg: "Calulation fail";
    },
    {
      code: 6009;
      name: "EraIsLatest";
      msg: "Era is latest";
    },
    {
      code: 6010;
      name: "EraStatusNotMatch";
      msg: "Era status not match";
    },
    {
      code: 6011;
      name: "InvalidUnstakeAccount";
      msg: "Invalid unstake account";
    },
    {
      code: 6012;
      name: "UnstakeAccountNotWithdrawable";
      msg: "Unstake account not withdrawable";
    },
    {
      code: 6013;
      name: "UnstakeAccountAmountZero";
      msg: "Unstake account amount zero";
    },
    {
      code: 6014;
      name: "PoolBalanceNotEnough";
      msg: "Pool balance not enough";
    },
    {
      code: 6015;
      name: "UnstakeAmountIsZero";
      msg: "Unstake amount is zero";
    },
    {
      code: 6016;
      name: "RateChangeOverLimit";
      msg: "Rate change over limit";
    },
    {
      code: 6017;
      name: "LsdTokenMintAccountNotMatch";
      msg: "Lsd token mint account not match";
    },
    {
      code: 6018;
      name: "StakingTokenMintAccountNotMatch";
      msg: "Staking token mint account not match";
    },
    {
      code: 6019;
      name: "SpNotMatch";
      msg: "staking_program not match";
    },
    {
      code: 6020;
      name: "SpStakePoolNotMatch";
      msg: "staking_program stake pool not match";
    },
    {
      code: 6021;
      name: "SpStakeAccountNotMatch";
      msg: "staking_program stake account not match";
    },
    {
      code: 6022;
      name: "MintAuthorityNotMatch";
      msg: "Mint authority not match";
    },
    {
      code: 6023;
      name: "FreezeAuthorityNotMatch";
      msg: "Freeze authority not match";
    },
    {
      code: 6024;
      name: "MintSupplyNotEmpty";
      msg: "Mint supply not empty";
    },
    {
      code: 6025;
      name: "PendingAdminNotMatch";
      msg: "Pending admin not match";
    }
  ];
};

export const IDL: LsdProgram = {
  version: "0.1.0",
  name: "lsd_program",
  instructions: [
    {
      name: "initializeStakeManager",
      accounts: [
        {
          name: "admin",
          isMut: false,
          isSigner: true,
        },
        {
          name: "rentPayer",
          isMut: true,
          isSigner: true,
        },
        {
          name: "stakeManager",
          isMut: true,
          isSigner: false,
        },
        {
          name: "stakingPool",
          isMut: false,
          isSigner: false,
        },
        {
          name: "lsdTokenMint",
          isMut: true,
          isSigner: false,
        },
        {
          name: "stakingTokenMint",
          isMut: false,
          isSigner: false,
        },
        {
          name: "stakeManagerStakingTokenAccount",
          isMut: true,
          isSigner: false,
        },
        {
          name: "tokenProgram",
          isMut: false,
          isSigner: false,
        },
        {
          name: "associatedTokenProgram",
          isMut: false,
          isSigner: false,
        },
        {
          name: "systemProgram",
          isMut: false,
          isSigner: false,
        },
      ],
      args: [
        {
          name: "params",
          type: {
            defined: "InitializeStakeManagerParams",
          },
        },
      ],
    },
    {
      name: "transferStakeManagerAdmin",
      accounts: [
        {
          name: "admin",
          isMut: false,
          isSigner: true,
        },
        {
          name: "stakeManager",
          isMut: true,
          isSigner: false,
        },
      ],
      args: [
        {
          name: "newAdmin",
          type: "publicKey",
        },
      ],
    },
    {
      name: "acceptStakeManagerAdmin",
      accounts: [
        {
          name: "pendingAdmin",
          isMut: false,
          isSigner: true,
        },
        {
          name: "stakeManager",
          isMut: true,
          isSigner: false,
        },
      ],
      args: [],
    },
    {
      name: "configStakeManager",
      accounts: [
        {
          name: "admin",
          isMut: false,
          isSigner: true,
        },
        {
          name: "stakeManager",
          isMut: true,
          isSigner: false,
        },
      ],
      args: [
        {
          name: "params",
          type: {
            defined: "ConfigStakeManagerParams",
          },
        },
      ],
    },
    {
      name: "createMetadata",
      accounts: [
        {
          name: "feeAndRentPayer",
          isMut: true,
          isSigner: true,
        },
        {
          name: "admin",
          isMut: false,
          isSigner: true,
        },
        {
          name: "stakeManager",
          isMut: true,
          isSigner: false,
        },
        {
          name: "lsdTokenMint",
          isMut: true,
          isSigner: false,
        },
        {
          name: "metadataAccount",
          isMut: true,
          isSigner: false,
        },
        {
          name: "tokenProgram",
          isMut: false,
          isSigner: false,
        },
        {
          name: "metadataProgram",
          isMut: false,
          isSigner: false,
        },
        {
          name: "systemProgram",
          isMut: false,
          isSigner: false,
        },
        {
          name: "sysvarInstruction",
          isMut: false,
          isSigner: false,
        },
      ],
      args: [
        {
          name: "params",
          type: {
            defined: "CreateMetadataParams",
          },
        },
      ],
    },
    {
      name: "stake",
      accounts: [
        {
          name: "user",
          isMut: false,
          isSigner: true,
        },
        {
          name: "rentPayer",
          isMut: true,
          isSigner: true,
        },
        {
          name: "stakeManager",
          isMut: true,
          isSigner: false,
        },
        {
          name: "lsdTokenMint",
          isMut: true,
          isSigner: false,
        },
        {
          name: "stakingTokenMint",
          isMut: false,
          isSigner: false,
        },
        {
          name: "userLsdTokenAccount",
          isMut: true,
          isSigner: false,
        },
        {
          name: "userStakingTokenAccount",
          isMut: true,
          isSigner: false,
        },
        {
          name: "stakeManagerStakingTokenAccount",
          isMut: true,
          isSigner: false,
        },
        {
          name: "tokenProgram",
          isMut: false,
          isSigner: false,
        },
        {
          name: "associatedTokenProgram",
          isMut: false,
          isSigner: false,
        },
        {
          name: "systemProgram",
          isMut: false,
          isSigner: false,
        },
      ],
      args: [
        {
          name: "stakeAmount",
          type: "u64",
        },
      ],
    },
    {
      name: "unstake",
      accounts: [
        {
          name: "user",
          isMut: false,
          isSigner: true,
        },
        {
          name: "rentPayer",
          isMut: true,
          isSigner: true,
        },
        {
          name: "stakeManager",
          isMut: true,
          isSigner: false,
        },
        {
          name: "lsdTokenMint",
          isMut: true,
          isSigner: false,
        },
        {
          name: "userLsdTokenAccount",
          isMut: true,
          isSigner: false,
        },
        {
          name: "unstakeAccount",
          isMut: true,
          isSigner: true,
        },
        {
          name: "tokenProgram",
          isMut: false,
          isSigner: false,
        },
        {
          name: "associatedTokenProgram",
          isMut: false,
          isSigner: false,
        },
        {
          name: "systemProgram",
          isMut: false,
          isSigner: false,
        },
      ],
      args: [
        {
          name: "unstakeAmount",
          type: "u64",
        },
      ],
    },
    {
      name: "withdraw",
      accounts: [
        {
          name: "user",
          isMut: false,
          isSigner: true,
        },
        {
          name: "rentPayer",
          isMut: true,
          isSigner: true,
        },
        {
          name: "stakeManager",
          isMut: true,
          isSigner: false,
        },
        {
          name: "unstakeAccount",
          isMut: true,
          isSigner: false,
        },
        {
          name: "stakingTokenMint",
          isMut: false,
          isSigner: false,
        },
        {
          name: "userStakingTokenAccount",
          isMut: true,
          isSigner: false,
        },
        {
          name: "stakeManagerStakingTokenAccount",
          isMut: true,
          isSigner: false,
        },
        {
          name: "tokenProgram",
          isMut: false,
          isSigner: false,
        },
        {
          name: "associatedTokenProgram",
          isMut: false,
          isSigner: false,
        },
        {
          name: "systemProgram",
          isMut: false,
          isSigner: false,
        },
      ],
      args: [],
    },
    {
      name: "eraNew",
      accounts: [
        {
          name: "stakeManager",
          isMut: true,
          isSigner: false,
        },
      ],
      args: [],
    },
    {
      name: "eraBond",
      accounts: [
        {
          name: "feeAndRentPayer",
          isMut: true,
          isSigner: true,
        },
        {
          name: "stakeManager",
          isMut: true,
          isSigner: false,
        },
        {
          name: "stakingTokenMint",
          isMut: false,
          isSigner: false,
        },
        {
          name: "stakeManagerStakingTokenAccount",
          isMut: true,
          isSigner: false,
        },
        {
          name: "stakingPool",
          isMut: true,
          isSigner: false,
        },
        {
          name: "stakingPoolStakingTokenAccount",
          isMut: true,
          isSigner: false,
        },
        {
          name: "stakingStakeAccount",
          isMut: true,
          isSigner: false,
        },
        {
          name: "stakingProgram",
          isMut: false,
          isSigner: false,
        },
        {
          name: "tokenProgram",
          isMut: false,
          isSigner: false,
        },
        {
          name: "associatedTokenProgram",
          isMut: false,
          isSigner: false,
        },
        {
          name: "systemProgram",
          isMut: false,
          isSigner: false,
        },
      ],
      args: [],
    },
    {
      name: "eraUnbond",
      accounts: [
        {
          name: "feeAndRentPayer",
          isMut: true,
          isSigner: true,
        },
        {
          name: "stakeManager",
          isMut: true,
          isSigner: false,
        },
        {
          name: "stakingPool",
          isMut: true,
          isSigner: false,
        },
        {
          name: "stakingStakeAccount",
          isMut: true,
          isSigner: false,
        },
        {
          name: "stakingUnstakeAccount",
          isMut: true,
          isSigner: true,
        },
        {
          name: "stakingProgram",
          isMut: false,
          isSigner: false,
        },
        {
          name: "systemProgram",
          isMut: false,
          isSigner: false,
        },
      ],
      args: [],
    },
    {
      name: "eraWithdraw",
      accounts: [
        {
          name: "feeAndRentPayer",
          isMut: true,
          isSigner: true,
        },
        {
          name: "stakeManager",
          isMut: true,
          isSigner: false,
        },
        {
          name: "stakingPool",
          isMut: true,
          isSigner: false,
        },
        {
          name: "stakingTokenMint",
          isMut: false,
          isSigner: false,
        },
        {
          name: "stakeManagerStakingTokenAccount",
          isMut: true,
          isSigner: false,
        },
        {
          name: "stakingPoolStakingTokenAccount",
          isMut: true,
          isSigner: false,
        },
        {
          name: "stakingUnstakeAccount",
          isMut: true,
          isSigner: false,
        },
        {
          name: "stakingProgram",
          isMut: false,
          isSigner: false,
        },
        {
          name: "tokenProgram",
          isMut: false,
          isSigner: false,
        },
        {
          name: "associatedTokenProgram",
          isMut: false,
          isSigner: false,
        },
        {
          name: "systemProgram",
          isMut: false,
          isSigner: false,
        },
      ],
      args: [],
    },
    {
      name: "eraActive",
      accounts: [
        {
          name: "rentPayer",
          isMut: true,
          isSigner: true,
        },
        {
          name: "admin",
          isMut: true,
          isSigner: false,
        },
        {
          name: "stakeManager",
          isMut: true,
          isSigner: false,
        },
        {
          name: "lsdTokenMint",
          isMut: true,
          isSigner: false,
        },
        {
          name: "stakingTokenMint",
          isMut: false,
          isSigner: false,
        },
        {
          name: "stakeManagerStakingTokenAccount",
          isMut: true,
          isSigner: false,
        },
        {
          name: "platformFeeRecipient",
          isMut: true,
          isSigner: false,
        },
        {
          name: "stakingPool",
          isMut: true,
          isSigner: false,
        },
        {
          name: "stakingPoolStakingTokenAccount",
          isMut: true,
          isSigner: false,
        },
        {
          name: "stakingStakeAccount",
          isMut: true,
          isSigner: false,
        },
        {
          name: "stakingProgram",
          isMut: false,
          isSigner: false,
        },
        {
          name: "tokenProgram",
          isMut: false,
          isSigner: false,
        },
        {
          name: "associatedTokenProgram",
          isMut: false,
          isSigner: false,
        },
        {
          name: "systemProgram",
          isMut: false,
          isSigner: false,
        },
      ],
      args: [],
    },
  ],
  accounts: [
    {
      name: "stakeManager",
      type: {
        kind: "struct",
        fields: [
          {
            name: "creator",
            type: "publicKey",
          },
          {
            name: "index",
            type: "u8",
          },
          {
            name: "admin",
            type: "publicKey",
          },
          {
            name: "pendingAdmin",
            type: "publicKey",
          },
          {
            name: "poolSeedBump",
            type: "u8",
          },
          {
            name: "lsdTokenMint",
            type: "publicKey",
          },
          {
            name: "stakingProgram",
            type: "publicKey",
          },
          {
            name: "stakingTokenMint",
            type: "publicKey",
          },
          {
            name: "stakingPool",
            type: "publicKey",
          },
          {
            name: "stakingMinStakeAmount",
            type: "u64",
          },
          {
            name: "eraSeconds",
            type: "i64",
          },
          {
            name: "eraOffset",
            type: "i64",
          },
          {
            name: "minStakeAmount",
            type: "u64",
          },
          {
            name: "platformFeeCommission",
            type: "u64",
          },
          {
            name: "rateChangeLimit",
            type: "u64",
          },
          {
            name: "unbondingDuration",
            type: "u64",
          },
          {
            name: "eraStatus",
            type: {
              defined: "EraStatus",
            },
          },
          {
            name: "latestEra",
            type: "u64",
          },
          {
            name: "rate",
            type: "u64",
          },
          {
            name: "eraBond",
            type: "u64",
          },
          {
            name: "eraUnbond",
            type: "u64",
          },
          {
            name: "pendingBond",
            type: "u64",
          },
          {
            name: "pendingUnbond",
            type: "u64",
          },
          {
            name: "active",
            type: "u64",
          },
          {
            name: "totalPlatformFee",
            type: "u64",
          },
          {
            name: "eraRates",
            type: {
              vec: {
                defined: "EraRate",
              },
            },
          },
          {
            name: "reserved",
            docs: ["Reserved space for future upgrades. Do not use."],
            type: {
              array: ["u8", 256],
            },
          },
        ],
      },
    },
    {
      name: "unstakeAccount",
      type: {
        kind: "struct",
        fields: [
          {
            name: "stakeManager",
            type: "publicKey",
          },
          {
            name: "user",
            type: "publicKey",
          },
          {
            name: "amount",
            type: "u64",
          },
          {
            name: "withdrawableEra",
            type: "u64",
          },
          {
            name: "reserved",
            docs: ["Reserved space for future upgrades. Do not use."],
            type: {
              array: ["u8", 128],
            },
          },
        ],
      },
    },
  ],
  types: [
    {
      name: "ConfigStakeManagerParams",
      type: {
        kind: "struct",
        fields: [
          {
            name: "minStakeAmount",
            type: {
              option: "u64",
            },
          },
          {
            name: "platformFeeCommission",
            type: {
              option: "u64",
            },
          },
          {
            name: "rateChangeLimit",
            type: {
              option: "u64",
            },
          },
        ],
      },
    },
    {
      name: "InitializeStakeManagerParams",
      type: {
        kind: "struct",
        fields: [
          {
            name: "eraSeconds",
            type: "i64",
          },
          {
            name: "index",
            type: "u8",
          },
        ],
      },
    },
    {
      name: "CreateMetadataParams",
      type: {
        kind: "struct",
        fields: [
          {
            name: "tokenName",
            type: "string",
          },
          {
            name: "tokenSymbol",
            type: "string",
          },
          {
            name: "tokenUri",
            type: "string",
          },
        ],
      },
    },
    {
      name: "EraRate",
      type: {
        kind: "struct",
        fields: [
          {
            name: "era",
            type: "u64",
          },
          {
            name: "rate",
            type: "u64",
          },
        ],
      },
    },
    {
      name: "EraStatus",
      type: {
        kind: "enum",
        variants: [
          {
            name: "EraUpdated",
          },
          {
            name: "Bonded",
          },
          {
            name: "Unbonded",
          },
          {
            name: "ActiveUpdated",
          },
        ],
      },
    },
  ],
  events: [
    {
      name: "EventEraActive",
      fields: [
        {
          name: "era",
          type: "u64",
          index: false,
        },
        {
          name: "rate",
          type: "u64",
          index: false,
        },
        {
          name: "platformFee",
          type: "u64",
          index: false,
        },
      ],
    },
    {
      name: "EventEraBond",
      fields: [
        {
          name: "era",
          type: "u64",
          index: false,
        },
      ],
    },
    {
      name: "EventEraNew",
      fields: [
        {
          name: "newEra",
          type: "u64",
          index: false,
        },
      ],
    },
    {
      name: "EventEraUnbond",
      fields: [
        {
          name: "era",
          type: "u64",
          index: false,
        },
      ],
    },
    {
      name: "EventEraWithdraw",
      fields: [
        {
          name: "era",
          type: "u64",
          index: false,
        },
      ],
    },
    {
      name: "EventStake",
      fields: [
        {
          name: "era",
          type: "u64",
          index: false,
        },
        {
          name: "staker",
          type: "publicKey",
          index: false,
        },
        {
          name: "stakeAmount",
          type: "u64",
          index: false,
        },
        {
          name: "lsdTokenAmount",
          type: "u64",
          index: false,
        },
        {
          name: "stakeManager",
          type: "publicKey",
          index: false,
        },
      ],
    },
    {
      name: "EventUnstake",
      fields: [
        {
          name: "era",
          type: "u64",
          index: false,
        },
        {
          name: "staker",
          type: "publicKey",
          index: false,
        },
        {
          name: "unstakeAccount",
          type: "publicKey",
          index: false,
        },
        {
          name: "unstakeAmount",
          type: "u64",
          index: false,
        },
        {
          name: "stakingTokenAmount",
          type: "u64",
          index: false,
        },
        {
          name: "stakeManager",
          type: "publicKey",
          index: false,
        },
      ],
    },
    {
      name: "EventWithdraw",
      fields: [
        {
          name: "era",
          type: "u64",
          index: false,
        },
        {
          name: "user",
          type: "publicKey",
          index: false,
        },
        {
          name: "unstakeAccount",
          type: "publicKey",
          index: false,
        },
        {
          name: "withdrawAmount",
          type: "u64",
          index: false,
        },
        {
          name: "stakeManager",
          type: "publicKey",
          index: false,
        },
      ],
    },
  ],
  errors: [
    {
      code: 6000,
      name: "ProgramIdNotMatch",
      msg: "Program id not match",
    },
    {
      code: 6001,
      name: "RemainingAccountsNotMatch",
      msg: "Remaining accounts not match",
    },
    {
      code: 6002,
      name: "AdminNotMatch",
      msg: "Admin not match",
    },
    {
      code: 6003,
      name: "ParamsNotMatch",
      msg: "params not match",
    },
    {
      code: 6004,
      name: "PlatformFeeRecipientNotMatch",
      msg: "Platform fee recipient not match",
    },
    {
      code: 6005,
      name: "StakeAmountTooLow",
      msg: "Stake amount too low",
    },
    {
      code: 6006,
      name: "UnstakeUserNotMatch",
      msg: "Unstake user not match",
    },
    {
      code: 6007,
      name: "BalanceNotEnough",
      msg: "Balance not enough",
    },
    {
      code: 6008,
      name: "CalculationFail",
      msg: "Calulation fail",
    },
    {
      code: 6009,
      name: "EraIsLatest",
      msg: "Era is latest",
    },
    {
      code: 6010,
      name: "EraStatusNotMatch",
      msg: "Era status not match",
    },
    {
      code: 6011,
      name: "InvalidUnstakeAccount",
      msg: "Invalid unstake account",
    },
    {
      code: 6012,
      name: "UnstakeAccountNotWithdrawable",
      msg: "Unstake account not withdrawable",
    },
    {
      code: 6013,
      name: "UnstakeAccountAmountZero",
      msg: "Unstake account amount zero",
    },
    {
      code: 6014,
      name: "PoolBalanceNotEnough",
      msg: "Pool balance not enough",
    },
    {
      code: 6015,
      name: "UnstakeAmountIsZero",
      msg: "Unstake amount is zero",
    },
    {
      code: 6016,
      name: "RateChangeOverLimit",
      msg: "Rate change over limit",
    },
    {
      code: 6017,
      name: "LsdTokenMintAccountNotMatch",
      msg: "Lsd token mint account not match",
    },
    {
      code: 6018,
      name: "StakingTokenMintAccountNotMatch",
      msg: "Staking token mint account not match",
    },
    {
      code: 6019,
      name: "SpNotMatch",
      msg: "staking_program not match",
    },
    {
      code: 6020,
      name: "SpStakePoolNotMatch",
      msg: "staking_program stake pool not match",
    },
    {
      code: 6021,
      name: "SpStakeAccountNotMatch",
      msg: "staking_program stake account not match",
    },
    {
      code: 6022,
      name: "MintAuthorityNotMatch",
      msg: "Mint authority not match",
    },
    {
      code: 6023,
      name: "FreezeAuthorityNotMatch",
      msg: "Freeze authority not match",
    },
    {
      code: 6024,
      name: "MintSupplyNotEmpty",
      msg: "Mint supply not empty",
    },
    {
      code: 6025,
      name: "PendingAdminNotMatch",
      msg: "Pending admin not match",
    },
  ],
};
