import { useLanguage } from "@/hooks/useLanguage";
import { cn } from "@/lib/utils";
import type { Ticket } from "@/types";
import { useState } from "react";

interface TicketCardProps {
  ticket: Ticket;
  className?: string;
  onClick?: () => void;
}

const statusConfig = {
  Active: {
    label: "Activo",
    labelEn: "Active",
    color: "bg-secondary/20 text-secondary border-secondary/40",
  },
  InDraw: {
    label: "En Sorteo",
    labelEn: "In Draw",
    color: "bg-primary/20 text-primary border-primary/40",
  },
  Winner: {
    label: "¡Ganador!",
    labelEn: "Winner!",
    color: "bg-green-500/20 text-green-400 border-green-400/40",
  },
  Lost: {
    label: "Perdido",
    labelEn: "Lost",
    color: "bg-muted text-muted-foreground border-border",
  },
  Unclaimed: {
    label: "Sin reclamar",
    labelEn: "Unclaimed",
    color: "bg-orange-500/20 text-orange-400 border-orange-400/40",
  },
};

export function TicketCard({ ticket, className, onClick }: TicketCardProps) {
  const [flipped, setFlipped] = useState(false);
  const { t } = useLanguage();
  const status = statusConfig[ticket.status];

  const handleFlip = () => {
    setFlipped((f) => !f);
    onClick?.();
  };

  return (
    <button
      type="button"
      className={cn(
        "w-full perspective-1000 cursor-pointer bg-transparent border-0 p-0 text-left",
        className,
      )}
      style={{ perspective: "1000px" }}
      onClick={handleFlip}
      aria-label={t(
        `Boleto ${ticket.lotteryNameEs}`,
        `Ticket ${ticket.lotteryName}`,
      )}
    >
      <div
        className="relative w-full transition-transform duration-700 ease-in-out"
        style={{
          transformStyle: "preserve-3d",
          transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)",
          minHeight: "200px",
        }}
      >
        {/* Front */}
        <div
          className={cn(
            "absolute inset-0 ticket-card backface-hidden",
            "bg-card border border-border",
            "p-5 flex flex-col justify-between",
            ticket.status === "Winner" && "border-primary/60 glow-gold",
          )}
          style={{ backfaceVisibility: "hidden" }}
        >
          {/* Header */}
          <div className="flex items-start justify-between gap-2">
            <div>
              <p className="text-xs font-body text-muted-foreground uppercase tracking-widest mb-1">
                {t(ticket.lotteryNameEs, ticket.lotteryName)}
              </p>
              <p className="font-mono text-xs text-muted-foreground/60 truncate">
                {ticket.serialCode}
              </p>
            </div>
            <span
              className={cn(
                "text-xs font-body font-semibold px-2.5 py-1 rounded-full border shrink-0",
                status.color,
              )}
            >
              {t(status.label, status.labelEn)}
            </span>
          </div>

          {/* Numbers */}
          <div className="flex flex-wrap gap-2 justify-center my-3">
            {ticket.numbers.map((n) => {
              const isMatch = ticket.matchedNumbers?.includes(n);
              return (
                <span
                  key={n}
                  className={cn(
                    "w-9 h-9 rounded-full flex items-center justify-center font-mono text-sm font-bold border transition-smooth",
                    isMatch
                      ? "bg-primary text-primary-foreground border-primary shadow-glow-gold"
                      : "bg-muted text-muted-foreground border-border",
                  )}
                >
                  {n}
                </span>
              );
            })}
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between text-xs font-body text-muted-foreground">
            <span>
              {new Date(ticket.drawDate).toLocaleDateString(
                t("es-MX", "en-US"),
                { day: "numeric", month: "short" },
              )}
            </span>
            {ticket.isPhygital && (
              <span className="flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-secondary inline-block" />
                {t("Físico", "Physical")}
              </span>
            )}
            <span className="text-muted-foreground/60">
              {t("Toca para voltear", "Tap to flip")}
            </span>
          </div>
        </div>

        {/* Back */}
        <div
          className="absolute inset-0 ticket-card backface-hidden bg-card border border-border p-5 flex flex-col justify-between"
          style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
        >
          <div className="text-center">
            <p className="font-display text-lg font-bold text-primary mb-1">
              {ticket.status === "Winner"
                ? `🏆 ${t("¡Ganaste!", "You Won!")}`
                : t("Detalle del Boleto", "Ticket Detail")}
            </p>
            {ticket.prizeAmount && (
              <p className="font-display text-3xl font-black text-primary">
                ${ticket.prizeAmount.toLocaleString()}
              </p>
            )}
          </div>
          <div className="space-y-2 text-sm font-body">
            <div className="flex justify-between">
              <span className="text-muted-foreground">
                {t("Código", "Code")}
              </span>
              <span className="font-mono text-xs text-foreground">
                {ticket.serialCode}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">
                {t("Precio", "Price")}
              </span>
              <span className="text-foreground">
                ${ticket.price} {ticket.currency}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">
                {t("Comprado", "Purchased")}
              </span>
              <span className="text-foreground">
                {new Date(ticket.purchasedAt).toLocaleDateString(
                  t("es-MX", "en-US"),
                )}
              </span>
            </div>
          </div>
          <p className="text-center text-xs text-muted-foreground/60 font-body">
            {t("Toca para voltear", "Tap to flip back")}
          </p>
        </div>
      </div>
    </button>
  );
}
