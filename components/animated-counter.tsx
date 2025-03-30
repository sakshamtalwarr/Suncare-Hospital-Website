"use client"

import { useState, useEffect, useRef } from "react"
import { useInView } from "framer-motion"
import { cn } from "@/lib/utils"

interface AnimatedCounterProps {
  value: number
  duration?: number
  className?: string
}

export function AnimatedCounter({ value, duration = 2, className }: AnimatedCounterProps) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })
  const countRef = useRef(0)
  const timerRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    if (isInView) {
      const step = Math.ceil(value / (duration * 60))

      if (timerRef.current) clearInterval(timerRef.current)

      timerRef.current = setInterval(() => {
        countRef.current += step

        if (countRef.current >= value) {
          countRef.current = value
          if (timerRef.current) clearInterval(timerRef.current)
        }

        setCount(countRef.current)
      }, 1000 / 60)

      return () => {
        if (timerRef.current) clearInterval(timerRef.current)
      }
    }
  }, [isInView, value, duration])

  return (
    <span ref={ref} className={cn("tabular-nums", className)}>
      {count.toLocaleString()}
    </span>
  )
}

