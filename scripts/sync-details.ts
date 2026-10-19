import fs from "fs";
import path from "path";

const dataPath = path.join(process.cwd(), "data/campaign-screenshots.json");
const detailsPath = path.join(process.cwd(), "data/scanned-campaign-details.json");

const data = JSON.parse(fs.readFileSync(dataPath, "utf-8"));
const details: Record<string, any> = {};

data.forEach(item => {
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
console.log("Synced scanned-campaign-details.json with campaign-screenshots.json!");
