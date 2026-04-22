import { GlowButton } from "@/components/ui/GlowButton";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useMockData } from "@/hooks/useMockData";
import { cn } from "@/lib/utils";
import type { Lottery, POSSale } from "@/types";
import {
  LogOut,
  PrinterIcon,
  RefreshCw,
  ShoppingCart,
  Trash2,
  TrendingUp,
  Trophy,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

// ── Types ──────────────────────────────────────────────────────────────────────

interface CartItem {
  id: string;
  lottery: Lottery;
  numbers: number[];
  price: number;
}

// ── Mock sales history ─────────────────────────────────────────────────────────

const MOCK_SALES: (POSSale & { lotteryName: string })[] = [
  {
    id: "s-001",
    storeId: "store-001",
    ticketId: "t-001",
    amount: 5.0,
    currency: "USD",
    soldAt: "2026-04-22T15:30:00Z",
    customerRef: "C-001",
    lotteryName: "Clásico 6/45",
  },
  {
    id: "s-002",
    storeId: "store-001",
    ticketId: "t-002",
    amount: 5.0,
    currency: "USD",
    soldAt: "2026-04-22T14:10:00Z",
    customerRef: "C-002",
    lotteryName: "Clásico 6/45",
  },
  {
    id: "s-003",
    storeId: "store-001",
    ticketId: "t-003",
    amount: 1.0,
    currency: "USD",
    soldAt: "2026-04-22T13:45:00Z",
    customerRef: "C-003",
    lotteryName: "Sorteo Diario",
  },
  {
    id: "s-004",
    storeId: "store-001",
    ticketId: "t-004",
    amount: 15.0,
    currency: "USD",
    soldAt: "2026-04-22T12:00:00Z",
    customerRef: "C-004",
    lotteryName: "Rifa NFT",
  },
  {
    id: "s-005",
    storeId: "store-001",
    ticketId: "t-005",
    amount: 5.0,
    currency: "USD",
    soldAt: "2026-04-21T17:30:00Z",
    customerRef: "C-005",
    lotteryName: "Clásico 6/45",
  },
  {
    id: "s-006",
    storeId: "store-001",
    ticketId: "t-006",
    amount: 50.0,
    currency: "USD",
    soldAt: "2026-04-21T16:00:00Z",
    customerRef: "C-006",
    lotteryName: "Sin Pérdida",
  },
  {
    id: "s-007",
    storeId: "store-001",
    ticketId: "t-007",
    amount: 1.0,
    currency: "USD",
    soldAt: "2026-04-20T11:20:00Z",
    customerRef: "C-007",
    lotteryName: "Sorteo Diario",
  },
  {
    id: "s-008",
    storeId: "store-001",
    ticketId: "t-008",
    amount: 5.0,
    currency: "USD",
    soldAt: "2026-04-20T10:00:00Z",
    customerRef: "C-008",
    lotteryName: "Clásico 6/45",
  },
  {
    id: "s-009",
    storeId: "store-001",
    ticketId: "t-009",
    amount: 15.0,
    currency: "USD",
    soldAt: "2026-04-19T14:45:00Z",
    customerRef: "C-009",
    lotteryName: "Rifa NFT",
  },
  {
    id: "s-010",
    storeId: "store-001",
    ticketId: "t-010",
    amount: 5.0,
    currency: "USD",
    soldAt: "2026-04-18T09:15:00Z",
    customerRef: "C-010",
    lotteryName: "Clásico 6/45",
  },
];

// ── Helpers ────────────────────────────────────────────────────────────────────

function fmt(amount: number) {
  return `$${amount.toFixed(2)}`;
}

function fmtDate(iso: string) {
  return new Date(iso).toLocaleDateString("es-MX", {
    day: "2-digit",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function randomNumbers(count: number, max: number): number[] {
  const nums = new Set<number>();
  while (nums.size < count) nums.add(Math.floor(Math.random() * max) + 1);
  return Array.from(nums).sort((a, b) => a - b);
}

// ── Number Circle ──────────────────────────────────────────────────────────────

function NumberCircle({
  value,
  index,
  onChange,
}: {
  value: number | null;
  index: number;
  onChange: (idx: number, val: number | null) => void;
}) {
  const [editing, setEditing] = useState(false);
  const [input, setInput] = useState("");

  function commit(raw: string) {
    const n = Number.parseInt(raw);
    if (!Number.isNaN(n) && n >= 1 && n <= 45) onChange(index, n);
    setEditing(false);
  }

  return (
    <button
      type="button"
      aria-label={`Número ${index + 1}: ${value ?? "vacío"}`}
      onClick={() => {
        if (!editing) {
          setEditing(true);
          setInput("");
        }
      }}
      data-ocid={`pos.number_circle.${index + 1}`}
      className={cn(
        "relative w-14 h-14 rounded-full flex items-center justify-center cursor-pointer select-none",
        "border-2 transition-smooth text-lg font-mono font-bold",
        value !== null
          ? "border-primary bg-primary/10 text-primary glow-gold"
          : "border-border bg-muted/40 text-muted-foreground hover:border-primary/50",
      )}
    >
      {editing ? (
        <input
          ref={(el) => {
            if (el) el.focus();
          }}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === "Tab") commit(input);
            if (e.key === "Escape") setEditing(false);
          }}
          onBlur={() => commit(input)}
          className="w-10 text-center bg-transparent text-foreground font-mono text-sm focus:outline-none"
          maxLength={2}
          aria-label={`Número ${index + 1}`}
        />
      ) : (
        <span>{value ?? "—"}</span>
      )}
      {value !== null && (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onChange(index, null);
          }}
          className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-destructive/80 text-destructive-foreground text-xs flex items-center justify-center hover:bg-destructive"
          aria-label="Limpiar"
        >
          ×
        </button>
      )}
    </button>
  );
}

