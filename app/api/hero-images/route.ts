import { NextRequest, NextResponse } from "next/server"
import fs from "fs/promises"
import path from "path"

const HERO_DIR = path.join(process.cwd(), "public", "hero")
const MANIFEST_PATH = path.join(HERO_DIR, "manifest.json")

export async function GET() {
  try {
    const exists = await fs.stat(MANIFEST_PATH).then(() => true).catch(() => false)
    if (!exists) {
      return NextResponse.json({ customImages: [] })
    }
    const content = await fs.readFile(MANIFEST_PATH, "utf-8")
    const manifest = JSON.parse(content)
    return NextResponse.json({ customImages: manifest.images || [] })
  } catch {
    return NextResponse.json({ customImages: [] })
  }
}

export async function POST(req: NextRequest) {
  try {
    await fs.mkdir(HERO_DIR, { recursive: true })
    const contentType = req.headers.get("content-type") || ""
    const savedUrls: string[] = []

    if (contentType.includes("multipart/form-data")) {
      const formData = await req.formData()
      const files = formData.getAll("images") as File[]
      
      for (let i = 0; i < files.length && i < 10; i++) {
        const file = files[i]
        if (!file || typeof file === "string") continue
        
        const bytes = await file.arrayBuffer()
        const buffer = Buffer.from(bytes)
        
        let ext = "webp"
        if (file.type === "image/png") ext = "png"
        else if (file.type === "image/jpeg" || file.type === "image/jpg") ext = "jpg"
        else if (file.type === "image/webp") ext = "webp"
        
        const fileName = `hero-custom-${Date.now()}-${i + 1}.${ext}`
        const filePath = path.join(HERO_DIR, fileName)
        await fs.writeFile(filePath, buffer)
        savedUrls.push(`/hero/${fileName}`)
      }
    } else {
      const body = await req.json()
      const { images } = body
      if (!Array.isArray(images) || images.length === 0) {
        return NextResponse.json({ error: "Invalid images array" }, { status: 400 })
      }

      for (let i = 0; i < images.length && i < 10; i++) {
        const dataUrl = images[i]
        if (typeof dataUrl !== "string") continue

        const matches = dataUrl.match(/^data:image\/([a-zA-Z0-9+]+);base64,(.+)$/)
        if (matches) {
          const buffer = Buffer.from(matches[2], "base64")
          const fileName = `hero-custom-${Date.now()}-${i + 1}.webp`
          const filePath = path.join(HERO_DIR, fileName)
          await fs.writeFile(filePath, buffer)
          savedUrls.push(`/hero/${fileName}`)
        } else if (dataUrl.startsWith("http") || dataUrl.startsWith("/")) {
          savedUrls.push(dataUrl)
        }
      }
    }

    if (savedUrls.length === 0) {
      return NextResponse.json({ error: "No valid images processed" }, { status: 400 })
    }

    await fs.writeFile(
      MANIFEST_PATH,
      JSON.stringify({ images: savedUrls, updatedAt: new Date().toISOString() }, null, 2)
    )

    return NextResponse.json({ success: true, images: savedUrls })
  } catch (err: any) {
    console.error("Failed to save hero images:", err)
    return NextResponse.json({ error: err.message || "Failed to save images" }, { status: 500 })
  }
}

export async function DELETE() {
  try {
    const exists = await fs.stat(MANIFEST_PATH).then(() => true).catch(() => false)
    if (exists) {
      await fs.unlink(MANIFEST_PATH).catch(() => {})
    }

    // Only clean up custom uploaded files, preserving default slide-*.webp and demo-*.jpg
    const files = await fs.readdir(HERO_DIR).catch(() => [] as string[])
    for (const file of files) {
      if (file.startsWith("hero-custom-") || file.startsWith("slide-custom-")) {
        await fs.unlink(path.join(HERO_DIR, file)).catch(() => {})
      }
    }

    return NextResponse.json({ success: true, message: "Demo images restored" })
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
