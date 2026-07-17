"use client";

/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { useState } from "react";
import ScrollReveal from "../components/scroll-reveal";

const CRAFT = [
  {
    icon: "炭",
    title: "備長炭",
    lead: "うちわ一枚で、火を操る。",
    body: "紀州備長炭だけを使い、串ごとに火床の位置を変えながら焼き上げます。強火の遠火で皮目はパリッと、中はしっとり。ガスでは出せない香ばしさは、炭の熾き方から始まっています。",
    img: "/yakitori/sumibi.jpg",
    alt: "赤く熾きた炭火の焼き網",
  },
  {
    icon: "串",
    title: "朝挽き鶏",
    lead: "その日の鶏を、その日のうちに。",
    body: "毎朝届く朝挽きの大山どりを、開店前に一本一本手で串打ちします。部位ごとに切り方と刺し方を変えるのは、火の通りを揃えるため。作り置きは一切しません。",
    img: "/yakitori/grill.jpg",
    alt: "焼き場で串を返す焼き手",
  },
  {
    icon: "場",
    title: "路地の一軒",
    lead: "提灯をくぐれば、もう常連。",
    body: "席はカウンター10席と小上がりが2卓だけ。焼き場を囲むカウンターでは、串が焼ける音と煙までがごちそうです。一人でも、仕事帰りでも、ふらりとどうぞ。",
    img: "/yakitori/lantern.jpg",
    alt: "提灯が並ぶ夜の横丁",
  },
];

const CATS = [
  ["kushi", "串焼き"],
  ["ippin", "一品"],
  ["shime", "ご飯・〆"],
  ["drink", "ドリンク"],
] as const;

type CatKey = (typeof CATS)[number][0];

const MENU: Record<CatKey, { name: string; price: string; desc?: string; badge?: string }[]> = {
  kushi: [
    { name: "つくね（卵黄だれ）", price: "250", desc: "軟骨入りの粗挽き。濃厚な卵黄にくぐらせて。", badge: "人気 No.1" },
    { name: "ねぎま（タレ・塩）", price: "220", desc: "継ぎ足し六年の甘辛ダレが看板。", badge: "名物" },
    { name: "もも塩", price: "200", desc: "皮目パリッと、藻塩とすだちで。" },
    { name: "皮", price: "180", desc: "低温でじっくり脂を落とした、カリカリ仕上げ。" },
    { name: "ささみ 山葵", price: "230", desc: "レア気味に焼いて、本山葵をひとのせ。" },
    { name: "レバー", price: "180", desc: "とろける半生仕立て。苦手な方こそ一度。" },
    { name: "砂肝", price: "180" },
    { name: "ぼんじり", price: "200" },
    { name: "手羽先", price: "280", desc: "パリパリの皮と、あふれる肉汁。" },
    { name: "しいたけ肉詰め", price: "260", badge: "一日限定 20 本" },
  ],
  ippin: [
    { name: "大山どりのたたき", price: "680", desc: "表面だけ炭で炙って、薬味たっぷりで。", badge: "人気" },
    { name: "鶏白レバーのパテ", price: "480", desc: "バゲット添え。日本酒にもワインにも。" },
    { name: "自家製ポテトサラダ", price: "380", desc: "燻製卵入り。仕上げに黒七味。" },
    { name: "冷やしトマト", price: "300" },
    { name: "お通しキャベツ", price: "250", desc: "特製ダレで。おかわり自由です。" },
  ],
  shime: [
    { name: "炭火親子丼", price: "850", desc: "炙った もも肉と半熟卵。〆の名物、数量限定。", badge: "数量限定" },
    { name: "鶏スープ茶漬け", price: "550", desc: "丸鶏を炊いた黄金スープをかけて。" },
    { name: "焼きおにぎり", price: "280", desc: "秘伝ダレを塗って炭火で香ばしく。" },
    { name: "鶏スープ", price: "200" },
  ],
  drink: [
    { name: "生ビール（中）", price: "550" },
    { name: "レモンサワー", price: "450", desc: "皮ごと搾る自家製シロップ。" },
    { name: "ハイボール", price: "450" },
    { name: "日本酒（半合〜）", price: "500〜", desc: "焼き鳥に合う辛口を全国から数種。" },
    { name: "緑茶割り・ほうじ茶割り", price: "400" },
    { name: "ソフトドリンク", price: "250" },
  ],
};

