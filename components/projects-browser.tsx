"use client";

import { useMemo, useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { SvgArt } from "@/components/svg-art";
import { projectThumb } from "@/lib/thumb-art";

type ProjectView = {
  id: string;
  name: string;
  year: string;
  category: string;
  categoryEn: string;
  summary: string;
  stack: string[];
  accent: string;
};

type Mode = "list" | "grid" | "gallery";

export function ProjectsBrowser({ projects }: { projects: ProjectView[] }) {
  const t = useTranslations("projects");
  const [mode, setMode] = useState<Mode>("list");
  const [filter, setFilter] = useState<string>("all");

  const categories = useMemo(() => {
    const seen = new Set<string>();
    const cats: { key: string; label: string; count: number }[] = [
      { key: "all", label: t("all"), count: projects.length },
    ];
    for (const p of projects) {
      if (seen.has(p.categoryEn)) continue;
      seen.add(p.categoryEn);
      cats.push({
        key: p.categoryEn,
        label: p.category,
        count: projects.filter((x) => x.categoryEn === p.categoryEn).length,
      });
    }
    return cats;
  }, [projects, t]);

  const items = filter === "all" ? projects : projects.filter((p) => p.categoryEn === filter);
  const resultLabel = items.length === 1 ? t("results.one") : t("results.many");

  return (
    <>
      <div className="toolbar">
        <div className="toolbar__filters">
          {categories.map((c) => (
            <button
              key={c.key}
              type="button"
              className={`filter-btn${filter === c.key ? " is-active" : ""}`}
              onClick={() => setFilter(c.key)}
            >
              {c.label}
              <span className="c">{c.count}</span>
            </button>
          ))}
        </div>
        <div className="toolbar__modes mono">
          <span id="countBadge" style={{ marginRight: 12, color: "var(--ink-faint)", fontSize: 12 }}>
            {items.length} {resultLabel}
          </span>
          {(["list", "grid", "gallery"] as Mode[]).map((m) => (
            <button
              key={m}
              type="button"
              className={`mode-btn${mode === m ? " is-active" : ""}`}
              onClick={() => setMode(m)}
            >
              {t(`mode.${m}`)}
            </button>
          ))}
        </div>
      </div>

      <section className="page--list">
        <div className="container">
          {mode === "list" && (
            <div className="plist">
              {items.map((p, i) => (
                <Link key={p.id} href={`/projects/${p.id}`}>
                  <span className="plist__n mono">0{i + 1}</span>
                  <span className="plist__name">
                    {p.name}
                    <span className="cat">{p.category}</span>
                  </span>
                  <span className="plist__desc">{p.summary}</span>
                  <span className="plist__stack">
                    {p.stack.slice(0, 4).map((s) => (
                      <span key={s}>{s}</span>
                    ))}
                  </span>
                  <span className="plist__year mono">{p.year}</span>
                  <span className="plist__arrow">→</span>
                </Link>
              ))}
            </div>
          )}

          {mode === "grid" && (
            <div className="pgrid">
              {items.map((p, i) => (
                <Link key={p.id} href={`/projects/${p.id}`}>
                  <div className="pgrid__thumb">
                    <SvgArt markup={projectThumb(i, p.accent, p.category.toUpperCase())} />
                  </div>
                  <div className="pgrid__body">
                    <div className="pgrid__meta">
                      <span>{p.category}</span>
                      <span>{p.year}</span>
                    </div>
                    <div className="pgrid__name">{p.name}</div>
                    <div className="pgrid__desc">{p.summary}</div>
                    <div className="pgrid__stack">
                      {p.stack.slice(0, 3).map((s) => (
                        <span key={s}>{s}</span>
                      ))}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}

          {mode === "gallery" && (
            <div className="pgall">
              {items.map((p, i) => (
                <Link key={p.id} href={`/projects/${p.id}`}>
                  <div className="pgall__thumb">
                    <SvgArt
                      className="pgall__thumb-art"
                      markup={projectThumb(i, p.accent, p.category.toUpperCase())}
                    />
                  </div>
                  <div>
                    <div className="pgall__meta mono">
                      CASE · 0{i + 1} / {String(items.length).padStart(2, "0")} · {p.year}
                    </div>
                    <div className="pgall__name">{p.name}</div>
                    <div className="pgall__desc">{p.summary}</div>
                    <div className="pgall__stack">
                      {p.stack.map((s) => (
                        <span key={s}>{s}</span>
                      ))}
                    </div>
                    <div className="pgall__link">{t("read_case")}</div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
