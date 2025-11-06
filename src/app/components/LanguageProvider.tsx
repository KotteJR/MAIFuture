"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";

type Dict = Record<string, any>;

type LanguageContextType = {
  lang: "en" | "mk";
  setLang: (l: "en" | "mk") => void;
  t: (key: string) => string;
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

function flatten(obj: Dict, prefix = ""): Dict {
  return Object.entries(obj).reduce((acc, [k, v]) => {
    const key = prefix ? `${prefix}.${k}` : k;
    if (v && typeof v === "object") Object.assign(acc, flatten(v, key));
    else acc[key] = String(v ?? "");
    return acc;
  }, {} as Dict);
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<"en" | "mk">(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("lang");
      if (saved === "en" || saved === "mk") return saved;
    }
    return "en";
  });
  const [dict, setDict] = useState<Dict>({});

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch(`/i18n/${lang}.json`, { cache: 'no-store' });
        const json = await res.json();
        setDict(flatten(json));
        if (typeof window !== "undefined") localStorage.setItem("lang", lang);
        if (typeof document !== "undefined") document.documentElement.lang = lang;
      } catch {
        setDict({});
      }
    }
    load();
  }, [lang]);

  const t = useMemo(() => {
    return (key: string) => (dict[key] as string) ?? key;
  }, [dict]);

  const setLang = (l: "en" | "mk") => setLangState(l);

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>{children}</LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used within LanguageProvider");
  return ctx;
}


