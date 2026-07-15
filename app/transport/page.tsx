"use client";

/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { useState } from "react";
import ScrollReveal from "../components/scroll-reveal";

const STATS = [
  ["1,200", "名", "稼働ドライバー", "全国で走る登録ドライバー数"],
  ["42", "万円", "平均月収", "フル稼働ドライバーの平均月収"],
  ["94", "%", "継続率", "1年後も走り続けるドライバーの割合"],
  ["最短3", "日", "稼働開始", "エントリーから初稼働までの最短日数"],
];

const FEATURES = [
  {
    tag: "FLEXIBLE",
    title: "働く時間は、自分で決める。",
    body: "週1日・1日3時間からOK。朝だけ、夜だけ、土日だけ。ライフスタイルに合わせてシフトを組めます。掛け持ちも副業も歓迎です。",
  },
  {
    tag: "REWARD",
    title: "走った分だけ、しっかり還元。",
    body: "完全出来高＋距離インセンティブ。報酬は週払い対応で、急な出費にも安心。頑張りがそのまま収入に直結します。",
  },
  {
    tag: "APP",
    title: "受注もナビも、アプリで完結。",
    body: "案件の受注・ルートナビ・売上管理まで専用アプリひとつ。面倒な事務作業はゼロ。スマホがあれば今日から走り出せます。",
    img: "/transport/app.jpg",
    alt: "配送アプリのナビ画面を表示したスマートフォン",
  },
  {
    tag: "SUPPORT",
    title: "未経験でも、置いていかない。",
    body: "9割以上が異業種からの転身。同乗研修・車両リース・保険まで専属担当がフルサポート。普通免許があれば始められます。",
  },
];

type StyleKey = "side" | "full" | "long";

const STYLES: { key: StyleKey; label: string; note: string }[] = [
  { key: "side", label: "副業・週2", note: "スキマ時間で" },
  { key: "full", label: "フル稼働", note: "本業として" },
  { key: "long", label: "長距離・大型", note: "がっつり稼ぐ" },
];

const INCOME: Record<StyleKey, { pay: string; days: string; hours: string; case: string }> = {
  side: { pay: "12〜18", days: "月8日", hours: "1日5h", case: "本業の休日にラストワンマイル配送。会社員の副収入に。" },
  full: { pay: "38〜48", days: "月22日", hours: "1日8h", case: "定期ルート便を中心にフル稼働。安定して稼ぎたい方に。" },
  long: { pay: "55〜70", days: "月20日", hours: "長距離便", case: "中〜大型で長距離・チャーター。経験を活かして高収入。" },
};

const JOBS = [
  {
    img: "/transport/boxes.jpg",
    alt: "段ボールを運ぶ配送ドライバー",
    name: "ラストワンマイル配送",
    pay: "1配送 150円〜",
    body: "軽バンで担当エリアの宅配。未経験デビューの定番。",
    tags: ["軽貨物", "未経験歓迎", "日中"],
  },
  {
    img: "/transport/truck-road.jpg",
    alt: "幹線道路を走る大型トラック",
    name: "定期ルート便",
    pay: "日給 18,000円〜",
    body: "決まった取引先を巡回。ルートが固定で予定が立てやすい。",
    tags: ["中型", "固定ルート", "安定収入"],
  },
  {
    img: "/transport/truck-white.jpg",
    alt: "夕暮れの高速道路を走るトレーラー",
    name: "スポット・チャーター便",
    pay: "1件 25,000円〜",
    body: "空いた時間に単発で。高単価案件を選んで稼働できる。",
    tags: ["スポット", "高単価", "自由シフト"],
  },
  {
    img: "/transport/night.jpg",
    alt: "夜の橋を疾走する大型トラック",
    name: "長距離・大型便",
    pay: "月収 55万円〜",
    body: "中〜大型で都市間輸送。経験と免許を活かす高収入枠。",
    tags: ["大型", "長距離", "高収入"],
  },
];

