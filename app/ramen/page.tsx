"use client";

/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { useState } from "react";
import ScrollReveal from "../components/scroll-reveal";

const TICKER = [
  "手火入れ醤油",
  "自家製麺",
  "吊るし焼き叉焼",
  "貝出汁の塩",
  "スープ炊き六時間",
  "一日限定百五十杯",
];

const CRAFT = [
  {
    icon: "壱",
    title: "スープ",
    lead: "朝五時、寸胴に火が入る。",
    body: "大山どりの丸鶏と香味野菜を六時間、あくを引きながらじっくり炊き上げます。鰹節と鯖節の魚介出汁を合わせるのは、提供する直前。二つの出汁が丼の中ではじめて出会う、その一瞬の香りまで設計しています。",
    img: "/ramen/soup.jpg",
    alt: "湯気の立つ醤油らーめんのスープ",
  },
  {
    icon: "弐",
    title: "麺",
    lead: "小麦の香りまで、ごちそう。",
    body: "国産小麦を三種ブレンドした自家製の中細ストレート麺。加水率は季節と湿度で毎朝調整します。茹で上げた麺は力強い湯切りで一気に水を落とし、すすった瞬間に鼻へ抜ける小麦の香りを閉じ込めます。",
    img: "/ramen/noodle.jpg",
    alt: "打ちたての自家製中細ストレート麺",
  },
  {
    icon: "参",
    title: "チャーシュー",
    lead: "低温でとろける、吊るし焼き。",
    body: "豚肩ロースは釜で吊るし焼きに、鶏むねは低温調理でしっとりと。一杯に二種のチャーシューを忍ばせています。切り置きはせず、注文が入ってから一枚ずつ切り出すのがうちの決まりです。",
    img: "/ramen/chashu.jpg",
    alt: "麺の上にのった炙りチャーシュー",
  },
];

const SHOWCASE: [string, string, string][] = [
  ["/ramen/bowl-shoyu.jpg", "醤油らーめん", "看板の一杯"],
  ["/ramen/bowl-shio.jpg", "塩らーめん", "貝出汁の香り"],
  ["/ramen/chashu.jpg", "特製全部のせ", "叉焼二種＋味玉"],
];

const CATS = [
  ["ramen", "らーめん"],
  ["side", "ご飯・サイド"],
  ["drink", "ドリンク"],
] as const;

type CatKey = (typeof CATS)[number][0];

const MENU: Record<CatKey, { name: string; price: string; desc?: string; badge?: string }[]> = {
  ramen: [
    {
      name: "特製醤油らーめん",
      price: "1,150",
      desc: "叉焼二種・味玉・海苔五枚の全部のせ。迷ったらこれ。",
      badge: "人気 No.1",
    },
    {
      name: "醤油らーめん",
      price: "850",
      desc: "鶏と魚介、二つの出汁を炊き合わせた看板の一杯。",
    },
    {
      name: "塩らーめん",
      price: "850",
      desc: "浅利と昆布の貝出汁が香る、澄みきった塩。",
    },
    {
      name: "味玉らーめん",
      price: "950",
      desc: "半熟味玉は追い鰹の漬けだれで二日仕込み。",
    },
    {
      name: "つけ麺（並・中盛 同料金）",
      price: "950",
      desc: "濃厚魚介豚骨のつけだれに、平打ちの太麺を合わせて。",
    },
    {
      name: "辛紅らーめん",
      price: "980",
      desc: "自家製辣油と山椒が痺れる裏メニュー。",
      badge: "一日限定 10 食",
    },
  ],
  side: [
    {
      name: "炙り叉焼丼",
      price: "400",
      desc: "切り落とし叉焼を炙ってタレと卵黄で。締めの定番。",
      badge: "人気",
    },
    { name: "味玉ごはん", price: "300", desc: "漬けだれごと崩す、罪深い小丼。" },
    { name: "手包み餃子（五個）", price: "350", desc: "叉焼の切れ端を餡に混ぜ込んだ自家製餃子。" },
    { name: "白ごはん", price: "150" },
    { name: "替え玉", price: "150" },
    { name: "大盛り", price: "+100" },
  ],
  drink: [
    { name: "瓶ビール（中瓶）", price: "550" },
    { name: "ハイボール", price: "450" },
    { name: "レモンサワー", price: "450" },
    { name: "ウーロン茶", price: "200" },
    { name: "昔ながらのラムネ", price: "250", desc: "お子さまに人気。栓抜き体験つき。" },
  ],
};

