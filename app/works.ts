/**
 * The one source of truth for the portfolio index.
 *
 * `preview` points at a real screenshot of the live case-study page (captured at
 * a 1440x900 viewport). Pages that are normal scrolling documents get a tall
 * capture and set `tall: true`, which lets the card pan down the page on hover.
 * `null / protocol` is a scroll-driven experience whose sections live inside a
 * sticky stage, so it gets a single viewport-sized shot instead.
 */
export type WorkCategory = "ec" | "recruit" | "corporate" | "sports" | "food" | "medical";

export type Work = {
  slug: string;
  href: string;
  no: string;
  year: string;
  category: WorkCategory;
  sector: string;
  title: string;
  reading: string;
  summary: string;
  tags: string[];
  domain: string;
  accent: string;
  tall: boolean;
};

export const categories: { key: WorkCategory | "all"; label: string }[] = [
  { key: "all", label: "すべて" },
  { key: "ec", label: "EC・物販" },
  { key: "recruit", label: "採用・求人" },
  { key: "food", label: "飲食店" },
  { key: "sports", label: "スポーツ" },
  { key: "medical", label: "医療" },
  { key: "corporate", label: "コーポレート" },
];

export const works: Work[] = [
  {
    slug: "goods",
    href: "/goods",
    no: "01",
    year: "2026",
    category: "ec",
    sector: "E-COMMERCE / REUSE",
    title: "OTAKARA LOOP",
    reading: "オタカラループ",
    summary:
      "コレクターズグッズの買取・販売プラットフォーム。「売る」と「買う」が同じ棚の上でつながるよう、商品一覧からカート、買取申込までを一本の導線に整理しました。",
    tags: ["商品一覧UI", "カート導線", "買取フロー"],
    domain: "otakara-loop.jp",
    accent: "#ff5b3c",
    tall: true,
  },
  {
    slug: "jobs",
    href: "/jobs",
    no: "02",
    year: "2026",
    category: "recruit",
    sector: "RECRUITING SITE",
    title: "ヒラク建設",
    reading: "HIRAKU CONSTRUCTION",
    summary:
      "創業78年の建設会社の新卒・中途採用サイト。数字と社員の言葉を前に出し、「働く実感」から逆算してエントリーまでの距離を短く設計しています。",
    tags: ["採用ブランディング", "社員紹介", "エントリー導線"],
    domain: "recruit.hiraku-kensetsu.co.jp",
    accent: "#f5c518",
    tall: true,
  },
  {
    slug: "tech",
    href: "/tech",
    no: "03",
    year: "2026",
    category: "corporate",
    sector: "WEB3 / CORPORATE",
    title: "NULL / PROTOCOL",
    reading: "ヌル・プロトコル",
    summary:
      "ブロックチェーンスタジオのコーポレートサイト。Canvasのパーティクル、横スクロールのサービス紹介など、スクロールそのものを体験に変える構成を試した一本です。",
    tags: ["スクロール演出", "Canvas描画", "横スクロールUI"],
    domain: "null-protocol.io",
    accent: "#a684ff",
    tall: false,
  },
  {
    slug: "sports",
    href: "/sports",
    no: "04",
    year: "2026",
    category: "sports",
    sector: "SPORTS CLUB",
    title: "AXIS SPORTS CLUB",
    reading: "アクシス スポーツクラブ",
    summary:
      "ジム・スタジオ・プール・テニスを備えた総合スポーツクラブの公式サイト。プログラム検索から料金プランの比較、1日体験の申込までを迷わずたどれる導線にしました。",
    tags: ["プログラム検索", "料金プラン比較", "体験予約"],
    domain: "axis-sportsclub.jp",
    accent: "#b8e534",
    tall: true,
  },
  {
    slug: "baseball",
    href: "/baseball",
    no: "05",
    year: "2026",
    category: "sports",
    sector: "SPORTS TEAM",
    title: "汐風ボーイズ",
    reading: "SHIOKAZE BOYS",
    summary:
      "創部28年の少年野球チームの公式サイト。夏の炎天下を駆け抜けるような熱量を色と文字に持たせつつ、保護者が知りたい日程・費用・入部手順はきちんと届く構成に。",
    tags: ["チームブランディング", "試合日程", "入部案内"],
    domain: "shiokaze-boys.jp",
    accent: "#ee4b3a",
    tall: true,
  },
  {
    slug: "ramen",
    href: "/ramen",
    no: "06",
    year: "2026",
    category: "food",
    sector: "RESTAURANT / RAMEN",
    title: "らーめん 灯火",
    reading: "TOMOSHIBI",
    summary:
      "屋台から始まった町のらーめん店。湯気のシズル感と店主のこだわりが伝わるよう、写真を大きく、文字を静かに置いた和モダンの一枚ものです。",
    tags: ["メニュー設計", "店舗情報", "SNS導線"],
    domain: "ramen-tomoshibi.jp",
    accent: "#ef7a3a",
    tall: true,
  },
  {
    slug: "transport",
    href: "/transport",
    no: "07",
    year: "2026",
    category: "recruit",
    sector: "LOGISTICS / RECRUIT",
    title: "STRADA EXPRESS",
    reading: "ストラーダ エクスプレス",
    summary:
      "運送会社のドライバー採用サイト。「いくら稼げるのか」に最短で答える収入シミュレーターを軸に、20〜40代へ向けた疾走感のある画面設計にしています。",
    tags: ["収入シミュレーター", "応募フロー", "職種紹介"],
    domain: "strada-express.co.jp",
    accent: "#22e0b4",
    tall: true,
  },
  {
    slug: "yakitori",
    href: "/yakitori",
    no: "08",
    year: "2026",
    category: "food",
    sector: "RESTAURANT / YAKITORI",
    title: "炭火焼鳥 炙",
    reading: "SUMIBI YAKITORI ABURI",
    summary:
      "提灯横丁のカウンター10席の焼鳥店。漆黒に炭火の朱が灯る画面で、煙の気配や店主の手つきまで伝わる大人の和デザインを目指しました。",
    tags: ["お品書き", "予約導線", "店主インタビュー"],
    domain: "yakitori-aburi.jp",
    accent: "#e5432c",
    tall: true,
  },
  {
    slug: "clinic",
    href: "/clinic",
    no: "09",
    year: "2026",
    category: "medical",
    sector: "MEDICAL / CLINIC",
    title: "みなも内科・小児科クリニック",
    reading: "MINAMO CLINIC",
    summary:
      "地域のかかりつけ医院の公式サイト。白基調の穏やかな設計で、診療時間・外来案内・初診の流れ・アクセスまで、これ一枚で迷わず来院できる導線にまとめています。",
    tags: ["診療案内", "診療時間UI", "アクセス"],
    domain: "minamo-clinic.jp",
    accent: "#2f8fd6",
    tall: true,
  },
];
