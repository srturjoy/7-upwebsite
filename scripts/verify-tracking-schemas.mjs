import fs from "fs";

const schemaPath = "tracking/conversion-api/event-payload-schema.json";
if (fs.existsSync(schemaPath)) {
  const content = JSON.parse(fs.readFileSync(schemaPath, "utf-8"));
  if (content.required && content.required.includes("event_name")) {
    console.log("✅ [TRACKING SCHEMA OK] CAPI schema is valid.");
  } else {
    console.error("❌ [TRACKING SCHEMA ERROR] Invalid schema.");
    process.exit(1);
  }
}
