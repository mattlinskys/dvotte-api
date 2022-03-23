import { IChain } from 'types/chain.type';

export const SUPPORTED_CHAINS: Record<IChain['id'], IChain> = {
  31337: {
    id: 31337,
    name: 'Hardhat',
    rpcUrls: ['http://127.0.0.1:8545'],
  },
  1: {
    id: 1,
    name: 'Mainnet',
    nativeCurrency: { name: 'Ether', symbol: 'ETH', decimals: 18 },
    rpcUrls: ['https://mainnet.infura.io/v3/${INFURA_API_KEY}'],
    blockExplorers: [
      {
        name: 'Etherscan',
        url: 'https://etherscan.io',
      },
    ],
  },
  4: {
    id: 4,
    name: 'Rinkeby',
    nativeCurrency: { name: 'Ether', symbol: 'ETH', decimals: 18 },
    rpcUrls: ['https://rinkeby.infura.io/v3/${INFURA_API_KEY}'],
    blockExplorers: [
      {
        name: 'Etherscan rinkeby',
        url: 'https://rinkeby.etherscan.io',
      },
    ],
  },
  137: {
    id: 137,
    name: 'Polygon Mainnet',
    nativeCurrency: { name: 'MATIC', symbol: 'MATIC', decimals: 18 },
    rpcUrls: [
      'https://polygon-rpc.com',
      'https://rpc-mainnet.matic.network',
      'https://matic-mainnet.chainstacklabs.com',
      'https://rpc-mainnet.maticvigil.com',
      'https://rpc-mainnet.matic.quiknode.pro',
      'https://matic-mainnet-full-rpc.bwarelabs.com',
    ],
    blockExplorers: [
      {
        name: 'Polygonscan',
        url: 'https://polygonscan.com',
      },
    ],
  },
  43114: {
    id: 43114,
    name: 'Avalanche Mainnet',
    nativeCurrency: {
      name: 'Avalanche',
      symbol: 'AVAX',
      decimals: 18,
    },
    rpcUrls: ['https://api.avax.network/ext/bc/C/rpc'],
    blockExplorers: [{ name: 'SnowTrace', url: 'https://snowtrace.io' }],
  },
  42161: {
    id: 42161,
    name: 'Arbitrum One',
    nativeCurrency: { name: 'Ether', symbol: 'AETH', decimals: 18 },
    rpcUrls: ['https://arb1.arbitrum.io/rpc'],
    blockExplorers: [
      { name: 'Arbiscan', url: 'https://arbiscan.io' },
      {
        name: 'Arbitrum Explorer',
        url: 'https://explorer.arbitrum.io',
      },
    ],
  },
  10: {
    id: 10,
    name: 'Optimism',
    nativeCurrency: { name: 'Ether', symbol: 'ETH', decimals: 18 },
    rpcUrls: ['https://mainnet.optimism.io'],
    blockExplorers: [
      {
        name: 'Etherscan',
        url: 'https://optimistic.etherscan.io',
      },
    ],
  },
};
export const SUPPORTED_CHAIN_IDS = Object.keys(SUPPORTED_CHAINS);
