"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ExternalLink, AlertCircle } from "lucide-react"
import { useWallet } from "@/components/wallet-provider"
import { fetchCryptoNews, type NewsItem } from "@/lib/news-service"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export default function News() {
  const { isConnected } = useWallet()
  const [news, setNews] = useState<NewsItem[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const getNews = async () => {
      setLoading(true)
      setError(null)
      try {
        const newsData = await fetchCryptoNews()
        setNews(newsData)
      } catch (err) {
        console.error("Error fetching news:", err)
        setError("Failed to fetch crypto news. Please try again later.")
      } finally {
        setLoading(false)
      }
    }

    getNews()

    // Refresh news every 5 minutes
    const interval = setInterval(getNews, 300000)
    return () => clearInterval(interval)
  }, [])

  return (
    <section className="py-24 bg-black relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-white/[0.02] -z-10"></div>
      <div
        className="absolute inset-0 -z-10 opacity-30"
        style={{
          backgroundImage: "radial-gradient(circle at 70% 50%, rgba(236, 72, 153, 0.3) 0%, transparent 60%)",
        }}
      ></div>

      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
          <motion.div
            className="inline-block rounded-lg bg-pink-500/10 px-3 py-1 text-sm text-pink-300 mb-2"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Latest Updates
          </motion.div>
          <motion.h2
            className="text-3xl font-bold tracking-tighter sm:text-5xl bg-clip-text text-transparent bg-gradient-to-r from-white to-pink-400"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Blockchain News & Insights
          </motion.h2>
          <motion.p
            className="max-w-[700px] text-gray-400 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Stay updated with the latest developments in the blockchain and Web3 ecosystem.
          </motion.p>
        </div>

        {error && (
          <Alert variant="destructive" className="mb-6">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-pink-500"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {news.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 * index }}
              >
                <Card className="h-full bg-black/40 border border-white/10 backdrop-blur-sm overflow-hidden">
                  <div className="aspect-video w-full overflow-hidden">
                    <img
                      src={item.imageUrl || "/placeholder.svg"}
                      alt={item.title}
                      className="w-full h-full object-cover transition-transform hover:scale-105 duration-500"
                    />
                  </div>
                  <CardHeader>
                    <div className="flex justify-between items-center mb-2">
                      <div className="px-2 py-1 rounded-full bg-white/10 text-xs font-medium text-white">
                        {item.category}
                      </div>
                      <div className="text-xs text-gray-400">{item.date}</div>
                    </div>
                    <CardTitle className="line-clamp-2">{item.title}</CardTitle>
                    <CardDescription className="line-clamp-3">{item.description}</CardDescription>
                  </CardHeader>
                  <CardFooter className="flex justify-between items-center">
                    <div className="text-sm text-gray-400">{item.source}</div>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="gap-1 text-pink-300 hover:text-pink-200"
                      onClick={() => window.open(item.url, "_blank")}
                    >
                      Read More
                      <ExternalLink className="h-4 w-4" />
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </div>
        )}

        <div className="flex justify-center mt-12">
          <Button className="bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700">
            View All News
          </Button>
        </div>
      </div>
    </section>
  )
}

