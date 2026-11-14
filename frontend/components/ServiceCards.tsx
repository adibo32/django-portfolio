"use client";

import Link from "next/link";
import { ArrowRight } from "@phosphor-icons/react";
import { Logo, type LogoName } from "@/lib/logos";
import { useTranslation } from "@/lib/useTranslation";

type Key = "fullstack" | "erp" | "api" | "ai";

const CARDS: {
  key: Key;
  href: string;
  logos: LogoName[];
  span: string;
  bg: string;
}[] = [
  {
    key: "fullstack",
    href: "/leistungen/full-stack",
    logos: ["python", "django", "react", "javascript"],
    span: "md:col-span-7",
    bg: "linear-gradient(160deg, rgba(61,220,151,0.22), rgba(255,255,255,0.03) 60%)",
  },
  {
    key: "erp",
    href: "/leistungen/erp",
    logos: ["odoo"],
    span: "md:col-span-5",
    bg: "",
  },
  {
    key: "api",
    href: "/leistungen/schnittstellen",
    logos: ["json"],
    span: "md:col-span-5",
    bg: "",
  },
  {
    key: "ai",
    href: "/leistungen/ki",
    logos: ["claude", "python"],
    span: "md:col-span-7",
    bg: "linear-gradient(200deg, rgba(217,119,87,0.2), rgba(255,255,255,0.03) 60%)",
  },
];

export function ServiceCards() {
  const t = useTranslation().home.services;

  return (
    <section id="kompetenzen" className="container-max scroll-mt-24 pb-28">
      <div className="eyebrow">{t.eyebrow}</div>
      <h2 className="h2-section mb-4">{t.title}</h2>
      <p className="lead mb-12 max-w-[560px]">{t.subtitle}</p>

      <div className="grid grid-cols-1 gap-5 md:grid-cols-12">
        {CARDS.map((c) => (
          <Link
            key={c.key}
            href={c.href}
            className={`card glass ${c.span} flex min-h-80 flex-col justify-between rounded-3xl p-10 text-left`}
            style={c.bg ? { background: c.bg } : undefined}
          >
            <div className="flex items-center gap-[18px]">
              {c.logos.map((n) => (
                <Logo key={n} name={n} size={30} />
              ))}
            </div>
            <div>
              <h3 className="mb-3 text-[28px] font-semibold tracking-[-0.03em] text-white">
                {t[c.key].title}
              </h3>
              <p className="mb-5 max-w-[460px] text-[17px] leading-[1.55] text-[#c3cdc8]">
                {t[c.key].text}
              </p>
              <span className="inline-flex items-center gap-2 text-[15px] font-medium text-accent">
                {t.more}
                <ArrowRight size={16} weight="bold" />
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
