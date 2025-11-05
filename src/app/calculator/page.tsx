"use client";

import { useEffect, useMemo, useState } from "react";
import { fetchRisk } from "@/src/lib/supabaseClient";
import { generateLifestyleExplanation } from "@/src/lib/openaiExplanation";

type CountriesToCities = Record<string, string[]>;
const countryToCode: Record<string, string> = {
  "Albania": "AL",
  "Andorra": "AD",
  "Austria": "AT",
  "Belgium": "BE",
  "Bosnia and Herzegovina": "BA",
  "Bulgaria": "BG",
  "Croatia": "HR",
  "Cyprus": "CY",
  "Czechia": "CZ",
  "Denmark": "DK",
  "Estonia": "EE",
  "Finland": "FI",
  "France": "FR",
  "Germany": "DE",
  "Greece": "GR",
  "Hungary": "HU",
  "Iceland": "IS",
  "Ireland": "IE",
  "Italy": "IT",
  "Kosovo": "XK",
  "Latvia": "LV",
  "Liechtenstein": "LI",
  "Lithuania": "LT",
  "Luxembourg": "LU",
  "Malta": "MT",
  "Moldova": "MD",
  "Monaco": "MC",
  "Montenegro": "ME",
  "Netherlands": "NL",
  "North Macedonia": "MK",
  "Norway": "NO",
  "Poland": "PL",
  "Portugal": "PT",
  "Romania": "RO",
  "Serbia": "RS",
  "Slovakia": "SK",
  "Slovenia": "SI",
  "Spain": "ES",
  "Sweden": "SE",
  "Switzerland": "CH",
  "Turkey": "TR",
  "Ukraine": "UA",
  "United Kingdom": "GB",
};