const INFO: [string, string][] = [
  ["住所", "東京都品川区炭場町 3-2-9 提灯横丁 奥から二軒目"],
  ["アクセス", "炭場町駅 西口より徒歩 2 分／赤提灯の路地を入って奥"],
  ["営業時間", "17:00 – 23:30（L.O. 23:00）／金・土は 24:00 まで"],
  ["定休日", "毎週月曜（月曜が祝日の場合は翌火曜）"],
  ["席数", "カウンター 10 席・小上がり 2 卓（全 14 席）"],
  ["ご予約", "お電話・LINE にて当日予約 OK／貸切は 8 名様から"],
  ["お支払い", "現金・各種カード・QR コード決済"],
  ["お電話", "03-0000-0000（焼き場対応中は折り返します）"],
];

export default function Yakitori() {
  const [cat, setCat] = useState<CatKey>("kushi");

  return (
    <main className="yk">
      <ScrollReveal />
      <Link className="back-home" href="/">
        ← PORTFOLIO
      </Link>

      <nav className="yk-nav">
        <div className="yk-logo">
          <b>炭火焼鳥 炙</b>
          <small>SUMIBI YAKITORI — ABURI</small>
        </div>
        <div className="yk-links">
          <a href="#craft">こだわり</a>
          <a href="#menu">お品書き</a>
          <a href="#info">店舗情報</a>
          <a className="yk-nav-cta" href="#sns">
            予約・SNS
          </a>
        </div>
      </nav>

      {/* ---------- hero ---------- */}
      <section className="yk-hero">
        <img className="yk-hero-bg" src="/yakitori/hero.jpg" alt="煙を上げて焼かれる焼き鳥の串" />
        <span className="yk-smoke s1" aria-hidden />
        <span className="yk-smoke s2" aria-hidden />
        <span className="yk-smoke s3" aria-hidden />
        <span className="yk-hero-kanji" aria-hidden>
          炙
        </span>

        <div className="yk-hero-copy">
          <span className="yk-kicker">EST. 2018 — 提灯横丁の炭火焼鳥</span>
          <h1>
            <span>今日も、</span>
            <span className="accent">炭火の音がする。</span>
          </h1>
          <p>
            紀州備長炭と朝挽きの大山どり。一本ずつ手で打った串を、
            <br />
            うちわ一枚で焼き上げる。カウンター10席の小さな焼き鳥屋です。
          </p>
          <div className="yk-hero-ctas">
            <a className="yk-btn" href="#menu">
              お品書きを見る
            </a>
            <a className="yk-btn ghost" href="#info">
              店舗情報・アクセス
            </a>
          </div>
          <div className="yk-hero-chips">
            <span>紀州備長炭</span>
            <span>串打ちは毎朝</span>
            <span>一人焼き鳥歓迎</span>
          </div>
        </div>
      </section>

      {/* ---------- craft / 店舗紹介 ---------- */}
      <section className="yk-craft" id="craft">
        <header className="yk-head" data-reveal>
          <span className="yk-label">OUR CRAFT — こだわり</span>
          <h2>焼き鳥は、火場の仕事。</h2>
        </header>

        <div className="yk-craft-grid">
          {CRAFT.map((item, index) => (
            <article
              className="yk-craft-card"
              key={item.title}
              data-reveal
              style={{ "--reveal-delay": `${index * 0.1}s` } as React.CSSProperties}
            >
              <div className="yk-craft-photo">
                <img src={item.img} alt={item.alt} loading="lazy" />
                <b>{item.icon}</b>
              </div>
              <span className="yk-craft-name">{item.title}</span>
              <h3>{item.lead}</h3>
              <p>{item.body}</p>
            </article>
          ))}
        </div>

        <div className="yk-owner" data-reveal>
          <span className="yk-label">MESSAGE — 店主より</span>
          <blockquote>
            派手なことは何もしていません。いい鶏を仕入れて、いい炭で、
            <br className="yk-br" />
            ちょうどいい瞬間に皿へ出す。それだけを八年、毎晩やっています。
          </blockquote>
          <b className="yk-owner-sign">
            炭火焼鳥 炙 店主 <span>火村 隆二</span>
          </b>
        </div>
      </section>

      {/* ---------- menu ---------- */}
      <section className="yk-menu" id="menu">
        <div className="yk-menu-visual" data-reveal>
          <img src="/yakitori/skewers.jpg" alt="焼き台で煙を上げる串" loading="lazy" />
          <span className="yk-menu-visual-cap">焼き場より、今宵も。</span>
        </div>

        <div className="yk-menu-body">
          <header className="yk-head" data-reveal>
            <span className="yk-label">MENU — お品書き</span>
            <h2>お品書き</h2>
            <p className="yk-menu-note">※ 価格は税込。串は 2 本からのご注文をおすすめしています。</p>
          </header>

          <div className="yk-menu-tabs" data-reveal>
            {CATS.map(([key, label]) => (
              <button key={key} className={key === cat ? "is-active" : ""} onClick={() => setCat(key)}>
                {label}
              </button>
            ))}
          </div>

          <div className="yk-menu-list" key={cat}>
            {MENU[cat].map((item) => (
              <div className="yk-item" key={item.name}>
                <div className="yk-item-main">
                  <b>{item.name}</b>
                  {item.badge ? <span className="yk-item-badge">{item.badge}</span> : null}
                  <i className="yk-item-line" />
                  <strong>
                    ¥{item.price}
                  </strong>
                </div>
                {item.desc ? <p>{item.desc}</p> : null}
              </div>
            ))}
          </div>

          <p className="yk-menu-foot" data-reveal>
            アレルギー・苦手な部位はお気軽に。焼き加減のお好みも承ります。
          </p>
        </div>
      </section>

      {/* ---------- info ---------- */}
      <section className="yk-info" id="info">
        <header className="yk-head" data-reveal>
          <span className="yk-label">SHOP INFO — 店舗情報</span>
          <h2>店舗情報・アクセス</h2>
        </header>

        <div className="yk-info-grid">
          <dl className="yk-info-table" data-reveal>
            {INFO.map(([term, desc]) => (
              <div key={term}>
                <dt>{term}</dt>
                <dd>{desc}</dd>
              </div>
            ))}
          </dl>

          <div className="yk-map" data-reveal style={{ "--reveal-delay": "0.1s" } as React.CSSProperties}>
            <div className="yk-map-art" aria-hidden>
              <span className="road r1" />
              <span className="road r2" />
              <span className="rail" />
              <span className="yk-map-station">炭場町駅</span>
              <span className="yk-map-pin">
                <b>炙</b>
                当店
              </span>
            </div>
            <p>
              西口を出て提灯横丁へ。赤提灯の路地を進んだ奥から二軒目、
              <br />
              煙と焼きダレの匂いが目印です。
            </p>
          </div>
        </div>
      </section>

      {/* ---------- sns / contact ---------- */}
      <section className="yk-sns" id="sns">
        <div className="yk-sns-inner" data-reveal>
          <span className="yk-label">RESERVE & FOLLOW</span>
          <h2>
            今夜の空席は、
            <br />
            SNS でお知らせしています。
          </h2>
          <p>
            当日の空席状況・限定串の入荷・臨時休業は各 SNS で毎夕更新。
            ご予約は LINE かお電話でどうぞ。
          </p>
          <div className="yk-sns-links">
            <a className="yk-sns-btn" href="#sns" aria-label="LINE予約（モック）">
              <i>予</i>
              <span>
                <b>LINE で予約</b>
                <small>@aburi_yoyaku</small>
              </span>
            </a>
            <a className="yk-sns-btn" href="#sns" aria-label="Instagram（モック）">
              <i>◎</i>
              <span>
                <b>Instagram</b>
                <small>@aburi_yakitori</small>
              </span>
            </a>
            <a className="yk-sns-btn" href="#sns" aria-label="X（モック）">
              <i>✕</i>
              <span>
                <b>X（旧Twitter）</b>
                <small>@aburi_kushi</small>
              </span>
            </a>
          </div>
          <span className="yk-sns-tel">
            お電話でのご予約 <b>03-0000-0000</b>（17:00 以降つながりやすいです）
          </span>
        </div>
      </section>

      <footer className="yk-footer">
        <div>
          <b>炭火焼鳥 炙</b>
          <small>SUMIBI YAKITORI ABURI</small>
        </div>
        <span>東京都品川区炭場町 3-2-9 · 創業 2018 · MOCK PROJECT © 2026</span>
      </footer>
    </main>
  );
}
