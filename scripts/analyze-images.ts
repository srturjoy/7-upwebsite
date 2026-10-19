import { GoogleGenAI } from "@google/genai";
import fs from "fs";
import path from "path";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

async function main() {
  const tempDir = path.join(process.cwd(), ".aistudio/artifacts/brain/91233349-1e1f-4d72-b56a-3580ccea2eef/.tempmediaStorage");
  if (!fs.existsSync(tempDir)) {
    console.log("Temp media storage not found");
    return;
  }
  const files = fs.readdirSync(tempDir).filter(f => f.endsWith(".webp"));
  console.log(`Analyzing ${files.length} images with Gemini...`);

  for (const file of files) {
    const filePath = path.join(tempDir, file);
    const b64 = Buffer.from(fs.readFileSync(filePath)).toString("base64");
    try {
      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: [
          {
            inlineData: {
              data: b64,
              mimeType: "image/webp"
            }
          },
          "Analyze this Meta Ads Manager screenshot and return JSON only with keys: objective ('message_leads' or 'website_purchases'), results (string), costPerResult (string), amountSpent (string), campaignName (string)."
        ]
      });
      console.log(`--- IMAGE: ${file} ---`);
      console.log(response.text);
    } catch (err) {
      console.error(`Error analyzing ${file}:`, err);
    }
  }
}

main();
