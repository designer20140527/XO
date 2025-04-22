import Image from "next/image"
import Link from "next/link"

export default function Header() {
  return (
    <header className="py-6 px-4 relative z-10">
      <div className="max-width-container flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Image src="/images/logo-transparent.png" alt="XO Logo" width={40} height={40} />
          <span className="text-2xl font-bold font-montserrat">XO</span>
        </div>
        <nav>
          <Link
            href="/signin"
            className="px-6 py-2 rounded-full border border-[#1cc9f2] text-[#1cc9f2] hover:bg-[#1cc9f2]/10 transition-colors"
          >
            DEXTools
          </Link>
        </nav>
      </div>
    </header>
  )
}
