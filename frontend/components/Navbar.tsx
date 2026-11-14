"use client";

import { useState } from "react";
import { useContext } from "react";
import { List, X } from "@phosphor-icons/react";
import { motion } from "motion/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LanguageContext } from "@/app/layout";
import { useTranslation } from "@/lib/useTranslation";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  // 1. Language aus dem GLOBAL Context holen (nicht lokal!)
  const { language, setLanguage } = useContext(LanguageContext);
  const t = useTranslation().nav;
  const pathname = usePathname();

  const navLinks = [
    { label: t.home, href: "/" },
    { label: t.about, href: "/about" },
    { label: t.skills, href: "/#kompetenzen" },
    { label: t.projects, href: "/#projekte" },
    { label: t.contact, href: "/contact" },
  ];

  // 2. Sprachen mit Flag-Icons
  const languages = [
    { code: "de", flag: "🇩🇪", label: "Deutsch" },
    { code: "en", flag: "🇬🇧", label: "English" },
    { code: "ar", flag: "🇸🇦", label: "العربية" },
    { code: "fr", flag: "🇫🇷", label: "Français" },
  ] as const;

  // Links mit Anker (#) sind nie "aktiv", sonst leuchtet die Startseite doppelt.
  const isActive = (href: string) => {
    if (href.includes("#")) return false;
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <nav className="sticky top-0 z-50 border-b border-border bg-background/70 backdrop-blur-xl">
      <div className="container-max flex h-[72px] items-center justify-between">
        <Link
          href="/"
          className="text-xl font-bold tracking-[-0.02em] text-white hover:text-accent"
        >
          Adib-dev
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-[15px] transition-colors ${
                isActive(link.href)
                  ? "font-semibold text-accent"
                  : "text-muted hover:text-white"
              }`}
            >
              {link.label}
            </Link>
          ))}

          {/* 3. Language Selector mit Flags */}
          <div className="ml-2 flex items-center gap-2 border-l border-border pl-4">
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => setLanguage(lang.code as "de" | "en" | "ar" | "fr")}
                title={lang.label}
                className={`rounded px-2 py-1 text-lg transition-all ${
                  language === lang.code
                    ? "scale-110 bg-accent/20 text-accent"
                    : "text-muted hover:text-white"
                }`}
              >
                {lang.flag}
              </button>
            ))}
          </div>

          <Link
            href="/contact"
            className="btn glass rounded-full px-5 py-2.5 text-sm font-medium text-white"
          >
            {t.cta}
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="p-2 text-white md:hidden"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
          aria-expanded={isOpen}
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
          className="border-t border-border bg-surface md:hidden"
        >
          <div className="container-max flex flex-col gap-4 py-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm transition-colors ${
                  isActive(link.href)
                    ? "font-semibold text-accent"
                    : "text-muted hover:text-white"
                }`}
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </Link>
            ))}

            {/* Mobile Language Selector */}
            <div className="flex items-center gap-2 border-t border-border pt-4">
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => {
                    setLanguage(lang.code as "de" | "en" | "ar" | "fr");
                    setIsOpen(false);
                  }}
                  title={lang.label}
                  className={`rounded px-2 py-1 text-lg transition-all ${
                    language === lang.code
                      ? "scale-110 bg-accent/20 text-accent"
                      : "text-muted hover:text-white"
                  }`}
                >
                  {lang.flag}
                </button>
              ))}
            </div>

            <Link
              href="/contact"
              className="rounded-full bg-accent px-4 py-2.5 text-center text-sm font-semibold text-accent-ink"
              onClick={() => setIsOpen(false)}
            >
              {t.cta}
            </Link>
          </div>
        </motion.div>
      )}
    </nav>
  );
}
