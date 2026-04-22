import { Confetti } from "@/components/ui/Confetti";
import { GlowButton } from "@/components/ui/GlowButton";
import { useLanguage } from "@/hooks/useLanguage";
import { useMockData } from "@/hooks/useMockData";
import { cn } from "@/lib/utils";
import type { Ticket } from "@/types";
import { useNavigate, useParams } from "@tanstack/react-router";
import { AnimatePresence, motion } from "motion/react";
import { useCallback, useEffect, useRef, useState } from "react";

// ── Constants ─────────────────────────────────────────────────────────────────

// Stable positional IDs for up to 10 number slots (avoids index-as-key lint)
const SLOT_IDS = [
  "pos-a",
  "pos-b",
  "pos-c",
  "pos-d",
  "pos-e",
  "pos-f",
  "pos-g",
  "pos-h",
  "pos-i",
  "pos-j",
] as const;

// ── Types ─────────────────────────────────────────────────────────────────────

type Step = 1 | 2 | 3 | 4;
type PaymentMethod = "card" | "crypto" | "balance";

// ── Step indicator ────────────────────────────────────────────────────────────

function StepDots({ current }: { current: Step }) {
  const labels = ["Sorteo", "Números", "Boleto", "Pago"];
  return (
    <div
      className="flex items-center gap-1 justify-center mb-8"
      aria-label="Pasos del proceso"
    >
      {labels.map((label, i) => {
        const step = (i + 1) as Step;
        const isActive = step === current;
        const isDone = step < current;
        return (
          <div key={label} className="flex items-center gap-1">
            <div className="flex flex-col items-center gap-1">
              <div
                className={cn(
                  "w-7 h-7 rounded-full flex items-center justify-center text-xs font-body font-bold transition-smooth",
                  isActive && "bg-primary text-primary-foreground glow-gold",
                  isDone && "bg-secondary text-secondary-foreground",
                  !isActive && !isDone && "bg-muted text-muted-foreground",
                )}
              >
                {isDone ? "✓" : step}
              </div>
              <span
                className={cn(
                  "text-[10px] font-body transition-smooth",
                  isActive ? "text-primary" : "text-muted-foreground",
                )}
              >
                {label}
              </span>
            </div>
            {i < 3 && (
              <div
                className={cn(
                  "w-6 h-px mb-4 transition-smooth",
                  isDone ? "bg-secondary" : "bg-border",
                )}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}

// ── Step 1: Lottery Summary ───────────────────────────────────────────────────

function Step1({
  lotteryId,
  onContinue,
}: {
  lotteryId: string;
  onContinue: () => void;
}) {
  const { lotteries } = useMockData();
  const { t } = useLanguage();
  const navigate = useNavigate();
  const lottery = lotteries.find((l) => l.id === lotteryId);

  if (!lottery) {
    return (
      <div className="text-center py-20">
        <p className="text-muted-foreground font-body">
          {t("Sorteo no encontrado.", "Lottery not found.")}
        </p>
        <GlowButton
          variant="outline"
          size="md"
          className="mt-6"
          onClick={() => navigate({ to: "/home" })}
        >
          {t("Volver al inicio", "Back to home")}
        </GlowButton>
      </div>
    );
  }

  return (
    <motion.div
      key="step1"
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -40 }}
      transition={{ duration: 0.35 }}
      className="flex flex-col gap-6"
      data-ocid="purchase.step1.section"
    >
      <div className="text-center">
        <p className="text-4xl mb-2">{lottery.logoEmoji}</p>
        <h2 className="font-display text-2xl font-bold text-foreground">
          {t(lottery.nameEs, lottery.name)}
        </h2>
        <p className="text-muted-foreground font-body text-sm mt-1">
          {t(lottery.descriptionEs, lottery.description)}
        </p>
      </div>

      {/* Summary card */}
      <div
        className="rounded-2xl border border-primary/20 bg-card p-6 space-y-4 glow-gold"
        data-ocid="purchase.lottery_card"
      >
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-xs text-muted-foreground font-body uppercase tracking-widest mb-1">
              {t("Premio mayor", "Jackpot")}
            </p>
            <p className="font-display text-xl font-black text-primary">
              {lottery.jackpotFormatted}
            </p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground font-body uppercase tracking-widest mb-1">
              {t("Precio", "Price")}
            </p>
            <p className="font-display text-xl font-black text-foreground">
              ${lottery.price} {lottery.currency}
            </p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground font-body uppercase tracking-widest mb-1">
              {t("Sorteo", "Draw date")}
            </p>
            <p className="font-body text-sm font-semibold text-foreground">
              {lottery.drawDateFormatted}
            </p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground font-body uppercase tracking-widest mb-1">
              {t("Probabilidad", "Odds")}
            </p>
            <p className="font-body text-sm font-semibold text-foreground">
              {lottery.odds}
            </p>
          </div>
        </div>

        <div className="flex flex-wrap gap-1.5 pt-2 border-t border-border">
          {lottery.tags.map((tag) => (
            <span
              key={tag}
              className="text-xs font-body px-2 py-0.5 rounded-full bg-secondary/20 text-secondary border border-secondary/30"
            >
              #{tag}
            </span>
          ))}
        </div>
      </div>

      <button
        type="button"
        className="text-sm font-body text-muted-foreground underline underline-offset-4 hover:text-primary transition-smooth text-center"
        onClick={() => navigate({ to: "/home" })}
        data-ocid="purchase.change_draw_link"
      >
        {t("Cambiar sorteo", "Change draw")}
      </button>

      <GlowButton
        variant="gold"
        size="xl"
        shimmer
        className="w-full"
        onClick={onContinue}
        data-ocid="purchase.step1.continue_button"
      >
        {t("Continuar", "Continue")} →
      </GlowButton>
    </motion.div>
  );
}

// ── Number Picker ─────────────────────────────────────────────────────────────

function NumberPicker({
  value,
  onChange,
  maxNumber,
  index,
  usedValues,
}: {
  value: number | null;
  onChange: (n: number) => void;
  maxNumber: number;
  index: number;
  usedValues: (number | null)[];
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open]);

  const nums = Array.from({ length: maxNumber }, (_, i) => i + 1);

  return (
    <div ref={ref} className="relative flex flex-col items-center gap-1">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-label={`Número ${index + 1}: ${value ?? "sin seleccionar"}`}
        data-ocid={`purchase.number_picker.${index + 1}`}
        className={cn(
          "w-14 h-14 rounded-full font-display font-black text-xl border-2 transition-smooth",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary",
          value !== null
            ? "bg-primary text-primary-foreground border-primary glow-gold"
            : "bg-muted text-muted-foreground border-border hover:border-primary/50",
        )}
      >
        {value ?? "?"}
      </button>
      <span className="text-[10px] font-body text-muted-foreground">
        #{index + 1}
      </span>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: -8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: -8 }}
            transition={{ duration: 0.18 }}
            className="absolute top-16 left-1/2 -translate-x-1/2 z-30 bg-card border border-primary/30 rounded-2xl shadow-2xl p-3 w-48"
            data-ocid={`purchase.number_wheel.${index + 1}`}
          >
            <div className="grid grid-cols-5 gap-1.5 max-h-52 overflow-y-auto">
              {nums.map((n) => {
                const isUsed =
                  usedValues.includes(n) && usedValues[index] !== n;
                return (
                  <button
                    key={n}
                    type="button"
                    onClick={() => {
                      if (!isUsed) {
                        onChange(n);
                        setOpen(false);
                      }
                    }}
                    disabled={isUsed}
                    className={cn(
                      "w-8 h-8 rounded-full font-mono text-xs font-bold transition-smooth",
                      "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary",
                      value === n
                        ? "bg-primary text-primary-foreground"
                        : isUsed
                          ? "bg-muted/30 text-muted-foreground/30 cursor-not-allowed"
                          : "bg-muted text-muted-foreground hover:bg-primary/20 hover:text-primary",
                    )}
                  >
                    {n}
                  </button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ── Step 2: Pick Numbers ──────────────────────────────────────────────────────

function Step2({
  lotteryId,
  numbers,
  setNumbers,
  onPreview,
}: {
  lotteryId: string;
  numbers: (number | null)[];
  setNumbers: (nums: (number | null)[]) => void;
  onPreview: () => void;
}) {
  const { lotteries } = useMockData();
  const { t } = useLanguage();
  const lottery = lotteries.find((l) => l.id === lotteryId);
  const count = lottery?.numbersToSelect ?? 6;
  const maxNumber = lottery?.maxNumber ?? 45;

  const quickPick = useCallback(() => {
    const pool = Array.from({ length: maxNumber }, (_, i) => i + 1);
    const picked: number[] = [];
    while (picked.length < count) {
      const idx = Math.floor(Math.random() * pool.length);
      picked.push(pool.splice(idx, 1)[0]);
    }
    setNumbers(picked);
  }, [count, maxNumber, setNumbers]);

  const setNumber = (index: number, value: number) => {
    const next = [...numbers];
    next[index] = value;
    setNumbers(next);
  };

  const filled = numbers.filter((n) => n !== null).length;
  const allFilled = filled === count;

  return (
    <motion.div
      key="step2"
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -40 }}
      transition={{ duration: 0.35 }}
      className="flex flex-col gap-8"
      data-ocid="purchase.step2.section"
    >
      <div className="text-center">
        <h2 className="font-display text-2xl font-bold text-foreground">
          {t("Elige tus números", "Pick your numbers")}
        </h2>
        <p className="text-muted-foreground font-body text-sm mt-1">
          {t(
            `Selecciona ${count} números del 1 al ${maxNumber}`,
            `Select ${count} numbers from 1 to ${maxNumber}`,
          )}
        </p>
      </div>

      {/* Pickers */}
      <div className="flex flex-wrap gap-4 justify-center py-2">
        {SLOT_IDS.slice(0, count).map((slotId, i) => (
          <NumberPicker
            key={slotId}
            index={i}
            value={numbers[i] ?? null}
            onChange={(n) => setNumber(i, n)}
            maxNumber={maxNumber}
            usedValues={numbers}
          />
        ))}
      </div>

      {/* Selected display */}
      <div
        className="flex flex-wrap gap-3 justify-center min-h-12"
        aria-label={t("Números seleccionados", "Selected numbers")}
      >
        {SLOT_IDS.slice(0, count).map((slotId, i) =>
          numbers[i] !== null ? (
            <motion.span
              key={slotId}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="w-11 h-11 rounded-full bg-primary text-primary-foreground font-display font-black text-lg flex items-center justify-center glow-gold"
              data-ocid={`purchase.selected_number.${i + 1}`}
            >
              {numbers[i]}
            </motion.span>
          ) : (
            <span
              key={slotId}
              className="w-11 h-11 rounded-full border-2 border-dashed border-border"
            />
          ),
        )}
      </div>

      {/* Progress */}
      <div className="text-center text-sm font-body text-muted-foreground">
        {filled}/{count} {t("seleccionados", "selected")}
      </div>

      <GlowButton
        type="button"
        variant="outline"
        size="md"
        className="w-full"
        onClick={quickPick}
        data-ocid="purchase.quick_pick_button"
      >
        ✨ {t("Sorpréndeme", "Quick pick")}
      </GlowButton>

      <GlowButton
        type="button"
        variant="gold"
        size="xl"
        shimmer
        className="w-full"
        disabled={!allFilled}
        onClick={onPreview}
        data-ocid="purchase.step2.preview_button"
      >
        {t("Ver mi boleto", "Preview ticket")} →
      </GlowButton>
    </motion.div>
  );
}

// ── Holographic Ticket ────────────────────────────────────────────────────────

function HolographicTicket({
  lotteryId,
  numbers,
  serial,
  playerName,
}: {
  lotteryId: string;
  numbers: (number | null)[];
  serial: string;
  playerName: string;
}) {
  const { lotteries } = useMockData();
  const { t } = useLanguage();
  const lottery = lotteries.find((l) => l.id === lotteryId);

  return (
    <div
      className="relative rounded-3xl overflow-hidden border-2 border-primary/60"
      style={{
        background:
          "radial-gradient(ellipse at 30% 20%, oklch(0.18 0.06 80 / 0.8) 0%, oklch(0.08 0.01 50) 70%)",
        minHeight: "320px",
      }}
      data-ocid="purchase.ticket_preview"
    >
      {/* Noise texture overlay */}
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
          backgroundSize: "200px 200px",
        }}
      />
      {/* Gold border accent lines */}
      <div className="absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-primary/60 to-transparent" />
      <div className="absolute inset-x-6 bottom-0 h-px bg-gradient-to-r from-transparent via-primary/60 to-transparent" />

      {/* Content */}
      <div className="relative z-10 p-7 flex flex-col gap-5 h-full">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div>
            <p className="text-xs font-body uppercase tracking-[0.2em] text-primary/60 mb-1">
              LSBFL
            </p>
            <h3 className="font-display text-xl font-black text-primary leading-tight">
              {lottery ? t(lottery.nameEs, lottery.name) : "—"}
            </h3>
          </div>
          <span className="text-3xl">{lottery?.logoEmoji ?? "🎟️"}</span>
        </div>

        {/* Player */}
        <div>
          <p className="text-xs font-body text-primary/50 uppercase tracking-widest mb-0.5">
            {t("Titular", "Holder")}
          </p>
          <p className="font-display text-base font-bold text-foreground">
            {playerName}
          </p>
        </div>

        {/* Numbers */}
        <div>
          <p className="text-xs font-body text-primary/50 uppercase tracking-widest mb-3">
            {t("Números elegidos", "Selected numbers")}
          </p>
          <div className="flex flex-wrap gap-2.5">
            {numbers.map((n, i) => (
              <span
                key={SLOT_IDS[i]}
                className="w-11 h-11 rounded-full bg-primary/90 text-primary-foreground font-display font-black text-base flex items-center justify-center glow-gold"
              >
                {n ?? "?"}
              </span>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="mt-auto flex items-end justify-between pt-4 border-t border-primary/20">
          <div>
            <p className="text-xs font-body text-primary/50 uppercase tracking-widest mb-0.5">
              {t("Sorteo", "Draw")}
            </p>
            <p className="font-body text-xs font-semibold text-foreground">
              {lottery?.drawDateFormatted ?? "—"}
            </p>
          </div>
          <div className="text-right">
            <p className="text-xs font-body text-primary/50 uppercase tracking-widest mb-0.5">
              {t("Serial", "Serial")}
            </p>
            <p className="font-mono text-[10px] text-primary/70">{serial}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Step 3: Ticket Preview ────────────────────────────────────────────────────

function Step3({
  lotteryId,
  numbers,
  serial,
  onPay,
}: {
  lotteryId: string;
  numbers: (number | null)[];
  serial: string;
  onPay: () => void;
}) {
  const { t } = useLanguage();
  const playerName =
    (typeof localStorage !== "undefined" &&
      localStorage.getItem("lsbfl-player-name")) ||
    "Ana García";

  return (
    <motion.div
      key="step3"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -30 }}
      transition={{ duration: 0.4 }}
      className="flex flex-col gap-8"
      data-ocid="purchase.step3.section"
    >
      <div className="text-center">
        <h2 className="font-display text-2xl font-bold text-foreground">
          {t("Tu boleto coleccionable", "Your collectible ticket")}
        </h2>
        <p className="text-muted-foreground font-body text-sm mt-1">
          {t(
            "Aquí está tu obra de arte. Confírmalo abajo.",
            "Here's your piece of art. Confirm it below.",
          )}
        </p>
      </div>

      <HolographicTicket
        lotteryId={lotteryId}
        numbers={numbers}
        serial={serial}
        playerName={playerName}
      />

      <GlowButton
        type="button"
        variant="gold"
        size="xl"
        shimmer
        className="w-full"
        onClick={onPay}
        data-ocid="purchase.step3.pay_button"
      >
        🔒 {t("Pagar y sellar", "Pay & seal")}
      </GlowButton>
    </motion.div>
  );
}

// ── Payment Method Card ───────────────────────────────────────────────────────

function PaymentCard({
  method,
  selected,
  onSelect,
  icon,
  label,
  sublabel,
}: {
  method: PaymentMethod;
  selected: boolean;
  onSelect: (m: PaymentMethod) => void;
  icon: string;
  label: string;
  sublabel: string;
}) {
  return (
    <button
      type="button"
      onClick={() => onSelect(method)}
      aria-pressed={selected}
      data-ocid={`purchase.payment.${method}`}
      className={cn(
        "w-full p-4 rounded-2xl border-2 text-left transition-smooth flex items-center gap-4",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary",
        selected
          ? "border-primary bg-primary/10 glow-gold"
          : "border-border bg-card hover:border-primary/40",
      )}
    >
      <span className="text-2xl">{icon}</span>
      <div className="flex-1 min-w-0">
        <p className="font-body font-semibold text-foreground text-sm">
          {label}
        </p>
        <p className="font-body text-xs text-muted-foreground">{sublabel}</p>
      </div>
      <div
        className={cn(
          "w-5 h-5 rounded-full border-2 transition-smooth shrink-0",
          selected
            ? "border-primary bg-primary"
            : "border-muted-foreground bg-transparent",
        )}
      />
    </button>
  );
}

// ── Seal Animation Overlay ────────────────────────────────────────────────────

function SealOverlay() {
  const { t } = useLanguage();
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-40 bg-background/90 backdrop-blur-sm flex flex-col items-center justify-center gap-6"
      data-ocid="purchase.seal_overlay"
    >
      <motion.div
        animate={{ rotate: 360, scale: [1, 1.15, 1] }}
        transition={{
          duration: 1.2,
          repeat: Number.POSITIVE_INFINITY,
          ease: "linear",
        }}
        className="text-6xl"
        aria-hidden="true"
      >
        🔮
      </motion.div>
      <p className="font-display text-2xl font-bold text-primary text-center">
        {t("Sellando tu boleto...", "Sealing your ticket...")}
      </p>
      <div className="flex gap-1.5">
        {[0, 1, 2].map((i) => (
          <motion.span
            key={i}
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{
              duration: 0.8,
              delay: i * 0.2,
              repeat: Number.POSITIVE_INFINITY,
            }}
            className="w-2 h-2 rounded-full bg-primary"
          />
        ))}
      </div>
    </motion.div>
  );
}

// ── Success State ─────────────────────────────────────────────────────────────

function SuccessPanel({ onViewWallet }: { onViewWallet: () => void }) {
  const { t } = useLanguage();
  return (
    <motion.div
      key="success"
      initial={{ opacity: 0, scale: 0.92 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.45, type: "spring", bounce: 0.3 }}
      className="flex flex-col items-center gap-6 py-8 text-center"
      data-ocid="purchase.success.section"
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.2, type: "spring", bounce: 0.5 }}
        className="text-7xl"
      >
        🎟️
      </motion.div>
      <div>
        <h2 className="font-display text-3xl font-black text-primary mb-2">
          {t("¡Tu boleto está listo!", "Your ticket is ready!")}
        </h2>
        <p className="font-body text-muted-foreground text-sm max-w-xs mx-auto">
          {t(
            "Tu suerte está sellada. Recuerda revisar el sorteo el día del evento.",
            "Your luck is sealed. Remember to check the draw on the event day.",
          )}
        </p>
      </div>
      <GlowButton
        type="button"
        variant="gold"
        size="xl"
        shimmer
        className="w-full max-w-xs"
        onClick={onViewWallet}
        data-ocid="purchase.success.view_wallet_button"
      >
        {t("Ver mi boleto", "View ticket")} →
      </GlowButton>
    </motion.div>
  );
}

// ── Step 4: Payment ───────────────────────────────────────────────────────────

function Step4({
  lotteryId,
  numbers,
  serial,
  onSuccess,
}: {
  lotteryId: string;
  numbers: (number | null)[];
  serial: string;
  onSuccess: () => void;
}) {
  const { lotteries, user } = useMockData();
  const { t } = useLanguage();
  const [selected, setSelected] = useState<PaymentMethod>("card");
  const [isSealing, setIsSealing] = useState(false);
  const lottery = lotteries.find((l) => l.id === lotteryId);

  const handleConfirm = () => {
    setIsSealing(true);
    const newTicket: Ticket = {
      id: `ticket-${Date.now()}`,
      lotteryId: lotteryId,
      lotteryName: lottery?.name ?? "Sorteo",
      lotteryNameEs: lottery?.nameEs ?? "Sorteo",
      drawId: lottery?.nextDrawId ?? "draw-next",
      userId: user.id,
      numbers: numbers.filter((n): n is number => n !== null),
      status: "Active",
      purchasedAt: new Date().toISOString(),
      drawDate: lottery?.drawDate ?? new Date().toISOString(),
      price: lottery?.price ?? 5,
      currency: lottery?.currency ?? "USD",
      serialCode: serial,
      isPhygital: false,
    };

    const stored = localStorage.getItem("lsbfl-tickets");
    const existing: Ticket[] = stored ? (JSON.parse(stored) as Ticket[]) : [];
    localStorage.setItem(
      "lsbfl-tickets",
      JSON.stringify([...existing, newTicket]),
    );

    setTimeout(() => {
      setIsSealing(false);
      onSuccess();
    }, 2200);
  };

  const paymentMethods = [
    {
      method: "card" as PaymentMethod,
      icon: "💳",
      label: t("Tarjeta de crédito", "Credit card"),
      sublabel: "Visa, Mastercard, AMEX",
    },
    {
      method: "crypto" as PaymentMethod,
      icon: "₿",
      label: t("Cripto", "Crypto"),
      sublabel: "BTC, ETH, USDC, ICP",
    },
    {
      method: "balance" as PaymentMethod,
      icon: "💰",
      label: t("Saldo interno", "Internal balance"),
      sublabel: `$${user.balance.toLocaleString()} ${user.currency} ${t("disponibles", "available")}`,
    },
  ];

  return (
    <>
      <AnimatePresence>{isSealing && <SealOverlay />}</AnimatePresence>

      <motion.div
        key="step4"
        initial={{ opacity: 0, x: 40 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -40 }}
        transition={{ duration: 0.35 }}
        className="flex flex-col gap-6"
        data-ocid="purchase.step4.section"
      >
        <div className="text-center">
          <h2 className="font-display text-2xl font-bold text-foreground">
            {t("Método de pago", "Payment method")}
          </h2>
          <p className="text-muted-foreground font-body text-sm mt-1">
            {t("Elige cómo quieres pagar tu boleto", "Choose how to pay")}
          </p>
        </div>

        {/* Payment methods */}
        <div className="flex flex-col gap-3" data-ocid="purchase.payment_list">
          {paymentMethods.map((pm) => (
            <PaymentCard
              key={pm.method}
              method={pm.method}
              selected={selected === pm.method}
              onSelect={setSelected}
              icon={pm.icon}
              label={pm.label}
              sublabel={pm.sublabel}
            />
          ))}
        </div>

        {/* Total */}
        <div
          className="rounded-2xl border border-border bg-muted/40 p-4 flex items-center justify-between"
          data-ocid="purchase.total_display"
        >
          <span className="font-body text-sm text-muted-foreground">
            {t("Total", "Total")}
          </span>
          <div className="text-right">
            <p className="font-display text-xl font-black text-primary">
              ${lottery?.price ?? 5} USD
            </p>
            <p className="font-body text-xs text-muted-foreground">
              ~${((lottery?.price ?? 5) * 20).toLocaleString()} MXN
            </p>
          </div>
        </div>

        <GlowButton
          type="button"
          variant="gold"
          size="xl"
          shimmer
          className="w-full"
          onClick={handleConfirm}
          disabled={isSealing}
          data-ocid="purchase.confirm_button"
        >
          ✅ {t("Confirmar compra", "Confirm purchase")}
        </GlowButton>
      </motion.div>
    </>
  );
}

// ── Main PurchasePage ─────────────────────────────────────────────────────────

export default function PurchasePage() {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const { lotteryId } = useParams({ from: "/purchase/$lotteryId" });
  const { lotteries } = useMockData();

  const lottery = lotteries.find((l) => l.id === lotteryId);

  const [step, setStep] = useState<Step>(1);
  const [numbers, setNumbers] = useState<(number | null)[]>(
    Array(lottery?.numbersToSelect ?? 6).fill(null),
  );
  const [serial] = useState(
    () =>
      `LSBFL-${(lotteryId ?? "XX").slice(-3).toUpperCase()}-${new Date().getFullYear()}-${Math.random().toString(36).slice(2, 7).toUpperCase()}`,
  );
  const [showConfetti, setShowConfetti] = useState(false);
  const [confirmed, setConfirmed] = useState(false);

  const handleSuccess = () => {
    setShowConfetti(true);
    setConfirmed(true);
  };

  const handleViewWallet = () => {
    navigate({ to: "/wallet" });
  };

  return (
    <div
      className="min-h-screen bg-ceremonial flex flex-col"
      data-ocid="purchase.page"
    >
      {/* Confetti */}
      <Confetti
        active={showConfetti}
        duration={4000}
        onComplete={() => setShowConfetti(false)}
      />

      {/* Header */}
      <div className="sticky top-0 z-20 bg-card/80 backdrop-blur-md border-b border-border/60 px-4 py-3 flex items-center gap-3">
        {!confirmed && step > 1 && (
          <button
            type="button"
            onClick={() => setStep((s) => (s > 1 ? ((s - 1) as Step) : s))}
            className="w-9 h-9 rounded-xl flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted transition-smooth"
            aria-label={t("Paso anterior", "Previous step")}
            data-ocid="purchase.back_button"
          >
            ←
          </button>
        )}
        {(confirmed || step === 1) && <div className="w-9" />}
        <div className="flex-1 flex justify-center">
          <span className="font-display font-bold text-primary text-lg">
            {t("Comprar boleto", "Buy ticket")}
          </span>
        </div>
        <button
          type="button"
          onClick={() => navigate({ to: "/home" })}
          className="w-9 h-9 rounded-xl flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted transition-smooth"
          aria-label={t("Cerrar", "Close")}
          data-ocid="purchase.close_button"
        >
          ✕
        </button>
      </div>

      {/* Main content */}
      <div className="flex-1 px-4 pt-6 pb-10 max-w-lg mx-auto w-full">
        {!confirmed && <StepDots current={step} />}

        <AnimatePresence mode="wait">
          {confirmed ? (
            <SuccessPanel key="success" onViewWallet={handleViewWallet} />
          ) : step === 1 ? (
            <Step1
              key="s1"
              lotteryId={lotteryId}
              onContinue={() => setStep(2)}
            />
          ) : step === 2 ? (
            <Step2
              key="s2"
              lotteryId={lotteryId}
              numbers={numbers}
              setNumbers={setNumbers}
              onPreview={() => setStep(3)}
            />
          ) : step === 3 ? (
            <Step3
              key="s3"
              lotteryId={lotteryId}
              numbers={numbers}
              serial={serial}
              onPay={() => setStep(4)}
            />
          ) : (
            <Step4
              key="s4"
              lotteryId={lotteryId}
              numbers={numbers}
              serial={serial}
              onSuccess={handleSuccess}
            />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
