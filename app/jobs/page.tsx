"use client";

import Link from "next/link";
import { useState } from "react";
import ScrollReveal from "../components/scroll-reveal";

const NUMBERS = [
  ["1948", "創業年", "戦後の復興から、街をつくり続けて"],
  ["382", "社員数（人）", "うち20〜30代が45%"],
  ["96", "定着率（%）", "入社3年後の在籍率"],
  ["17.2", "平均残業（h/月）", "週休2日・完全現場カレンダー"],
];

const FIELDS = [
  {
    key: "kanri",
    icon: "🏗",
    title: "施工管理",
    lead: "現場のすべてを、指揮する。",
    body: "工程・品質・原価・安全の4つを束ね、職人・設計・発注者の間に立って建物を完成へ導く仕事です。若手のうちから小規模現場を任せ、30代で大型案件の主任を担う社員も少なくありません。",
    tags: ["建築", "土木", "1級施工管理技士"],
  },
  {
    key: "sekkei",
    icon: "📐",
    title: "設計",
    lead: "図面に、暮らしを描く。",
    body: "意匠・構造・設備の各チームが同じフロアで議論しながら進めます。BIMを標準採用し、初期段階から施工チームと納まりを検証。描いた線が現場でどう立ち上がるかを、その目で確かめられる環境です。",
    tags: ["意匠", "構造", "BIM / Revit"],
  },
  {
    key: "setsubi",
    icon: "⚙️",
    title: "設備・電気",
    lead: "建物に、血を通わせる。",
    body: "空調・給排水・電気を担う、建物の生命線。省エネ設計やZEB対応など、環境性能への要求が高まるいま、もっとも技術が問われる領域です。資格取得は会社が全額支援します。",
    tags: ["空調", "電気", "ZEB"],
  },
  {
    key: "dx",
    icon: "🛰",
    title: "DX・技術開発",
    lead: "現場を、アップデートする。",
    body: "ドローン測量、3Dスキャン、施工管理アプリの内製開発まで。「紙とFAXの業界」を変えるために、2021年に新設した部署です。建設未経験のITエンジニアも活躍しています。",
    tags: ["ドローン", "3Dスキャン", "内製開発"],
  },
];

const PEOPLE = [
  {
    initial: "S",
    name: "佐藤 大地",
    role: "施工管理 / 2019年 新卒入社",
    quote: "「任せる」が、口だけじゃない会社。",
    body: "入社4年目で、8階建てオフィスビルの現場主任を任されました。不安もありましたが、所長は「失敗の責任は俺が取る」と。引き渡しの日、施主さんに握手を求められた瞬間は一生忘れません。",
    tone: "a",
  },
  {
    initial: "M",
    name: "水野 遥",
    role: "設計（意匠） / 2016年 中途入社",
    quote: "描いた線の先に、人の生活がある。",
    body: "前職はアトリエ系の設計事務所。ヒラクに来て驚いたのは、設計と現場の距離の近さです。自分の図面がどう組み上がるかを毎週見に行ける。設計者として、これ以上の学びの場はありません。",
    tone: "b",
  },
  {
    initial: "K",
    name: "川村 蓮",
    role: "DX推進 / 2022年 中途入社（IT業界より）",
    quote: "建設を知らない僕が、必要とされた。",
    body: "Webエンジニアからの転身です。現場の職人さんに「これ便利だな」と言われるツールをつくる。ユーザーの顔が見える開発は、想像以上に面白い。建設の知識は入ってから覚えれば大丈夫でした。",
    tone: "c",
  },
];

const DAY = [
  ["07:45", "現場入り・朝礼準備", "その日の作業と危険ポイントを確認。"],
  ["08:00", "全体朝礼・KY活動", "協力会社を含め全員で安全確認。"],
  ["10:30", "工程会議", "職長と当日〜翌週の段取りをすり合わせ。"],
  ["12:00", "昼休憩", "現場事務所でチームと昼食。"],
  ["13:00", "品質検査・写真記録", "配筋検査。タブレットでその場で記録。"],
  ["16:00", "書類作成・翌日準備", "施工管理アプリで日報を提出。"],
  ["17:30", "退勤", "ノー残業デーは全社で徹底。"],
];

