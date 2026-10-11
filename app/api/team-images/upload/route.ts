import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const memberId = formData.get("memberId") as string;
    const file = formData.get("file") as File;

    if (!memberId || !file) {
      return NextResponse.json({ success: false, error: "Missing memberId or file" }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const ext = path.extname(file.name) || ".webp";
    const filename = `${memberId}${ext}`;
    const uploadDir = path.join(process.cwd(), "public", "images", "team");

    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    const filepath = path.join(uploadDir, filename);
    fs.writeFileSync(filepath, buffer);

    const publicUrl = `/images/team/${filename}`;
    return NextResponse.json({ success: true, url: publicUrl });
  } catch (error: any) {
    console.error("Team image upload error:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
