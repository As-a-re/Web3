import type React from "react"
import "./globals.css"
import { Inter } from "next/font/google"
import { WagmiProvider } from "@/components/wagmi-provider"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "Web3 Platform",
  description: "A modern Web3 platform for blockchain interaction",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <WagmiProvider>{children}</WagmiProvider>
      </body>
    </html>
  )
}



import './globals.css'