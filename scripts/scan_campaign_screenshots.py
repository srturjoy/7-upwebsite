import os
import json
import base64
import time
import re
import urllib.request
import urllib.error

API_KEY = os.environ.get("GEMINI_API_KEY")
JSON_PATH = "./data/campaign-screenshots.json"
CACHE_PATH = "./data/scanned-campaign-details.json"

if not API_KEY:
    print("Error: GEMINI_API_KEY not found!")
    exit(1)

with open(JSON_PATH, "r", encoding="utf-8") as f:
    items = json.load(f)

cache = {}
if os.path.exists(CACHE_PATH):
    try:
        with open(CACHE_PATH, "r", encoding="utf-8") as f:
            cache = json.load(f)
        print(f"Loaded {len(cache)} existing cached items.")
    except Exception as e:
        print("Could not load cache:", e)

MODEL_POOL = [
    "gemini-flash-lite-latest",
    "gemini-3.1-flash-lite",
    "gemini-3.5-flash-lite",
    "gemini-3.5-flash"
]

def clean_json_text(text):
    text = text.strip()
    if "```json" in text:
        text = text.split("```json")[1].split("```")[0].strip()
    elif "```" in text:
        text = text.split("```")[1].split("```")[0].strip()
    # Find outer curly braces
    start = text.find("{")
    end = text.rfind("}")
    if start != -1 and end != -1:
        text = text[start:end+1]
    return text

def analyze_item(item):
    item_id = item["id"]
    if item_id in cache:
        return cache[item_id]

    local_path = "./public" + item["screenshotUrl"]
    if not os.path.exists(local_path):
        print(f"File not found: {local_path}")
        return None

    with open(local_path, "rb") as img_file:
        b64 = base64.b64encode(img_file.read()).decode("utf-8")

    category = item.get("category", "message_leads")
    cat_label = "Message Lead Campaign" if category == "message_leads" else "Website Purchase Campaign"

    prompt = f"""You are an elite Meta Ads performance strategist for "Boosting Agency BD" (leading performance marketing agency in Bangladesh).
Carefully inspect this Meta Ads Manager screenshot.
The category of this campaign is: {cat_label} ({category}).

1. Read the EXACT numbers and table headers from the screenshot (do not invent or fabricate numbers). Look closely for:
   - Campaign Name / Ad Name / Ad Set Name
   - Results: e.g. Conversations, Purchases, Website Leads, Link Clicks, etc.
   - Cost per result: e.g. $0.02, $0.15, ৳12.50, etc.
   - Amount spent: e.g. $4.00, $45.20, ৳3,400, etc.
   - Reach / Impressions / Frequency / Purchases Conversion Value / ROAS if visible.
   
2. Craft high-converting, professional marketing copy for Boosting Agency BD showcasing this real client achievement.
   - For message_leads: Emphasize low cost per conversation, qualified customer inquiries, high inbox response, low-budget high-return strategy.
   - For website_purchases: Emphasize high ROAS, lowest cost per purchase, pixel conversion tracking, checkout rate, and profitable e-commerce scaling.

Return a STRICT JSON object with these exact keys:
{{
  "title": "Concise high-impact English Campaign Title (under 10 words)",
  "titleBn": "বাংলায় চমৎকার ক্যাম্পেইন টাইটেল (১০ শব্দের মধ্যে)",
  "clientNiche": "e.g. E-Commerce Fashion, Gadgets & Electronics, Women's Boutique, Organic Food, Health & Beauty, Retail Brands, Service Agency",
  "clientNicheBn": "ই-কমার্স ফ্যাশন / গ্যাজেট ও টেক / উইমেনস কালেকশন / অর্গানিক ফুড / হেলথ অ্যান্ড বিউটি ইত্যাদি",
  "objective": "Messenger Inquiries & Customer Leads" or "Website Purchases & Conversion",
  "objectiveBn": "মেসেঞ্জার ইনকোয়ারি ও সেলস লিড" or "ওয়েবসাইট পারচেজ ও সেলস কনভার্সন",
  "campaignName": "Exact campaign name or ad text if visible in the image, else empty string",
  "metrics": [
    {{"label": "Results", "labelBn": "ফলাফল", "value": "Exact number from image, e.g. 226 Conversations or 48 Purchases", "subtext": "Messaging conversations started / Purchases"}},
    {{"label": "Cost per Result", "labelBn": "প্রতি ফলাফলে খরচ", "value": "Exact cost, e.g. $0.02 / conv or $1.45 / purchase", "subtext": "Cost per conversation / Cost per purchase"}},
    {{"label": "Amount Spent", "labelBn": "মোট বাজেট স্পেন্ড", "value": "Exact spent, e.g. $4.00 or $52.00", "subtext": "Total ad spend"}}
  ],
  "marketingCopy": "Professional 2-3 sentence marketing case summary in English highlighting Boosting Agency BD's audience targeting, ad creative performance, and scalable ROI.",
  "marketingCopyBn": "বাংলায় ২-৩ বাক্যে প্রফেশনাল মার্কেটিং কপি যা বুস্টিং এজেন্সি বিডির নিখুঁত স্ট্র্যাটেজি, লো-কস্ট কনভার্সন এবং ক্লায়েন্টের প্রফিটেবল স্কেলিং তুলে ধরে।",
  "highlights": ["3 bullet point key takeaways in English"],
  "highlightsBn": ["৩টি বুলেট পয়েন্ট হাইলাইটস বাংলায়"]
}}
"""

    payload = {
        "contents": [{
            "parts": [
                {"text": prompt},
                {"inlineData": {"mimeType": "image/webp", "data": b64}}
            ]
        }],
        "generationConfig": {
            "responseMimeType": "application/json",
            "temperature": 0.2
        }
    }

    for model in MODEL_POOL:
        url = f"https://generativelanguage.googleapis.com/v1beta/models/{model}:generateContent?key={API_KEY}"
        try:
            req = urllib.request.Request(
                url,
                data=json.dumps(payload).encode("utf-8"),
                headers={"Content-Type": "application/json"}
            )
            with urllib.request.urlopen(req, timeout=35) as resp:
                data = json.loads(resp.read().decode("utf-8"))
                text = data["candidates"][0]["content"]["parts"][0]["text"]
                cleaned = clean_json_text(text)
                parsed = json.loads(cleaned)
                return parsed
        except urllib.error.HTTPError as e:
            if e.code == 429:
                print(f"[{item_id}] Model {model} 429, switching...")
            else:
                err_text = e.read().decode("utf-8", errors="ignore")[:80]
                print(f"[{item_id}] Model {model} HTTP {e.code}: {err_text}")
        except Exception as e:
            print(f"[{item_id}] Model {model} exception: {e}")

    return None

