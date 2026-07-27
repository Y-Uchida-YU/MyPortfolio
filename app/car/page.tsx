"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import ScrollReveal from "../components/scroll-reveal";

/* ============================================================
   AETHER One — プレミアム電気自動車の紹介サイト（モック）
   色が切り替わるSVGカー × カラー/グレード・コンフィギュレーター。
   静けさと速さを両立するEVの世界観を、暗色×アクアで表現。
   ============================================================ */

type CarColor = { id: string; name: string; body: string; sub: string };

const COLORS: CarColor[] = [
  { id: "luna", name: "ルナ ホワイト", body: "#eef1f4", sub: "#c8ced6" },
  { id: "onyx", name: "オニキス ブラック", body: "#282c33", sub: "#14171c" },
  { id: "mid", name: "ミッドナイト ブルー", body: "#2c3f63", sub: "#1b2942" },
  { id: "solaris", name: "ソラリス グレー", body: "#8b929c", sub: "#5f656e" },
  { id: "mint", name: "オーロラ ミント", body: "#3aa89a", sub: "#237064" },
  { id: "ember", name: "エンバー レッド", body: "#b5433b", sub: "#822d27" },
];

type Grade = {
  id: string;
  name: string;
  sub: string;
  range: number; // km WLTC
  accel: number; // 0-100 s
  power: number; // kW
  drive: string;
  price: number;
  featured?: boolean;
};

const GRADES: Grade[] = [
  { id: "standard", name: "Standard", sub: "毎日を、なめらかに。", range: 480, accel: 6.9, power: 210, drive: "後輪駆動", price: 4980000 },
  { id: "long", name: "Long Range", sub: "遠くへ、ためらいなく。", range: 620, accel: 5.6, power: 250, drive: "後輪駆動", price: 5780000, featured: true },
  { id: "perf", name: "Performance", sub: "静寂を切り裂く。", range: 560, accel: 3.8, power: 380, drive: "AWD デュアルモーター", price: 6980000 },
];

const FEATURES = [
  {
    tag: "SILENCE",
    title: "走り出しても、静か。",
    body: "モーター駆動ならではの無音の加速。二重の遮音ガラスと空力設計で、時速100kmでも車内は図書館ほどの静けさ。会話も音楽も、そのままに。",
    stat: "38dB",
    statLabel: "巡航時 車内騒音",
  },
  {
    tag: "SAFETY",
    title: "先を読む、知性。",
    body: "全方位カメラとレーダーが周囲を常時把握。高速道路での運転支援から、駐車のアシストまで。危険を先回りして、ドライバーを支えます。",
    stat: "360°",
    statLabel: "センシング",
  },
  {
    tag: "OTA",
    title: "乗るほど、新しくなる。",
    body: "ソフトウェアは無線で更新。航続距離の最適化や新機能の追加も、ディーラーへ行かずに。買った日が、いちばん古い日ではありません。",
    stat: "OTA",
    statLabel: "無線アップデート",
  },
];

const FAQ = [
  { q: "充電はどのくらいかかりますか？", a: "急速充電（150kW）で約28分に80%まで充電できます。ご自宅の普通充電なら、就寝中に満充電が目安です。" },
  { q: "補助金は使えますか？", a: "国のCEV補助金や自治体の補助金の対象です（時期・地域により異なります）。試乗時にお見積りとあわせてご案内します。" },
  { q: "試乗はできますか？", a: "全国のAETHERストアで試乗いただけます。本ページからご希望の店舗・日時をお選びのうえ、ご予約ください。" },
  { q: "保証はどうなっていますか？", a: "車両は5年/10万km、駆動用バッテリーは8年/16万kmの保証付きです（いずれも架空の条件です）。" },
];

const yen = (n: number) => `¥${n.toLocaleString("ja-JP")}`;
const man = (n: number) => `${Math.round(n / 10000).toLocaleString("ja-JP")}万円`;

