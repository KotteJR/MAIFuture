"use client";

const explanationCache = new Map<string, { explanation: string; timestamp: number }>();
const CACHE_TTL = 1000 * 60 * 60; // 1 hour

export async function generateLifestyleExplanation(
  score: number,
  apiKey?: string
): Promise<{ explanation: string; error?: string }> {
  const cacheKey = `score_${score.toFixed(2)}`;
  const cached = explanationCache.get(cacheKey);
  const now = Date.now();

  if (cached && now - cached.timestamp < CACHE_TTL) {
    return { explanation: cached.explanation };
  }

  try {
    const key = apiKey || process.env.NEXT_PUBLIC_OPENAI_API_KEY || "";
    if (!key) {
      return {
        explanation: "This screening score reflects exposure to factors studied in lung‑health research. If it appears elevated, consider discussing lung cancer screening with a clinician.",
        error: "no_api_key",
      };
    }

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${key}`,
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content:
              "You explain screening readiness for lung health in plain language. Context: score reflects relative exposure to factors studied in relation to long‑term lung health and development of lung cancer (e.g., smoking intensity/duration, second‑hand smoke, PM2.5/NO2, occupational dust/fumes, respiratory comorbidities). Do NOT provide diagnoses, probabilities, or percentages. Avoid certainty or clinical conclusions. If the score is on the higher side, include a neutral sentence suggesting the user consider discussing lung cancer screening eligibility with a clinician. Keep it concise (2–3 sentences).",
          },
          {
            role: "user",
            content: `Explain, in 2–3 sentences, what a screening readiness score of ${score.toFixed(2)} means for lung health. Mention that higher scores generally reflect more exposure to studied risk factors (smoking, pollution, etc.). Avoid any diagnosis or numerical risk. If appropriate, suggest discussing screening with a clinician.`,
          },
        ],
        max_tokens: 150,
        temperature: 0.6,
      }),
    });

    if (!response.ok) {
      const err = await response.text();
      return {
        explanation: "This screening score reflects exposure to factors studied in lung‑health research. If elevated, consider discussing screening eligibility with a clinician.",
        error: err,
      };
    }

    const data = await response.json();
    const explanation = data.choices?.[0]?.message?.content?.trim() || "";
    if (explanation) {
      explanationCache.set(cacheKey, { explanation, timestamp: now });
      return { explanation };
    }
    return {
      explanation: "This screening score reflects exposure to factors studied in lung‑health research. If elevated, consider discussing screening eligibility with a clinician.",
      error: "empty_response",
    };
  } catch (e: any) {
    return {
      explanation: "This screening score reflects exposure to factors studied in lung‑health research. If elevated, consider discussing screening eligibility with a clinician.",
      error: e?.message || "unknown_error",
    };
  }
}

