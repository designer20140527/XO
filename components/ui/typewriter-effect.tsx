"use client";

import { cn } from "@/lib/utils";
import { motion, stagger, useAnimate, useInView } from "motion/react";
import { useEffect, useState, useRef } from "react";

export const TypewriterEffect = ({
  words,
  className,
  cursorClassName,
}: {
  words: {
    text: string;
    className?: string;
  }[];
  className?: string;
  cursorClassName?: string;
}) => {
  // split text inside of words into array of characters
  const wordsArray = words.map((word) => {
    return {
      ...word,
      text: word.text.split(""),
    };
  });

  const [scope, animate] = useAnimate();
  const isInView = useInView(scope);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (isInView && !hasAnimated.current) {
      hasAnimated.current = true;
      animate(
        "span",
        {
          display: "inline-block",
          opacity: 1,
          width: "fit-content",
        },
        {
          duration: 0.3,
          delay: stagger(0.1),
          ease: "easeInOut",
        }
      );
    }
  }, [isInView]);

  const renderWords = () => {
    return (
      <motion.div ref={scope} className="inline">
        {wordsArray.map((word, idx) => {
          return (
            <div key={`word-${idx}`} className="inline-block">
              {word.text.map((char, index) => (
                <motion.span
                  initial={{}}
                  key={`char-${index}`}
                  className={cn(
                    `text-white opacity-0 hidden`,
                    word.className
                  )}
                >
                  {char}
                </motion.span>
              ))}
              &nbsp;
            </div>
          );
        })}
      </motion.div>
    );
  };
  return (
    <div
      className={cn(
        "text-base sm:text-xl md:text-3xl lg:text-5xl font-bold",
        className
      )}
    >
      {renderWords()}
      <motion.span
        initial={{
          opacity: 0,
        }}
        animate={{
          opacity: 1,
        }}
        transition={{
          duration: 0.8,
          repeat: Infinity,
          repeatType: "reverse",
        }}
        className={cn(
          "inline-block rounded-sm w-[4px] h-10 md:h-12 lg:h-14 bg-[#1cc9f2]",
          cursorClassName
        )}
      ></motion.span>
    </div>
  );
};

export const TypewriterEffectSmooth = ({
  words,
  className,
  cursorClassName,
}: {
  words: {
    text: string;
    className?: string;
  }[];
  className?: string;
  cursorClassName?: string;
}) => {
  const [cursorOpacity, setCursorOpacity] = useState(1);
  const animationCompleted = useRef(false);
  
  // split text inside of words into array of characters
  const wordsArray = words.map((word) => {
    return {
      ...word,
      text: word.text.split(""),
    };
  });
  
  const renderWords = () => {
    return (
      <div>
        {wordsArray.map((word, idx) => {
          return (
            <div key={`word-${idx}`} className="inline-block">
              {word.text.map((char, index) => (
                <span
                  key={`char-${index}`}
                  className={cn(`text-white`, word.className)}
                >
                  {char}
                </span>
              ))}
              &nbsp;
            </div>
          );
        })}
      </div>
    );
  };

  // Hide the cursor after typing is complete and a few blinks with fade effect
  useEffect(() => {
    if (animationCompleted.current) {
      return; // Skip if animation already completed
    }

    animationCompleted.current = true;
    
    const typingDuration = 2000; // 2 seconds for typing
    const delayBeforeTyping = 1000; // 1 second delay before typing starts
    const blinkDuration = 800; // Duration of each blink
    const numberOfBlinks = 5; // Number of blinks after typing completes
    const fadeOutDuration = 1000; // Duration of fade out effect in ms
    
    const timeBeforeFadeStart = delayBeforeTyping + typingDuration + (blinkDuration * numberOfBlinks);
    
    // Start the fade effect
    const fadeStartTimer = setTimeout(() => {
      // Use animation frames to create smooth opacity transition
      let startTime: number | null = null;
      
      const fadeStep = (timestamp: number) => {
        if (!startTime) startTime = timestamp;
        const elapsed = timestamp - startTime;
        
        // Calculate new opacity (from 1 to 0)
        const newOpacity = Math.max(0, 1 - (elapsed / fadeOutDuration));
        setCursorOpacity(newOpacity);
        
        // Continue the animation until opacity reaches 0
        if (elapsed < fadeOutDuration) {
          requestAnimationFrame(fadeStep);
        }
      };
      
      requestAnimationFrame(fadeStep);
    }, timeBeforeFadeStart);
    
    return () => clearTimeout(fadeStartTimer);
  }, []);

  return (
    <div className={cn("flex space-x-1", className)}>
      <motion.div
        className="overflow-hidden pb-2"
        initial={{
          width: "0%",
        }}
        whileInView={{
          width: "fit-content",
        }}
        viewport={{ once: true }} // Important: Animation runs only once
        transition={{
          duration: 2,
          ease: "linear",
          delay: 1,
        }}
      >
        <div
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold"
          style={{
            whiteSpace: "nowrap",
          }}
        >
          {renderWords()}{" "}
        </div>{" "}
      </motion.div>
      <motion.span
        initial={{
          opacity: 0,
        }}
        animate={{
          opacity: 1,
        }}
        transition={{
          duration: 0.8,
          repeat: Infinity,
          repeatType: "reverse",
        }}
        className={cn(
          "block rounded-sm w-[4px] h-10 sm:h-12 md:h-14 lg:h-16 bg-[#1cc9f2]",
          cursorClassName
        )}
        style={{ opacity: cursorOpacity }}
      ></motion.span>
    </div>
  );
}; 