"use client"

import { createConfig, http } from "wagmi"
import { mainnet, polygon, optimism, arbitrum } from "wagmi/chains"
import { injected, walletConnect, coinbaseWallet } from "wagmi/connectors"

// Use public RPC URLs instead of Alchemy
const walletConnectProjectId = process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID

if (!walletConnectProjectId) {
  console.warn("NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID is not set")
}

export const config = createConfig({
  chains: [mainnet, polygon, optimism, arbitrum],
  transports: {
    [mainnet.id]: http("https://ethereum.publicnode.com"),
    [polygon.id]: http("https://polygon-rpc.com"),
    [optimism.id]: http("https://mainnet.optimism.io"),
    [arbitrum.id]: http("https://arb1.arbitrum.io/rpc"),
  },
  connectors: [
    injected(),
    walletConnect({
      projectId: walletConnectProjectId || "",
    }),
    coinbaseWallet({
      appName: "Web3 Platform",
    }),
  ],
})

