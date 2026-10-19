import fs from "fs";
import path from "path";

const dataPath = path.join(process.cwd(), "data/campaign-screenshots.json");
const data = JSON.parse(fs.readFileSync(dataPath, "utf-8"));

const uploadsDir = path.join(process.cwd(), "public/campaigns/uploads");
const allFiles = fs.readdirSync(uploadsDir).filter(f => f.endsWith(".webp"));

const messageFiles = allFiles.filter(f => !f.startsWith("media_"));
const purchaseFiles = allFiles.filter(f => f.startsWith("media_"));

console.log(`Available message screenshots: ${messageFiles.length}`);
console.log(`Available purchase screenshots: ${purchaseFiles.length}`);

let msgIdx = 0;
let purIdx = 0;

data.forEach((item, index) => {
  if (item.category === "message_leads") {
    if (messageFiles.length > 0) {
      const file = messageFiles[msgIdx % messageFiles.length];
      item.screenshotUrl = `/campaigns/uploads/${file}`;
      msgIdx++;
    }
  } else if (item.category === "website_purchases") {
    if (purchaseFiles.length > 0) {
      const file = purchaseFiles[purIdx % purchaseFiles.length];
      item.screenshotUrl = `/campaigns/uploads/${file}`;
      purIdx++;
    }
  }
});

fs.writeFileSync(dataPath, JSON.stringify(data, null, 2), "utf-8");
console.log("Updated campaign-screenshots.json with strict category alignment!");
