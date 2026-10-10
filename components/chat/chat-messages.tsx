"use client"

import { useEffect, useRef } from "react"
import { ChatMessage } from "@/lib/faq-engine/types"
import { MessageCircle, Phone, ExternalLink, Bot, User } from "lucide-react"

interface ChatMessagesProps {
  messages: ChatMessage[]
  isSearching: boolean
  language: "en" | "bn"
  onSelectQuestion: (question: string) => void
}

export function ChatMessages({
  messages,
  isSearching,
  language,
  onSelectQuestion
}: ChatMessagesProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const isEn = language === "en"

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages, isSearching])

  const renderFormattedText = (rawText: string) => {
    // Split into paragraphs/lines
    const lines = rawText.split("\n")
    return lines.map((line, idx) => {
      if (!line.trim()) {
        return <div key={idx} className="h-2" />
      }

      // Format bold text **text** and italic _text_
      const parts = line.split(/(\*\*.*?\*\*|_.*?_)/g)
      return (
        <p key={idx} className="leading-relaxed">
          {parts.map((part, pIdx) => {
            if (part.startsWith("**") && part.endsWith("**")) {
              return (
                <strong key={pIdx} className="font-semibold text-foreground dark:text-white">
                  {part.slice(2, -2)}
                </strong>
              )
            }
            if (part.startsWith("_") && part.endsWith("_")) {
              return (
                <em key={pIdx} className="italic text-muted-foreground text-xs">
                  {part.slice(1, -1)}
                </em>
              )
            }
            return <span key={pIdx}>{part}</span>
          })}
        </p>
      )
    })
  }

  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-4 text-sm font-sans bg-slate-50/50 dark:bg-slate-950/40">
      {messages.map((msg) => {
        const isUser = msg.sender === "user"

        return (
          <div
            key={msg.id}
            className={`flex flex-col ${isUser ? "items-end" : "items-start"} space-y-1.5`}
          >
            <div className="flex items-start gap-2 max-w-[88%]">
              {!isUser && (
                <div className="flex-shrink-0 w-7 h-7 rounded-lg bg-blue-600/10 dark:bg-blue-500/20 text-blue-600 dark:text-cyan-400 flex items-center justify-center mt-1 border border-blue-500/20">
                  <Bot className="w-4 h-4" />
                </div>
              )}

              <div
                className={`p-3.5 rounded-2xl shadow-sm text-sm transition-all ${
                  isUser
                    ? "bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-br-xs"
                    : "bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-700/80 text-slate-900 dark:text-slate-100 rounded-bl-xs"
                }`}
              >
                <div className="space-y-1">{renderFormattedText(msg.text)}</div>

                {/* Interactive Action Buttons */}
                {msg.actions && msg.actions.length > 0 && (
                  <div className="mt-3 pt-2.5 border-t border-slate-100 dark:border-slate-800/80 flex flex-wrap gap-2">
                    {msg.actions.map((act, aIdx) => {
                      const label = isEn ? act.label_en : act.label_bn
                      const isWhatsApp = act.type === "whatsapp"

                      return (
                        <a
                          key={aIdx}
                          href={act.url}
                          target={act.isExternal ? "_blank" : undefined}
                          rel={act.isExternal ? "noopener noreferrer" : undefined}
                          className={`inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-xl transition-all shadow-xs ${
                            isWhatsApp
                              ? "bg-emerald-600 hover:bg-emerald-700 text-white shadow-emerald-500/20"
                              : "bg-blue-600/10 hover:bg-blue-600/20 text-blue-700 dark:text-cyan-300 dark:bg-cyan-500/10 dark:hover:bg-cyan-500/20 border border-blue-200 dark:border-cyan-500/20"
                          }`}
                        >
                          {isWhatsApp && <MessageCircle className="w-3.5 h-3.5" />}
                          {act.type === "phone" && <Phone className="w-3.5 h-3.5" />}
                          {act.type === "service" && <ExternalLink className="w-3.5 h-3.5" />}
                          <span>{label}</span>
                        </a>
                      )
                    })}
                  </div>
                )}
              </div>

              {isUser && (
                <div className="flex-shrink-0 w-7 h-7 rounded-lg bg-blue-600 text-white flex items-center justify-center mt-1">
                  <User className="w-4 h-4" />
                </div>
              )}
            </div>

            {/* Message Meta Info: Timestamp */}
            <div className="flex items-center gap-2 px-1 text-[11px] text-muted-foreground">
              <span>{msg.timestamp}</span>
            </div>

            {/* Suggested Question Chips (only on recent assistant messages) */}
            {msg.suggestedQuestions && msg.suggestedQuestions.length > 0 && (
              <div className="pt-1.5 flex flex-wrap gap-1.5 max-w-[95%]">
                {msg.suggestedQuestions.map((chip, cIdx) => {
                  const chipText = isEn ? chip.en : chip.bn
                  return (
                    <button
                      key={cIdx}
                      type="button"
                      onClick={() => onSelectQuestion(chipText)}
                      className="text-xs bg-white/90 dark:bg-slate-800/90 hover:bg-blue-50 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 px-2.5 py-1 rounded-full transition-all text-left shadow-2xs hover:border-cyan-500/50 hover:text-blue-600 dark:hover:text-cyan-300 cursor-pointer font-medium"
                    >
                      {chipText}
                    </button>
                  )
                })}
              </div>
            )}
          </div>
        )
      })}

      {/* Typing / Searching indicator */}
      {isSearching && (
        <div className="flex items-center gap-2 text-muted-foreground">
          <div className="flex-shrink-0 w-7 h-7 rounded-lg bg-blue-600/10 dark:bg-blue-500/20 text-blue-600 dark:text-cyan-400 flex items-center justify-center border border-blue-500/20">
            <Bot className="w-4 h-4" />
          </div>
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 px-3.5 py-2.5 rounded-2xl rounded-bl-xs flex items-center gap-1.5 shadow-2xs">
            <span className="w-2 h-2 rounded-full bg-cyan-500 animate-bounce" style={{ animationDelay: "0ms" }} />
            <span className="w-2 h-2 rounded-full bg-blue-500 animate-bounce" style={{ animationDelay: "150ms" }} />
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-bounce" style={{ animationDelay: "300ms" }} />
            <span className="text-xs ml-1 text-slate-500">
              {isEn ? "Searching knowledge base..." : "তথ্য খোঁজা হচ্ছে..."}
            </span>
          </div>
        </div>
      )}

      <div ref={messagesEndRef} />
    </div>
  )
}
