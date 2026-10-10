"use client"

import { Bot, X, Globe, Sparkles, RotateCcw, MessageCircle } from "lucide-react"
import { Button } from "@/components/ui/button"

interface ChatHeaderProps {
  language: "en" | "bn"
  onToggleLanguage: () => void
  onResetChat?: () => void
  onClose: () => void
}

export function ChatHeader({
  language,
  onToggleLanguage,
  onResetChat,
  onClose
}: ChatHeaderProps) {
  const isEn = language === "en"

  return (
    <div className="flex flex-col bg-gradient-to-r from-blue-700 via-cyan-600 to-emerald-600 text-white rounded-t-2xl shadow-md select-none">
      <div className="flex items-center justify-between px-4 py-3">
        <div className="flex items-center gap-2.5">
          <div className="relative flex items-center justify-center w-9 h-9 rounded-xl bg-white/20 backdrop-blur-md shadow-inner text-white">
            <Bot className="w-5 h-5 text-white" />
            <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-emerald-400 border-2 border-blue-900 rounded-full" />
          </div>
          <div className="leading-tight">
            <div className="flex items-center gap-1.5 font-bold text-sm text-white">
              <span>Boosting Agency BD</span>
              <span className="inline-flex items-center gap-0.5 text-[10px] bg-white/20 px-1.5 py-0.5 rounded-full font-medium">
                <Sparkles className="w-2.5 h-2.5 text-cyan-200" />
                Smart FAQ
              </span>
            </div>
            <p className="text-[11px] text-blue-100 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-300 animate-pulse inline-block" />
              {isEn ? "Automated FAQ Assistant • 24/7" : "স্বয়ংক্রিয় স্মার্ট সহায়ক • ২৪/৭"}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1">
          {/* New / Reset Conversation */}
          {onResetChat && (
            <Button
              variant="ghost"
              size="icon"
              onClick={onResetChat}
              className="h-8 w-8 text-white/90 hover:text-white hover:bg-white/15 rounded-lg transition-colors cursor-pointer"
              title={isEn ? "Start new chat" : "নতুন আলোচনা শুরু করুন"}
              aria-label="Start new conversation"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </Button>
          )}

          {/* Direct WhatsApp Action */}
          <a
            href="https://wa.me/8801518961899?text=Hello%20Boosting%20Agency%20BD%2C%20I%20want%20to%20chat%20with%20an%20agent."
            target="_blank"
            rel="noopener noreferrer"
            className="h-8 px-2 text-xs font-semibold bg-emerald-500/25 hover:bg-emerald-500/40 text-white rounded-lg flex items-center gap-1 transition-colors cursor-pointer border border-emerald-400/40 shadow-xs"
            title={isEn ? "Chat directly on WhatsApp (+880 1518 961899)" : "সরাসরি হোয়াটসঅ্যাপে কথা বলুন"}
            aria-label="Direct WhatsApp Chat"
          >
            <MessageCircle className="w-3.5 h-3.5 text-emerald-200 fill-emerald-400/30" />
            <span className="hidden sm:inline">WhatsApp</span>
          </a>

          {/* Language Toggle */}
          <Button
            variant="ghost"
            size="sm"
            onClick={onToggleLanguage}
            className="h-8 px-2 text-xs font-semibold text-white/90 hover:text-white hover:bg-white/15 rounded-lg flex items-center gap-1 transition-colors cursor-pointer"
            title={isEn ? "Switch to বাংলা" : "Switch to English"}
            aria-label="Toggle language"
          >
            <Globe className="w-3.5 h-3.5" />
            <span>{isEn ? "বাংলা" : "EN"}</span>
          </Button>

          {/* Close Button */}
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="h-8 w-8 text-white/90 hover:text-white hover:bg-white/15 rounded-lg transition-colors cursor-pointer"
            title={isEn ? "Close assistant" : "বন্ধ করুন"}
            aria-label="Close chat"
          >
            <X className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}
