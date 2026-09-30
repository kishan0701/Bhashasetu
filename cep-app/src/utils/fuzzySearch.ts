/**
 * Fuzzy and phonetic search utility for BhashaSetu
 * Supports typo tolerance, phonetics (w/v, sh/s, aa/a), Levenshtein edit distance, and substring matching.
 */

// Normalized phonetic key for Indian language romanization
export function normalizeRomanized(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s\u0900-\u097F]/g, '') // preserve alphanumeric and Devanagari
    .replace(/aa/g, 'a')
    .replace(/ee/g, 'i')
    .replace(/oo/g, 'u')
    .replace(/w/g, 'v')
    .replace(/sh/g, 's')
    .replace(/kh/g, 'k')
    .replace(/gh/g, 'g')
    .replace(/ch/g, 'c')
    .replace(/jh/g, 'j')
    .replace(/th/g, 't')
    .replace(/dh/g, 'd')
    .replace(/ph/g, 'f')
    .replace(/bh/g, 'b')
    .replace(/rh/g, 'r')
    .replace(/lh/g, 'l');
}

// Levenshtein distance between two strings
export function levenshtein(a: string, b: string): number {
  if (a.length === 0) return b.length;
  if (b.length === 0) return a.length;

  const matrix: number[][] = [];

  for (let i = 0; i <= b.length; i++) {
    matrix[i] = [i];
  }

  for (let j = 0; j <= a.length; j++) {
    matrix[0][j] = j;
  }

  for (let i = 1; i <= b.length; i++) {
    for (let j = 1; j <= a.length; j++) {
      if (b.charAt(i - 1) === a.charAt(j - 1)) {
        matrix[i][j] = matrix[i - 1][j - 1];
      } else {
        matrix[i][j] = Math.min(
          matrix[i - 1][j - 1] + 1, // substitution
          matrix[i][j - 1] + 1,     // insertion
          matrix[i - 1][j] + 1      // deletion
        );
      }
    }
  }

  return matrix[b.length][a.length];
}

// Fuzzy match score: returns a score from 0 (no match) to 100 (exact match)
export function fuzzyMatchScore(query: string, target: string): number {
  const q = query.toLowerCase().trim();
  const t = target.toLowerCase().trim();

  if (!q || !t) return 0;
  if (q === t) return 100;

  // Exact substring match
  if (t.includes(q)) return 90 + Math.min(10, (q.length / t.length) * 10);

  // Normalized phonetic match (e.g. varadi -> varhadi, malwani -> malvani)
  const normQ = normalizeRomanized(q);
  const normT = normalizeRomanized(t);

  if (normQ === normT) return 95;
  if (normT.startsWith(normQ)) return 88;
  if (normT.includes(normQ)) return 82;

  // Token match (e.g. "morning call" matches "Fisherman's Morning Call")
  const qTokens = q.split(/\s+/);
  const tTokens = t.split(/\s+/);
  const allTokensMatch = qTokens.every(qtok => tTokens.some(ttok => ttok.includes(qtok)));
  if (allTokensMatch) return 85;

  // Typo tolerance / Levenshtein distance on words
  let bestWordScore = 0;
  for (const ttok of tTokens) {
    const dist = levenshtein(q, ttok);
    const maxLen = Math.max(q.length, ttok.length);
    const similarity = 1 - dist / maxLen;

    // Allow 1 typo for words of length 3-5, 2 typos for longer words
    const allowedTypos = q.length <= 4 ? 1 : 2;
    if (dist <= allowedTypos && similarity > 0.6) {
      bestWordScore = Math.max(bestWordScore, Math.round(similarity * 75));
    }

    // Also check normalized distance
    const normDist = levenshtein(normQ, normalizeRomanized(ttok));
    if (normDist <= allowedTypos) {
      bestWordScore = Math.max(bestWordScore, 70);
    }
  }

  return bestWordScore;
}

// Filter items with fuzzy scoring threshold
export function fuzzySearchList<T>(
  items: T[],
  query: string,
  extractFields: (item: T) => string[],
  threshold = 60
): { item: T; score: number; matchedField: string }[] {
  if (!query.trim()) {
    return items.map(item => ({ item, score: 100, matchedField: '' }));
  }

  const scored: { item: T; score: number; matchedField: string }[] = [];

  for (const item of items) {
    const fields = extractFields(item);
    let highestScore = 0;
    let bestField = '';

    for (const field of fields) {
      const score = fuzzyMatchScore(query, field);
      if (score > highestScore) {
        highestScore = score;
        bestField = field;
      }
    }

    if (highestScore >= threshold) {
      scored.push({ item, score: highestScore, matchedField: bestField });
    }
  }

  return scored.sort((a, b) => b.score - a.score);
}
