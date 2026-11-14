"use client";

import { Logo, type LogoName } from "@/lib/logos";
import { useTranslation } from "@/lib/useTranslation";

const PROJECTS: {
  logos: LogoName[];
  tags: string[];
  url: string;
  span: string;
  bg: string;
}[] = [
  {
    logos: ["odoo", "python"],
    tags: ["Odoo 16", "Python"],
    url: "https://github.com/adibo32/odoo-construction-Project",
    span: "md:col-span-7",
    bg: "radial-gradient(500px circle at 30% 20%, rgba(197,139,181,0.38), transparent 60%), #0f1412",
  },
  {
    logos: ["django", "kubernetes"],
    tags: ["Django", "REST", "Kubernetes"],
    url: "https://github.com/adibo32/translate",
    span: "md:col-span-5",
    bg: "radial-gradient(400px circle at 70% 20%, rgba(68,183,139,0.35), transparent 60%), #0f1412",
  },
  {
    logos: ["django", "postgresql"],
    tags: ["Django", "REST-API"],
    url: "https://github.com/adibo32/reservation",
    span: "md:col-span-5",
    bg: "radial-gradient(400px circle at 30% 80%, rgba(97,218,251,0.25), transparent 60%), #0f1412",
  },
  {
    logos: ["python", "django"],
    tags: ["Django", "ChatterBot"],
    url: "https://github.com/adibo32/chatbot",
    span: "md:col-span-7",
    bg: "radial-gradient(500px circle at 70% 70%, rgba(217,119,87,0.3), transparent 60%), #0f1412",
  },
];

export function Projects() {
  const t = useTranslation().home.projects;

  return (
    <section id="projekte" className="container-max scroll-mt-24 pb-28">
      <div className="eyebrow">{t.eyebrow}</div>
      <h2 className="h2-section mb-12">{t.title}</h2>

      <div className="grid grid-cols-1 gap-5 md:grid-cols-12">
        {PROJECTS.map((p, i) => (
          <a
            key={p.url}
            href={p.url}
            target="_blank"
            rel="noopener noreferrer"
            className={`card glass ${p.span} flex min-h-[400px] flex-col rounded-3xl`}
          >
            <div
              className="flex min-h-[190px] flex-1 items-center justify-center gap-7"
              style={{ background: p.bg }}
            >
              {p.logos.map((n) => (
                <Logo key={n} name={n} size={56} />
              ))}
            </div>
            <div className="px-8 pb-8 pt-7">
              <h3 className="h3-card mb-2.5 !text-2xl">{t.items[i].name}</h3>
              <p className="mb-[18px] text-base leading-[1.55] text-muted">
                {t.items[i].text}
              </p>
              <div className="flex flex-wrap gap-2">
                {p.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-white/15 px-3.5 py-[5px] font-mono text-xs text-[#cfd8d3]"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
