import Link from "next/link";
import ScrollReveal from "../components/scroll-reveal";

/* ---------- data ---------- */

const DEPARTMENTS = [
  {
    key: "naika",
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden>
        <path d="M12 21s-7-4.5-9-9a5 5 0 0 1 9-2 5 5 0 0 1 9 2c-2 4.5-9 9-9 9Z" />
      </svg>
    ),
    name: "内科",
    lead: "かぜ・発熱から、生活習慣病まで。",
    body: "発熱・咳・のどの痛み・腹痛といった日常のご不調から、健診で指摘された数値のご相談まで、まずは何でもお聞かせください。専門的な治療が必要な場合は、適切な医療機関へおつなぎします。",
    symptoms: ["発熱・かぜ", "腹痛・下痢", "疲れ・だるさ", "健診の再検査"],
  },
  {
    key: "shonika",
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden>
        <circle cx="12" cy="7" r="3.2" />
        <path d="M5.5 20c0-3.6 2.9-6 6.5-6s6.5 2.4 6.5 6" />
      </svg>
    ),
    name: "小児科",
    lead: "お子さまの、はじめの相談先に。",
    body: "乳幼児の発熱・鼻水・湿疹から、予防接種・乳児健診まで対応します。キッズスペースと個別の待合をご用意し、感染症の疑いがあるお子さまは動線を分けてお待ちいただけます。",
    symptoms: ["こどもの発熱", "予防接種", "乳児健診", "湿疹・アレルギー"],
  },
  {
    key: "junkanki",
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden>
        <path d="M3 12h4l2 5 3-10 2 5h4" />
      </svg>
    ),
    name: "循環器内科",
    lead: "動悸・息切れ・血圧のご相談。",
    body: "高血圧・不整脈・動悸・むくみなど、心臓と血管に関わるご不調を診療します。心電図・血圧脈波検査を院内で行い、必要に応じて連携病院での精密検査をご案内します。",
    symptoms: ["高血圧", "動悸・不整脈", "息切れ", "むくみ"],
  },
  {
    key: "shokaki",
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden>
        <path d="M14 3c0 3-4 3-4 7 0 5 5 4 5 8a3 3 0 0 1-6 0" />
      </svg>
    ),
    name: "消化器内科",
    lead: "胃腸の不調を、根本から。",
    body: "胃もたれ・胸やけ・便通の乱れなど、消化器のお悩みに対応します。腹部エコー検査を院内で実施。胃・大腸カメラが必要な場合は、検査に対応した連携施設へスムーズにご紹介します。",
    symptoms: ["胃もたれ・胸やけ", "便秘・下痢", "腹部エコー", "ピロリ菌"],
  },
  {
    key: "seikatsu",
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden>
        <path d="M4 14a8 8 0 0 1 16 0" />
        <path d="M12 14l4-3" />
        <circle cx="12" cy="14" r="1.4" />
      </svg>
    ),
    name: "生活習慣病外来",
    lead: "続けられる治療を、一緒に。",
    body: "糖尿病・脂質異常症・高血圧・高尿酸血症などを継続的に管理します。血液検査・HbA1cを院内で測定し、その日のうちに結果をご説明。お薬とあわせて、食事・運動のご相談も承ります。",
    symptoms: ["糖尿病", "コレステロール", "尿酸・痛風", "食事相談"],
  },
  {
    key: "yobou",
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden>
        <path d="M14 3l7 7-9 9-4 1 1-4 9-9" />
        <path d="M8 16l-3 3" />
      </svg>
    ),
    name: "予防接種・健診・発熱外来",
    lead: "防ぐこと、早く気づくこと。",
    body: "各種予防接種、特定健診・企業健診に対応します。発熱・感染症が疑われる方は、一般の患者さまと入口・待合を分けた発熱外来でお待ちいただけます。ご来院前にお電話ください。",
    symptoms: ["インフル予防接種", "特定健診", "企業健診", "発熱外来"],
  },
];

/* 診療時間表: ◯ 診療 / △ 午前のみ等 / × 休診 */
const DAYS = ["月", "火", "水", "木", "金", "土", "日・祝"];
const HOURS_AM = ["◯", "◯", "◯", "◯", "◯", "◯", "×"];
const HOURS_PM = ["◯", "◯", "◯", "×", "◯", "×", "×"];

