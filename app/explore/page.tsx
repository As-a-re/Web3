"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Search, Filter, ArrowUpRight, Star, Users, Wallet, Layers, AlertCircle } from "lucide-react"
import { WalletProvider } from "@/components/wallet-provider"
import { fetchDApps, type DApp } from "@/lib/dapp-service"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export default function ExplorePage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [dApps, setDApps] = useState<DApp[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const loadDApps = async () => {
      setLoading(true)
      setError(null)
      try {
        const data = await fetchDApps()
        setDApps(data)
      } catch (err) {
        console.error("Error fetching dApps:", err)
        setError("Failed to fetch dApps. Please try again later.")
      } finally {
        setLoading(false)
      }
    }

    loadDApps()
  }, [])

  // Filter dApps based on search query and category
  const filteredDApps = dApps.filter((dapp) => {
    const matchesSearch =
      dapp.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      dapp.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === "all" || dapp.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  // Get featured dApps
  const featuredDApps = dApps.filter((dapp) => dapp.featured)

  return (
    <WalletProvider>
      <main className="min-h-screen bg-black text-white">
        <header className="border-b border-white/10 bg-black/95 backdrop-blur-sm sticky top-0 z-50">
          <div className="container flex h-16 items-center px-4 md:px-6">
            <a href="/" className="flex items-center gap-2 font-semibold">
              <Wallet className="h-6 w-6 text-purple-400" />
              <span>Web3 Platform</span>
            </a>
            <nav className="ml-auto flex gap-4 sm:gap-6">
              <a href="/" className="text-sm font-medium text-gray-400 hover:text-white">
                Home
              </a>
              <a href="/explore" className="text-sm font-medium text-white">
                Explore
              </a>
              <a href="/learn" className="text-sm font-medium text-gray-400 hover:text-white">
                Learn
              </a>
              <a href="/community" className="text-sm font-medium text-gray-400 hover:text-white">
                Community
              </a>
            </nav>
          </div>
        </header>

        <div className="container px-4 py-8 md:px-6 md:py-12">
          <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
            <div className="inline-block rounded-lg bg-purple-500/10 px-3 py-1 text-sm text-purple-300 mb-2">
              Discover
            </div>
            <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl bg-clip-text text-transparent bg-gradient-to-r from-white to-purple-400">
              Explore Decentralized Apps
            </h1>
            <p className="max-w-[700px] text-gray-400 md:text-xl/relaxed">
              Discover and connect with the best decentralized applications in the Web3 ecosystem.
            </p>
          </div>

          {error && (
            <Alert variant="destructive" className="mb-6">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <div className="flex flex-col md:flex-row gap-4 mb-8">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
              <Input
                type="search"
                placeholder="Search dApps..."
                className="pl-9 bg-white/5 border-white/10 text-white"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Button variant="outline" className="gap-2 border-white/10 text-gray-300">
              <Filter className="h-4 w-4" />
              Filters
            </Button>
          </div>

          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
            </div>
          ) : (
            <Tabs defaultValue="all" className="w-full" onValueChange={setSelectedCategory}>
              <TabsList className="grid w-full grid-cols-2 md:grid-cols-7 bg-black/20 border border-white/10 rounded-lg mb-8">
                <TabsTrigger value="all" className="data-[state=active]:bg-white/10">
                  All
                </TabsTrigger>
                <TabsTrigger value="defi" className="data-[state=active]:bg-white/10">
                  DeFi
                </TabsTrigger>
                <TabsTrigger value="nft" className="data-[state=active]:bg-white/10">
                  NFTs
                </TabsTrigger>
                <TabsTrigger value="gaming" className="data-[state=active]:bg-white/10">
                  Gaming
                </TabsTrigger>
                <TabsTrigger value="social" className="data-[state=active]:bg-white/10">
                  Social
                </TabsTrigger>
                <TabsTrigger value="metaverse" className="data-[state=active]:bg-white/10">
                  Metaverse
                </TabsTrigger>
                <TabsTrigger value="infrastructure" className="data-[state=active]:bg-white/10">
                  Infrastructure
                </TabsTrigger>
              </TabsList>

              <TabsContent value="all" className="mt-0">
                {selectedCategory === "all" && searchQuery === "" && (
                  <div className="mb-12">
                    <h2 className="text-2xl font-bold mb-6">Featured dApps</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {featuredDApps.map((dapp) => (
                        <Card
                          key={dapp.id}
                          className="bg-black/40 border border-white/10 backdrop-blur-sm overflow-hidden"
                        >
                          <CardHeader className="flex flex-row items-center gap-4">
                            <img
                              src={dapp.imageUrl || "/placeholder.svg"}
                              alt={dapp.name}
                              className="w-12 h-12 rounded-lg"
                            />
                            <div>
                              <CardTitle className="flex items-center gap-2">
                                {dapp.name}
                                <Badge className="ml-2 bg-purple-500/20 text-purple-300 hover:bg-purple-500/30">
                                  Featured
                                </Badge>
                              </CardTitle>
                              <CardDescription className="text-gray-400">{dapp.category.toUpperCase()}</CardDescription>
                            </div>
                          </CardHeader>
                          <CardContent>
                            <p className="text-gray-300">{dapp.description}</p>
                            <div className="flex items-center gap-4 mt-4">
                              <div className="flex items-center gap-1 text-sm text-gray-400">
                                <Users className="h-4 w-4" />
                                {dapp.users}
                              </div>
                              <div className="flex items-center gap-1 text-sm text-gray-400">
                                <Star className="h-4 w-4 text-yellow-400" />
                                {dapp.rating}
                              </div>
                            </div>
                          </CardContent>
                          <CardFooter>
                            <Button
                              className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                              onClick={() => window.open(dapp.url, "_blank")}
                            >
                              Launch dApp
                              <ArrowUpRight className="ml-2 h-4 w-4" />
                            </Button>
                          </CardFooter>
                        </Card>
                      ))}
                    </div>
                  </div>
                )}

                <h2 className="text-2xl font-bold mb-6">
                  {searchQuery ? `Search Results (${filteredDApps.length})` : "All dApps"}
                </h2>

                {filteredDApps.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredDApps.map((dapp) => (
                      <Card
                        key={dapp.id}
                        className="bg-black/40 border border-white/10 backdrop-blur-sm overflow-hidden"
                      >
                        <CardHeader className="flex flex-row items-center gap-4">
                          <img
                            src={dapp.imageUrl || "/placeholder.svg"}
                            alt={dapp.name}
                            className="w-12 h-12 rounded-lg"
                          />
                          <div>
                            <CardTitle>{dapp.name}</CardTitle>
                            <CardDescription className="text-gray-400">{dapp.category.toUpperCase()}</CardDescription>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <p className="text-gray-300">{dapp.description}</p>
                          <div className="flex items-center gap-4 mt-4">
                            <div className="flex items-center gap-1 text-sm text-gray-400">
                              <Users className="h-4 w-4" />
                              {dapp.users}
                            </div>
                            <div className="flex items-center gap-1 text-sm text-gray-400">
                              <Star className="h-4 w-4 text-yellow-400" />
                              {dapp.rating}
                            </div>
                          </div>
                        </CardContent>
                        <CardFooter>
                          <Button
                            className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                            onClick={() => window.open(dapp.url, "_blank")}
                          >
                            Launch dApp
                            <ArrowUpRight className="ml-2 h-4 w-4" />
                          </Button>
                        </CardFooter>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center py-12 text-center">
                    <Layers className="h-16 w-16 text-gray-500 mb-4" />
                    <h3 className="text-xl font-medium mb-2">No dApps Found</h3>
                    <p className="text-gray-400 max-w-md">
                      We couldn't find any dApps matching your search criteria. Try adjusting your filters or search
                      query.
                    </p>
                  </div>
                )}
              </TabsContent>

              {/* Other tab contents will be similar but filtered by category */}
              {["defi", "nft", "gaming", "social", "metaverse", "infrastructure"].map((category) => (
                <TabsContent key={category} value={category} className="mt-0">
                  <h2 className="text-2xl font-bold mb-6">
                    {searchQuery
                      ? `Search Results (${filteredDApps.length})`
                      : `${category.charAt(0).toUpperCase() + category.slice(1)} dApps`}
                  </h2>

                  {filteredDApps.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {filteredDApps.map((dapp) => (
                        <Card
                          key={dapp.id}
                          className="bg-black/40 border border-white/10 backdrop-blur-sm overflow-hidden"
                        >
                          <CardHeader className="flex flex-row items-center gap-4">
                            <img
                              src={dapp.imageUrl || "/placeholder.svg"}
                              alt={dapp.name}
                              className="w-12 h-12 rounded-lg"
                            />
                            <div>
                              <CardTitle>{dapp.name}</CardTitle>
                              <CardDescription className="text-gray-400">{dapp.category.toUpperCase()}</CardDescription>
                            </div>
                          </CardHeader>
                          <CardContent>
                            <p className="text-gray-300">{dapp.description}</p>
                            <div className="flex items-center gap-4 mt-4">
                              <div className="flex items-center gap-1 text-sm text-gray-400">
                                <Users className="h-4 w-4" />
                                {dapp.users}
                              </div>
                              <div className="flex items-center gap-1 text-sm text-gray-400">
                                <Star className="h-4 w-4 text-yellow-400" />
                                {dapp.rating}
                              </div>
                            </div>
                          </CardContent>
                          <CardFooter>
                            <Button
                              className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                              onClick={() => window.open(dapp.url, "_blank")}
                            >
                              Launch dApp
                              <ArrowUpRight className="ml-2 h-4 w-4" />
                            </Button>
                          </CardFooter>
                        </Card>
                      ))}
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center py-12 text-center">
                      <Layers className="h-16 w-16 text-gray-500 mb-4" />
                      <h3 className="text-xl font-medium mb-2">No dApps Found</h3>
                      <p className="text-gray-400 max-w-md">
                        We couldn't find any dApps matching your search criteria. Try adjusting your filters or search
                        query.
                      </p>
                    </div>
                  )}
                </TabsContent>
              ))}
            </Tabs>
          )}
        </div>
      </main>
    </WalletProvider>
  )
}

