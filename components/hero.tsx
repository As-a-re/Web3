"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { useWallet } from "@/components/wallet-provider"
import { ArrowRight, ExternalLink, Wallet } from "lucide-react"
import { motion } from "framer-motion"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { fetchGasPrice, fetchLatestBlockNumber } from "@/lib/blockchain-service"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle } from "lucide-react"

export default function Hero() {
  const { connect, disconnect, address, isConnecting, isConnected, chainId, balance, error } = useWallet()
  const [scrollY, setScrollY] = useState(0)
  const [gasPrice, setGasPrice] = useState<string | null>(null)
  const [blockNumber, setBlockNumber] = useState<string | null>(null)
  const [networkStatus, setNetworkStatus] = useState<string>("Loading")
  const [dialogOpen, setDialogOpen] = useState(false)
  const [fetchError, setFetchError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    // Fetch blockchain data
    const fetchBlockchainData = async () => {
      setIsLoading(true)
      setFetchError(null)
      try {
        // Fetch gas price using server action
        const gasPrice = await fetchGasPrice()
        setGasPrice(gasPrice)

        // Fetch latest block number using server action
        const blockNumber = await fetchLatestBlockNumber()
        setBlockNumber(blockNumber)

        // Network status
        setNetworkStatus("Healthy")
      } catch (error) {
        console.error("Error fetching blockchain data:", error)
        setFetchError("Failed to fetch blockchain data. Using fallback values.")
        setNetworkStatus("Issues Detected")
      } finally {
        setIsLoading(false)
      }
    }

    fetchBlockchainData()

    // Set up interval to refresh data
    const interval = setInterval(fetchBlockchainData, 30000) // every 30 seconds

    return () => clearInterval(interval)
  }, [])

  const handleConnectWallet = () => {
    setDialogOpen(true)
  }

  const connectWalletProvider = async (provider: string) => {
    await connect(provider)
    setDialogOpen(false)
  }

  const getChainName = (chainId: number | null) => {
    if (!chainId) return "Unknown"

    const chains: Record<number, string> = {
      1: "Ethereum",
      137: "Polygon",
      10: "Optimism",
      42161: "Arbitrum",
    }

    return chains[chainId] || "Unknown Chain"
  }

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-purple-900/20 to-black"></div>
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: "radial-gradient(circle at center, rgba(120, 41, 190, 0.5) 0%, transparent 70%)",
            transform: `scale(${1 + scrollY * 0.001})`,
          }}
        ></div>
      </div>

      {/* Grid pattern */}
      <div
        className="absolute inset-0 z-0 opacity-20"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px)",
          backgroundSize: "100px 100px",
          transform: `translateY(${scrollY * 0.2}px)`,
        }}
      ></div>

      <div className="container relative z-10 px-4 md:px-6">
        {error && (
          <Alert variant="destructive" className="mb-4">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error.message}</AlertDescription>
          </Alert>
        )}

        <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
          <div className="flex flex-col justify-center space-y-4">
            <div className="space-y-2">
              <motion.h1
                className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none bg-clip-text text-transparent bg-gradient-to-r from-white to-purple-400"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                The Future of Web3 Is Here
              </motion.h1>
              <motion.p
                className="max-w-[600px] text-gray-300 md:text-xl"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                Connect your wallet and experience the next generation of decentralized applications. Seamless, secure,
                and built for the future.
              </motion.p>
            </div>
            <motion.div
              className="flex flex-col gap-2 min-[400px]:flex-row"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              {!isConnected ? (
                <Button
                  size="lg"
                  onClick={handleConnectWallet}
                  disabled={isConnecting}
                  className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white"
                >
                  {isConnecting ? "Connecting..." : "Connect Wallet"}
                  <Wallet className="ml-2 h-4 w-4" />
                </Button>
              ) : (
                <Button
                  size="lg"
                  onClick={() => disconnect()}
                  className="bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 text-white"
                >
                  Disconnect
                </Button>
              )}
              <Button
                variant="outline"
                size="lg"
                className="border-purple-700 text-purple-300 hover:bg-purple-950/50"
                onClick={() => (window.location.href = "/explore")}
              >
                Explore Dapps
                <ExternalLink className="ml-2 h-4 w-4" />
              </Button>
            </motion.div>
            {isConnected && address && (
              <motion.div
                className="text-sm space-y-1 p-3 rounded-lg bg-white/5 border border-white/10 backdrop-blur-sm"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <div className="flex justify-between">
                  <span className="text-gray-400">Address:</span>
                  <span className="text-purple-300 font-mono">
                    {address.slice(0, 6)}...{address.slice(-4)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Network:</span>
                  <span className="text-blue-300">{getChainName(chainId)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Balance:</span>
                  <span className="text-green-300">{balance} ETH</span>
                </div>
              </motion.div>
            )}
          </div>
          <motion.div
            className="flex items-center justify-center"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            <div className="relative w-full max-w-[500px] aspect-square">
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-600/20 to-blue-600/20 blur-3xl"></div>
              <div className="relative h-full w-full rounded-3xl overflow-hidden border border-purple-500/20 backdrop-blur-sm bg-black/40">
                <div className="absolute inset-0 bg-grid-white/[0.02]"></div>
                <div className="p-6 h-full flex flex-col">
                  <div className="flex justify-between items-center mb-6">
                    <div className="text-xl font-bold text-white">Blockchain Stats</div>
                    <div
                      className={`px-3 py-1 rounded-full ${networkStatus === "Healthy" ? "bg-green-500/20 text-green-400" : "bg-yellow-500/20 text-yellow-400"} text-xs font-medium`}
                    >
                      {networkStatus}
                    </div>
                  </div>
                  <div className="space-y-4 flex-1">
                    <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                      <div className="text-sm text-gray-400 mb-1">Current Gas Price</div>
                      {isLoading ? (
                        <div className="h-6 bg-white/10 animate-pulse rounded"></div>
                      ) : (
                        <div className="text-xl font-medium">{gasPrice ? `${gasPrice} Gwei` : "Error loading"}</div>
                      )}
                    </div>
                    <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                      <div className="text-sm text-gray-400 mb-1">Latest Block</div>
                      {isLoading ? (
                        <div className="h-6 bg-white/10 animate-pulse rounded"></div>
                      ) : (
                        <div className="text-xl font-medium">{blockNumber ? `#${blockNumber}` : "Error loading"}</div>
                      )}
                    </div>
                    <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                      <div className="text-sm text-gray-400 mb-1">Network Status</div>
                      <div className="flex items-center">
                        <div
                          className={`w-2 h-2 rounded-full ${networkStatus === "Healthy" ? "bg-green-500" : "bg-yellow-500"} mr-2`}
                        ></div>
                        <div className="text-xl font-medium">{networkStatus}</div>
                      </div>
                    </div>
                  </div>
                  {fetchError && <div className="mt-4 text-sm text-red-400">{fetchError}</div>}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Wallet Connection Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="sm:max-w-md bg-black/90 border border-purple-500/20 backdrop-blur-sm">
          <DialogHeader>
            <DialogTitle className="text-xl text-center mb-2">Connect Your Wallet</DialogTitle>
            <DialogDescription className="text-center text-gray-400">
              Choose your preferred wallet provider to connect to the blockchain
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <Button
              className="flex items-center justify-between p-4 h-auto bg-white/5 hover:bg-white/10 border border-white/10"
              onClick={() => connectWalletProvider("metamask")}
            >
              <div className="flex items-center">
                <img src="/metamask-logo.svg" alt="MetaMask" className="w-8 h-8 mr-3" />
                <div className="text-left">
                  <div className="font-medium">MetaMask</div>
                  <div className="text-xs text-gray-400">Connect to your MetaMask wallet</div>
                </div>
              </div>
              <ArrowRight className="h-5 w-5 text-gray-400" />
            </Button>

            <Button
              className="flex items-center justify-between p-4 h-auto bg-white/5 hover:bg-white/10 border border-white/10"
              onClick={() => connectWalletProvider("walletconnect")}
            >
              <div className="flex items-center">
                <img src="/walletconnect-logo.svg" alt="WalletConnect" className="w-8 h-8 mr-3" />
                <div className="text-left">
                  <div className="font-medium">WalletConnect</div>
                  <div className="text-xs text-gray-400">Connect with WalletConnect</div>
                </div>
              </div>
              <ArrowRight className="h-5 w-5 text-gray-400" />
            </Button>

            <Button
              className="flex items-center justify-between p-4 h-auto bg-white/5 hover:bg-white/10 border border-white/10"
              onClick={() => connectWalletProvider("coinbase")}
            >
              <div className="flex items-center">
                <img src="/coinbase-logo.svg" alt="Coinbase Wallet" className="w-8 h-8 mr-3" />
                <div className="text-left">
                  <div className="font-medium">Coinbase Wallet</div>
                  <div className="text-xs text-gray-400">Connect to your Coinbase wallet</div>
                </div>
              </div>
              <ArrowRight className="h-5 w-5 text-gray-400" />
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </section>
  )
}