// ── Lottery Card ───────────────────────────────────────────────────────────────

function LotteryCard({
  lottery,
  selected,
  onSelect,
}: {
  lottery: Lottery;
  selected: boolean;
  onSelect: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onSelect}
      data-ocid={`pos.lottery_card.${lottery.id}`}
      className={cn(
        "w-full rounded-2xl p-4 text-left transition-smooth border-2 cursor-pointer flex flex-col gap-1.5",
        selected
          ? "border-primary bg-primary/10 glow-gold shadow-md"
          : "border-border bg-card hover:border-primary/40 hover:bg-muted/20",
      )}
    >
      <div className="flex items-center gap-2">
        <span className="text-2xl">{lottery.logoEmoji}</span>
        <div className="min-w-0">
          <p className="font-display font-semibold text-sm text-foreground truncate">
            {lottery.nameEs}
          </p>
          <p className="text-xs text-muted-foreground font-mono">
            {lottery.jackpotFormatted}
          </p>
        </div>
      </div>
      <div className="flex items-center justify-between">
        <span className="text-xs text-muted-foreground">
          {lottery.drawDateFormatted}
        </span>
        <Badge variant={selected ? "default" : "outline"} className="text-xs">
          {fmt(lottery.price)}
        </Badge>
      </div>
    </button>
  );
}

// ── Cart Row ───────────────────────────────────────────────────────────────────

function CartRow({
  item,
  index,
  onRemove,
}: { item: CartItem; index: number; onRemove: () => void }) {
  return (
    <div
      data-ocid={`pos.cart.item.${index + 1}`}
      className="flex items-center gap-3 py-3 border-b border-border/50 last:border-0"
    >
      <span className="text-xl">{item.lottery.logoEmoji}</span>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-foreground truncate">
          {item.lottery.nameEs}
        </p>
        <p className="text-xs font-mono text-muted-foreground">
          {item.numbers.join(" · ")}
        </p>
      </div>
      <span className="text-sm font-bold text-primary font-mono">
        {fmt(item.price)}
      </span>
      <button
        type="button"
        onClick={onRemove}
        data-ocid={`pos.cart.delete_button.${index + 1}`}
        aria-label="Eliminar"
        className="w-7 h-7 rounded-lg flex items-center justify-center text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-smooth"
      >
        <Trash2 className="w-3.5 h-3.5" />
      </button>
    </div>
  );
}

