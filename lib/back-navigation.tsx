"use client"

import React, { createContext, useContext, useEffect, useRef, useState, useCallback } from "react"
import { useLanguage } from "@/lib/language-context"
import { motion, AnimatePresence } from "framer-motion"
import { LogOut } from "lucide-react"

interface ModalEntry {
  id: string
  onClose: () => void
}

interface BackNavigationContextType {
  registerModal: (id: string, onClose: () => void) => () => void
  notifyModalClosed: (id: string) => void
  hasOpenModal: boolean
}

const BackNavigationContext = createContext<BackNavigationContextType | null>(null)

export function BackNavigationProvider({ children }: { children: React.ReactNode }) {
  const { language } = useLanguage()
  const isEnglish = language === "en"

  // Stack of currently open modals/drawers/lightboxes
  const modalStackRef = useRef<ModalEntry[]>([])
  const [hasOpenModal, setHasOpenModal] = useState(false)

  // Exit toast state
  const [showExitToast, setShowExitToast] = useState(false)
  const lastBackPressTimeRef = useRef<number>(0)
  const isHandlingPopRef = useRef<boolean>(false)
  const toastTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  // Register a modal when it opens
  const registerModal = useCallback((id: string, onClose: () => void) => {
    // If not already in stack
    if (!modalStackRef.current.some((m) => m.id === id)) {
      modalStackRef.current.push({ id, onClose })
      setHasOpenModal(true)

      // Push history state so back button intercepts this modal
      if (typeof window !== "undefined") {
        try {
          window.history.pushState({ modalId: id, timestamp: Date.now() }, "")
        } catch {
          // Ignore state push errors
        }
      }
    }

    // Return cleanup unregister function
    return () => {
      modalStackRef.current = modalStackRef.current.filter((m) => m.id !== id)
      setHasOpenModal(modalStackRef.current.length > 0)
    }
  }, [])

  // Call this when modal is closed programmatically via UI (X button, backdrop, ESC)
  const notifyModalClosed = useCallback((id: string) => {
    const idx = modalStackRef.current.findIndex((m) => m.id === id)
    if (idx !== -1) {
      modalStackRef.current.splice(idx, 1)
      setHasOpenModal(modalStackRef.current.length > 0)

      // If we closed via UI and state is on history stack, gracefully revert one history entry
      // to keep browser history clean and prevent orphan back steps
      if (typeof window !== "undefined" && !isHandlingPopRef.current) {
        if (window.history.state && window.history.state.modalId === id) {
          try {
            window.history.back()
          } catch {
            // fallback
          }
        }
      }
    }
  }, [])

  // Setup Root History Guard and Listen to PopState
  useEffect(() => {
    if (typeof window === "undefined") return

    // Initialize root guard state so there's an entry to catch back-press at root
    try {
      const currentState = window.history.state
      if (!currentState || !currentState._appRootGuard) {
        window.history.replaceState({ _appRootAnchor: true }, "")
        window.history.pushState({ _appRootGuard: true }, "")
      }
    } catch {
      // Ignore
    }

    const handlePopState = (event: PopStateEvent) => {
      isHandlingPopRef.current = true

      // 1. If there's an open modal / card lightbox / drawer
      if (modalStackRef.current.length > 0) {
        const topModal = modalStackRef.current.pop()
        setHasOpenModal(modalStackRef.current.length > 0)
        if (topModal) {
          try {
            topModal.onClose()
          } catch (e) {
            console.error("Error closing modal on back press:", e)
          }
        }
        // User stays on page; don't trigger exit prompt
        setTimeout(() => {
          isHandlingPopRef.current = false
        }, 50)
        return
      }

      // 2. No modal is open -> Double-back to exit handling
      const now = Date.now()
      const timeDiff = now - lastBackPressTimeRef.current
      const EXIT_WINDOW_MS = 2500

      if (timeDiff < EXIT_WINDOW_MS) {
        // Second back press within 2.5s -> Allow user to exit website
        setShowExitToast(false)
        if (toastTimeoutRef.current) clearTimeout(toastTimeoutRef.current)
        // Navigate back out of the site
        window.history.go(-1)
      } else {
        // First back press -> Prevent accidental exit and show toast
        lastBackPressTimeRef.current = now

        // Re-push guard state to stay on the website
        try {
          window.history.pushState({ _appRootGuard: true }, "")
        } catch {
          // Ignore
        }

        setShowExitToast(true)
        if (toastTimeoutRef.current) clearTimeout(toastTimeoutRef.current)
        toastTimeoutRef.current = setTimeout(() => {
          setShowExitToast(false)
          lastBackPressTimeRef.current = 0
        }, EXIT_WINDOW_MS)
      }

      setTimeout(() => {
        isHandlingPopRef.current = false
      }, 50)
    }

    window.addEventListener("popstate", handlePopState)
    return () => {
      window.removeEventListener("popstate", handlePopState)
      if (toastTimeoutRef.current) clearTimeout(toastTimeoutRef.current)
    }
  }, [])

  return (
    <BackNavigationContext.Provider value={{ registerModal, notifyModalClosed, hasOpenModal }}>
      {children}

      {/* Modern, non-intrusive floating double-back exit confirmation toast */}
      <AnimatePresence>
        {showExitToast && (
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
            className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[9999] pointer-events-auto px-4 max-w-sm w-full"
          >
            <div className="flex items-center justify-between gap-3 px-4 py-3 rounded-2xl bg-slate-950/95 dark:bg-slate-900/95 text-white border border-cyan-500/40 shadow-2xl backdrop-blur-xl ring-1 ring-white/10">
              <div className="flex items-center gap-2.5 min-w-0">
                <div className="h-8 w-8 rounded-xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center shrink-0 border border-cyan-500/30">
                  <LogOut className="h-4 w-4" />
                </div>
                <div className="min-w-0">
                  <p className="text-xs sm:text-sm font-bold text-white truncate">
                    {isEnglish ? "Press Back again to exit" : "বের হতে আবার ব্যাক চাপুন"}
                  </p>
                  <p className="text-[10px] sm:text-[11px] text-slate-300 truncate">
                    {isEnglish
                      ? "Tap back once more to leave website"
                      : "আরেকবার ব্যাক বাটনে চাপলে ওয়েবসাইট বন্ধ হবে"}
                  </p>
                </div>
              </div>
              <div className="shrink-0 flex items-center gap-1.5 pl-2 border-l border-slate-800">
                <span className="inline-block h-2 w-2 rounded-full bg-cyan-400 animate-ping" />
                <span className="text-[10px] font-mono text-cyan-400 font-bold">2x</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </BackNavigationContext.Provider>
  )
}

/**
 * Hook to automatically connect a modal/card dialog with back-press handling
 */
export function useBackHandler(isOpen: boolean, onClose: () => void, modalId: string) {
  const context = useContext(BackNavigationContext)

  useEffect(() => {
    if (!context || !isOpen) return

    const unregister = context.registerModal(modalId, onClose)

    return () => {
      unregister()
    }
  }, [context, isOpen, onClose, modalId])

  const safeClose = useCallback(() => {
    if (context) {
      context.notifyModalClosed(modalId)
    }
    onClose()
  }, [context, modalId, onClose])

  return { safeClose }
}

export function useBackNavigation() {
  const context = useContext(BackNavigationContext)
  if (!context) {
    throw new Error("useBackNavigation must be used within BackNavigationProvider")
  }
  return context
}
