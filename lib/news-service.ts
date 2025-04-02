// In a real application, you would use a real news API like CryptoCompare, CoinGecko, or CryptoNews
// For this example, we'll use a simulated API call with real news sources

export interface NewsItem {
  id: string
  title: string
  description: string
  url: string
  imageUrl: string
  source: string
  date: string
  category: string
}

export async function fetchCryptoNews() {
  try {
    // In a real app, you would use an API like:
    // const response = await fetch('https://api.coingecko.com/api/v3/news')
    // const data = await response.json()

    // For now, we'll simulate a delay and return mock data
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // These are real news titles but with mock data
    const news: NewsItem[] = [
      {
        id: "1",
        title: "Ethereum's Dencun Upgrade Successfully Activated on Mainnet",
        description:
          "Ethereum's Dencun upgrade has been successfully activated on the mainnet, bringing proto-danksharding to reduce transaction costs for layer-2 solutions.",
        url: "https://example.com/news/ethereum-dencun",
        imageUrl: "https://ethereum.org/static/28214bb68eb5445dcb063a72535bc90c/9019e/hero.png",
        source: "Ethereum Foundation",
        date: new Date().toLocaleDateString(),
        category: "Ethereum",
      },
      {
        id: "2",
        title: "Uniswap Launches V4 with New Gas Optimization Features",
        description:
          "Uniswap has launched its V4 protocol with significant gas optimizations and new features for liquidity providers.",
        url: "https://example.com/news/uniswap-v4",
        imageUrl: "https://uniswap.org/images/twitter-card.jpg",
        source: "DeFi Pulse",
        date: new Date().toLocaleDateString(),
        category: "DeFi",
      },
      {
        id: "3",
        title: "Bored Ape Yacht Club Announces New Metaverse Integration",
        description:
          "Yuga Labs has announced a new metaverse integration for Bored Ape Yacht Club NFT holders, expanding the utility of the popular collection.",
        url: "https://example.com/news/bayc-metaverse",
        imageUrl: "https://boredapeyachtclub.com/0d090e2a894a45a5e1ce2741e4bfd778.png",
        source: "NFT Evening",
        date: new Date().toLocaleDateString(),
        category: "NFTs",
      },
      {
        id: "4",
        title: "Polygon Launches zkEVM Mainnet, Bringing Ethereum Scaling Solution",
        description:
          "Polygon has launched its zkEVM mainnet, providing a zero-knowledge scaling solution compatible with existing Ethereum smart contracts.",
        url: "https://example.com/news/polygon-zkevm",
        imageUrl: "https://polygon.technology/assets/images/polygon-logo.svg",
        source: "Polygon",
        date: new Date().toLocaleDateString(),
        category: "Infrastructure",
      },
      {
        id: "5",
        title: "Axie Infinity Releases Land Gameplay Alpha",
        description:
          "Sky Mavis has released the alpha version of land gameplay for Axie Infinity, allowing players to build and develop virtual land plots.",
        url: "https://example.com/news/axie-land",
        imageUrl: "https://axieinfinity.com/images/axie-share.jpg",
        source: "GameFi Report",
        date: new Date().toLocaleDateString(),
        category: "Gaming",
      },
      {
        id: "6",
        title: "SEC Approves Spot Bitcoin ETFs in Historic Decision",
        description:
          "The U.S. Securities and Exchange Commission has approved spot Bitcoin ETFs, marking a historic milestone for cryptocurrency adoption.",
        url: "https://example.com/news/bitcoin-etf",
        imageUrl: "https://bitcoin.org/img/icons/opengraph.png",
        source: "Crypto Briefing",
        date: new Date().toLocaleDateString(),
        category: "Regulation",
      },
    ]

    return news
  } catch (error) {
    console.error("Error fetching crypto news:", error)
    throw error
  }
}

