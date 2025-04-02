export interface DApp {
  id: string
  name: string
  description: string
  category: string
  users: string
  rating: number
  imageUrl: string
  url: string
  featured: boolean
}

export async function fetchDApps() {
  try {
    // In a real app, you would fetch from a real API
    // For now, we'll simulate a delay and return real dApp data
    await new Promise((resolve) => setTimeout(resolve, 1000))

    const dApps: DApp[] = [
      {
        id: "1",
        name: "Uniswap",
        description: "Leading decentralized crypto trading protocol",
        category: "defi",
        users: "2.4M+",
        rating: 4.8,
        imageUrl: "https://cryptologos.cc/logos/uniswap-uni-logo.png",
        url: "https://uniswap.org",
        featured: true,
      },
      {
        id: "2",
        name: "OpenSea",
        description: "The world's first and largest NFT marketplace",
        category: "nft",
        users: "1.8M+",
        rating: 4.7,
        imageUrl: "https://storage.googleapis.com/opensea-static/Logomark/OpenSea-Full-Logo%20(light).png",
        url: "https://opensea.io",
        featured: true,
      },
      {
        id: "3",
        name: "Aave",
        description: "Open source liquidity protocol for earning interest and borrowing assets",
        category: "defi",
        users: "1.2M+",
        rating: 4.6,
        imageUrl: "https://cryptologos.cc/logos/aave-aave-logo.png",
        url: "https://aave.com",
        featured: false,
      },
      {
        id: "4",
        name: "Axie Infinity",
        description: "Blockchain-based battling and trading game",
        category: "gaming",
        users: "3M+",
        rating: 4.5,
        imageUrl: "https://cryptologos.cc/logos/axie-infinity-axs-logo.png",
        url: "https://axieinfinity.com",
        featured: true,
      },
      {
        id: "5",
        name: "Compound",
        description: "Algorithmic, autonomous interest rate protocol",
        category: "defi",
        users: "950K+",
        rating: 4.4,
        imageUrl: "https://cryptologos.cc/logos/compound-comp-logo.png",
        url: "https://compound.finance",
        featured: false,
      },
      {
        id: "6",
        name: "Decentraland",
        description: "Virtual reality platform powered by the Ethereum blockchain",
        category: "metaverse",
        users: "1.5M+",
        rating: 4.3,
        imageUrl: "https://cryptologos.cc/logos/decentraland-mana-logo.png",
        url: "https://decentraland.org",
        featured: false,
      },
      {
        id: "7",
        name: "Lens Protocol",
        description: "Web3 social graph on Polygon",
        category: "social",
        users: "800K+",
        rating: 4.7,
        imageUrl: "https://lens.xyz/static/images/lens-logo.svg",
        url: "https://lens.xyz",
        featured: true,
      },
      {
        id: "8",
        name: "ENS",
        description: "Decentralized naming for wallets, websites, & more",
        category: "infrastructure",
        users: "2.1M+",
        rating: 4.9,
        imageUrl: "https://cryptologos.cc/logos/ethereum-name-service-ens-logo.png",
        url: "https://ens.domains",
        featured: false,
      },
      {
        id: "9",
        name: "The Sandbox",
        description: "Community-driven platform where creators can monetize voxel assets",
        category: "metaverse",
        users: "1.3M+",
        rating: 4.2,
        imageUrl: "https://cryptologos.cc/logos/the-sandbox-sand-logo.png",
        url: "https://sandbox.game",
        featured: false,
      },
    ]

    return dApps
  } catch (error) {
    console.error("Error fetching dApps:", error)
    throw error
  }
}

