import Link from "next/link";
import CursorGlow from "./components/cursor-glow";
import ScrollReveal from "./components/scroll-reveal";

const works = [
  {
    href: "/goods",
    no: "01",
    year: "2026",
    tag: "E-COMMERCE / REUSE",
    title: "OTAKARA LOOP",
    desc: "コレクターズグッズの買取・販売プラットフォーム。カート・購入履歴まで通しで設計。",
    stack: ["EC UI", "Cart Flow", "Branding"],
    tone: "coral",
  },
  {
    href: "/jobs",
    no: "02",
    year: "2026",
    tag: "RECRUITING SITE",
    title: "HIRAKU 建設",
    desc: "老舗建設会社の新卒・中途採用サイト。現場の熱量を採用ブランディングに翻訳。",
    stack: ["Recruit", "Editorial", "Storytelling"],
    tone: "amber",
  },
  {
    href: "/tech",
    no: "03",
    year: "2026",
    tag: "WEB3 / CORPORATE",
    title: "NULL / PROTOCOL",
    desc: "スクロールに完全連動する没入型コーポレートサイト。Canvas と3D演出で世界観を構築。",
    stack: ["Interaction", "Canvas", "Motion"],
    tone: "violet",
  },
];

const marquee = [
  "UI / UX DESIGN",
  "FRONTEND",
  "INTERACTION",
  "BRANDING",
  "MOTION",
  "ART DIRECTION",
];

const stats = [
  ["6+", "YEARS OF CRAFT"],
  ["40+", "PROJECTS SHIPPED"],
  ["100%", "HAND-CODED"],
];

export default function Home() {
  return (
    <main className="home">
      <CursorGlow />
      <ScrollReveal />
      <div className="grain" aria-hidden />
      <div className="home-aurora" aria-hidden>
        <span className="blob b1" />
        <span className="blob b2" />
        <span className="blob b3" />
      </div>

      <nav className="h-nav">
        <Link href="/" className="h-logo">
          YU<span>.</span>
        </Link>
        <div className="h-links">
          <a href="#works">WORKS</a>
          <a href="#about">ABOUT</a>
          <a href="#contact">CONTACT</a>
        </div>
        <span className="h-status">
          <i />
          AVAILABLE FOR WORK
        </span>
      </nav>

      <section className="h-hero">
        <p className="h-eyebrow">WEB DESIGN &amp; DEVELOPMENT — TOKYO, JAPAN</p>
        <h1>
          <span className="line">
            <b style={{ "--i": 0 } as React.CSSProperties}>Designing</b>
          </span>
          <span className="line">
            <b style={{ "--i": 1 } as React.CSSProperties}>
              <em>useful</em>
            </b>
            <b style={{ "--i": 2 } as React.CSSProperties}>moments.</b>
          </span>
        </h1>
        <div className="h-hero-foot">
          <p>
            伝えたい価値を、迷わず届く体験へ。
            <br />
            企画からデザイン、実装まで一貫してつくります。
          </p>
          <a href="#works" className="h-cta" aria-label="制作事例を見る">
            <span>SELECTED WORKS</span>
            <i>↘</i>
          </a>
        </div>
      </section>

      <div className="h-marquee" aria-hidden>
        <div className="h-marquee-track">
          {[0, 1].map((copy) => (
            <div className="h-marquee-group" key={copy}>
              {marquee.map((item) => (
                <span key={item}>
                  {item}
                  <i>✦</i>
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      <section className="h-works" id="works">
        <header className="h-section-head" data-reveal>
          <span className="h-label">SELECTED WORKS</span>
          <h2>
            つくったもの<em>／03</em>
          </h2>
        </header>

        <div className="h-work-list">
          {works.map((work, index) => (
            <Link
              href={work.href}
              key={work.href}
              className={`h-work ${work.tone}`}
              data-reveal
              style={{ "--reveal-delay": `${index * 0.08}s` } as React.CSSProperties}
            >
              <span className="h-work-no">{work.no}</span>

              <div className="h-work-body">
                <span className="h-work-tag">
                  {work.tag} — {work.year}
                </span>
                <h3>{work.title}</h3>
                <p>{work.desc}</p>
                <div className="h-work-stack">
                  {work.stack.map((chip) => (
                    <span key={chip}>{chip}</span>
                  ))}
                </div>
              </div>

              <div className={`h-work-thumb ${work.tone}`} aria-hidden>
                <span className="thumb-art" />
              </div>

              <span className="h-work-go">
                VIEW
                <i>↗</i>
              </span>
            </Link>
          ))}
        </div>
      </section>

      <section className="h-about" id="about">
        <div className="h-portrait" data-reveal>
          <span className="h-portrait-mark">YU</span>
          <span className="h-portrait-ring" />
          <span className="h-portrait-badge">
            CREATIVE
            <br />
            DEVELOPER
          </span>
        </div>

        <div className="h-about-body" data-reveal style={{ "--reveal-delay": "0.1s" } as React.CSSProperties}>
          <span className="h-label">ABOUT ME</span>
          <h2>
            内田 悠太 <small>YUTA UCHIDA</small>
          </h2>
          <p>
            Webサイトの設計とフロントエンド実装を中心に活動しています。業界ごとの空気感を捉え、情報を整理し、
            見る人が自然に次の一歩へ進めるサイトづくりが得意です。デザインとコードの両方を行き来しながら、
            細部の手触りまで作り込みます。
          </p>
          <div className="h-stats">
            {stats.map(([value, label]) => (
              <div key={label}>
                <strong>{value}</strong>
                <span>{label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <footer className="h-footer" id="contact">
        <span className="h-label" data-reveal>
          GET IN TOUCH
        </span>
        <h2 data-reveal>
          LET&apos;S MAKE
          <br />
          SOMETHING <em>MEMORABLE.</em>
        </h2>
        <a className="h-mail" href="mailto:hello@example.com" data-reveal>
          hello@example.com
          <i>↗</i>
        </a>
        <div className="h-footer-foot">
          <span>PORTFOLIO © 2026 — YUTA UCHIDA</span>
          <span>DESIGNED &amp; BUILT IN TOKYO</span>
        </div>
      </footer>
    </main>
  );
}
