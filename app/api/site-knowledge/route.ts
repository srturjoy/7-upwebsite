import { NextResponse } from "next/server"
import siteKnowledgeData from "@/public/site-knowledge.json"

export const dynamic = "force-static"

export async function GET() {
  return NextResponse.json(siteKnowledgeData, {
    status: 200,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": "public, s-maxage=86400, stale-while-revalidate=43200",
      "Access-Control-Allow-Origin": "*",
      "X-Robots-Tag": "all",
    },
  })
}
