"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import ScrollReveal from "../components/scroll-reveal";

/* ============================================================
   香典返し・法要ギフト専門店「結 -yui-」
   Powered by ショップサーブ（想定EC基盤） — full-redesign mock.
   落ち着いた和モダン。デザインと購入導線を主眼に設計。
   ============================================================ */

type Band = "A" | "B" | "C" | "D";

type Product = {
  id: string;
  mark: string; // emoji 主体の上品なサムネイル
  name: string;
  cat: string;
  desc: string;
  price: number; // 税込
  band: Band;
  catalog?: boolean;
  popular?: boolean;
};

const BANDS: { key: Band; range: string; koden: string; note: string }[] = [
  { key: "A", range: "2,000〜3,000円", koden: "いただいた香典 5,000円ほどの方へ", note: "消えものの定番を中心に。" },
  { key: "B", range: "3,000〜5,000円", koden: "いただいた香典 1万円ほどの方へ", note: "もっとも選ばれる価格帯。" },
  { key: "C", range: "5,000〜10,000円", koden: "いただいた香典 1〜2万円の方へ", note: "上質な詰合せ・カタログを。" },
  { key: "D", range: "10,000円〜", koden: "高額のご厚志をいただいた方へ", note: "格を重んじた特撰の品を。" },
];

const PRODUCTS: Product[] = [
  { id: "cat-hakuro", mark: "📗", name: "カタログギフト「白露」", cat: "カタログギフト", desc: "約1,200点から相手が選べる。迷ったらまずこの一冊。", price: 3800, band: "B", catalog: true, popular: true },
  { id: "cat-ai", mark: "📘", name: "カタログギフト「藍」", cat: "カタログギフト", desc: "グルメ・雑貨を厚く収録した中核グレード。", price: 5800, band: "C", catalog: true, popular: true },
  { id: "cat-tokiwa", mark: "📙", name: "カタログギフト「常磐」", cat: "カタログギフト", desc: "ブランド品・体験も選べる特撰グレード。", price: 10800, band: "D", catalog: true },
  { id: "nori", mark: "🍙", name: "有明海産 焼海苔詰合せ", cat: "海苔・乾物", desc: "香り高い一番摘み。日持ちする定番の消えもの。", price: 2700, band: "A", popular: true },
  { id: "coffee", mark: "☕", name: "ドリップコーヒー詰合せ", cat: "飲料", desc: "深煎り・浅煎りの飲み比べ。個包装で配りやすい。", price: 2160, band: "A" },
  { id: "towel", mark: "🧺", name: "今治タオル ギフトセット", cat: "タオル", desc: "ふっくら柔らかな国産今治タオル。実用の贈り物に。", price: 3240, band: "B" },
  { id: "tea", mark: "🍵", name: "宇治銘茶 詰合せ", cat: "日本茶", desc: "煎茶と玉露の詰合せ。改まった席にふさわしい一品。", price: 3240, band: "B" },
  { id: "yougashi", mark: "🍰", name: "洋菓子 焼菓子アソート", cat: "菓子", desc: "有名店のフィナンシェ・クッキー。幅広い世代に。", price: 4320, band: "B", popular: true },
  { id: "soap", mark: "🧼", name: "石鹸・タオル ギフト", cat: "石鹸・タオル", desc: "上質な無添加石鹸とタオルの詰合せ。", price: 5400, band: "C" },
  { id: "dashi", mark: "🥢", name: "だし・佃煮 詰合せ", cat: "和惣菜", desc: "料亭仕立てのだしと佃煮。年配の方に喜ばれる。", price: 5940, band: "C" },
  { id: "kiribako", mark: "🎁", name: "桐箱入り 銘茶と菓子", cat: "特撰詰合せ", desc: "桐箱におさめた銘茶と和菓子。格を重んじる方へ。", price: 8640, band: "C" },
  { id: "towel-d", mark: "🏮", name: "今治タオル 桐箱セット", cat: "特撰タオル", desc: "最高級コーマ糸を桐箱で。高額返礼にふさわしい格。", price: 11000, band: "D" },
];

