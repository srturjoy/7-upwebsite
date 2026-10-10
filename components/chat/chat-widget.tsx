"use client"

import { useState, useEffect, useCallback, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, Bot } from "lucide-react"
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

  // Clear unread badge when opened
  const handleOpen = () => {
    setIsOpen(true)
    setUnreadCount(0)
  }

  const handleClose = () => {
    setIsOpen(false)
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

  // Handle keyboard Escape to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
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
