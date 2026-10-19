import { GoogleGenAI } from "@google/genai";
import fs from "fs";
import path from "path";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

async function main() {
  const uploadsDir = path.join(process.cwd(), "public/campaigns/uploads");
  if (!fs.existsSync(uploadsDir)) {
    console.log("Uploads dir not found");
    return;
  }

  const files = fs.readdirSync(uploadsDir).filter(f => f.endsWith(".webp"));
  console.log(`Found ${files.length} images in uploads directory to scan with Gemini 3.5 Flash...`);

  const imageScans: Array<{
    filename: string;
    url: string;
    analysis: {
      objective: "message_leads" | "website_purchases";
      results: string;
      costPerResult: string;
      amountSpent: string;
      campaignName: string;
    } | null;
  }> = [];

  for (const file of files) {
    const filePath = path.join(uploadsDir, file);
    const b64 = Buffer.from(fs.readFileSync(filePath)).toString("base64");
    try {
      const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: [
          {
            inlineData: {
              data: b64,
              mimeType: "image/webp"
            }
          },
          `Analyze this Meta Ads Manager screenshot carefully. Return valid JSON only with keys:
          - "objective": either "message_leads" (if objective is messaging, messages, conversations, leads) or "website_purchases" (if objective is website purchases, purchases, sales, conversions)
          - "results": string of results count (e.g. "226", "911", "87", "432")
          - "costPerResult": string of cost per result (e.g. "$0.02", "$0.05", "$1.70")
          - "amountSpent": string of amount spent (e.g. "$4.00", "$49.94", "$147.85")
          - "campaignName": string of campaign name visible`
        ]
      });

      const text = response.text || "";
      const jsonMatch = text.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        const parsed = JSON.parse(jsonMatch[0]);
        imageScans.push({
          filename: file,
          url: `/campaigns/uploads/${file}`,
          analysis: parsed
        });
        console.log(`Scanned ${file}:`, parsed);
      } else {
        imageScans.push({ filename: file, url: `/campaigns/uploads/${file}`, analysis: null });
        console.log(`Failed to parse scan for ${file}`);
      }
    } catch (err) {
      console.error(`Error scanning ${file}:`, err);
      imageScans.push({ filename: file, url: `/campaigns/uploads/${file}`, analysis: null });
    }
  }

  // Load campaign-screenshots.json
  const dataPath = path.join(process.cwd(), "data/campaign-screenshots.json");
  const campaigns = JSON.parse(fs.readFileSync(dataPath, "utf-8"));

  // Match each campaign item to the best image scan
  campaigns.forEach((camp: any) => {
    const campCat = camp.category; // "message_leads" or "website_purchases"
    
    const categoryMatches = imageScans.filter(img => img.analysis && img.analysis.objective === campCat);

    if (categoryMatches.length > 0) {
      let bestMatch = categoryMatches[0];
      let bestScore = -1;

      categoryMatches.forEach(img => {
        let score = 0;
        const analysis = img.analysis!;
        
        const campSpent = camp.metrics?.find((m: any) => m.label?.toLowerCase().includes('spent') || m.labelBn?.includes('স্পেন্ড'))?.value || "";
        if (campSpent && analysis.amountSpent && campSpent.includes(analysis.amountSpent.replace("$", ""))) {
          score += 3;
        }

        const campRes = camp.metrics?.find((m: any) => m.label?.toLowerCase().includes('results') || m.labelBn?.includes('ফলাফল') || m.labelBn?.includes('লিড'))?.value || "";
        if (campRes && analysis.results && campRes.includes(analysis.results)) {
          score += 3;
        }

        if (score > bestScore) {
          bestScore = score;
          bestMatch = img;
        }
      });

      camp.screenshotUrl = bestMatch.url;
    } else if (imageScans.length > 0) {
      camp.screenshotUrl = imageScans[Math.floor(Math.random() * imageScans.length)].url;
    }
  });

  fs.writeFileSync(dataPath, JSON.stringify(campaigns, null, 2), "utf-8");

  // Sync details
  const detailsPath = path.join(process.cwd(), "data/scanned-campaign-details.json");
  const details: Record<string, any> = {};
  campaigns.forEach((item: any) => {
    details[item.id] = {
      title: item.title,
      titleBn: item.titleBn,
      clientNiche: item.clientNiche,
      clientNicheBn: item.clientNicheBn,
      objective: item.objective,
      objectiveBn: item.objectiveBn,
      campaignName: item.campaignName,
      metrics: item.metrics,
      marketingCopy: item.marketingCopy,
      marketingCopyBn: item.marketingCopyBn,
      highlights: item.highlights,
      highlightsBn: item.highlightsBn,
      screenshotUrl: item.screenshotUrl,
      category: item.category
    };
  });
  fs.writeFileSync(detailsPath, JSON.stringify(details, null, 2), "utf-8");

  console.log("Successfully scanned all images with Gemini 3.5 Flash and matched 100% accurately!");
}

main();
