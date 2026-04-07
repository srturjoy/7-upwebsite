"use client"

import { motion, HTMLMotionProps, Variants } from "framer-motion"
import { forwardRef, ReactNode } from "react"

// Animation Variants
export const fadeInUp: Variants = {
  hidden: { 
    opacity: 0, 
    y: 30,
  },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.4, 0.25, 1],
    }
  }
}

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    }
  }
}

export const scaleIn: Variants = {
  hidden: { 
    opacity: 0, 
    scale: 0.95 
  },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: {
      duration: 0.5,
      ease: [0.25, 0.4, 0.25, 1],
    }
  }
}

export const slideInLeft: Variants = {
  hidden: { 
    opacity: 0, 
    x: -50 
  },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.4, 0.25, 1],
    }
  }
}

export const slideInRight: Variants = {
  hidden: { 
    opacity: 0, 
    x: 50 
  },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.4, 0.25, 1],
    }
  }
}

// Stagger container for child animations
export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    }
  }
}

export const staggerContainerFast: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.05,
    }
  }
}

// Scroll reveal wrapper component
interface ScrollRevealProps extends HTMLMotionProps<"div"> {
  children: ReactNode
  variants?: Variants
  className?: string
  delay?: number
}

export const ScrollReveal = forwardRef<HTMLDivElement, ScrollRevealProps>(
  ({ children, variants = fadeInUp, className, delay = 0, ...props }, ref) => {
    return (
      <motion.div
        ref={ref}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        variants={variants}
        className={className}
        transition={{ delay }}
        {...props}
      >
        {children}
      </motion.div>
    )
  }
)
ScrollReveal.displayName = "ScrollReveal"

// Stagger children wrapper
interface StaggerChildrenProps extends HTMLMotionProps<"div"> {
  children: ReactNode
  className?: string
  fast?: boolean
}

export const StaggerChildren = forwardRef<HTMLDivElement, StaggerChildrenProps>(
  ({ children, className, fast = false, ...props }, ref) => {
    return (
      <motion.div
        ref={ref}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        variants={fast ? staggerContainerFast : staggerContainer}
        className={className}
        {...props}
      >
        {children}
      </motion.div>
    )
  }
)
StaggerChildren.displayName = "StaggerChildren"

// Stagger item
interface StaggerItemProps extends HTMLMotionProps<"div"> {
  children: ReactNode
  className?: string
}

export const StaggerItem = forwardRef<HTMLDivElement, StaggerItemProps>(
  ({ children, className, ...props }, ref) => {
    return (
      <motion.div
        ref={ref}
        variants={fadeInUp}
        className={className}
        {...props}
      >
        {children}
      </motion.div>
    )
  }
)
StaggerItem.displayName = "StaggerItem"

// Premium hover card wrapper
interface HoverCardWrapperProps extends HTMLMotionProps<"div"> {
  children: ReactNode
  className?: string
}

export const HoverCardWrapper = forwardRef<HTMLDivElement, HoverCardWrapperProps>(
  ({ children, className, ...props }, ref) => {
    return (
      <motion.div
        ref={ref}
        whileHover={{ 
          y: -8, 
          scale: 1.02,
          transition: { 
            duration: 0.3, 
            ease: [0.25, 0.4, 0.25, 1] 
          }
        }}
        whileTap={{ scale: 0.98 }}
        className={className}
        {...props}
      >
        {children}
      </motion.div>
    )
  }
)
HoverCardWrapper.displayName = "HoverCardWrapper"

// Magnetic button effect
interface MagneticProps {
  children: ReactNode
  className?: string
  strength?: number
}

export function Magnetic({ children, className, strength = 0.3 }: MagneticProps) {
  return (
    <motion.div
      className={className}
      whileHover="hover"
      whileTap={{ scale: 0.95 }}
    >
      <motion.div
        variants={{
          hover: {
            scale: 1.05,
            transition: { duration: 0.3, ease: "easeOut" }
          }
        }}
      >
        {children}
      </motion.div>
    </motion.div>
  )
}

// Section wrapper with scroll animation
interface AnimatedSectionProps extends HTMLMotionProps<"section"> {
  children: ReactNode
  className?: string
}

export const AnimatedSection = forwardRef<HTMLElement, AnimatedSectionProps>(
  ({ children, className, ...props }, ref) => {
    return (
      <motion.section
        ref={ref}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: {
              duration: 0.6,
              staggerChildren: 0.15,
            }
          }
        }}
        className={className}
        {...props}
      >
        {children}
      </motion.section>
    )
  }
)
AnimatedSection.displayName = "AnimatedSection"

// Re-export motion for convenience
export { motion }
