"use client";

import { ArrowDown } from "@phosphor-icons/react";
import { motion } from "motion/react";
import Link from "next/link";
import { useTranslation } from "@/lib/useTranslation";

export function Hero() {
  const t = useTranslation();

  return (
    <section className="relative min-h-[100dvh] flex items-center justify-center pt-20 md:pt-0 px-4">
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-20 right-10 w-72 h-72 bg-accent/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-10 w-72 h-72 bg-accent/5 rounded-full blur-3xl" />
      </div>

      <div className="container-max max-w-4xl text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="text-xs font-mono uppercase tracking-widest text-accent mb-4 inline-block">
            {t.hero.badge}
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="heading-hero mb-6 text-balance"
        >
          {t.hero.title}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-lg text-muted mb-12 max-w-2xl mx-auto leading-relaxed"
        >
          {t.hero.description}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
        >
          <Link
            href="/contact"
            className="px-8 py-3 bg-accent text-white rounded-lg hover:bg-accent-hover transition-colors font-semibold"
          >
            {t.hero.cta1}
          </Link>
          <Link
            href="/projects"
            className="px-8 py-3 border border-accent text-accent rounded-lg hover:bg-accent/10 transition-colors font-semibold"
          >
            {t.hero.cta2}
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex justify-center"
        >
          <ArrowDown size={24} className="text-accent animate-bounce" />
        </motion.div>
      </div>
    </section>
  );
}
