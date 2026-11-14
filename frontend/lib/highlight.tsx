import type { ReactNode } from "react";

type Lang = "py" | "js";

const KEYWORDS: Record<Lang, string> = {
  py: "class|def|return|import|from|if|else|elif|for|in|with|as|True|False|None|and|or|not",
  js: "const|let|var|function|return|async|await|if|else|for|new|import|from|export|default|true|false|null",
};

const COMMENT: Record<Lang, string> = { py: "#[^\\n]*", js: "//[^\\n]*" };

const COLORS = {
  comment: "#6b7a72",
  string: "#fcd34d",
  keyword: "#6ee7b7",
  func: "#7dd3fc",
  number: "#fdba74",
} as const;

// Einfacher Syntax-Highlighter für die Code-Beispiele (keine Bibliothek nötig).
export function highlight(code: string, lang: Lang): ReactNode[] {
  const pattern = new RegExp(
    `(${COMMENT[lang]})|("[^"\\n]*"|'[^'\\n]*')|(\\b(?:${KEYWORDS[lang]})\\b)|(\\b[A-Za-z_][A-Za-z0-9_]*(?=\\())|(\\b\\d+\\b)`,
    "g",
  );
  const colorOf = [
    COLORS.comment,
    COLORS.string,
    COLORS.keyword,
    COLORS.func,
    COLORS.number,
  ];

  return code
    .replace(/^\n+|\n+$/g, "")
    .split("\n")
    .map((line, i) => {
      const parts: ReactNode[] = [];
      let pos = 0;
      for (const m of line.matchAll(pattern)) {
        const start = m.index ?? 0;
        if (start > pos) parts.push(line.slice(pos, start));
        const group = [1, 2, 3, 4, 5].find((g) => m[g] !== undefined) ?? 3;
        parts.push(
          <span key={start} style={{ color: colorOf[group - 1] }}>
            {m[0]}
          </span>,
        );
        pos = start + m[0].length;
      }
      if (pos < line.length) parts.push(line.slice(pos));
      return (
        <div key={i} className="flex gap-5">
          <span className="w-[22px] shrink-0 text-right text-[#4b5a52]">
            {i + 1}
          </span>
          <span className="whitespace-pre">{parts.length ? parts : " "}</span>
        </div>
      );
    });
}
