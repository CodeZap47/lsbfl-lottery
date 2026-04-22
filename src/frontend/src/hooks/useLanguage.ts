import type { Language } from "@/types";
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from "react";

interface LanguageContextValue {
  lang: Language;
  toggleLang: () => void;
  t: (es: string, en: string) => string;
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({
  children,
}: {
  children: ReactNode;
}): React.ReactElement {
  const [lang, setLang] = useState<Language>(() => {
    const stored = localStorage.getItem("lsbfl-lang");
    return stored === "en" || stored === "es" ? stored : "es";
  });

  useEffect(() => {
    localStorage.setItem("lsbfl-lang", lang);
    document.documentElement.lang = lang;
  }, [lang]);

  const toggleLang = () => setLang((l) => (l === "es" ? "en" : "es"));
  const t = (es: string, en: string) => (lang === "es" ? es : en);

  return React.createElement(
    LanguageContext.Provider,
    { value: { lang, toggleLang, t } },
    children,
  );
}

export function useLanguage(): LanguageContextValue {
  const ctx = useContext(LanguageContext);
  if (!ctx)
    throw new Error("useLanguage must be used inside <LanguageProvider>");
  return ctx;
}
