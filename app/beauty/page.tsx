"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import ScrollReveal from "../components/scroll-reveal";

/* ============================================================
   LUMICA CLINIC — 美容皮膚科のキャンペーンLP（モック）
   参考：クリニックLPの王道構成 × 暖かく上品な美容トーン。
   CV導線特化・追従CTA・予約フォームのランディングページ。
   ============================================================ */

const CONCERNS = [
  { key: "kime", icon: "🌷", label: "毛穴・肌のキメが気になる" },
  { key: "tarumi", icon: "🎈", label: "フェイスラインのたるみ" },
  { key: "kusumi", icon: "🌫", label: "くすみ・肌のトーン" },
  { key: "kansou", icon: "💧", label: "乾燥・小じわ" },
  { key: "shimi", icon: "🫧", label: "シミ・そばかす" },
  { key: "hari", icon: "✨", label: "ハリ・弾力の低下" },
];

const REASONS = [
  { no: "01", title: "医師による無料カウンセリング", body: "肌診断機による肌解析をもとに、専門医が一人ひとりに合わせた施術プランをご提案。無理な勧誘は一切いたしません。" },
  { no: "02", title: "続けやすい明朗会計", body: "追加費用のかからない総額表示。初回のモニター価格や回数プランで、無理なく続けられます。" },
  { no: "03", title: "ダウンタイムに配慮した設計", body: "お仕事帰りにも通いやすいよう、負担の少ない施術メニューを厳選。当日メイクでご帰宅いただけます。" },
  { no: "04", title: "プライバシーに配慮した個室", body: "完全個室のトリートメントルーム。他の方と顔を合わせずに、ゆったりとお過ごしいただけます。" },
];

type Menu = {
  id: string;
  name: string;
  tag: string;
  desc: string;
  normal: number;
  first: number;
  unit: string;
  popular?: boolean;
};

const MENUS: Menu[] = [
  { id: "refine", name: "ダーマ・リファイン", tag: "毛穴・キメ", desc: "肌の生まれ変わりを促し、毛穴・キメを整える当院の看板メニュー。", normal: 22000, first: 9800, unit: "初回", popular: true },
  { id: "lift", name: "リフトチューニング", tag: "たるみ・ハリ", desc: "熱エネルギーで肌の土台にアプローチ。フェイスラインを引き締めます。", normal: 38000, first: 19800, unit: "初回" },
  { id: "tone", name: "ブライトトーンケア", tag: "くすみ・シミ", desc: "くすみの原因にはたらきかけ、明るく澄んだ肌印象へ導きます。", normal: 26000, first: 12800, unit: "初回" },
  { id: "hydra", name: "モイスチャーインフュージョン", tag: "乾燥・小じわ", desc: "うるおい成分を角層のすみずみへ届け、ふっくらとした肌に。", normal: 18000, first: 8800, unit: "初回" },
];

const CASES = [
  { label: "毛穴・キメ", months: "3ヶ月／全3回", tone1: "#d8b7a6", tone2: "#e9d3c4" },
  { label: "ハリ・たるみ", months: "2ヶ月／全2回", tone1: "#c9a58f", tone2: "#e6cbb8" },
  { label: "くすみケア", months: "3ヶ月／全4回", tone1: "#d6b39d", tone2: "#efd9c8" },
];

const FLOW = [
  { no: "01", title: "ご予約", body: "WEBまたはLINEから、ご希望のメニュー・日時をお選びください。24時間受付。" },
  { no: "02", title: "カウンセリング", body: "肌診断と医師の問診で、お悩みとご希望をおうかがいします。無料。" },
  { no: "03", title: "施術", body: "完全個室で施術を行います。メニューにより15〜60分ほど。" },
  { no: "04", title: "アフターケア", body: "ホームケアや次回のご案内。次回予約は院内割引が適用されます。" },
];

const FAQ = [
  { q: "痛みはありますか？", a: "メニューにより異なりますが、多くの方が「温かい」と感じる程度です。ご不安な方には出力を調整しながら進めますのでご安心ください。" },
  { q: "ダウンタイムはありますか？", a: "当院のメニューはダウンタイムに配慮して設計しています。施術後は当日メイクでご帰宅いただけます（施術内容により個人差があります）。" },
  { q: "初回価格だけの利用でも大丈夫ですか？", a: "はい。無理な勧誘は行いません。まずは初回でお試しいただき、続けるかどうかはゆっくりお決めください。" },
  { q: "支払い方法は？", a: "各種クレジットカード・医療ローン・現金に対応しています。回数プランは分割でのお支払いも可能です。" },
];

