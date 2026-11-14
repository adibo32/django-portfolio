"use client";

import { Logo } from "@/lib/logos";
import { useTranslation } from "@/lib/useTranslation";
import { CodeLink, MiniCard, PageHead } from "./parts";

export function ErpView() {
  const t = useTranslation().detail.erp;
  const left = t.modules.slice(0, 3);
  const right = t.modules.slice(3);

  const pills = (items: string[]) => (
    <div className="flex flex-col gap-4">
      {items.map((m) => (
        <span
          key={m}
          className="glass rounded-full px-7 py-3.5 text-center text-[#e8ece9]"
        >
          {m}
        </span>
      ))}
    </div>
  );

  return (
    <>
      <PageHead
        title={t.title}
        intro={t.intro}
        before={<Logo name="odoo" size={44} />}
      />

      <div
        className="mt-16 flex flex-col items-center justify-center gap-8 md:flex-row"
        aria-hidden="true"
      >
        {pills(left)}
        <div
          className="pulse flex size-[150px] items-center justify-center rounded-full border border-white/20"
          style={{
            background:
              "radial-gradient(circle at 30% 30%, rgba(197,139,181,0.45), rgba(255,255,255,0.04))",
          }}
        >
          <Logo name="odoo" size={72} />
        </div>
        {pills(right)}
      </div>

      <h2 className="h2-section mb-4 mt-28">{t.servicesTitle}</h2>
      <p className="lead mb-10 max-w-[620px]">{t.servicesText}</p>
      <div className="grid gap-5 md:grid-cols-3">
        {t.services.map((s) => (
          <MiniCard
            key={s.title}
            title={s.title}
            text={s.text}
            className="min-h-[220px]"
          />
        ))}
      </div>

      <div
        className="card glass mt-5 flex flex-wrap items-center justify-between gap-6 rounded-3xl p-10"
        style={{
          background:
            "linear-gradient(160deg, rgba(197,139,181,0.2), rgba(255,255,255,0.03) 60%)",
        }}
      >
        <div className="max-w-[620px]">
          <h3 className="h3-card mb-2.5 !text-[26px]">{t.exampleTitle}</h3>
          <p className="text-base leading-[1.55] text-muted">
            {t.exampleText}
          </p>
        </div>
        <CodeLink href="https://github.com/adibo32/odoo-construction-Project" />
      </div>
    </>
  );
}
