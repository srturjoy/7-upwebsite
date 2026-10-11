/**
 * Server-Side Gemini API Proxy Interface
 * Enforces process.env.GEMINI_API_KEY server confidentiality
 */

export interface GeminiContentRequest {
  prompt: string
  model?: string
  systemInstruction?: string
}
