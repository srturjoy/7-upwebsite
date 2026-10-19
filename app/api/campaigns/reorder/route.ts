import { NextRequest, NextResponse } from "next/server"
import { reorderCampaignScreenshots } from "@/lib/campaign-storage"

export async function POST(req: NextRequest) {

  try {
    const body = await req.json().catch(() => ({}))
    const { orderedIds } = body

    if (!Array.isArray(orderedIds)) {
      return NextResponse.json(
        { success: false, error: "orderedIds must be an array of IDs." },
        { status: 400 }
      )
    }

    const reordered = await reorderCampaignScreenshots(orderedIds)

    return NextResponse.json({
      success: true,
      message: "Screenshots reordered successfully.",
      campaigns: reordered,
    })
  } catch (error: any) {
    console.error("Error reordering screenshots:", error)
    return NextResponse.json(
      { success: false, error: error.message || "Failed to reorder screenshots." },
      { status: 500 }
    )
  }
}