export default function CalculatorPage() {
  const [packsPerDay, setPacksPerDay] = useState<string>("");
  const [yearsSmoked, setYearsSmoked] = useState<string>("");
  const [countriesToCities, setCountriesToCities] = useState<CountriesToCities>({});
  const [country, setCountry] = useState<string>("North Macedonia");
  const [city, setCity] = useState<string>("");
  const [quit, setQuit] = useState<boolean>(false);
  const [stoppedAgoYears, setStoppedAgoYears] = useState<string>("");
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [age, setAge] = useState<string>("");
  const [gender, setGender] = useState<string>("");
  const [diseaseInput, setDiseaseInput] = useState<string>("");
  const [diseases, setDiseases] = useState<string[]>([]);
  const [lastJobId, setLastJobId] = useState<string>("");
  const [riskStatus, setRiskStatus] = useState<"idle"|"loading"|"ok"|"err">("idle");
  const [riskValue, setRiskValue] = useState<number | null>(null);
  const [aiExplanation, setAiExplanation] = useState<string>("");
  const [explanationLoading, setExplanationLoading] = useState<boolean>(false);
  const [showTooltip, setShowTooltip] = useState<boolean>(false);
  const [showInfo, setShowInfo] = useState<boolean>(false);

  useEffect(() => {
    let active = true;
    (async () => {
      try {
        const res = await fetch("/data/europe_countries_cities.json");
        const data: CountriesToCities = await res.json();
        if (!active) return;
        setCountriesToCities(data);
        if (!data[country]) {
          const firstCountry = Object.keys(data)[0] || "";
          setCountry(firstCountry);
          setCity("");
        }
      } catch {
        if (!active) return;
        setCountriesToCities({});
      }
    })();
    return () => {
      active = false;
    };
  }, []);

  const countries = useMemo(() => Object.keys(countriesToCities).sort(), [countriesToCities]);
  const cities = useMemo(() => (country && countriesToCities[country]) ? countriesToCities[country] : [], [countriesToCities, country]);

  const packYears = useMemo(() => {
    const p = parseFloat(packsPerDay || "0");
    const y = parseFloat(yearsSmoked || "0");
    if (!isFinite(p) || !isFinite(y)) return 0;
    return +(p * y).toFixed(2);
  }, [packsPerDay, yearsSmoked]);

  async function onCalculate() {
    try {
      setSubmitting(true);
      const job_id = (typeof crypto !== 'undefined' && 'randomUUID' in crypto)
        ? crypto.randomUUID()
        : `${Date.now()}-${Math.random().toString(36).slice(2)}`;

      const countryCode = countryToCode[country] || "";
      const payload = {
        job_id,
        packsPerDay: parseFloat(packsPerDay || '0'),
        yearsSmoked: parseFloat(yearsSmoked || '0'),
        country,
        countryCode,
        city,
        quit,
        stoppedAgoYears: quit ? parseFloat(stoppedAgoYears || '0') : null,
        packYears,
        age: parseFloat(age || '0'),
        gender,
        comorbidities: diseases,
        timestamp: Date.now(),
      };

      const res = await fetch('https://n8n.profit-ai.com/webhook/a1035b2b-e3df-41c1-8866-f9b30130f9eb', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const text = await res.text();
      console.log('n8n response', res.status, text);
      setLastJobId(job_id);
      setRiskStatus('loading');
      setRiskValue(null);
    } catch (err) {
      console.error('n8n error', err);
    } finally {
      setSubmitting(false);
    }
  }

  // Auto-poll for result after a job is created
  useEffect(() => {
    if (!lastJobId) return;
    let cancelled = false;

    (async () => {
      // Try up to ~60 seconds (20 attempts x 3s)
      for (let i = 0; i < 20 && !cancelled; i++) {
        const { lifestylerisk, error } = await fetchRisk(lastJobId);
        if (!cancelled && !error && typeof lifestylerisk === 'number') {
          setRiskValue(lifestylerisk);
          setRiskStatus('ok');
          return;
        }
        await new Promise((r) => setTimeout(r, 3000));
      }
      if (!cancelled) setRiskStatus('err');
    })();

    return () => { cancelled = true };
  }, [lastJobId]);

  // Fetch AI explanation when risk value is available
  useEffect(() => {
    if (!riskValue || riskStatus !== 'ok') return;
    let cancelled = false;
    (async () => {
      setExplanationLoading(true);
      const { explanation } = await generateLifestyleExplanation(riskValue);
      if (!cancelled) {
        setAiExplanation(explanation);
        setExplanationLoading(false);
      }
    })();
    return () => { cancelled = true };
  }, [riskValue, riskStatus]);

  // Helper to get badge color based on score
  const getRiskBadgeColor = (score: number): string => {
    if (score < 1.0) return 'bg-green-100 text-green-800 border-green-300';
    if (score <= 2.5) return 'bg-yellow-100 text-yellow-800 border-yellow-300';
    return 'bg-red-100 text-red-800 border-red-300';
  };

  const canCalculate =
    (parseFloat(packsPerDay || '0') > 0) &&
    (parseFloat(yearsSmoked || '0') > 0) &&
    !!country &&
    !!city &&
    (parseFloat(age || '0') > 0) &&
    (gender === 'male' || gender === 'female') &&
    (!quit || parseFloat(stoppedAgoYears || '0') >= 0);

  return (<main className="bg-white">
      <section className="max-w-3xl mx-auto px-6 md:px-8 lg:px-12 py-10">
        <div className="mb-4 flex items-center justify-between">
          <button
            type="button"
            className="text-gray-500 hover:text-gray-700 rounded-full p-2 focus:outline-none focus:ring-2 focus:ring-blue-200"
            aria-label="How is this calculated?"
            onClick={() => setShowInfo(true)}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </button>
        </div>

        <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6 md:p-8 grid grid-cols-1 gap-6">
          {riskStatus === 'ok' && riskValue !== null ? (
            <div className="flex flex-col items-start gap-6">
              <div className="flex items-center gap-3">
                <h2 className="text-xl font-semibold text-gray-900">Lifestyle risk</h2>
                <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold border ${getRiskBadgeColor(riskValue)}`}>
                  {riskValue.toFixed(2)}
                </span>
                <button
                  type="button"
                  onClick={() => setShowTooltip(!showTooltip)}
                  className="text-gray-400 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-200 rounded-full p-1"
                  aria-label="How is this calculated?"
                  aria-expanded={showTooltip}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </button>
              </div>

              {showTooltip && (
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 text-sm text-gray-700 space-y-2 w-full">
                  <p className="font-semibold">How is this calculated?</p>
                  <p>
                    This lifestyle risk score is calculated based on your smoking history, age, air quality exposure (e.g. PM2.5, NO2), and presence of comorbidities like asthma or diabetes. It is derived from research-backed logistic regression models used in public health studies, and reflects relative exposure to lung health risk factors.
                  </p>
                  <p className="text-xs text-gray-600 italic">
                    <strong>We do NOT provide a medical diagnosis or a percentage risk of lung cancer.</strong> This calculator is purely informational and based on publicly available health data correlations. Always consult your physician for clinical assessments.
                  </p>
                </div>
              )}

              {explanationLoading ? (
                <div className="text-sm text-gray-600 italic">Generating explanation…</div>
              ) : aiExplanation ? (
                <div className="bg-white border border-gray-200 rounded-lg p-4 text-sm text-gray-700 w-full">
                  <p className="font-semibold mb-1">What this score means</p>
                  <p className="italic">{aiExplanation}</p>
                </div>
              ) : null}
            </div>
          ) : (
            <>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm text-gray-700 mb-1">Age</label>
              <input
                type="number"
                min={0}
                step="1"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-200"
                placeholder="e.g. 55"
                required
              />
            </div>
            <div>
              <label className="block text-sm text-gray-700 mb-1">Gender</label>
              <div className="relative">
                <select
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                  className="w-full appearance-none bg-none rounded-lg border border-gray-300 bg-white pr-10 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-200"
                  style={{ WebkitAppearance: 'none', MozAppearance: 'none' }}
                >
                  <option value="">Select gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
                <svg className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 10.207l3.71-2.977a.75.75 0 11.94 1.172l-4.2 3.367a.75.75 0 01-.94 0l-4.2-3.367a.75.75 0 01-.08-1.192z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm text-gray-700 mb-1">Packs per day</label>
            <input
              type="number"
              min={0}
              step="0.1"
              value={packsPerDay}
              onChange={(e) => setPacksPerDay(e.target.value)}
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-200"
              placeholder="e.g. 1.0"
              required
            />
          </div>

          <div>
            <label className="block text-sm text-gray-700 mb-1">Years smoked</label>
            <input
              type="number"
              min={0}
              step="0.5"
              value={yearsSmoked}
              onChange={(e) => setYearsSmoked(e.target.value)}
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-200"
              placeholder="e.g. 10"
              required
            />
          </div>

          <div>
            <label className="block text-sm text-gray-700 mb-1">Other diseases (add multiple)</label>
            <div className="flex gap-2">
              <input
                type="text"
                value={diseaseInput}
                onChange={(e) => setDiseaseInput(e.target.value)}
                className="flex-1 rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-200"
                placeholder="e.g. COPD"
              />
              <button
                type="button"
                onClick={() => { const v = diseaseInput.trim(); if (v && !diseases.includes(v)) { setDiseases([...diseases, v]); setDiseaseInput(''); } }}
                className="rounded-lg bg-black px-3 py-2 text-sm text-white disabled:opacity-60"
                disabled={!diseaseInput.trim()}
              >
                Add
              </button>
            </div>
            {diseases.length > 0 ? (
              <div className="mt-2 flex flex-wrap gap-2">
                {diseases.map((d) => (
                  <span key={d} className="inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs">
                    {d}
                    <button type="button" onClick={() => setDiseases(diseases.filter(x => x !== d))} aria-label={`Remove ${d}`}>×</button>
                  </span>
                ))}
              </div>
            ) : null}
          </div>

          <div>
            <label className="block text-sm text-gray-700 mb-1">Country (Europe)</label>
            <div className="relative">
              <select
                value={country}
                onChange={(e) => { setCountry(e.target.value); setCity(""); }}
                className="w-full appearance-none bg-none rounded-lg border border-gray-300 bg-white pr-10 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-200"
                style={{ WebkitAppearance: 'none', MozAppearance: 'none' }}
              >
                {countries.map((ctry) => (
                  <option key={ctry} value={ctry}>{ctry}</option>
                ))}
              </select>
              <svg className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 10.207l3.71-2.977a.75.75 0 11.94 1.172l-4.2 3.367a.75.75 0 01-.94 0l-4.2-3.367a.75.75 0 01-.08-1.192z" clipRule="evenodd" />
              </svg>
            </div>
          </div>

          <div>
            <label className="block text-sm text-gray-700 mb-1">City</label>
            <div className="relative">
              <select
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="w-full appearance-none bg-none rounded-lg border border-gray-300 bg-white pr-10 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-200"
                style={{ WebkitAppearance: 'none', MozAppearance: 'none' }}
              >
                <option value="">Select a city</option>
                {cities.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
              <svg className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 10.207l3.71-2.977a.75.75 0 11.94 1.172l-4.2 3.367a.75.75 0 01-.94 0l-4.2-3.367a.75.75 0 01-.08-1.192z" clipRule="evenodd" />
              </svg>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <label className="inline-flex items-center gap-2 text-sm text-gray-700">
              <input type="checkbox" checked={quit} onChange={(e) => setQuit(e.target.checked)} />
              Quit Smoking?
            </label>
            <div className="flex-1">
              <label className="sr-only">How long ago did you stop? (years)</label>
              <input
                type="number"
                min={0}
                step="0.5"
                value={stoppedAgoYears}
                onChange={(e) => setStoppedAgoYears(e.target.value)}
                disabled={!quit}
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-200 disabled:bg-gray-100"
                placeholder="How long ago did you stop? (years)"
              />
            </div>
          </div>

          <div>
            <button
              onClick={onCalculate}
              disabled={submitting || !canCalculate}
              className="rounded-lg bg-black px-4 py-2 text-sm text-white disabled:opacity-60"
            >
              {submitting ? 'Calculating...' : 'Calculate'}
            </button>
          </div>
            </>
          )}
        </div>

        {showInfo ? (
          <div className="fixed inset-0 z-[100] flex items-center justify-center">
            <div className="absolute inset-0 bg-black/40" onClick={() => setShowInfo(false)} />
            <div className="relative z-10 w-full max-w-lg rounded-2xl bg-white p-6 shadow-xl">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">How is this calculated?</h3>
              <div className="text-sm text-gray-700 space-y-2">
                <p>
                  This lifestyle risk score is calculated based on your smoking history, age, air quality exposure (e.g. PM2.5, NO2), and presence of comorbidities like asthma or diabetes. It is derived from research-backed logistic regression models used in public health studies, and reflects relative exposure to lung health risk factors.
                </p>
                <p className="text-xs text-gray-600 italic">
                  <strong>We do NOT provide a medical diagnosis or a percentage risk of lung cancer.</strong> This calculator is purely informational and based on publicly available health data correlations. Always consult your physician for clinical assessments.
                </p>
              </div>
              <button onClick={() => setShowInfo(false)} className="absolute right-3 top-3 h-8 w-8 rounded-full bg-gray-100 text-gray-700 hover:bg-gray-200">×</button>
            </div>
          </div>
        ) : null}
      </section>
    </main>);
}


