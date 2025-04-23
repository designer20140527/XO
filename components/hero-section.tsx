import Link from "next/link"
import Image from "next/image"
import { TypewriterEffectSmooth } from "./ui/typewriter-effect"

export default function HeroSection() {
  return (
    <section className="px-4 py-16 relative z-10">
      <div className="max-width-container">
        <div className="hero-container relative overflow-hidden">
          {/* Explicitly add corner elements to ensure they're visible */}
          <div className="corner-top-left absolute top-0 left-0 w-20 h-20 pointer-events-none"></div>
          <div className="corner-top-right absolute top-0 right-0 w-20 h-20 pointer-events-none"></div>
          <div className="corner-bottom-left absolute bottom-0 left-0 w-20 h-20 pointer-events-none"></div>
          <div className="corner-bottom-right absolute bottom-0 right-0 w-20 h-20 pointer-events-none"></div>

          <div className="flex flex-col md:flex-row gap-8 relative z-10">
            <div className="flex-1 flex flex-col justify-center space-y-6">
              <TypewriterEffectSmooth
                words={[
                  { text: "XO", className: "text-white font-montserrat" }
                ]}
                cursorClassName="bg-[#1cc9f2]"
              />

              <p className="text-gray-300 leading-relaxed font-poppins">
                In the forgotten realm of Eryndral, a plane where time warps and fates intertwine, the XO Grid emerged
                from the void eons ago. Forged by the Twin Oracles—Xarion, the Keeper of Order (symbolized by X), and
                Othrya, the Weaver of Chaos (symbolized by O)—it was etched into the fabric of reality. Legend holds
                that this Grid is a celestial battlefield, where each mark shapes the destiny of worlds.
              </p>
              
              <div className="flex gap-4 pt-4">
                <Link href="https://t.me/XO_Portal" target="_blank" className="gradient-button px-6 py-3 font-medium">
                  Telegram
                </Link>
                <Link
                  href="https://x.com/XO_SOL_COIN_"
                  target="_blank"
                  className="bordered-button px-6 py-3 font-medium bg-transparent border border-[#1cc9f2] hover:bg-[#1cc9f2]/10 transition-colors"
                >
                  Twitter
                </Link>
              </div>
            </div>
            <div className="flex-1 flex items-center justify-center">
              <div className="max-w-[400px] mx-auto">
                <Image 
                  src="/images/image-1.png" 
                  alt="XO Grid Illustration" 
                  width={400} 
                  height={320}
                  className="object-contain"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
