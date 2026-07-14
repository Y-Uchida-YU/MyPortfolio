"use client";

import Link from "next/link";
import { useEffect, useMemo, useState, useSyncExternalStore } from "react";
import {
  addToCart,
  getServerSnapshot,
  getSnapshot,
  placeOrder,
  replaceCart,
  setQty,
  subscribe,
  type Order,
} from "./store";

type Product = {
  id: string;
  emoji: string;
  name: string;
  series: string;
  price: number;
  badge: "NEW" | "RARE" | "SALE" | "";
  condition: string;
  stock: number;
};

const SHIPPING = 600;
const FREE_SHIPPING_OVER = 15000;

const PRODUCTS: Product[] = [
  { id: "gx01", emoji: "🤖", name: "超合金ロボ GX-01", series: "機動戦記アルヴァ", price: 12800, badge: "RARE", condition: "美品・箱付き", stock: 2 },
  { id: "card", emoji: "🎴", name: "限定トレーディングカード", series: "TCG レジェンド", price: 4200, badge: "NEW", condition: "未開封", stock: 12 },
  { id: "plush", emoji: "🧸", name: "復刻ぬいぐるみ 1998", series: "ぽけっとフレンズ", price: 8900, badge: "", condition: "タグ付き", stock: 5 },
  { id: "game", emoji: "🎮", name: "レトロゲームソフト", series: "スペースクエスト", price: 6480, badge: "SALE", condition: "動作確認済み", stock: 8 },
  { id: "figure", emoji: "🗿", name: "1/7スケールフィギュア", series: "夜明けのセレナーデ", price: 23800, badge: "RARE", condition: "新品未開封", stock: 1 },
  { id: "comic", emoji: "📚", name: "初版コミック全巻セット", series: "鋼の詩人", price: 15600, badge: "", condition: "帯付き", stock: 3 },
  { id: "disc", emoji: "💿", name: "サントラ LP レコード", series: "アルヴァ OST", price: 5400, badge: "NEW", condition: "美品", stock: 7 },
  { id: "badge", emoji: "🎖️", name: "缶バッジコンプセット", series: "きらめきカフェ", price: 3200, badge: "SALE", condition: "全12種", stock: 15 },
];

const CATEGORIES = [
  ["🤖", "フィギュア"],
  ["🃏", "カード"],
  ["📚", "コミック"],
  ["🎮", "ゲーム"],
  ["🧸", "ぬいぐるみ"],
  ["💿", "CD・映像"],
];

const yen = (value: number) => `¥${value.toLocaleString("ja-JP")}`;

const findProduct = (id: string) => PRODUCTS.find((product) => product.id === id);

