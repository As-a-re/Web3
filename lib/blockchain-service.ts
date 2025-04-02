// Client-side wrapper for server actions
import {
  getGasPrice,
  getLatestBlockNumber,
  getTransactionHistory,
  getTokenBalances,
  getNetworkStats,
  getGasPriceHistory,
} from "@/app/api/blockchain/actions"

// Re-export the server actions
export {
  getGasPrice as fetchGasPrice,
  getLatestBlockNumber as fetchLatestBlockNumber,
  getTransactionHistory as fetchTransactionHistory,
  getTokenBalances as fetchTokenBalances,
  getNetworkStats as fetchNetworkStats,
  getGasPriceHistory as fetchGasPriceHistory,
}

