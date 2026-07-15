"use client";

/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { useEffect, useRef } from "react";

const HEADLINES = [
  {
    index: "DECENTRALIZE THE POSSIBLE",
    title: ["TRUST,", "RECODED."],
    body: "ブロックチェーンを、投機ではなく社会の信頼基盤として実装するテクノロジースタジオ。",
  },
  {
    index: "01 — CONSENSUS",
    title: ["BLOCKS,", "LINKED."],
    body: "改ざんできない記録を連ねる。合意形成のレイヤーを、ゼロから設計します。",
  },
  {
    index: "02 — LEDGER",
    title: ["TRUTH,", "SHARED."],
    body: "誰か一人が握る真実から、全員で分かち合う真実へ。台帳を、ひらく。",
  },
  {
    index: "03 — NETWORK",
    title: ["VALUE,", "IN MOTION."],
    body: "国境も仲介者もない価値の流れを、誰もが意識せず使えるプロダクトに。",
  },
];

const SERVICES = [
  {
    num: "01",
    glyph: "◉",
    title: "Layer 2 Development",
    body: "高速・低コストな独自チェーンの設計から、ノード運用基盤の構築まで一貫して担います。",
    tags: ["Rollup", "Consensus", "Node Ops"],
  },
  {
    num: "02",
    glyph: "◇",
    title: "Smart Contracts",
    body: "監査可能で堅牢なコントラクト設計。形式検証と第三者監査を前提にした開発プロセス。",
    tags: ["Solidity", "Audit", "Formal Verification"],
  },
  {
    num: "03",
    glyph: "⌘",
    title: "Digital Identity",
    body: "個人がデータの主権を取り戻す、分散型IDとゼロ知識証明の社会実装。",
    tags: ["DID", "ZK Proof", "Wallet UX"],
  },
  {
    num: "04",
    glyph: "◈",
    title: "Tokenomics Design",
    body: "持続可能なインセンティブ設計。経済モデルのシミュレーションから制度設計まで。",
    tags: ["Incentive", "Simulation", "Governance"],
  },
];

const MANIFESTO =
  "私たちは 技術を 誇示しない。 ブロックチェーンが 意識されなくなった 瞬間こそが、 本当の 社会実装だと 考えている。".split(
    " ",
  );

const PARTICLE_COUNT = 220;
const FOV = 520;

/** Deterministic pseudo-random so formations are stable across renders. */
const rand = (seed: number) => {
  const value = Math.sin(seed * 127.1) * 43758.5453;
  return value - Math.floor(value);
};

type Point = { x: number; y: number; z: number };

/** Four formations the particle cloud morphs between as the scene scrolls. */
function buildFormations(): Point[][] {
  const sphere: Point[] = [];
  const chain: Point[] = [];
  const grid: Point[] = [];
  const helix: Point[] = [];

  const cols = 20;
  const perCube = PARTICLE_COUNT / 8;

  for (let i = 0; i < PARTICLE_COUNT; i++) {
    // Fibonacci sphere.
    const y = 1 - (i / (PARTICLE_COUNT - 1)) * 2;
    const ring = Math.sqrt(Math.max(0, 1 - y * y));
    const theta = i * 2.399963;
    sphere.push({ x: Math.cos(theta) * ring * 175, y: y * 175, z: Math.sin(theta) * ring * 175 });

    // Eight cubes in a row — a chain of blocks.
    const cube = Math.floor(i / perCube);
    chain.push({
      x: (cube - 3.5) * 82 + (rand(i) - 0.5) * 42,
      y: (rand(i + 91) - 0.5) * 42,
      z: (rand(i + 37) - 0.5) * 42,
    });

    // Flat ledger grid.
    const col = i % cols;
    const row = Math.floor(i / cols);
    grid.push({
      x: (col - (cols - 1) / 2) * 32,
      y: (row - PARTICLE_COUNT / cols / 2) * 30,
      z: Math.sin(col * 0.5) * 10,
    });

    // Rising helix — the live network.
    const angle = i * 0.28;
    const radius = 40 + (i / PARTICLE_COUNT) * 140;
    helix.push({
      x: Math.cos(angle) * radius,
      y: (i / PARTICLE_COUNT - 0.5) * 300,
      z: Math.sin(angle) * radius,
    });
  }

  return [sphere, chain, grid, helix];
}

const clamp = (value: number, min = 0, max = 1) => Math.min(Math.max(value, min), max);
const smooth = (t: number) => t * t * (3 - 2 * t);
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

