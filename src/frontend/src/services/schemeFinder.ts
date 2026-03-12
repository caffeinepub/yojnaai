import type { Scheme } from "../data/schemes";
import { answerDirectQuery, suggestAdditionalSchemes } from "./openrouter";

export interface FindSchemeParams {
  state?: string;
  age?: number;
  occupation?: string;
  income?: number;
  category?: string;
  query?: string;
}

export interface FindResult {
  schemes: Scheme[];
  aiSuggested: boolean;
  aiText?: string;
  noLocalMatch?: boolean;
  aiError?: string;
}

// Common stop words that shouldn't count as meaningful matches
const STOP_WORDS = new Set([
  "the",
  "for",
  "and",
  "with",
  "from",
  "into",
  "post",
  "new",
  "all",
  "get",
  "how",
  "what",
  "mai",
  "hai",
  "kar",
  "karo",
  "mein",
  "me",
  "ka",
  "ki",
  "ko",
  "ke",
  "se",
  "kya",
  "aur",
  "yeh",
  "woh",
  "koi",
  "bol",
  "bata",
  "isko",
  "uska",
  "iske",
]);

// Normalize text for better matching (handle yojna/yojana, common spelling variations)
function normalizeText(text: string): string {
  return text
    .toLowerCase()
    .replace(/yojna/g, "yojna yojana")
    .replace(/yojana/g, "yojna yojana")
    .replace(/pradhan mantri/g, "pradhan mantri pm")
    .replace(/\bpm\b/g, "pm pradhan mantri");
}

// Extract meaningful words from query (remove stop words, short words)
function getMeaningfulWords(query: string): string[] {
  const normalized = normalizeText(query);
  return normalized
    .split(/\s+/)
    .filter((w) => w.length > 2 && !STOP_WORDS.has(w));
}

export function filterSchemes(
  params: FindSchemeParams,
  allSchemes: Scheme[],
): Scheme[] {
  let filtered = [...allSchemes];

  // Filter by category
  if (params.category && params.category !== "all") {
    filtered = filtered.filter(
      (s) =>
        s.category === params.category ||
        s.tags.includes(params.category as string) ||
        s.category === "general",
    );
  }

  // Filter by state
  if (params.state && params.state !== "all") {
    filtered = filtered.filter(
      (s) =>
        s.state === "all" ||
        s.state.toLowerCase() === params.state!.toLowerCase(),
    );
  }

  // Natural language query filter -- word-level matching with normalization
  if (params.query) {
    const words = getMeaningfulWords(params.query);

    if (words.length === 0) return filtered;

    const queryFiltered = filtered.filter((s) => {
      const normalizedName = normalizeText(s.name);
      const normalizedDesc = normalizeText(s.description);
      const normalizedElig = normalizeText(s.eligibility);
      const normalizedBenefit = normalizeText(s.benefit);
      const normalizedTags = s.tags.map((t) => normalizeText(t)).join(" ");

      // Count how many words match -- need majority match
      const matchCount = words.filter(
        (w) =>
          normalizedName.includes(w) ||
          normalizedDesc.includes(w) ||
          normalizedTags.includes(w) ||
          normalizedElig.includes(w) ||
          normalizedBenefit.includes(w),
      ).length;

      // Require at least 50% of meaningful words to match, or name/tag direct match
      const nameTagMatch = words.some(
        (w) => normalizedName.includes(w) || normalizedTags.includes(w),
      );

      if (words.length === 1) return nameTagMatch;
      if (words.length === 2) return matchCount >= 2 || nameTagMatch;
      // For 3+ words: need at least 50% match AND a name/tag match
      return matchCount >= Math.ceil(words.length * 0.5) && nameTagMatch;
    });

    if (queryFiltered.length > 0) {
      // Sort by relevance -- more word matches in name/tags = higher rank
      queryFiltered.sort((a, b) => {
        const scoreA = words.filter((w) =>
          normalizeText(`${a.name} ${a.tags.join(" ")}`).includes(w),
        ).length;
        const scoreB = words.filter((w) =>
          normalizeText(`${b.name} ${b.tags.join(" ")}`).includes(w),
        ).length;
        return scoreB - scoreA;
      });
      filtered = queryFiltered;
    } else {
      filtered = [];
    }
  }

  // Income-based filtering for loan/credit schemes
  if (params.income && params.income > 50000) {
    filtered = filtered.filter(
      (s) =>
        !s.tags.includes("BPL") && !s.eligibility.toLowerCase().includes("bpl"),
    );
  }

  return filtered;
}

/**
 * Check if the local results are actually relevant to the query.
 * Uses strict relevance: multiple meaningful words must match name or tags.
 */
function areResultsRelevantToQuery(query: string, schemes: Scheme[]): boolean {
  if (!query || schemes.length === 0) return true;
  const words = getMeaningfulWords(query);
  if (words.length === 0) return true;

  // For each scheme, calculate what % of query words match name+tags
  const bestScore = Math.max(
    ...schemes.map((s) => {
      const target = normalizeText(`${s.name} ${s.tags.join(" ")}`);
      const matchCount = words.filter((w) => target.includes(w)).length;
      return matchCount / words.length;
    }),
  );

  // Require at least 50% of meaningful words to match name/tags
  if (words.length === 1) return bestScore === 1; // exact single word match required
  return bestScore >= 0.5;
}

export async function findSchemes(
  params: FindSchemeParams,
  allSchemes: Scheme[],
): Promise<FindResult> {
  const localResults = filterSchemes(params, allSchemes);

  // Check if we have genuinely relevant local results
  const hasRelevantResults =
    localResults.length > 0 &&
    (!params.query || areResultsRelevantToQuery(params.query, localResults));

  // If no relevant local match and there's a query → use AI to directly answer
  if (!hasRelevantResults && params.query) {
    try {
      const aiText = await answerDirectQuery(params.query);
      return {
        schemes: [],
        aiSuggested: true,
        aiText,
        noLocalMatch: true,
      };
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : String(err);
      return {
        schemes: [],
        aiSuggested: false,
        noLocalMatch: true,
        aiError: `AI se jawab nahi aaya. Error: ${errorMsg}`,
      };
    }
  }

  // Good local results found - optionally supplement with AI suggestions
  if (localResults.length >= 3) {
    return { schemes: localResults, aiSuggested: false };
  }

  // Fewer than 3 local results - use AI for additional suggestions
  if (params.query || Object.values(params).some(Boolean)) {
    try {
      const profileStr = [
        params.state && `State: ${params.state}`,
        params.age && `Age: ${params.age} years`,
        params.occupation && `Occupation: ${params.occupation}`,
        params.income && `Monthly income: ₹${params.income}`,
        params.category && `Category: ${params.category}`,
        params.query && `User query: ${params.query}`,
      ]
        .filter(Boolean)
        .join(", ");

      const aiText = await suggestAdditionalSchemes(
        profileStr,
        localResults.map((s) => s.name),
      );

      return {
        schemes: localResults,
        aiSuggested: true,
        aiText,
      };
    } catch {
      return { schemes: localResults, aiSuggested: false };
    }
  }

  return { schemes: localResults, aiSuggested: false };
}
