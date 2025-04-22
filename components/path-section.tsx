"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight, MessageCircle, GitBranch, Swords, Trophy } from "lucide-react"
import { TypewriterEffectSmooth } from "./ui/typewriter-effect"
import { useEffect } from "react"

export default function PathSection() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isMobile, setIsMobile] = useState(false)
  
  // 检测手机屏幕
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // 移动到下一个位置，手机版可以滑动3次，桌面/iPad版只能滑动1次
  const nextSlide = () => {
    if ((isMobile && currentIndex < 3) || (!isMobile && currentIndex < 1)) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  // 移动到前一个位置
  const prevSlide = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const cards = [
    {
      title: "Summon the Portal",
      content: "Open Telegram and search for @XO_Bot.\nType /start to awaken the Grid.",
      icon: <MessageCircle className="w-10 h-10 text-[#1cc9f2]" />,
    },
    {
      title: "Choose Your Oracle",
      content: '"Will you follow Xarion (X) or Othrya (O)?"\nReply with /x to join Order, or /o to fall into Chaos.',
      icon: <GitBranch className="w-10 h-10 text-[#1cc9f2]" />,
    },
    {
      title: "Master the Battlefield",
      content:
        "Take turns battling the bot or a friend (use /challenge [username] to initiate a duel).\nType /move [number] (e.g., /move 5) to place your mark.",
      icon: <Swords className="w-10 h-10 text-[#1cc9f2]" />,
    },
    {
      title: "Victory or Face Judgment",
      content:
        "Align three marks horizontally, vertically, or diagonally to summon the Oracles' favor—Victory!\nIf the Grid fills with no winner, it locks in stasis—Draw.\nFail, and Eryndral's wrath will bind your soul to its shadows.",
      icon: <Trophy className="w-10 h-10 text-[#1cc9f2]" />,
    },
  ]

  // 禁用按钮状态
  const isLeftDisabled = currentIndex === 0;
  const isRightDisabled = isMobile ? currentIndex === 3 : currentIndex === 1;

  // 计算滑动距离
  const slideAmount = isMobile ? 100 : (100 / 3);

  return (
    <section id="path-section" className="px-4 py-24 relative z-10">
      <div className="max-width-container">
        <div className="mb-16 flex justify-center">
          <TypewriterEffectSmooth
            words={[
              { text: "The", className: "text-white font-montserrat" },
              { text: "Path", className: "text-white font-montserrat" },
              { text: "to", className: "text-white font-montserrat" },
              { text: "Ascension", className: "text-white font-montserrat" }
            ]}
            cursorClassName="bg-[#1cc9f2]"
          />
        </div>

        <div className="relative px-8 md:px-12">
          {/* Carousel navigation */}
          <button
            onClick={prevSlide}
            className={`absolute left-0 top-1/2 transform -translate-y-1/2 p-2 rounded-full z-10 transition-colors ${
              isLeftDisabled
                ? "bg-gray-800/50 text-gray-600 cursor-not-allowed"
                : "bg-[#1cc9f2]/10 hover:bg-[#1cc9f2]/20 text-[#1cc9f2]"
            }`}
            aria-label="Previous slide"
            disabled={isLeftDisabled}
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-300 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * slideAmount}%)` }}
            >
              {cards.map((card, index) => (
                <div key={index} className={`w-full flex-shrink-0 px-4 ${!isMobile ? 'md:w-1/3' : ''}`}>
                  <div className="card-container relative p-6 h-full">
                    {/* Corner decorations */}
                    <div className="corner-top-left absolute top-0 left-0 w-16 md:w-20 h-16 md:h-20 pointer-events-none"></div>
                    <div className="corner-top-right absolute top-0 right-0 w-16 md:w-20 h-16 md:h-20 pointer-events-none"></div>
                    <div className="corner-bottom-left absolute bottom-0 left-0 w-16 md:w-20 h-16 md:h-20 pointer-events-none"></div>
                    <div className="corner-bottom-right absolute bottom-0 right-0 w-16 md:w-20 h-16 md:h-20 pointer-events-none"></div>

                    <div className="flex flex-col h-full">
                      <div className="mb-4">{card.icon}</div>
                      <h3 className="text-xl font-bold mb-3 font-montserrat text-white">{card.title}</h3>
                      <p className="text-gray-300 font-poppins whitespace-pre-line">{card.content}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={nextSlide}
            className={`absolute right-0 top-1/2 transform -translate-y-1/2 p-2 rounded-full z-10 transition-colors ${
              isRightDisabled
                ? "bg-gray-800/50 text-gray-600 cursor-not-allowed"
                : "bg-[#1cc9f2]/10 hover:bg-[#1cc9f2]/20 text-[#1cc9f2]"
            }`}
            aria-label="Next slide"
            disabled={isRightDisabled}
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
      </div>
    </section>
  )
}
