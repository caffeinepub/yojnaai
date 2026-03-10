const OPENROUTER_API_KEY =
  "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";
const PRIMARY_MODEL = "qwen/qwen3-next-80b-a3b-instruct";
const FALLBACK_MODEL = "liquid/lfm-2.5-1.2b-thinking";

async function callModel(model: string, prompt: string): Promise<string> {
  const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${OPENROUTER_API_KEY}`,
      "HTTP-Referer":
        typeof window !== "undefined"
          ? window.location.origin
          : "https://yojnaai.com",
      "X-Title": "YojnaAI - Indian Government Scheme Finder",
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
  const content = data.choices?.[0]?.message?.content;
  if (!content) throw new Error("Empty response from AI model");
  return content;
}

export async function queryAI(prompt: string): Promise<string> {
  try {
    return await callModel(PRIMARY_MODEL, prompt);
  } catch (primaryError) {
    console.warn("Primary AI model failed, trying fallback:", primaryError);
    try {
      return await callModel(FALLBACK_MODEL, prompt);
    } catch (fallbackError) {
      console.error("Both AI models failed:", fallbackError);
      throw new Error(
        `AI answer nahi aa saki. Error: ${fallbackError instanceof Error ? fallbackError.message : String(fallbackError)}`,
      );
    }
  }
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

Suggest 3-5 additional relevant Indian government schemes this person might qualify for that are NOT in the already found list. Focus on lesser-known but highly beneficial schemes.

For each scheme provide:
- Scheme name
- Key benefit (amount or type)
- Why this person qualifies

Be specific and accurate about real Indian government schemes.`;

  return queryAI(prompt);
}

export async function answerDirectQuery(userQuery: string): Promise<string> {
  const prompt = `You are YojnaAI, an expert assistant on Indian government schemes, jobs, vacancies, and government-related topics.

User's question: "${userQuery}"

This query is NOT about a specific government welfare scheme in the database, but the user is asking about it. Answer this question thoroughly and helpfully.

Provide:
1. Clear explanation of what this is
2. Key details (dates, eligibility, process, benefits if applicable)
3. How to apply or where to get more information (official website if known)
4. Any important recent updates

Be accurate, specific, and helpful. If it's a recruitment/vacancy query, provide details about the recruitment process, eligibility, syllabus, etc. Answer in a mix of Hindi and English (Hinglish) to make it easy to understand for Indian users. Use bullet points for clarity.`;

  return queryAI(prompt);
}
