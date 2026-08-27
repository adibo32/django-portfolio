"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { List, X } from "@phosphor-icons/react";
import { motion } from "motion/react";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [currentLang, setCurrentLang] = useState("de");
  const [showLangMenu, setShowLangMenu] = useState(false);
  const pathname = usePathname();

  const navLinks = [
    { label: "Home", href: "/" },
    { label: "Über mich", href: "/about" },
    { label: "Projekte", href: "/projects" },
    { label: "Kontakt", href: "/contact" },
  ];

  const languages = [
    { code: "de", name: "Deutsch", flag: "🇩🇪" },
    { code: "en", name: "English", flag: "🇬🇧" },
    { code: "ar", name: "العربية", flag: "🇸🇦" },
    { code: "fr", name: "Français", flag: "🇫🇷" },
  ];

  // Sprache aus localStorage laden
  useEffect(() => {
    const saved = localStorage.getItem("language");
    if (saved) setCurrentLang(saved);
  }, []);

  const handleLanguageChange = (lang: string) => {
    setCurrentLang(lang);
    localStorage.setItem("language", lang);
    setShowLangMenu(false);
  };

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <nav className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="container-max flex items-center justify-between h-16">
        {/* Logo */}
        <Link
          href="/"
          className="font-bold text-xl text-accent hover:text-accent-hover transition-colors"
        >
          Adib-dev
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-sm font-medium transition-colors ${
                isActive(link.href)
                  ? "text-accent"
                  : "text-foreground hover:text-accent"
              }`}
            >
              {link.label}
            </Link>
          ))}

          {/* CTA Button */}
          <Link
            href="/contact"
            className="px-6 py-2 bg-accent text-white font-semibold rounded-lg hover:bg-accent-hover transition-colors"
          >
            Projekt starten
          </Link>

          {/* Language Selector */}
          <div className="relative">
            <button
              onClick={() => setShowLangMenu(!showLangMenu)}
              className="text-lg hover:text-accent transition-colors"
              title="Sprache wechseln"
            >
              {languages.find(l => l.code === currentLang)?.flag}
            </button>
            {showLangMenu && (
              <div className="absolute right-0 mt-2 w-40 bg-surface border border-border rounded-lg shadow-lg z-50">
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => handleLanguageChange(lang.code)}
                    className="w-full text-left px-4 py-2 hover:bg-background transition-colors flex items-center gap-2"
                  >
                    <span>{lang.flag}</span>
                    <span className="text-sm">{lang.name}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden p-2 text-foreground hover:text-accent transition-colors"
          aria-label="Toggle menu"
        >
          {isOpen ? (
            <X size={24} weight="bold" />
          ) : (
            <List size={24} weight="bold" />
          )}
        </button>

        {/* Mobile Navigation */}
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute top-full left-0 right-0 bg-background border-b border-border md:hidden"
          >
            <div className="container-max py-4 flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-sm font-medium transition-colors ${
                    isActive(link.href)
                      ? "text-accent"
                      : "text-foreground hover:text-accent"
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  {link.label}
                </Link>
              ))}

              {/* Mobile CTA */}
              <Link
                href="/contact"
                className="px-6 py-2 bg-accent text-white font-semibold rounded-lg hover:bg-accent-hover transition-colors text-center"
                onClick={() => setIsOpen(false)}
              >
                Projekt starten
              </Link>

              {/* Mobile Language Selector */}
              <div className="border-t border-border pt-4">
                <p className="text-xs font-semibold text-muted mb-2">Sprache:</p>
                <div className="flex gap-2">
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => handleLanguageChange(lang.code)}
                      className={`flex-1 py-2 px-3 rounded text-sm font-medium transition-colors ${
                        currentLang === lang.code
                          ? "bg-accent text-white"
                          : "bg-surface hover:bg-background"
                      }`}
                    >
                      {lang.flag}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </nav>
  );
}
