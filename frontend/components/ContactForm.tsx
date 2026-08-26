"use client";

import { useState, useEffect } from "react";

type FormState = "idle" | "loading" | "success" | "error";

export function ContactForm() {
  const [isClient, setIsClient] = useState(false);
  const [formState, setFormState] = useState<FormState>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    phone: "",
    project_type: "Odoo",
    budget: "",
    timeframe: "",
    description: "",
  });

  // Hydration fix: only render form on client
  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormState("loading");
    setErrorMessage("");

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api";
      const response = await fetch(`${apiUrl}/contact/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || "Fehler beim Versenden der Anfrage");
      }

      const data = await response.json();
      setFormState("success");
      
      // Reset form
      setFormData({
        name: "",
        email: "",
        company: "",
        phone: "",
        project_type: "Odoo",
        budget: "",
        timeframe: "",
        description: "",
      });

      // Reset success message after 5 seconds
      setTimeout(() => setFormState("idle"), 5000);
    } catch (error) {
      setFormState("error");
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Ein Fehler ist aufgetreten. Bitte versuche es später erneut."
      );
    }
  };

  // Only render on client to prevent hydration mismatch
  if (!isClient) {
    return <div className="h-96" />;
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Name */}
      <div>
        <label className="block text-sm font-medium mb-2">Name *</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          minLength={2}
          className="w-full px-4 py-2 rounded-lg border border-border bg-surface text-foreground placeholder-muted focus:outline-none focus:ring-2 focus:ring-accent"
          placeholder="Dein Name"
        />
      </div>

      {/* Email */}
      <div>
        <label className="block text-sm font-medium mb-2">Email *</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 rounded-lg border border-border bg-surface text-foreground placeholder-muted focus:outline-none focus:ring-2 focus:ring-accent"
          placeholder="deine@email.com"
        />
      </div>

      {/* Company */}
      <div>
        <label className="block text-sm font-medium mb-2">Unternehmen</label>
        <input
          type="text"
          name="company"
          value={formData.company}
          onChange={handleChange}
          className="w-full px-4 py-2 rounded-lg border border-border bg-surface text-foreground placeholder-muted focus:outline-none focus:ring-2 focus:ring-accent"
          placeholder="Dein Unternehmen (optional)"
        />
      </div>

      {/* Phone */}
      <div>
        <label className="block text-sm font-medium mb-2">Telefon</label>
        <input
          type="tel"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          className="w-full px-4 py-2 rounded-lg border border-border bg-surface text-foreground placeholder-muted focus:outline-none focus:ring-2 focus:ring-accent"
          placeholder="+49 123 456789 (optional)"
        />
      </div>

      {/* Project Type */}
      <div>
        <label className="block text-sm font-medium mb-2">Projekttyp *</label>
        <select
          name="project_type"
          value={formData.project_type}
          onChange={handleChange}
          className="w-full px-4 py-2 rounded-lg border border-border bg-surface text-foreground focus:outline-none focus:ring-2 focus:ring-accent"
        >
          <option value="Odoo">Odoo</option>
          <option value="Python">Python</option>
          <option value="Django">Django</option>
          <option value="Flask">Flask</option>
          <option value="API / Integration">API / Integration</option>
          <option value="KI / Chatbot">KI / Chatbot</option>
          <option value="Automatisierung">Automatisierung</option>
          <option value="Digitalisierung">Digitalisierung</option>
          <option value="Andere">Andere</option>
        </select>
      </div>

      {/* Budget */}
      <div>
        <label className="block text-sm font-medium mb-2">Budget</label>
        <input
          type="text"
          name="budget"
          value={formData.budget}
          onChange={handleChange}
          className="w-full px-4 py-2 rounded-lg border border-border bg-surface text-foreground placeholder-muted focus:outline-none focus:ring-2 focus:ring-accent"
          placeholder="z.B. 5.000 - 10.000€ (optional)"
        />
      </div>

      {/* Timeframe */}
      <div>
        <label className="block text-sm font-medium mb-2">Zeitrahmen</label>
        <input
          type="text"
          name="timeframe"
          value={formData.timeframe}
          onChange={handleChange}
          className="w-full px-4 py-2 rounded-lg border border-border bg-surface text-foreground placeholder-muted focus:outline-none focus:ring-2 focus:ring-accent"
          placeholder="z.B. ASAP, innerhalb von 2 Wochen (optional)"
        />
      </div>

      {/* Description */}
      <div>
        <label className="block text-sm font-medium mb-2">Beschreibung *</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          required
          minLength={20}
          rows={5}
          className="w-full px-4 py-2 rounded-lg border border-border bg-surface text-foreground placeholder-muted focus:outline-none focus:ring-2 focus:ring-accent resize-none"
          placeholder="Beschreibe dein Projekt... (mindestens 20 Zeichen)"
        />
      </div>

      {/* Status Messages */}
      {formState === "success" && (
        <div className="p-4 rounded-lg bg-green-500/10 border border-green-500/30 text-green-500">
          ✅ Anfrage erfolgreich versendet! Ich werde mich bald bei dir melden.
        </div>
      )}

      {formState === "error" && (
        <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/30 text-red-500">
          ❌ {errorMessage}
        </div>
      )}

      {/* Submit Button */}
      <button
        type="submit"
        disabled={formState === "loading"}
        className="w-full px-6 py-3 rounded-lg bg-accent text-white font-medium hover:bg-accent-hover disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
      >
        {formState === "loading" ? "Wird versendet..." : "Anfrage versendet"}
      </button>
    </form>
  );
}
