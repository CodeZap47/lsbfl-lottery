import { GlowButton } from "@/components/ui/GlowButton";
import { TicketCard } from "@/components/ui/TicketCard";
import { useLanguage } from "@/hooks/useLanguage";
import { useMockData } from "@/hooks/useMockData";
import { cn } from "@/lib/utils";
import type { Ticket, TicketStatus } from "@/types";
import { Link } from "@tanstack/react-router";
import {
  Check,
  Copy,
  Gift,
  Send,
  Ticket as TicketIcon,
  Trophy,
  X,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useRef, useState } from "react";
import { toast } from "sonner";

// ── Filter config ──────────────────────────────────────────────────────────────

type FilterKey = TicketStatus | "All" | "Gifted";

const FILTERS: { key: FilterKey; labelEs: string; labelEn: string }[] = [
  { key: "All", labelEs: "Todos", labelEn: "All" },
  { key: "Active", labelEs: "Activos", labelEn: "Active" },
  { key: "InDraw", labelEs: "En Sorteo", labelEn: "In Draw" },
  { key: "Winner", labelEs: "Ganadores", labelEn: "Winners" },
  { key: "Lost", labelEs: "Históricos", labelEn: "Past" },
  { key: "Gifted", labelEs: "Regalados", labelEn: "Gifted" },
];

// ── Stat Pill ──────────────────────────────────────────────────────────────────

function StatPill({
  icon,
  value,
  label,
  accent,
}: {
  icon: React.ReactNode;
  value: string;
  label: string;
  accent?: boolean;
}) {
  return (
    <div
      className={cn(
        "flex flex-col items-center gap-0.5 px-4 py-2.5 rounded-2xl border flex-1 min-w-0",
        accent
          ? "bg-primary/10 border-primary/30 glow-gold"
          : "bg-card border-border",
      )}
    >
      <span
        className={cn(
          "text-lg",
          accent ? "text-primary" : "text-muted-foreground",
        )}
      >
        {icon}
      </span>
      <span
        className={cn(
          "font-display font-black text-lg leading-none",
          accent ? "text-primary" : "text-foreground",
        )}
      >
        {value}
      </span>
      <span className="font-body text-[10px] text-muted-foreground uppercase tracking-widest truncate w-full text-center">
        {label}
      </span>
    </div>
  );
}

// ── Gift Modal ─────────────────────────────────────────────────────────────────

