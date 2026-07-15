"use client";

/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { useState } from "react";
import ScrollReveal from "../components/scroll-reveal";

const NUMBERS = [
  ["4,200", "在籍会員数（人）", "10代から80代まで、幅広い世代が通う"],
  ["120", "週間プログラム数（本）", "スタジオ・プール・ジムの全レッスン"],
  ["23", "営業時間（時まで）", "朝6時オープン。仕事帰りでも余裕"],
  ["98", "継続率（%）", "入会1年後も通い続けている会員の割合"],
];

const PROGRAMS = [
  {
    key: "gym",
    icon: "🏋️",
    title: "ジムエリア",
    lead: "最新マシン120台。待たない、迷わない。",
    body: "有酸素・フリーウェイト・マシン筋トレの3ゾーン制。全マシンにタッチパネルを搭載し、あなたの前回の重量・回数を自動で記録します。初回はトレーナーが専用メニューを作成するので、初心者でも今日から迷いません。",
    tags: ["マシン120台", "自動記録", "初回メニュー作成"],
  },
  {
    key: "studio",
    icon: "🧘",
    title: "スタジオ",
    lead: "汗も、静けさも。週70本のレッスン。",
    body: "暗闇バイクからヨガ、ダンス、格闘技系まで週70本。天井高4.5mの大型スタジオと、キャンドルライトのマインドフルネススタジオの2面構成です。予約はアプリから30秒、キャンセル待ちも自動繰り上げ。",
    tags: ["週70本", "2スタジオ", "アプリ予約"],
  },
  {
    key: "pool",
    icon: "🏊",
    title: "プール",
    lead: "25m×6コース。泳ぐ人も、歩く人も。",
    body: "水温31度の屋内温水プール。コースは「泳ぐ」「歩く」「レッスン」で常時分離しているので、マイペースに使えます。子ども向けスクールと成人向けマスターズクラスも開講中。ジャグジー・サウナ完備。",
    tags: ["25m×6コース", "温水31℃", "サウナ完備"],
  },
  {
    key: "tennis",
    icon: "🎾",
    title: "テニス",
    lead: "屋内2面。雨の日も、夜も、砂まみれなし。",
    body: "全天候型インドアコート2面。照明・空調完備で、天気を気にせず年間通してプレーできます。レベル別スクールは入門から上級まで6クラス。ラケットとシューズは無料レンタルがあるので手ぶらでOK。",
    tags: ["インドア2面", "レベル別6クラス", "手ぶらOK"],
  },
];

const DAYS = ["月", "火", "水", "木", "金", "土", "日"] as const;

const SCHEDULE: Record<(typeof DAYS)[number], [string, string, string, string][]> = {
  月: [
    ["07:00", "モーニングヨガ", "STUDIO 1", "yoga"],
    ["12:15", "ランチタイムストレッチ", "STUDIO 2", "yoga"],
    ["19:00", "暗闇サイクリング45", "STUDIO 1", "bike"],
    ["20:30", "初心者スイム", "POOL", "pool"],
  ],
  火: [
    ["10:30", "ボディメイクサーキット", "STUDIO 1", "power"],
    ["18:30", "キックボクシング", "STUDIO 1", "power"],
    ["20:00", "ナイトピラティス", "STUDIO 2", "yoga"],
  ],
  水: [
    ["07:00", "朝活HIIT 30", "STUDIO 1", "power"],
    ["11:00", "アクアビクス", "POOL", "pool"],
    ["19:30", "K-POPダンス", "STUDIO 1", "dance"],
    ["21:00", "キャンドルヨガ", "STUDIO 2", "yoga"],
  ],
  木: [
    ["10:30", "マスターズスイム", "POOL", "pool"],
    ["19:00", "暗闇サイクリング45", "STUDIO 1", "bike"],
    ["20:30", "背中と股関節のヨガ", "STUDIO 2", "yoga"],
  ],
  金: [
    ["07:00", "モーニングヨガ", "STUDIO 2", "yoga"],
    ["12:15", "ランチタイムHIIT 20", "STUDIO 1", "power"],
    ["19:30", "ZUMBA", "STUDIO 1", "dance"],
    ["21:00", "週末前デトックスサウナ講座", "SPA", "pool"],
  ],
  土: [
    ["09:00", "ファミリースイム", "POOL", "pool"],
    ["10:30", "パワーリフティング入門", "GYM", "power"],
    ["13:00", "ジュニアテニス", "COURT", "power"],
    ["17:00", "サタデーナイトバイク60", "STUDIO 1", "bike"],
  ],
  日: [
    ["09:00", "サンデーヨガ 90", "STUDIO 2", "yoga"],
    ["11:00", "親子ダンス", "STUDIO 1", "dance"],
    ["14:00", "テニス レベル別クラス", "COURT", "power"],
    ["16:00", "ゆったりアクアウォーク", "POOL", "pool"],
  ],
};

