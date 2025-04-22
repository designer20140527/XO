"use client"

import { useEffect, useRef } from "react"

interface MatrixBackgroundProps {
  color?: string
  fontSize?: number
  speed?: number
  opacity?: number
}

export default function MatrixBackground({
  color = "#1cc9f2",
  fontSize = 16,
  speed = 1,
  opacity = 0.05,
}: MatrixBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const context = canvas.getContext("2d")
    if (!context) return

    // Set canvas dimensions
    const updateCanvasDimensions = () => {
      if (canvas.parentElement) {
        canvas.width = canvas.parentElement.offsetWidth
        canvas.height = canvas.parentElement.offsetHeight
      }
    }

    updateCanvasDimensions()
    window.addEventListener("resize", updateCanvasDimensions)

    // Only 0 and 1 characters for binary matrix effect
    const binaryChars = "01"

    // Adjust spacing to prevent overlap
    const verticalSpacing = fontSize * 8 // Extremely large vertical spacing
    const horizontalSpacing = fontSize * 1.4 // Slightly reduce horizontal spacing
    const columns = Math.floor(canvas.width / horizontalSpacing)
    
    // Initialize all raindrops at negative positions to create a top-to-bottom
    // effect where they all start at the top (including header)
    // Negative values will ensure they start above the visible area
    const rainDrops: number[] = Array(columns).fill(-5)

    // Animation frame
    let animationFrameId: number

    const draw = () => {
      // Semi-transparent black to create fade effect
      context.fillStyle = `rgba(0, 0, 0, ${opacity})`
      context.fillRect(0, 0, canvas.width, canvas.height)

      context.fillStyle = color
      context.font = `bold ${fontSize}px monospace` // Make font bold for better visibility

      for (let i = 0; i < rainDrops.length; i++) {
        // Randomly select a character (just 0 or 1)
        const text = binaryChars.charAt(Math.floor(Math.random() * binaryChars.length))

        // Draw the character - use horizontalSpacing for x position
        context.fillText(text, i * horizontalSpacing, rainDrops[i] * verticalSpacing)

        // Reset drop when it reaches bottom with some randomness
        if (rainDrops[i] * verticalSpacing > canvas.height && Math.random() > 0.975) {
          rainDrops[i] = -5 // Reset to above the canvas
        }

        // Move the raindrop down
        rainDrops[i] += speed
      }

      animationFrameId = requestAnimationFrame(draw)
    }

    draw()

    // Cleanup
    return () => {
      window.removeEventListener("resize", updateCanvasDimensions)
      cancelAnimationFrame(animationFrameId)
    }
  }, [color, fontSize, speed, opacity])

  return <canvas ref={canvasRef} className="w-full h-full" />
}
