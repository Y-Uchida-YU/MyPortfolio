/**
 * Cart + order state for the OTAKARA LOOP mock, kept outside React so it can be
 * read through useSyncExternalStore. That gives us localStorage persistence
 * without a hydration mismatch: the server snapshot is always empty, and the
 * real state is read on the client only after hydration.
 */

export type CartLine = { id: string; qty: number };

export type OrderLine = {
  id: string;
  name: string;
  emoji: string;
  price: number;
  qty: number;
};

export type Order = {
  id: string;
  placedAt: string;
  lines: OrderLine[];
  total: number;
  status: "準備中" | "配送中" | "お届け済み";
};

export type StoreState = {
  cart: CartLine[];
  orders: Order[];
};

const STORAGE_KEY = "otakara.store.v1";

/** One delivered order so the history view has something to show on a first visit. */
const SEED_ORDER: Order = {
  id: "OL-2026-0184",
  placedAt: "2026-06-28",
  lines: [
    { id: "plush", name: "復刻ぬいぐるみ 1998", emoji: "🧸", price: 8900, qty: 1 },
    { id: "badge", name: "缶バッジコンプセット", emoji: "🎖️", price: 3200, qty: 2 },
  ],
  total: 15300,
  status: "お届け済み",
};

const SERVER_STATE: StoreState = { cart: [], orders: [] };

let state: StoreState | null = null;
const listeners = new Set<() => void>();

function load(): StoreState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { cart: [], orders: [SEED_ORDER] };

    const parsed = JSON.parse(raw) as Partial<StoreState>;
    return {
      cart: Array.isArray(parsed.cart) ? parsed.cart : [],
      orders: Array.isArray(parsed.orders) ? parsed.orders : [SEED_ORDER],
    };
  } catch {
    return { cart: [], orders: [SEED_ORDER] };
  }
}

function commit(next: StoreState) {
  state = next;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  } catch {
    // Private browsing or a full quota — the mock still works in memory.
  }
  listeners.forEach((listener) => listener());
}

export function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

export function getSnapshot(): StoreState {
  state ??= load();
  return state;
}

export function getServerSnapshot(): StoreState {
  return SERVER_STATE;
}

export function addToCart(id: string, stock: number) {
  const current = getSnapshot();
  const existing = current.cart.find((line) => line.id === id);

  commit({
    ...current,
    cart: existing
      ? current.cart.map((line) =>
          line.id === id ? { ...line, qty: Math.min(line.qty + 1, stock) } : line,
        )
      : [...current.cart, { id, qty: 1 }],
  });
}

export function setQty(id: string, qty: number, stock: number) {
  const current = getSnapshot();
  const capped = Math.min(Math.max(qty, 0), stock);

  commit({
    ...current,
    cart:
      capped === 0
        ? current.cart.filter((line) => line.id !== id)
        : current.cart.map((line) => (line.id === id ? { ...line, qty: capped } : line)),
  });
}

export function replaceCart(cart: CartLine[]) {
  commit({ ...getSnapshot(), cart });
}

/** Records the order, empties the cart, and returns the order for the receipt. */
export function placeOrder(lines: OrderLine[], total: number): Order {
  const current = getSnapshot();

  const order: Order = {
    id: `OL-2026-${String(1000 + current.orders.length * 37).slice(-4)}`,
    placedAt: new Date().toISOString().slice(0, 10),
    lines,
    total,
    status: "準備中",
  };

  commit({ cart: [], orders: [order, ...current.orders] });
  return order;
}
