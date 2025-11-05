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
        explanation: "This lifestyle risk score reflects exposure to factors studied in public health research.",
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
              "You explain lifestyle risk scores for lung health in plain language. Context: score reflects relative exposure to factors studied in relation to long-term lung health and development of lung cancer (e.g., smoking intensity and duration, second‑hand smoke, air pollution like PM2.5/NO2, occupational dust/fumes, and respiratory comorbidities). Do NOT provide medical diagnoses, probabilities, or percentages. Avoid implying certainty or clinical conclusions. Offer neutral, non‑directive wording and suggest general, non‑medical steps (e.g., reducing exposure, smoke‑free environments, discussing screening with a clinician). Keep responses concise.",
          },
          {
            role: "user",
            content: `In 2–3 sentences, explain what a lifestyle risk score of ${score.toFixed(2)} means specifically for lung health and the development of lung cancer over time. Use plain language, mention that higher scores generally reflect more exposure to studied risk factors (smoking, pollution, etc.), avoid any diagnosis or numerical risk.`,
          },
        ],
        max_tokens: 150,
        temperature: 0.6,
      }),
    });

    if (!response.ok) {
      const err = await response.text();
      return {
        explanation: "This score reflects exposure to lifestyle factors studied in public health research.",
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
      explanation: "This score reflects exposure to lifestyle factors studied in public health research.",
      error: "empty_response",
    };
  } catch (e: any) {
    return {
      explanation: "This score reflects exposure to lifestyle factors studied in public health research.",
      error: e?.message || "unknown_error",
    };
  }
}

