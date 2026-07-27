"use client";

import Link from "next/link";
import { useCallback, useEffect, useState, useSyncExternalStore } from "react";
import BrowserFrame from "./browser-frame";
import { works } from "../works";

const DURATION = 4800;

type State = { index: number; warm: number[] };

/**
 * Move to `to`, wrapping, and remember which screenshots have been needed so far
 * (the target plus the one after it, so the next transition never waits on the
 * network). Pure, so it can drive a functional setState.
 */
function step(state: State, to: number): State {
  const index = ((to % works.length) + works.length) % works.length;
  const ahead = (index + 1) % works.length;
  if (state.index === index && state.warm.includes(ahead)) return state;
  const warm = [...new Set([...state.warm, index, ahead])];
  return { index, warm };
}

const REDUCED = "(prefers-reduced-motion: reduce)";

function usePrefersReducedMotion() {
  return useSyncExternalStore(
    (onChange) => {
      const query = window.matchMedia(REDUCED);
      query.addEventListener("change", onChange);
      return () => query.removeEventListener("change", onChange);
    },
    () => window.matchMedia(REDUCED).matches,
    () => false,
  );
}

/**
 * The hero's centrepiece: a browser window that cycles through real screenshots
 * of every case study. It pauses while the pointer or keyboard focus is inside,
 * and stops advancing entirely under prefers-reduced-motion.
 */
export default function HeroShowcase() {
  const [{ index, warm }, setState] = useState<State>({ index: 0, warm: [0, 1] });
  const [paused, setPaused] = useState(false);
  const auto = !usePrefersReducedMotion();

  const advance = useCallback((delta: number) => setState((s) => step(s, s.index + delta)), []);
  const jump = useCallback((to: number) => setState((s) => step(s, to)), []);

  useEffect(() => {
    if (!auto || paused) return;
    const timer = setTimeout(() => advance(1), DURATION);
    return () => clearTimeout(timer);
  }, [auto, paused, index, advance]);

  const onKeyDown = (event: React.KeyboardEvent) => {
    if (event.key !== "ArrowRight" && event.key !== "ArrowLeft") return;
    event.preventDefault();
    advance(event.key === "ArrowRight" ? 1 : -1);
  };

  const active = works[index];

  return (
    <div
      className="showcase"
      onPointerEnter={() => setPaused(true)}
      onPointerLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
      onKeyDown={onKeyDown}
    >
      <div className="showcase-window" style={{ "--accent": active.accent } as React.CSSProperties}>
        <BrowserFrame domain={active.domain} title={active.title}>
          <div className="showcase-stack">
            {works.map((work, i) =>
              warm.includes(i) ? (
                /* eslint-disable-next-line @next/next/no-img-element */
                <img
                  key={work.slug}
                  className={`showcase-shot${i === index ? " is-on" : ""}`}
                  src={`/works/${work.slug}.jpg`}
                  alt={`${work.title} のトップページ`}
                  fetchPriority={i === 0 ? "high" : "auto"}
                  draggable={false}
                />
              ) : null,
            )}
            <Link className="showcase-open" href={active.href}>
              サイトを開く
            </Link>
          </div>
          {auto ? (
            <span
              key={`${index}-${paused}`}
              className={`showcase-progress${paused ? " is-paused" : ""}`}
              style={{ "--dur": `${DURATION}ms` } as React.CSSProperties}
              aria-hidden
            />
          ) : null}
        </BrowserFrame>
      </div>

      <div className="showcase-meta" aria-live="polite">
        <span className="showcase-no">{active.no}</span>
        <p className="showcase-title">{active.title}</p>
        <p className="showcase-sector">{active.sector}</p>
      </div>

      <ol className="showcase-nav">
        {works.map((work, i) => (
          <li key={work.slug}>
            <button
              type="button"
              className={i === index ? "is-on" : undefined}
              aria-label={`${work.title} のプレビューを表示`}
              aria-current={i === index || undefined}
              onClick={() => jump(i)}
            >
              {work.no}
            </button>
          </li>
        ))}
      </ol>
    </div>
  );
}
