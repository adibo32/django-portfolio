import { useContext, createContext, ReactNode } from "react";
import { translations } from "./translations";

type Language = "de" | "en" | "ar" | "fr";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

export const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function useTranslation() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useTranslation must be used within LanguageProvider");
  }
  return context;
}

export function getTranslation(lang: Language, keyPath: string): string {
  const keys = keyPath.split(".");
  let value: any = translations[lang];

  for (const key of keys) {
    value = value?.[key];
  }

  return value || keyPath;
}