const STEPS = [
  {
    no: "01",
    title: "受付",
    body: "保険証（お持ちの方は各種医療証・お薬手帳）をご提示ください。WEB順番受付をご利用の方は受付にお名前をお伝えください。",
  },
  {
    no: "02",
    title: "問診",
    body: "気になる症状やこれまでの経過を問診票にご記入いただきます。ご記入が難しい場合はスタッフがお手伝いします。",
  },
  {
    no: "03",
    title: "診察",
    body: "医師が診察します。検査が必要な場合は、血液検査・心電図・エコーなどを院内で行います。",
  },
  {
    no: "04",
    title: "お会計",
    body: "自動精算機で現金・クレジット・交通系IC・QR決済がご利用いただけます。領収書と明細をお渡しします。",
  },
  {
    no: "05",
    title: "お薬",
    body: "院外処方せんをお渡しします。近隣の調剤薬局のご案内もいたしますので、お気軽にお尋ねください。",
  },
];

const BRING = [
  ["健康保険証", "毎月1回、月はじめの受診時に必ずご提示ください。"],
  ["各種医療証", "こども・ひとり親・障害者医療証などをお持ちの方。"],
  ["お薬手帳", "現在服用中のお薬がわかるもの。"],
  ["紹介状", "他院からの紹介状・健診結果があればお持ちください。"],
];

const ACCESS = [
  ["ご住所", "〒000-0000　東京都みなと区水谷 3-12-5　みなもメディカルビル 2F"],
  ["電車", "みなも線「水谷駅」南口より徒歩 3 分／東西線「水谷町駅」4 番出口より徒歩 6 分"],
  ["バス", "都営バス「水谷二丁目」停留所より徒歩 1 分"],
  ["お車", "提携コインパーキング（ビル隣接・5 台）をご利用ください。受付にて割引券をお渡しします。"],
  ["バリアフリー", "建物入口〜院内は段差なし。エレベーター・車椅子対応・多目的トイレを完備しています。"],
];

const FAQ = [
  {
    q: "予約は必要ですか？",
    a: "予約がなくても受診いただけます。待ち時間を短くしたい方は、WEB順番受付が便利です。発熱・感染症が疑われる方は、動線確保のため必ず事前にお電話ください。",
  },
  {
    q: "何科にかかればよいか分かりません。",
    a: "まずは内科にご相談ください。症状をお聞きしたうえで、当院の適切な外来、または専門の医療機関へご案内します。迷ったときの入口として気軽にお使いください。",
  },
  {
    q: "支払いにキャッシュレスは使えますか？",
    a: "現金のほか、クレジットカード・交通系IC・QRコード決済（各種）に対応しています。自動精算機でスムーズにお会計いただけます。",
  },
  {
    q: "子どもと一緒に受診できますか？",
    a: "キッズスペースを備え、ベビーカーのまま院内へお入りいただけます。おむつ替え台のある多目的トイレもございます。ご家族一緒に安心してご来院ください。",
  },
];

/* ---------- page ---------- */