// ── Sell Tab ───────────────────────────────────────────────────────────────────

function SellTab({ lotteries }: { lotteries: Lottery[] }) {
  const [selectedLottery, setSelectedLottery] = useState<Lottery>(lotteries[0]);
  const [numbers, setNumbers] = useState<(number | null)[]>(
    Array(6).fill(null),
  );
  const [cart, setCart] = useState<CartItem[]>([]);
  const [selling, setSelling] = useState(false);
  const [confirmed, setConfirmed] = useState(false);

  const maxNums = selectedLottery.numbersToSelect;
  const activeNums = numbers.slice(0, maxNums);
  const filled = activeNums.filter((n) => n !== null).length;
  const canAdd = filled === maxNums;

  function handleNumberChange(idx: number, val: number | null) {
    setNumbers((prev) => {
      const next = [...prev];
      next[idx] = val;
      return next;
    });
  }

  function handleRandom() {
    const rand = randomNumbers(maxNums, selectedLottery.maxNumber);
    setNumbers([...rand, ...Array(6 - rand.length).fill(null)]);
  }

  function handleLotterySelect(lottery: Lottery) {
    setSelectedLottery(lottery);
    setNumbers(Array(6).fill(null));
  }

  function handleAddToCart() {
    const filledNums = numbers
      .slice(0, maxNums)
      .filter((n): n is number => n !== null);
    if (filledNums.length < maxNums) {
      toast.error("Completa todos los números");
      return;
    }
    setCart((prev) => [
      ...prev,
      {
        id: `cart-${Date.now()}`,
        lottery: selectedLottery,
        numbers: filledNums,
        price: selectedLottery.price,
      },
    ]);
    setNumbers(Array(6).fill(null));
    toast.success("Boleto agregado al carrito 🎟️");
  }

  async function handleSell() {
    if (cart.length === 0) {
      toast.error("El carrito está vacío");
      return;
    }
    setSelling(true);
    await new Promise((r) => setTimeout(r, 1200));
    setSelling(false);
    setCart([]);
    setNumbers(Array(6).fill(null));
    setConfirmed(true);
  }

  const subtotal = cart.reduce((s, i) => s + i.price, 0);
  const commission = subtotal * 0.05;

  if (confirmed) {
    return (
      <div
        className="flex flex-col items-center justify-center gap-6 py-16 text-center"
        data-ocid="pos.sale_confirmed.section"
      >
        <div className="w-20 h-20 rounded-full bg-secondary/20 flex items-center justify-center glow-green">
          <span className="text-4xl">✅</span>
        </div>
        <div>
          <h2 className="font-display text-3xl font-bold text-foreground">
            ¡Venta confirmada!
          </h2>
          <p className="text-muted-foreground mt-1 text-sm">
            Sale confirmed · Los boletos fueron emitidos exitosamente
          </p>
        </div>
        <div className="flex flex-wrap gap-3 justify-center">
          <GlowButton
            type="button"
            variant="outline"
            size="md"
            onClick={() => window.print()}
            data-ocid="pos.print_receipt_button"
          >
            <PrinterIcon className="w-4 h-4" />
            Imprimir voucher / Print receipt
          </GlowButton>
          <GlowButton
            type="button"
            variant="gold"
            size="md"
            onClick={() => setConfirmed(false)}
            data-ocid="pos.new_sale_button"
          >
            Nueva venta / New sale
          </GlowButton>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Left column */}
      <div className="flex flex-col gap-5">
        {/* Lottery selector */}
        <Card className="p-4 bg-card border-border">
          <h3 className="font-display text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
            Seleccionar lotería / Select lottery
          </h3>
          <div className="grid grid-cols-2 gap-3" data-ocid="pos.lottery_grid">
            {lotteries.map((l) => (
              <LotteryCard
                key={l.id}
                lottery={l}
                selected={selectedLottery.id === l.id}
                onSelect={() => handleLotterySelect(l)}
              />
            ))}
          </div>
        </Card>

        {/* Number entry */}
        <Card className="p-4 bg-card border-border">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-display text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                Números del cliente / Customer numbers
              </h3>
              <p className="text-xs text-muted-foreground mt-0.5">
                {filled}/{maxNums} del 1 al {selectedLottery.maxNumber}
              </p>
            </div>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={handleRandom}
              data-ocid="pos.random_button"
              className="gap-1.5 text-xs h-8"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              Aleatorio
            </Button>
          </div>

          <div
            className="flex flex-wrap gap-3 justify-center py-2"
            data-ocid="pos.numbers_section"
          >
            {(["n0", "n1", "n2", "n3", "n4", "n5"] as const)
              .slice(0, maxNums)
              .map((slotKey, idx) => (
                <NumberCircle
                  key={slotKey}
                  value={activeNums[idx] ?? null}
                  index={idx}
                  onChange={handleNumberChange}
                />
              ))}
          </div>

          <GlowButton
            type="button"
            variant={canAdd ? "green" : "ghost"}
            size="lg"
            onClick={handleAddToCart}
            disabled={!canAdd}
            className="w-full mt-4"
            data-ocid="pos.add_to_cart_button"
          >
            <ShoppingCart className="w-5 h-5" />+ Agregar / Add to cart
          </GlowButton>
        </Card>
      </div>

      {/* Right column: cart */}
      <div className="flex flex-col gap-4">
        <Card className="p-4 bg-card border-border flex-1">
          <div className="flex items-center gap-2 mb-3">
            <ShoppingCart className="w-4 h-4 text-muted-foreground" />
            <h3 className="font-display text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              Carrito / Cart
            </h3>
            {cart.length > 0 && (
              <Badge variant="secondary" className="ml-auto text-xs">
                {cart.length}
              </Badge>
            )}
          </div>

          {cart.length === 0 ? (
            <div
              className="flex flex-col items-center justify-center py-10 gap-2 text-center"
              data-ocid="pos.cart.empty_state"
            >
              <span className="text-3xl opacity-40">🎟️</span>
              <p className="text-sm text-muted-foreground">
                El carrito está vacío
                <br />
                <span className="text-xs">Cart is empty</span>
              </p>
            </div>
          ) : (
            <div data-ocid="pos.cart.list">
              {cart.map((item, idx) => (
                <CartRow
                  key={item.id}
                  item={item}
                  index={idx}
                  onRemove={() =>
                    setCart((prev) => prev.filter((_, i) => i !== idx))
                  }
                />
              ))}
            </div>
          )}

          {cart.length > 0 && (
            <div
              className="mt-4 pt-4 border-t border-border space-y-1.5"
              data-ocid="pos.cart.summary"
            >
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>Subtotal</span>
                <span className="font-mono">{fmt(subtotal)}</span>
              </div>
              <div className="flex justify-between text-sm font-medium text-secondary">
                <span>Comisión (5%) / Commission</span>
                <span className="font-mono">+{fmt(commission)}</span>
              </div>
              <div className="flex justify-between text-base font-bold text-foreground pt-1 border-t border-border/50">
                <span>Total</span>
                <span className="font-mono text-primary">{fmt(subtotal)}</span>
              </div>
            </div>
          )}
        </Card>

        <GlowButton
          type="button"
          variant="gold"
          size="xl"
          className="w-full"
          loading={selling}
          shimmer
          onClick={handleSell}
          disabled={cart.length === 0}
          data-ocid="pos.sell_button"
        >
          {!selling && "🎟️ "}
          Vender boletos / Sell tickets
        </GlowButton>
      </div>
    </div>
  );
}