export default function Tech() {
  const sceneRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const servicesRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const manifestoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const scene = sceneRef.current;
    const stage = stageRef.current;
    if (!canvas || !scene || !stage) return;

    const context = canvas.getContext("2d");
    if (!context) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const formations = buildFormations();
    const projected = new Array(PARTICLE_COUNT).fill(null).map(() => ({ x: 0, y: 0, scale: 0 }));

    const headlines = Array.from(stage.querySelectorAll<HTMLElement>(".t-headline"));
    const cue = stage.querySelector<HTMLElement>(".t-cue");
    const counter = stage.querySelector<HTMLElement>(".t-hud-block");
    const rail = stage.querySelector<HTMLElement>(".t-hud-fill");
    const words = manifestoRef.current
      ? Array.from(manifestoRef.current.querySelectorAll<HTMLElement>("span"))
      : [];

    let width = 0;
    let height = 0;

    const resize = () => {
      const ratio = Math.min(window.devicePixelRatio || 1, 2);
      width = canvas.clientWidth;
      height = canvas.clientHeight;
      canvas.width = width * ratio;
      canvas.height = height * ratio;
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
    };

    resize();
    window.addEventListener("resize", resize);

    const draw = (progress: number, time: number) => {
      context.clearRect(0, 0, width, height);

      // Which pair of formations are we between, and how far?
      const span = progress * (formations.length - 1);
      const from = Math.min(Math.floor(span), formations.length - 2);
      const blend = smooth(clamp(span - from));

      const rotY = (reduced ? 0 : time * 0.00016) + progress * Math.PI * 1.6;
      const rotX = Math.sin(progress * Math.PI) * 0.42;
      const cosY = Math.cos(rotY);
      const sinY = Math.sin(rotY);
      const cosX = Math.cos(rotX);
      const sinX = Math.sin(rotX);

      const cx = width / 2;
      const cy = height / 2;
      const zoom = Math.min(width, height) / 620;

      for (let i = 0; i < PARTICLE_COUNT; i++) {
        const a = formations[from][i];
        const b = formations[from + 1][i];

        let x = lerp(a.x, b.x, blend);
        let y = lerp(a.y, b.y, blend);
        const z = lerp(a.z, b.z, blend);

        // Gentle breathing so the cloud never feels frozen between phases.
        if (!reduced) {
          const wobble = Math.sin(time * 0.001 + i * 0.4) * 4;
          x += wobble;
          y += Math.cos(time * 0.0012 + i * 0.6) * 4;
        }

        // Rotate Y then X, and project.
        const rx = x * cosY - z * sinY;
        const rz = x * sinY + z * cosY;
        const ry = y * cosX - rz * sinX;
        const rzz = y * sinX + rz * cosX;

        const scale = (FOV / (FOV + rzz)) * zoom;
        projected[i].x = cx + rx * scale;
        projected[i].y = cy + ry * scale;
        projected[i].scale = scale;
      }

      // Connective tissue between nearby nodes.
      context.lineWidth = 1;
      for (let i = 0; i < PARTICLE_COUNT; i++) {
        const p = projected[i];
        for (let j = i + 1; j < PARTICLE_COUNT; j++) {
          const q = projected[j];
          const dx = p.x - q.x;
          const dy = p.y - q.y;
          const dist = Math.hypot(dx, dy);
          if (dist > 74) continue;

          const alpha = (1 - dist / 74) * 0.4;
          context.strokeStyle = `rgba(150, 110, 255, ${alpha.toFixed(3)})`;
          context.beginPath();
          context.moveTo(p.x, p.y);
          context.lineTo(q.x, q.y);
          context.stroke();
        }
      }

      // Nodes.
      for (let i = 0; i < PARTICLE_COUNT; i++) {
        const p = projected[i];
        const radius = Math.max(0.6, p.scale * 2.1);
        const glow = clamp(p.scale * 0.9);

        context.beginPath();
        context.arc(p.x, p.y, radius, 0, Math.PI * 2);
        context.fillStyle = `rgba(222, 209, 255, ${(0.35 + glow * 0.6).toFixed(3)})`;
        context.fill();

        if (p.scale > 1.05) {
          context.beginPath();
          context.arc(p.x, p.y, radius * 3.4, 0, Math.PI * 2);
          context.fillStyle = `rgba(139, 92, 255, ${(0.07 * glow).toFixed(3)})`;
          context.fill();
        }
      }
    };

    let frame = 0;

    const render = (time: number) => {
      const rect = scene.getBoundingClientRect();
      const travel = rect.height - window.innerHeight;
      const progress = clamp(-rect.top / (travel || 1));

      draw(progress, time);

      // Headlines cross-fade through the pinned scene.
      headlines.forEach((node, i) => {
        const center = 0.06 + i * 0.28;
        const opacity = smooth(clamp(1 - Math.abs(progress - center) / 0.17));
        node.style.opacity = String(opacity);
        node.style.transform = `translateY(${(1 - opacity) * 34}px)`;
        node.style.pointerEvents = opacity > 0.5 ? "auto" : "none";
      });

      if (cue) cue.style.opacity = String(clamp(1 - progress * 12));
      if (counter) counter.textContent = `#${Math.floor(1024 + progress * 3072)}`;
      if (rail) rail.style.transform = `scaleY(${progress})`;

      // Horizontal services track.
      const services = servicesRef.current;
      const track = trackRef.current;
      if (services && track) {
        const sRect = services.getBoundingClientRect();
        const sTravel = sRect.height - window.innerHeight;
        const sProgress = clamp(-sRect.top / (sTravel || 1));
        const shift = Math.max(0, track.scrollWidth - window.innerWidth);
        track.style.transform = `translate3d(${-sProgress * shift}px, 0, 0)`;
      }

      // Word-by-word manifesto reveal.
      if (manifestoRef.current && words.length) {
        const mRect = manifestoRef.current.getBoundingClientRect();
        const mProgress = clamp(
          (window.innerHeight - mRect.top) / (window.innerHeight * 0.75 + mRect.height * 0.5),
        );
        words.forEach((word, i) => {
          const reveal = clamp(mProgress * words.length * 1.5 - i);
          word.style.opacity = String(0.12 + reveal * 0.88);
        });
      }

      frame = requestAnimationFrame(render);
    };

    frame = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <main className="tech">
      <Link className="back-home" href="/">
        ← PORTFOLIO
      </Link>

      <nav className="t-nav">
        <div className="t-logo">
          NULL<span>/</span>PROTOCOL
        </div>
        <div className="t-nav-links">
          <a href="#services">SERVICES</a>
          <a href="#manifesto">MANIFESTO</a>
          <a href="#contact">CONTACT</a>
        </div>
      </nav>

      {/* ---------- pinned scroll scene ---------- */}
      <section className="t-scene" ref={sceneRef}>
        <div className="t-stage" ref={stageRef}>
          <canvas className="t-canvas" ref={canvasRef} aria-hidden />
          <div className="t-vignette" aria-hidden />

          <div className="t-copy">
            {HEADLINES.map((headline) => (
              <div className="t-headline" key={headline.index}>
                <span className="t-index">{headline.index}</span>
                <h1>
                  {headline.title.map((line) => (
                    <span key={line}>{line}</span>
                  ))}
                </h1>
                <p>{headline.body}</p>
              </div>
            ))}
          </div>

          <aside className="t-hud" aria-hidden>
            <span className="t-hud-label">BLOCK</span>
            <span className="t-hud-block">#1024</span>
            <div className="t-hud-rail">
              <span className="t-hud-fill" />
            </div>
            <span className="t-hud-label">SYNCED</span>
          </aside>

          <span className="t-cue">SCROLL TO INITIALIZE ↓</span>
        </div>
      </section>

      {/* ---------- horizontal pinned services ---------- */}
      <section className="t-services" id="services" ref={servicesRef}>
        <div className="t-services-stage">
          <div className="t-services-track" ref={trackRef}>
            <div className="t-services-intro">
              <span className="t-index">04 — WHAT WE BUILD</span>
              <h2>
                WE BUILD
                <br />
                THE <em>UNSEEN</em>
                <br />
                LAYER.
              </h2>
              <span className="t-drag">DRAG YOUR SCROLL →</span>
            </div>

            {SERVICES.map((service) => (
              <article className="t-card" key={service.num}>
                <span className="t-card-num">{service.num}</span>
                <span className="t-card-glyph">{service.glyph}</span>
                <h3>{service.title}</h3>
                <p>{service.body}</p>
                <div className="t-card-tags">
                  {service.tags.map((tag) => (
                    <span key={tag}>{tag}</span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- manifesto ---------- */}
      <section className="t-manifesto" id="manifesto">
        <div className="t-manifesto-body" ref={manifestoRef}>
          <span className="t-index">05 — MANIFESTO</span>
          <p>
            {MANIFESTO.map((word, i) => (
              <span key={`${word}-${i}`}>{word}</span>
            ))}
          </p>
        </div>
      </section>

      {/* ---------- finale ---------- */}
      <section className="t-finale" id="contact">
        <img className="t-finale-bg" src="/tech/server.jpg" alt="" aria-hidden />
        <div className="t-finale-orb" aria-hidden />
        <div className="t-finale-copy">
          <h2>
            BUILD THE
            <br />
            <em>UNWRITTEN.</em>
          </h2>
          <a href="mailto:hello@example.com">
            START A PROJECT <i>↗</i>
          </a>
        </div>
      </section>

      <footer className="t-footer">
        <b>NULL/PROTOCOL</b>
        <span>TOKYO · SINGAPORE · ONCHAIN</span>
        <span>MOCK PROJECT © 2026</span>
      </footer>
    </main>
  );
}
