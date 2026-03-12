const OPENROUTER_API_KEY = void 0;
const MODELS = [
  "qwen/qwen3-next-80b-a3b-instruct",
  "liquid/lfm-2.5-1.2b-instruct",
  "liquid/lfm-2.5-1.2b-thinking",
  "meta-llama/llama-3.1-8b-instruct:free"
];
async function callOpenRouter(prompt, model) {
  var _a, _b, _c;
  const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${OPENROUTER_API_KEY}`,
      "HTTP-Referer": "https://yojnaai.caffeine.xyz",
      "X-Title": "YojnaAI"
    },
    body: JSON.stringify({
      model,
      messages: [{ role: "user", content: prompt }],
      max_tokens: 1500,
      temperature: 0.7
    })
  });
  if (!res.ok) {
    const errText = await res.text();
    throw new Error(
      `OpenRouter API error: ${res.status} ${res.statusText} - ${errText}`
    );
  }
  const data = await res.json();
  const content = (_c = (_b = (_a = data == null ? void 0 : data.choices) == null ? void 0 : _a[0]) == null ? void 0 : _b.message) == null ? void 0 : _c.content;
  if (!content) throw new Error("OpenRouter se khali jawab aaya");
  return content;
}
async function queryAIWithFallback(prompt) {
  let lastError;
  for (const model of MODELS) {
    try {
      return await callOpenRouter(prompt, model);
    } catch (e) {
      console.warn(`Model ${model} failed, trying next:`, e);
      lastError = e;
    }
  }
  throw lastError;
}
async function queryAI(prompt) {
  return queryAIWithFallback(prompt);
}
async function suggestAdditionalSchemes(userProfile, existingSchemes) {
  const prompt = `You are an expert on Indian government welfare schemes.

User profile: ${userProfile}
Already found schemes: ${existingSchemes.join(", ")}

Suggest 3-5 additional relevant Indian government schemes this person might qualify for that are NOT in the already found list.

IMPORTANT FORMATTING RULES:
- Use ## for main section headings (e.g. ## Suggested Schemes)
- Use ### for each scheme name as a subheading
- Use **bold** for key terms, amounts, and important highlights within text
- Use bullet points (- ) for listing details under each scheme
- Add --- divider between schemes
- Answer in Hinglish (mix of Hindi and English)

Example format:
## Suggested Schemes

### 1. **Scheme Name**
- **Benefit:** ₹amount or description
- **Eligibility:** who can apply
- **Why relevant:** reason

---`;
  return queryAI(prompt);
}
async function answerDirectQuery(userQuery) {
  const prompt = `You are YojnaAI, an expert assistant on Indian government schemes, jobs, vacancies, and government-related topics.

User's question: "${userQuery}"

Answer this question thoroughly and helpfully.

IMPORTANT FORMATTING RULES (strictly follow):
- Use ## for main section headings
- Use ### for sub-section headings
- Use **bold** for ALL important terms, names, amounts, dates, and key highlights
- Use bullet points (- ) for listing details
- Add --- divider between major sections
- Answer in Hinglish (mix of Hindi and English) for easy understanding

Required sections:
## **Overview** (brief explanation)
---
## **Key Details** (important facts, dates, amounts in bold)
---
## **Eligibility & Process** (who can apply, how to apply)
---
## **Important Links** (official website or where to get more info)

Make sure every important term, number, date, and name is **bold**.`;
  return queryAI(prompt);
}
const STOP_WORDS = /* @__PURE__ */ new Set([
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
  "iske"
]);
function normalizeText(text) {
  return text.toLowerCase().replace(/yojna/g, "yojna yojana").replace(/yojana/g, "yojna yojana").replace(/pradhan mantri/g, "pradhan mantri pm").replace(/\bpm\b/g, "pm pradhan mantri");
}
function getMeaningfulWords(query) {
  const normalized = normalizeText(query);
  return normalized.split(/\s+/).filter((w) => w.length > 2 && !STOP_WORDS.has(w));
}
function filterSchemes(params, allSchemes) {
  let filtered = [...allSchemes];
  if (params.category && params.category !== "all") {
    filtered = filtered.filter(
      (s) => s.category === params.category || s.tags.includes(params.category) || s.category === "general"
    );
  }
  if (params.state && params.state !== "all") {
    filtered = filtered.filter(
      (s) => s.state === "all" || s.state.toLowerCase() === params.state.toLowerCase()
    );
  }
  if (params.query) {
    const words = getMeaningfulWords(params.query);
    if (words.length === 0) return filtered;
    const queryFiltered = filtered.filter((s) => {
      const normalizedName = normalizeText(s.name);
      const normalizedDesc = normalizeText(s.description);
      const normalizedElig = normalizeText(s.eligibility);
      const normalizedBenefit = normalizeText(s.benefit);
      const normalizedTags = s.tags.map((t) => normalizeText(t)).join(" ");
      const matchCount = words.filter(
        (w) => normalizedName.includes(w) || normalizedDesc.includes(w) || normalizedTags.includes(w) || normalizedElig.includes(w) || normalizedBenefit.includes(w)
      ).length;
      const nameTagMatch = words.some(
        (w) => normalizedName.includes(w) || normalizedTags.includes(w)
      );
      if (words.length === 1) return nameTagMatch;
      if (words.length === 2) return matchCount >= 2 || nameTagMatch;
      return matchCount >= Math.ceil(words.length * 0.5) && nameTagMatch;
    });
    if (queryFiltered.length > 0) {
      queryFiltered.sort((a, b) => {
        const scoreA = words.filter(
          (w) => normalizeText(`${a.name} ${a.tags.join(" ")}`).includes(w)
        ).length;
        const scoreB = words.filter(
          (w) => normalizeText(`${b.name} ${b.tags.join(" ")}`).includes(w)
        ).length;
        return scoreB - scoreA;
      });
      filtered = queryFiltered;
    } else {
      filtered = [];
    }
  }
  if (params.income && params.income > 5e4) {
    filtered = filtered.filter(
      (s) => !s.tags.includes("BPL") && !s.eligibility.toLowerCase().includes("bpl")
    );
  }
  return filtered;
}
function areResultsRelevantToQuery(query, schemes) {
  if (!query || schemes.length === 0) return true;
  const words = getMeaningfulWords(query);
  if (words.length === 0) return true;
  const bestScore = Math.max(
    ...schemes.map((s) => {
      const target = normalizeText(`${s.name} ${s.tags.join(" ")}`);
      const matchCount = words.filter((w) => target.includes(w)).length;
      return matchCount / words.length;
    })
  );
  if (words.length === 1) return bestScore === 1;
  return bestScore >= 0.5;
}
async function findSchemes(params, allSchemes) {
  const localResults = filterSchemes(params, allSchemes);
  const hasRelevantResults = localResults.length > 0 && (!params.query || areResultsRelevantToQuery(params.query, localResults));
  if (!hasRelevantResults && params.query) {
    try {
      const aiText = await answerDirectQuery(params.query);
      return {
        schemes: [],
        aiSuggested: true,
        aiText,
        noLocalMatch: true
      };
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : String(err);
      return {
        schemes: [],
        aiSuggested: false,
        noLocalMatch: true,
        aiError: `AI se jawab nahi aaya. Error: ${errorMsg}`
      };
    }
  }
  if (localResults.length >= 3) {
    return { schemes: localResults, aiSuggested: false };
  }
  if (params.query || Object.values(params).some(Boolean)) {
    try {
      const profileStr = [
        params.state && `State: ${params.state}`,
        params.age && `Age: ${params.age} years`,
        params.occupation && `Occupation: ${params.occupation}`,
        params.income && `Monthly income: ₹${params.income}`,
        params.category && `Category: ${params.category}`,
        params.query && `User query: ${params.query}`
      ].filter(Boolean).join(", ");
      const aiText = await suggestAdditionalSchemes(
        profileStr,
        localResults.map((s) => s.name)
      );
      return {
        schemes: localResults,
        aiSuggested: true,
        aiText
      };
    } catch {
      return { schemes: localResults, aiSuggested: false };
    }
  }
  return { schemes: localResults, aiSuggested: false };
}
export {
  findSchemes as a,
  filterSchemes as f
};
