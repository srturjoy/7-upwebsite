"use client"

import React from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

export function AmbientGlow({ className = "" }: { className?: string }) {
  return (
    <div className={cn("absolute pointer-events-none overflow-hidden z-0", className)}>
      <motion.div
        className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-gradient-to-br from-cyan-500/10 via-blue-600/10 to-purple-600/10 blur-[100px]"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.4, 0.7, 0.4],
          x: [0, 30, 0],
          y: [0, -30, 0],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute -bottom-32 -right-32 w-[450px] h-[450px] rounded-full bg-gradient-to-tr from-purple-600/10 via-cyan-500/10 to-blue-500/10 blur-[120px]"
        animate={{
          scale: [1.1, 1, 1.1],
          opacity: [0.3, 0.6, 0.3],
          x: [0, -40, 0],
          y: [0, 40, 0],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </div>
  )
}

export function SubtleGridPattern({ className = "" }: { className?: string }) {
  return (
    <div
      className={cn(
        "absolute inset-0 pointer-events-none opacity-[0.03] dark:opacity-[0.07] bg-[radial-gradient(#06b6d4_1px,transparent_1px)] [background-size:24px_24px]",
        className
      )}
    />
  )
}

export function AnimatedGradientBackground({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={cn("relative overflow-hidden", className)}>
      <SubtleGridPattern />
      <AmbientGlow />
      <div className="relative z-10">{children}</div>
    </div>
  )
}
