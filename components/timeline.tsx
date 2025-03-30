"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { cn } from "@/lib/utils"

interface TimelineEvent {
  year: string
  title: string
  description: string
}

interface TimelineProps {
  events: TimelineEvent[]
}

export function Timeline({ events }: TimelineProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  return (
    <div ref={ref} className="relative max-w-4xl mx-auto">
      {/* Timeline line */}
      <div className="absolute left-0 md:left-1/2 top-0 h-full w-0.5 bg-border -translate-x-1/2 md:translate-x-0" />

      {/* Timeline events */}
      <div className="space-y-12">
        {events.map((event, index) => (
          <motion.div
            key={event.year}
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className={cn(
              "relative flex flex-col md:flex-row gap-8 md:gap-0",
              index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse",
            )}
          >
            {/* Timeline dot */}
            <div className="absolute left-0 md:left-1/2 top-0 h-6 w-6 rounded-full bg-primary -translate-x-1/2 md:translate-x-0 -translate-y-[8px]" />

            {/* Year */}
            <div
              className={cn(
                "w-full md:w-1/2 text-right pr-0 md:pr-8",
                index % 2 !== 0 && "md:text-left md:pr-0 md:pl-8",
              )}
            >
              <div className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm text-primary font-bold">
                {event.year}
              </div>
            </div>

            {/* Content */}
            <div className={cn("w-full md:w-1/2 pl-8 md:pl-8", index % 2 !== 0 && "md:pl-0 md:pr-8")}>
              <div className="bg-card p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-bold mb-2">{event.title}</h3>
                <p className="text-muted-foreground">{event.description}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

