export const runtime = 'nodejs'

import { NextRequest, NextResponse } from "next/server"
import fs from "fs"
import path from "path"
import crypto from "crypto"
import sharp from "sharp"
import { addCampaignScreenshot, CampaignCategory, StoredCampaignScreenshot } from "@/lib/campaign-storage"

const MAX_FILE_SIZE = 30 * 1024 * 1024

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData()
    
    const files: File[] = []
    const filesList = formData.getAll("files")
    if (filesList.length > 0) {
      filesList.forEach((f) => {
        if (f instanceof File && f.size > 0) files.push(f)
      })
    }
    const singleFile = formData.get("file")
    if (singleFile instanceof File && singleFile.size > 0 && !files.includes(singleFile)) {
      files.push(singleFile)
    }

    if (files.length === 0) {
      return NextResponse.json(
        { success: false, error: "No screenshot file was provided for upload." },
        { status: 400 }
      )
    }

    const category = (formData.get("category") as CampaignCategory) || "message_leads"
    const title = (formData.get("title") as string)?.trim() || ""

    const uploadDir = path.join(process.cwd(), "public", "campaigns", "uploads")
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true })
    }

    const createdItems: StoredCampaignScreenshot[] = []

    for (let i = 0; i < files.length; i++) {
      const file = files[i]

      if (file.size > MAX_FILE_SIZE) {
        return NextResponse.json(
          {
            success: false,
            error: `File "${file.name}" exceeds the 30MB size limit (${(file.size / (1024 * 1024)).toFixed(1)}MB).`,
          },
          { status: 400 }
        )
      }

      const rawBuffer = Buffer.from(await file.arrayBuffer())

      let webpBuffer: Buffer
      try {
        webpBuffer = await sharp(rawBuffer)
          .webp({
            quality: 92,
            effort: 4,
            lossless: false,
          })
          .toBuffer()
      } catch (convErr) {
        console.warn(`Sharp conversion note for ${file.name}:`, convErr)
        webpBuffer = rawBuffer
      }

      const randomHash = crypto.randomBytes(4).toString("hex")
      const safeFilename = `meta-ads-${Date.now()}-${i + 1}-${randomHash}.webp`
      const destinationPath = path.join(uploadDir, safeFilename)

      await fs.promises.writeFile(destinationPath, webpBuffer)

      const publicUrl = `/campaigns/uploads/${safeFilename}`

      const itemTitle = files.length > 1 && title
        ? `${title} (#${i + 1})`
        : (title || file.name.replace(/\.[^/.]+$/, ""))

      const saved = await addCampaignScreenshot({
        title: itemTitle,
        category,
        screenshotUrl: publicUrl,
        verifiedBadge: true,
        fileInfo: {
          originalName: file.name,
          fileSize: webpBuffer.length,
          mimeType: "image/webp",
          uploadedAt: new Date().toISOString(),
        },
      })

      createdItems.push(saved)
    }

    return NextResponse.json({
      success: true,
      message: `Successfully uploaded and converted ${createdItems.length} screenshot(s) to WebP.`,
      items: createdItems,
      totalUploaded: createdItems.length,
    })
  } catch (error: any) {
    console.error("Bulk campaign upload error:", error)
    return NextResponse.json(
      { success: false, error: error.message || "Failed to process screenshot upload." },
      { status: 500 }
    )
  }
}
