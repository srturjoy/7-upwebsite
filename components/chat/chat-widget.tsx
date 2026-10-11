"use client"

import { useState, useEffect, useCallback, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, Bot, MessageCircle } from "lucide-react"
import { useLanguage } from "@/lib/language-context"
import { ChatHeader } from "./chat-header"
import { ChatMessages } from "./chat-messages"
import { ChatInput } from "./chat-input"
import { ChatMessage, ConversationContext } from "@/lib/faq-engine/types"
import { getInitialGreeting, processUserQuery } from "@/lib/faq-engine/engine"
import { createInitialContext } from "@/lib/faq-engine/conversation-manager"

const STORAGE_KEY_MESSAGES = "boosting_faq_messages"
const STORAGE_KEY_CONTEXT = "boosting_faq_context"

export function ChatWidget() {
  const { language: globalLang } = useLanguage()
  const [isOpen, setIsOpen] = useState(false)
  const [chatLang, setChatLang] = useState<"en" | "bn">("bn")
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [context, setContext] = useState<ConversationContext>(() => createInitialContext())
  const [isSearching, setIsSearching] = useState(false)
  const [unreadCount, setUnreadCount] = useState(1)
  const isInitializedRef = useRef(false)

  // Sync with global language initially
  useEffect(() => {
    if (globalLang === "en" || globalLang === "bn") {
      setChatLang(globalLang)
    }
  }, [globalLang])

  // Initialize or restore messages and context from sessionStorage on mount
  useEffect(() => {
    if (isInitializedRef.current) return
    isInitializedRef.current = true

    if (typeof window !== "undefined") {
      try {
        const savedMsgs = sessionStorage.getItem(STORAGE_KEY_MESSAGES)
        const savedCtx = sessionStorage.getItem(STORAGE_KEY_CONTEXT)

        if (savedMsgs) {
          const parsed = JSON.parse(savedMsgs)
          if (Array.isArray(parsed) && parsed.length > 0) {
            setMessages(parsed)
            if (savedCtx) {
              setContext(JSON.parse(savedCtx))
            }
            return
          }
        }
      } catch (e) {
        console.warn("Could not read chat session from storage", e)
      }
    }

    // Default: Set initial greeting
    setMessages([getInitialGreeting(chatLang)])
  }, [chatLang])

  // Persist messages and context to sessionStorage whenever they change
  useEffect(() => {
    if (messages.length > 0 && typeof window !== "undefined") {
      try {
        sessionStorage.setItem(STORAGE_KEY_MESSAGES, JSON.stringify(messages))
        sessionStorage.setItem(STORAGE_KEY_CONTEXT, JSON.stringify(context))
      } catch (e) {
        console.warn("Could not write chat session to storage", e)
      }
    }
  }, [messages, context])

  const isClosingViaHistoryRef = useRef(false)

  // Clear unread badge when opened and push history state so phone back button / swipe back gesture closes assistant
  const handleOpen = () => {
    setIsOpen(true)
    setUnreadCount(0)
    if (typeof window !== "undefined") {
      isClosingViaHistoryRef.current = false
      window.history.pushState({ modal: "chat-widget" }, "")
    }
  }

  const handleClose = () => {
    setIsOpen(false)
    if (typeof window !== "undefined" && window.history.state?.modal === "chat-widget") {
      isClosingViaHistoryRef.current = true
      window.history.back()
    }
  }

  const handleToggleLanguage = () => {
    const nextLang = chatLang === "en" ? "bn" : "en"
    setChatLang(nextLang)
  }

  const handleResetChat = () => {
    const freshContext = createInitialContext()
    const freshGreeting = getInitialGreeting(chatLang)
    setContext(freshContext)
    setMessages([freshGreeting])

    if (typeof window !== "undefined") {
      try {
        sessionStorage.removeItem(STORAGE_KEY_MESSAGES)
        sessionStorage.removeItem(STORAGE_KEY_CONTEXT)
      } catch (e) {
        console.warn("Could not clear session storage", e)
      }
    }
  }

  // Handle browser Back button / mobile swipe back gesture for chat widget
  useEffect(() => {
    const handlePopState = () => {
      if (isClosingViaHistoryRef.current) {
        isClosingViaHistoryRef.current = false
        return
      }
      if (isOpen) {
        setIsOpen(false)
      }
    }

    window.addEventListener("popstate", handlePopState)
    return () => window.removeEventListener("popstate", handlePopState)
  }, [isOpen])

  // Handle keyboard Escape and Backspace (outside input) to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return
      const target = e.target as HTMLElement | null
      const isInput = target && (target.tagName === "INPUT" || target.tagName === "TEXTAREA" || target.isContentEditable)

      if (e.key === "Escape" || (e.key === "Backspace" && !isInput)) {
        e.preventDefault()
        handleClose()
      }
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [isOpen])

  const handleSendMessage = useCallback(
    (text: string) => {
      const userMsg: ChatMessage = {
        id: `user-${Date.now()}`,
        sender: "user",
        text,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
      }

      setMessages((prev) => [...prev, userMsg])
      setIsSearching(true)

      // Conversational pacing delay
      setTimeout(() => {
        try {
          const { message: botMsg, updatedContext } = processUserQuery(text, chatLang, context)
          setMessages((prev) => [...prev, botMsg])
          setContext(updatedContext)
        } catch {
          const fallbackMsg: ChatMessage = {
            id: `err-${Date.now()}`,
            sender: "assistant",
            text:
              chatLang === "en"
                ? "I encountered an error retrieving data. Please chat with us directly on WhatsApp at 01518961899."
                : "তথ্য পেতে সাময়িক সমস্যা হয়েছে। সরাসরি আমাদের হোয়াটসঅ্যাপে (01518961899) যোগাযোগ করুন।",
            timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
            actions: [
              {
                label_en: "WhatsApp 01518961899",
                label_bn: "হোয়াটসঅ্যাপ: ০১৫১৮৯৬১৮৯৯",
                url: "https://wa.me/8801518961899",
                isExternal: true,
                type: "whatsapp"
              }
            ]
          }
          setMessages((prev) => [...prev, fallbackMsg])
        } finally {
          setIsSearching(false)
        }
      }, 300)
    },
    [chatLang, context]
  )

  const isEn = chatLang === "en"

  return (
    <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 flex flex-col items-end">
      {/* Chat Window Popup */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="w-[calc(100vw-32px)] sm:w-[400px] h-[550px] max-h-[82vh] bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl flex flex-col overflow-hidden mb-3.5 backdrop-blur-md"
            role="dialog"
            aria-label="Boosting Agency BD Smart Assistant"
          >
            <ChatHeader
              language={chatLang}
              onToggleLanguage={handleToggleLanguage}
              onResetChat={handleResetChat}
              onClose={handleClose}
            />

            <ChatMessages
              messages={messages}
              isSearching={isSearching}
              language={chatLang}
              onSelectQuestion={handleSendMessage}
            />

            <ChatInput
              onSendMessage={handleSendMessage}
              disabled={isSearching}
              language={chatLang}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating WhatsApp CTA Button - Placed directly above the Agent button */}
      <motion.a
        href="https://wa.me/8801518961899?text=Hello%20Boosting%20Agency%20BD%2C%20I%20want%20to%20know%20more%20about%20your%20services."
        target="_blank"
        rel="noopener noreferrer"
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        className="group relative flex items-center gap-2 mb-2.5 rounded-full bg-[#25D366] hover:bg-[#20ba5a] text-white shadow-xl shadow-emerald-500/30 border border-white/30 transition-all duration-300 focus:outline-hidden focus:ring-4 focus:ring-emerald-400/40 cursor-pointer select-none p-3 sm:px-4 sm:py-2.5"
        aria-label="Direct WhatsApp Message"
        title={isEn ? "Chat directly on WhatsApp (+880 1518 961899)" : "হোয়াটসঅ্যাপে সহজে মেসেজ পাঠান"}
      >
        <div className="relative flex items-center justify-center">
          <MessageCircle className="w-5 h-5 sm:w-4 sm:h-4 text-white fill-white/10 stroke-[2.2]" />
          <span className="absolute -top-1 -right-1 flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-90" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-white" />
          </span>
        </div>

        {/* Small icon on phone screen; expanded label on sm+ desktop */}
        <div className="hidden sm:flex flex-col items-start leading-tight">
          <span className="text-xs font-bold tracking-tight">
            {isEn ? "WhatsApp" : "হোয়াটসঅ্যাপ"}
          </span>
          <span className="text-[10px] text-emerald-100 font-medium">
            {isEn ? "Easy Message" : "সহজে মেসেজ"}
          </span>
        </div>

        {/* Tooltip on hover */}
        <span className="pointer-events-none absolute right-full mr-2.5 top-1/2 -translate-y-1/2 whitespace-nowrap rounded-lg bg-slate-900/90 dark:bg-black/90 text-white text-[11px] font-semibold px-2.5 py-1 shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 border border-white/10">
          {isEn ? "Chat on WhatsApp (+8801518961899)" : "হোয়াটসঅ্যাপে মেসেজ পাঠান"}
        </span>
      </motion.a>

      {/* Floating Trigger Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={isOpen ? handleClose : handleOpen}
        className="relative flex items-center gap-2 px-4 py-3 sm:px-4 sm:py-3.5 rounded-full bg-gradient-to-r from-blue-600 via-cyan-600 to-emerald-600 hover:from-blue-700 hover:to-emerald-700 text-white font-semibold text-sm shadow-xl shadow-cyan-500/25 border border-white/20 transition-all duration-300 focus:outline-hidden focus:ring-4 focus:ring-cyan-400/40 cursor-pointer select-none"
        aria-label={isOpen ? "Close Assistant" : "Open Boosting Agency BD Smart Assistant"}
      >
        <div className="relative">
          {isOpen ? (
            <X className="w-5 h-5 text-white" />
          ) : (
            <div className="flex items-center gap-1.5">
              <Bot className="w-5 h-5 text-white" />
              <span className="hidden sm:inline font-bold tracking-tight">
                {isEn ? "Ask Assistant" : "স্মার্ট সহকারী"}
              </span>
            </div>
          )}
        </div>

        {/* Pulse Dot Indicator */}
        {!isOpen && (
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-300 opacity-75" />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-400" />
          </span>
        )}

        {/* Unread indicator badge */}
        {!isOpen && unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 flex items-center justify-center min-w-5 h-5 px-1 bg-rose-500 text-white text-[10px] font-extrabold rounded-full border-2 border-white dark:border-slate-900 shadow-md">
            {unreadCount}
          </span>
        )}
      </motion.button>
    </div>
  )
}
