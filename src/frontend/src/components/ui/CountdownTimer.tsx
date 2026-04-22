import { useLanguage } from "@/hooks/useLanguage";
import { useEffect, useState } from "react";

interface CountdownValues {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isExpired: boolean;
}

function getCountdown(targetDate: string): CountdownValues {
  const diff = new Date(targetDate).getTime() - Date.now();
  if (diff <= 0)
    return { days: 0, hours: 0, minutes: 0, seconds: 0, isExpired: true };
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);
  return { days, hours, minutes, seconds, isExpired: false };
}

interface CountdownTimerProps {
  targetDate: string;
  className?: string;
  compact?: boolean;
}

export function CountdownTimer({
  targetDate,
  className = "",
  compact = false,
}: CountdownTimerProps) {
  const [countdown, setCountdown] = useState<CountdownValues>(
    getCountdown(targetDate),
  );
  const { t } = useLanguage();

  useEffect(() => {
    const interval = setInterval(() => {
      setCountdown(getCountdown(targetDate));
    }, 1000);
    return () => clearInterval(interval);
  }, [targetDate]);

  if (countdown.isExpired) {
    return (
      <span className={`text-muted-foreground text-sm font-body ${className}`}>
        {t("Sorteo finalizado", "Draw ended")}
      </span>
    );
  }

  const pad = (n: number) => String(n).padStart(2, "0");

  if (compact) {
    return (
      <span className={`font-mono text-primary tabular-nums ${className}`}>
        {countdown.days > 0 && `${countdown.days}d `}
        {pad(countdown.hours)}:{pad(countdown.minutes)}:{pad(countdown.seconds)}
      </span>
    );
  }

  const units = [
    { value: countdown.days, label: t("Días", "Days") },
    { value: countdown.hours, label: t("Hrs", "Hrs") },
    { value: countdown.minutes, label: t("Min", "Min") },
    { value: countdown.seconds, label: t("Seg", "Sec") },
  ];

  return (
    <div
      className={`flex items-center gap-2 ${className}`}
      aria-live="polite"
      aria-label={t("Tiempo para el sorteo", "Time until draw")}
    >
      {units.map((unit, i) => (
        <div key={unit.label} className="flex items-center gap-2">
          <div className="flex flex-col items-center min-w-[2.5rem]">
            <span className="font-mono text-xl font-bold text-primary tabular-nums leading-none">
              {pad(unit.value)}
            </span>
            <span className="text-xs text-muted-foreground font-body mt-0.5 uppercase tracking-wider">
              {unit.label}
            </span>
          </div>
          {i < units.length - 1 && (
            <span className="text-primary/60 font-mono text-lg font-bold mb-3">
              :
            </span>
          )}
        </div>
      ))}
    </div>
  );
}
