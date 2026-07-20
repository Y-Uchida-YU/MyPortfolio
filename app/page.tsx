import Link from "next/link";
import CursorGlow from "./components/cursor-glow";
import ScrollReveal from "./components/scroll-reveal";
import AboutPlay from "./components/about-play";

const works = [
  {
    href: "/goods",
    no: "01",
    year: "2026",
    tag: "E-COMMERCE / REUSE",
    title: "OTAKARA LOOP",
    desc: "コレクターズグッズの買取・販売プラットフォーム。",
    stack: ["EC UI", "Cart Flow"],
    tone: "coral",
  },
  {
    href: "/jobs",
    no: "02",
    year: "2026",
    tag: "RECRUITING SITE",
    title: "HIRAKU 建設",
    desc: "老舗建設会社の新卒・中途採用サイト。",
    stack: ["Recruit"],
    tone: "amber",
  },
  {
    href: "/tech",
    no: "03",
    year: "2026",
    tag: "WEB3 / CORPORATE",
    title: "NULL / PROTOCOL",
    desc: "ITベンチャー企業を模して動きの多いサイトサンプル。",
    stack: ["Interaction", "Canvas", "Motion"],
    tone: "violet",
  },
  {
    href: "/sports",
    no: "04",
    year: "2026",
    tag: "SPORTS CLUB",
    title: "AXIS SPORTS CLUB",
    desc: "総合スポーツクラブの公式サイト。プログラム検索から料金プラン、体験予約までの導線を設計。",
    stack: ["Fitness", "Schedule UI", "Pricing"],
    tone: "lime",
  },
  {
    href: "/baseball",
    no: "05",
    year: "2026",
    tag: "SPORTS TEAM",
    title: "汐風ボーイズ",
    desc: "少年野球チームの公式サイト。夏の炎天下を駆け抜けるような、若さと熱量を前面に出したデザイン。",
    stack: ["Team Branding", "Schedule", "Recruit"],
    tone: "sun",
  },
  {
    href: "/ramen",
    no: "06",
    year: "2026",
    tag: "RESTAURANT / RAMEN",
    title: "らーめん 灯火",
    desc: "町のらーめん店の公式サイト。湯気のシズル感と店主のこだわりが伝わる、あたたかな和モダンデザイン。",
    stack: ["Menu UI", "Store Info", "SNS"],
    tone: "ember",
  },
  {
    href: "/transport",
    no: "07",
    year: "2026",
    tag: "LOGISTICS / RECRUIT",
    title: "STRADA EXPRESS",
    desc: "運送会社のドライバー採用サイト。20〜40代ドライバーに向けた、疾走感のあるスタイリッシュな求人デザイン。",
    stack: ["Recruit", "Income Sim", "Driver"],
    tone: "steel",
  },
  {
    href: "/yakitori",
    no: "08",
    year: "2026",
    tag: "RESTAURANT / YAKITORI",
    title: "炭火焼鳥 炙",
    desc: "路地裏の炭火焼鳥店の公式サイト。漆黒に炭火の朱が灯る、煙の気配まで伝わる大人の和デザイン。",
    stack: ["Menu UI", "Store Info", "Reserve"],
    tone: "coal",
  },
  {
    href: "/clinic",
    no: "09",
    year: "2026",
    tag: "MEDICAL / CLINIC",
    title: "みなも内科・小児科クリニック",
    desc: "地域のかかりつけ医院の公式サイト。白基調のクリーンで穏やかな設計で、診療時間・外来案内・初診の流れ・アクセスまで、これ一枚で迷わず来院できる導線に。",
    stack: ["Clinic", "Schedule UI", "Access"],
    tone: "care",
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

export default function Home() {
  return (
    <main className="home">
      <CursorGlow />
      <ScrollReveal />
      <AboutPlay />
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

      <section className="h-about" id="about">
        <div className="h-portrait" data-reveal>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img className="h-portrait-photo" src="/portrait.png" alt="内田 裕太のアバターイラスト" />
          <span className="h-portrait-ring" />
          <span className="h-portrait-badge">
            CREATIVE
            <br />
            DEVELOPER
          </span>
          <span className="h-portrait-hi" aria-hidden>
            Hi 👋
          </span>
        </div>

        <div className="h-about-body" data-reveal style={{ "--reveal-delay": "0.1s" } as React.CSSProperties}>
          <span className="h-label">ABOUT ME</span>
          <h2>
            内田 裕太 <small>YUTA UCHIDA</small>
          </h2>
          <p>
            Webサイトの設計とフロントエンド実装を中心に活動しています。業界ごとの空気感を捉え、情報を整理し、
            見る人が自然に次の一歩へ進めるサイトづくりが得意です。デザインとコードの両方を行き来しながら、
            細部の手触りまで作り込みます。
          </p>

          <ol className="h-timeline">
            <li>
              <span className="h-timeline-year">2020 — 2023</span>
              <div className="h-timeline-body">
                <h3>独立系SIer</h3>
                <p>業務Webサイト・業務アプリケーションの要件定義〜保守運用までを担当。</p>
              </div>
            </li>
            <li className="is-current">
              <span className="h-timeline-year">2023 — 現在</span>
              <div className="h-timeline-body">
                <h3>ユーザ系金融SIer</h3>
                <p>案件PMとして要件定義〜リリースまでのプロジェクト管理、リリース後の運用を担当。</p>
              </div>
            </li>
          </ol>
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
          <span className="h-label">WORKS</span>
          <h2>
            作成サイト一覧<em>／09</em>
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

      <footer className="h-footer" id="contact">
        <span className="h-label" data-reveal>
          GET IN TOUCH
        </span>
        <a className="h-mail" href="mailto:yuta.uchida.business@gmail.com" data-reveal>
          yuta.uchida.business@gmail.com
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
