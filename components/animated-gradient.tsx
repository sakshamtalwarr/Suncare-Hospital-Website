"use client"

import { useEffect, useRef } from "react"
import { motion } from "framer-motion"

export function AnimatedGradient() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let animationFrameId: number
    let hue = 0

    const resizeCanvas = () => {
      const { width, height } = canvas.getBoundingClientRect()
      canvas.width = width
      canvas.height = height
    }

    const renderGradient = () => {
      hue = (hue + 0.1) % 360

      const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height)
      gradient.addColorStop(0, `hsla(${hue}, 70%, 90%, 0.5)`)
      gradient.addColorStop(0.5, `hsla(${hue + 60}, 70%, 90%, 0.5)`)
      gradient.addColorStop(1, `hsla(${hue + 120}, 70%, 90%, 0.5)`)

      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      animationFrameId = requestAnimationFrame(renderGradient)
    }

    window.addEventListener("resize", resizeCanvas)
    resizeCanvas()
    renderGradient()

    return () => {
      window.removeEventListener("resize", resizeCanvas)
      cancelAnimationFrame(animationFrameId)
    }
  }, [])

  return (
    <motion.canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full -z-10 opacity-30"
      initial={{ opacity: 0 }}
      animate={{ opacity: 0.3 }}
      transition={{ duration: 1 }}
    />
  )
}

