import { Logo, type LogoName } from "@/lib/logos";

type RingProps = {
  inset: number;
  items: LogoName[];
  duration: number;
  reverse?: boolean;
  offset: number;
};

function Ring({ inset, items, duration, reverse = false, offset }: RingProps) {
  const dir = reverse ? " reverse" : "";
  return (
    <div
      className="ring"
      style={{ inset, animation: `spin ${duration}s linear infinite${dir}` }}
    >
      {items.map((name, i) => {
        const a = (2 * Math.PI * i) / items.length + offset;
        const x = (50 + 50 * Math.cos(a)).toFixed(2);
        const y = (50 + 50 * Math.sin(a)).toFixed(2);
        return (
          <div
            key={name}
            className="absolute size-[58px] -ml-[29px] -mt-[29px]"
            style={{ left: `${x}%`, top: `${y}%` }}
          >
            <div
              className="glass orb"
              style={{ animation: `unspin ${duration}s linear infinite${dir}` }}
            >
              <Logo name={name} size={28} />
            </div>
          </div>
        );
      })}
    </div>
  );
}

// Dekorative Animation: Technologie-Logos kreisen um das Monogramm.
export function Orbit() {
  return (
    <div
      className="rise-3 relative size-[460px] max-w-full"
      aria-hidden="true"
    >
      <div className="breathe absolute left-1/2 top-1/2 size-[220px] -ml-[110px] -mt-[110px] rounded-full bg-accent opacity-35 blur-[70px]" />
      <Ring
        inset={0}
        items={["react", "postgresql", "javascript", "flask"]}
        duration={48}
        reverse
        offset={0.2}
      />
      <Ring
        inset={95}
        items={["python", "odoo", "django"]}
        duration={34}
        offset={0.6}
      />
      <div className="glass absolute left-1/2 top-1/2 flex size-[112px] -ml-14 -mt-14 items-center justify-center rounded-full text-[30px] font-bold tracking-[-0.04em] text-white">
        IT
      </div>
    </div>
  );
}
