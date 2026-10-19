import { NextRequest, NextResponse } from "next/server"
import { getAllCampaignScreenshots } from "@/lib/campaign-storage"

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const category = searchParams.get("category")

    let items = await getAllCampaignScreenshots()

    if (category && category !== "all") {
      items = items.filter((item) => item.category === category)
    }

    return NextResponse.json({
      success: true,
      campaigns: items,
      total: items.length,
    })
  } catch (error: any) {
    console.error("Error fetching campaigns:", error)
    return NextResponse.json(
      { success: false, error: error.message || "Failed to load campaign screenshots" },
      { status: 500 }
    )
  }
}
