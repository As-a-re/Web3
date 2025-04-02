"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowRight, BookOpen, Code, Lightbulb, Wallet, Play, FileText } from "lucide-react"
import { WalletProvider } from "@/components/wallet-provider"

export default function LearnPage() {
  const [activeTab, setActiveTab] = useState("basics")

  const courses = {
    basics: [
      {
        id: "blockchain-101",
        title: "Blockchain 101",
        description: "Learn the fundamentals of blockchain technology and how it works.",
        level: "Beginner",
        duration: "2 hours",
        modules: 5,
        image: "/placeholder.svg?height=200&width=400",
      },
      {
        id: "crypto-wallets",
        title: "Understanding Crypto Wallets",
        description: "Everything you need to know about cryptocurrency wallets and how to use them safely.",
        level: "Beginner",
        duration: "1.5 hours",
        modules: 4,
        image: "/placeholder.svg?height=200&width=400",
      },
      {
        id: "defi-intro",
        title: "Introduction to DeFi",
        description: "Discover the world of decentralized finance and its potential to transform traditional finance.",
        level: "Intermediate",
        duration: "3 hours",
        modules: 6,
        image: "/placeholder.svg?height=200&width=400",
      },
    ],
    development: [
      {
        id: "smart-contracts",
        title: "Smart Contract Development",
        description: "Learn how to write, test, and deploy smart contracts on Ethereum.",
        level: "Intermediate",
        duration: "5 hours",
        modules: 8,
        image: "/placeholder.svg?height=200&width=400",
      },
      {
        id: "dapp-development",
        title: "Building Your First dApp",
        description: "A step-by-step guide to building a decentralized application from scratch.",
        level: "Advanced",
        duration: "8 hours",
        modules: 10,
        image: "/placeholder.svg?height=200&width=400",
      },
      {
        id: "web3-integration",
        title: "Web3.js Integration",
        description: "How to integrate Web3.js into your frontend applications to interact with the blockchain.",
        level: "Intermediate",
        duration: "4 hours",
        modules: 7,
        image: "/placeholder.svg?height=200&width=400",
      },
    ],
    advanced: [
      {
        id: "defi-protocols",
        title: "DeFi Protocol Design",
        description: "Advanced concepts in designing and implementing DeFi protocols.",
        level: "Advanced",
        duration: "10 hours",
        modules: 12,
        image: "/placeholder.svg?height=200&width=400",
      },
      {
        id: "security",
        title: "Blockchain Security",
        description: "Learn about common vulnerabilities and how to secure your blockchain applications.",
        level: "Advanced",
        duration: "6 hours",
        modules: 9,
        image: "/placeholder.svg?height=200&width=400",
      },
      {
        id: "scaling",
        title: "Scaling Solutions",
        description: "Explore different approaches to scaling blockchain networks, including Layer 2 solutions.",
        level: "Advanced",
        duration: "7 hours",
        modules: 8,
        image: "/placeholder.svg?height=200&width=400",
      },
    ],
  }

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
              <a href="/explore" className="text-sm font-medium text-gray-400 hover:text-white">
                Explore
              </a>
              <a href="/learn" className="text-sm font-medium text-white">
                Learn
              </a>
              <a href="/community" className="text-sm font-medium text-gray-400 hover:text-white">
                Community
              </a>
            </nav>
          </div>
        </header>

        <section className="py-12 md:py-24 bg-black relative overflow-hidden">
          <div className="absolute inset-0 bg-grid-white/[0.02] -z-10"></div>
          <div
            className="absolute inset-0 -z-10 opacity-30"
            style={{
              backgroundImage: "radial-gradient(circle at 50% 50%, rgba(56, 189, 248, 0.3) 0%, transparent 60%)",
            }}
          ></div>

          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
              <motion.div
                className="inline-block rounded-lg bg-blue-500/10 px-3 py-1 text-sm text-blue-300 mb-2"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                Education
              </motion.div>
              <motion.h1
                className="text-3xl font-bold tracking-tighter sm:text-5xl bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-400"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                Learn Web3 Development
              </motion.h1>
              <motion.p
                className="max-w-[700px] text-gray-400 md:text-xl/relaxed"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                Comprehensive courses and tutorials to help you master blockchain technology and Web3 development.
              </motion.p>
            </div>

            <Tabs defaultValue="basics" className="w-full" onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-3 bg-black/20 border border-white/10 rounded-lg mb-8">
                <TabsTrigger value="basics" className="data-[state=active]:bg-white/10">
                  <BookOpen className="h-4 w-4 mr-2" />
                  Blockchain Basics
                </TabsTrigger>
                <TabsTrigger value="development" className="data-[state=active]:bg-white/10">
                  <Code className="h-4 w-4 mr-2" />
                  Development
                </TabsTrigger>
                <TabsTrigger value="advanced" className="data-[state=active]:bg-white/10">
                  <Lightbulb className="h-4 w-4 mr-2" />
                  Advanced Topics
                </TabsTrigger>
              </TabsList>

              {Object.entries(courses).map(([category, courseList]) => (
                <TabsContent key={category} value={category} className="mt-0">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {courseList.map((course) => (
                      <Card
                        key={course.id}
                        className="bg-black/40 border border-white/10 backdrop-blur-sm overflow-hidden"
                      >
                        <div className="aspect-video w-full overflow-hidden">
                          <img
                            src={course.image || "/placeholder.svg"}
                            alt={course.title}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <CardHeader>
                          <div className="flex justify-between items-center mb-2">
                            <div className="px-2 py-1 rounded-full bg-white/10 text-xs font-medium text-white">
                              {course.level}
                            </div>
                            <div className="flex items-center text-xs text-gray-400">
                              <FileText className="h-3 w-3 mr-1" />
                              {course.modules} Modules
                            </div>
                          </div>
                          <CardTitle>{course.title}</CardTitle>
                          <CardDescription>{course.description}</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="flex items-center text-sm text-gray-400">
                            <Play className="h-4 w-4 mr-2 text-blue-400" />
                            Duration: {course.duration}
                          </div>
                        </CardContent>
                        <CardFooter>
                          <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                            Start Learning
                            <ArrowRight className="ml-2 h-4 w-4" />
                          </Button>
                        </CardFooter>
                      </Card>
                    ))}
                  </div>
                </TabsContent>
              ))}
            </Tabs>

            <div className="mt-16 bg-gradient-to-r from-blue-900/20 to-purple-900/20 rounded-xl border border-white/10 p-8">
              <div className="flex flex-col md:flex-row items-center gap-8">
                <div className="flex-1">
                  <h2 className="text-2xl font-bold mb-4">Ready to become a Web3 developer?</h2>
                  <p className="text-gray-300 mb-6">
                    Join our comprehensive developer program and learn everything you need to build the next generation
                    of decentralized applications.
                  </p>
                  <Button
                    size="lg"
                    className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                  >
                    Enroll Now
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
                <div className="flex-1 flex justify-center">
                  <img
                    src="/placeholder.svg?height=200&width=300"
                    alt="Web3 Developer Program"
                    className="rounded-lg border border-white/10"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </WalletProvider>
  )
}

