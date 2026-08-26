"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { CheckCircle, WarningCircle } from "@phosphor-icons/react";

type FormState = "idle" | "loading" | "success" | "error";

export function Contact() {
  const [formState, setFormState] = useState<FormState>("idle");
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    projectType: "Odoo",
    budget: "",
    timeframe: "",
    description: "",
  });
  const [errorMessage, setErrorMessage] = useState("");

  const projectTypes = [
    "Odoo",
    "Python",
    "Django",
    "Flask",
    "API / Integration",
    "KI / Chatbot",
    "Automatisierung",
    "Digitalisierung",
    "Andere",
  ];

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormState("loading");
    setErrorMessage("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Fehler beim Absenden des Formulars");
      }

      setFormState("success");
      setFormData({
        name: "",
        company: "",
        email: "",
        phone: "",
        projectType: "Odoo",
        budget: "",
        timeframe: "",
        description: "",
      });

      setTimeout(() => setFormState("idle"), 5000);
    } catch (error) {
      setFormState("error");
      setErrorMessage(
        error instanceof Error ? error.message : "Ein Fehler ist aufgetreten"
      );
    }
  };

  return (
    <section id="contact" className="py-20 md:py-32 bg-background">
      <div className="container-max max-w-3xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="text-xs font-mono uppercase tracking-widest text-accent mb-4 inline-block">
            Kontakt
          </span>
          <h2 className="heading-lg mb-4">Lass uns ein Projekt starten</h2>
          <p className="text-lg text-muted">
            Sende mir eine Anfrage mit den Details zu deinem Projekt. Ich
            antworte in der Regel innerhalb von 24 Stunden.
          </p>
        </motion.div>

        {/* Form */}
        <motion.form
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          onSubmit={handleSubmit}
          className="space-y-6"
        >
          {/* Name & Company */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-foreground mb-2">
                Name *
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-surface border border-border rounded-lg text-foreground placeholder:text-muted focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent/50 transition-all"
                placeholder="Dein Name"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-foreground mb-2">
                Unternehmen
              </label>
              <input
                type="text"
                name="company"
                value={formData.company}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-surface border border-border rounded-lg text-foreground placeholder:text-muted focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent/50 transition-all"
                placeholder="Dein Unternehmen"
              />
            </div>
          </div>

          {/* Email & Phone */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-foreground mb-2">
                E-Mail *
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-surface border border-border rounded-lg text-foreground placeholder:text-muted focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent/50 transition-all"
                placeholder="deine.email@beispiel.de"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-foreground mb-2">
                Telefon
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-surface border border-border rounded-lg text-foreground placeholder:text-muted focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent/50 transition-all"
                placeholder="+49 1234 567890"
              />
            </div>
          </div>

          {/* Project Type */}
          <div>
            <label className="block text-sm font-semibold text-foreground mb-2">
              Projektart *
            </label>
            <select
              name="projectType"
              value={formData.projectType}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 bg-surface border border-border rounded-lg text-foreground focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent/50 transition-all"
            >
              {projectTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>

          {/* Budget & Timeframe */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-foreground mb-2">
                Budget (optional)
              </label>
              <input
                type="text"
                name="budget"
                value={formData.budget}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-surface border border-border rounded-lg text-foreground placeholder:text-muted focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent/50 transition-all"
                placeholder="z.B. €5.000 - €10.000"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-foreground mb-2">
                Zeitrahmen
              </label>
              <input
                type="text"
                name="timeframe"
                value={formData.timeframe}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-surface border border-border rounded-lg text-foreground placeholder:text-muted focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent/50 transition-all"
                placeholder="z.B. 3-6 Monate"
              />
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-semibold text-foreground mb-2">
              Projektbeschreibung *
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              rows={6}
              className="w-full px-4 py-3 bg-surface border border-border rounded-lg text-foreground placeholder:text-muted focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent/50 transition-all resize-none"
              placeholder="Beschreibe dein Projekt, deine Anforderungen und deine Ziele..."
            />
          </div>

          {/* Status Messages */}
          {formState === "success" && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg flex items-center gap-3"
            >
              <CheckCircle
                size={20}
                className="text-green-600 dark:text-green-400"
              />
              <span className="text-sm font-semibold text-green-900 dark:text-green-400">
                Erfolgreich versendet! Ich antworte bald.
              </span>
            </motion.div>
          )}

          {formState === "error" && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg flex items-center gap-3"
            >
              <WarningCircle
                size={20}
                className="text-red-600 dark:text-red-400"
              />
              <div className="flex-1">
                <span className="text-sm font-semibold text-red-900 dark:text-red-400 block">
                  Fehler beim Absenden
                </span>
                <span className="text-xs text-red-800 dark:text-red-500">
                  {errorMessage}
                </span>
              </div>
            </motion.div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={formState === "loading" || formState === "success"}
            className={`w-full py-3 font-semibold rounded-lg transition-all transform hover:-translate-y-0.5 ${
              formState === "success"
                ? "bg-accent/50 text-white cursor-not-allowed"
                : "bg-accent text-white hover:bg-accent-hover"
            }`}
          >
            {formState === "loading"
              ? "Wird versendet..."
              : formState === "success"
                ? "✓ Versendet"
                : "Anfrage absenden"}
          </button>
        </motion.form>

        {/* Alternative Contact */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-12 pt-12 border-t border-border text-center"
        >
          <p className="text-muted mb-4">Oder direkter Kontakt:</p>
          <div className="flex flex-col md:flex-row items-center justify-center gap-6">
            <a
              href="mailto:tadib24@gmail.com"
              className="text-accent hover:text-accent-hover font-semibold transition-colors"
            >
              tadib24@gmail.com
            </a>
            <span className="hidden md:inline text-border">•</span>
            <a
              href="tel:+491729337826"
              className="text-accent hover:text-accent-hover font-semibold transition-colors"
            >
              +49 1729 337826
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}