const TRAINERS = [
  {
    initial: "R",
    name: "早瀬 隆一",
    role: "ヘッドトレーナー / NSCA-CSCS",
    quote: "「続かない」のは意志じゃなく、設計の問題。",
    body: "元実業団の陸上短距離選手。挫折しないトレーニング設計が専門で、担当会員の1年継続率は99%。「きついだけのメニューは作りません。生活に収まるメニューだけが、体を変えます」",
    tone: "a",
  },
  {
    initial: "M",
    name: "三好 あかり",
    role: "ヨガ・ピラティス担当 / RYT500",
    quote: "運動が苦手な人ほど、ようこそ。",
    body: "インストラクター歴12年。体が硬い人・運動が苦手な人向けのクラス設計に定評があり、彼女の「はじめてヨガ」は毎週キャンセル待ち。呼吸から丁寧に、を12年間貫いています。",
    tone: "b",
  },
  {
    initial: "J",
    name: "ジョナサン・リー",
    role: "スイム・テニス担当 / 元国体選手",
    quote: "フォームが変わると、人生の景色も変わる。",
    body: "水泳とテニスの二刀流コーチ。「25m泳げなかった60代の会員さんが、いま大会に出ています。始めるのに遅すぎることは、本当に、ないんですよ」",
    tone: "c",
  },
];

const PLANS = [
  {
    key: "regular",
    name: "レギュラー",
    price: "9,900",
    note: "いちばん人気。全営業時間つかい放題",
    features: ["全施設・全時間帯OK", "スタジオレッスン受け放題", "タオル・ウェアレンタル無料", "全店舗相互利用"],
    popular: true,
  },
  {
    key: "daytime",
    name: "デイタイム",
    price: "7,150",
    note: "平日9:00–17:00。昼間をゆったり使う",
    features: ["平日昼間の全施設OK", "スタジオレッスン受け放題", "タオルレンタル無料"],
    popular: false,
  },
  {
    key: "night",
    name: "ナイト&ホリデー",
    price: "8,250",
    note: "平日19時以降+土日祝。仕事帰り中心の方に",
    features: ["平日19:00以降+土日祝OK", "スタジオレッスン受け放題", "サウナ・スパ利用OK"],
    popular: false,
  },
  {
    key: "junior",
    name: "ジュニアスクール",
    price: "6,600",
    note: "スイミング・テニス。送迎バスあり",
    features: ["週1回コース（週2回は+2,200円）", "進級テスト・検定込み", "送迎バス無料", "振替は月2回まで"],
    popular: false,
  },
];

const FACILITIES = [
  ["🚿", "パウダールーム&シャワー", "個室シャワー28室。ドライヤー・スキンケア完備"],
  ["🧖", "サウナ&スパ", "オートロウリュサウナと露天風呂風の炭酸泉"],
  ["🅿️", "駐車場 150台", "3時間まで無料。駐輪場は終日無料"],
  ["🥤", "プロテインバー", "トレーニング後の一杯を。月替わりフレーバー"],
  ["👶", "キッズルーム", "レッスン中の託児OK（生後6か月〜・要予約）"],
  ["📱", "専用アプリ", "レッスン予約・混雑状況・体組成の記録まで"],
];

const VOICES = [
  ["会社帰りに週2回、暗闇バイクに通って半年。体重より先に、寝つきと機嫌が良くなりました。", "30代・会社員", "暗闇サイクリング"],
  ["孫と一緒にプールに通っています。水中ウォークは膝がラクで、いまでは私のほうが長風呂ならぬ長歩きです。", "70代・主婦", "アクアウォーク"],
  ["運動音痴の自覚がありましたが、初回のメニュー作成で「これならできる」の連続。3か月で服のサイズが変わりました。", "20代・大学院生", "ジム+パーソナル"],
];

const FAQ = [
  ["全くの運動初心者ですが大丈夫ですか?", "大丈夫です。会員の約4割が「運動習慣ゼロ」からのスタートです。初回にトレーナーがカウンセリングを行い、体力と目的に合わせた無理のないメニューを作成します。スタジオにも初心者向けクラスを毎日用意しています。"],
  ["体験はできますか?", "はい。施設見学(無料)と、ジム・プール・スタジオを実際に使える1日体験(1,100円)をご用意しています。体験当日に入会された場合は体験料をキャッシュバック、さらに入会金11,000円が0円になります。"],
  ["休会・退会の手続きは面倒ですか?", "アプリまたはフロントで、翌月分から手続きできます。休会は月額1,100円で最長6か月間キープ可能。「辞めづらいジム」にはしない、が私たちの方針です。"],
  ["タオルやシューズは持っていく必要がありますか?", "レギュラー会員はタオル・ウェアのレンタルが無料なので、手ぶらで通えます。シューズのみ館内用をお持ちいただくか、レンタル(220円)をご利用ください。"],
];