const STEPS = [
  ["01", "エントリー", "スマホから60秒。名前と連絡先だけでOK。履歴書は不要です。"],
  ["02", "オンライン面談", "担当者とビデオ or 電話で希望の働き方をヒアリング。平日夜も対応。"],
  ["03", "登録・車両準備", "必要書類を提出し、車両リースや保険の手続き。同乗研修もここで。"],
  ["04", "稼働スタート", "アプリで案件を受注して初稼働。最短3日で走り出せます。"],
];

const VOICES = [
  {
    img: "/transport/voice1.jpg",
    alt: "笑顔のドライバー 佐々木さん",
    quote: "子どもの送り迎えの合間に、月18万。",
    body: "前職は販売職。シフトの自由さに惹かれて登録しました。午前だけ走って午後は家庭に。無理なく続けられるのが一番の魅力です。",
    name: "佐々木 里奈さん",
    meta: "軽貨物・週4稼働 / 32歳",
  },
  {
    img: "/transport/voice2.jpg",
    alt: "倉庫に立つドライバー 田中さん",
    quote: "未経験から半年で、月収45万円。",
    body: "同乗研修が丁寧で、運転が不安な自分でもすぐ慣れました。頑張った分だけ返ってくるので、モチベーションが続きます。",
    name: "田中 悠斗さん",
    meta: "定期ルート便・フル稼働 / 27歳",
  },
  {
    img: null,
    alt: "",
    quote: "脱サラして、収入も自由も手に入れた。",
    body: "会社員時代より収入は1.4倍。何より上司も満員電車もないのが最高です。長距離の日は相棒のトラックと二人きり、最高の時間ですよ。",
    name: "山口 健さん",
    meta: "長距離・大型便 / 41歳",
  },
];

const FAQ = [
  ["普通免許だけでも働けますか?", "はい。軽貨物・ラストワンマイル配送は普通免許(AT可)で始められます。中型・大型便は該当免許が必要ですが、取得支援制度もご用意しています。"],
  ["未経験でも大丈夫ですか?", "現在稼働中のドライバーの9割以上が異業種からの転身です。同乗研修とアプリのナビがあるので、道に不慣れな方でも安心してスタートできます。"],
  ["車を持っていません。", "軽バン・トラックのリース制度があります。初期費用をかけずに始められ、稼働しながら支払える仕組みなので、まとまった資金は不要です。"],
  ["報酬はいつ支払われますか?", "月払いのほか、週払いにも対応しています。急な出費が必要なときも安心です。報酬明細はすべてアプリでリアルタイムに確認できます。"],
  ["副業・掛け持ちはできますか?", "もちろん可能です。週1日・1日3時間から稼働できるので、会社員の副業や他社との掛け持ちで働く登録ドライバーも多数在籍しています。"],
];

