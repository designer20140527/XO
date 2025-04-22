"use client"

import Link from "next/link"
import Image from "next/image"
import { TextGenerateEffect } from "./ui/text-generate-effect"
import { useEffect, useState } from "react"

export default function ExplorerSection() {
  const [deviceType, setDeviceType] = useState("desktop");
  
  // 检测设备类型
  useEffect(() => {
    const checkSize = () => {
      const width = window.innerWidth;
      if (width < 768) {
        setDeviceType("mobile");
      } else if (width >= 768 && width <= 1023) {
        setDeviceType("tablet");
      } else {
        setDeviceType("desktop");
      }
    };
    
    // 初始检查
    checkSize();
    
    // 添加窗口大小变化监听
    window.addEventListener('resize', checkSize);
    
    // 清理
    return () => window.removeEventListener('resize', checkSize);
  }, []);

  // 根据设备类型返回不同的图片尺寸
  const getImageSize = () => {
    switch(deviceType) {
      case "mobile":
        return { width: 500, height: 500 };
      case "tablet":
        return { width: 600, height: 600 };
      default:
        return { width: 700, height: 700 };
    }
  };

  const imageSizes = getImageSize();

  return (
    <section className="px-4 py-24 relative z-10 overflow-hidden">
      {/* 使用Image组件而不是背景属性，可以更好地控制图像大小 */}
      <div className="absolute inset-0 flex items-center justify-center z-0 pointer-events-none">
        <Image
          src="/images/image-3.png"
          alt="Background Image"
          width={imageSizes.width}
          height={imageSizes.height}
          className="opacity-15 object-contain"
          priority
        />
      </div>
      
      <div className="max-width-container relative z-10">
        <div className="flex flex-col items-center text-center space-y-8">
          {/* Simple HTML heading that works on all screen sizes */}
          <div>
            <h1 className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl text-white font-bold font-montserrat leading-relaxed tracking-wide">
              Step Forward, Explorer, into a new order.
            </h1>
          </div>

          <div className="max-w-2xl">
            <TextGenerateEffect 
              words="The Oracles watch your every move. Begin marking your fate."
              className="text-gray-300 text-xl"
              duration={0.4}
            />
          </div>

          <div className="flex flex-wrap gap-6 mt-8 justify-center">
            <Link
              href="https://www.dextools.io/"
              target="_blank"
              className="gradient-button px-8 py-3 font-medium text-lg"
            >
              DEXTools
            </Link>
            <Link
              href="https://dexscreener.com/"
              target="_blank"
              className="bordered-button px-8 py-3 font-medium text-lg bg-transparent border border-[#1cc9f2] hover:bg-[#1cc9f2]/10 transition-colors"
            >
              DEX Screener
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
