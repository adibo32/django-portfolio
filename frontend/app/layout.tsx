"use client";

import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { createContext, useState, useEffect, ReactNode } from "react";
import "./globals.css";

const geist = Geist({ subsets: ["latin"] });
const geist_mono = Geist_Mono({ subsets: ["latin"] });

// 1. Language Context erstellen
export const LanguageContext = createContext<{
  language: "de" | "en" | "ar" | "fr";
  setLanguage: (lang: "de" | "en" | "ar" | "fr") => void;
}>({
  language: "de",
  setLanguage: () => {},
});

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  // 2. Language State
  const [language, setLanguage] = useState<"de" | "en" | "ar" | "fr">("de");
  const [isClient, setIsClient] = useState(false);

  // 3. Language aus localStorage laden (nur Client-side)
  useEffect(() => {
    setIsClient(true);
    const savedLang = localStorage.getItem("language") as "de" | "en" | "ar" | "fr" | null;
    if (savedLang && ["de", "en", "ar", "fr"].includes(savedLang)) {
      setLanguage(savedLang);
    }
  }, []);

  // 4. Language in localStorage speichern bei Änderung
  const handleLanguageChange = (newLang: "de" | "en" | "ar" | "fr") => {
    setLanguage(newLang);
    localStorage.setItem("language", newLang);
  };

  // Keine Hydration-Fehler - nur html lang Attribut setzen wenn ready
  const htmlLang = isClient ? language : "de";

  return (
    <html lang={htmlLang}>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="Adib Tajouri | Odoo Developer & Python Backend Engineer" />
        <title>Adib Tajouri | Odoo Developer & Python Backend Engineer</title>
      </head>
      <body className={`${geist.className} ${geist_mono.className} min-h-screen flex flex-col bg-background text-foreground`}>
        {/* 5. LanguageContext.Provider um alle Components */}
        <LanguageContext.Provider value={{ language, setLanguage: handleLanguageChange }}>
          <div className="flex-1">{children}</div>
        </LanguageContext.Provider>
      </body>
    </html>
  );
}
