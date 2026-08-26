"use client";

import { motion } from "motion/react";
import {
  Gear,
  Database,
  Plug,
  Sparkle,
  CheckCircle,
} from "@phosphor-icons/react";

const services = [
  {
    id: 1,
    title: "Odoo ERP Entwicklung",
    description:
      "Custom Odoo-Module, Workflows, Reports und Multi-Company-Umgebungen. Architektur für komplexe Geschäftsprozesse in Produktions-, Handels- und Dienstleistungsunternehmen.",
    icon: Gear,
    highlight: true,
    useCases: ["Custom Modules", "Workflow Automation", "Multi-Company Design"],
  },
  {
    id: 2,
    title: "Python Backend & APIs",
    description:
      "Django, Flask und REST APIs für robuste Backend-Systeme. Datenbankdesign, Query-Optimierung und Third-Party-Integrationen.",
    icon: Database,
    useCases: ["Django/Flask", "REST APIs", "PostgreSQL"],
  },
  {
    id: 3,
    title: "Enterprise-Integrationen",
    description:
      "Anbindung von Odoo an externe Systeme (ERP, MES, QM, Zoll). Lobster Data Platform, Middleware-Design und ETL/ELT-Orchestrierung.",
    icon: Plug,
    highlight: true,
    useCases: [
      "System-to-System Integration",
      "Datenflow-Architektur",
      "API-Gateways",
    ],
  },
  {
    id: 4,
    title: "KI-Automation & Chatbots",
    description:
      "Intelligente Prozessautomation, Document Processing und KI-Assistenten. Integration mit Odoo und Django für adaptive Geschäftsprozesse.",
    icon: Sparkle,
    useCases: [
      "Workflow Automation",
      "Document Processing",
      "AI Integration",
    ],
  },
];

export function Services() {
  return (
    <section id="services" className="py-20 md:py-32 bg-surface">
      <div className="container-max">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="mb-16 max-w-3xl"
        >
          <span className="text-xs font-mono uppercase tracking-widest text-accent mb-4 inline-block">
            Kompetenzen
          </span>
          <h2 className="heading-lg mb-4">
            Spezialisiert auf Enterprise-Lösungen
          </h2>
          <p className="text-lg text-muted">
            Meine Expertise liegt in der Architektur komplexer, produktiver
            Systeme für Unternehmen mit anspruchsvollen Anforderungen.
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {services.map((service, idx) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                className={`p-8 rounded-xl border transition-all ${
                  service.highlight
                    ? "border-accent/50 bg-gradient-to-br from-accent/5 to-transparent"
                    : "border-border hover:border-accent/30"
                }`}
              >
                <div className="flex items-start gap-4 mb-4">
                  <div className="p-3 rounded-lg bg-accent/10">
                    <Icon size={24} className="text-accent" weight="bold" />
                  </div>
                  {service.highlight && (
                    <span className="text-xs font-mono uppercase tracking-widest text-accent mt-1">
                      Core
                    </span>
                  )}
                </div>

                <h3 className="heading-md mb-3">{service.title}</h3>
                <p className="text-muted mb-6 leading-relaxed">
                  {service.description}
                </p>

                {/* Use Cases */}
                <div className="space-y-2">
                  {service.useCases.map((useCase) => (
                    <div key={useCase} className="flex items-center gap-2">
                      <CheckCircle
                        size={16}
                        className="text-accent flex-shrink-0"
                      />
                      <span className="text-sm text-foreground">
                        {useCase}
                      </span>
                    </div>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Tech Stack */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16 pt-16 border-t border-border"
        >
          <h3 className="heading-md mb-6">Tech Stack</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: "Odoo 16", category: "ERP" },
              { label: "Python 3.12", category: "Backend" },
              { label: "Django / Flask", category: "Frameworks" },
              { label: "PostgreSQL", category: "Database" },
              { label: "REST APIs", category: "Integration" },
              { label: "Lobster Platform", category: "ETL/ELT" },
              { label: "Docker", category: "DevOps" },
              { label: "Git / Odoo.sh", category: "Tools" },
            ].map((tech) => (
              <div
                key={tech.label}
                className="p-4 rounded-lg bg-background border border-border text-center"
              >
                <div className="font-semibold text-foreground">
                  {tech.label}
                </div>
                <div className="text-xs text-muted mt-1">{tech.category}</div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
