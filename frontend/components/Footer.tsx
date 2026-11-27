"use client";

import { GithubLogo, LinkedinLogo, EnvelopeSimple, FacebookLogo } from "@phosphor-icons/react";

export function Footer() {
  return (
    <footer className="border-t border-border bg-surface py-12 md:py-16">
      <div className="container-max">
        {/* Main Footer */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Branding */}
          <div>
            <h3 className="text-lg font-bold text-foreground mb-2">
              Adib Tajouri
            </h3>
            <p className="text-sm text-muted">
              Freelance Odoo Developer & Python Backend Engineer
            </p>
          </div>

          {/* Tech Stack */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-widest text-foreground mb-3">
              Tech Stack
            </h4>
            <p className="text-sm text-muted">
              Odoo · Python · Django · Flask · REST APIs · PostgreSQL · Docker
            </p>
          </div>

          {/* Location */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-widest text-foreground mb-3">
              Location
            </h4>
            <p className="text-sm text-muted">Düsseldorf, NRW · Offen für Remote</p>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-border my-8" />

        {/* Bottom Footer */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Copyright */}
          <div className="text-sm text-muted text-center md:text-left">
            © {new Date().getFullYear()} Adib Tajouri. Alle Rechte vorbehalten.
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-6">
            <a
              href="mailto:tadib24@gmail.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted hover:text-accent transition-colors"
              aria-label="Email"
            >
              <EnvelopeSimple size={20} />
            </a>
            <a
              href="https://github.com/adibo32"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted hover:text-accent transition-colors"
              aria-label="GitHub"
            >
              <GithubLogo size={20} />
            </a>
            <a
              href="https://www.linkedin.com/in/adib-tajouri-ba2768261/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted hover:text-accent transition-colors"
              aria-label="LinkedIn"
            >
              <LinkedinLogo size={20} />
            </a>
            <a
              href="https://www.facebook.com/tajouri.adib"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted hover:text-accent transition-colors"
              aria-label="Facebook"
            >
              <FacebookLogo size={20} />
            </a>
          </div>

          {/* Tech */}
          <div className="text-xs text-muted text-center md:text-right">
            Softwareentwickler aus Düsseldorf
          </div>
        </div>
      </div>
    </footer>
  );
}