const yen = (n: number) => `¥${n.toLocaleString("ja-JP")}`;

type Step = "idle" | "form" | "done";

export default function Beauty() {
  const [checked, setChecked] = useState<Record<string, boolean>>({});
  const [step, setStep] = useState<Step>("idle");
  const [menu, setMenu] = useState<string>("refine");
  const [stuck, setStuck] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);

  // Sticky CTA appears once the hero scrolls out of view.
  useEffect(() => {
    const el = heroRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setStuck(!e.isIntersecting), { threshold: 0 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    document.body.style.overflow = step !== "idle" ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [step]);

  const checkedCount = Object.values(checked).filter(Boolean).length;

  const openForm = (id?: string) => {
    if (id) setMenu(id);
    setStep("form");
  };

  const selectedMenu = useMemo(() => MENUS.find((m) => m.id === menu), [menu]);

  return (
    <main className="lm">
      <ScrollReveal />
      <Link className="back-home" href="/">
        ← PORTFOLIO
      </Link>

      {/* ---------- top campaign strip ---------- */}
      <div className="lm-strip">
        <b>期間限定モニター募集</b> 初回 ¥9,800〜／医師の無料カウンセリング付き
      </div>

      {/* ---------- nav ---------- */}
      <nav className="lm-nav">
        <a href="#top" className="lm-logo">
          <span className="lm-logo-mark" aria-hidden>
            L
          </span>
          <span className="lm-logo-text">
            <b>LUMICA CLINIC</b>
            <small>ルミカ美容皮膚科</small>
          </span>
        </a>
        <div className="lm-nav-right">
          <a className="lm-nav-tel" href="tel:0120000000">
            <small>受付 10:00–19:00</small>
            <b>0120-000-000</b>
          </a>
          <button className="lm-nav-cta" onClick={() => openForm()}>
            無料カウンセリング予約
          </button>
        </div>
      </nav>

      {/* ---------- hero ---------- */}
      <header className="lm-hero" id="top" ref={heroRef}>
        <div className="lm-hero-wash" aria-hidden>
          <span className="lm-blob a" />
          <span className="lm-blob b" />
        </div>

        <div className="lm-hero-inner">
          <div className="lm-hero-copy" data-reveal>
            <span className="lm-hero-badge">
              <i aria-hidden>●</i> 月間 <b>50</b> 名様 限定モニター
            </span>
            <h1>
              素肌から、
              <br />
              <span className="lm-accent">私を好きになる。</span>
            </h1>
            <p>
              医師監修の肌解析で、あなたに必要なケアだけを。
              <br />
              毛穴・ハリ・くすみに、続けやすい美肌治療を。
            </p>

            <div className="lm-hero-offer">
              <span className="lm-offer-label">看板メニュー ダーマ・リファイン</span>
              <div className="lm-offer-price">
                <s>{yen(22000)}</s>
                <strong>
                  初回 {yen(9800)}
                  <small>税込</small>
                </strong>
              </div>
            </div>

            <div className="lm-hero-ctas">
              <button className="lm-btn" onClick={() => openForm("refine")}>
                無料カウンセリングを予約する
              </button>
              <a className="lm-btn line" href="#menu">
                料金メニューを見る
              </a>
            </div>

            <ul className="lm-hero-facts">
              <li>
                <b>累計 12万件</b>
                の施術実績
              </li>
              <li>
                <b>満足度 98%</b>
                <small>※当院アンケート</small>
              </li>
              <li>
                <b>完全個室</b>
                プライバシー配慮
              </li>
            </ul>
          </div>

          <div className="lm-hero-visual" data-reveal aria-hidden>
            <div className="lm-hero-orb">
              <span className="lm-orb-glow" />
              <span className="lm-orb-face">✦</span>
            </div>
            <span className="lm-hero-chip c1">医師の無料カウンセリング</span>
            <span className="lm-hero-chip c2">当日メイクで帰宅OK</span>
            <span className="lm-hero-chip c3">追加費用なしの総額表示</span>
          </div>
        </div>
      </header>

      {/* ---------- concerns ---------- */}
      <section className="lm-concern" id="concern">
        <header className="lm-head" data-reveal>
          <span className="lm-label">CHECK — こんなお悩み、ありませんか？</span>
          <h2>あてはまるものを選んでください</h2>
          <p>チェックした数が多いほど、一度の肌診断がおすすめです。</p>
        </header>

        <div className="lm-concern-grid" data-reveal>
          {CONCERNS.map((c) => (
            <button
              key={c.key}
              className={`lm-concern-item ${checked[c.key] ? "is-on" : ""}`}
              onClick={() => setChecked((s) => ({ ...s, [c.key]: !s[c.key] }))}
            >
              <span className="lm-concern-ico" aria-hidden>
                {c.icon}
              </span>
              <span className="lm-concern-label">{c.label}</span>
              <span className="lm-concern-check" aria-hidden>
                ✓
              </span>
            </button>
          ))}
        </div>

        {checkedCount > 0 && (
          <div className="lm-concern-result" role="status">
            <b>{checkedCount}つ</b> のお悩みが見つかりました。
            <button onClick={() => openForm()}>無料で肌診断を受ける →</button>
          </div>
        )}
      </section>

      {/* ---------- reasons ---------- */}
      <section className="lm-reason" id="reason">
        <header className="lm-head" data-reveal>
          <span className="lm-label">REASON — 選ばれる理由</span>
          <h2>LUMICA が続けやすい、4つの理由</h2>
        </header>

        <div className="lm-reason-grid">
          {REASONS.map((r, i) => (
            <article key={r.no} data-reveal style={{ "--reveal-delay": `${i * 0.07}s` } as React.CSSProperties}>
              <span className="lm-reason-no">{r.no}</span>
              <h3>{r.title}</h3>
              <p>{r.body}</p>
            </article>
          ))}
        </div>
      </section>

      {/* ---------- menu / pricing ---------- */}
      <section className="lm-menu" id="menu">
        <header className="lm-head" data-reveal>
          <span className="lm-label">MENU — 施術メニュー・料金</span>
          <h2>お悩みに合わせた、4つのメニュー</h2>
          <p>すべて医師のカウンセリング後にご案内します。表示は税込の総額です。</p>
        </header>

        <div className="lm-menu-grid">
          {MENUS.map((m) => (
            <article className={`lm-menu-card ${m.popular ? "is-popular" : ""}`} key={m.id} data-reveal>
              {m.popular && <span className="lm-menu-flag">人気 No.1</span>}
              <span className="lm-menu-tag">{m.tag}</span>
              <h3>{m.name}</h3>
              <p>{m.desc}</p>
              <div className="lm-menu-price">
                <span className="lm-menu-normal">
                  通常 <s>{yen(m.normal)}</s>
                </span>
                <strong>
                  <em>{m.unit}</em>
                  {yen(m.first)}
                  <small>税込</small>
                </strong>
              </div>
              <button className="lm-menu-btn" onClick={() => openForm(m.id)}>
                このメニューで予約
              </button>
            </article>
          ))}
        </div>
        <p className="lm-menu-note">
          ※ 自由診療（自費）です。効果には個人差があります。副作用・リスクとして、赤み・むくみ等が生じる場合があります。
        </p>
      </section>

      {/* ---------- cases ---------- */}
      <section className="lm-case" id="case">
        <header className="lm-head" data-reveal>
          <span className="lm-label">CASE — 変化のイメージ</span>
          <h2>続けるほど、実感へ。</h2>
          <p>下記はイメージです。効果の程度・期間には個人差があります。</p>
        </header>

        <div className="lm-case-grid">
          {CASES.map((c, i) => (
            <article className="lm-case-card" key={c.label} data-reveal style={{ "--reveal-delay": `${i * 0.08}s` } as React.CSSProperties}>
              <div className="lm-case-pair">
                <figure>
                  <span className="lm-case-img" style={{ background: `linear-gradient(160deg, ${c.tone1}, ${c.tone2})` }} aria-hidden />
                  <figcaption>Before</figcaption>
                </figure>
                <span className="lm-case-arrow" aria-hidden>
                  →
                </span>
                <figure>
                  <span className="lm-case-img bright" style={{ background: `linear-gradient(160deg, ${c.tone2}, #fdf3ea)` }} aria-hidden />
                  <figcaption>After</figcaption>
                </figure>
              </div>
              <div className="lm-case-meta">
                <b>{c.label}</b>
                <small>{c.months}</small>
              </div>
            </article>
          ))}
        </div>
        <p className="lm-case-note">※ 上記は施術イメージであり、効果を保証するものではありません。</p>
      </section>

      {/* ---------- doctor ---------- */}
      <section className="lm-doctor">
        <div className="lm-doctor-inner">
          <div className="lm-doctor-photo" data-reveal aria-hidden>
            <span className="lm-doctor-avatar">👩‍⚕️</span>
          </div>
          <div className="lm-doctor-body" data-reveal>
            <span className="lm-label">DOCTOR — 監修医師</span>
            <h2>
              一人ひとりの肌に、
              <br />
              誠実に向き合います。
            </h2>
            <p>
              「盛る」より「整える」。肌本来の力を引き出すことを大切にしています。
              まずはお悩みをお聞かせください。ご希望に沿わない施術を無理におすすめすることはありません。
            </p>
            <div className="lm-doctor-name">
              <b>院長　美咲 玲奈</b>
              <small>美容皮膚科医／日本美容皮膚科学会 会員（※架空のプロフィールです）</small>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- flow ---------- */}
      <section className="lm-flow" id="flow">
        <header className="lm-head" data-reveal>
          <span className="lm-label">FLOW — ご来院の流れ</span>
          <h2>はじめてでも、迷わない。</h2>
        </header>
        <ol className="lm-flow-list">
          {FLOW.map((f, i) => (
            <li key={f.no} data-reveal style={{ "--reveal-delay": `${i * 0.06}s` } as React.CSSProperties}>
              <span className="lm-flow-no">{f.no}</span>
              <b>{f.title}</b>
              <p>{f.body}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* ---------- campaign ---------- */}
      <section className="lm-campaign">
        <div className="lm-campaign-inner" data-reveal>
          <span className="lm-campaign-badge">MONITOR CAMPAIGN</span>
          <h2>
            今月のモニター、
            <br />
            残りわずかです。
          </h2>
          <p>初回モニター価格でのご案内は、毎月 50 名様限定。ご予約はお早めに。</p>
          <div className="lm-campaign-meter" aria-hidden>
            <span className="lm-campaign-bar">
              <i style={{ width: "82%" }} />
            </span>
            <b>今月の予約枠 残り 9 名</b>
          </div>
          <button className="lm-btn big" onClick={() => openForm()}>
            無料カウンセリングを予約する
          </button>
        </div>
      </section>

      {/* ---------- faq ---------- */}
      <section className="lm-faq" id="faq">
        <header className="lm-head" data-reveal>
          <span className="lm-label">FAQ — よくあるご質問</span>
          <h2>ご予約の前に</h2>
        </header>
        <div className="lm-faq-list" data-reveal>
          {FAQ.map((f) => (
            <details className="lm-faq-item" key={f.q}>
              <summary>
                <span>{f.q}</span>
                <i aria-hidden>+</i>
              </summary>
              <p>{f.a}</p>
            </details>
          ))}
        </div>
      </section>

      {/* ---------- access ---------- */}
      <section className="lm-access" id="access">
        <div className="lm-access-inner">
          <div className="lm-access-body" data-reveal>
            <span className="lm-label">ACCESS — アクセス</span>
            <h2>LUMICA CLINIC 表参道</h2>
            <dl className="lm-access-list">
              <div>
                <dt>住所</dt>
                <dd>〒000-0000　東京都渋谷区神宮前 0-0-0　ルミカビル 5F</dd>
              </div>
              <div>
                <dt>アクセス</dt>
                <dd>表参道駅 A2 出口より徒歩 3 分</dd>
              </div>
              <div>
                <dt>診療時間</dt>
                <dd>10:00 – 19:00（不定休）</dd>
              </div>
              <div>
                <dt>ご予約</dt>
                <dd>WEB／LINE は 24 時間受付　TEL 0120-000-000</dd>
              </div>
            </dl>
          </div>
          <div className="lm-access-map" data-reveal aria-hidden>
            <span className="lm-map-road v" />
            <span className="lm-map-road h" />
            <span className="lm-map-station">表参道駅</span>
            <span className="lm-map-pin">
              <i />
              当院
            </span>
          </div>
        </div>
      </section>

      {/* ---------- final cta ---------- */}
      <section className="lm-final">
        <div className="lm-final-inner" data-reveal>
          <span className="lm-label">RESERVE — ご予約</span>
          <h2>
            まずは、無料カウンセリングから。
          </h2>
          <p>肌診断は無料。当日の勧誘もありません。あなたの「なりたい」をお聞かせください。</p>
          <div className="lm-final-btns">
            <button className="lm-btn big" onClick={() => openForm()}>
              WEBで無料予約する
            </button>
            <a className="lm-btn line big" href="tel:0120000000">
              ☎ 0120-000-000
            </a>
          </div>
        </div>
      </section>

      <footer className="lm-footer">
        <div className="lm-footer-brand">
          <span className="lm-logo-mark" aria-hidden>
            L
          </span>
          <div>
            <b>LUMICA CLINIC ルミカ美容皮膚科</b>
            <small>〒000-0000　東京都渋谷区神宮前 0-0-0　ルミカビル 5F</small>
          </div>
        </div>
        <p className="lm-footer-legal">
          本ページはポートフォリオ用のモックです。掲載の医院名・医師・価格・実績はすべて架空です。
          自由診療（自費診療）に関する表現を含み、効果には個人差があります。
        </p>
        <span className="lm-footer-note">MOCK LP · MEDICAL AESTHETIC · © 2026</span>
      </footer>

      {/* ---------- sticky CTA bar ---------- */}
      <div className={`lm-sticky ${stuck ? "is-on" : ""}`}>
        <div className="lm-sticky-info">
          <b>初回モニター ¥9,800〜</b>
          <small>医師の無料カウンセリング付き</small>
        </div>
        <a className="lm-sticky-tel" href="tel:0120000000" aria-label="電話で予約">
          ☎
        </a>
        <button className="lm-sticky-btn" onClick={() => openForm()}>
          無料予約
        </button>
      </div>

      {/* ---------- reservation modal ---------- */}
      {step !== "idle" && (
        <div className="lm-modal-wrap" role="dialog" aria-modal="true">
          <button className="lm-modal-x" onClick={() => setStep("idle")} aria-label="閉じる">
            ✕
          </button>
          <div className="lm-modal">
            {step === "form" ? (
              <>
                <span className="lm-modal-kicker">無料カウンセリング予約</span>
                <h2>ご希望をお聞かせください</h2>
                <div className="lm-form">
                  <label>
                    ご希望メニュー
                    <select value={menu} onChange={(e) => setMenu(e.target.value)}>
                      {MENUS.map((m) => (
                        <option key={m.id} value={m.id}>
                          {m.name}（初回 {yen(m.first)}）
                        </option>
                      ))}
                      <option value="soudan">まずは相談だけ</option>
                    </select>
                  </label>
                  <div className="lm-form-row">
                    <label>
                      ご希望日
                      <input type="date" defaultValue="2026-08-01" />
                    </label>
                    <label>
                      時間帯
                      <select defaultValue="am">
                        <option value="am">午前（10:00–13:00）</option>
                        <option value="pm">午後（13:00–16:00）</option>
                        <option value="eve">夕方（16:00–19:00）</option>
                      </select>
                    </label>
                  </div>
                  <label>
                    お名前
                    <input defaultValue="内田 玲奈" />
                  </label>
                  <label>
                    電話番号
                    <input defaultValue="090-0000-0000" inputMode="tel" />
                  </label>
                </div>
                {selectedMenu && (
                  <div className="lm-form-summary">
                    <span>{selectedMenu.name}</span>
                    <b>初回 {yen(selectedMenu.first)}</b>
                  </div>
                )}
                <p className="lm-modal-note">※ モックのため送信は行われません。カウンセリング・肌診断は無料です。</p>
                <button className="lm-btn full" onClick={() => setStep("done")}>
                  この内容で予約する
                </button>
              </>
            ) : (
              <div className="lm-done">
                <span className="lm-done-mark" aria-hidden>
                  ✓
                </span>
                <h2>ご予約を受け付けました</h2>
                <p>
                  折り返し、確認のご連絡を差し上げます。
                  <br />
                  当日は肌診断からご案内します。お気をつけてお越しください。
                </p>
                <button className="lm-btn" onClick={() => setStep("idle")}>
                  ページに戻る
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </main>
  );
}