/* ---------- SVG car (recolors by body/sub) ---------- */
function CarArt({ body, sub, size = "hero" }: { body: string; sub: string; size?: "hero" | "mini" }) {
  return (
    <svg className={`car-svg ${size}`} viewBox="0 0 640 300" role="img" aria-label="AETHER One">
      <defs>
        <linearGradient id={`sheen-${body.replace("#", "")}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#ffffff" stopOpacity="0.28" />
          <stop offset="0.4" stopColor="#ffffff" stopOpacity="0.05" />
          <stop offset="1" stopColor="#000000" stopOpacity="0.12" />
        </linearGradient>
      </defs>

      {/* ground shadow */}
      <ellipse cx="320" cy="256" rx="266" ry="18" fill="#000" opacity="0.28" />

      {/* body */}
      <path
        d="M44 196
           L54 156 Q60 143 82 140
           L196 132 L252 92 L404 88
           C472 90 512 118 560 150
           L602 160 L602 196
           L536 196 A47 47 0 0 0 442 196
           L206 196 A47 47 0 0 0 112 196 Z"
        fill={body}
        stroke={sub}
        strokeWidth="2"
      />
      {/* sheen over body */}
      <path
        d="M44 196
           L54 156 Q60 143 82 140
           L196 132 L252 92 L404 88
           C472 90 512 118 560 150
           L602 160 L602 196
           L536 196 A47 47 0 0 0 442 196
           L206 196 A47 47 0 0 0 112 196 Z"
        fill={`url(#sheen-${body.replace("#", "")})`}
      />
      {/* greenhouse / glass */}
      <path
        d="M214 130 L258 98 L400 95 L404 96 C452 98 492 120 520 142 L214 142 Z"
        fill="#12181f"
        opacity="0.9"
      />
      {/* B-pillar */}
      <rect x="330" y="96" width="7" height="46" fill={sub} opacity="0.85" />
      {/* beltline accent */}
      <path d="M120 150 L560 150" stroke={sub} strokeWidth="2" opacity="0.5" />
      {/* headlight */}
      <path d="M54 156 Q60 143 82 140 L86 152 L58 160 Z" fill="#eafcff" opacity="0.9" />
      {/* taillight */}
      <rect x="586" y="162" width="18" height="10" rx="3" fill="#ff5d54" opacity="0.9" />

      {/* wheels */}
      {[159, 489].map((cx) => (
        <g key={cx}>
          <circle cx={cx} cy="196" r="46" fill="#15181d" />
          <circle cx={cx} cy="196" r="45" fill="none" stroke="#2a2f37" strokeWidth="2" />
          <circle cx={cx} cy="196" r="24" fill="#0c0e12" />
          <circle cx={cx} cy="196" r="23" fill="none" stroke="#3a414b" strokeWidth="1.5" />
          {[0, 60, 120, 180, 240, 300].map((deg) => (
            <rect
              key={deg}
              x={cx - 2}
              y="176"
              width="4"
              height="18"
              rx="2"
              fill="#242a32"
              transform={`rotate(${deg} ${cx} 196)`}
            />
          ))}
          <circle cx={cx} cy="196" r="5" fill="#5cd6c6" />
        </g>
      ))}
    </svg>
  );
}

export default function Car() {
  const [colorId, setColorId] = useState("mid");
  const [gradeId, setGradeId] = useState("long");
  const [step, setStep] = useState<"idle" | "form" | "done">("idle");
  const [toast, setToast] = useState("");

  const color = useMemo(() => COLORS.find((c) => c.id === colorId)!, [colorId]);
  const grade = useMemo(() => GRADES.find((g) => g.id === gradeId)!, [gradeId]);

  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(""), 1900);
    return () => clearTimeout(t);
  }, [toast]);

  useEffect(() => {
    document.body.style.overflow = step !== "idle" ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [step]);

  return (
    <main className="ca">
      <ScrollReveal />
      <Link className="back-home" href="/">
        ← PORTFOLIO
      </Link>

      {/* ---------- nav ---------- */}
      <nav className="ca-nav">
        <a href="#top" className="ca-logo">
          AETHER<span>◦</span>
        </a>
        <div className="ca-links">
          <a href="#perf">性能</a>
          <a href="#feature">特長</a>
          <a href="#config">グレード</a>
          <a href="#faq">FAQ</a>
        </div>
        <button className="ca-nav-cta" onClick={() => setStep("form")}>
          試乗を予約
        </button>
      </nav>

      {/* ---------- hero ---------- */}
      <header className="ca-hero" id="top">
        <div className="ca-hero-glow" aria-hidden>
          <span className="ca-ring r1" />
          <span className="ca-ring r2" />
        </div>

        <div className="ca-hero-head" data-reveal>
          <span className="ca-kicker">100% ELECTRIC · 2026</span>
          <h1>AETHER One</h1>
          <p>静けさが、走り出す。</p>
        </div>

        <div className="ca-stage" data-reveal>
          <CarArt body={color.body} sub={color.sub} />
        </div>

        <div className="ca-swatches" data-reveal>
          {COLORS.map((c) => (
            <button
              key={c.id}
              className={`ca-swatch ${colorId === c.id ? "is-active" : ""}`}
              onClick={() => {
                setColorId(c.id);
                setToast(`カラー：${c.name}`);
              }}
              style={{ background: c.body }}
              aria-label={c.name}
              title={c.name}
            >
              <i style={{ background: c.sub }} aria-hidden />
            </button>
          ))}
          <span className="ca-swatch-name">{color.name}</span>
        </div>

        <div className="ca-hero-stats" data-reveal>
          <div>
            <b>
              {grade.range}
              <small>km</small>
            </b>
            <span>航続距離 WLTC</span>
          </div>
          <div>
            <b>
              {grade.accel.toFixed(1)}
              <small>s</small>
            </b>
            <span>0–100km/h</span>
          </div>
          <div>
            <b>
              {grade.power}
              <small>kW</small>
            </b>
            <span>最高出力</span>
          </div>
          <div>
            <b>
              28
              <small>min</small>
            </b>
            <span>急速充電 10→80%</span>
          </div>
        </div>

        <div className="ca-hero-ctas" data-reveal>
          <button className="ca-btn" onClick={() => setStep("form")}>
            試乗を予約する
          </button>
          <a className="ca-btn ghost" href="#config">
            グレードと価格を見る
          </a>
        </div>
      </header>

      {/* ---------- performance band ---------- */}
      <section className="ca-perf" id="perf">
        <header className="ca-head" data-reveal>
          <span className="ca-label">PERFORMANCE</span>
          <h2>速さは、静けさの中にある。</h2>
          <p>アクセルを踏んだ瞬間から最大トルク。変速のない、途切れないひと続きの加速を。</p>
        </header>
        <div className="ca-perf-grid">
          {[
            ["3.8", "秒", "0–100km/h（Performance）"],
            ["620", "km", "最大航続距離（Long Range）"],
            ["380", "kW", "最高出力"],
            ["660", "N·m", "最大トルク"],
          ].map(([num, unit, label], i) => (
            <div key={label} data-reveal style={{ "--reveal-delay": `${i * 0.07}s` } as React.CSSProperties}>
              <b>
                {num}
                <small>{unit}</small>
              </b>
              <span>{label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ---------- features ---------- */}
      <section className="ca-feature" id="feature">
        {FEATURES.map((f, i) => (
          <article className={`ca-feature-row ${i % 2 ? "rev" : ""}`} key={f.tag} data-reveal>
            <div className="ca-feature-copy">
              <span className="ca-label">{f.tag}</span>
              <h2>{f.title}</h2>
              <p>{f.body}</p>
            </div>
            <div className="ca-feature-visual" aria-hidden>
              <span className="ca-feature-stat">
                <b>{f.stat}</b>
                <small>{f.statLabel}</small>
              </span>
            </div>
          </article>
        ))}
      </section>

      {/* ---------- configurator ---------- */}
      <section className="ca-config" id="config">
        <header className="ca-head" data-reveal>
          <span className="ca-label">BUILD YOURS — グレードを選ぶ</span>
          <h2>あなたの一台を、組み立てる。</h2>
          <p>グレードとカラーを選ぶと、航続距離・加速・価格が切り替わります。</p>
        </header>

        <div className="ca-config-preview" data-reveal>
          <CarArt body={color.body} sub={color.sub} size="mini" />
          <div className="ca-config-swatches">
            {COLORS.map((c) => (
              <button
                key={c.id}
                className={`ca-swatch ${colorId === c.id ? "is-active" : ""}`}
                onClick={() => setColorId(c.id)}
                style={{ background: c.body }}
                aria-label={c.name}
                title={c.name}
              >
                <i style={{ background: c.sub }} aria-hidden />
              </button>
            ))}
          </div>
        </div>

        <div className="ca-grades" data-reveal>
          {GRADES.map((g) => (
            <button
              key={g.id}
              className={`ca-grade ${gradeId === g.id ? "is-active" : ""} ${g.featured ? "featured" : ""}`}
              onClick={() => setGradeId(g.id)}
            >
              {g.featured && <span className="ca-grade-flag">人気</span>}
              <span className="ca-grade-name">{g.name}</span>
              <span className="ca-grade-sub">{g.sub}</span>
              <dl className="ca-grade-specs">
                <div>
                  <dt>航続</dt>
                  <dd>{g.range} km</dd>
                </div>
                <div>
                  <dt>0–100</dt>
                  <dd>{g.accel.toFixed(1)} s</dd>
                </div>
                <div>
                  <dt>駆動</dt>
                  <dd>{g.drive}</dd>
                </div>
              </dl>
              <span className="ca-grade-price">{yen(g.price)}〜</span>
            </button>
          ))}
        </div>

        <div className="ca-config-bar" data-reveal>
          <div className="ca-config-sum">
            <span>AETHER One {grade.name}／{color.name}</span>
            <b>
              {yen(grade.price)}
              <small>（{man(grade.price)}）〜 ※各種補助金適用前</small>
            </b>
          </div>
          <button className="ca-btn" onClick={() => setStep("form")}>
            この仕様で試乗を予約
          </button>
        </div>
      </section>

      {/* ---------- gallery ---------- */}
      <section className="ca-gallery">
        <header className="ca-head" data-reveal>
          <span className="ca-label">GALLERY</span>
          <h2>光をまとう、6つの表情。</h2>
        </header>
        <div className="ca-gallery-grid" data-reveal>
          {COLORS.map((c) => (
            <button
              key={c.id}
              className="ca-gallery-item"
              onClick={() => {
                setColorId(c.id);
                setToast(`カラー：${c.name}`);
              }}
            >
              <CarArt body={c.body} sub={c.sub} size="mini" />
              <span>{c.name}</span>
            </button>
          ))}
        </div>
      </section>

      {/* ---------- faq ---------- */}
      <section className="ca-faq" id="faq">
        <header className="ca-head" data-reveal>
          <span className="ca-label">FAQ</span>
          <h2>ご購入・試乗の前に</h2>
        </header>
        <div className="ca-faq-list" data-reveal>
          {FAQ.map((f) => (
            <details className="ca-faq-item" key={f.q}>
              <summary>
                <span>{f.q}</span>
                <i aria-hidden>+</i>
              </summary>
              <p>{f.a}</p>
            </details>
          ))}
        </div>
      </section>

      {/* ---------- final cta ---------- */}
      <section className="ca-final">
        <div className="ca-final-inner" data-reveal>
          <span className="ca-label">TEST DRIVE</span>
          <h2>
            静けさは、
            <br />
            乗ってみないとわからない。
          </h2>
          <p>全国のAETHERストアで、AETHER One の試乗を。所要 約30分・無料です。</p>
          <button className="ca-btn big" onClick={() => setStep("form")}>
            試乗を予約する
          </button>
        </div>
      </section>

      <footer className="ca-footer">
        <span className="ca-logo">
          AETHER<span>◦</span>
        </span>
        <span className="ca-footer-note">
          本ページはポートフォリオ用のモックです。車名・仕様・価格はすべて架空です。MOCK · © 2026
        </span>
      </footer>

      {/* ---------- reservation modal ---------- */}
      {step !== "idle" && (
        <div className="ca-modal-wrap" role="dialog" aria-modal="true">
          <button className="ca-modal-x" onClick={() => setStep("idle")} aria-label="閉じる">
            ✕
          </button>
          <div className="ca-modal">
            {step === "form" ? (
              <>
                <span className="ca-modal-kicker">TEST DRIVE — 試乗予約</span>
                <h2>試乗のご予約</h2>
                <div className="ca-modal-car" aria-hidden>
                  <CarArt body={color.body} sub={color.sub} size="mini" />
                  <span>
                    AETHER One {grade.name}
                    <small>{color.name}</small>
                  </span>
                </div>
                <div className="ca-form">
                  <label>
                    ご希望の店舗
                    <select defaultValue="omotesando">
                      <option value="omotesando">AETHER 表参道</option>
                      <option value="umeda">AETHER 大阪 梅田</option>
                      <option value="sakae">AETHER 名古屋 栄</option>
                      <option value="fukuoka">AETHER 福岡 天神</option>
                    </select>
                  </label>
                  <div className="ca-form-row">
                    <label>
                      ご希望日
                      <input type="date" defaultValue="2026-08-08" />
                    </label>
                    <label>
                      時間帯
                      <select defaultValue="am">
                        <option value="am">午前</option>
                        <option value="pm">午後</option>
                      </select>
                    </label>
                  </div>
                  <label>
                    お名前
                    <input defaultValue="内田 裕太" />
                  </label>
                  <label>
                    連絡先メール
                    <input defaultValue="yuta@example.com" inputMode="email" />
                  </label>
                </div>
                <p className="ca-modal-note">※ モックのため送信は行われません。試乗は無料・所要約30分です。</p>
                <button className="ca-btn full" onClick={() => setStep("done")}>
                  この内容で予約する
                </button>
              </>
            ) : (
              <div className="ca-done">
                <span className="ca-done-mark" aria-hidden>
                  ✓
                </span>
                <h2>試乗のご予約を承りました</h2>
                <p>
                  確認メールをお送りします。当日は AETHER One {grade.name}（{color.name}）をご用意してお待ちしています。
                </p>
                <button className="ca-btn" onClick={() => setStep("idle")}>
                  ページに戻る
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      <div className={`ca-toast ${toast ? "is-open" : ""}`} role="status">
        {toast}
      </div>
    </main>
  );
}
