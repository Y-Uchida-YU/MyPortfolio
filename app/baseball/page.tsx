"use client";

import Link from "next/link";
import { useState } from "react";
import ScrollReveal from "../components/scroll-reveal";

const NUMBERS = [
  ["1997", "創部年", "海沿いの町で28年、白球を追いかけて"],
  ["48", "部員数（人）", "1年生〜6年生・マネージャー含む"],
  ["3", "県大会優勝（回）", "直近5年で3回。ベスト4は毎年の常連"],
  ["12", "巣立ったOB球児（人）", "甲子園・独立リーグに進んだ先輩たち"],
];

const VALUES = [
  {
    key: "zenryoku",
    icon: "🔥",
    title: "全力",
    lead: "声を出す。全力で走る。それだけでいい。",
    body: "上手い下手より先に、全力を出せるかどうか。1年生も6年生も、ベンチも先発も、同じグラウンドで同じだけ声を出します。全力を出した子は、負けても胸を張って帰れる。それが汐風の一番のルールです。",
    tags: ["全学年混合練習", "声出し必須", "結果より過程"],
  },
  {
    key: "nakama",
    icon: "🤝",
    title: "仲間",
    lead: "ひとりのエラーは、チーム全員のエラー。",
    body: "守備でエラーが出ても責めない。ベンチ全員で「ドンマイ」と声をかけ、次のプレーに切り替える指導を徹底しています。試合後は勝っても負けても円陣を組んで、その日の一番のファインプレーを全員でたたえ合います。",
    tags: ["ノーブレイム", "円陣ミーティング", "学年混合班"],
  },
  {
    key: "seicho",
    icon: "🌱",
    title: "成長",
    lead: "去年の自分に、勝てばそれでいい。",
    body: "勝敗と同じくらい、個人成長シートを大切にしています。球速・盗塁数・声の大きさまで、自分で決めた目標を月1回振り返る仕組み。「隣の子と比べない、去年の自分とだけ比べる」が合言葉です。",
    tags: ["個人成長シート", "月次振り返り", "目標設定"],
  },
];

const DAYS = ["月", "火", "水", "木", "金", "土", "日"] as const;

const SCHEDULE: Record<(typeof DAYS)[number], [string, string, string, string][]> = {
  月: [["休", "オフ", "自主練習日", "off"]],
  火: [["17:30", "基礎トレ・キャッチボール", "汐風グラウンド", "practice"]],
  水: [["17:30", "バッティング練習", "汐風グラウンド", "practice"]],
  木: [["休", "オフ", "自主練習日", "off"]],
  金: [["17:30", "守備・シートノック", "汐風グラウンド", "practice"]],
  土: [
    ["07:00", "全体練習", "汐風グラウンド", "practice"],
    ["13:00", "練習試合", "市営第二球場", "game"],
  ],
  日: [
    ["07:00", "公式戦 or 練習試合", "各地球場", "game"],
    ["16:00", "自主練習（希望者）", "汐風グラウンド", "practice"],
  ],
};

const PLAYERS = [
  {
    number: "1",
    name: "エース候補",
    role: "投手 / 6年生",
    quote: "打たれた次の1球が、一番好き。",
    body: "最速98km/h。昨秋の県大会準決勝では8回2失点。マウンド度胸が持ち味で、ピンチほど笑って見える。合言葉は「打たれてからが勝負」。",
    tone: "a",
  },
  {
    number: "C",
    name: "主将タイプ",
    role: "捕手 / 6年生",
    quote: "声は、いちばんのファインプレー。",
    body: "入部3年目にしてキャプテン就任。バッテリー間だけでなく、ベンチ全体を鼓舞する声出しに定評あり。守備率もチームトップ。",
    tone: "b",
  },
  {
    number: "4",
    name: "4番タイプ",
    role: "外野手 / 5年生",
    quote: "怖いのは三振より、振らないこと。",
    body: "長打力が武器の5年生。入部当初は球に当てるだけだったが、毎日の素振り200本を1年続けて開花。チーム打率トップの好打者。",
    tone: "c",
  },
];

const ENV = [
  ["⚾", "専用グラウンド", "町営運動公園の専用球場を土日は貸切利用"],
  ["🚐", "送迎バス", "遠方エリアは週2便の送迎バスを運行"],
  ["🥎", "用具の無料貸出", "グローブ・バット・ヘルメットは入部後すぐ使える貸出あり"],
  ["🧢", "ユニフォーム代補助", "初年度のユニフォーム代を半額補助（町の支援事業）"],
  ["🩹", "専属トレーナー帯同", "月2回、ケガ予防のストレッチ指導を実施"],
  ["👨‍👩‍👧", "保護者当番制", "無理のないシフト制。共働き家庭にも配慮"],
];

