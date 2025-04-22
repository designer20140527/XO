import BackgroundEffects from "@/components/background-effects"
import ExplorerSection from "@/components/explorer-section"
import Footer from "@/components/footer"
import GridSection from "@/components/grid-section"
import Header from "@/components/header"
import HeroSection from "@/components/hero-section"
import PathSection from "@/components/path-section"
import MatrixBackground from "@/components/matrix-background"

export default function Home() {
  return (
    <main className="min-h-screen relative overflow-hidden">
      {/* Background effects */}
      <BackgroundEffects />

      {/* Matrix Background Container - positioned to cover header and hero section */}
      <div className="absolute top-0 left-0 right-0 z-0" style={{ height: "calc(100vh - 20vh)" }}>
        <div className="relative w-full h-full">
          <MatrixBackground color="#1cc9f2" fontSize={18} opacity={0.03} speed={0.1} />
          {/* Color overlay with opacity 0.7 */}
          <div className="absolute inset-0 bg-[#0A0E14] opacity-70"></div>
          {/* Feathering gradient overlay at bottom */}
          <div className="absolute bottom-0 left-0 right-0 h-64 bg-gradient-to-t from-[#0a0e14] to-transparent"></div>
        </div>
      </div>

      {/* Header */}
      <Header />

      {/* Hero Section */}
      <HeroSection />

      {/* Grid Section */}
      <GridSection />

      {/* Path Section */}
      <PathSection />

      {/* Explorer Section */}
      <ExplorerSection />

      {/* Footer */}
      <Footer />
    </main>
  )
}