// ── Commissions Tab ────────────────────────────────────────────────────────────

function CommissionsTab() {
  const [payoutOpen, setPayoutOpen] = useState(false);
  const [payoutDone, setPayoutDone] = useState(false);

  async function handlePayout() {
    await new Promise((r) => setTimeout(r, 900));
    setPayoutDone(true);
    setPayoutOpen(false);
    toast.success("Solicitud de liquidación enviada ✅");
  }

  const todaySales = MOCK_SALES.filter((s) =>
    s.soldAt.startsWith("2026-04-22"),
  );
  const todayTotal = todaySales.reduce((s, i) => s + i.amount, 0);
  const monthTotal = MOCK_SALES.reduce((s, i) => s + i.amount, 0);

  return (
    <div className="flex flex-col gap-6">
      {/* Stats */}
      <div
        className="grid grid-cols-1 sm:grid-cols-2 gap-4"
        data-ocid="pos.commissions.stats"
      >
        <Card className="p-5 bg-card border-border">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center">
              <TrendingUp className="w-4 h-4 text-primary" />
            </div>
            <p className="text-xs text-muted-foreground uppercase tracking-wide font-medium">
              Hoy / Today
            </p>
          </div>
          <p className="text-2xl font-display font-bold text-primary">
            {fmt(todayTotal * 0.05)}
          </p>
          <p className="text-sm text-muted-foreground mt-1">
            {todaySales.length} boletos · {fmt(todayTotal)} ·{" "}
            <span className="text-secondary font-medium">comisión</span>
          </p>
        </Card>

        <Card className="p-5 bg-card border-border">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-9 h-9 rounded-xl bg-secondary/10 flex items-center justify-center">
              <Trophy className="w-4 h-4 text-secondary" />
            </div>
            <p className="text-xs text-muted-foreground uppercase tracking-wide font-medium">
              Este mes / This month
            </p>
          </div>
          <p className="text-2xl font-display font-bold text-secondary">
            {fmt(monthTotal * 0.05)}
          </p>
          <p className="text-sm text-muted-foreground mt-1">
            {MOCK_SALES.length} boletos · {fmt(monthTotal)} total
          </p>
        </Card>
      </div>

      {/* Ranking badge */}
      <div
        className="flex items-center gap-3 px-4 py-3 rounded-2xl bg-primary/10 border border-primary/20"
        data-ocid="pos.ranking_badge"
      >
        <span className="text-2xl">🏆</span>
        <div>
          <p className="font-display font-semibold text-foreground text-sm">
            Tienda #12 en México
          </p>
          <p className="text-xs text-muted-foreground">
            Top 15% de vendedores este mes · Top seller this month
          </p>
        </div>
        <Badge variant="default" className="ml-auto shrink-0">
          Top 15%
        </Badge>
      </div>

      {/* Sales table */}
      <Card className="overflow-hidden border-border">
        <div className="px-4 py-3 border-b border-border bg-muted/30">
          <h3 className="font-display text-xs font-semibold text-muted-foreground uppercase tracking-wider">
            Últimas ventas / Recent sales
          </h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm" data-ocid="pos.sales_table">
            <thead>
              <tr className="border-b border-border bg-muted/20">
                <th className="text-left px-4 py-2 text-xs text-muted-foreground font-medium">
                  Fecha / Date
                </th>
                <th className="text-left px-4 py-2 text-xs text-muted-foreground font-medium">
                  Lotería
                </th>
                <th className="text-right px-4 py-2 text-xs text-muted-foreground font-medium">
                  Cant.
                </th>
                <th className="text-right px-4 py-2 text-xs text-muted-foreground font-medium">
                  Monto
                </th>
                <th className="text-right px-4 py-2 text-xs text-muted-foreground font-medium">
                  Comisión
                </th>
              </tr>
            </thead>
            <tbody>
              {MOCK_SALES.map((sale, idx) => (
                <tr
                  key={sale.id}
                  data-ocid={`pos.sales_table.row.${idx + 1}`}
                  className="border-b border-border/50 hover:bg-muted/20 transition-smooth"
                >
                  <td className="px-4 py-3 text-muted-foreground font-mono text-xs whitespace-nowrap">
                    {fmtDate(sale.soldAt)}
                  </td>
                  <td className="px-4 py-3 text-foreground font-medium">
                    {sale.lotteryName}
                  </td>
                  <td className="px-4 py-3 text-right text-muted-foreground">
                    1
                  </td>
                  <td className="px-4 py-3 text-right font-mono font-medium text-foreground">
                    {fmt(sale.amount)}
                  </td>
                  <td className="px-4 py-3 text-right font-mono font-medium text-secondary">
                    {fmt(sale.amount * 0.05)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Payout button */}
      <div className="flex justify-end">
        <GlowButton
          type="button"
          variant="green"
          size="lg"
          onClick={() => setPayoutOpen(true)}
          disabled={payoutDone}
          shimmer={!payoutDone}
          data-ocid="pos.payout_button"
        >
          {payoutDone
            ? "✅ Solicitud enviada"
            : "💳 Solicitar liquidación / Request payout"}
        </GlowButton>
      </div>

      {/* Payout modal */}
      <Dialog open={payoutOpen} onOpenChange={setPayoutOpen}>
        <DialogContent data-ocid="pos.payout_dialog">
          <DialogHeader>
            <DialogTitle className="font-display">
              Solicitar liquidación / Request Payout
            </DialogTitle>
          </DialogHeader>
          <div className="py-2 space-y-2 text-sm text-muted-foreground">
            <p>
              Recibirás{" "}
              <span className="text-secondary font-semibold text-base">
                {fmt(monthTotal * 0.05)}
              </span>{" "}
              de comisión acumulada este mes.
            </p>
            <p className="text-xs">
              El pago se procesará en 1–3 días hábiles. / Payment processed in
              1–3 business days.
            </p>
          </div>
          <DialogFooter className="gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => setPayoutOpen(false)}
              data-ocid="pos.payout_dialog.cancel_button"
            >
              Cancelar
            </Button>
            <GlowButton
              type="button"
              variant="green"
              size="md"
              onClick={handlePayout}
              data-ocid="pos.payout_dialog.confirm_button"
            >
              Confirmar / Confirm
            </GlowButton>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

// ── Main POSPage ───────────────────────────────────────────────────────────────

export default function POSPage() {
  const { lotteries } = useMockData();
  const [activeTab, setActiveTab] = useState<"sell" | "commissions">("sell");

  return (
    <div
      className="min-h-screen bg-ceremonial flex flex-col"
      data-ocid="pos.page"
    >
      {/* POS Header */}
      <header className="bg-card border-b border-border shadow-subtle sticky top-0 z-30">
        <div className="max-w-5xl mx-auto px-4 py-4">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h1 className="font-display text-xl font-bold text-foreground leading-tight">
                Portal de Tienda{" "}
                <span className="text-muted-foreground font-normal text-base">
                  / Store Portal
                </span>
              </h1>
              <p className="text-sm font-medium text-primary mt-0.5">
                🍀 Tienda El Trébol · Ciudad de México
              </p>
            </div>
            <div className="flex flex-col items-end gap-0.5 text-right shrink-0">
              <span className="text-sm font-semibold text-foreground">
                Cajero: María González
              </span>
              <span className="text-xs text-muted-foreground">
                Turno: 08:00 – 16:00
              </span>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="gap-1.5 h-7 px-2 text-muted-foreground hover:text-destructive mt-1"
                data-ocid="pos.logout_button"
              >
                <LogOut className="w-3.5 h-3.5" />
                Salir
              </Button>
            </div>
          </div>

          {/* Tabs */}
          <div
            className="flex gap-1 mt-4 bg-muted/40 p-1 rounded-xl w-fit"
            role="tablist"
          >
            {(["sell", "commissions"] as const).map((tab) => (
              <button
                key={tab}
                type="button"
                role="tab"
                aria-selected={activeTab === tab}
                onClick={() => setActiveTab(tab)}
                data-ocid={
                  tab === "sell" ? "pos.sell_tab" : "pos.commissions_tab"
                }
                className={cn(
                  "px-5 py-2 rounded-lg text-sm font-medium transition-smooth",
                  activeTab === tab
                    ? "bg-card text-foreground shadow-subtle border border-primary/20"
                    : "text-muted-foreground hover:text-foreground",
                )}
              >
                {tab === "sell"
                  ? "🎟️ Vender / Sell"
                  : "💰 Mis comisiones / My commissions"}
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="flex-1 max-w-5xl mx-auto w-full px-4 py-6">
        {activeTab === "sell" ? (
          <SellTab lotteries={lotteries} />
        ) : (
          <CommissionsTab />
        )}
      </main>
    </div>
  );
}
