"use client";

import { useState } from "react";
import { Logo, type LogoName } from "@/lib/logos";
import { highlight } from "@/lib/highlight";
import { useTranslation } from "@/lib/useTranslation";

type TabKey = "django" | "flask" | "react" | "javascript";

const TABS: {
  key: TabKey;
  name: string;
  logo: LogoName;
  lang: "py" | "js";
  file: string;
  label: string;
  cmd: string;
  code: string;
}[] = [
  {
    key: "django",
    name: "Django",
    logo: "django",
    lang: "py",
    file: "backend/api/models.py",
    label: "Python",
    cmd: "python manage.py runserver",
    code: `
class Anfrage(models.Model):
    name = models.CharField(max_length=100)
    email = models.EmailField()
    status = models.CharField(max_length=20, default="neu")
    created_at = models.DateTimeField(auto_now_add=True)

class AnfrageViewSet(viewsets.ModelViewSet):
    queryset = Anfrage.objects.all()
    serializer_class = AnfrageSerializer
`,
  },
  {
    key: "flask",
    name: "Flask",
    logo: "flask",
    lang: "py",
    file: "backend/app.py",
    label: "Python",
    cmd: "flask run",
    code: `
@app.post("/api/anfragen")
def create_anfrage():
    data = request.get_json()
    anfrage = Anfrage(name=data["name"], email=data["email"])
    db.session.add(anfrage)
    db.session.commit()
    return jsonify(id=anfrage.id), 201
`,
  },
  {
    key: "react",
    name: "React",
    logo: "react",
    lang: "js",
    file: "frontend/AnfrageListe.jsx",
    label: "JavaScript JSX",
    cmd: "npm run dev",
    code: `
export function AnfrageListe() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetch("/api/anfragen/")
      .then((r) => r.json())
      .then(setItems);
  }, []);

  return items.map((a) => <Zeile key={a.id} {...a} />);
}
`,
  },
  {
    key: "javascript",
    name: "JavaScript",
    logo: "javascript",
    lang: "js",
    file: "frontend/kontakt.js",
    label: "JavaScript",
    cmd: "npx vite",
    code: `
const form = document.querySelector("#kontakt");

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const res = await fetch("/api/anfragen/", {
    method: "POST",
    body: new FormData(form),
  });
  if (res.ok) form.reset();
});
`,
  },
];

export function CodeEditor() {
  const t = useTranslation().detail.fullstack;
  const [active, setActive] = useState<TabKey>("django");
  const tab = TABS.find((x) => x.key === active) ?? TABS[0];
  const lineCount = tab.code.trim().split("\n").length;

  return (
    <div className="glass overflow-hidden rounded-3xl">
      <div
        className="flex flex-wrap gap-2 border-b border-white/10 px-4 py-3.5"
        role="tablist"
      >
        {TABS.map((x) => {
          const on = x.key === active;
          return (
            <button
              key={x.key}
              role="tab"
              aria-selected={on}
              onClick={() => setActive(x.key)}
              className={`btn inline-flex items-center gap-2.5 rounded-full border px-[18px] py-[9px] text-sm ${
                on
                  ? "border-white/30 bg-white/10 text-white"
                  : "border-transparent text-muted hover:text-white"
              }`}
            >
              <Logo name={x.logo} size={18} />
              {x.name}
            </button>
          );
        })}
      </div>

      <div className="flex">
        <div className="hidden w-[220px] flex-none border-r border-white/10 p-5 font-mono text-[13px] leading-8 text-[#8a978f] md:block">
          <div className="flex items-center gap-2 text-[#cfd8d3]">
            <Logo name="python" size={16} />
            backend
          </div>
          <div className="pl-6">api/models.py</div>
          <div className="pl-6">app.py</div>
          <div className="mt-2 flex items-center gap-2 text-[#cfd8d3]">
            <Logo name="react" size={16} />
            frontend
          </div>
          <div className="pl-6">AnfrageListe.jsx</div>
          <div className="pl-6">kontakt.js</div>
          <div className="mt-2 flex items-center gap-2 text-[#cfd8d3]">
            <Logo name="postgresql" size={16} />
            datenbank
          </div>
        </div>

        <div className="min-w-0 flex-1">
          <div
            role="tabpanel"
            className="min-h-[270px] overflow-x-auto px-7 py-6 font-mono text-sm leading-[1.75] text-[#d5ddd8]"
          >
            {highlight(tab.code, tab.lang)}
            <div className="flex gap-5">
              <span className="w-[22px] shrink-0 text-right text-[#4b5a52]">
                {lineCount + 1}
              </span>
              <span className="caret" />
            </div>
          </div>
          <div className="flex items-center gap-2.5 border-t border-white/10 px-7 py-3 font-mono text-[13px] text-[#8a978f]">
            <span className="text-[#6ee7b7]">$</span>
            <span className="text-[#cfd8d3]">{tab.cmd}</span>
            <span className="ml-auto inline-flex items-center gap-2 text-[#6ee7b7]">
              <span className="dot" />
              {t.running}
            </span>
          </div>
          <div className="flex justify-between gap-3 border-t border-white/10 px-5 py-2.5 font-mono text-xs text-[#8a978f]">
            <span>{tab.file}</span>
            <span>{tab.label}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
