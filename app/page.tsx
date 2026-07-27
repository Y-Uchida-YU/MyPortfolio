import Link from "next/link";
import ScrollReveal from "./components/scroll-reveal";
import AboutPlay from "./components/about-play";
import HeroShowcase from "./components/hero-showcase";
import WorksGallery from "./components/works-gallery";
import { works } from "./works";

const MAIL = "yuta.uchida.business@gmail.com";

const ticker = [
  "UI DESIGN",
  "FRONTEND",
  "INFORMATION ARCHITECTURE",
  "ART DIRECTION",
  "COPYWRITING",
  "ACCESSIBILITY",
];

const capabilities = [
  {
    key: "Design",
    label: "デザイン",
    items: ["アートディレクション", "UIデザイン", "情報設計", "コピーライティング"],
  },
  {
    key: "Frontend",
    label: "フロントエンド",
    items: ["HTML / CSS", "TypeScript", "React / Next.js", "アクセシビリティ"],
  },
  {
    key: "Direction",
    label: "ディレクション",
    items: ["要件定義", "進行管理", "リリース・運用"],
  },
];

const career = [
  {
    period: "2020 — 2023",
    org: "独立系SIer",
    role: "システムエンジニア",
    body: "業務Webサイト・業務アプリケーションの要件定義から設計・実装、保守運用までを担当。",
  },
  {
    period: "2023 — 現在",
    org: "ユーザ系金融SIer",
    role: "プロジェクトマネージャー",
    body: "案件PMとして要件定義からリリースまでのプロジェクト管理と、リリース後の運用を担当。",
    current: true,
  },
];

