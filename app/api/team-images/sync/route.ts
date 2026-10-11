import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import sharp from "sharp";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { memberId, images } = body;

    if (!memberId || !Array.isArray(images) || images.length === 0) {
      return NextResponse.json(
        { error: "memberId and images array are required" },
        { status: 400 }
      );
    }

    // Clean memberId to prevent directory traversal
    const safeMemberId = memberId.replace(/[^a-zA-Z0-9_-]/g, "");
    const targetDir = path.resolve(process.cwd(), "public/images/team");

    if (!fs.existsSync(targetDir)) {
      fs.mkdirSync(targetDir, { recursive: true });
    }

    let saved = 0;

    for (let i = 0; i < images.length; i++) {
      const imgData = images[i];
      if (typeof imgData !== "string") continue;

      let buffer: Buffer | null = null;

      if (imgData.startsWith("data:image/")) {
        // Base64 data URL
        const base64Data = imgData.split(";base64,").pop();
        if (base64Data) {
          buffer = Buffer.from(base64Data, "base64");
        }
      } else if (imgData.startsWith("http://") || imgData.startsWith("https://")) {
        // External URL download
        try {
          const res = await fetch(imgData);
          const arrayBuf = await res.arrayBuffer();
          buffer = Buffer.from(arrayBuf);
        } catch {
          // ignore download error
        }
      }

      if (buffer) {
        const fileName = i === 0 ? `${safeMemberId}.webp` : `${safeMemberId}-${i}.webp`;
        const filePath = path.join(targetDir, fileName);

        // Convert and compress to pristine WebP
        await sharp(buffer)
          .webp({ quality: 90, effort: 4 })
          .toFile(filePath);

        saved++;
      }
    }

    return NextResponse.json({
      success: true,
      memberId: safeMemberId,
      savedCount: saved,
      message: `Successfully converted and saved ${saved} WebP images for ${safeMemberId}`,
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    console.error("Error in team-images sync:", message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
