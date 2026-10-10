import { MetadataRoute } from "next"

export const dynamic = "force-static"

export default function robots(): MetadataRoute.Robots {
  const baseUrl = "https://boostingagencyofficial.site"

  return {
    rules: [
      {
        userAgent: [
          "Googlebot",
          "Googlebot-Image",
          "Googlebot-News",
          "Google-Extended",
          "GPTBot",
          "ChatGPT-User",
          "ClaudeBot",
          "anthropic-ai",
          "PerplexityBot",
          "Applebot",
          "Applebot-Extended",
          "Bingbot",
          "CCBot",
          "cohere-ai",
          "*",
        ],
        allow: [
          "/",
          "/favicon.ico",
          "/favicon-*.png",
          "/logo.png",
          "/icon.png",
          "/apple-icon.png",
          "/site.webmanifest",
          "/site-knowledge.json",
          "/site-summary.json",
          "/llms.txt",
          "/llms-full.txt",
          "/sitemap.xml",
          "/api/site-knowledge",
          "/api/hero-images",
        ],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  }
}
