export const runtime = 'nodejs'

import { NextRequest, NextResponse } from "next/server"
import fs from "fs"
import path from "path"
import crypto from "crypto"
import {
  updateCampaignScreenshot,
  deleteCampaignScreenshot,
  CampaignCategory,
} from "@/lib/campaign-storage"

const ALLOWED_MIME_TYPES = ["image/jpeg", "image/png", "image/webp", "image/gif"]
const MAX_FILE_SIZE = 15 * 1024 * 1024

export async function PUT(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params

  try {
    const contentType = req.headers.get("content-type") || ""

    if (contentType.includes("multipart/form-data")) {
      const formData = await req.formData()
      const updates: any = {}

      if (formData.has("title")) updates.title = (formData.get("title") as string)?.trim() || ""
      if (formData.has("category")) updates.category = formData.get("category") as CampaignCategory
      if (formData.has("description")) updates.description = (formData.get("description") as string)?.trim() || ""
      if (formData.has("clientName")) updates.clientName = (formData.get("clientName") as string)?.trim() || ""
      if (formData.has("industry")) updates.industry = (formData.get("industry") as string)?.trim() || ""
      if (formData.has("timeframe")) updates.timeframe = (formData.get("timeframe") as string)?.trim() || ""

      const replacementFile = formData.get("file")
      if (replacementFile instanceof File && replacementFile.size > 0) {
        if (!ALLOWED_MIME_TYPES.includes(replacementFile.type)) {
          return NextResponse.json({ success: false, error: "Invalid image format." }, { status: 400 })
        }
        if (replacementFile.size > MAX_FILE_SIZE) {
          return NextResponse.json({ success: false, error: "Image exceeds 15MB limit." }, { status: 400 })
        }

        const uploadDir = path.join(process.cwd(), "public", "campaigns", "uploads")
        if (!fs.existsSync(uploadDir)) {
          fs.mkdirSync(uploadDir, { recursive: true })
        }

        const buffer = Buffer.from(await replacementFile.arrayBuffer())
        const ext = path.extname(replacementFile.name) || ".png"
        const randomHash = crypto.randomBytes(4).toString("hex")
        const safeFilename = `meta-ads-${Date.now()}-${randomHash}${ext}`
        const destinationPath = path.join(uploadDir, safeFilename)

        await fs.promises.writeFile(destinationPath, buffer)
        updates.screenshotUrl = `/campaigns/uploads/${safeFilename}`
        updates.fileInfo = {
          originalName: replacementFile.name,
          fileSize: replacementFile.size,
          mimeType: replacementFile.type,
          uploadedAt: new Date().toISOString(),
        }
      }

      const updated = await updateCampaignScreenshot(id, updates)
      if (!updated) {
        return NextResponse.json({ success: false, error: "Campaign screenshot not found." }, { status: 404 })
      }

      return NextResponse.json({ success: true, campaign: updated })
    } else {
      const body = await req.json().catch(() => ({}))
      const updated = await updateCampaignScreenshot(id, body)
      if (!updated) {
        return NextResponse.json({ success: false, error: "Campaign screenshot not found." }, { status: 404 })
      }
      return NextResponse.json({ success: true, campaign: updated })
    }
  } catch (error: any) {
    console.error("Error updating campaign screenshot:", error)
    return NextResponse.json(
      { success: false, error: error.message || "Failed to update campaign screenshot." },
      { status: 500 }
    )
  }
}

export async function DELETE(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params

  try {
    const success = await deleteCampaignScreenshot(id)
    if (!success) {
      return NextResponse.json({ success: false, error: "Campaign screenshot not found." }, { status: 404 })
    }

    return NextResponse.json({ success: true, message: "Campaign screenshot deleted successfully." })
  } catch (error: any) {
    console.error("Error deleting campaign screenshot:", error)
    return NextResponse.json(
      { success: false, error: error.message || "Failed to delete campaign screenshot." },
      { status: 500 }
    )
  }
}
