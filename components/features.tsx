"use client"

import { motion } from "framer-motion"
import { Shield, Zap, RefreshCw, Layers } from "lucide-react"

export default function Features() {
  const features = [
    {
      icon: <Shield className="h-10 w-10 text-purple-400" />,
      title: "Secure Transactions",
      description: "Every transaction is secured by cryptographic proofs and verified across the network.",
    },
    {
      icon: <Zap className="h-10 w-10 text-blue-400" />,
      title: "Lightning Fast",
      description: "Experience near-instant transactions with our optimized blockchain integration.",
    },
    {
      icon: <RefreshCw className="h-10 w-10 text-green-400" />,
      title: "Real-time Updates",
      description: "Get real-time updates on your transactions and blockchain status.",
    },
    {
      icon: <Layers className="h-10 w-10 text-orange-400" />,
      title: "Multi-chain Support",
      description: "Connect to multiple blockchains and manage all your assets in one place.",
    },
  ]

  return (
    <section className="py-24 bg-black relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-white/[0.02] -z-10"></div>
      <div
        className="absolute inset-0 -z-10 opacity-30"
        style={{
          backgroundImage: "radial-gradient(circle at 50% 80%, rgba(120, 41, 190, 0.3) 0%, transparent 60%)",
        }}
      ></div>

      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
          <motion.div
            className="inline-block rounded-lg bg-purple-500/10 px-3 py-1 text-sm text-purple-300 mb-2"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Web3 Features
          </motion.div>
          <motion.h2
            className="text-3xl font-bold tracking-tighter sm:text-5xl bg-clip-text text-transparent bg-gradient-to-r from-white to-purple-400"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Powerful Blockchain Technology
          </motion.h2>
          <motion.p
            className="max-w-[700px] text-gray-400 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Our platform leverages cutting-edge blockchain technology to provide a seamless and secure experience.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="flex flex-col items-center p-6 bg-gradient-to-b from-white/[0.05] to-transparent rounded-2xl border border-white/10 backdrop-blur-sm"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 * index }}
            >
              <div className="p-3 rounded-xl bg-white/5 mb-4">{feature.icon}</div>
              <h3 className="text-xl font-bold mb-2 text-white">{feature.title}</h3>
              <p className="text-gray-400 text-center">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

