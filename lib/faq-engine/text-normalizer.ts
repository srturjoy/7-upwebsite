/**
 * Text normalizer for bilingual Bengali and English text,
 * handling Unicode diacritics, punctuation, spacing, and phonetic tokens.
 */

// Bengali vowel signs and special marks cleanup
const BN_DIACRITICS_REGEX = /[\u200B-\u200D\uFEFF]/g

export function normalizeBengali(text: string): string {
  if (!text) return ""
  return text
    .normalize("NFC")
    .replace(BN_DIACRITICS_REGEX, "")
    .replace(/[।!?,.:;()'"“”‘’_/[\]\\-]/g, " ")
    .replace(/\s+/g, " ")
    .trim()
}

export function normalizeEnglish(text: string): string {
  if (!text) return ""
  return text
    .toLowerCase()
    .replace(/[^\w\s\u0980-\u09FF]/g, " ")
    .replace(/\s+/g, " ")
    .trim()
}

export function tokenize(text: string): string[] {
  if (!text) return []
  const normalized = normalizeEnglish(normalizeBengali(text))
  return normalized
    .split(/\s+/)
    .map((t) => t.trim())
    .filter((t) => t.length > 1)
}