const FLOW = [
  { no: "01", title: "ご予算を選ぶ", body: "いただいた香典額の半分〜3分の1が目安。「半返し」の早見表からご予算を選ぶだけ。" },
  { no: "02", title: "お品を選ぶ", body: "予算に合った品だけを表示。カタログギフトや消えものの定番から、迷わず選べます。" },
  { no: "03", title: "のし・挨拶状", body: "表書き「志」や忌明けの挨拶状は無料でご用意。名入れもこの場で指定できます。" },
  { no: "04", title: "お届け", body: "ご自宅一括、または先様へ直送。最短翌日出荷。全国送料無料でお届けします。" },
];

const GUIDE = [
  {
    q: "香典返しとは？",
    a: "いただいた香典へのお礼として、忌明け（四十九日）を目安に贈るお返しです。「消えもの」と呼ばれる後に残らない品が好まれます。",
  },
  {
    q: "金額の目安は？",
    a: "いただいた香典の「半返し（半額）」から「3分の1」が一般的です。当店の早見表で、ご予算をかんたんに選べます。",
  },
  {
    q: "表書き（のし）は？",
    a: "仏式では「志」、関西では「満中陰志」が一般的です。当店ではすべて無料でお付けし、名入れも承ります。",
  },
  {
    q: "挨拶状は必要？",
    a: "直接お渡しできない場合は、忌明けのご挨拶状を添えるのが丁寧です。定型文からお選びいただけ、無料でご用意します。",
  },
];

const FAQ = [
  { q: "送料はかかりますか？", a: "全国どこでも送料無料です。先様へ直接お届けする「直送」も追加料金なく承ります。" },
  { q: "のし・挨拶状は無料ですか？", a: "はい。表書き・名入れ・忌明けの挨拶状はすべて無料です。ご注文手続きの中で指定いただけます。" },
  { q: "どのくらいで届きますか？", a: "在庫品は最短翌営業日に出荷します。お急ぎの場合はお電話でもご相談を承ります。" },
  { q: "支払い方法は？", a: "各種クレジットカード・コンビニ後払い・銀行振込に対応しています（ショップサーブ決済）。" },
];

const yen = (n: number) => `¥${n.toLocaleString("ja-JP")}`;
const find = (id: string) => PRODUCTS.find((p) => p.id === id);

type Step = "idle" | "noshi" | "info" | "done";

