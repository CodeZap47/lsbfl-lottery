import { CountdownTimer } from "@/components/ui/CountdownTimer";
import { useLanguage } from "@/hooks/useLanguage";
import { cn } from "@/lib/utils";
import type { Lottery } from "@/types";
import { useNavigate } from "@tanstack/react-router";

interface LotteryCardProps {
  lottery: Lottery;
  className?: string;
}

export function LotteryCard({ lottery, className }: LotteryCardProps) {
  const navigate = useNavigate();
  const { t } = useLanguage();

  const handleBuy = () => {
    navigate({ to: "/purchase/$lotteryId", params: { lotteryId: lottery.id } });
  };

  return (
    <button
      type="button"
      className={cn(
        "ticket-card relative overflow-hidden cursor-pointer group w-full text-left",
        "transition-[transform,box-shadow,border-color] duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]",
        "border border-border/60 hover:border-primary/40",
        "hover:shadow-glow-gold hover:-translate-y-1",
        className,
      )}
      style={{
        background: `linear-gradient(145deg, ${lottery.coverColor} 0%, #0d0d0d 100%)`,
      }}
      onClick={handleBuy}
      aria-label={t(
        `Ver lotería ${lottery.nameEs}`,
        `View lottery ${lottery.name}`,
      )}
    >
      {/* Decorative filigree overlay */}
      <div
        className="absolute inset-0 z-0 opacity-[0.06] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle at 20% 50%, ${lottery.accentColor}55 0%, transparent 60%), radial-gradient(circle at 80% 20%, ${lottery.accentColor}33 0%, transparent 50%)`,
        }}
      />

      <div className="relative z-10 p-5">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xl" aria-hidden="true">
                {lottery.logoEmoji}
              </span>
              <span className="font-body text-xs uppercase tracking-[0.2em] text-white/60">
                LSBFL
              </span>
            </div>
            <h3 className="font-display text-xl font-bold text-white leading-tight">
              {t(lottery.nameEs, lottery.name)}
            </h3>
          </div>
          <div className="text-right shrink-0">
            <p className="text-xs font-body text-white/50 uppercase tracking-wider mb-0.5">
              {t("Precio", "Price")}
            </p>
            <p
              className="font-display text-lg font-bold"
              style={{ color: lottery.accentColor }}
            >
              ${lottery.price}
            </p>
          </div>
        </div>

        {/* Jackpot */}
        <div className="mb-4 text-center py-3 rounded-xl border border-white/10 bg-black/20">
          <p className="text-xs font-body text-white/50 uppercase tracking-widest mb-1">
            {t("Premio Mayor", "Jackpot")}
          </p>
          <p
            className="font-display text-3xl font-black"
            style={{
              color: lottery.accentColor,
              textShadow: `0 0 20px ${lottery.accentColor}88`,
            }}
          >
            {lottery.jackpotFormatted}
          </p>
        </div>

        {/* Countdown */}
        <div className="mb-4 flex items-center justify-between">
          <div>
            <p className="text-xs font-body text-white/50 mb-1 uppercase tracking-wider">
              {t("Próximo sorteo", "Next draw")}
            </p>
            <CountdownTimer
              targetDate={lottery.drawDate}
              compact
              className="text-white"
            />
          </div>
          <div className="text-right">
            <p className="text-xs font-body text-white/50 mb-0.5 uppercase tracking-wider">
              {t("Probabilidades", "Odds")}
            </p>
            <p className="text-xs font-mono text-white/70">{lottery.odds}</p>
          </div>
        </div>

        {/* CTA */}
        <div className="flex w-full justify-center">
          <span
            className="inline-flex px-4 py-2 rounded-xl font-body font-semibold text-sm transition-smooth hover:brightness-110 active:scale-95"
            style={{ background: lottery.accentColor, color: "#0d0d0d" }}
            aria-hidden="true"
          >
            {t("Comprar", "Buy")}
          </span>
        </div>
      </div>
    </button>
  );
}
