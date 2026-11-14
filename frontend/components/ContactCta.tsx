"use client";

import Link from "next/link";
import { useTranslation } from "@/lib/useTranslation";

export function ContactCta() {
  const t = useTranslation().home.cta;

  return (
    <section className="container-max pb-24">
      <div className="glass relative overflow-hidden rounded-[32px] px-10 py-[72px] text-center">
        <div className="blob b1 -left-24 -top-52 size-[480px] bg-accent opacity-25 blur-[110px]" />
        <div
          className="blob b2 -bottom-56 -right-20 size-[420px] bg-accent opacity-20"
          style={{ filter: "blur(110px) hue-rotate(55deg)" }}
        />
        <div className="relative">
          <h2 className="mx-auto mb-4 max-w-[640px] text-[clamp(32px,4.4vw,56px)] font-semibold leading-[1.05] tracking-[-0.04em] text-white">
            {t.title}
          </h2>
          <p className="mx-auto mb-9 max-w-[480px] text-lg leading-[1.55] text-muted">
            {t.text}
          </p>
          <Link
            href="/contact"
            className="btn inline-block whitespace-nowrap rounded-full bg-accent px-[34px] py-4 text-base font-semibold text-accent-ink shadow-[0_10px_40px_-10px_var(--accent)]"
          >
            {t.button}
          </Link>
          <p className="mt-7 font-mono text-sm text-[#8a978f]">
            tadib24@gmail.com
          </p>
        </div>
      </div>
    </section>
  );
}
