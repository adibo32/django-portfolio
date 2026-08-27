"use client";

import { useContext } from "react";
import { LanguageContext } from "@/app/layout";
import { translations } from "./translations";

export function useTranslation() {
  const { language } = useContext(LanguageContext);
  
  return translations[language];
}
