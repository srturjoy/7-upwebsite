import fs from "fs"
import path from "path"

export type CampaignCategory = "message_leads" | "website_purchases"

export interface StoredCampaignMetric {
  label: string
  labelBn?: string
  value: string
  subtext?: string
}

export interface StoredCampaignScreenshot {
  id: string
  title?: string
  titleBn?: string
  category: CampaignCategory
  screenshotUrl: string
  thumbnailUrl?: string
  clientNiche?: string
  clientNicheBn?: string
  objective?: string
  objectiveBn?: string
  campaignName?: string
  marketingCopy?: string
  marketingCopyBn?: string
  highlights?: string[]
  highlightsBn?: string[]
  description?: string
  clientName?: string
  industry?: string
  timeframe?: string
  order: number
  metrics?: {
    results?: {
      value: string
      metricName?: string
    }
    costPerResult?: {
      value: string
      currency?: string
      subtext?: string
    }
    amountSpent?: {
      value: string
      currency?: string
    }
    additionalMetrics?: StoredCampaignMetric[]
  } | StoredCampaignMetric[]
  fileInfo?: {
    originalName: string
    fileSize: number
    mimeType: string
    uploadedAt: string
  }
  verifiedBadge?: boolean
  createdAt: string
  updatedAt: string
}

const DATA_DIR = path.join(process.cwd(), "data")
const DATA_FILE = path.join(DATA_DIR, "campaign-screenshots.json")
const UPLOADS_DIR = path.join(process.cwd(), "public", "campaigns", "uploads")

/**
 * Ensures storage directories exist
 */
function ensureStorage() {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true })
    }
    if (!fs.existsSync(UPLOADS_DIR)) {
      fs.mkdirSync(UPLOADS_DIR, { recursive: true })
    }
  } catch (e) {
    // Ignore read-only filesystem errors on edge
  }
}

/**
 * Read all campaign screenshots sorted by order ascending
 */
export async function getAllCampaignScreenshots(): Promise<StoredCampaignScreenshot[]> {
  ensureStorage()

  if (!fs.existsSync(DATA_FILE)) {
    return []
  }

  try {
    const raw = await fs.promises.readFile(DATA_FILE, "utf-8")
    const items: StoredCampaignScreenshot[] = JSON.parse(raw)
    return items.sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
  } catch (error) {
    console.error("Error reading campaign screenshots DB:", error)
    return []
  }
}

/**
 * Atomically writes items to the database file
 */
async function writeAllScreenshots(items: StoredCampaignScreenshot[]): Promise<void> {
  ensureStorage()
  try {
    const tmpFile = `${DATA_FILE}.${Date.now()}.tmp`
    await fs.promises.writeFile(tmpFile, JSON.stringify(items, null, 2), "utf-8")
    await fs.promises.rename(tmpFile, DATA_FILE)
  } catch (error) {
    console.error("Error writing campaign screenshots DB:", error)
  }
}

/**
 * Add a new campaign screenshot item
 */
export async function addCampaignScreenshot(
  item: Omit<StoredCampaignScreenshot, "id" | "order" | "createdAt" | "updatedAt"> & { id?: string }
): Promise<StoredCampaignScreenshot> {
  const current = await getAllCampaignScreenshots()
  const newId = item.id || `camp-${Date.now()}-${Math.random().toString(36).substring(2, 8)}`
  
  const maxOrder = current.reduce((max, cur) => Math.max(max, cur.order ?? 0), -1)
  const newOrder = maxOrder + 1

  const newItem: StoredCampaignScreenshot = {
    ...item,
    id: newId,
    order: newOrder,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }

  current.push(newItem)
  await writeAllScreenshots(current)
  return newItem
}

/**
 * Update an existing campaign screenshot item
 */
export async function updateCampaignScreenshot(
  id: string,
  updates: Partial<Omit<StoredCampaignScreenshot, "id" | "createdAt">>
): Promise<StoredCampaignScreenshot | null> {
  const current = await getAllCampaignScreenshots()
  const index = current.findIndex((item) => item.id === id)
  if (index === -1) return null

  const existing = current[index]
  const updatedItem: StoredCampaignScreenshot = {
    ...existing,
    ...updates,
    id: existing.id,
    createdAt: existing.createdAt,
    updatedAt: new Date().toISOString(),
  }

  current[index] = updatedItem
  await writeAllScreenshots(current)
  return updatedItem
}

/**
 * Reorder screenshots by providing an array of IDs in the desired order
 */
export async function reorderCampaignScreenshots(orderedIds: string[]): Promise<StoredCampaignScreenshot[]> {
  const current = await getAllCampaignScreenshots()
  const idMap = new Map(current.map((item) => [item.id, item]))

  const reordered: StoredCampaignScreenshot[] = []
  orderedIds.forEach((id, index) => {
    const item = idMap.get(id)
    if (item) {
      item.order = index
      item.updatedAt = new Date().toISOString()
      reordered.push(item)
      idMap.delete(id)
    }
  })

  let nextOrder = reordered.length
  for (const remainingItem of idMap.values()) {
    remainingItem.order = nextOrder++
    reordered.push(remainingItem)
  }

  await writeAllScreenshots(reordered)
  return reordered
}

/**
 * Delete a screenshot and optionally remove the file if located in /campaigns/uploads/
 */
export async function deleteCampaignScreenshot(id: string): Promise<boolean> {
  const current = await getAllCampaignScreenshots()
  const index = current.findIndex((item) => item.id === id)
  if (index === -1) return false

  const [toDelete] = current.splice(index, 1)

  if (toDelete.screenshotUrl && toDelete.screenshotUrl.startsWith("/campaigns/uploads/")) {
    const filename = path.basename(toDelete.screenshotUrl)
    const filePath = path.join(UPLOADS_DIR, filename)
    try {
      if (fs.existsSync(filePath)) {
        await fs.promises.unlink(filePath)
      }
    } catch (e) {
      console.warn("Could not delete physical file:", filePath, e)
    }
  }

  current.forEach((item, idx) => {
    item.order = idx
  })

  await writeAllScreenshots(current)
  return true
}