export default function Koden() {
  const [band, setBand] = useState<Band | "all">("all");
  const [cart, setCart] = useState<Record<string, number>>({});
  const [trayOpen, setTrayOpen] = useState(false);
  const [step, setStep] = useState<Step>("idle");
  const [toast, setToast] = useState("");
  const [omote, setOmote] = useState("志");
  const [greeting, setGreeting] = useState(true);
  const [orderNo, setOrderNo] = useState("");

  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(""), 2200);
    return () => clearTimeout(t);
  }, [toast]);

  useEffect(() => {
    const locked = trayOpen || step !== "idle";
    document.body.style.overflow = locked ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [trayOpen, step]);

  const visible = useMemo(
    () => (band === "all" ? PRODUCTS : PRODUCTS.filter((p) => p.band === band)),
    [band],
  );

  const lines = useMemo(
    () =>
      Object.entries(cart).flatMap(([id, qty]) => {
        const p = find(id);
        return p && qty > 0 ? [{ ...p, qty }] : [];
      }),
    [cart],
  );

  const count = lines.reduce((s, l) => s + l.qty, 0);
  const subtotal = lines.reduce((s, l) => s + l.price * l.qty, 0);

  const add = (p: Product) => {
    setCart((c) => ({ ...c, [p.id]: (c[p.id] ?? 0) + 1 }));
    setToast(`${p.name} を選びました`);
  };

  const setQty = (id: string, qty: number) => {
    setCart((c) => {
      const next = { ...c };
      if (qty <= 0) delete next[id];
      else next[id] = qty;
      return next;
    });
  };

  const finish = () => {
    setOrderNo("Y" + Math.floor(100000 + Math.random() * 899999));
    setStep("done");
    setCart({});
  };

  return (
    <main className="kd">
      <ScrollReveal />
      <Link className="back-home" href="/">
        ← PORTFOLIO
      </Link>

      <div className="kd-top">忌明けの挨拶状・のし 無料　—　全国送料無料　—　最短翌営業日出荷</div>

      {/* ---------- nav ---------- */}
      <nav className="kd-nav">
        <a href="#top" className="kd-logo">
          <span className="kd-mark" aria-hidden>
            結
          </span>
          <span className="kd-logo-text">
            <b>香典返し・法要ギフト 結</b>
            <small>YUI &nbsp;GIFT</small>
          </span>
        </a>
        <div className="kd-links">
          <a href="#flow">ご利用の流れ</a>
          <a href="#budget">予算から選ぶ</a>
          <a href="#guide">香典返しとは</a>
          <a href="#faq">よくある質問</a>
        </div>
        <button className="kd-tray-btn" onClick={() => setTrayOpen(true)}>
          <span aria-hidden>🎁</span>
          選んだ品
          {count > 0 && <b>{count}</b>}
        </button>
      </nav>

      {/* ---------- hero ---------- */}
      <header className="kd-hero" id="top">
        <div className="kd-hero-wash" aria-hidden>
          <span className="kd-blob a" />
          <span className="kd-blob b" />
        </div>
        <div className="kd-hero-copy" data-reveal>
          <span className="kd-kicker">香典返し・法要のお返し 専門店</span>
          <h1>
            ありがとうを、
            <br />
            <span className="kd-accent">しずかに結ぶ。</span>
          </h1>
          <p>
            いただいたご厚志へのお礼を、迷わず、ていねいに。
            <br />
            予算えらびからのし・挨拶状まで、この一画面で整います。
          </p>
          <div className="kd-hero-ctas">
            <a className="kd-btn" href="#budget">
              予算から品を選ぶ
            </a>
            <a className="kd-btn ghost" href="#flow">
              ご利用の流れ
            </a>
          </div>
          <ul className="kd-hero-facts">
            <li>
              <b>のし・挨拶状</b>
              無料でご用意
            </li>
            <li>
              <b>全国送料無料</b>
              先様へ直送も可
            </li>
            <li>
              <b>最短翌営業日</b>
              スピード出荷
            </li>
          </ul>
        </div>

        <aside className="kd-hero-card" data-reveal aria-label="半返し早見表">
          <span className="kd-card-label">半返し 早見表</span>
          <p className="kd-card-lead">いただいた香典から、ご予算の目安がわかります。</p>
          <ul className="kd-card-table">
            <li>
              <span>5,000円</span>
              <i aria-hidden>→</i>
              <b>2,000〜3,000円</b>
            </li>
            <li>
              <span>1万円</span>
              <i aria-hidden>→</i>
              <b>3,000〜5,000円</b>
            </li>
            <li>
              <span>2万円</span>
              <i aria-hidden>→</i>
              <b>5,000〜10,000円</b>
            </li>
            <li>
              <span>3万円〜</span>
              <i aria-hidden>→</i>
              <b>10,000円〜</b>
            </li>
          </ul>
          <a className="kd-card-link" href="#budget">
            この表から品を探す →
          </a>
        </aside>
      </header>

      {/* ---------- flow ---------- */}
      <section className="kd-flow" id="flow">
        <header className="kd-head" data-reveal>
          <span className="kd-label">HOW IT WORKS — ご利用の流れ</span>
          <h2>四つの手順で、整います。</h2>
          <p>はじめての方でも迷わないよう、購入の導線をできるだけ短く設計しました。</p>
        </header>
        <ol className="kd-flow-list">
          {FLOW.map((f, i) => (
            <li key={f.no} data-reveal style={{ "--reveal-delay": `${i * 0.07}s` } as React.CSSProperties}>
              <span className="kd-flow-no">{f.no}</span>
              <b>{f.title}</b>
              <p>{f.body}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* ---------- budget selector ---------- */}
      <section className="kd-budget" id="budget">
        <header className="kd-head" data-reveal>
          <span className="kd-label">STEP 1 — 予算から選ぶ</span>
          <h2>ご予算を、お選びください。</h2>
          <p>いただいた香典額に合わせて選ぶと、ふさわしい価格帯の品だけが表示されます。</p>
        </header>

        <div className="kd-bands" data-reveal>
          <button
            className={`kd-band ${band === "all" ? "is-active" : ""}`}
            onClick={() => setBand("all")}
          >
            <b>すべて</b>
            <small>全価格帯を見る</small>
          </button>
          {BANDS.map((b) => (
            <button
              key={b.key}
              className={`kd-band ${band === b.key ? "is-active" : ""}`}
              onClick={() => setBand(b.key)}
            >
              <b>{b.range}</b>
              <small>{b.koden}</small>
              <em>{b.note}</em>
            </button>
          ))}
        </div>

        {/* ---------- products ---------- */}
        <div className="kd-head kd-head-sub" data-reveal>
          <span className="kd-label">STEP 2 — お品を選ぶ</span>
          <h2>
            {band === "all" ? "すべての品" : `${BANDS.find((b) => b.key === band)?.range} の品`}
            <em>／{visible.length}点</em>
          </h2>
        </div>

        <div className="kd-grid">
          {visible.map((p) => (
            <article className="kd-card2" key={p.id} data-reveal>
              <div className="kd-thumb" aria-hidden>
                <span className="kd-thumb-mark">{p.mark}</span>
                {p.catalog && <span className="kd-tag catalog">カタログ</span>}
                {p.popular && !p.catalog && <span className="kd-tag pop">人気</span>}
              </div>
              <div className="kd-card2-body">
                <small className="kd-cat">{p.cat}</small>
                <h3>{p.name}</h3>
                <p>{p.desc}</p>
                <div className="kd-buy">
                  <strong>
                    {yen(p.price)}
                    <small>税込</small>
                  </strong>
                  <button className="kd-add" onClick={() => add(p)}>
                    {cart[p.id] ? `選択中 (${cart[p.id]})` : "選ぶ"}
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* ---------- service band ---------- */}
      <section className="kd-service">
        <div className="kd-service-inner">
          <article data-reveal>
            <span className="kd-service-ico" aria-hidden>
              ✉
            </span>
            <b>のし・挨拶状 無料</b>
            <p>表書き「志」の掛け紙、名入れ、忌明けのご挨拶状を無料でご用意します。</p>
          </article>
          <article data-reveal style={{ "--reveal-delay": "0.08s" } as React.CSSProperties}>
            <span className="kd-service-ico" aria-hidden>
              🚚
            </span>
            <b>送料無料・直送対応</b>
            <p>全国送料無料。ご自宅一括でも、先様へ一件ずつの直送でも承ります。</p>
          </article>
          <article data-reveal style={{ "--reveal-delay": "0.16s" } as React.CSSProperties}>
            <span className="kd-service-ico" aria-hidden>
              🕊
            </span>
            <b>専門スタッフが相談対応</b>
            <p>地域のしきたりや表書きの迷いも、経験豊富なスタッフがお手伝いします。</p>
          </article>
        </div>
      </section>

      {/* ---------- guide ---------- */}
      <section className="kd-guide" id="guide">
        <header className="kd-head" data-reveal>
          <span className="kd-label">GUIDE — はじめての方へ</span>
          <h2>香典返しの、基本のこと。</h2>
        </header>
        <div className="kd-guide-grid">
          {GUIDE.map((g, i) => (
            <article key={g.q} data-reveal style={{ "--reveal-delay": `${i * 0.06}s` } as React.CSSProperties}>
              <h3>{g.q}</h3>
              <p>{g.a}</p>
            </article>
          ))}
        </div>
      </section>

      {/* ---------- faq ---------- */}
      <section className="kd-faq" id="faq">
        <header className="kd-head" data-reveal>
          <span className="kd-label">FAQ — よくあるご質問</span>
          <h2>ご注文の前に</h2>
        </header>
        <div className="kd-faq-list" data-reveal>
          {FAQ.map((f) => (
            <details className="kd-faq-item" key={f.q}>
              <summary>
                <span>{f.q}</span>
                <i aria-hidden>+</i>
              </summary>
              <p>{f.a}</p>
            </details>
          ))}
        </div>
      </section>

      {/* ---------- closing ---------- */}
      <section className="kd-cta">
        <div className="kd-cta-inner" data-reveal>
          <span className="kd-label">お気軽にご相談ください</span>
          <h2>
            迷ったときは、
            <br />
            まずご予算えらびから。
          </h2>
          <div className="kd-cta-btns">
            <a className="kd-btn big" href="#budget">
              予算から品を選ぶ
            </a>
            <a className="kd-btn ghost big" href="tel:0120000000">
              ☎ 0120-000-000
            </a>
          </div>
          <p className="kd-cta-note">受付 9:00–18:00（土日祝を除く）／のし・挨拶状・送料すべて無料</p>
        </div>
      </section>

      <footer className="kd-footer">
        <div className="kd-footer-brand">
          <span className="kd-mark" aria-hidden>
            結
          </span>
          <div>
            <b>香典返し・法要ギフト 結 -yui-</b>
            <small>〒000-0000　東京都中央区日本橋 0-0-0　結ギフト株式会社</small>
          </div>
        </div>
        <span className="kd-footer-note">
          Powered by ショップサーブ · TEL 0120-000-000 · MOCK PROJECT © 2026
        </span>
      </footer>

      {/* ---------- selection tray (drawer) ---------- */}
      <div className={`kd-overlay ${trayOpen ? "is-open" : ""}`} onClick={() => setTrayOpen(false)} />

      <aside className={`kd-tray ${trayOpen ? "is-open" : ""}`} aria-hidden={!trayOpen}>
        <header className="kd-tray-head">
          <h2>選んだ品 {count > 0 && <b>{count}点</b>}</h2>
          <button onClick={() => setTrayOpen(false)} aria-label="閉じる">
            ✕
          </button>
        </header>

        {lines.length === 0 ? (
          <div className="kd-empty">
            <span aria-hidden>🎁</span>
            <p>まだ品が選ばれていません。</p>
            <button className="kd-btn" onClick={() => setTrayOpen(false)}>
              品を選びに戻る
            </button>
          </div>
        ) : (
          <>
            <div className="kd-tray-lines">
              {lines.map((l) => (
                <div className="kd-tray-line" key={l.id}>
                  <span className="kd-tray-thumb" aria-hidden>
                    {l.mark}
                  </span>
                  <div className="kd-tray-meta">
                    <b>{l.name}</b>
                    <small>{l.cat}</small>
                    <div className="kd-qty">
                      <button onClick={() => setQty(l.id, l.qty - 1)} aria-label="減らす">
                        −
                      </button>
                      <span>{l.qty}</span>
                      <button onClick={() => setQty(l.id, l.qty + 1)} aria-label="増やす">
                        ＋
                      </button>
                    </div>
                  </div>
                  <div className="kd-tray-price">
                    <strong>{yen(l.price * l.qty)}</strong>
                    <button onClick={() => setQty(l.id, 0)}>削除</button>
                  </div>
                </div>
              ))}
            </div>
            <footer className="kd-tray-foot">
              <div className="kd-sum total">
                <span>小計（税込）</span>
                <b>{yen(subtotal)}</b>
              </div>
              <p className="kd-tray-free">送料無料・のし・挨拶状すべて無料</p>
              <button
                className="kd-btn full"
                onClick={() => {
                  setTrayOpen(false);
                  setStep("noshi");
                }}
              >
                のし・挨拶状の指定へ →
              </button>
            </footer>
          </>
        )}
      </aside>

      {/* ---------- checkout modal ---------- */}
      {step !== "idle" && (
        <div className="kd-modal-wrap" role="dialog" aria-modal="true">
          <div className="kd-modal">
            {step !== "done" && (
              <div className="kd-steps" aria-hidden>
                <span className={step === "noshi" ? "is-on" : "is-done"}>1 のし・挨拶状</span>
                <i />
                <span className={step === "info" ? "is-on" : ""}>2 お届け先</span>
                <i />
                <span>3 完了</span>
              </div>
            )}

            {step === "noshi" && (
              <>
                <h2>のし・挨拶状の指定</h2>
                <p className="kd-modal-lead">すべて無料でご用意します。ご不明な場合は既定のままで問題ありません。</p>
                <div className="kd-form">
                  <label>
                    表書き
                    <select value={omote} onChange={(e) => setOmote(e.target.value)}>
                      <option value="志">志（仏式・一般的）</option>
                      <option value="満中陰志">満中陰志（関西）</option>
                      <option value="粗供養">粗供養（法要）</option>
                      <option value="偲び草">偲び草（神式・その他）</option>
                    </select>
                  </label>
                  <label>
                    名入れ（姓）
                    <input defaultValue="内田" />
                  </label>
                  <label className="kd-check">
                    <input type="checkbox" checked={greeting} onChange={(e) => setGreeting(e.target.checked)} />
                    <span>忌明けの挨拶状を添える（無料）</span>
                  </label>
                </div>
                <div className="kd-noshi-preview" aria-hidden>
                  <span className="kd-mizu" />
                  <b>{omote}</b>
                  <small>内田</small>
                </div>
                <div className="kd-modal-actions">
                  <button className="kd-btn ghost" onClick={() => setStep("idle")}>
                    戻る
                  </button>
                  <button className="kd-btn" onClick={() => setStep("info")}>
                    お届け先の入力へ →
                  </button>
                </div>
              </>
            )}

            {step === "info" && (
              <>
                <h2>お届け先の確認</h2>
                <p className="kd-modal-lead">ご自宅一括のほか、先様への直送も追加料金なく承ります。</p>
                <div className="kd-form">
                  <label>
                    お届け方法
                    <select defaultValue="jitaku">
                      <option value="jitaku">ご自宅へ一括でお届け</option>
                      <option value="chokusou">先様へ直送する</option>
                    </select>
                  </label>
                  <label>
                    お名前<input defaultValue="内田 裕太" />
                  </label>
                  <label>
                    お届け先<input defaultValue="東京都中央区日本橋 0-0-0 結ハイツ 305" />
                  </label>
                  <label>
                    お支払い方法
                    <select defaultValue="card">
                      <option value="card">クレジットカード（•••• 4242）</option>
                      <option value="atobarai">コンビニ後払い</option>
                      <option value="furikomi">銀行振込</option>
                    </select>
                  </label>
                </div>
                <div className="kd-modal-total">
                  <span>お支払い金額（送料・のし・挨拶状 込）</span>
                  <strong>{yen(subtotal)}</strong>
                </div>
                <p className="kd-note">※ ポートフォリオ用のモックです。決済は実行されません。（ショップサーブ想定）</p>
                <div className="kd-modal-actions">
                  <button className="kd-btn ghost" onClick={() => setStep("noshi")}>
                    戻る
                  </button>
                  <button className="kd-btn" onClick={finish}>
                    注文を確定する
                  </button>
                </div>
              </>
            )}

            {step === "done" && (
              <div className="kd-done">
                <span className="kd-done-mark" aria-hidden>
                  ✓
                </span>
                <h2>ご注文を承りました</h2>
                <p>
                  注文番号 <b>{orderNo}</b>
                  <br />
                  のし「{omote}」{greeting ? "・挨拶状つき" : ""}でご用意し、最短翌営業日に出荷いたします。
                </p>
                <button className="kd-btn" onClick={() => setStep("idle")}>
                  トップに戻る
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      <div className={`kd-toast ${toast ? "is-open" : ""}`} role="status">
        {toast}
      </div>
    </main>
  );
}
