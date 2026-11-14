"use client";

import Link from "next/link";
import { Fragment, type ReactNode } from "react";
import { ArrowLeft } from "@phosphor-icons/react";
import { useTranslation } from "@/lib/useTranslation";

export function BackLink() {
  const t = useTranslation().detail;
  return (
    <Link
      href="/#kompetenzen"
      className="btn glass inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium text-white"
    >
      <ArrowLeft size={16} weight="bold" />
      {t.back}
    </Link>
  );
}

export function PageHead({
  title,
  intro,
  before,
}: {
  title: string;
  intro: string;
  before?: ReactNode;
}) {
  return (
    <div className="max-w-[760px] pt-14">
      {before}
      <h1 className="h1-detail mb-4 mt-6">{title}</h1>
      <p className="lead">{intro}</p>
    </div>
  );
}

export function MiniCard({
  title,
  text,
  className = "",
}: {
  title: string;
  text: string;
  className?: string;
}) {
  return (
    <div className={`card glass rounded-3xl p-8 ${className}`}>
      <h3 className="h3-card mb-2.5">{title}</h3>
      <p className="text-base leading-[1.55] text-muted">{text}</p>
    </div>
  );
}

export type FlowStep = { node: ReactNode; label: string; sub: string };

// Schaubild: Kästen mit animierter Verbindung (Datenpakete laufen von links nach rechts).
export function Flow({ steps }: { steps: FlowStep[] }) {
  return (
    <div className="flow flex flex-nowrap items-center">
      {steps.map((s, i) => (
        <Fragment key={s.label}>
          {i > 0 && <div className="flowline" />}
          <div className="card glass flex min-w-[170px] flex-col items-center gap-3 rounded-[20px] px-7 py-6 text-center">
            {s.node}
            <span className="text-[17px] font-semibold text-white">
              {s.label}
            </span>
            <span className="-mt-1.5 text-[13px] leading-[1.4] text-[#8a978f]">
              {s.sub}
            </span>
          </div>
        </Fragment>
      ))}
    </div>
  );
}

export function Glyph({ children }: { children: string }) {
  return (
    <span className="flex h-11 items-center font-mono text-xl text-white">
      {children}
    </span>
  );
}

export function CodeLink({ href }: { href: string }) {
  const t = useTranslation().detail;
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="btn glass whitespace-nowrap rounded-full px-6 py-3 text-[15px] text-white"
    >
      {t.code}
    </a>
  );
}