const VOICES = [
  ["野球未経験でしたが、コーチが基礎からゆっくり教えてくれました。今では朝いちばんに素振りする子になりました。", "1年生・保護者"],
  ["転校してきて友達がいなかった息子が、チームのおかげで毎日笑って学校に行けるようになりました。", "3年生・保護者"],
  ["中学で軟式野球部に入りましたが、汐風で教わった声出しと切り替えの速さがそのまま通用しています。", "卒団生・保護者"],
];

const FAQ = [
  ["野球未経験でも入部できますか?", "もちろんです。現在の部員の約6割が入部時は未経験でした。最初の1か月はボールに慣れることから始め、コーチが一人ひとりのペースに合わせて指導します。"],
  ["女の子も入部できますか?", "はい、在籍しています。マネージャーだけでなく選手として試合に出ている女子部員もおり、性別に関係なく実力でメンバーを選んでいます。"],
  ["用具を持っていないのですが。", "グローブ・バット・ヘルメットは無料貸出があるので、最初はTシャツと運動靴だけで参加できます。続けると決めたタイミングでご自身の用具を揃えていただければ大丈夫です。"],
  ["練習を見学したいのですが。", "毎週土曜7:00からの全体練習はいつでも見学自由です。事前にご連絡いただければ、体験参加（無料・用具貸出あり）も可能です。"],
];