missing_items = [item for item in items if item["id"] not in cache]
print(f"Missing items remaining: {len(missing_items)}")

for idx, item in enumerate(missing_items, 1):
    print(f"[{idx}/{len(missing_items)}] Scanning {item['id']}...")
    try:
        result = analyze_item(item)
        if result:
            cache[item["id"]] = result
            print(f"  ✓ Extracted: {result.get('title', 'Done')[:50]}")
            with open(CACHE_PATH, "w", encoding="utf-8") as f:
                json.dump(cache, f, indent=2, ensure_ascii=False)
        else:
            print(f"  ✗ Could not extract for {item['id']}")
    except Exception as e:
        print(f"Error on {item['id']}: {e}")
    time.sleep(2)

print(f"\nScan finished! Total cached: {len(cache)} / {len(items)}")

# Final merge to data/campaign-screenshots.json
merged = []
for item in items:
    scanned = cache.get(item["id"])
    if scanned:
        item["title"] = scanned.get("title", item.get("title"))
        item["titleBn"] = scanned.get("titleBn")
        item["clientNiche"] = scanned.get("clientNiche")
        item["clientNicheBn"] = scanned.get("clientNicheBn")
        item["objective"] = scanned.get("objective")
        item["objectiveBn"] = scanned.get("objectiveBn")
        item["campaignName"] = scanned.get("campaignName")
        item["metrics"] = scanned.get("metrics", [])
        item["marketingCopy"] = scanned.get("marketingCopy")
        item["marketingCopyBn"] = scanned.get("marketingCopyBn")
        item["highlights"] = scanned.get("highlights", [])
        item["highlightsBn"] = scanned.get("highlightsBn")
    merged.append(item)

with open(JSON_PATH, "w", encoding="utf-8") as f:
    json.dump(merged, f, indent=2, ensure_ascii=False)

print("Saved merged dataset to data/campaign-screenshots.json successfully!")
