"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import BrowserFrame from "./browser-frame";
import { categories, works, type WorkCategory } from "../works";

type Filter = WorkCategory | "all";

/**
 * The works index. Filtering re-keys the cards so they animate back in, and the
 * reveal observer is re-created per filter — a page-level observer bound once at
 * mount would leave newly filtered-in cards stuck at opacity 0.
 */
export default function WorksGallery() {
  const [filter, setFilter] = useState<Filter>("all");
  const grid = useRef<HTMLDivElement>(null);

  const counts = useMemo(() => {
    const map = new Map<Filter, number>([["all", works.length]]);
    works.forEach((w) => map.set(w.category, (map.get(w.category) ?? 0) + 1));
    return map;
  }, []);

  const list = useMemo(
    () => (filter === "all" ? works : works.filter((w) => w.category === filter)),
    [filter],
  );

  useEffect(() => {
    const root = grid.current;
    if (!root) return;
    const cards = Array.from(root.querySelectorAll<HTMLElement>(".wk"));

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      cards.forEach((card) => card.classList.add("is-in"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-in");
          observer.unobserve(entry.target);
        });
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 },
    );

    cards.forEach((card) => observer.observe(card));
    return () => observer.disconnect();
  }, [filter]);

  return (
    <>
      <div className="wk-filters" role="group" aria-label="制作実績の絞り込み">
        {categories.map((category) => {
          const count = counts.get(category.key) ?? 0;
          if (!count) return null;
          return (
            <button
              key={category.key}
              type="button"
              className={`wk-chip${filter === category.key ? " is-on" : ""}`}
              aria-pressed={filter === category.key}
              onClick={() => setFilter(category.key)}
            >
              {category.label}
              <em>{String(count).padStart(2, "0")}</em>
            </button>
          );
        })}
      </div>

      <div className="wk-grid" ref={grid}>
        {list.map((work, i) => (
          <article
            key={`${filter}-${work.slug}`}
            className="wk"
            style={{ "--i": i, "--accent": work.accent } as React.CSSProperties}
          >
            {/* Presentational: the whole card is one link, opened by .wk-hit below. */}
            <div className="wk-frame">
              <BrowserFrame domain={work.domain} title={work.title}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  className={`wk-shot${work.tall ? " is-tall" : ""}`}
                  src={`/works/${work.slug}.jpg`}
                  alt=""
                  loading="lazy"
                  draggable={false}
                />
              </BrowserFrame>
            </div>

            {/* Stretched hit area: makes the whole card clickable without adding a
                second link to the accessibility tree — the title stays the one
                real, focusable link. */}
            <Link href={work.href} className="wk-hit" aria-hidden tabIndex={-1} />

            <div className="wk-body">
              <p className="wk-line">
                <span className="wk-no">{work.no}</span>
                <span className="wk-sector">{work.sector}</span>
                <span className="wk-year">{work.year}</span>
              </p>
              <h3 className="wk-title">
                <Link href={work.href}>{work.title}</Link>
              </h3>
              <p className="wk-reading">{work.reading}</p>
              <p className="wk-summary">{work.summary}</p>
              <ul className="wk-tags">
                {work.tags.map((tag) => (
                  <li key={tag}>{tag}</li>
                ))}
              </ul>
              <span className="wk-go">
                サイトを見る
                <i />
              </span>
            </div>
          </article>
        ))}
      </div>
    </>
  );
}
