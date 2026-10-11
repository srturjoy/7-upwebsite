import fs from "fs";
import path from "path";

const requiredAssets = [
  "public/favicon.ico",
  "public/icon.png",
  "public/logo.png",
  "public/hero/hero-slide-1.png",
  "public/hero/hero-slide-2.png",
  "public/hero/hero-slide-3.png",
  "public/hero/hero-slide-4.png",
  "public/hero/hero-slide-5.png",
  "public/site-knowledge.json"
];

let allPassed = true;
for (const relPath of requiredAssets) {
  if (fs.existsSync(relPath)) {
    console.log(`✅ [ASSET OK] ${relPath}`);
  } else {
    console.error(`❌ [ASSET MISSING] ${relPath}`);
    allPassed = false;
  }
}

if (!allPassed) {
  process.exit(1);
}
console.log("All critical assets verified successfully.");