export default function Home() {
  return (
    <div className="pf" id="top">
      <ScrollReveal />
      <AboutPlay />
      <div className="pf-grain" aria-hidden />

      <header className="pf-nav">
        <Link href="/" className="pf-mark">
          YU<span>.</span>
        </Link>
        <nav className="pf-nav-links" aria-label="ページ内ナビゲーション">
          <a href="#works">
            WORKS<em>{String(works.length).padStart(2, "0")}</em>
          </a>
          <a href="#about">ABOUT</a>
          <a href="#contact">CONTACT</a>
        </nav>
        <span className="pf-live">
          <i />
          受注可能 <b>AVAILABLE</b>
        </span>
      </header>

      <main>
        <section className="pf-hero">
          <div className="pf-hero-top">
            <p className="pf-eyebrow" data-reveal>
              内田 裕太 — WEB DESIGNER &amp; FRONTEND DEVELOPER
            </p>
            <h1 data-reveal style={{ "--reveal-delay": "0.06s" } as React.CSSProperties}>
              業界の空気を、
              <br />
              サイトの<span className="pf-mark-line">手ざわり</span>に。
            </h1>
          </div>

          <div className="pf-hero-main">
            <div className="pf-hero-copy">
              <p className="pf-lead" data-reveal style={{ "--reveal-delay": "0.12s" } as React.CSSProperties}>
                業種ごとにまるで違う「らしさ」を読み解いて、色・文字・間合い・導線に落とし込む。
                企画からデザイン、フロントエンド実装まで、ひとりで最後まで手を動かします。
              </p>

              <div className="pf-actions" data-reveal style={{ "--reveal-delay": "0.18s" } as React.CSSProperties}>
                <a className="pf-btn is-primary" href="#works">
                  制作実績を見る
                  <i />
                </a>
                <a className="pf-btn" href={`mailto:${MAIL}`}>
                  お問い合わせ
                </a>
              </div>

              <dl className="pf-facts">
                <div>
                  <dt>PROJECTS</dt>
                  <dd>{String(works.length).padStart(2, "0")}</dd>
                </div>
                <div>
                  <dt>SINCE</dt>
                  <dd>2020</dd>
                </div>
                <div>
                  <dt>BASE</dt>
                  <dd>Tokyo, JP</dd>
                </div>
              </dl>
            </div>

            <div className="pf-hero-stage" data-reveal style={{ "--reveal-delay": "0.1s" } as React.CSSProperties}>
              <HeroShowcase />
            </div>
          </div>
        </section>

        <div className="pf-ticker" aria-hidden>
          <div className="pf-ticker-track">
            {[0, 1].map((copy) => (
              <div className="pf-ticker-group" key={copy}>
                {ticker.map((item) => (
                  <span key={item}>
                    {item}
                    <i />
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>

        <section className="pf-works" id="works">
          <header className="pf-head" data-reveal>
            <p className="pf-label">SELECTED WORKS</p>
            <h2>
              制作実績<em>{String(works.length).padStart(2, "0")}</em>
            </h2>
            <p className="pf-head-note">
              架空のクライアントを想定し、業種ごとにゼロから設計・実装したサイトです。
              コンセプト設計、コピー、デザイン、コーディングまですべて一人で担当しています。
              カードはそのサイトの実際の画面 — カーソルを重ねるとページが流れていきます。
            </p>
          </header>

          <WorksGallery />
        </section>

        <section className="pf-about" id="about">
          <header className="pf-head" data-reveal>
            <p className="pf-label">ABOUT</p>
            <h2>
              デザインとコードの
              <br />
              あいだを、行き来する。
            </h2>
          </header>

          <div className="pf-about-grid">
            <figure className="pf-portrait" data-reveal>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/portrait.jpg" alt="内田 裕太のアバターイラスト" />
              <figcaption>
                内田 裕太<span>YUTA UCHIDA — TOKYO</span>
              </figcaption>
            </figure>

            <div className="pf-about-body" data-reveal style={{ "--reveal-delay": "0.08s" } as React.CSSProperties}>
              <p className="pf-about-lead">
                Webサイトの設計とフロントエンド実装を中心に活動しています。
                業界ごとの空気感を捉え、情報を整理し、見る人が自然に次の一歩へ進めるサイトづくりが得意です。
              </p>
              <p>
                本業ではSIerでプロジェクトマネージャーとして要件定義からリリース、運用までを見ています。
                だからこそ「きれいに見える」だけで終わらせず、運用しやすさや更新のしやすさまで含めて設計するようにしています。
                デザインとコードの両方を行き来しながら、細部の手触りまで作り込むのが好きです。
              </p>

              <h3 className="pf-sub">CAPABILITIES</h3>
              <dl className="pf-caps">
                {capabilities.map((cap) => (
                  <div key={cap.key}>
                    <dt>
                      {cap.key}
                      <span>{cap.label}</span>
                    </dt>
                    <dd>
                      {cap.items.map((item) => (
                        <span key={item}>{item}</span>
                      ))}
                    </dd>
                  </div>
                ))}
              </dl>

              <h3 className="pf-sub">CAREER</h3>
              <ol className="pf-career">
                {career.map((job) => (
                  <li key={job.period} className={job.current ? "is-current" : undefined}>
                    <span className="pf-career-period">{job.period}</span>
                    <div>
                      <h4>
                        {job.org}
                        <span>{job.role}</span>
                      </h4>
                      <p>{job.body}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </section>
      </main>

      <footer className="pf-contact" id="contact">
        <div className="pf-contact-in">
          <div>
            <p className="pf-label" data-reveal>
              CONTACT
            </p>
            <h2 data-reveal style={{ "--reveal-delay": "0.06s" } as React.CSSProperties}>
              サイトのご相談、
              <br />
              お気軽にどうぞ。
            </h2>
            <a
              className="pf-mail"
              href={`mailto:${MAIL}`}
              data-reveal
              style={{ "--reveal-delay": "0.12s" } as React.CSSProperties}
            >
              {MAIL}
              <i />
            </a>
            <p className="pf-note" data-reveal style={{ "--reveal-delay": "0.18s" } as React.CSSProperties}>
              制作のご依頼・ご相談は、通常2営業日以内にご返信します。
            </p>
          </div>

          <dl className="pf-contact-info" data-reveal style={{ "--reveal-delay": "0.14s" } as React.CSSProperties}>
            <div>
              <dt>STATUS</dt>
              <dd>
                <span className="pf-dot" />
                新規案件 受付中
              </dd>
            </div>
            <div>
              <dt>AREA</dt>
              <dd>東京 / フルリモート</dd>
            </div>
            <div>
              <dt>SCOPE</dt>
              <dd>コーポレート / 採用サイト / 店舗サイト / LP / リニューアル</dd>
            </div>
            <div>
              <dt>ROLE</dt>
              <dd>設計・デザイン・フロントエンド実装</dd>
            </div>
          </dl>
        </div>

        <div className="pf-foot">
          <span>© 2026 YUTA UCHIDA</span>
          <span>DESIGNED &amp; BUILT IN TOKYO</span>
          <a href="#top">PAGE TOP</a>
        </div>
      </footer>
    </div>
  );
}
