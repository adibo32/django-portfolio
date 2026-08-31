"use client";

import { useState } from "react";
import { useContext } from "react";
import { List, X } from "@phosphor-icons/react";
import { motion } from "motion/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LanguageContext } from "@/app/layout";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  
  // 1. Language aus dem GLOBAL Context holen (nicht lokal!)
  const { language, setLanguage } = useContext(LanguageContext);
  const pathname = usePathname();

  const navLinks = [
    { label: "Startseite", href: "/" },
    { label: "Über mich", href: "/about" },
    { label: "Kompetenzen", href: "/about#services" },
    { label: "Projekte", href: "/projects" },
    { label: "Kontakt", href: "/contact" },
  ];

  // 2. Sprachen mit Flag-Icons
  const languages = [
    { code: "de", flag: "🇩🇪", label: "Deutsch" },
    { code: "en", flag: "🇬🇧", label: "English" },
    { code: "ar", flag: "🇸🇦", label: "العربية" },
    { code: "fr", flag: "🇫🇷", label: "Français" },
  ] as const;

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href.split("#")[0]);
  };

  return (
    <nav className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="container-max flex items-center justify-between h-16">
        {/* Logo mit neuem Text */}
        <Link
          href="/"
          className="text-lg font-bold text-foreground hover:text-accent transition-colors"
        >
          Adib-dev
        </Link>

        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className={`text-sm transition-colors ${
                isActive(link.href)
                  ? "text-accent font-semibold"
                  : "text-muted hover:text-foreground"
              }`}
            >
              {link.label}
            </Link>
          ))}

          {/* 3. Language Selector mit Flags */}
          <div className="flex items-center gap-2 ml-4 pl-4 border-l border-border">
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => setLanguage(lang.code as "de" | "en" | "ar" | "fr")}
                title={lang.label}
                className={`text-lg px-2 py-1 rounded transition-all ${
                  language === lang.code
                    ? "bg-accent/20 text-accent scale-110"
                    : "text-muted hover:text-foreground"
                }`}
              >
                {lang.flag}
              </button>
            ))}
          </div>

          <Link
            href="/contact"
            className="text-sm px-4 py-2 bg-accent text-white rounded-lg hover:bg-accent-hover transition-colors"
          >
            Projekt starten
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2 text-foreground"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={24} /> : <List size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="md:hidden border-t border-border bg-surface"
        >
          <div className="container-max py-4 flex flex-col gap-4">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className={`text-sm transition-colors ${
                  isActive(link.href)
                    ? "text-accent font-semibold"
                    : "text-muted hover:text-foreground"
                }`}
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </Link>
            ))}

            {/* Mobile Language Selector */}
            <div className="flex items-center gap-2 pt-4 border-t border-border">
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => {
                    setLanguage(lang.code as "de" | "en" | "ar" | "fr");
                    setIsOpen(false);
                  }}
                  title={lang.label}
                  className={`text-lg px-2 py-1 rounded transition-all ${
                    language === lang.code
                      ? "bg-accent/20 text-accent scale-110"
                      : "text-muted hover:text-foreground"
                  }`}
                >
                  {lang.flag}
                </button>
              ))}
            </div>

            <Link
              href="/contact"
              className="text-sm px-4 py-2 bg-accent text-white rounded-lg hover:bg-accent-hover transition-colors text-center"
              onClick={() => setIsOpen(false)}
            >
              Projekt starten
            </Link>
          </div>
        </motion.div>
      )}
    </nav>
  );
}
