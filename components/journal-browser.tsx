"use client";

import { useMemo, useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { formatJournalDate } from "@/lib/format";

type JournalView = {
  slug: string;
  date: string;
  read: string;
  kicker: string;
  kickerEn: string;
  title: string;
  summary: string;
};

export function JournalBrowser({ entries }: { entries: JournalView[] }) {
  const t = useTranslations("journal");
  const [filter, setFilter] = useState("all");

  const tags = useMemo(() => {
    const seen = new Set<string>();
    const result = [{ key: "all", label: t("filter.all") }];
    for (const e of entries) {
      if (seen.has(e.kickerEn)) continue;
      seen.add(e.kickerEn);
      result.push({ key: e.kickerEn, label: e.kicker });
    }
    return result;
  }, [entries, t]);

  const list = filter === "all" ? entries : entries.filter((e) => e.kickerEn === filter);

  return (
    <section className="jrn">
      <div className="jrn__inner">
        <div className="jrn__tags mono">
          {tags.map((tag) => (
            <button
              key={tag.key}
              type="button"
              className={filter === tag.key ? "is-active" : undefined}
              onClick={() => setFilter(tag.key)}
            >
              {tag.label}
            </button>
          ))}
        </div>
        <div className="jrn-list">
          {list.map((e) => (
            <Link key={e.slug} href={`/journal/${e.slug}`} className="jrn-row">
              <div className="jrn-row__date mono">{formatJournalDate(e.date)}</div>
              <div className="jrn-row__kicker">{e.kicker}</div>
              <div>
                <div className="jrn-row__t">{e.title}</div>
                <div className="jrn-row__excerpt">{e.summary}</div>
                <div className="jrn-row__meta">
                  {e.read} · ~{Math.round(parseInt(e.read, 10) * 180)} {t("words")}
                </div>
              </div>
              <div className="jrn-row__arrow">↗</div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