const INFO: [string, string][] = [
  ["住所", "東京都台東区灯町 2-7-1 灯りビル 1F"],
  ["アクセス", "灯町線「灯町駅」東口より徒歩 3 分／御堂橋通り沿い"],
  ["営業時間", "昼 11:00 – 15:00（L.O. 14:45）／夜 17:30 – 21:00"],
  ["定休日", "毎週水曜・第三木曜（スープ切れ次第終了）"],
  ["席数", "カウンター 8 席・テーブル 2 卓（全席禁煙）"],
  ["お支払い", "券売機制（現金・交通系 IC・QR コード決済）"],
  ["お電話", "03-0000-0000（混雑時は出られない場合があります）"],
];

export default function Ramen() {
  const [cat, setCat] = useState<CatKey>("ramen");

  return (
    <main className="rm">
      <ScrollReveal />
      <Link className="back-home" href="/">
        ← PORTFOLIO
      </Link>

      <nav className="rm-nav">
        <div className="rm-logo">
          <b>らーめん 灯火</b>
          <small>TOMOSHIBI — TOKYO RAMEN</small>
        </div>
        <div className="rm-links">
          <a href="#craft">こだわり</a>
          <a href="#menu">お品書き</a>
          <a href="#info">店舗情報</a>
          <a className="rm-nav-cta" href="#sns">
            SNS・お問い合わせ
          </a>
        </div>
      </nav>

      {/* ---------- hero ---------- */}
      <section className="rm-hero">
        <div className="rm-hero-glow" aria-hidden />
        <span className="rm-hero-kanji" aria-hidden>
          灯
        </span>

        <div className="rm-hero-copy">
          <span className="rm-kicker">EST. 2015 — 屋台から始まった一杯</span>
          <h1>
            <span>一杯に、</span>
            <span className="accent">灯をともす。</span>
          </h1>
          <p>
            鶏と魚介、二つの出汁を炊き合わせた醤油らーめん。
            <br />
            屋台から十年、変わらない灯火の味を、今日も一杯ずつ。
          </p>
          <div className="rm-hero-ctas">
            <a className="rm-btn" href="#menu">
              お品書きを見る
            </a>
            <a className="rm-btn ghost" href="#info">
              店舗情報・アクセス
            </a>
          </div>
          <div className="rm-hero-chips">
            <span>スープ炊き六時間</span>
            <span>自家製麺</span>
            <span>一日限定 150 杯</span>
          </div>
        </div>

        <div className="rm-hero-photo">
          <span className="rm-steam s1" aria-hidden />
          <span className="rm-steam s2" aria-hidden />
          <span className="rm-steam s3" aria-hidden />
          <img src="/ramen/hero.jpg" alt="炊きたての特製醤油らーめん" />
          <span className="rm-hero-photo-tag">
            <b>名物</b>特製醤油らーめん
          </span>
        </div>
      </section>

      {/* ---------- ticker ---------- */}
      <div className="rm-ticker" aria-hidden>
        <div className="rm-ticker-track">
          {[0, 1].map((copy) => (
            <div className="rm-ticker-group" key={copy}>
              {TICKER.map((item) => (
                <span key={item}>
                  {item}
                  <i>◆</i>
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* ---------- craft / 店舗紹介 ---------- */}
      <section className="rm-craft" id="craft">
        <header className="rm-head" data-reveal>
          <span className="rm-label">OUR CRAFT — こだわり</span>
          <h2>うまいには、理由がある。</h2>
        </header>

        <div className="rm-craft-grid">
          {CRAFT.map((item, index) => (
            <article
              className="rm-craft-card"
              key={item.title}
              data-reveal
              style={{ "--reveal-delay": `${index * 0.1}s` } as React.CSSProperties}
            >
              <div className="rm-craft-photo">
                <img src={item.img} alt={item.alt} loading="lazy" />
                <b>{item.icon}</b>
              </div>
              <span className="rm-craft-name">{item.title}</span>
              <h3>{item.lead}</h3>
              <p>{item.body}</p>
            </article>
          ))}
        </div>

        <div className="rm-showcase" data-reveal>
          {SHOWCASE.map(([src, title, note]) => (
            <figure key={title}>
              <img src={src} alt={title} loading="lazy" />
              <figcaption>
                <b>{title}</b>
                <small>{note}</small>
              </figcaption>
            </figure>
          ))}
        </div>

        <div className="rm-owner" data-reveal>
          <div className="rm-owner-photo">
            <img src="/ramen/owner.jpg" alt="厨房に立つ店主" loading="lazy" />
            <span>店主</span>
          </div>
          <div className="rm-owner-body">
            <span className="rm-label">MESSAGE — 店主より</span>
            <h3>
              屋台の頃から、
              <br />
              客席との距離は変えていません。
            </h3>
            <p>
              灯火は 2015 年、駅裏の小さな屋台から始まりました。雨の日も並んでくれた常連さんの
              「うまかった」の一言が、この店の土台です。店を構えた今も、カウンター越しに顔を見て
              一杯を手渡すやり方は変えません。はじめての方も、どうか気軽に暖簾をくぐってください。
            </p>
            <b className="rm-owner-sign">
              らーめん灯火 店主 <span>秋山 誠</span>
            </b>
          </div>
        </div>
      </section>

      {/* ---------- menu ---------- */}
      <section className="rm-menu" id="menu">
        <header className="rm-head dark" data-reveal>
          <span className="rm-label">MENU — お品書き</span>
          <h2>お品書き</h2>
          <p className="rm-menu-note">※ 価格はすべて税込。仕入れにより内容が変わる日があります。</p>
        </header>

        <div className="rm-menu-tabs" data-reveal>
          {CATS.map(([key, label]) => (
            <button key={key} className={key === cat ? "is-active" : ""} onClick={() => setCat(key)}>
              {label}
            </button>
          ))}
        </div>

        <div className="rm-menu-list" key={cat}>
          {MENU[cat].map((item) => (
            <div className="rm-item" key={item.name}>
              <div className="rm-item-main">
                <b>{item.name}</b>
                {item.badge ? <span className="rm-item-badge">{item.badge}</span> : null}
                <i className="rm-item-line" />
                <strong>
                  ¥{item.price}
                  <small>税込</small>
                </strong>
              </div>
              {item.desc ? <p>{item.desc}</p> : null}
            </div>
          ))}
        </div>

        <p className="rm-menu-foot" data-reveal>
          お子さま用の取り分け丼・麺カッターをご用意しています。アレルギーはお気軽にお声がけください。
        </p>
      </section>

      {/* ---------- info ---------- */}
      <section className="rm-info" id="info">
        <header className="rm-head" data-reveal>
          <span className="rm-label">SHOP INFO — 店舗情報</span>
          <h2>店舗情報・アクセス</h2>
        </header>

        <div className="rm-info-grid">
          <dl className="rm-info-table" data-reveal>
            {INFO.map(([term, desc]) => (
              <div key={term}>
                <dt>{term}</dt>
                <dd>{desc}</dd>
              </div>
            ))}
          </dl>

          <div className="rm-map" data-reveal style={{ "--reveal-delay": "0.1s" } as React.CSSProperties}>
            <div className="rm-map-art" aria-hidden>
              <span className="road r1" />
              <span className="road r2" />
              <span className="rail" />
              <span className="rm-map-station">灯町駅</span>
              <span className="rm-map-pin">
                <b>灯</b>
                当店
              </span>
            </div>
            <p>
              灯町駅東口を出て御堂橋通りを北へ徒歩 3 分。
              <br />
              赤い提灯と木の暖簾が目印です。
            </p>
          </div>
        </div>
      </section>

      {/* ---------- sns / contact ---------- */}
      <section className="rm-sns" id="sns">
        <div className="rm-sns-inner" data-reveal>
          <span className="rm-label">FOLLOW US — 最新情報</span>
          <h2>
            今日の限定は、
            <br />
            SNS でお知らせしています。
          </h2>
          <p>
            限定メニュー・スープ切れ・臨時休業のお知らせは各 SNS
            で毎朝発信中。ご意見・取材のご依頼もお気軽にどうぞ。
          </p>
          <div className="rm-sns-links">
            <a className="rm-sns-btn" href="#sns" aria-label="Instagram（モック）">
              <i>◎</i>
              <span>
                <b>Instagram</b>
                <small>@tomoshibi_ramen</small>
              </span>
            </a>
            <a className="rm-sns-btn" href="#sns" aria-label="X（モック）">
              <i>✕</i>
              <span>
                <b>X（旧Twitter）</b>
                <small>@tomoshibi_noren</small>
              </span>
            </a>
            <a className="rm-sns-btn" href="#sns" aria-label="お問い合わせ（モック）">
              <i>✉</i>
              <span>
                <b>お問い合わせ</b>
                <small>info@tomoshibi-ramen.jp</small>
              </span>
            </a>
          </div>
        </div>
      </section>

      <footer className="rm-footer">
        <div>
          <b>らーめん 灯火</b>
          <small>TOMOSHIBI — TOKYO RAMEN SHOP</small>
        </div>
        <span>東京都台東区灯町 2-7-1 · 創業 2015 · MOCK PROJECT © 2026</span>
      </footer>
    </main>
  );
}
