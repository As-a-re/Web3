import Hero from "@/components/hero"
import Features from "@/components/features"
import Showcase from "@/components/showcase"
import News from "@/components/news"
import CTA from "@/components/cta"
import { WalletProvider } from "@/components/wallet-provider"

export default function Home() {
  return (
    <WalletProvider>
      <main className="min-h-screen bg-black text-white">
        <Hero />
        <Features />
        <Showcase />
        <News />
        <CTA />
      </main>
    </WalletProvider>
  )
}

