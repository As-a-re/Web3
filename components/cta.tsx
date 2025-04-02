"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ArrowRight } from "lucide-react"

export default function CTA() {
  return (
    <section className="py-24 bg-black relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-white/[0.02] -z-10"></div>
      <div
        className="absolute inset-0 -z-10 opacity-30"
        style={{
          backgroundImage: "radial-gradient(circle at 70% 50%, rgba(120, 41, 190, 0.3) 0%, transparent 60%)",
        }}
      ></div>

      <div className="container px-4 md:px-6">
        <motion.div
          className="relative overflow-hidden rounded-3xl border border-white/10 backdrop-blur-sm bg-black/40"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-blue-500/10"></div>
          <div className="relative p-6 sm:p-10 md:p-16 flex flex-col items-center text-center">
            <motion.h2
              className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl bg-clip-text text-transparent bg-gradient-to-r from-white to-purple-400 mb-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              Join the Web3 Revolution
            </motion.h2>
            <motion.p
              className="max-w-[600px] text-gray-300 md:text-xl/relaxed mb-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Stay updated with the latest blockchain news, features, and updates. Be the first to know about new
              opportunities in the Web3 space.
            </motion.p>
            <motion.div
              className="w-full max-w-md space-y-2"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <form className="flex w-full max-w-sm items-center space-x-2 mx-auto">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  className="bg-white/5 border-white/10 text-white placeholder:text-gray-400"
                />
                <Button
                  type="submit"
                  className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                >
                  Subscribe
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </form>
              <p className="text-xs text-gray-400 text-center">
                By subscribing, you agree to our Terms of Service and Privacy Policy.
              </p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

