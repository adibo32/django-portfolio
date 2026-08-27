"use client";

import { motion } from "motion/react";
import Link from "next/link";
import { ArrowRight, Github } from "@phosphor-icons/react";

export function Projects() {
  const projects = [
    {
      id: 1,
      category: "EMKA Beschlagteile",
      title: "Lobster Data Platform Integration",
      description:
        "Enterprise-Integration für EMKA: Odoo ↔️ externe Systeme (Babtec, AEB, EZB, JFE) mit Delta-Sync und Real-Time Orchestration.",
      tags: ["Odoo 16", "Lobster", "Python", "REST API", "ETL"],
      link: "#",
      image: "/projects/emka-lobster.jpg",
    },
    {
      id: 2,
      category: "Open Source / Portfolio",
      title: "Bauprojekt-Verwaltung",
      description:
        "Full-Stack Anwendung für Bauunternehmen: Projektverwaltung, Ressourcenplanung und Kostentracking mit React & Django.",
      tags: ["React", "Django", "PostgreSQL", "REST API"],
      link: "https://github.com/adibo32/bauprojekt-verwaltung",
      github: true,
    },
    {
      id: 3,
      category: "Open Source / Portfolio",
      title: "Reservierungs-System",
      description:
        "Modernes Booking-System mit real-time Verfügbarkeit, Zahlungsintegration und Admin-Dashboard.",
      tags: ["Next.js", "Python", "Stripe", "WebSockets"],
      link: "https://github.com/adibo32/reservierungs-system",
      github: true,
    },
  ];

  return (
    <section className="py-20 md:py-32 bg-surface/50">
      <div className="container-max">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group bg-background border border-border rounded-xl overflow-hidden hover:border-accent transition-all hover:shadow-lg"
            >
              {project.image && (
                <div className="w-full h-48 bg-surface overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                  />
                </div>
              )}

              <div className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-semibold text-accent uppercase tracking-wider">
                    {project.category}
                  </span>
                  {project.github && (
                    <Github size={16} className="text-muted" />
                  )}
                </div>

                <h3 className="text-lg font-bold text-foreground mb-3 group-hover:text-accent transition-colors">
                  {project.title}
                </h3>

                <p className="text-sm text-muted mb-4 leading-relaxed">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs px-2 py-1 bg-accent/10 text-accent rounded-md"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <Link
                  href={project.link}
                  className="inline-flex items-center gap-2 text-accent hover:text-accent-hover transition-colors group/link"
                >
                  {project.github ? "Auf GitHub anschauen" : "Mehr erfahren"}
                  <ArrowRight
                    size={16}
                    className="group-hover/link:translate-x-1 transition-transform"
                  />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-16 text-center"
        >
          <p className="text-muted mb-6">
            Möchtest du dein Projekt mit mir realisieren?
          </p>
          <Link
            href="/contact"
            className="inline-block px-8 py-3 bg-accent text-white rounded-lg hover:bg-accent-hover transition-colors font-semibold"
          >
            Projekt besprechen →
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
