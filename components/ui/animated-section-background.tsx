"use client"

import React from "react"
import { cn } from "@/lib/utils"

interface AnimatedSectionBackgroundProps {
  children: React.ReactNode
  variant?: "dark" | "light" | "auto"
  className?: string
}

export function AnimatedSectionBackground({
  children,
  variant = "auto",
  className = "",
}: AnimatedSectionBackgroundProps) {
  const bgClass =
    variant === "dark"
      ? "ambient-dark-bg text-white"
      : variant === "light"
      ? "ambient-light-bg text-foreground"
      : "ambient-light-bg dark:ambient-dark-bg text-foreground dark:text-white"

  return (
    <div className={cn("relative overflow-hidden transition-colors duration-500", bgClass, className)}>
      {/* Floating luminous orbs for rich visual depth */}
      <div className="absolute top-10 left-10 w-72 h-72 rounded-full bg-cyan-500/10 dark:bg-cyan-500/15 blur-[80px] pointer-events-none floating-orb" style={{ animationDelay: "0s" }} />
      <div className="absolute bottom-10 right-10 w-80 h-80 rounded-full bg-blue-500/10 dark:bg-blue-600/15 blur-[90px] pointer-events-none floating-orb" style={{ animationDelay: "3s" }} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-purple-500/5 dark:bg-purple-600/10 blur-[100px] pointer-events-none floating-orb" style={{ animationDelay: "5s" }} />

      <div className="relative z-10">{children}</div>
    </div>
  )
}
