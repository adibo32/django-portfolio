import { Logo, type LogoName } from "@/lib/logos";

const TECH: { name: LogoName; label: string }[] = [
  { name: "python", label: "Python" },
  { name: "django", label: "Django" },
  { name: "flask", label: "Flask" },
  { name: "react", label: "React" },
  { name: "nextdotjs", label: "Next.js" },
  { name: "javascript", label: "JavaScript" },
  { name: "postgresql", label: "PostgreSQL" },
  { name: "odoo", label: "Odoo" },
  { name: "kubernetes", label: "Kubernetes" },
  { name: "git", label: "Git" },
];

function Group({ hidden = false }: { hidden?: boolean }) {
  return (
    <div className="flex gap-2.5 pr-2.5" aria-hidden={hidden || undefined}>
      {TECH.map((t) => (
        <span
          key={t.name}
          className="glass inline-flex items-center gap-2.5 rounded-full px-4 py-2 font-mono text-[13px] text-[#cfd8d3]"
        >
          <Logo name={t.name} size={18} />
          {t.label}
        </span>
      ))}
    </div>
  );
}

// Endlos laufendes Band mit den Technologien (CSS-only, Gruppe doppelt für nahtlose Schleife).
export function TechMarquee() {
  return (
    <div className="container-max pb-24">
      <div className="marquee rise-4">
        <div className="track">
          <Group />
          <Group hidden />
        </div>
      </div>
    </div>
  );
}
