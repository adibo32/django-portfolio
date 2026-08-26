"use client";

import { motion } from "motion/react";
import { CheckCircle } from "@phosphor-icons/react";

export function About() {
  const highlights = [
    { label: "5+ Jahre", desc: "Software Development Experience" },
    { label: "2+ Jahre", desc: "Odoo 16 Spezialisierung" },
    {
      label: "33 Gesellschaften",
      desc: "Multi-Company ERP-Erfahrung",
    },
    {
      label: "5 Enterprise-Systeme",
      desc: "Komplexe Integrationen",
    },
  ];

  return (
    <section id="about" className="py-20 md:py-32 bg-surface">
      <div className="container-max">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left: Metrics */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-xs font-mono uppercase tracking-widest text-accent mb-4 inline-block">
              Profil
            </span>
            <h2 className="heading-lg mb-8">
              Enterprise-Entwickler mit breiter Expertise
            </h2>

            <div className="space-y-4 mb-8">
              {highlights.map((item) => (
                <div key={item.label} className="flex gap-4">
                  <CheckCircle
                    size={24}
                    className="text-accent flex-shrink-0 mt-1"
                  />
                  <div>
                    <div className="font-bold text-foreground text-lg">
                      {item.label}
                    </div>
                    <div className="text-muted text-sm">{item.desc}</div>
                  </div>
                </div>
              ))}
            </div>

            <div className="prose prose-invert max-w-none text-muted space-y-4">
              <p>
                Ich bin ein ergebnisorientierter Entwickler mit Fokus auf
                Odoo-Lösungen und Python-Backend-Systeme. Meine Stärke liegt
                darin, komplexe ERP-Anforderungen in skalierbare, wartbare
                Architekturen zu übersetzen.
              </p>
              <p>
                Bei EMKA arbeite ich als Odoo Developer & Integration Lead und
                bin verantwortlich für die Architektur und Umsetzung von 10+
                Custom-Modulen sowie die technische Leitung von
                Enterprise-Integrationen mit externen Systemen.
              </p>
            </div>
          </motion.div>

          {/* Right: Skills */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="space-y-8"
          >
            {/* Skill Groups */}
            {[
              {
                title: "ERP & Plattform",
                items: [
                  "Odoo 16 (Custom Module, ORM, QWeb, Odoo.sh)",
                  "Multi-Company-Design",
                  "SAP DMS",
                ],
              },
              {
                title: "Backend & APIs",
                items: [
                  "Python 3.12",
                  "Django, Flask",
                  "REST API Design",
                  "PostgreSQL",
                ],
              },
              {
                title: "Integration & Middleware",
                items: [
                  "Lobster Data Platform (ETL/ELT)",
                  "REST/XML-RPC APIs",
                  "System-to-System Integration",
                  "Middleware-Architektur",
                ],
              },
              {
                title: "DevOps & Tools",
                items: [
                  "Git, Odoo.sh",
                  "Docker",
                  "Agile / Scrum",
                  "Postman, VS Code",
                ],
              },
            ].map((group) => (
              <div key={group.title}>
                <h3 className="text-sm font-semibold uppercase tracking-widest text-accent mb-3">
                  {group.title}
                </h3>
                <ul className="space-y-2">
                  {group.items.map((item) => (
                    <li
                      key={item}
                      className="flex items-center gap-2 text-foreground"
                    >
                      <span className="w-1.5 h-1.5 bg-accent rounded-full" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            {/* Languages */}
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-widest text-accent mb-3">
                Sprachen
              </h3>
              <ul className="space-y-2">
                {[
                  "Deutsch (Muttersprache)",
                  "Arabisch (Muttersprache)",
                  "Englisch (C1)",
                  "Französisch (C1)",
                ].map((lang) => (
                  <li
                    key={lang}
                    className="flex items-center gap-2 text-foreground"
                  >
                    <span className="w-1.5 h-1.5 bg-accent rounded-full" />
                    {lang}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
