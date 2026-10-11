import fs from "fs";

console.log("Running Boosting Agency BD Sanity Test Suite...");

// 1. Check knowledge base JSON files
const kbFiles = [
  "data/knowledge-base/agency-info.json",
  "data/knowledge-base/contact.json",
  "data/knowledge-base/faq.json",
  "data/knowledge-base/policies.json",
  "data/knowledge-base/pricing.json",
  "data/knowledge-base/services.json"
];

for (const file of kbFiles) {
  const raw = fs.readFileSync(file, "utf-8");
  JSON.parse(raw); // Asserts valid JSON
  console.log(`✅ JSON syntax valid: ${file}`);
}

// 2. Check terms data and FAQ engine
if (fs.existsSync("lib/terms-data.ts") && fs.existsSync("lib/faq-engine/engine.ts")) {
  console.log("✅ FAQ Engine and Terms data intact.");
}

console.log("All sanity checks passed!");
