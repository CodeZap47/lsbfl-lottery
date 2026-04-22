import { r as reactExports, a as useLanguage, j as jsxRuntimeExports } from "./index-Cr1cOiS1.js";
function getCountdown(targetDate) {
  const diff = new Date(targetDate).getTime() - Date.now();
  if (diff <= 0)
    return { days: 0, hours: 0, minutes: 0, seconds: 0, isExpired: true };
  const days = Math.floor(diff / (1e3 * 60 * 60 * 24));
  const hours = Math.floor(diff % (1e3 * 60 * 60 * 24) / (1e3 * 60 * 60));
  const minutes = Math.floor(diff % (1e3 * 60 * 60) / (1e3 * 60));
  const seconds = Math.floor(diff % (1e3 * 60) / 1e3);
  return { days, hours, minutes, seconds, isExpired: false };
}
function CountdownTimer({
  targetDate,
  className = "",
  compact = false
}) {
  const [countdown, setCountdown] = reactExports.useState(
    getCountdown(targetDate)
  );
  const { t } = useLanguage();
  reactExports.useEffect(() => {
    const interval = setInterval(() => {
      setCountdown(getCountdown(targetDate));
    }, 1e3);
    return () => clearInterval(interval);
  }, [targetDate]);
  if (countdown.isExpired) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `text-muted-foreground text-sm font-body ${className}`, children: t("Sorteo finalizado", "Draw ended") });
  }
  const pad = (n) => String(n).padStart(2, "0");
  if (compact) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: `font-mono text-primary tabular-nums ${className}`, children: [
      countdown.days > 0 && `${countdown.days}d `,
      pad(countdown.hours),
      ":",
      pad(countdown.minutes),
      ":",
      pad(countdown.seconds)
    ] });
  }
  const units = [
    { value: countdown.days, label: t("Días", "Days") },
    { value: countdown.hours, label: t("Hrs", "Hrs") },
    { value: countdown.minutes, label: t("Min", "Min") },
    { value: countdown.seconds, label: t("Seg", "Sec") }
  ];
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      className: `flex items-center gap-2 ${className}`,
      "aria-live": "polite",
      "aria-label": t("Tiempo para el sorteo", "Time until draw"),
      children: units.map((unit, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center min-w-[2.5rem]", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-xl font-bold text-primary tabular-nums leading-none", children: pad(unit.value) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground font-body mt-0.5 uppercase tracking-wider", children: unit.label })
        ] }),
        i < units.length - 1 && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary/60 font-mono text-lg font-bold mb-3", children: ":" })
      ] }, unit.label))
    }
  );
}
export {
  CountdownTimer as C
};
