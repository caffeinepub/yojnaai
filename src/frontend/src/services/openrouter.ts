// AI service using OpenRouter
// API key is stored in .env file (never hardcode secrets in source code)
const OPENROUTER_API_KEY = import.meta.env.VITE_OPENROUTER_API_KEY as string;

// Model fallback chain -- all 4 models used in order
const MODELS = [
  "qwen/qwen3-next-80b-a3b-instruct",
  "liquid/lfm-2.5-1.2b-instruct",
  "liquid/lfm-2.5-1.2b-thinking",
  "meta-llama/llama-3.1-8b-instruct:free",
];

async function callOpenRouter(prompt: string, model: string): Promise<string> {
  const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${OPENROUTER_API_KEY}`,
      "HTTP-Referer": "https://yojnaai.caffeine.xyz",
      "X-Title": "YojnaAI",
    },
    body: JSON.stringify({
      model,
      messages: [{ role: "user", content: prompt }],
      max_tokens: 1500,
      temperature: 0.7,
    }),
  });

  if (!res.ok) {
    const errText = await res.text();
    throw new Error(
      `OpenRouter API error: ${res.status} ${res.statusText} - ${errText}`,
    );
  }

  const data = await res.json();
  const content = data?.choices?.[0]?.message?.content;
  if (!content) throw new Error("OpenRouter se khali jawab aaya");
  return content;
}

async function queryAIWithFallback(prompt: string): Promise<string> {
  let lastError: unknown;
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

export async function queryAI(prompt: string): Promise<string> {
  return queryAIWithFallback(prompt);
}

export async function extractUserProfile(
  naturalLanguageInput: string,
): Promise<{
  state?: string;
  age?: number;
  category?: string;
  occupation?: string;
  income?: number;
}> {
  const prompt = `Extract user profile information from this Indian user's description for government scheme matching.
User input: "${naturalLanguageInput}"

Extract and return ONLY a JSON object with these fields (use null if not found):
{
  "state": "state name or null",
  "age": age_number_or_null,
  "category": "one of: student/farmer/women/sc-st/labour/senior/disabled/general or null",
  "occupation": "occupation string or null",
  "income": monthly_income_number_or_null
}

Return ONLY the JSON, no explanation.`;

  const response = await queryAI(prompt);
  try {
    const jsonMatch = response.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      return JSON.parse(jsonMatch[0]);
    }
  } catch {
    // ignore parse error
  }
  return {};
}

export async function suggestAdditionalSchemes(
  userProfile: string,
  existingSchemes: string[],
): Promise<string> {
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

export async function answerDirectQuery(userQuery: string): Promise<string> {
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