const BENEFITS = [
  ["🏠", "住宅手当", "月3万円（単身・世帯問わず）"],
  ["📚", "資格取得支援", "受験費用・講習費を全額会社負担＋合格祝金"],
  ["🌴", "年間休日125日", "完全週休2日・夏季/年末年始の長期休暇"],
  ["👶", "育休取得率", "女性100% / 男性68%（2025年度実績）"],
  ["🚄", "転勤配慮制度", "5年ごとに勤務地の希望を申告できます"],
  ["💰", "退職金・企業年金", "確定拠出年金＋独自の功労加算あり"],
];

const CAREER = [
  ["1–3年目", "現場を知る", "先輩とペアで現場に入り、施工管理の基礎と資格取得に集中。"],
  ["4–7年目", "現場を任される", "小〜中規模現場の主任として、工程と品質の責任を持つ。"],
  ["8–12年目", "現場を統べる", "所長として大型案件を指揮。予算と人のマネジメントへ。"],
  ["13年目〜", "会社をつくる", "支店長・技術開発・人材育成など、専門性に応じた道へ。"],
];

const FLOW = ["エントリー", "会社説明会（オンライン可）", "現場見学会", "面接（2回）", "内々定"];

const FAQ = [
  ["建設業界の経験がなくても応募できますか？", "はい。新卒はもちろん、中途採用でも他業界からの入社が全体の3割を占めます。特にDX推進部門はIT業界からの転職者が中心です。入社後3か月間の技術研修と、1年間のメンター制度で支えます。"],
  ["文系出身でも施工管理はできますか？", "できます。現在活躍している施工管理職のうち、約25%が文系学部の出身です。求められるのは段取り力と、人を巻き込むコミュニケーション力。専門知識は資格取得支援制度を使いながら身につけられます。"],
  ["転勤はありますか？", "全国に7支店があるため転勤の可能性はありますが、5年ごとに勤務地の希望を申告できる制度があります。ライフステージに応じた配慮も可能な限り行っています。"],
  ["残業は多いですか？", "月平均17.2時間です。工期に応じて繁閑はありますが、施工管理アプリの導入と週休2日の現場カレンダー徹底により、5年前と比べて残業時間は約40%削減しました。"],
];

const REQUIREMENTS = {
  new: [
    ["募集職種", "施工管理職 / 設計職 / 設備職 / DX推進職"],
    ["応募資格", "2027年3月までに四年制大学・大学院・高専を卒業見込みの方（学部学科不問）"],
    ["初任給", "大卒 26.5万円 / 院卒 28.8万円（2026年度実績・固定残業代なし）"],
    ["諸手当", "住宅手当・資格手当・現場手当・通勤手当（全額支給）"],
    ["賞与・昇給", "年2回（2025年度実績 5.4か月分）/ 昇給年1回"],
    ["勤務地", "本社（東京）・全国7支店および各現場"],
    ["休日休暇", "完全週休2日制・年間休日125日・有給・慶弔・育児介護休業"],
  ],
  mid: [
    ["募集職種", "施工管理（建築 / 土木）・設計・設備・DX推進"],
    ["応募資格", "実務経験3年以上、または関連資格をお持ちの方（DX職は業界未経験可）"],
    ["想定年収", "480万円 〜 950万円（経験・資格を考慮のうえ決定）"],
    ["諸手当", "住宅手当・資格手当（1級施工管理技士 月3万円）・現場手当"],
    ["賞与・昇給", "年2回 / 昇給年1回・実績に応じた特別賞与あり"],
    ["勤務地", "本社（東京）・全国7支店および各現場 ※希望を最大限考慮"],
    ["休日休暇", "完全週休2日制・年間休日125日・入社時から有給10日付与"],
  ],
};