function GiftModal({
  ticket,
  onClose,
}: {
  ticket: Ticket;
  onClose: () => void;
}) {
  const { t } = useLanguage();
  const [recipient, setRecipient] = useState("");
  const [copied, setCopied] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const mockLink = `https://lsbfl.app/claim/${ticket.serialCode}`;

  function handleCopy() {
    navigator.clipboard.writeText(mockLink).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
    toast.success(t("¡Enlace copiado!", "Link copied!"), {
      description: mockLink,
      duration: 4000,
    });
  }

  function handleSend() {
    if (!recipient.trim()) {
      inputRef.current?.focus();
      return;
    }
    toast.success(t("¡Boleto enviado! 🎁", "Ticket sent! 🎁"), {
      description: t(`Enviado a ${recipient}`, `Sent to ${recipient}`),
      duration: 5000,
    });
    onClose();
  }

  return (
    <AnimatePresence>
      <motion.div
        key="backdrop"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-end sm:items-center justify-center p-4"
        onClick={onClose}
        data-ocid="wallet.gift_modal"
      >
        <motion.div
          key="sheet"
          initial={{ opacity: 0, y: 40, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 40, scale: 0.96 }}
          transition={{ type: "spring", stiffness: 320, damping: 28 }}
          className="w-full max-w-md bg-card rounded-3xl border border-primary/20 p-6 shadow-2xl glow-gold relative"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close */}
          <button
            type="button"
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 rounded-full bg-muted/60 flex items-center justify-center text-muted-foreground hover:text-foreground transition-smooth"
            aria-label={t("Cerrar", "Close")}
            data-ocid="wallet.gift_modal.close_button"
          >
            <X className="w-4 h-4" />
          </button>

          {/* Header */}
          <div className="flex items-center gap-3 mb-5">
            <span className="w-10 h-10 rounded-2xl bg-primary/15 border border-primary/30 flex items-center justify-center text-primary">
              <Gift className="w-5 h-5" />
            </span>
            <div>
              <h2 className="font-display text-lg font-bold text-foreground">
                {t("Regalar Boleto", "Gift Ticket")}
              </h2>
              <p className="font-mono text-xs text-muted-foreground">
                {ticket.serialCode}
              </p>
            </div>
          </div>

          {/* Ticket snippet */}
          <div className="ticket-card bg-muted/40 border border-border p-3 mb-5 flex items-center gap-3">
            <span className="text-2xl">🎟️</span>
            <div className="min-w-0">
              <p className="font-body text-sm font-semibold text-foreground truncate">
                {t(ticket.lotteryNameEs, ticket.lotteryName)}
              </p>
              <p className="font-body text-xs text-muted-foreground">
                {ticket.numbers.join(" · ")}
              </p>
            </div>
          </div>

          {/* Recipient input */}
          <label className="block mb-3">
            <span className="font-body text-xs text-muted-foreground uppercase tracking-widest mb-1.5 block">
              {t("Email o usuario", "Email or username")}
            </span>
            <input
              ref={inputRef}
              type="text"
              value={recipient}
              onChange={(e) => setRecipient(e.target.value)}
              placeholder={t(
                "ana@correo.mx o @anagarcia",
                "ana@mail.com or @anagarcia",
              )}
              className="w-full h-11 px-4 rounded-2xl bg-muted/60 border border-input text-sm font-body text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-smooth"
              data-ocid="wallet.gift_modal.recipient_input"
            />
          </label>

          {/* Action buttons */}
          <GlowButton
            type="button"
            variant="gold"
            size="md"
            className="w-full mb-3"
            onClick={handleSend}
            data-ocid="wallet.gift_modal.send_button"
          >
            <Send className="w-4 h-4" />
            {t("Enviar Regalo", "Send Gift")}
          </GlowButton>

          <button
            type="button"
            onClick={handleCopy}
            className={cn(
              "w-full h-11 rounded-2xl border font-body text-sm font-medium flex items-center justify-center gap-2 transition-smooth",
              copied
                ? "bg-secondary/15 border-secondary/40 text-secondary"
                : "bg-muted/40 border-border text-muted-foreground hover:border-primary/40 hover:text-foreground",
            )}
            data-ocid="wallet.gift_modal.copy_link_button"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4" />
                {t("¡Enlace copiado!", "Link copied!")}
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" />
                {t("Copiar enlace compartible", "Copy shareable link")}
              </>
            )}
          </button>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

// ── Enhanced Ticket Card with Gift CTA ─────────────────────────────────────────

function WalletTicketCard({
  ticket,
  index,
  onGift,
}: {
  ticket: Ticket;
  index: number;
  onGift: (ticket: Ticket) => void;
}) {
  const { t } = useLanguage();
  const isWinner = ticket.status === "Winner";

  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        delay: index * 0.07,
        type: "spring",
        stiffness: 280,
        damping: 26,
      }}
      className="relative"
      data-ocid={`wallet.ticket.${index + 1}`}
    >
      {/* Winner glow overlay */}
      {isWinner && (
        <div className="absolute -inset-0.5 rounded-3xl glow-gold pointer-events-none z-0" />
      )}

      {/* Winner badge */}
      {isWinner && (
        <div className="absolute -top-2.5 left-1/2 -translate-x-1/2 z-10 flex items-center gap-1 bg-primary text-primary-foreground px-3 py-0.5 rounded-full text-xs font-body font-bold shadow-glow-gold">
          <Trophy className="w-3 h-3" />
          {t("¡Ganador!", "Winner!")}
        </div>
      )}

      <div className="relative z-[1] pt-1">
        <TicketCard ticket={ticket} />
      </div>

      {/* Gift CTA — shown below card, always accessible */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: index * 0.07 + 0.2 }}
        className="flex justify-end mt-1.5 px-1"
      >
        <button
          type="button"
          onClick={() => onGift(ticket)}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-muted/50 border border-border text-xs font-body text-muted-foreground hover:border-primary/40 hover:text-primary transition-smooth"
          data-ocid={`wallet.gift_button.${index + 1}`}
        >
          <Gift className="w-3 h-3" />
          {t("Regalar", "Gift")}
        </button>
      </motion.div>
    </motion.div>
  );
}

