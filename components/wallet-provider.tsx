"use client"

import { createContext, useContext, type ReactNode, useState } from "react"
import { useAccount, useConnect, useDisconnect, useBalance, useChainId } from "wagmi"
import { injected, walletConnect, coinbaseWallet } from "wagmi/connectors"

interface WalletContextType {
  connect: (connectorId: string) => Promise<void>
  disconnect: () => Promise<void>
  address: string | null
  isConnecting: boolean
  isConnected: boolean
  chainId: number | null
  balance: string | null
  error: Error | null
}

const WalletContext = createContext<WalletContextType>({
  connect: async () => {},
  disconnect: async () => {},
  address: null,
  isConnecting: false,
  isConnected: false,
  chainId: null,
  balance: null,
  error: null,
})

export function WalletProvider({ children }: { children: ReactNode }) {
  const { address, isConnected, isConnecting } = useAccount()
  const { connect: wagmiConnect } = useConnect()
  const { disconnect: wagmiDisconnect } = useDisconnect()
  const chainId = useChainId()
  const { data: balanceData } = useBalance({
    address: address,
  })
  const [error, setError] = useState<Error | null>(null)

  const connect = async (connectorId: string) => {
    try {
      setError(null)
      let connector

      switch (connectorId) {
        case "metamask":
          connector = injected()
          break
        case "walletconnect":
          connector = walletConnect({
            projectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID || "",
          })
          break
        case "coinbase":
          connector = coinbaseWallet({
            appName: "Web3 Platform",
          })
          break
        default:
          connector = injected()
      }

      await wagmiConnect({ connector })
    } catch (err) {
      console.error("Failed to connect wallet:", err)
      setError(err instanceof Error ? err : new Error("Failed to connect wallet"))
    }
  }

  const disconnect = async () => {
    try {
      await wagmiDisconnect()
    } catch (err) {
      console.error("Failed to disconnect wallet:", err)
      setError(err instanceof Error ? err : new Error("Failed to disconnect wallet"))
    }
  }

  return (
    <WalletContext.Provider
      value={{
        connect,
        disconnect,
        address: address || null,
        isConnecting,
        isConnected,
        chainId,
        balance: balanceData ? balanceData.formatted : null,
        error,
      }}
    >
      {children}
    </WalletContext.Provider>
  )
}

export const useWallet = () => useContext(WalletContext)