export default function Jobs() {
  const [field, setField] = useState(FIELDS[0].key);
  const [track, setTrack] = useState<"new" | "mid">("new");

  const activeField = FIELDS.find((item) => item.key === field) ?? FIELDS[0];

  return (
    <main className="jobs">
      <ScrollReveal />
      <Link className="back-home" href="/">
        ← PORTFOLIO
      </Link>

      <nav className="j-nav">
        <div className="j-logo">
          <b>ヒラク建設</b>
          <small>HIRAKU CONSTRUCTION</small>
        </div>
        <div className="j-links">
          <a href="#about">私たちについて</a>
          <a href="#fields">仕事を知る</a>
          <a href="#people">人を知る</a>
          <a href="#env">環境・制度</a>
          <a href="#req">募集要項</a>
          <a className="j-entry" href="#entry">
            ENTRY
          </a>
        </div>
      </nav>

      {/* ---------- hero ---------- */}
      <section className="j-hero">
        <div className="j-blueprint" aria-hidden />
        <svg className="j-crane" viewBox="0 0 400 300" aria-hidden>
          <g stroke="currentColor" strokeWidth="2" fill="none">
            <path d="M60 290 L60 40 M60 40 L330 40 M60 70 L120 40 M330 40 L300 70" />
            <path d="M60 290 L100 290 M40 290 L80 290" />
            <path d="M250 40 L250 130" strokeDasharray="4 6" />
            <rect x="222" y="130" width="56" height="46" />
            <path d="M60 40 L60 20 L90 20" />
          </g>
        </svg>

        <div className="j-hero-copy">
          <span className="j-kicker">HIRAKU CONSTRUCTION — RECRUIT 2027</span>
          <h1>
            <span>街の、</span>
            <span>次を</span>
            <span>ひらく。</span>
          </h1>
          <p>
            1948年、焼け跡にバラックを建てるところから私たちは始まりました。
            <br />
            それから78年。つくるものは変わっても、仕事の芯は変わりません。
            <br />
            ——この街に、誰かの「日常」を建てる。
          </p>
          <div className="j-hero-ctas">
            <a className="j-btn" href="#entry">
              エントリーする
            </a>
            <a className="j-btn ghost" href="#fields">
              仕事を知る ↓
            </a>
          </div>
        </div>

        <span className="j-scroll">SCROLL</span>
      </section>

      {/* ---------- numbers ---------- */}
      <section className="j-numbers" id="about">
        {NUMBERS.map(([value, label, note], index) => (
          <div key={label} data-reveal style={{ "--reveal-delay": `${index * 0.08}s` } as React.CSSProperties}>
            <strong>{value}</strong>
            <span>{label}</span>
            <small>{note}</small>
          </div>
        ))}
      </section>

      {/* ---------- message ---------- */}
      <section className="j-message">
        <div className="j-message-visual" data-reveal>
          <div className="j-portrait">
            <span>HK</span>
          </div>
          <div className="j-portrait-cap">
            代表取締役社長
            <br />
            <b>平久 誠一郎</b>
          </div>
        </div>

        <div className="j-message-body" data-reveal style={{ "--reveal-delay": "0.1s" } as React.CSSProperties}>
          <span className="j-label">TOP MESSAGE</span>
          <h2>
            建物は、
            <br />
            誰かの人生の
            <br />
            <em>器</em>になる。
          </h2>
          <p>
            私たちが建てるのは、コンクリートと鉄の塊ではありません。
            子どもが走り回る保育園。夜勤明けの看護師が仮眠をとる病院。
            誰かが泣いて、笑って、人生を過ごす「器」です。
          </p>
          <p>
            だからヒラク建設は、工期と原価だけを見る会社にはなりません。
            「この建物を10年後に使う人は、どう感じるだろうか」——そう考えられる人と、
            これからの78年をつくっていきたいと思っています。
          </p>
        </div>
      </section>

      {/* ---------- fields ---------- */}
      <section className="j-fields" id="fields">
        <header className="j-head" data-reveal>
          <span className="j-label">OUR FIELDS</span>
          <h2>仕事を知る</h2>
        </header>

        <div className="j-tabs" data-reveal>
          {FIELDS.map((item) => (
            <button
              key={item.key}
              className={item.key === field ? "is-active" : ""}
              onClick={() => setField(item.key)}
            >
              <b>{item.icon}</b>
              {item.title}
            </button>
          ))}
        </div>

        <div className="j-field-panel" key={activeField.key}>
          <div className="j-field-copy">
            <span className="j-field-icon">{activeField.icon}</span>
            <h3>{activeField.lead}</h3>
            <p>{activeField.body}</p>
            <div className="j-field-tags">
              {activeField.tags.map((tag) => (
                <span key={tag}>{tag}</span>
              ))}
            </div>
          </div>
          <div className={`j-field-art ${activeField.key}`} aria-hidden />
        </div>
      </section>

      {/* ---------- people ---------- */}
      <section className="j-people" id="people">
        <header className="j-head" data-reveal>
          <span className="j-label">PEOPLE</span>
          <h2>人を知る</h2>
        </header>

        <div className="j-people-grid">
          {PEOPLE.map((person, index) => (
            <article
              className={`j-person ${person.tone}`}
              key={person.name}
              data-reveal
              style={{ "--reveal-delay": `${index * 0.1}s` } as React.CSSProperties}
            >
              <div className="j-person-face">
                <span>{person.initial}</span>
              </div>
              <blockquote>{person.quote}</blockquote>
              <p>{person.body}</p>
              <footer>
                <b>{person.name}</b>
                <small>{person.role}</small>
              </footer>
            </article>
          ))}
        </div>
      </section>

      {/* ---------- a day ---------- */}
      <section className="j-day">
        <header className="j-head light" data-reveal>
          <span className="j-label">A DAY AT SITE</span>
          <h2>施工管理職・ある一日</h2>
        </header>

        <div className="j-timeline">
          {DAY.map(([time, title, note], index) => (
            <div key={time} data-reveal style={{ "--reveal-delay": `${index * 0.06}s` } as React.CSSProperties}>
              <span className="j-time">{time}</span>
              <div>
                <b>{title}</b>
                <small>{note}</small>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ---------- environment ---------- */}
      <section className="j-env" id="env">
        <header className="j-head" data-reveal>
          <span className="j-label">ENVIRONMENT</span>
          <h2>環境・制度</h2>
        </header>

        <div className="j-benefits">
          {BENEFITS.map(([icon, title, note], index) => (
            <div key={title} data-reveal style={{ "--reveal-delay": `${index * 0.06}s` } as React.CSSProperties}>
              <b>{icon}</b>
              <h3>{title}</h3>
              <p>{note}</p>
            </div>
          ))}
        </div>

        <div className="j-career" data-reveal>
          <h3>キャリアパス</h3>
          <div className="j-career-steps">
            {CAREER.map(([term, title, note]) => (
              <div key={term}>
                <span className="j-career-term">{term}</span>
                <b>{title}</b>
                <small>{note}</small>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- requirements ---------- */}
      <section className="j-req" id="req">
        <header className="j-head light" data-reveal>
          <span className="j-label">REQUIREMENTS</span>
          <h2>募集要項</h2>
        </header>

        <div className="j-track" data-reveal>
          <button className={track === "new" ? "is-active" : ""} onClick={() => setTrack("new")}>
            新卒採用
          </button>
          <button className={track === "mid" ? "is-active" : ""} onClick={() => setTrack("mid")}>
            キャリア採用
          </button>
        </div>

        <table className="j-table" data-reveal>
          <tbody>
            {REQUIREMENTS[track].map(([label, value]) => (
              <tr key={label}>
                <th>{label}</th>
                <td>{value}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="j-flow" data-reveal>
          <h3>選考フロー</h3>
          <ol>
            {FLOW.map((step, index) => (
              <li key={step}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                {step}
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ---------- faq ---------- */}
      <section className="j-faq">
        <header className="j-head" data-reveal>
          <span className="j-label">FAQ</span>
          <h2>よくある質問</h2>
        </header>

        <div className="j-faq-list">
          {FAQ.map(([question, answer]) => (
            <details key={question} data-reveal>
              <summary>{question}</summary>
              <p>{answer}</p>
            </details>
          ))}
        </div>
      </section>

      {/* ---------- entry ---------- */}
      <section className="j-entry-cta" id="entry">
        <div className="j-blueprint" aria-hidden />
        <div data-reveal>
          <span className="j-label">ENTRY</span>
          <h2>
            この街の次を、
            <br />
            一緒にひらこう。
          </h2>
          <p>エントリーは3分で完了します。まずは会社説明会と現場見学会から。</p>
          <div className="j-hero-ctas">
            <a className="j-btn" href="#entry">
              新卒エントリー
            </a>
            <a className="j-btn ghost" href="#entry">
              キャリア採用に応募
            </a>
          </div>
        </div>
      </section>

      <footer className="j-footer">
        <div>
          <b>ヒラク建設株式会社</b>
          <small>HIRAKU CONSTRUCTION CO., LTD.</small>
        </div>
        <span>東京都中央区 · 創業 1948 · MOCK PROJECT © 2026</span>
      </footer>
    </main>
  );
}
