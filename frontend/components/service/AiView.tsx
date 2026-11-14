"use client";

import { Logo } from "@/lib/logos";
import { useTranslation } from "@/lib/useTranslation";
import { CodeLink, Flow, Glyph, MiniCard, PageHead } from "./parts";

export function AiView() {
  const t = useTranslation().detail.ai;
  const nodes = [
    <Glyph key="i">{t.flow[0].glyph}</Glyph>,
    <Logo key="m" name="claude" size={44} />,
    <Logo key="d" name="python" size={44} />,
    <Glyph key="o">{t.flow[3].glyph}</Glyph>,
  ];

  return (
    <>
      <PageHead title={t.title} intro={t.intro} />

      <div className="mt-16">
        <Flow steps={t.flow.map((s, i) => ({ ...s, node: nodes[i] }))} />
      </div>

      <div className="mt-24 grid gap-5 md:grid-cols-3">
        {t.cards.map((c) => (
          <MiniCard
            key={c.title}
            title={c.title}
            text={c.text}
            className="min-h-[220px]"
          />
        ))}
      </div>

      <div
        className="card glass mt-5 flex flex-wrap items-center justify-between gap-6 rounded-3xl p-10"
        style={{
          background:
            "linear-gradient(200deg, rgba(217,119,87,0.18), rgba(255,255,255,0.03) 60%)",
        }}
      >
        <div className="max-w-[620px]">
          <h3 className="h3-card mb-2.5 !text-[26px]">{t.exampleTitle}</h3>
          <p className="text-base leading-[1.55] text-muted">
            {t.exampleText}
          </p>
        </div>
        <CodeLink href="https://github.com/adibo32/chatbot" />
      </div>
    </>
  );
}
