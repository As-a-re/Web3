"use server"

const ALCHEMY_API_KEY = process.env.NEXT_PUBLIC_ALCHEMY_API_KEY

// Gas price fetching
export async function getGasPrice() {
  try {
    if (!ALCHEMY_API_KEY) {
      console.warn("ALCHEMY_API_KEY is not set")
      return "25.00" // Return a fallback value if API key is missing
    }

    const response = await fetch(`https://eth-mainnet.g.alchemy.com/v2/${ALCHEMY_API_KEY}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        jsonrpc: "2.0",
        id: 1,
        method: "eth_gasPrice",
        params: [],
      }),
    })

    const data = await response.json()
    if (data.error) {
      console.error("Alchemy API error:", data.error)
      throw new Error(data.error.message)
    }

    // Convert from wei to gwei
    const gasPrice = Number.parseInt(data.result, 16) / 1e9
    return gasPrice.toFixed(2)
  } catch (error) {
    console.error("Error fetching gas price:", error)
    // Return a fallback value in case of error
    return "25.00"
  }
}

// Block number fetching
export async function getLatestBlockNumber() {
  try {
    if (!ALCHEMY_API_KEY) {
      console.warn("ALCHEMY_API_KEY is not set")
      return "18245367" // Return a fallback value if API key is missing
    }

    const response = await fetch(`https://eth-mainnet.g.alchemy.com/v2/${ALCHEMY_API_KEY}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        jsonrpc: "2.0",
        id: 1,
        method: "eth_blockNumber",
        params: [],
      }),
    })

    const data = await response.json()
    if (data.error) {
      console.error("Alchemy API error:", data.error)
      throw new Error(data.error.message)
    }

    return Number.parseInt(data.result, 16).toString()
  } catch (error) {
    console.error("Error fetching latest block number:", error)
    // Return a fallback value in case of error
    return "18245367"
  }
}

// Transaction history fetching
export async function getTransactionHistory(address: string) {
  try {
    if (!ALCHEMY_API_KEY) {
      console.warn("ALCHEMY_API_KEY is not set")
      // Return mock data if API key is missing
      return [
        {
          hash: "0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef",
          from: "0x1234567890abcdef1234567890abcdef12345678",
          to: "0xabcdef1234567890abcdef1234567890abcdef12",
          value: "1.0000",
          timeStamp: new Date().toISOString(),
          asset: "ETH",
        },
        {
          hash: "0xabcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890",
          from: "0xabcdef1234567890abcdef1234567890abcdef12",
          to: "0x1234567890abcdef1234567890abcdef12345678",
          value: "0.5000",
          timeStamp: new Date(Date.now() - 3600000).toISOString(),
          asset: "ETH",
        },
      ]
    }

    // For simplicity, we'll return mock data for now
    // In a real app, you would use the Alchemy API to fetch real transaction history
    return [
      {
        hash: "0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef",
        from: "0x1234567890abcdef1234567890abcdef12345678",
        to: "0xabcdef1234567890abcdef1234567890abcdef12",
        value: "1.0000",
        timeStamp: new Date().toISOString(),
        asset: "ETH",
      },
      {
        hash: "0xabcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890",
        from: "0xabcdef1234567890abcdef1234567890abcdef12",
        to: "0x1234567890abcdef1234567890abcdef12345678",
        value: "0.5000",
        timeStamp: new Date(Date.now() - 3600000).toISOString(),
        asset: "ETH",
      },
    ]
  } catch (error) {
    console.error("Error fetching transaction history:", error)
    // Return empty array in case of error
    return []
  }
}

// Token balances fetching
export async function getTokenBalances(address: string) {
  try {
    if (!ALCHEMY_API_KEY) {
      console.warn("ALCHEMY_API_KEY is not set")
      // Return mock data if API key is missing
      return [
        {
          tokenName: "Ethereum",
          tokenSymbol: "ETH",
          balance: "1000000000000000000", // 1 ETH
          tokenDecimal: "18",
        },
        {
          tokenName: "USD Coin",
          tokenSymbol: "USDC",
          balance: "1000000000", // 1000 USDC
          tokenDecimal: "6",
        },
      ]
    }

    // For simplicity, we'll return mock data for now
    // In a real app, you would use the Alchemy API to fetch real token balances
    return [
      {
        tokenName: "Ethereum",
        tokenSymbol: "ETH",
        balance: "1000000000000000000", // 1 ETH
        tokenDecimal: "18",
      },
      {
        tokenName: "USD Coin",
        tokenSymbol: "USDC",
        balance: "1000000000", // 1000 USDC
        tokenDecimal: "6",
      },
    ]
  } catch (error) {
    console.error("Error fetching token balances:", error)
    // Return empty array in case of error
    return []
  }
}

// Network stats fetching
export async function getNetworkStats() {
  try {
    if (!ALCHEMY_API_KEY) {
      console.warn("ALCHEMY_API_KEY is not set")
      // Return mock data if API key is missing
      return {
        tps: "15.2",
        difficulty: "8500",
        hashrate: "750",
      }
    }

    // For simplicity, we'll return mock data for now
    // In a real app, you would use the Alchemy API to fetch real network stats
    return {
      tps: "15.2",
      difficulty: "8500",
      hashrate: "750",
    }
  } catch (error) {
    console.error("Error fetching network stats:", error)
    // Return fallback values in case of error
    return {
      tps: "15.2",
      difficulty: "8500",
      hashrate: "750",
    }
  }
}

// Gas price history fetching
export async function getGasPriceHistory() {
  try {
    if (!ALCHEMY_API_KEY) {
      console.warn("ALCHEMY_API_KEY is not set")
      // Generate mock data if API key is missing
      return generateMockGasPriceHistory()
    }

    // For simplicity, we'll generate mock data for now
    // In a real app, you would use an API to fetch historical gas prices
    return generateMockGasPriceHistory()
  } catch (error) {
    console.error("Error fetching gas price history:", error)
    // Return mock data in case of error
    return generateMockGasPriceHistory()
  }
}

// Helper function to generate mock gas price history
function generateMockGasPriceHistory() {
  const now = new Date()
  const prices = []

  for (let i = 0; i < 24; i++) {
    const time = new Date(now)
    time.setHours(time.getHours() - i)

    // Generate a random gas price between 20 and 100 gwei
    const gasPrice = (Math.random() * 80 + 20).toFixed(2)

    prices.push({
      time: time.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      price: gasPrice,
    })
  }

  return prices.reverse()
}

