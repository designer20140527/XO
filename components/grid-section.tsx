"use client"

import { TextGenerateEffect } from "./ui/text-generate-effect"
import { TypewriterEffectSmooth } from "./ui/typewriter-effect"
import Image from "next/image"
import { useRef, useState, useEffect } from "react"

export default function GridSection() {
  const textRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        // 当元素可见时更新状态
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect(); // 一旦触发，就不再需要观察
        }
      },
      {
        root: null, // 相对于视口
        rootMargin: '0px',
        threshold: 0.3 // 30%可见时触发
      }
    );

    if (textRef.current) {
      observer.observe(textRef.current);
    }

    return () => {
      if (textRef.current) {
        observer.unobserve(textRef.current);
      }
    };
  }, []);

  return (
    <section id="grid-section" className="px-4 py-24 relative z-10">
      <div className="max-width-container">
        <div className="flex flex-col items-center text-center space-y-10">
          <TypewriterEffectSmooth
            words={[
              { text: "The", className: "text-white font-montserrat" },
              { text: "Grid", className: "text-white font-montserrat" },
              { text: "is", className: "text-white font-montserrat" },
              { text: "sentient.", className: "text-white font-montserrat" }
            ]}
            cursorClassName="bg-[#1cc9f2]"
            className="flex justify-center"
          />

          {/* Image container with hero-container style */}
          <div className="w-full max-w-4xl relative overflow-hidden border border-white/10">
            {/* Corner decorations */}
            <div className="corner-top-left absolute top-0 left-0 w-20 h-20 pointer-events-none"></div>
            <div className="corner-top-right absolute top-0 right-0 w-20 h-20 pointer-events-none"></div>
            <div className="corner-bottom-left absolute bottom-0 left-0 w-20 h-20 pointer-events-none"></div>
            <div className="corner-bottom-right absolute bottom-0 right-0 w-20 h-20 pointer-events-none"></div>
            
            <div className="flex items-center justify-center">
              <Image 
                src="/images/image-2.png" 
                alt="XO Grid" 
                width={800} 
                height={640}
                className="w-full h-auto object-contain"
                priority
              />
            </div>
          </div>

          <div ref={textRef} className="space-y-2 min-h-[100px]">
            {isVisible && (
              <>
                <TextGenerateEffect 
                  words="It tests your resolve, strategy, and soul." 
                  className="text-[#1cc9f2] text-lg" 
                />
                
                <TextGenerateEffect 
                  words="Through Telegram, as a conduit to the Grid, players are led into the Oracles' eternal duel."
                  className="text-gray-300 text-lg"
                  duration={0.4}
                />
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
