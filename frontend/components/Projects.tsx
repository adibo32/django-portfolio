"use client";

import { motion } from "motion/react";
import { ArrowUpRight } from "@phosphor-icons/react";

const projects = [
  {
    id: 1,
    title: "Multi-Company Odoo ERP Architektur",
    challenge:
      "Komplexe ERP-Umgebung für internationale 33-Gesellschaften-Struktur mit unterschiedlichen Geschäftsmodellen (Produktion, Handel, Dienstleistung).",
    solution:
      "Architektur von 10+ Custom-Modulen für Vertrieb, Einkauf, Lagerbestand, Fertigung und Reporting. Multi-Company-Design mit Berechtigungsverwaltung und konsolidiertem Reporting.",
    impact: "Einheitliches ERP über alle Gesellschaften, standardisierte Prozesse, reduzierte Manualbearbeitung um 60%.",
    tech: ["Odoo 16", "Python 3.12", "PostgreSQL", "XML-RPC", "Git"],
    highlight: true,
  },
  {
    id: 2,
    title: "Enterprise-System-Integration (5 Systeme)",
    challenge:
      "Anbindung von Odoo 16 an 5 externe Enterprise-Systeme: Babtec QM, AEB Zoll, CANIAS MES, Hydra MES, JFE.",
    solution:
      "Design und Implementierung über Lobster Data Platform. Vollständige Verantwortung für Architekturentscheidung, Profildesign, Fehleranalyse und Go-Live. ETL/ELT-Orchestrierung mit Fehlerbehandlung.",
    impact: "Automatisierte Datenflüsse zwischen ERP und Spezialsystemen, Echtzeit-Daten, keine manuellen Transfers mehr.",
    tech: [
      "Lobster Data Platform",
      "REST APIs",
      "XML",
      "JSON",
      "Middleware Design",
    ],
    highlight: true,
  },
  {
    id: 3,
    title: "Kritischer Pricing-Bug Fix (Datenbene)",
    challenge:
      "Systemweiter Pricing-Bug auf Code- und Datenbene, Risiko von Fehlbuchungen in der unternehmensweiten Abrechnungsinfrastruktur für 33 Gesellschaften.",
    solution:
      "Eigenständige Diagnose und Behebung des Bugs. Analyse von Quellcode, ORM-Verhalten und Datenkonsistenz. Datenbereinigung und Verifikation.",
    impact:
      "Fehlerrisiko vollständig abgewendet, Datenbankintegrität wiederhergestellt, Vertrauen in ERP-Korrektheit.",
    tech: ["Python", "ORM Debugging", "SQL", "Data Integrity"],
  },
  {
    id: 4,
    title: "Externe Entwickler-Qualitätssicherung",
    challenge:
      "Steuerung und Qualitätssicherung externer Entwicklungspartner für Odoo-Module. Sicherstellung von Codequalität und Release-Stabilität.",
    solution:
      "Strukturierte Code Reviews, technische Abnahmen, Konventionen-Durchsetzung. Zentrale Ansprechpartner-Rolle für ERP-Architekturentscheidungen.",
    impact:
      "Konsistente Code-Qualität, zuverlässige Releases, reduzierte technische Schulden.",
    tech: ["Code Review", "Testing", "Conventions", "Best Practices"],
  },
];

export function Projects() {
  return (
    <section id="projects" className="py-20 md:py-32 bg-background">
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
            Arbeiten
          </span>
          <h2 className="heading-lg mb-4">
            Realisierte Enterprise-Projekte
          </h2>
          <p className="text-lg text-muted">
            Aktuelle Projekte bei EMKA Beschlagteile – ein industrieller Mittelsäger mit globaler Präsenz und anspruchsvollen Systemanforderungen.
          </p>
        </motion.div>

        {/* Projects List */}
        <div className="space-y-8">
          {projects.map((project, idx) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, delay: idx * 0.05 }}
              className={`p-8 rounded-xl border transition-all ${
                project.highlight
                  ? "border-accent/50 bg-gradient-to-br from-accent/5 to-transparent"
                  : "border-border bg-surface hover:border-accent/30"
              }`}
            >
              {/* Header */}
              <div className="flex items-start justify-between gap-4 mb-6">
                <div className="flex-1">
                  <h3 className="heading-md text-balance">{project.title}</h3>
                </div>
                {project.highlight && (
                  <div className="flex-shrink-0 px-3 py-1 bg-accent/20 text-accent text-xs font-mono uppercase tracking-widest rounded-full">
                    Featured
                  </div>
                )}
              </div>

              {/* Challenge / Solution / Impact */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-6">
                <div>
                  <h4 className="text-sm font-semibold text-muted uppercase tracking-wider mb-2">
                    Challenge
                  </h4>
                  <p className="text-foreground leading-relaxed">
                    {project.challenge}
                  </p>
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-muted uppercase tracking-wider mb-2">
                    Lösung
                  </h4>
                  <p className="text-foreground leading-relaxed">
                    {project.solution}
                  </p>
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-muted uppercase tracking-wider mb-2">
                    Outcome
                  </h4>
                  <p className="text-foreground leading-relaxed">
                    {project.impact}
                  </p>
                </div>
              </div>

              {/* Tech Stack */}
              <div className="flex flex-wrap gap-2">
                {project.tech.map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1 bg-background border border-border rounded-full text-xs text-foreground"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-16 text-center"
        >
          <p className="text-muted mb-6">
            Interessiert an einem ähnlichen Projekt?
          </p>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 px-8 py-3 bg-accent text-white font-semibold rounded-lg hover:bg-accent-hover transition-all transform hover:-translate-y-0.5"
          >
            Projekt besprechen
            <ArrowUpRight size={18} />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
