"use client"

import { useState, useRef, useEffect } from "react"
import { Send, CornerDownLeft } from "lucide-react"
import { Button } from "@/components/ui/button"

interface ChatInputProps {
  onSendMessage: (text: string) => void
  disabled?: boolean
  language: "en" | "bn"
}

export function ChatInput({ onSendMessage, disabled, language }: ChatInputProps) {
  const [input, setInput] = useState("")
  const inputRef = useRef<HTMLInputElement>(null)
  const isEn = language === "en"

  useEffect(() => {
    // Keep focus for rapid questions
    if (!disabled) {
      inputRef.current?.focus()
    }
  }, [disabled])

  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault()
    const trimmed = input.trim()
    if (!trimmed || disabled) return
    onSendMessage(trimmed)
    setInput("")
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSubmit()
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="p-3 bg-white dark:bg-slate-900 border-t border-slate-200/80 dark:border-slate-800 rounded-b-2xl"
    >
      <div className="relative flex items-center gap-2">
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={disabled}
          placeholder={
            isEn
              ? "Ask about boosting, pricing, CAPI, office..."
              : "বুস্টিং, প্যাকেজ খরচ, CAPI বা অফিস সম্পর্কে লিখুন..."
          }
          className="w-full bg-slate-100/80 dark:bg-slate-800/80 text-foreground dark:text-slate-100 placeholder:text-muted-foreground dark:placeholder:text-slate-400 text-sm rounded-xl px-3.5 py-2.5 pr-10 focus:outline-hidden focus:ring-2 focus:ring-cyan-500/50 border border-slate-200/80 dark:border-slate-700/80 transition-all"
        />

        <Button
          type="submit"
          size="icon"
          disabled={!input.trim() || disabled}
          className="h-9 w-9 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white shadow-sm flex-shrink-0 disabled:opacity-40 transition-all"
          title={isEn ? "Send message (Enter)" : "বার্তা পাঠান (Enter)"}
          aria-label="Send message"
        >
          <Send className="w-4 h-4" />
        </Button>
      </div>

      <div className="flex items-center justify-between mt-1.5 px-1 text-[11px] text-slate-500 dark:text-slate-400">
        <span>
          {isEn ? "Press Enter to send" : "পাঠাতে Enter চাপুন"}
        </span>
        <span className="flex items-center gap-1 text-[10px] text-slate-500 dark:text-slate-400">
          <CornerDownLeft className="w-2.5 h-2.5" />
          Zero-API Local Retrieval
        </span>
      </div>
    </form>
  )
}
