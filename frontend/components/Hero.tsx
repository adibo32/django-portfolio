"use client";

import Link from "next/link";
import { useTranslation } from "@/lib/useTranslation";
import { Orbit } from "@/components/Orbit";

export function Hero() {
  const t = useTranslation().home.hero;

  return (
    <section className="relative overflow-hidden">
      <div className="blob b1 -left-40 -top-64 size-[720px] bg-accent opacity-30 blur-[130px]" />
      <div
        className="blob b2 -right-32 -top-44 size-[640px] bg-accent opacity-20 blur-[120px]"
        style={{ filter: "blur(120px) hue-rotate(55deg)" }}
      />
      <div
        className="blob b3 left-[38%] top-44 size-[520px] bg-accent opacity-15 blur-[110px]"
        style={{ filter: "blur(110px) hue-rotate(-40deg)" }}
      />
      <div className="gridlines" />

      <div className="container-max relative grid items-center gap-10 pb-24 pt-16 md:grid-cols-[1.1fr_0.9fr] md:pb-28">
        <div>
          <span className="glass rise-1 inline-flex items-center gap-2.5 rounded-full px-4 py-[7px] font-mono text-[13px] text-[#cfd8d3]">
            <span className="dot text-accent" />
            {t.badge}
          </span>
          <h1 className="rise-1 mt-7 text-[clamp(38px,5.2vw,70px)] font-semibold leading-[1.04] tracking-[-0.045em] text-white">
            {t.titleStart}
            <span className="shimmer-text">{t.titleAccent}</span>
            {t.titleEnd}
          </h1>
          <p className="rise-2 mt-7 max-w-[540px] text-xl leading-[1.55] text-muted">
            {t.description}
          </p>
          <div className="rise-3 mt-10 flex flex-wrap gap-3.5">
            <Link
              href="/contact"
              className="btn whitespace-nowrap rounded-full bg-accent px-[30px] py-4 text-base font-semibold text-accent-ink shadow-[0_10px_40px_-10px_var(--accent)]"
            >
              {t.cta1}
            </Link>
            <Link
              href="/#projekte"
              className="btn glass whitespace-nowrap rounded-full px-[30px] py-4 text-base font-medium text-white"
            >
              {t.cta2}
            </Link>
          </div>
        </div>

        <div className="hidden justify-center md:flex">
          <Orbit />
        </div>
      </div>
    </section>
  );
}
