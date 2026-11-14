"use client";

import { Logo } from "@/lib/logos";
import { useTranslation } from "@/lib/useTranslation";
import { Flow, Glyph, MiniCard, PageHead } from "./parts";

export function ApiView() {
  const t = useTranslation().detail.api;
  const nodes = [
    <Logo key="e" name="odoo" size={44} />,
    <Logo key="a" name="json" size={44} />,
    <Glyph key="s">{t.flow[2].glyph}</Glyph>,
  ];

  return (
    <>
      <PageHead title={t.title} intro={t.intro} />

      <div className="mt-16">
        <Flow steps={t.flow.map((s, i) => ({ ...s, node: nodes[i] }))} />
      </div>

      <div className="mt-24 grid gap-5 md:grid-cols-2">
        <div className="card glass overflow-hidden rounded-3xl">
          <div className="px-7 pb-3 pt-7">
            <h3 className="h3-card mb-2.5 !text-[26px]">{t.solutionTitle}</h3>
            <p className="text-base leading-[1.55] text-muted">
              {t.solutionText}
            </p>
          </div>
          <pre className="overflow-x-auto px-7 pb-7 pt-5 font-mono text-sm leading-[1.8] text-[#d5ddd8]">
            <span style={{ color: "#6ee7b7" }}>POST</span> /api/bestellungen/
            {"\n{\n  "}
            <span style={{ color: "#7dd3fc" }}>&quot;kunde&quot;</span>
            {": "}
            <span style={{ color: "#fcd34d" }}>&quot;Muster GmbH&quot;</span>
            {",\n  "}
            <span style={{ color: "#7dd3fc" }}>&quot;artikel&quot;</span>
            {": "}
            <span style={{ color: "#fcd34d" }}>&quot;A-1042&quot;</span>
            {",\n  "}
            <span style={{ color: "#7dd3fc" }}>&quot;menge&quot;</span>
            {": "}
            <span style={{ color: "#fdba74" }}>12</span>
            {"\n}\n"}
            <span style={{ color: "#6b7a72" }}># Antwort: 201 Created</span>
          </pre>
        </div>
        <div className="flex flex-col gap-5">
          {t.cards.map((c) => (
            <MiniCard
              key={c.title}
              title={c.title}
              text={c.text}
              className="flex-1"
            />
          ))}
        </div>
      </div>
    </>
  );
}
