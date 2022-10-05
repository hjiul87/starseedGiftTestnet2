import { createSlice } from '@reduxjs/toolkit';


// const classes = {
//   "Baby Class": {
//     name: "Baby Class",
//     description: "Smallest Star Station Class",
//     image:
//       "https://storageapi.fleek.co/aeb85deb-410a-4c50-8834-96486196b392-bucket/videos/square-Space junker.mp4",
//     startingWeight: 1.5,
//     upgradeRate: 0.001,
//     price: 2,
//     maxUpgrade: 2000,
//     apr: "22.08%",
//     pid: 0,
//   },
//   // METEOR STATION
//   "Meteor Class": {
//     name: "Meteor Class",
//     description: "Medium Star Station Class",
//     image:
//       "https://storageapi.fleek.co/aeb85deb-410a-4c50-8834-96486196b392-bucket/videos/astroid Colony.mp4",
//     startingWeight: 10,
//     upgradeRate: 0.01,
//     price: 11,
//     maxUpgrade: 20,
//     apr: "28.10%",
//     pid: 1,
//   },
//   // CITY STATION
//   "City Station": {
//     name: "City Station",
//     description: "Large Star Station Class",
//     image:
//       "https://storageapi.fleek.co/aeb85deb-410a-4c50-8834-96486196b392-bucket/videos/Atlantean Mothership.mp4",
//     startingWeight: 33,
//     upgradeRate: 0.03,
//     price: 33,
//     maxUpgrade: 66,
//     apr: "29.44%",
//     pid: 2,
//   },
//   // PLANET STATION
//   "Planet Class": {
//     name: "Planet Class",
//     description: "Largest Star Station Class",
//     image:
//       "https://storageapi.fleek.co/aeb85deb-410a-4c50-8834-96486196b392-bucket/videos/Square-Automated Planet.mp4",
//     startingWeight: 115,
//     upgradeRate: 0.1,
//     price: 111,
//     maxUpgrade: 240,
//     apr: "30.50%",
//     pid: 3,
//   },
// };