export default function Baseball() {
  const [value, setValue] = useState(VALUES[0].key);
  const [day, setDay] = useState<(typeof DAYS)[number]>("土");

  const activeValue = VALUES.find((item) => item.key === value) ?? VALUES[0];

  return (
    <main className="bb">
      <ScrollReveal />
      <Link className="back-home" href="/">
        ← PORTFOLIO
      </Link>

      <nav className="bb-nav">
        <div className="bb-logo">
          <b>汐風ボーイズ</b>
          <small>SHIOKAZE BOYS BASEBALL CLUB</small>
        </div>
        <div className="bb-links">
          <a href="#about">チームについて</a>
          <a href="#schedule">スケジュール</a>
          <a href="#players">選手紹介</a>
          <a href="#env">環境・サポート</a>
          <a className="bb-entry" href="#entry">
            体験入部
          </a>
        </div>
      </nav>

      {/* ---------- hero ---------- */}
      <section className="bb-hero">
        <div className="bb-sun" aria-hidden />
        <div className="bb-stripes" aria-hidden />
        <div className="bb-hero-copy">
          <span className="bb-kicker">SHIOKAZE BOYS — SUMMER 2026</span>
          <h1>
            <span>白球を追いかけ、</span>
            <span className="accent">夏を燃やせ。</span>
          </h1>
          <p>
            海沿いの町で28年。1年生からエースまで、同じグラウンドで声を出す。
            <br />
            未経験でも、遠くから来ても、汐風はいつでも新しい仲間を待っています。
          </p>
          <div className="bb-hero-ctas">
            <a className="bb-btn" href="#entry">
              体験入部に申し込む
            </a>
            <a className="bb-btn ghost" href="#about">
              チームを知る ↓
            </a>
          </div>
        </div>
        <span className="bb-scroll">SCROLL</span>
      </section>

      {/* ---------- numbers ---------- */}
      <section className="bb-numbers">
        {NUMBERS.map(([value2, label, note], index) => (
          <div key={label} data-reveal style={{ "--reveal-delay": `${index * 0.08}s` } as React.CSSProperties}>
            <strong>{value2}</strong>
            <span>{label}</span>
            <small>{note}</small>
          </div>
        ))}
      </section>

      {/* ---------- message ---------- */}
      <section className="bb-message" id="about">
        <div className="bb-message-visual" data-reveal>
          <div className="bb-portrait">
            <span>監督</span>
          </div>
          <div className="bb-portrait-cap">
            監督
            <br />
            <b>宮下 和也</b>
          </div>
        </div>

        <div className="bb-message-body" data-reveal style={{ "--reveal-delay": "0.1s" } as React.CSSProperties}>
          <span className="bb-label">HEAD COACH</span>
          <h2>
            負けを、
            <br />
            恥じない野球を。
          </h2>
          <p>
            うちのチームは、県大会で優勝することもあれば、初戦で大敗することもあります。
            それでいいと思っています。大事なのは結果より、全力を出しきったかどうか。
          </p>
          <p>
            海風が強いグラウンドで、声を張り上げて白球を追いかけた夏は、
            大人になっても忘れません。勝っても負けても、胸を張って帰れるチームでありたい。
            それが28年間、変わらない汐風の指導方針です。
          </p>
        </div>
      </section>

      {/* ---------- values ---------- */}
      <section className="bb-values">
        <header className="bb-head" data-reveal>
          <span className="bb-label">OUR VALUES</span>
          <h2>3つの合言葉</h2>
        </header>

        <div className="bb-tabs" data-reveal>
          {VALUES.map((item) => (
            <button
              key={item.key}
              className={item.key === value ? "is-active" : ""}
              onClick={() => setValue(item.key)}
            >
              <b>{item.icon}</b>
              {item.title}
            </button>
          ))}
        </div>

        <div className="bb-value-panel" key={activeValue.key}>
          <div className="bb-value-copy">
            <span className="bb-value-icon">{activeValue.icon}</span>
            <h3>{activeValue.lead}</h3>
            <p>{activeValue.body}</p>
            <div className="bb-value-tags">
              {activeValue.tags.map((tag) => (
                <span key={tag}>{tag}</span>
              ))}
            </div>
          </div>
          <div className={`bb-value-art ${activeValue.key}`} aria-hidden />
        </div>
      </section>

      {/* ---------- schedule ---------- */}
      <section className="bb-schedule" id="schedule">
        <header className="bb-head light" data-reveal>
          <span className="bb-label">WEEKLY SCHEDULE</span>
          <h2>今週の練習・試合</h2>
        </header>

        <div className="bb-days" data-reveal>
          {DAYS.map((item) => (
            <button key={item} className={item === day ? "is-active" : ""} onClick={() => setDay(item)}>
              {item}
            </button>
          ))}
        </div>

        <div className="bb-lessons" key={day}>
          {SCHEDULE[day].map(([time, title, place, tone]) => (
            <div className={`bb-lesson ${tone}`} key={`${time}-${title}`}>
              <span className="bb-lesson-time">{time}</span>
              <div>
                <b>{title}</b>
                <small>{place}</small>
              </div>
              <span className="bb-lesson-tag">{tone === "game" ? "試合" : tone === "off" ? "オフ" : "練習"}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ---------- players ---------- */}
      <section className="bb-players" id="players">
        <header className="bb-head" data-reveal>
          <span className="bb-label">PLAYERS</span>
          <h2>選手紹介</h2>
        </header>

        <div className="bb-player-grid">
          {PLAYERS.map((person, index) => (
            <article
              className={`bb-player ${person.tone}`}
              key={person.name}
              data-reveal
              style={{ "--reveal-delay": `${index * 0.1}s` } as React.CSSProperties}
            >
              <div className="bb-player-face">
                <span>{person.number}</span>
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

      {/* ---------- environment ---------- */}
      <section className="bb-env" id="env">
        <header className="bb-head" data-reveal>
          <span className="bb-label">ENVIRONMENT</span>
          <h2>環境・サポート</h2>
        </header>

        <div className="bb-env-grid">
          {ENV.map(([icon, title, note], index) => (
            <div key={title} data-reveal style={{ "--reveal-delay": `${index * 0.06}s` } as React.CSSProperties}>
              <b>{icon}</b>
              <h3>{title}</h3>
              <p>{note}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ---------- voices ---------- */}
      <section className="bb-voices">
        <header className="bb-head light" data-reveal>
          <span className="bb-label">FAMILY&apos;S VOICE</span>
          <h2>保護者の声</h2>
        </header>

        <div className="bb-voice-grid">
          {VOICES.map(([body, who], index) => (
            <figure key={who} data-reveal style={{ "--reveal-delay": `${index * 0.1}s` } as React.CSSProperties}>
              <blockquote>{body}</blockquote>
              <figcaption>{who}</figcaption>
            </figure>
          ))}
        </div>
      </section>

      {/* ---------- faq ---------- */}
      <section className="bb-faq">
        <header className="bb-head" data-reveal>
          <span className="bb-label">FAQ</span>
          <h2>よくある質問</h2>
        </header>

        <div className="bb-faq-list">
          {FAQ.map(([question, answer]) => (
            <details key={question} data-reveal>
              <summary>{question}</summary>
              <p>{answer}</p>
            </details>
          ))}
        </div>
      </section>

      {/* ---------- entry cta ---------- */}
      <section className="bb-entry-cta" id="entry">
        <div className="bb-stripes" aria-hidden />
        <div data-reveal>
          <span className="bb-label">ENTRY</span>
          <h2>
            この夏、
            <br />
            グラウンドで会おう。
          </h2>
          <p>体験入部は無料。グローブがなくても大丈夫、まずは白球に触れてみてください。</p>
          <div className="bb-hero-ctas">
            <a className="bb-btn" href="#entry">
              体験入部に申し込む
            </a>
            <a className="bb-btn ghost" href="#schedule">
              練習を見学する
            </a>
          </div>
        </div>
      </section>

      <footer className="bb-footer">
        <div>
          <b>汐風ボーイズ野球部</b>
          <small>SHIOKAZE BOYS BASEBALL CLUB</small>
        </div>
        <span>汐見町営運動公園 · 創部 1997 · MOCK PROJECT © 2026</span>
      </footer>
    </main>
  );
}
