import fs from "fs";
import path from "path";

const dataPath = path.join(process.cwd(), "data/campaign-screenshots.json");
const data = JSON.parse(fs.readFileSync(dataPath, "utf-8"));

let messageCount = 0;
let purchaseCount = 0;

data.forEach((item, index) => {
  if (item.category === "message_leads") {
    messageCount++;
  } else if (item.category === "website_purchases") {
    purchaseCount++;
  }
});

console.log(`Total: ${data.length}, Message Leads: ${messageCount}, Website Purchases: ${purchaseCount}`);
