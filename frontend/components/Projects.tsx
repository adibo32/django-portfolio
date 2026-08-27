"use client";

import { useTranslation } from "@/lib/useTranslation";
import { motion } from "motion/react";
import { GithubLogo, ExternalLink } from "@phosphor-icons/react";
import Link from "next/link";

export function Projects() {
  const t = useTranslation();

  const projects = [
    {
      title: "EMKA - Lagerverwaltung",
      description: "Enterprise Lagerverwaltungssystem mit Odoo ERP",
      technologies: ["Odoo 16", "Python", "PostgreSQL"],
      github: "https://github.com/yourusername/emka-project",
    },
  ];

  return (
    <section className="py-20 md:py-32 bg-surface">
      <div className="container-max">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="heading-lg mb-4"
        >
          {t.projects.title}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-lg text-muted mb-12 max-w-2xl"
        >
          {t.projects.description}
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((project, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 + idx * 0.1 }}
              className="p-6 bg-background border border-border rounded-lg hover:border-accent transition-colors"
            >
              <h3 className="text-xl font-bold mb-2">{project.title}</h3>
              <p className="text-muted mb-4">{project.description}</p>
              
              <div className="flex flex-wrap gap-2 mb-4">
                {project.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="text-xs px-3 py-1 bg-accent/10 text-accent rounded-full"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-accent hover:text-accent-hover transition-colors"
              >
                <GithubLogo size={18} />
                GitHub
                <ExternalLink size={14} />
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
