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

  // Natural language query filter
  if (params.query) {
    const q = params.query.toLowerCase();
    const queryFiltered = filtered.filter(
      (s) =>
        s.name.toLowerCase().includes(q) ||
        s.description.toLowerCase().includes(q) ||
        s.tags.some((t) => t.toLowerCase().includes(q)) ||
        s.eligibility.toLowerCase().includes(q) ||
        s.benefit.toLowerCase().includes(q),
    );
    if (queryFiltered.length > 0) {
      filtered = queryFiltered;
    } else {
      // No matching schemes for this query - mark as empty
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
 * Returns false if results seem like a broad fallback rather than genuine matches.
 */
function areResultsRelevantToQuery(query: string, schemes: Scheme[]): boolean {
  if (!query || schemes.length === 0) return true;
  const q = query.toLowerCase();
  const words = q.split(/\s+/).filter((w) => w.length > 2);

  // Check if at least one meaningful word matches a scheme name or primary tag
  return schemes.some((s) =>
    words.some(
      (w) =>
        s.name.toLowerCase().includes(w) ||
        s.tags.some((t) => t.toLowerCase().includes(w)),
    ),
  );
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
    } catch {
      return { schemes: [], aiSuggested: false, noLocalMatch: true };
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
