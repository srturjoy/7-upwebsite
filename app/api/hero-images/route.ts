import { NextResponse } from "next/server"

export const dynamic = "force-static"

const HERO_IMAGES = [
  "/hero/hero-slide-1.png",
  "/hero/hero-slide-2.png",
  "/hero/hero-slide-3.png",
  "/hero/hero-slide-4.png",
  "/hero/hero-slide-5.png",
]

export async function GET() {
  return NextResponse.json({
    customImages: HERO_IMAGES,
    updatedAt: "2026-10-10T10:41:00.000Z",
  })
}
