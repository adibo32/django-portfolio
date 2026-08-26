"use client";

import { ArrowDown } from "@phosphor-icons/react";
import { motion } from "motion/react";

export function Hero() {
  return (
    <section className="relative min-h-[100dvh] flex items-center overflow-hidden bg-gradient-to-br from-background via-surface to-background">
      {/* Animated Grid Background */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5" />

      <div className="container-max relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left: Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            {/* Eyebrow */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="inline-block mb-6"
            >
              <span className="text-xs font-mono uppercase tracking-widest text-accent">
                Odoo · Python · Enterprise Integration
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="heading-hero mb-6 text-balance"
            >
              Digitale Lösungen für Unternehmen, die mehr aus ihrer Technologie machen wollen
            </motion.h1>

            {/* Subheading */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-lg text-muted mb-8 max-w-md leading-relaxed"
            >
              Ich entwickle maßgeschneiderte Odoo-Lösungen, Python-Backends und Enterprise-Integrationen für komplexe Geschäftsprozesse. Von ERP-Anpassungen bis zu REST APIs – skalierbar, produktiv und wartbar.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <a
                href="#contact"
                className="px-8 py-3 bg-accent text-white font-semibold rounded-lg hover:bg-accent-hover transition-all transform hover:-translate-y-0.5 shadow-lg hover:shadow-xl text-center"
              >
                Projekt besprechen
              </a>
              <a
                href="#projects"
                className="px-8 py-3 border-2 border-accent text-accent font-semibold rounded-lg hover:bg-accent/10 transition-all text-center"
              >
                Projekte ansehen
              </a>
            </motion.div>
          </motion.div>

          {/* Right: Visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative h-80 lg:h-96"
          >
            <div className="relative w-full h-full rounded-2xl overflow-hidden bg-gradient-to-br from-accent/20 to-accent/5 border border-accent/30 flex items-center justify-center">
              {/* Placeholder: Professional graphics space */}
              <div className="text-center text-muted">
                <div className="text-5xl mb-2">⚙️</div>
                <p className="text-sm">Enterprise Integration</p>
              </div>
            </div>

            {/* Decorative Elements */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="absolute -bottom-10 -right-10 w-40 h-40 border border-accent/20 rounded-full opacity-50"
            />
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <ArrowDown size={20} className="text-accent" />
      </motion.div>
    </section>
  );
}