export default function Clinic() {
  return (
    <main className="cl">
      <ScrollReveal />
      <Link className="back-home" href="/">
        ← PORTFOLIO
      </Link>

      <nav className="cl-nav">
        <Link href="/clinic" className="cl-logo">
          <span className="cl-mark" aria-hidden>
            <i />
          </span>
          <span className="cl-logo-text">
            <b>みなも内科・小児科クリニック</b>
            <small>MINAMO CLINIC</small>
          </span>
        </Link>
        <div className="cl-links">
          <a href="#departments">診療案内</a>
          <a href="#hours">診療時間</a>
          <a href="#first">初めての方</a>
          <a href="#access">アクセス</a>
          <a className="cl-nav-tel" href="tel:0300000000">
            <i aria-hidden>☎</i>
            <span>
              <small>ご予約・お問い合わせ</small>
              <b>03-0000-0000</b>
            </span>
          </a>
        </div>
      </nav>

      {/* ---------- hero ---------- */}
      <section className="cl-hero">
        <div className="cl-hero-wash" aria-hidden>
          <span className="cl-blob a" />
          <span className="cl-blob b" />
        </div>

        <div className="cl-hero-copy">
          <span className="cl-kicker">水谷駅 南口 徒歩3分 — 地域のかかりつけ医</span>
          <h1>
            おだやかに、
            <br />
            <span className="accent">よくなっていく。</span>
          </h1>
          <p>
            発熱やかぜから、生活習慣病の管理、お子さまの予防接種まで。
            <br />
            「まずどこに相談すればいい？」に、いちばん近くでお応えします。
          </p>
          <div className="cl-hero-ctas">
            <a className="cl-btn" href="#hours">
              WEBで順番受付
            </a>
            <a className="cl-btn ghost" href="tel:0300000000">
              ☎ 03-0000-0000
            </a>
          </div>
          <ul className="cl-hero-facts">
            <li>
              <b>WEB順番受付</b>
              待ち時間を短く
            </li>
            <li>
              <b>キャッシュレス対応</b>
              各種カード・QR・IC
            </li>
            <li>
              <b>バリアフリー</b>
              車椅子・ベビーカー可
            </li>
          </ul>
        </div>

        <aside className="cl-today" data-reveal aria-label="本日の診療のご案内">
          <div className="cl-today-head">
            <span className="cl-today-dot" aria-hidden />
            本日の診療
          </div>
          <dl className="cl-today-hours">
            <div>
              <dt>午前</dt>
              <dd>
                9:00 – 12:30
                <small>受付 8:45 – 12:00</small>
              </dd>
            </div>
            <div>
              <dt>午後</dt>
              <dd>
                15:00 – 18:30
                <small>受付 14:45 – 18:00</small>
              </dd>
            </div>
          </dl>
          <p className="cl-today-note">
            土曜は午前のみ（9:00 – 13:00）。
            <br />
            <b>休診：木曜午後・日曜・祝日</b>
          </p>
          <a className="cl-today-tel" href="tel:0300000000">
            ☎ 03-0000-0000 に電話する
          </a>
        </aside>
      </section>

      {/* ---------- departments ---------- */}
      <section className="cl-dept" id="departments">
        <header className="cl-head" data-reveal>
          <span className="cl-label">MEDICAL CARE — 診療案内</span>
          <h2>外来ごとのご案内</h2>
          <p>
            どの外来にかかればよいか迷ったら、まずは内科へ。症状をお聞きし、最適な診療へご案内します。
          </p>
        </header>

        <div className="cl-dept-grid">
          {DEPARTMENTS.map((d, i) => (
            <article
              className="cl-dept-card"
              key={d.key}
              data-reveal
              style={{ "--reveal-delay": `${i * 0.06}s` } as React.CSSProperties}
            >
              <span className="cl-dept-icon" aria-hidden>
                {d.icon}
              </span>
              <h3>{d.name}</h3>
              <p className="cl-dept-lead">{d.lead}</p>
              <p className="cl-dept-body">{d.body}</p>
              <ul className="cl-dept-tags">
                {d.symptoms.map((s) => (
                  <li key={s}>{s}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      {/* ---------- hours ---------- */}
      <section className="cl-hours" id="hours">
        <header className="cl-head" data-reveal>
          <span className="cl-label">CONSULTATION HOURS — 診療時間</span>
          <h2>診療時間</h2>
          <p>初診の受付は、各診療時間の終了 30 分前までにお願いいたします。</p>
        </header>

        <div className="cl-hours-card" data-reveal>
          <div className="cl-hours-scroll">
            <table className="cl-hours-table">
              <thead>
                <tr>
                  <th scope="col">
                    <span className="cl-sr">診療時間</span>
                  </th>
                  {DAYS.map((day) => (
                    <th scope="col" key={day} className={day === "日・祝" ? "is-off" : ""}>
                      {day}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th scope="row">
                    午前
                    <small>9:00 – 12:30</small>
                  </th>
                  {HOURS_AM.map((mark, i) => (
                    <td key={i} className={mark === "×" ? "is-off" : "is-open"}>
                      {mark}
                    </td>
                  ))}
                </tr>
                <tr>
                  <th scope="row">
                    午後
                    <small>15:00 – 18:30</small>
                  </th>
                  {HOURS_PM.map((mark, i) => (
                    <td key={i} className={mark === "×" ? "is-off" : "is-open"}>
                      {mark}
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>

          <div className="cl-hours-legend">
            <span>
              <i className="is-open">◯</i> 診療
            </span>
            <span>
              <i className="is-off">×</i> 休診
            </span>
            <span className="cl-hours-strong">休診日：木曜午後・日曜・祝日／土曜は午前のみ（9:00 – 13:00）</span>
          </div>
        </div>

        <div className="cl-hours-notes" data-reveal>
          <div className="cl-note-card">
            <b>WEB順番受付</b>
            <p>
              スマートフォンから順番をお取りいただけます。順番が近づくとお知らせが届くので、待合の混雑を避けて来院できます。
            </p>
          </div>
          <div className="cl-note-card">
            <b>発熱・感染症の方へ</b>
            <p>
              発熱・咳など感染症が疑われる場合は、待合を分けてご案内します。ご来院前に必ずお電話ください。
            </p>
          </div>
          <div className="cl-note-card">
            <b>臨時休診</b>
            <p>
              学会・研修等で臨時休診となる場合があります。最新の診療状況はお電話またはWEB受付ページでご確認ください。
            </p>
          </div>
        </div>
      </section>

      {/* ---------- first visit ---------- */}
      <section className="cl-first" id="first">
        <header className="cl-head" data-reveal>
          <span className="cl-label">FIRST VISIT — 初めての方へ</span>
          <h2>はじめての受診の流れ</h2>
          <p>予約がなくても受診いただけます。受付から会計まで、迷わないようご案内します。</p>
        </header>

        <ol className="cl-steps" data-reveal>
          {STEPS.map((s) => (
            <li key={s.no}>
              <span className="cl-step-no">{s.no}</span>
              <div>
                <b>{s.title}</b>
                <p>{s.body}</p>
              </div>
            </li>
          ))}
        </ol>

        <div className="cl-bring" data-reveal>
          <h3>受診時にお持ちいただくもの</h3>
          <dl className="cl-bring-list">
            {BRING.map(([term, desc]) => (
              <div key={term}>
                <dt>{term}</dt>
                <dd>{desc}</dd>
              </div>
            ))}
          </dl>
          <p className="cl-bring-note">
            マイナ保険証にも対応しています。健康保険証は月はじめの受診時に必ずご提示ください。
          </p>
        </div>
      </section>

      {/* ---------- access ---------- */}
      <section className="cl-access" id="access">
        <header className="cl-head" data-reveal>
          <span className="cl-label">ACCESS — アクセス</span>
          <h2>アクセス</h2>
          <p>水谷駅からの道のりは平坦で、車椅子・ベビーカーでも安心してお越しいただけます。</p>
        </header>

        <div className="cl-access-grid">
          <dl className="cl-access-table" data-reveal>
            {ACCESS.map(([term, desc]) => (
              <div key={term}>
                <dt>{term}</dt>
                <dd>{desc}</dd>
              </div>
            ))}
          </dl>

          <div className="cl-map" data-reveal style={{ "--reveal-delay": "0.1s" } as React.CSSProperties}>
            <div className="cl-map-art" aria-hidden>
              <span className="cl-road v" />
              <span className="cl-road h" />
              <span className="cl-rail" />
              <span className="cl-map-station">水谷駅</span>
              <span className="cl-map-pin">
                <i />
                当院
              </span>
            </div>
            <p>
              水谷駅 南口を出て、駅前通りを西へ徒歩 3 分。
              <br />
              1 階が「みなも薬局」のビル、2 階が当院です。
            </p>
          </div>
        </div>
      </section>

      {/* ---------- faq ---------- */}
      <section className="cl-faq">
        <header className="cl-head" data-reveal>
          <span className="cl-label">FAQ — よくあるご質問</span>
          <h2>ご来院の前に</h2>
        </header>

        <div className="cl-faq-list" data-reveal>
          {FAQ.map((item) => (
            <details className="cl-faq-item" key={item.q}>
              <summary>
                <span>{item.q}</span>
                <i aria-hidden>+</i>
              </summary>
              <p>{item.a}</p>
            </details>
          ))}
        </div>
      </section>

      {/* ---------- closing ---------- */}
      <section className="cl-cta">
        <div className="cl-cta-inner" data-reveal>
          <span className="cl-label">お気軽にご相談ください</span>
          <h2>
            気になることがあれば、
            <br />
            まずはお電話ください。
          </h2>
          <div className="cl-cta-btns">
            <a className="cl-btn big" href="tel:0300000000">
              ☎ 03-0000-0000
            </a>
            <a className="cl-btn ghost big" href="#hours">
              WEBで順番受付
            </a>
          </div>
          <p className="cl-cta-hours">診療 9:00–12:30 / 15:00–18:30　休診：木曜午後・日曜・祝日</p>
        </div>
      </section>

      <footer className="cl-footer">
        <div className="cl-footer-brand">
          <span className="cl-mark" aria-hidden>
            <i />
          </span>
          <div>
            <b>みなも内科・小児科クリニック</b>
            <small>〒000-0000　東京都みなと区水谷 3-12-5　みなもメディカルビル 2F</small>
          </div>
        </div>
        <span className="cl-footer-note">TEL 03-0000-0000 · 内科／小児科／循環器／消化器 · MOCK PROJECT © 2026</span>
      </footer>
    </main>
  );
}
