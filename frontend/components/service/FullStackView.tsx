"use client";

import { Logo } from "@/lib/logos";
import { useTranslation } from "@/lib/useTranslation";
import { CodeEditor } from "./CodeEditor";
import { Flow, MiniCard, PageHead } from "./parts";

export function FullStackView() {
  const t = useTranslation().detail.fullstack;
  const nodes = [
    <Logo key="r" name="react" size={44} />,
    <div key="b" className="flex gap-3.5">
      <Logo name="django" size={44} />
      <Logo name="flask" size={44} />
    </div>,
    <Logo key="p" name="postgresql" size={44} />,
  ];

  return (
    <>
      <PageHead
        title={t.title}
        intro={t.intro}
        before={
          <span className="glass inline-block rounded-full px-4 py-1.5 font-mono text-xs text-accent">
            {t.tag}
          </span>
        }
      />

      <div className="mt-12">
        <CodeEditor />
      </div>

      <h2 className="h2-section mb-4 mt-24">{t.flowTitle}</h2>
      <p className="lead mb-10 max-w-[620px]">{t.flowText}</p>
      <Flow steps={t.flow.map((s, i) => ({ ...s, node: nodes[i] }))} />

      <div className="mt-24 grid gap-5 md:grid-cols-2">
        <div
          className="card glass rounded-3xl p-10"
          style={{
            background:
              "linear-gradient(160deg, rgba(61,220,151,0.16), rgba(255,255,255,0.03) 60%)",
          }}
        >
          <h3 className="h3-card !text-[26px]">{t.whoTitle}</h3>
          <ul className="mt-5 flex flex-col gap-3.5 text-[17px] leading-[1.5] text-[#d5ddd8]">
            {t.who.map((x) => (
              <li key={x}>{x}</li>
            ))}
          </ul>
        </div>
        <div
          className="card glass rounded-3xl p-10"
          style={{
            background:
              "linear-gradient(200deg, rgba(56,189,248,0.14), rgba(255,255,255,0.03) 60%)",
          }}
        >
          <h3 className="h3-card !text-[26px]">{t.whatTitle}</h3>
          <ul className="mt-5 flex flex-col gap-3.5 text-[17px] leading-[1.5] text-[#d5ddd8]">
            {t.what.map((x) => (
              <li key={x}>{x}</li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {t.tech.map((x) => (
          <MiniCard key={x.title} title={x.title} text={x.text} />
        ))}
      </div>
    </>
  );
}