export default function Transport() {
  const [style, setStyle] = useState<StyleKey>("full");
  const income = INCOME[style];

  return (
    <main className="tp">
      <ScrollReveal />
      <Link className="back-home" href="/">
        ← PORTFOLIO
      </Link>

      <nav className="tp-nav">
        <div className="tp-logo">
          <b>STRADA</b>
          <small>EXPRESS DELIVERY</small>
        </div>
        <div className="tp-links">
          <a href="#feature">選ばれる理由</a>
          <a href="#income">収入例</a>
          <a href="#jobs">仕事の種類</a>
          <a href="#flow">応募の流れ</a>
          <a className="tp-nav-cta" href="#entry">
            60秒で応募
          </a>
        </div>
      </nav>

      {/* ---------- hero ---------- */}
      <section className="tp-hero">
        <img className="tp-hero-bg" src="/transport/sunset.jpg" alt="夕暮れの高速道路を走るトラック" />
        <div className="tp-hero-inner">
          <span className="tp-kicker">STRADA EXPRESS — DRIVER RECRUIT 2026</span>
          <h1>
            <span>走った分だけ、</span>
            <span className="accent">自由に稼ぐ。</span>
          </h1>
          <p>
            週1日・1日3時間から。未経験でも、車がなくても大丈夫。
            <br />
            アプリひとつで案件を選び、自分のペースで走り出せる新しい運送のかたち。
          </p>
          <div className="tp-hero-ctas">
            <a className="tp-btn" href="#entry">
              ドライバーに応募する
            </a>
            <a className="tp-btn ghost" href="#income">
              収入をシミュレーション
            </a>
          </div>
          <div className="tp-hero-chips">
            <span>普通免許でOK</span>
            <span>報酬 週払い対応</span>
            <span>車両リースあり</span>
            <span>副業歓迎</span>
          </div>
        </div>
        <span className="tp-hero-scroll">SCROLL</span>
      </section>

      {/* ---------- stats ---------- */}
      <section className="tp-stats">
        {STATS.map(([num, unit, label, note], index) => (
          <div key={label} data-reveal style={{ "--reveal-delay": `${index * 0.08}s` } as React.CSSProperties}>
            <strong>
              {num}
              <em>{unit}</em>
            </strong>
            <span>{label}</span>
            <small>{note}</small>
          </div>
        ))}
      </section>

      {/* ---------- features ---------- */}
      <section className="tp-feature" id="feature">
        <header className="tp-head" data-reveal>
          <span className="tp-label">WHY STRADA</span>
          <h2>ドライバーに選ばれる、4つの理由。</h2>
        </header>

        <div className="tp-feature-grid">
          {FEATURES.map((item, index) => (
            <article
              className={`tp-feature-card ${item.img ? "has-photo" : ""}`}
              key={item.tag}
              data-reveal
              style={{ "--reveal-delay": `${index * 0.08}s` } as React.CSSProperties}
            >
              {item.img ? (
                <div className="tp-feature-photo">
                  <img src={item.img} alt={item.alt} loading="lazy" />
                </div>
              ) : null}
              <span className="tp-feature-tag">{item.tag}</span>
              <h3>{item.title}</h3>
              <p>{item.body}</p>
            </article>
          ))}
        </div>
      </section>

      {/* ---------- income simulator ---------- */}
      <section className="tp-income" id="income">
        <div className="tp-income-band" aria-hidden />
        <header className="tp-head light" data-reveal>
          <span className="tp-label">INCOME</span>
          <h2>あなたの稼ぎ方は、どのタイプ?</h2>
        </header>

        <div className="tp-style-tabs" data-reveal>
          {STYLES.map((item) => (
            <button
              key={item.key}
              className={item.key === style ? "is-active" : ""}
              onClick={() => setStyle(item.key)}
            >
              <b>{item.label}</b>
              <small>{item.note}</small>
            </button>
          ))}
        </div>

        <div className="tp-income-panel" key={style}>
          <div className="tp-income-figure">
            <span className="tp-income-cap">想定月収</span>
            <strong>
              {income.pay}
              <em>万円</em>
            </strong>
            <div className="tp-income-meta">
              <span>
                稼働 <b>{income.days}</b>
              </span>
              <span>
                目安 <b>{income.hours}</b>
              </span>
            </div>
          </div>
          <p className="tp-income-note">{income.case}</p>
        </div>
        <p className="tp-income-disc" data-reveal>
          ※ 稼働実績にもとづくモデルケースです。エリア・案件・稼働状況により変動します。
        </p>
      </section>

      {/* ---------- jobs ---------- */}
      <section className="tp-jobs" id="jobs">
        <header className="tp-head" data-reveal>
          <span className="tp-label">JOBS</span>
          <h2>選べる、4つの走り方。</h2>
        </header>

        <div className="tp-job-grid">
          {JOBS.map((job, index) => (
            <article
              className="tp-job-card"
              key={job.name}
              data-reveal
              style={{ "--reveal-delay": `${index * 0.08}s` } as React.CSSProperties}
            >
              <div className="tp-job-photo">
                <img src={job.img} alt={job.alt} loading="lazy" />
                <span className="tp-job-pay">{job.pay}</span>
              </div>
              <div className="tp-job-body">
                <h3>{job.name}</h3>
                <p>{job.body}</p>
                <div className="tp-job-tags">
                  {job.tags.map((tag) => (
                    <span key={tag}>{tag}</span>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* ---------- flow ---------- */}
      <section className="tp-flow" id="flow">
        <header className="tp-head light" data-reveal>
          <span className="tp-label">FLOW</span>
          <h2>応募から稼働まで、最短3日。</h2>
        </header>

        <div className="tp-flow-grid">
          {STEPS.map(([no, title, body], index) => (
            <div
              className="tp-step"
              key={no}
              data-reveal
              style={{ "--reveal-delay": `${index * 0.08}s` } as React.CSSProperties}
            >
              <span className="tp-step-no">{no}</span>
              <h3>{title}</h3>
              <p>{body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ---------- voices ---------- */}
      <section className="tp-voices">
        <header className="tp-head" data-reveal>
          <span className="tp-label">DRIVER&apos;S VOICE</span>
          <h2>走る人の、リアルな声。</h2>
        </header>

        <div className="tp-voice-grid">
          {VOICES.map((v, index) => (
            <article
              className="tp-voice-card"
              key={v.name}
              data-reveal
              style={{ "--reveal-delay": `${index * 0.1}s` } as React.CSSProperties}
            >
              <blockquote>{v.quote}</blockquote>
              <p>{v.body}</p>
              <footer>
                {v.img ? (
                  <img src={v.img} alt={v.alt} loading="lazy" />
                ) : (
                  <span className="tp-voice-avatar">{v.name.slice(0, 1)}</span>
                )}
                <span>
                  <b>{v.name}</b>
                  <small>{v.meta}</small>
                </span>
              </footer>
            </article>
          ))}
        </div>
      </section>

      {/* ---------- faq ---------- */}
      <section className="tp-faq">
        <header className="tp-head" data-reveal>
          <span className="tp-label">FAQ</span>
          <h2>よくある質問</h2>
        </header>

        <div className="tp-faq-list">
          {FAQ.map(([q, a]) => (
            <details key={q} data-reveal>
              <summary>{q}</summary>
              <p>{a}</p>
            </details>
          ))}
        </div>
      </section>

      {/* ---------- entry cta ---------- */}
      <section className="tp-entry" id="entry">
        <img className="tp-entry-bg" src="/transport/night.jpg" alt="" aria-hidden />
        <div className="tp-entry-inner" data-reveal>
          <span className="tp-label">ENTRY</span>
          <h2>
            まずは60秒。
            <br />
            走り出す準備をしよう。
          </h2>
          <p>履歴書も職歴も不要。名前と連絡先だけで応募完了。担当者から折り返しご連絡します。</p>
          <div className="tp-entry-ctas">
            <a className="tp-btn" href="#entry">
              Webで応募する
            </a>
            <a className="tp-btn line" href="#entry">
              LINEで相談する
            </a>
          </div>
          <div className="tp-entry-contact">
            <span>
              電話でのご応募 <b>0120-000-000</b>（平日9:00–20:00）
            </span>
          </div>
        </div>
      </section>

      <footer className="tp-footer">
        <div className="tp-footer-brand">
          <b>STRADA EXPRESS</b>
          <small>株式会社ストラーダ・エクスプレス</small>
        </div>
        <dl className="tp-footer-info">
          <div>
            <dt>所在地</dt>
            <dd>東京都江東区潮見 3-1-8 STRADA 物流センター</dd>
          </div>
          <div>
            <dt>事業内容</dt>
            <dd>一般貨物自動車運送事業 / 軽貨物配送 / ドライバーマッチング</dd>
          </div>
          <div>
            <dt>稼働エリア</dt>
            <dd>全国8拠点（首都圏・中部・関西・九州ほか）</dd>
          </div>
        </dl>
        <span className="tp-footer-copy">MOCK PROJECT © 2026 — STRADA EXPRESS</span>
      </footer>
    </main>
  );
}
