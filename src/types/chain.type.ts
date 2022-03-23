export interface IChain {
  id: number;
  name: string;
  nativeCurrency?: {
    name: string;
    symbol: string;
    decimals: 18;
  };
  rpcUrls: string[];
  blockExplorers?: { name: string; url: string }[];
}
