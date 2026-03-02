import { http, createConfig } from 'wagmi';
import { mainnet, arbitrum, polygon, base } from 'wagmi/chains';
import { defineChain } from 'viem';

/**
 * Somnia Testnet chain configuration
 * Chain ID: 50312
 * RPC: https://dream-rpc.somnia.network
 */
const somniaTestnet = defineChain({
  id: 50312,
  name: 'Somnia Testnet',
  network: 'somnia-testnet',
  nativeCurrency: {
    decimals: 18,
    name: 'Somnia',
    symbol: 'STT',
  },
  rpcUrls: {
    default: { http: ['https://dream-rpc.somnia.network'] },
  },
  blockExplorers: {
    default: { name: 'Somnia Explorer', url: 'https://explorer-testnet.somnia.network' },
  },
  testnet: true,
});

export const config = createConfig({
  chains: [somniaTestnet, mainnet, arbitrum, polygon, base],
  transports: {
    [somniaTestnet.id]: http('https://dream-rpc.somnia.network'),
    [mainnet.id]: http(),
    [arbitrum.id]: http(),
    [polygon.id]: http(),
    [base.id]: http(),
  },
});

export const SUPPORTED_CHAINS = [
  { id: somniaTestnet.id, name: 'Somnia Testnet', icon: '🌌' },
  { id: mainnet.id, name: 'Ethereum', icon: '⟠' },
  { id: arbitrum.id, name: 'Arbitrum', icon: '🔵' },
  { id: polygon.id, name: 'Polygon', icon: '🟣' },
  { id: base.id, name: 'Base', icon: '🔷' },
] as const;
