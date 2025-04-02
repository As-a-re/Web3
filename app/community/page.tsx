"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ArrowRight, MessageSquare, Users, Calendar, Globe, Wallet, Heart, MessageCircle, Share2 } from "lucide-react"
import { WalletProvider } from "@/components/wallet-provider"

export default function CommunityPage() {
  const [activeTab, setActiveTab] = useState("forums")

  const forums = [
    {
      id: "1",
      title: "Getting Started with Web3",
      description: "Discuss the basics of Web3 and blockchain technology.",
      posts: 156,
      members: 2345,
      lastActive: "2 hours ago",
    },
    {
      id: "2",
      title: "Smart Contract Development",
      description: "Share tips and tricks for developing secure smart contracts.",
      posts: 324,
      members: 1876,
      lastActive: "30 minutes ago",
    },
    {
      id: "3",
      title: "DeFi Discussions",
      description: "Talk about decentralized finance protocols and strategies.",
      posts: 498,
      members: 3210,
      lastActive: "5 minutes ago",
    },
    {
      id: "4",
      title: "NFT Creators Corner",
      description: "For artists and collectors to discuss NFT projects and marketplaces.",
      posts: 267,
      members: 1543,
      lastActive: "1 hour ago",
    },
    {
      id: "5",
      title: "Governance & DAOs",
      description: "Discussions about decentralized governance and organizations.",
      posts: 189,
      members: 987,
      lastActive: "3 hours ago",
    },
    {
      id: "6",
      title: "Technical Support",
      description: "Get help with technical issues related to Web3 development.",
      posts: 412,
      members: 2156,
      lastActive: "15 minutes ago",
    },
  ]

  const events = [
    {
      id: "1",
      title: "Web3 Developer Workshop",
      description: "Learn how to build your first dApp in this hands-on workshop.",
      date: "May 15, 2023",
      time: "2:00 PM - 5:00 PM UTC",
      location: "Virtual",
      attendees: 156,
      image: "/placeholder.svg?height=200&width=400",
    },
    {
      id: "2",
      title: "DeFi Summit 2023",
      description: "A conference focused on the latest trends in decentralized finance.",
      date: "June 8-10, 2023",
      time: "All day",
      location: "New York, NY",
      attendees: 1200,
      image: "/placeholder.svg?height=200&width=400",
    },
    {
      id: "3",
      title: "NFT Art Exhibition",
      description: "Showcasing the work of top digital artists in the NFT space.",
      date: "July 22, 2023",
      time: "6:00 PM - 9:00 PM UTC",
      location: "London, UK",
      attendees: 350,
      image: "/placeholder.svg?height=200&width=400",
    },
  ]

  const posts = [
    {
      id: "1",
      author: {
        name: "Alex Johnson",
        avatar: "/placeholder.svg?height=40&width=40",
        handle: "@alexj",
      },
      content:
        "Just deployed my first smart contract on Ethereum! The gas fees were high, but the experience was worth it. Anyone have tips for optimizing gas usage?",
      likes: 42,
      comments: 15,
      shares: 7,
      time: "2 hours ago",
    },
    {
      id: "2",
      author: {
        name: "Sophia Chen",
        avatar: "/placeholder.svg?height=40&width=40",
        handle: "@sophiac",
      },
      content:
        "Excited to announce that our DAO has reached 1000 members! We're voting on our first proposal next week. Join us if you're interested in decentralized governance.",
      likes: 128,
      comments: 32,
      shares: 24,
      time: "5 hours ago",
    },
    {
      id: "3",
      author: {
        name: "Marcus Williams",
        avatar: "/placeholder.svg?height=40&width=40",
        handle: "@marcusw",
      },
      content:
        "I've been exploring different Layer 2 solutions for Ethereum. So far, Optimism and Arbitrum seem promising for dApp development. Has anyone had experience deploying on zkSync?",
      likes: 76,
      comments: 28,
      shares: 12,
      time: "1 day ago",
    },
  ]

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
              <a href="/learn" className="text-sm font-medium text-gray-400 hover:text-white">
                Learn
              </a>
              <a href="/community" className="text-sm font-medium text-white">
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
              backgroundImage: "radial-gradient(circle at 50% 50%, rgba(236, 72, 153, 0.3) 0%, transparent 60%)",
            }}
          ></div>

          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
              <motion.div
                className="inline-block rounded-lg bg-pink-500/10 px-3 py-1 text-sm text-pink-300 mb-2"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                Connect
              </motion.div>
              <motion.h1
                className="text-3xl font-bold tracking-tighter sm:text-5xl bg-clip-text text-transparent bg-gradient-to-r from-white to-pink-400"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                Join the Web3 Community
              </motion.h1>
              <motion.p
                className="max-w-[700px] text-gray-400 md:text-xl/relaxed"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                Connect with like-minded individuals, participate in discussions, and stay updated on the latest events
                in the Web3 ecosystem.
              </motion.p>
            </div>

            <Tabs defaultValue="forums" className="w-full" onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-3 bg-black/20 border border-white/10 rounded-lg mb-8">
                <TabsTrigger value="forums" className="data-[state=active]:bg-white/10">
                  <MessageSquare className="h-4 w-4 mr-2" />
                  Forums
                </TabsTrigger>
                <TabsTrigger value="events" className="data-[state=active]:bg-white/10">
                  <Calendar className="h-4 w-4 mr-2" />
                  Events
                </TabsTrigger>
                <TabsTrigger value="social" className="data-[state=active]:bg-white/10">
                  <Globe className="h-4 w-4 mr-2" />
                  Social Feed
                </TabsTrigger>
              </TabsList>

              <TabsContent value="forums" className="mt-0">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {forums.map((forum) => (
                    <Card
                      key={forum.id}
                      className="bg-black/40 border border-white/10 backdrop-blur-sm overflow-hidden"
                    >
                      <CardHeader>
                        <CardTitle>{forum.title}</CardTitle>
                        <CardDescription>{forum.description}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="flex justify-between text-sm text-gray-400">
                          <div className="flex items-center">
                            <MessageSquare className="h-4 w-4 mr-1" />
                            {forum.posts} Posts
                          </div>
                          <div className="flex items-center">
                            <Users className="h-4 w-4 mr-1" />
                            {forum.members} Members
                          </div>
                        </div>
                      </CardContent>
                      <CardFooter className="flex justify-between items-center">
                        <div className="text-xs text-gray-400">Last active: {forum.lastActive}</div>
                        <Button variant="ghost" size="sm" className="gap-1 text-pink-300 hover:text-pink-200">
                          Join Discussion
                          <ArrowRight className="h-4 w-4" />
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="events" className="mt-0">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {events.map((event) => (
                    <Card
                      key={event.id}
                      className="bg-black/40 border border-white/10 backdrop-blur-sm overflow-hidden"
                    >
                      <div className="aspect-video w-full overflow-hidden">
                        <img
                          src={event.image || "/placeholder.svg"}
                          alt={event.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <CardHeader>
                        <CardTitle>{event.title}</CardTitle>
                        <CardDescription>{event.description}</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-2">
                        <div className="flex items-center text-sm">
                          <Calendar className="h-4 w-4 mr-2 text-pink-400" />
                          <span>
                            {event.date} • {event.time}
                          </span>
                        </div>
                        <div className="flex items-center text-sm">
                          <Globe className="h-4 w-4 mr-2 text-pink-400" />
                          <span>{event.location}</span>
                        </div>
                        <div className="flex items-center text-sm">
                          <Users className="h-4 w-4 mr-2 text-pink-400" />
                          <span>{event.attendees} Attendees</span>
                        </div>
                      </CardContent>
                      <CardFooter>
                        <Button className="w-full bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700">
                          Register Now
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="social" className="mt-0">
                <div className="max-w-2xl mx-auto">
                  <Card className="bg-black/40 border border-white/10 backdrop-blur-sm mb-8">
                    <CardHeader>
                      <CardTitle>Share your thoughts</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <Textarea
                        placeholder="What's on your mind about Web3?"
                        className="bg-white/5 border-white/10 text-white placeholder:text-gray-400 min-h-[100px]"
                      />
                    </CardContent>
                    <CardFooter className="flex justify-end">
                      <Button className="bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700">
                        Post
                      </Button>
                    </CardFooter>
                  </Card>

                  {posts.map((post) => (
                    <Card key={post.id} className="bg-black/40 border border-white/10 backdrop-blur-sm mb-4">
                      <CardHeader className="flex flex-row items-start space-y-0 gap-4 pb-2">
                        <Avatar>
                          <AvatarImage src={post.author.avatar} alt={post.author.name} />
                          <AvatarFallback>{post.author.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <div>
                              <CardTitle className="text-base">{post.author.name}</CardTitle>
                              <CardDescription>
                                {post.author.handle} • {post.time}
                              </CardDescription>
                            </div>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent className="pt-2">
                        <p className="text-gray-200">{post.content}</p>
                      </CardContent>
                      <CardFooter className="border-t border-white/5 pt-4">
                        <div className="flex justify-between w-full">
                          <Button variant="ghost" size="sm" className="gap-1">
                            <Heart className="h-4 w-4" />
                            {post.likes}
                          </Button>
                          <Button variant="ghost" size="sm" className="gap-1">
                            <MessageCircle className="h-4 w-4" />
                            {post.comments}
                          </Button>
                          <Button variant="ghost" size="sm" className="gap-1">
                            <Share2 className="h-4 w-4" />
                            {post.shares}
                          </Button>
                        </div>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            </Tabs>

            <div className="mt-16 bg-gradient-to-r from-pink-900/20 to-purple-900/20 rounded-xl border border-white/10 p-8">
              <div className="flex flex-col md:flex-row items-center gap-8">
                <div className="flex-1">
                  <h2 className="text-2xl font-bold mb-4">Stay Connected</h2>
                  <p className="text-gray-300 mb-6">
                    Subscribe to our newsletter to receive the latest updates, event announcements, and community
                    highlights.
                  </p>
                  <div className="flex gap-2">
                    <Input
                      type="email"
                      placeholder="Enter your email"
                      className="bg-white/5 border-white/10 text-white placeholder:text-gray-400"
                    />
                    <Button className="bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700">
                      Subscribe
                    </Button>
                  </div>
                </div>
                <div className="flex-1 flex justify-center">
                  <img
                    src="/placeholder.svg?height=200&width=300"
                    alt="Community Newsletter"
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

