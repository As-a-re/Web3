"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart, LineChart, PieChart, Activity, AlertCircle } from "lucide-react"
import { useWallet } from "@/components/wallet-provider"
import {
  fetchTransactionHistory,
  fetchTokenBalances,
  fetchNetworkStats,
  fetchGasPriceHistory,
} from "@/lib/blockchain-service"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

interface Transaction {
  hash: string
  from: string
  to: string
  value: string
  timeStamp: string
  asset: string
}

interface TokenBalance {
  tokenName: string
  tokenSymbol: string
  balance: string
  tokenDecimal: string
}

export default function Showcase() {
  const { address, isConnected } = useWallet()
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [gasPrices, setGasPrices] = useState<{ time: string; price: string }[]>([])
  const [tokens, setTokens] = useState<TokenBalance[]>([])
  const [networkStats, setNetworkStats] = useState<{ tps: string; difficulty: string; hashrate: string }>({
    tps: "0",
    difficulty: "0",
    hashrate: "0",
  })
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (isConnected && address) {
      // Fetch transaction data
      const fetchData = async () => {
        setIsLoading(true)
        setError(null)
        try {
          const txHistory = await fetchTransactionHistory(address)
          setTransactions(txHistory)

          const tokenBalances = await fetchTokenBalances(address)
          setTokens(tokenBalances)
        } catch (err) {
          console.error("Error fetching wallet data:", err)
          setError("Failed to fetch wallet data. Using fallback values.")
        } finally {
          setIsLoading(false)
        }
      }

      fetchData()
    }

    // Fetch gas price history
    const fetchGasPrices = async () => {
      try {
        const prices = await fetchGasPriceHistory()
        setGasPrices(prices)
      } catch (err) {
        console.error("Error fetching gas prices:", err)
      }
    }

    // Fetch network stats
    const fetchStats = async () => {
      try {
        const stats = await fetchNetworkStats()
        setNetworkStats(stats)
      } catch (err) {
        console.error("Error fetching network stats:", err)
      }
    }

    fetchGasPrices()
    fetchStats()

    // Refresh data periodically
    const interval = setInterval(() => {
      if (isConnected && address) {
        fetchTransactionHistory(address)
          .then((txHistory) => setTransactions(txHistory))
          .catch((err) => console.error("Error refreshing transactions:", err))
      }
      fetchGasPrices()
      fetchStats()
    }, 60000) // Refresh every minute

    return () => clearInterval(interval)
  }, [address, isConnected])

  const formatTimestamp = (timestamp: string) => {
    return new Date(timestamp).toLocaleString()
  }

  return (
    <section className="py-24 bg-black relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-white/[0.02] -z-10"></div>
      <div
        className="absolute inset-0 -z-10 opacity-30"
        style={{
          backgroundImage: "radial-gradient(circle at 30% 50%, rgba(56, 189, 248, 0.3) 0%, transparent 60%)",
        }}
      ></div>

      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
          <motion.div
            className="inline-block rounded-lg bg-blue-500/10 px-3 py-1 text-sm text-blue-300 mb-2"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Blockchain Analytics
          </motion.div>
          <motion.h2
            className="text-3xl font-bold tracking-tighter sm:text-5xl bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-400"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Live Blockchain Data
          </motion.h2>
          <motion.p
            className="max-w-[700px] text-gray-400 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Real-time analytics and insights from the blockchain to help you make informed decisions.
          </motion.p>
        </div>

        {error && (
          <Alert variant="destructive" className="mb-6">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="mx-auto max-w-4xl"
        >
          <Tabs defaultValue="transactions" className="w-full">
            <TabsList className="grid w-full grid-cols-4 bg-black/20 border border-white/10 rounded-lg mb-8">
              <TabsTrigger value="transactions" className="data-[state=active]:bg-white/10">
                <BarChart className="h-4 w-4 mr-2" />
                Transactions
              </TabsTrigger>
              <TabsTrigger value="gas" className="data-[state=active]:bg-white/10">
                <LineChart className="h-4 w-4 mr-2" />
                Gas Prices
              </TabsTrigger>
              <TabsTrigger value="tokens" className="data-[state=active]:bg-white/10">
                <PieChart className="h-4 w-4 mr-2" />
                Tokens
              </TabsTrigger>
              <TabsTrigger value="network" className="data-[state=active]:bg-white/10">
                <Activity className="h-4 w-4 mr-2" />
                Network
              </TabsTrigger>
            </TabsList>
            <TabsContent value="transactions" className="mt-0">
              <Card className="bg-black/40 border border-white/10 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle>Transaction History</CardTitle>
                  <CardDescription>View your recent blockchain transactions</CardDescription>
                </CardHeader>
                <CardContent>
                  {isConnected ? (
                    isLoading ? (
                      <div className="h-[300px] flex items-center justify-center">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
                      </div>
                    ) : transactions.length > 0 ? (
                      <div className="rounded-md border border-white/10 overflow-hidden">
                        <div className="overflow-x-auto">
                          <table className="w-full text-sm">
                            <thead>
                              <tr className="bg-white/5">
                                <th className="px-4 py-3 text-left">Hash</th>
                                <th className="px-4 py-3 text-left">From</th>
                                <th className="px-4 py-3 text-left">To</th>
                                <th className="px-4 py-3 text-left">Value</th>
                                <th className="px-4 py-3 text-left">Time</th>
                              </tr>
                            </thead>
                            <tbody>
                              {transactions.map((tx, index) => (
                                <tr key={index} className="border-t border-white/5">
                                  <td className="px-4 py-3 font-mono text-blue-300">{tx.hash.slice(0, 10)}...</td>
                                  <td className="px-4 py-3 font-mono">
                                    {tx.from.slice(0, 6)}...{tx.from.slice(-4)}
                                  </td>
                                  <td className="px-4 py-3 font-mono">
                                    {tx.to.slice(0, 6)}...{tx.to.slice(-4)}
                                  </td>
                                  <td className="px-4 py-3">
                                    {tx.value} {tx.asset}
                                  </td>
                                  <td className="px-4 py-3">{formatTimestamp(tx.timeStamp)}</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    ) : (
                      <div className="h-[300px] rounded-md border border-white/10 flex items-center justify-center">
                        <div className="text-center">
                          <div className="text-lg font-medium text-white mb-2">No transactions found</div>
                          <div className="text-sm text-gray-400">Your transaction history will appear here</div>
                        </div>
                      </div>
                    )
                  ) : (
                    <div className="h-[300px] rounded-md border border-white/10 flex items-center justify-center">
                      <div className="text-center">
                        <div className="text-lg font-medium text-white mb-2">
                          Connect your wallet to view transactions
                        </div>
                        <div className="text-sm text-gray-400">
                          Your transaction history will appear here once connected
                        </div>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="gas" className="mt-0">
              <Card className="bg-black/40 border border-white/10 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle>Gas Price Trends</CardTitle>
                  <CardDescription>Track gas prices over time</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px] rounded-md border border-white/10 relative overflow-hidden">
                    <div className="absolute inset-0 p-4">
                      <div className="w-full h-full flex flex-col">
                        <div className="flex justify-between text-xs text-gray-400 mb-2">
                          {gasPrices.length > 0 && (
                            <>
                              <div>24 Hours Ago</div>
                              <div>Current</div>
                            </>
                          )}
                        </div>
                        <div className="flex-1 relative">
                          {gasPrices.length > 0 ? (
                            <>
                              <div className="absolute inset-0 flex items-end">
                                {gasPrices.map((point, i) => {
                                  const height = (Number.parseInt(point.price) / 120) * 100
                                  return (
                                    <div key={i} className="flex-1 flex flex-col items-center">
                                      <div
                                        className="w-full bg-blue-500/50 rounded-t-sm"
                                        style={{ height: `${height}%` }}
                                      ></div>
                                    </div>
                                  )
                                })}
                              </div>
                              <div className="absolute bottom-0 inset-x-0 flex justify-between text-xs text-gray-500">
                                {gasPrices
                                  .filter((_, i) => i % 4 === 0)
                                  .map((point, i) => (
                                    <div key={i} className="text-center">
                                      {point.time}
                                    </div>
                                  ))}
                              </div>
                            </>
                          ) : (
                            <div className="absolute inset-0 flex items-center justify-center">
                              <div className="text-center">
                                <div className="text-lg font-medium text-white mb-2">Loading gas price data</div>
                                <div className="text-sm text-gray-400">Historical gas prices will appear here</div>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="tokens" className="mt-0">
              <Card className="bg-black/40 border border-white/10 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle>Token Distribution</CardTitle>
                  <CardDescription>Analyze your token portfolio</CardDescription>
                </CardHeader>
                <CardContent>
                  {isConnected ? (
                    isLoading ? (
                      <div className="h-[300px] flex items-center justify-center">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
                      </div>
                    ) : tokens.length > 0 ? (
                      <div className="rounded-md border border-white/10 overflow-hidden">
                        <div className="overflow-x-auto">
                          <table className="w-full text-sm">
                            <thead>
                              <tr className="bg-white/5">
                                <th className="px-4 py-3 text-left">Token</th>
                                <th className="px-4 py-3 text-left">Symbol</th>
                                <th className="px-4 py-3 text-right">Balance</th>
                              </tr>
                            </thead>
                            <tbody>
                              {tokens.map((token, index) => (
                                <tr key={index} className="border-t border-white/5">
                                  <td className="px-4 py-3">{token.tokenName}</td>
                                  <td className="px-4 py-3">{token.tokenSymbol}</td>
                                  <td className="px-4 py-3 text-right">
                                    {(
                                      Number.parseInt(token.balance) / Math.pow(10, Number.parseInt(token.tokenDecimal))
                                    ).toFixed(4)}
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    ) : (
                      <div className="h-[300px] rounded-md border border-white/10 flex items-center justify-center">
                        <div className="text-center">
                          <div className="text-lg font-medium text-white mb-2">No tokens found</div>
                          <div className="text-sm text-gray-400">Your token portfolio will appear here</div>
                        </div>
                      </div>
                    )
                  ) : (
                    <div className="h-[300px] rounded-md border border-white/10 flex items-center justify-center">
                      <div className="text-center">
                        <div className="text-lg font-medium text-white mb-2">Connect your wallet to view tokens</div>
                        <div className="text-sm text-gray-400">
                          Your token distribution will appear here once connected
                        </div>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="network" className="mt-0">
              <Card className="bg-black/40 border border-white/10 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle>Network Status</CardTitle>
                  <CardDescription>Monitor blockchain network performance</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                      <div className="text-sm text-gray-400 mb-1">Transactions Per Second</div>
                      <div className="text-2xl font-medium">{networkStats.tps} TPS</div>
                      <div className="mt-2 h-2 bg-white/10 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
                          style={{ width: `${Math.min(Number.parseInt(networkStats.tps) * 3, 100)}%` }}
                        ></div>
                      </div>
                    </div>
                    <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                      <div className="text-sm text-gray-400 mb-1">Network Difficulty</div>
                      <div className="text-2xl font-medium">{networkStats.difficulty} TH</div>
                      <div className="mt-2 h-2 bg-white/10 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-green-500 to-blue-500 rounded-full"
                          style={{ width: `${Math.min((Number.parseInt(networkStats.difficulty) - 8000) / 10, 100)}%` }}
                        ></div>
                      </div>
                    </div>
                    <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                      <div className="text-sm text-gray-400 mb-1">Hash Rate</div>
                      <div className="text-2xl font-medium">{networkStats.hashrate} TH/s</div>
                      <div className="mt-2 h-2 bg-white/10 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"
                          style={{ width: `${Math.min(Number.parseInt(networkStats.hashrate) / 10, 100)}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
    </section>
  )
}

