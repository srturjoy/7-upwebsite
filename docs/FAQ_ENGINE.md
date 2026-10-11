# Smart FAQ Engine & Banglish NLP Architecture

## Core Pipeline
1. **Input Normalization (`text-normalizer.ts`):** Strips punctuation, normalizes vowels, maps Banglish transliterations.
2. **Banglish Map (`banglish-map.ts`):** Maps phonetic words like "koto", "dam", "khala", "shuru" to canonical intents.
3. **Fuzzy Search & Scoring (`search-matcher.ts`):** Computes score based on exact keywords, aliases, and category relevance.
4. **Conversation Manager (`conversation-manager.ts`):** Manages multi-turn state, language switches (English <-> Bangla), and session recovery.