const gameDataSlice = createSlice({
  name: 'gameData',  
  initialState: {
    admins:['0x599ae0c9bccb202778022efdd0eda5ebc9ee8d69'],
    baseUrl : 'http://hjiul87.github.io/starseedGiftTestnet2',
    // baseUrl : 'http://localhost:3000',
    polygonRatesAddress:'https://gasstation-mainnet.matic.network/v2', // mainnet
    // chainIdtest : "0x89", // "mainnet"
    chainIdtest : '0x13881', // "testnet"
    // controllerContractAddress : "0x22d7Ece246A966Cf15820f03E1cd6730204f9D0e", // "mainnet"
    controllerContractAddress :  "0xd0665Dfc6dF2c07C63Eeb6a51E6Cc4d030FD4700", // "testnet"    
  // stationContractAddress : "0x2AD4316391d004551c05bffb693040Df998d5143", // "mainnet",//
    stationContractAddress : "0x757AcAb75e7AE6f7485bf19EE71499a4676e694d", // "testnet",//    
    // starContractAddress : "0x8440178087C4fd348D43d0205F4574e0348a06F0", // "mainnet",//
    starContractAddress : "0x7Ba798157147e37Dc4c54bDFa2aF013BAf3C02c2", // "testnet"
    starContractAbi : [
      { inputs: [], stateMutability: "nonpayable", type: "constructor" },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: "address",
            name: "owner",
            type: "address",
          },
          {
            indexed: true,
            internalType: "address",
            name: "spender",
            type: "address",
          },
          {
            indexed: false,
            internalType: "uint256",
            name: "value",
            type: "uint256",
          },
        ],
        name: "Approval",
        type: "event",
      },
      {
        anonymous: false,
        inputs: [
          { indexed: false, internalType: "bool", name: "enabled", type: "bool" },
        ],
        name: "BuyBackEnabledUpdated",
        type: "event",
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: "address",
            name: "previousOwner",
            type: "address",
          },
          {
            indexed: true,
            internalType: "address",
            name: "newOwner",
            type: "address",
          },
        ],
        name: "OwnershipTransferred",
        type: "event",
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: false,
            internalType: "uint256",
            name: "tokenAmount",
            type: "uint256",
          },
        ],
        name: "RewardLiquidityProviders",
        type: "event",
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: false,
            internalType: "uint256",
            name: "tokensSwapped",
            type: "uint256",
          },
          {
            indexed: false,
            internalType: "uint256",
            name: "ethReceived",
            type: "uint256",
          },
          {
            indexed: false,
            internalType: "uint256",
            name: "tokensIntoLiqudity",
            type: "uint256",
          },
        ],
        name: "SwapAndLiquify",
        type: "event",
      },
      {
        anonymous: false,
        inputs: [
          { indexed: false, internalType: "bool", name: "enabled", type: "bool" },
        ],
        name: "SwapAndLiquifyEnabledUpdated",
        type: "event",
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: false,
            internalType: "uint256",
            name: "amountIn",
            type: "uint256",
          },
          {
            indexed: false,
            internalType: "address[]",
            name: "path",
            type: "address[]",
          },
        ],
        name: "SwapETHForTokens",
        type: "event",
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: false,
            internalType: "uint256",
            name: "amountIn",
            type: "uint256",
          },
          {
            indexed: false,
            internalType: "address[]",
            name: "path",
            type: "address[]",
          },
        ],
        name: "SwapTokensForETH",
        type: "event",
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: "address",
            name: "from",
            type: "address",
          },
          { indexed: true, internalType: "address", name: "to", type: "address" },
          {
            indexed: false,
            internalType: "uint256",
            name: "value",
            type: "uint256",
          },
        ],
        name: "Transfer",
        type: "event",
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: false,
            internalType: "uint256",
            name: "newRate",
            type: "uint256",
          },
        ],
        name: "UpdateDevFee",
        type: "event",
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: false,
            internalType: "uint256",
            name: "newRate",
            type: "uint256",
          },
        ],
        name: "UpdateFundOrBurnFee",
        type: "event",
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: false,
            internalType: "uint256",
            name: "newRate",
            type: "uint256",
          },
        ],
        name: "UpdateLiquidityFee",
        type: "event",
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: false,
            internalType: "uint256",
            name: "newAmount",
            type: "uint256",
          },
        ],
        name: "UpdateMaxTxAmount",
        type: "event",
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: false,
            internalType: "uint256",
            name: "newRate",
            type: "uint256",
          },
        ],
        name: "UpdateTaxFee",
        type: "event",
      },
      {
        inputs: [],
        name: "MAX_DEV_FEE",
        outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [],
        name: "MAX_FUND_OR_BURN_FEE",
        outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [],
        name: "MAX_LIQUIDITY_FEE",
        outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [],
        name: "MAX_TAX_FEE",
        outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [],
        name: "MIN_TX_AMOUNT_HARD_CAP",
        outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [],
        name: "_devFee",
        outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [],
        name: "_fundOrBurnFee",
        outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [],
        name: "_liquidityFee",
        outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [],
        name: "_maxTxAmount",
        outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [],
        name: "_taxFee",
        outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [
          { internalType: "address", name: "owner", type: "address" },
          { internalType: "address", name: "spender", type: "address" },
        ],
        name: "allowance",
        outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [
          { internalType: "address", name: "spender", type: "address" },
          { internalType: "uint256", name: "amount", type: "uint256" },
        ],
        name: "approve",
        outputs: [{ internalType: "bool", name: "", type: "bool" }],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [{ internalType: "address", name: "account", type: "address" }],
        name: "balanceOf",
        outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [{ internalType: "uint256", name: "_amount", type: "uint256" }],
        name: "buyBackAndBurn",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [],
        name: "buyBackEnabled",
        outputs: [{ internalType: "bool", name: "", type: "bool" }],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [],
        name: "buyBackUpperLimitAmount",
        outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [],
        name: "deadAddress",
        outputs: [{ internalType: "address", name: "", type: "address" }],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [],
        name: "decimals",
        outputs: [{ internalType: "uint8", name: "", type: "uint8" }],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [
          { internalType: "address", name: "spender", type: "address" },
          { internalType: "uint256", name: "subtractedValue", type: "uint256" },
        ],
        name: "decreaseAllowance",
        outputs: [{ internalType: "bool", name: "", type: "bool" }],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [{ internalType: "address", name: "account", type: "address" }],
        name: "excludeFromFee",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [{ internalType: "address", name: "account", type: "address" }],
        name: "excludeFromReward",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [{ internalType: "address", name: "account", type: "address" }],
        name: "includeInFee",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [{ internalType: "address", name: "account", type: "address" }],
        name: "includeInReward",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [
          { internalType: "address", name: "spender", type: "address" },
          { internalType: "uint256", name: "addedValue", type: "uint256" },
        ],
        name: "increaseAllowance",
        outputs: [{ internalType: "bool", name: "", type: "bool" }],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [{ internalType: "address", name: "_account", type: "address" }],
        name: "isExcludedFromAntiWhale",
        outputs: [{ internalType: "bool", name: "", type: "bool" }],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [{ internalType: "address", name: "account", type: "address" }],
        name: "isExcludedFromFee",
        outputs: [{ internalType: "bool", name: "", type: "bool" }],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [{ internalType: "address", name: "account", type: "address" }],
        name: "isExcludedFromReward",
        outputs: [{ internalType: "bool", name: "", type: "bool" }],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [{ internalType: "address", name: "_address", type: "address" }],
        name: "isIncludedInStarLpList",
        outputs: [{ internalType: "bool", name: "", type: "bool" }],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [],
        name: "minimumBalanceRequired",
        outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [],
        name: "minimumSellOrderAmount",
        outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [],
        name: "minimumTokensBeforeSwapAmount",
        outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [],
        name: "name",
        outputs: [{ internalType: "string", name: "", type: "string" }],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [],
        name: "owner",
        outputs: [{ internalType: "address", name: "", type: "address" }],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [
          { internalType: "uint256", name: "tAmount", type: "uint256" },
          { internalType: "bool", name: "deductTransferFee", type: "bool" },
        ],
        name: "reflectionFromToken",
        outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [],
        name: "renounceOwnership",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [{ internalType: "bool", name: "_enabled", type: "bool" }],
        name: "setBuyBackEnabled",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [
          { internalType: "uint256", name: "buyBackLimit", type: "uint256" },
        ],
        name: "setBuybackUpperLimit",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [{ internalType: "uint256", name: "devFee", type: "uint256" }],
        name: "setDevFeePercent",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [
          { internalType: "address", name: "_account", type: "address" },
          { internalType: "bool", name: "_isExcludedOrNot", type: "bool" },
        ],
        name: "setExcludedFromAntiWhale",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [
          { internalType: "uint256", name: "fundorBurnFee", type: "uint256" },
        ],
        name: "setFundOrBurnFeePercent",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [
          { internalType: "address", name: "_address", type: "address" },
          { internalType: "bool", name: "_isIncludedOrNot", type: "bool" },
        ],
        name: "setIncludeInStarLpList",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [
          { internalType: "uint256", name: "liquidityFee", type: "uint256" },
        ],
        name: "setLiquidityFeePercent",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [
          { internalType: "uint256", name: "maxTxAmount", type: "uint256" },
        ],
        name: "setMaxTxAmount",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [
          { internalType: "uint256", name: "_newAmount", type: "uint256" },
        ],
        name: "setMinimumBalanceRequired",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [
          { internalType: "uint256", name: "_newAmount", type: "uint256" },
        ],
        name: "setMinimumSellOrderAmount",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "uint256",
            name: "_minimumTokensBeforeSwap",
            type: "uint256",
          },
        ],
        name: "setNumTokensSellToAddToLiquidity",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [{ internalType: "bool", name: "_enabled", type: "bool" }],
        name: "setSwapAndLiquifyEnabled",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [{ internalType: "uint256", name: "taxFee", type: "uint256" }],
        name: "setTaxFeePercent",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [],
        name: "swapAndLiquifyEnabled",
        outputs: [{ internalType: "bool", name: "", type: "bool" }],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [],
        name: "symbol",
        outputs: [{ internalType: "string", name: "", type: "string" }],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [{ internalType: "uint256", name: "rAmount", type: "uint256" }],
        name: "tokenFromReflection",
        outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [],
        name: "totalFees",
        outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [],
        name: "totalSupply",
        outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [
          { internalType: "address", name: "recipient", type: "address" },
          { internalType: "uint256", name: "amount", type: "uint256" },
        ],
        name: "transfer",
        outputs: [{ internalType: "bool", name: "", type: "bool" }],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [
          { internalType: "address", name: "sender", type: "address" },
          { internalType: "address", name: "recipient", type: "address" },
          { internalType: "uint256", name: "amount", type: "uint256" },
        ],
        name: "transferFrom",
        outputs: [{ internalType: "bool", name: "", type: "bool" }],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [{ internalType: "address", name: "newOwner", type: "address" }],
        name: "transferOwnership",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [],
        name: "uniswapV2Pair",
        outputs: [{ internalType: "address", name: "", type: "address" }],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [],
        name: "uniswapV2Router",
        outputs: [
          {
            internalType: "contract IUniswapV2Router02",
            name: "",
            type: "address",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      { stateMutability: "payable", type: "receive" },
    ],
    stationContractABI : [
      { inputs: [], stateMutability: "nonpayable", type: "constructor" },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: "address",
            name: "owner",
            type: "address",
          },
          {
            indexed: true,
            internalType: "address",
            name: "approved",
            type: "address",
          },
          {
            indexed: true,
            internalType: "uint256",
            name: "tokenId",
            type: "uint256",
          },
        ],
        name: "Approval",
        type: "event",
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: "address",
            name: "owner",
            type: "address",
          },
          {
            indexed: true,
            internalType: "address",
            name: "operator",
            type: "address",
          },
          {
            indexed: false,
            internalType: "bool",
            name: "approved",
            type: "bool",
          },
        ],
        name: "ApprovalForAll",
        type: "event",
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: "address",
            name: "previousOwner",
            type: "address",
          },
          {
            indexed: true,
            internalType: "address",
            name: "newOwner",
            type: "address",
          },
        ],
        name: "OwnershipTransferred",
        type: "event",
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: "address",
            name: "from",
            type: "address",
          },
          {
            indexed: true,
            internalType: "address",
            name: "to",
            type: "address",
          },
          {
            indexed: true,
            internalType: "uint256",
            name: "tokenId",
            type: "uint256",
          },
        ],
        name: "Transfer",
        type: "event",
      },
      {
        inputs: [
          {
            internalType: "uint256",
            name: "",
            type: "uint256",
          },
        ],
        name: "_tokenWeight",
        outputs: [
          {
            internalType: "uint256",
            name: "",
            type: "uint256",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "address",
            name: "to",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "tokenId",
            type: "uint256",
          },
        ],
        name: "approve",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [{ internalType: "address", name: "owner", type: "address" }],
        name: "balanceOf",
        outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [{ internalType: "uint256", name: "tokenId", type: "uint256" }],
        name: "getApproved",
        outputs: [{ internalType: "address", name: "", type: "address" }],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [
          { internalType: "address", name: "owner", type: "address" },
          {
            internalType: "address",
            name: "operator",
            type: "address",
          },
        ],
        name: "isApprovedForAll",
        outputs: [{ internalType: "bool", name: "", type: "bool" }],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [],
        name: "name",
        outputs: [{ internalType: "string", name: "", type: "string" }],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [],
        name: "owner",
        outputs: [{ internalType: "address", name: "", type: "address" }],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [{ internalType: "uint256", name: "tokenId", type: "uint256" }],
        name: "ownerOf",
        outputs: [{ internalType: "address", name: "", type: "address" }],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [],
        name: "renounceOwnership",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [
          { internalType: "address", name: "to", type: "address" },
          {
            internalType: "string",
            name: "uri",
            type: "string",
          },
          {
            internalType: "uint256",
            name: "weight",
            type: "uint256",
          },
        ],
        name: "safeMint",
        outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [
          { internalType: "address", name: "from", type: "address" },
          { internalType: "address", name: "to", type: "address" },
          { internalType: "uint256", name: "tokenId", type: "uint256" },
        ],
        name: "safeTransferFrom",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [
          { internalType: "address", name: "from", type: "address" },
          { internalType: "address", name: "to", type: "address" },
          { internalType: "uint256", name: "tokenId", type: "uint256" },
          { internalType: "bytes", name: "data", type: "bytes" },
        ],
        name: "safeTransferFrom",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [
          { internalType: "address", name: "operator", type: "address" },
          { internalType: "bool", name: "approved", type: "bool" },
        ],
        name: "setApprovalForAll",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [
          { internalType: "bytes4", name: "interfaceId", type: "bytes4" },
        ],
        name: "supportsInterface",
        outputs: [{ internalType: "bool", name: "", type: "bool" }],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [],
        name: "symbol",
        outputs: [{ internalType: "string", name: "", type: "string" }],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [{ internalType: "uint256", name: "index", type: "uint256" }],
        name: "tokenByIndex",
        outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [
          { internalType: "address", name: "owner", type: "address" },
          { internalType: "uint256", name: "index", type: "uint256" },
        ],
        name: "tokenOfOwnerByIndex",
        outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [{ internalType: "uint256", name: "tokenId", type: "uint256" }],
        name: "tokenURI",
        outputs: [{ internalType: "string", name: "", type: "string" }],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [],
        name: "totalSupply",
        outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [
          { internalType: "address", name: "from", type: "address" },
          { internalType: "address", name: "to", type: "address" },
          { internalType: "uint256", name: "tokenId", type: "uint256" },
        ],
        name: "transferFrom",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [
          { internalType: "address", name: "newOwner", type: "address" },
        ],
        name: "transferOwnership",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [
          { internalType: "uint256", name: "tokenId", type: "uint256" },
          { internalType: "uint256", name: "increase", type: "uint256" },
        ],
        name: "updateWeight",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [{ internalType: "uint256", name: "tokenId", type: "uint256" }],
        name: "weightOf",
        outputs: [{ internalType: "uint256", name: "weight", type: "uint256" }],
        stateMutability: "view",
        type: "function",
      },
    ],  
    controllerContractAbi : [
      {
        "inputs": [
          {
            "internalType": "uint256",
            "name": "_emissionRate",
            "type": "uint256"
          },
          {
            "internalType": "address",
            "name": "_stationAddress",
            "type": "address"
          },
          {
            "internalType": "address",
            "name": "_rewardPool",
            "type": "address"
          }
        ],
        "stateMutability": "nonpayable",
        "type": "constructor"
      },
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": false,
            "internalType": "address",
            "name": "user",
            "type": "address"
          },
          {
            "indexed": false,
            "internalType": "uint256",
            "name": "class",
            "type": "uint256"
          }
        ],
        "name": "BuyGift",
        "type": "event"
      },
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": false,
            "internalType": "address",
            "name": "user",
            "type": "address"
          },
          {
            "indexed": false,
            "internalType": "uint256",
            "name": "tokenId",
            "type": "uint256"
          },
          {
            "indexed": false,
            "internalType": "uint256",
            "name": "class",
            "type": "uint256"
          }
        ],
        "name": "MintNFT",
        "type": "event"
      },
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": true,
            "internalType": "address",
            "name": "previousOwner",
            "type": "address"
          },
          {
            "indexed": true,
            "internalType": "address",
            "name": "newOwner",
            "type": "address"
          }
        ],
        "name": "OwnershipTransferred",
        "type": "event"
      },
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": false,
            "internalType": "address",
            "name": "user",
            "type": "address"
          },
          {
            "indexed": false,
            "internalType": "uint256",
            "name": "tokenId",
            "type": "uint256"
          },
          {
            "indexed": false,
            "internalType": "uint256",
            "name": "class",
            "type": "uint256"
          },
          {
            "indexed": false,
            "internalType": "string",
            "name": "giftCode",
            "type": "string"
          }
        ],
        "name": "RedeemGift",
        "type": "event"
      },
      {
        "inputs": [
          {
            "components": [
              {
                "internalType": "uint256",
                "name": "startingWeight",
                "type": "uint256"
              },
              {
                "internalType": "uint256",
                "name": "upgradeRate",
                "type": "uint256"
              },
              {
                "internalType": "uint256",
                "name": "price",
                "type": "uint256"
              },
              {
                "internalType": "uint256",
                "name": "maxUpgrade",
                "type": "uint256"
              },
              {
                "internalType": "string",
                "name": "uri",
                "type": "string"
              }
            ],
            "internalType": "struct NexusStarStation_Control.StationClass",
            "name": "_station",
            "type": "tuple"
          }
        ],
        "name": "addClass",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "uint256",
            "name": "_classPID",
            "type": "uint256"
          }
        ],
        "name": "buyGift",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "getEmission",
        "outputs": [
          {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "getStations",
        "outputs": [
          {
            "components": [
              {
                "internalType": "uint256",
                "name": "tokenId",
                "type": "uint256"
              },
              {
                "internalType": "uint256",
                "name": "class",
                "type": "uint256"
              },
              {
                "internalType": "uint256",
                "name": "weight",
                "type": "uint256"
              },
              {
                "internalType": "uint256",
                "name": "lastUpdate",
                "type": "uint256"
              }
            ],
            "internalType": "struct NexusStarStation_Control.SpaceStations[]",
            "name": "",
            "type": "tuple[]"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "getWeight",
        "outputs": [
          {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "uint256",
            "name": "_classPID",
            "type": "uint256"
          }
        ],
        "name": "mintNFT",
        "outputs": [
          {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
          }
        ],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "owner",
        "outputs": [
          {
            "internalType": "address",
            "name": "",
            "type": "address"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "_recipient",
            "type": "address"
          },
          {
            "internalType": "uint256",
            "name": "_classPID",
            "type": "uint256"
          },
          {
            "internalType": "string",
            "name": "_giftCode",
            "type": "string"
          }
        ],
        "name": "redeemGift",
        "outputs": [
          {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
          }
        ],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "renounceOwnership",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "uint256",
            "name": "_burnRate",
            "type": "uint256"
          }
        ],
        "name": "setBurnRate",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "uint256",
            "name": "_increase",
            "type": "uint256"
          }
        ],
        "name": "setMaxIncrease",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "_poolAddress",
            "type": "address"
          }
        ],
        "name": "setRewardPool",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "_newOwner",
            "type": "address"
          }
        ],
        "name": "setStationOwner",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "newOwner",
            "type": "address"
          }
        ],
        "name": "transferOwnership",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "uint256",
            "name": "_classPid",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "_price",
            "type": "uint256"
          }
        ],
        "name": "updateClassPrice",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "uint256",
            "name": "_classPid",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "_upgradeRate",
            "type": "uint256"
          }
        ],
        "name": "updateClassUpgrade",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "uint256",
            "name": "_classPid",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "_startingWeight",
            "type": "uint256"
          }
        ],
        "name": "updateClassWeight",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "uint256",
            "name": "_rate",
            "type": "uint256"
          }
        ],
        "name": "updateEmission",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "uint256",
            "name": "tokenId",
            "type": "uint256"
          }
        ],
        "name": "updateNftWeight",
        "outputs": [
          {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
          }
        ],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "uint256",
            "name": "_startId",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "_endId",
            "type": "uint256"
          }
        ],
        "name": "updateWeight",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      }
    ],
    profileBlocked:false,
    stationClasses : {
      0: {
        name: 'Martian Quick Flip',
        description:
          'This metaphorical spacecraft exists in cybernetic space. A basic, fully automated unit designed to collect value through trading algorithms. ',
        image:
          'https://storageapi.fleek.co/aeb85deb-410a-4c50-8834-96486196b392-bucket/videos/square-Space junker.mp4',
        weight:1.5,
        class:'Freighter Class',
        maxUpgrade: 2000,
        apr: "22-29%",
        baseApr:0.2208,
        cost:2
      },
      1: {
        name: 'Arcturian’s Arbitrage',
        description:'This metaphysical vehicle roams through blockchain realms searching for transactable value. A hollowed out asteroid converted into a hub of code based productivity.',
        image:
          'https://storageapi.fleek.co/aeb85deb-410a-4c50-8834-96486196b392-bucket/videos/astroid Colony.mp4',     
        class:'Meteor Class',
        weight:10.5,
        maxUpgrade: 20,
        apr: "28-37%",
        baseApr:0.2810,
        cost:11
      },   
      2: {
        name: 'Pleiades Long Hold',
        description:
          'This interdimensional vessel bridges the gap between the physical and cybernetic realms. Once a moon, now a center for smart contract driven industry.',
        image:
          'https://storageapi.fleek.co/aeb85deb-410a-4c50-8834-96486196b392-bucket/videos/Square-Automated Planet.mp4',      
        class:'City Class',
        weight:33,
        maxUpgrade: 66,
        apr: "29-39%",
        baseApr:0.2944,
        cost:33
      },
      3: {
        name: 'Andromeda’s Leverage',
        description:
          'This metaphysical, interdimensional space vessel  channels the essence of abundance. A software intelligence fueled civilization dedicated to creating value in the cybernetic blockchain realms.',
        image:
          'https://storageapi.fleek.co/aeb85deb-410a-4c50-8834-96486196b392-bucket/videos/Atlantean Mothership.mp4',
        class:'Planet Class',
        weight:115,
        maxUpgrade: 240,
        apr: "30-41%",
        baseApr:0.3050,
        cost:111
      },
    },
    gameIsPaused:false,
    testMode:null,
    currentChainId:null,
    userProfile: null,
    maintenanceMode:false,
    loading: false,
    refreshProfile:false,
    userList:{},
    referralLinkStored:null
  },
  reducers: {
    setProfileBlock: (state, action) => {
      state.profileBlocked = action.payload;
    },
    storeReferralLink: (state, action) => {
      state.referralLinkStored = action.payload;
    },
    setGameInPause: (state, action) => {
      state.gameIsPaused = action.payload;
    },
    setTestMode: (state, action) => {
      state.testMode = action.payload;
    },
    setCurrentChainId: (state, action) => {
      state.currentChainId = action.payload;
    },
    logRefreshProfile: (state, action) => {
      state.refreshProfile = action.payload;
    },
    logLoading: (state, action) => {
      state.loading = action.payload;
    },
    logUserProfile: (state, action) => {
      state.userProfile = action.payload;
    },
    setMaintenanceMode: (state, action) => {
      state.maintenanceMode = action.payload;
    },
    logUserList: (state, action) => {
      state.userList = action.payload;
    },
  },
});

export const {
  setProfileBlock,
  storeReferralLink,
  setMaintenanceMode,
  logUserProfile,
  setTestMode,
  logLoading,
  setCurrentChainId,
  setGameInPause,
  logRefreshProfile,
  logUserList
} = gameDataSlice.actions;

export default gameDataSlice.reducer;
