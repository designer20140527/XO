import type React from "react"
import type { Metadata } from "next"
import { Montserrat, Poppins } from "next/font/google"
import "./globals.css"

const montserrat = Montserrat({ subsets: ["latin"], variable: "--font-montserrat" })
const poppins = Poppins({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-poppins",
})

export const metadata: Metadata = {
  title: "XO",
  description: "XO - The Grid of Destiny",
  generator: 'v0.dev',
  icons: {
    icon: '/images/logo-transparent.png',
    apple: '/images/logo-transparent.png',
  }
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body 
        className={`${montserrat.variable} ${poppins.variable} bg-[#0a0e14] text-white min-h-screen font-poppins`}
        suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  )
}