// ── Page ───────────────────────────────────────────────────────────────────────

export default function WalletPage() {
  const { t } = useLanguage();
  const { tickets, user } = useMockData();

  const [filter, setFilter] = useState<FilterKey>("All");
  const [giftTicket, setGiftTicket] = useState<Ticket | null>(null);

  const activeCount = tickets.filter(
    (tk) => tk.status === "Active" || tk.status === "InDraw",
  ).length;
  const winnerCount = tickets.filter((tk) => tk.status === "Winner").length;
  const totalSpent = tickets.reduce((sum, tk) => sum + tk.price, 0);

  const filtered = (() => {
    if (filter === "All") return tickets;
    if (filter === "Gifted") return [];
    return tickets.filter((tk) => tk.status === filter);
  })();

  return (
    <div className="min-h-screen bg-background" data-ocid="wallet.page">
      {/* ── Page Header ── */}
      <div className="bg-card border-b border-border">
        <div className="max-w-lg mx-auto px-4 pt-5 pb-4">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h1 className="font-display text-2xl font-black text-foreground leading-tight">
                {t("Mis Boletos", "My Tickets")}
              </h1>
              <p className="font-body text-sm text-muted-foreground mt-0.5">
                {activeCount} {t("boletos activos", "active tickets")}
                {winnerCount > 0 && (
                  <span className="text-primary font-semibold">
                    {" "}
                    · {winnerCount} {t("ganador", "winner")}
                  </span>
                )}
              </p>
            </div>
            <span className="text-3xl mt-1" aria-hidden="true">
              🎟️
            </span>
          </div>

          {/* Stats row */}
          <div className="flex gap-2" data-ocid="wallet.stats_row">
            <StatPill
              icon={<TicketIcon className="w-4 h-4" />}
              value={String(tickets.length)}
              label={t("Boletos", "Tickets")}
            />
            <StatPill
              icon="💸"
              value={`$${totalSpent}`}
              label={t("Invertido", "Spent")}
            />
            <StatPill
              icon={<Trophy className="w-4 h-4" />}
              value={String(winnerCount)}
              label={t("Victorias", "Wins")}
              accent={winnerCount > 0}
            />
          </div>
        </div>
      </div>

      {/* ── Content ── */}
      <div className="max-w-lg mx-auto px-4 py-5">
        {/* Balance card */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 260, damping: 24 }}
          className="ticket-card bg-card border border-primary/25 p-4 mb-5 flex items-center justify-between"
          style={{
            boxShadow:
              "0 0 24px oklch(var(--primary) / 0.15), 0 0 48px oklch(var(--primary) / 0.08)",
          }}
          data-ocid="wallet.balance_card"
        >
          <div>
            <p className="text-xs font-body text-muted-foreground uppercase tracking-widest mb-0.5">
              {t("Saldo disponible", "Available Balance")}
            </p>
            <p className="font-display text-3xl font-black text-primary">
              ${user.balance.toLocaleString()}
            </p>
            <p className="font-body text-xs text-muted-foreground mt-0.5">
              {user.currency}
            </p>
          </div>
          <GlowButton
            type="button"
            variant="outline"
            size="sm"
            data-ocid="wallet.add_funds_button"
          >
            {t("Recargar", "Add Funds")}
          </GlowButton>
        </motion.div>

        {/* Filter pills */}
        <div
          className="flex gap-2 overflow-x-auto pb-2 mb-5 -mx-4 px-4 scrollbar-hide"
          role="tablist"
          aria-label={t("Filtrar boletos", "Filter tickets")}
          data-ocid="wallet.filter_bar"
        >
          {FILTERS.map(({ key, labelEs, labelEn }) => (
            <button
              key={key}
              type="button"
              role="tab"
              aria-selected={filter === key}
              onClick={() => setFilter(key)}
              data-ocid={`wallet.filter.${key.toLowerCase()}_tab`}
              className={cn(
                "shrink-0 px-4 py-1.5 rounded-full text-sm font-body font-medium border transition-smooth",
                filter === key
                  ? "bg-primary text-primary-foreground border-primary shadow-glow-gold"
                  : "bg-muted/40 text-muted-foreground border-border hover:border-primary/40 hover:text-foreground",
              )}
            >
              {t(labelEs, labelEn)}
            </button>
          ))}
        </div>

        {/* ── Ticket Grid / Empty ── */}
        <AnimatePresence mode="wait">
          {filtered.length === 0 ? (
            <motion.div
              key={`empty-${filter}`}
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.97 }}
              transition={{ duration: 0.2 }}
              className="flex flex-col items-center justify-center py-16 text-center"
              data-ocid="wallet.empty_state"
            >
              {/* Decorative ticket SVG */}
              <div className="w-28 h-28 mb-5 relative">
                <svg
                  viewBox="0 0 112 112"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-full h-full"
                  aria-hidden="true"
                  role="img"
                >
                  <title>Boleto vacío</title>
                  <rect
                    x="8"
                    y="24"
                    width="96"
                    height="64"
                    rx="14"
                    fill="oklch(var(--card))"
                    stroke="oklch(var(--primary) / 0.4)"
                    strokeWidth="2"
                    strokeDasharray="6 3"
                  />
                  <circle
                    cx="56"
                    cy="56"
                    r="18"
                    fill="oklch(var(--muted))"
                    stroke="oklch(var(--primary) / 0.3)"
                    strokeWidth="1.5"
                  />
                  <text
                    x="56"
                    y="61"
                    textAnchor="middle"
                    fontSize="18"
                    fill="oklch(var(--primary) / 0.6)"
                  >
                    ?
                  </text>
                  <circle
                    cx="8"
                    cy="56"
                    r="6"
                    fill="oklch(var(--background))"
                    stroke="oklch(var(--border))"
                    strokeWidth="1.5"
                  />
                  <circle
                    cx="104"
                    cy="56"
                    r="6"
                    fill="oklch(var(--background))"
                    stroke="oklch(var(--border))"
                    strokeWidth="1.5"
                  />
                </svg>
              </div>

              <p className="font-display text-xl font-bold text-foreground mb-2">
                {filter === "Gifted"
                  ? t("Sin boletos regalados", "No gifted tickets yet")
                  : t("Aún no tienes boletos", "No tickets here yet")}
              </p>
              <p className="font-body text-sm text-muted-foreground mb-6 max-w-xs">
                {filter === "Gifted"
                  ? t(
                      "Regala la suerte a alguien especial. Voltea un boleto y usa el botón Regalar.",
                      "Share luck with someone special. Flip a ticket and tap Gift.",
                    )
                  : t(
                      "La suerte es un derecho. ¡Compra tu primer boleto y empieza a soñar!",
                      "Luck is a right. Buy your first ticket and start dreaming!",
                    )}
              </p>

              {filter !== "Gifted" && (
                <Link to="/home" data-ocid="wallet.buy_first_ticket_link">
                  <GlowButton type="button" variant="gold" size="lg" shimmer>
                    {t("Comprar mi primer boleto", "Buy my first ticket")}
                  </GlowButton>
                </Link>
              )}
            </motion.div>
          ) : (
            <motion.div
              key={`grid-${filter}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid grid-cols-1 sm:grid-cols-2 gap-5"
            >
              {filtered.map((ticket, i) => (
                <WalletTicketCard
                  key={ticket.id}
                  ticket={ticket}
                  index={i}
                  onGift={setGiftTicket}
                />
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Purchase CTA (when tickets exist) */}
        {filtered.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mt-8 flex justify-center"
          >
            <Link to="/home" data-ocid="wallet.buy_more_link">
              <GlowButton type="button" variant="outline" size="md">
                {t("Comprar más boletos", "Buy more tickets")}
              </GlowButton>
            </Link>
          </motion.div>
        )}
      </div>

      {/* ── Gift Modal ── */}
      {giftTicket && (
        <GiftModal ticket={giftTicket} onClose={() => setGiftTicket(null)} />
      )}
    </div>
  );
}