export default function Goods() {
  const { cart, orders } = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const [cartOpen, setCartOpen] = useState(false);
  const [view, setView] = useState<"shop" | "history">("shop");
  const [checkout, setCheckout] = useState<"idle" | "form" | "done">("idle");
  const [lastOrder, setLastOrder] = useState<Order | null>(null);
  const [toast, setToast] = useState("");

  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(() => setToast(""), 2200);
    return () => clearTimeout(timer);
  }, [toast]);

  // The drawer and the modal both take over the screen, so freeze the page behind them.
  useEffect(() => {
    const locked = cartOpen || checkout !== "idle";
    document.body.style.overflow = locked ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [cartOpen, checkout]);

  const lines = useMemo(
    () =>
      cart.flatMap((line) => {
        const product = findProduct(line.id);
        return product ? [{ ...product, qty: line.qty }] : [];
      }),
    [cart],
  );

  const count = cart.reduce((sum, line) => sum + line.qty, 0);
  const subtotal = lines.reduce((sum, line) => sum + line.price * line.qty, 0);
  const shipping = subtotal === 0 || subtotal >= FREE_SHIPPING_OVER ? 0 : SHIPPING;
  const total = subtotal + shipping;

  const handleAdd = (product: Product) => {
    addToCart(product.id, product.stock);
    setToast(`${product.name} をカートに追加しました`);
  };

  const handleQty = (id: string, qty: number) => {
    setQty(id, qty, findProduct(id)?.stock ?? 99);
  };

  const handleCheckout = () => {
    const order = placeOrder(
      lines.map((line) => ({
        id: line.id,
        name: line.name,
        emoji: line.emoji,
        price: line.price,
        qty: line.qty,
      })),
      total,
    );
    setLastOrder(order);
    setCheckout("done");
  };

  const handleReorder = (order: Order) => {
    replaceCart(order.lines.map((line) => ({ id: line.id, qty: line.qty })));
    setView("shop");
    setCartOpen(true);
    setToast("以前のご注文をカートに戻しました");
  };

  return (
    <main className="goods">
      <Link className="back-home" href="/">
        ← PORTFOLIO
      </Link>

      <div className="g-top">査定料・送料・キャンセル料 すべて無料！ 最短当日査定</div>

      <nav className="g-nav">
        <button className="g-logo" onClick={() => setView("shop")}>
          OTAKARA LOOP
          <small>BUY · SELL · LOVE</small>
        </button>

        <div className="g-search">
          <span>🔍</span>作品名・キャラクター・JANコードで検索
        </div>

        <div className="g-navlinks">
          <button
            className={view === "history" ? "is-active" : ""}
            onClick={() => setView(view === "history" ? "shop" : "history")}
          >
            購入履歴
            {orders.length > 0 && <b>{orders.length}</b>}
          </button>

          <button className="g-cart-btn" onClick={() => setCartOpen(true)}>
            🛒 カート
            {count > 0 && <b>{count}</b>}
          </button>
        </div>
      </nav>

      {view === "shop" ? (
        <>
          <section className="g-hero">
            <div className="g-copy">
              <span className="g-badge">好きだったものが、誰かの宝物に。</span>
              <h1>
                推しをつなぐ。
                <br />
                <span>熱量をめぐらす。</span>
              </h1>
              <p>
                アニメ・コミック・ゲームのコレクターズグッズ専門店。
                <br />
                大切なコレクションを、価値のわかる人へつなぎます。
              </p>
              <div className="g-ctas">
                <a className="g-btn" href="#items">
                  商品を探す
                </a>
                <a className="g-btn alt" href="#sell">
                  かんたん買取
                </a>
              </div>
            </div>
            <div className="g-visual">
              <div className="toy-box">
                <div className="toy-face">
                  <i className="toy-mouth" />
                </div>
              </div>
            </div>
          </section>

          <section className="g-section">
            <div className="g-head">
              <h2>カテゴリーから探す</h2>
              <p>SHOP BY CATEGORY →</p>
            </div>
            <div className="category-grid">
              {CATEGORIES.map(([icon, label]) => (
                <div className="category" key={label}>
                  <b>{icon}</b>
                  {label}
                </div>
              ))}
            </div>
          </section>

          <section className="g-section" id="items">
            <div className="g-head">
              <h2>スタッフ注目アイテム</h2>
              <p>
                {subtotal > 0 && subtotal < FREE_SHIPPING_OVER
                  ? `あと ${yen(FREE_SHIPPING_OVER - subtotal)} で送料無料`
                  : `${yen(FREE_SHIPPING_OVER)}以上のご購入で送料無料`}
              </p>
            </div>

            <div className="product-grid">
              {PRODUCTS.map((product) => {
                const inCart = cart.find((line) => line.id === product.id)?.qty ?? 0;
                const soldOut = inCart >= product.stock;

                return (
                  <article className="product" key={product.id}>
                    <div className="product-img">
                      {product.badge && (
                        <span className={`product-badge ${product.badge.toLowerCase()}`}>
                          {product.badge}
                        </span>
                      )}
                      <span className="product-emoji">{product.emoji}</span>
                      <span className="product-stock">残り{product.stock - inCart}点</span>
                    </div>

                    <div className="product-info">
                      <small className="product-series">{product.series}</small>
                      <h3>{product.name}</h3>
                      <span className="product-condition">{product.condition}</span>
                      <div className="product-buy">
                        <strong>
                          {yen(product.price)}
                          <small>税込</small>
                        </strong>
                        <button
                          className="add-btn"
                          disabled={soldOut}
                          onClick={() => handleAdd(product)}
                        >
                          {soldOut
                            ? "在庫なし"
                            : inCart > 0
                              ? `カートに追加 (${inCart})`
                              : "カートに入れる"}
                        </button>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          </section>

          <section className="g-buy" id="sell">
            <div>
              <span className="g-badge">箱につめて送るだけ</span>
              <h2>
                眠っている
                <br />
                “好き”を査定。
              </h2>
            </div>
            <div className="steps">
              <div>
                <b>01</b>WEBから無料で申し込み
              </div>
              <div>
                <b>02</b>売りたいグッズを梱包・発送
              </div>
              <div>
                <b>03</b>査定結果を確認して入金
              </div>
            </div>
          </section>
        </>
      ) : (
        <section className="g-history">
          <div className="g-head">
            <h2>購入履歴</h2>
            <p>ORDER HISTORY — {orders.length}件</p>
          </div>

          {orders.length === 0 ? (
            <div className="g-empty">
              <span>📦</span>
              <p>まだ購入履歴がありません。</p>
              <button className="g-btn" onClick={() => setView("shop")}>
                商品を見る
              </button>
            </div>
          ) : (
            <div className="order-list">
              {orders.map((order) => (
                <article className="order" key={order.id}>
                  <header>
                    <div>
                      <span className="order-id">注文番号 {order.id}</span>
                      <span className="order-date">{order.placedAt}</span>
                    </div>
                    <span className="order-status" data-status={order.status}>
                      {order.status}
                    </span>
                  </header>

                  <div className="order-lines">
                    {order.lines.map((line) => (
                      <div className="order-line" key={line.id}>
                        <span className="order-thumb">{line.emoji}</span>
                        <div>
                          <b>{line.name}</b>
                          <small>
                            {yen(line.price)} × {line.qty}点
                          </small>
                        </div>
                        <span className="order-line-total">{yen(line.price * line.qty)}</span>
                      </div>
                    ))}
                  </div>

                  <footer>
                    <span>
                      合計 <strong>{yen(order.total)}</strong>
                    </span>
                    <button onClick={() => handleReorder(order)}>同じ内容で再注文</button>
                  </footer>
                </article>
              ))}
            </div>
          )}
        </section>
      )}

      <footer className="g-footer">
        <span>OTAKARA LOOP</span>
        <span>MOCK PROJECT © 2026</span>
      </footer>

      {/* ---------- cart drawer ---------- */}
      <div
        className={`g-overlay ${cartOpen ? "is-open" : ""}`}
        onClick={() => setCartOpen(false)}
      />

      <aside className={`g-cart ${cartOpen ? "is-open" : ""}`} aria-hidden={!cartOpen}>
        <header className="g-cart-head">
          <h2>カート {count > 0 && <b>{count}点</b>}</h2>
          <button onClick={() => setCartOpen(false)} aria-label="カートを閉じる">
            ✕
          </button>
        </header>

        {lines.length === 0 ? (
          <div className="g-empty">
            <span>🛒</span>
            <p>カートは空です。</p>
            <button className="g-btn" onClick={() => setCartOpen(false)}>
              買い物を続ける
            </button>
          </div>
        ) : (
          <>
            <div className="g-cart-lines">
              {lines.map((line) => (
                <div className="g-cart-line" key={line.id}>
                  <span className="g-cart-thumb">{line.emoji}</span>

                  <div className="g-cart-meta">
                    <b>{line.name}</b>
                    <small>{line.condition}</small>
                    <div className="qty">
                      <button onClick={() => handleQty(line.id, line.qty - 1)} aria-label="減らす">
                        −
                      </button>
                      <span>{line.qty}</span>
                      <button
                        onClick={() => handleQty(line.id, line.qty + 1)}
                        disabled={line.qty >= line.stock}
                        aria-label="増やす"
                      >
                        ＋
                      </button>
                    </div>
                  </div>

                  <div className="g-cart-price">
                    <strong>{yen(line.price * line.qty)}</strong>
                    <button onClick={() => handleQty(line.id, 0)}>削除</button>
                  </div>
                </div>
              ))}
            </div>

            <footer className="g-cart-foot">
              <div className="g-sum">
                <span>小計</span>
                <b>{yen(subtotal)}</b>
              </div>
              <div className="g-sum">
                <span>送料</span>
                <b>{shipping === 0 ? "無料" : yen(shipping)}</b>
              </div>
              <div className="g-sum total">
                <span>合計（税込）</span>
                <b>{yen(total)}</b>
              </div>
              <button
                className="g-btn full"
                onClick={() => {
                  setCartOpen(false);
                  setCheckout("form");
                }}
              >
                レジに進む →
              </button>
            </footer>
          </>
        )}
      </aside>

      {/* ---------- checkout ---------- */}
      {checkout !== "idle" && (
        <div className="g-modal-wrap" role="dialog" aria-modal="true">
          <div className="g-modal">
            {checkout === "form" ? (
              <>
                <span className="g-modal-step">STEP 2 / 3 — お届け先の確認</span>
                <h2>ご注文内容の確認</h2>

                <div className="g-form">
                  <label>
                    お名前<input defaultValue="内田 悠太" />
                  </label>
                  <label>
                    お届け先<input defaultValue="東京都渋谷区 1-2-3 ループマンション 402" />
                  </label>
                  <label>
                    お支払い方法
                    <select defaultValue="card">
                      <option value="card">クレジットカード（•••• 4242）</option>
                      <option value="cod">代金引換</option>
                      <option value="conv">コンビニ払い</option>
                    </select>
                  </label>
                </div>

                <div className="g-modal-total">
                  <span>お支払い金額</span>
                  <strong>{yen(total)}</strong>
                </div>

                <p className="g-note">※ ポートフォリオ用のモックです。決済は実行されません。</p>

                <div className="g-modal-actions">
                  <button className="g-btn alt" onClick={() => setCheckout("idle")}>
                    戻る
                  </button>
                  <button className="g-btn" onClick={handleCheckout}>
                    注文を確定する
                  </button>
                </div>
              </>
            ) : (
              <div className="g-done">
                <span className="g-done-mark">✓</span>
                <h2>ご注文ありがとうございます！</h2>
                <p>
                  注文番号 <b>{lastOrder?.id}</b>
                  <br />
                  発送準備が整いしだいメールでお知らせします。
                </p>
                <div className="g-modal-actions">
                  <button
                    className="g-btn alt"
                    onClick={() => {
                      setCheckout("idle");
                      setView("history");
                    }}
                  >
                    購入履歴を見る
                  </button>
                  <button
                    className="g-btn"
                    onClick={() => {
                      setCheckout("idle");
                      setView("shop");
                    }}
                  >
                    買い物を続ける
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      <div className={`g-toast ${toast ? "is-open" : ""}`} role="status">
        {toast}
      </div>
    </main>
  );
}