export default function Sports() {
  const [program, setProgram] = useState(PROGRAMS[0].key);
  const [day, setDay] = useState<(typeof DAYS)[number]>("月");

  const activeProgram = PROGRAMS.find((item) => item.key === program) ?? PROGRAMS[0];

  return (
    <main className="sports">
      <ScrollReveal />
      <Link className="back-home" href="/">
        ← PORTFOLIO
      </Link>

      <nav className="sp-nav">
        <div className="sp-logo">
          <b>AXIS</b>
          <small>SPORTS CLUB</small>
        </div>
        <div className="sp-links">
          <a href="#programs">プログラム</a>
          <a href="#schedule">スケジュール</a>
          <a href="#trainers">トレーナー</a>
          <a href="#plans">料金プラン</a>
          <a href="#access">アクセス</a>
          <a className="sp-trial" href="#trial">
            1日体験
          </a>
        </div>
      </nav>

      {/* ---------- hero ---------- */}
      <section className="sp-hero">
        <img className="sp-hero-bg" src="/sports/hero.jpg" alt="" aria-hidden />
        <div className="sp-court" aria-hidden />
        <div className="sp-hero-copy">
          <span className="sp-kicker">AXIS SPORTS CLUB — OPEN 6:00–23:00</span>
          <h1>
            <span>体は、</span>
            <span>裏切らない</span>
            <span className="accent">相棒だ。</span>
          </h1>
          <p>
            ジム・スタジオ・プール・テニス。ぜんぶ揃った街の総合スポーツクラブ。
            <br />
            続けられる仕組みと、続けたくなる場所を用意して待っています。
          </p>
          <div className="sp-hero-ctas">
            <a className="sp-btn" href="#trial">
              1日体験に申し込む
            </a>
            <a className="sp-btn ghost" href="#plans">
              料金プランを見る ↓
            </a>
          </div>
        </div>
        <div className="sp-hero-badge" aria-hidden>
          <span>
            TRIAL
            <br />
            ¥1,100
          </span>
        </div>
        <span className="sp-scroll">SCROLL</span>
      </section>

      {/* ---------- numbers ---------- */}
      <section className="sp-numbers">
        {NUMBERS.map(([value, label, note], index) => (
          <div key={label} data-reveal style={{ "--reveal-delay": `${index * 0.08}s` } as React.CSSProperties}>
            <strong>{value}</strong>
            <span>{label}</span>
            <small>{note}</small>
          </div>
        ))}
      </section>

      {/* ---------- programs ---------- */}
      <section className="sp-programs" id="programs">
        <header className="sp-head" data-reveal>
          <span className="sp-label">PROGRAMS</span>
          <h2>4つのフィールド</h2>
        </header>

        <div className="sp-tabs" data-reveal>
          {PROGRAMS.map((item) => (
            <button
              key={item.key}
              className={item.key === program ? "is-active" : ""}
              onClick={() => setProgram(item.key)}
            >
              <b>{item.icon}</b>
              {item.title}
            </button>
          ))}
        </div>

        <div className="sp-program-panel" key={activeProgram.key}>
          <div className="sp-program-copy">
            <span className="sp-program-icon">{activeProgram.icon}</span>
            <h3>{activeProgram.lead}</h3>
            <p>{activeProgram.body}</p>
            <div className="sp-program-tags">
              {activeProgram.tags.map((tag) => (
                <span key={tag}>{tag}</span>
              ))}
            </div>
          </div>
          <div className={`sp-program-art ${activeProgram.key}`} aria-hidden />
        </div>
      </section>

      {/* ---------- schedule ---------- */}
      <section className="sp-schedule" id="schedule">
        <header className="sp-head light" data-reveal>
          <span className="sp-label">WEEKLY SCHEDULE</span>
          <h2>今週のレッスン</h2>
        </header>

        <div className="sp-days" data-reveal>
          {DAYS.map((item) => (
            <button key={item} className={item === day ? "is-active" : ""} onClick={() => setDay(item)}>
              {item}
            </button>
          ))}
        </div>

        <div className="sp-lessons" key={day}>
          {SCHEDULE[day].map(([time, title, place, tone]) => (
            <div className={`sp-lesson ${tone}`} key={`${time}-${title}`}>
              <span className="sp-lesson-time">{time}</span>
              <div>
                <b>{title}</b>
                <small>{place}</small>
              </div>
              <span className="sp-lesson-book">予約 →</span>
            </div>
          ))}
        </div>
        <p className="sp-schedule-note" data-reveal>
          ※ モックのため一部のみ掲載。実際は週120本のプログラムをアプリから予約できます。
        </p>
      </section>

      {/* ---------- trainers ---------- */}
      <section className="sp-trainers" id="trainers">
        <header className="sp-head" data-reveal>
          <span className="sp-label">TRAINERS</span>
          <h2>この人たちが、待ってます</h2>
        </header>

        <div className="sp-trainer-grid">
          {TRAINERS.map((person, index) => (
            <article
              className={`sp-trainer ${person.tone}`}
              key={person.name}
              data-reveal
              style={{ "--reveal-delay": `${index * 0.1}s` } as React.CSSProperties}
            >
              <div className="sp-trainer-face">
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

      {/* ---------- plans ---------- */}
      <section className="sp-plans" id="plans">
        <header className="sp-head" data-reveal>
          <span className="sp-label">MEMBERSHIP</span>
          <h2>料金プラン</h2>
          <p className="sp-head-note">入会金 11,000円 → 体験当日の入会で0円</p>
        </header>

        <div className="sp-plan-grid">
          {PLANS.map((plan, index) => (
            <div
              className={`sp-plan${plan.popular ? " is-popular" : ""}`}
              key={plan.key}
              data-reveal
              style={{ "--reveal-delay": `${index * 0.08}s` } as React.CSSProperties}
            >
              {plan.popular && <span className="sp-plan-badge">いちばん人気</span>}
              <h3>{plan.name}</h3>
              <div className="sp-plan-price">
                <b>¥{plan.price}</b>
                <span>/月（税込）</span>
              </div>
              <p>{plan.note}</p>
              <ul>
                {plan.features.map((feature) => (
                  <li key={feature}>{feature}</li>
                ))}
              </ul>
              <a className={`sp-btn small${plan.popular ? "" : " ghost"}`} href="#trial">
                このプランで体験する
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* ---------- facilities ---------- */}
      <section className="sp-facilities">
        <header className="sp-head light" data-reveal>
          <span className="sp-label">FACILITIES</span>
          <h2>館内設備</h2>
        </header>

        <div className="sp-facility-grid">
          {FACILITIES.map(([icon, title, note], index) => (
            <div key={title} data-reveal style={{ "--reveal-delay": `${index * 0.06}s` } as React.CSSProperties}>
              <b>{icon}</b>
              <h3>{title}</h3>
              <p>{note}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ---------- voices ---------- */}
      <section className="sp-voices">
        <header className="sp-head" data-reveal>
          <span className="sp-label">MEMBER&apos;S VOICE</span>
          <h2>会員の声</h2>
        </header>

        <div className="sp-voice-grid">
          {VOICES.map(([body, who, tag], index) => (
            <figure key={who} data-reveal style={{ "--reveal-delay": `${index * 0.1}s` } as React.CSSProperties}>
              <blockquote>{body}</blockquote>
              <figcaption>
                <b>{who}</b>
                <span>{tag}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      {/* ---------- faq ---------- */}
      <section className="sp-faq">
        <header className="sp-head" data-reveal>
          <span className="sp-label">FAQ</span>
          <h2>よくある質問</h2>
        </header>

        <div className="sp-faq-list">
          {FAQ.map(([question, answer]) => (
            <details key={question} data-reveal>
              <summary>{question}</summary>
              <p>{answer}</p>
            </details>
          ))}
        </div>
      </section>

      {/* ---------- trial cta ---------- */}
      <section className="sp-trial-cta" id="trial">
        <div className="sp-court" aria-hidden />
        <div data-reveal>
          <span className="sp-label">1 DAY TRIAL</span>
          <h2>
            まずは1日、
            <br />
            使い倒してみて。
          </h2>
          <p>
            ジムもプールもスタジオも、会員と同じように使える1日体験は1,100円。
            <br />
            当日入会で体験料は全額キャッシュバックします。
          </p>
          <div className="sp-hero-ctas">
            <a className="sp-btn" href="#trial">
              体験を予約する
            </a>
            <a className="sp-btn ghost" href="#access">
              見学だけ申し込む
            </a>
          </div>
        </div>
      </section>

      <footer className="sp-footer" id="access">
        <div className="sp-footer-info">
          <div>
            <b>AXIS SPORTS CLUB 玉川台</b>
            <small>東京都世田谷区玉川台 2-XX-X / 玉川台駅 徒歩3分</small>
          </div>
          <dl>
            <div>
              <dt>営業時間</dt>
              <dd>平日 6:00–23:00 / 土日祝 8:00–21:00</dd>
            </div>
            <div>
              <dt>休館日</dt>
              <dd>毎月第2木曜・年末年始</dd>
            </div>
          </dl>
        </div>
        <span>AXIS SPORTS CLUB · MOCK PROJECT © 2026</span>
      </footer>
    </main>
  );
}
