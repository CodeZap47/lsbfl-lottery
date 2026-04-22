import { a as useLanguage, u as useNavigate, d as useParams, r as reactExports, j as jsxRuntimeExports, b as cn } from "./index-6HgylvRh.js";
import { C as Confetti } from "./Confetti-5Ih_F5-g.js";
import { G as GlowButton } from "./GlowButton-Duv2phZR.js";
import { u as useMockData } from "./useMockData-BjtQoZZA.js";
import { A as AnimatePresence } from "./index-DocTykfO.js";
import { m as motion } from "./proxy-HmngNdo3.js";
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
  "pos-j"
];
function StepDots({ current }) {
  const labels = ["Sorteo", "Números", "Boleto", "Pago"];
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      className: "flex items-center gap-1 justify-center mb-8",
      "aria-label": "Pasos del proceso",
      children: labels.map((label, i) => {
        const step = i + 1;
        const isActive = step === current;
        const isDone = step < current;
        return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center gap-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: cn(
                  "w-7 h-7 rounded-full flex items-center justify-center text-xs font-body font-bold transition-smooth",
                  isActive && "bg-primary text-primary-foreground glow-gold",
                  isDone && "bg-secondary text-secondary-foreground",
                  !isActive && !isDone && "bg-muted text-muted-foreground"
                ),
                children: isDone ? "✓" : step
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "span",
              {
                className: cn(
                  "text-[10px] font-body transition-smooth",
                  isActive ? "text-primary" : "text-muted-foreground"
                ),
                children: label
              }
            )
          ] }),
          i < 3 && /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: cn(
                "w-6 h-px mb-4 transition-smooth",
                isDone ? "bg-secondary" : "bg-border"
              )
            }
          )
        ] }, label);
      })
    }
  );
}
function Step1({
  lotteryId,
  onContinue
}) {
  const { lotteries } = useMockData();
  const { t } = useLanguage();
  const navigate = useNavigate();
  const lottery = lotteries.find((l) => l.id === lotteryId);
  if (!lottery) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center py-20", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground font-body", children: t("Sorteo no encontrado.", "Lottery not found.") }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        GlowButton,
        {
          variant: "outline",
          size: "md",
          className: "mt-6",
          onClick: () => navigate({ to: "/home" }),
          children: t("Volver al inicio", "Back to home")
        }
      )
    ] });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.div,
    {
      initial: { opacity: 0, x: 40 },
      animate: { opacity: 1, x: 0 },
      exit: { opacity: 0, x: -40 },
      transition: { duration: 0.35 },
      className: "flex flex-col gap-6",
      "data-ocid": "purchase.step1.section",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-4xl mb-2", children: lottery.logoEmoji }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-2xl font-bold text-foreground", children: t(lottery.nameEs, lottery.name) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground font-body text-sm mt-1", children: t(lottery.descriptionEs, lottery.description) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "rounded-2xl border border-primary/20 bg-card p-6 space-y-4 glow-gold",
            "data-ocid": "purchase.lottery_card",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground font-body uppercase tracking-widest mb-1", children: t("Premio mayor", "Jackpot") }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display text-xl font-black text-primary", children: lottery.jackpotFormatted })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground font-body uppercase tracking-widest mb-1", children: t("Precio", "Price") }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-display text-xl font-black text-foreground", children: [
                    "$",
                    lottery.price,
                    " ",
                    lottery.currency
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground font-body uppercase tracking-widest mb-1", children: t("Sorteo", "Draw date") }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-body text-sm font-semibold text-foreground", children: lottery.drawDateFormatted })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground font-body uppercase tracking-widest mb-1", children: t("Probabilidad", "Odds") }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-body text-sm font-semibold text-foreground", children: lottery.odds })
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-1.5 pt-2 border-t border-border", children: lottery.tags.map((tag) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "span",
                {
                  className: "text-xs font-body px-2 py-0.5 rounded-full bg-secondary/20 text-secondary border border-secondary/30",
                  children: [
                    "#",
                    tag
                  ]
                },
                tag
              )) })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            className: "text-sm font-body text-muted-foreground underline underline-offset-4 hover:text-primary transition-smooth text-center",
            onClick: () => navigate({ to: "/home" }),
            "data-ocid": "purchase.change_draw_link",
            children: t("Cambiar sorteo", "Change draw")
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          GlowButton,
          {
            variant: "gold",
            size: "xl",
            shimmer: true,
            className: "w-full",
            onClick: onContinue,
            "data-ocid": "purchase.step1.continue_button",
            children: [
              t("Continuar", "Continue"),
              " →"
            ]
          }
        )
      ]
    },
    "step1"
  );
}
function NumberPicker({
  value,
  onChange,
  maxNumber,
  index,
  usedValues
}) {
  const [open, setOpen] = reactExports.useState(false);
  const ref = reactExports.useRef(null);
  reactExports.useEffect(() => {
    if (!open) return;
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open]);
  const nums = Array.from({ length: maxNumber }, (_, i) => i + 1);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { ref, className: "relative flex flex-col items-center gap-1", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "button",
      {
        type: "button",
        onClick: () => setOpen((o) => !o),
        "aria-label": `Número ${index + 1}: ${value ?? "sin seleccionar"}`,
        "data-ocid": `purchase.number_picker.${index + 1}`,
        className: cn(
          "w-14 h-14 rounded-full font-display font-black text-xl border-2 transition-smooth",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary",
          value !== null ? "bg-primary text-primary-foreground border-primary glow-gold" : "bg-muted text-muted-foreground border-border hover:border-primary/50"
        ),
        children: value ?? "?"
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-[10px] font-body text-muted-foreground", children: [
      "#",
      index + 1
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { children: open && /* @__PURE__ */ jsxRuntimeExports.jsx(
      motion.div,
      {
        initial: { opacity: 0, scale: 0.9, y: -8 },
        animate: { opacity: 1, scale: 1, y: 0 },
        exit: { opacity: 0, scale: 0.9, y: -8 },
        transition: { duration: 0.18 },
        className: "absolute top-16 left-1/2 -translate-x-1/2 z-30 bg-card border border-primary/30 rounded-2xl shadow-2xl p-3 w-48",
        "data-ocid": `purchase.number_wheel.${index + 1}`,
        children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-5 gap-1.5 max-h-52 overflow-y-auto", children: nums.map((n) => {
          const isUsed = usedValues.includes(n) && usedValues[index] !== n;
          return /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              onClick: () => {
                if (!isUsed) {
                  onChange(n);
                  setOpen(false);
                }
              },
              disabled: isUsed,
              className: cn(
                "w-8 h-8 rounded-full font-mono text-xs font-bold transition-smooth",
                "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary",
                value === n ? "bg-primary text-primary-foreground" : isUsed ? "bg-muted/30 text-muted-foreground/30 cursor-not-allowed" : "bg-muted text-muted-foreground hover:bg-primary/20 hover:text-primary"
              ),
              children: n
            },
            n
          );
        }) })
      }
    ) })
  ] });
}
function Step2({
  lotteryId,
  numbers,
  setNumbers,
  onPreview
}) {
  const { lotteries } = useMockData();
  const { t } = useLanguage();
  const lottery = lotteries.find((l) => l.id === lotteryId);
  const count = (lottery == null ? void 0 : lottery.numbersToSelect) ?? 6;
  const maxNumber = (lottery == null ? void 0 : lottery.maxNumber) ?? 45;
  const quickPick = reactExports.useCallback(() => {
    const pool = Array.from({ length: maxNumber }, (_, i) => i + 1);
    const picked = [];
    while (picked.length < count) {
      const idx = Math.floor(Math.random() * pool.length);
      picked.push(pool.splice(idx, 1)[0]);
    }
    setNumbers(picked);
  }, [count, maxNumber, setNumbers]);
  const setNumber = (index, value) => {
    const next = [...numbers];
    next[index] = value;
    setNumbers(next);
  };
  const filled = numbers.filter((n) => n !== null).length;
  const allFilled = filled === count;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.div,
    {
      initial: { opacity: 0, x: 40 },
      animate: { opacity: 1, x: 0 },
      exit: { opacity: 0, x: -40 },
      transition: { duration: 0.35 },
      className: "flex flex-col gap-8",
      "data-ocid": "purchase.step2.section",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-2xl font-bold text-foreground", children: t("Elige tus números", "Pick your numbers") }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground font-body text-sm mt-1", children: t(
            `Selecciona ${count} números del 1 al ${maxNumber}`,
            `Select ${count} numbers from 1 to ${maxNumber}`
          ) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-4 justify-center py-2", children: SLOT_IDS.slice(0, count).map((slotId, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          NumberPicker,
          {
            index: i,
            value: numbers[i] ?? null,
            onChange: (n) => setNumber(i, n),
            maxNumber,
            usedValues: numbers
          },
          slotId
        )) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "flex flex-wrap gap-3 justify-center min-h-12",
            "aria-label": t("Números seleccionados", "Selected numbers"),
            children: SLOT_IDS.slice(0, count).map(
              (slotId, i) => numbers[i] !== null ? /* @__PURE__ */ jsxRuntimeExports.jsx(
                motion.span,
                {
                  initial: { scale: 0 },
                  animate: { scale: 1 },
                  className: "w-11 h-11 rounded-full bg-primary text-primary-foreground font-display font-black text-lg flex items-center justify-center glow-gold",
                  "data-ocid": `purchase.selected_number.${i + 1}`,
                  children: numbers[i]
                },
                slotId
              ) : /* @__PURE__ */ jsxRuntimeExports.jsx(
                "span",
                {
                  className: "w-11 h-11 rounded-full border-2 border-dashed border-border"
                },
                slotId
              )
            )
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center text-sm font-body text-muted-foreground", children: [
          filled,
          "/",
          count,
          " ",
          t("seleccionados", "selected")
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          GlowButton,
          {
            type: "button",
            variant: "outline",
            size: "md",
            className: "w-full",
            onClick: quickPick,
            "data-ocid": "purchase.quick_pick_button",
            children: [
              "✨ ",
              t("Sorpréndeme", "Quick pick")
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          GlowButton,
          {
            type: "button",
            variant: "gold",
            size: "xl",
            shimmer: true,
            className: "w-full",
            disabled: !allFilled,
            onClick: onPreview,
            "data-ocid": "purchase.step2.preview_button",
            children: [
              t("Ver mi boleto", "Preview ticket"),
              " →"
            ]
          }
        )
      ]
    },
    "step2"
  );
}
function HolographicTicket({
  lotteryId,
  numbers,
  serial,
  playerName
}) {
  const { lotteries } = useMockData();
  const { t } = useLanguage();
  const lottery = lotteries.find((l) => l.id === lotteryId);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "relative rounded-3xl overflow-hidden border-2 border-primary/60",
      style: {
        background: "radial-gradient(ellipse at 30% 20%, oklch(0.18 0.06 80 / 0.8) 0%, oklch(0.08 0.01 50) 70%)",
        minHeight: "320px"
      },
      "data-ocid": "purchase.ticket_preview",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "absolute inset-0 opacity-[0.04] pointer-events-none",
            style: {
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
              backgroundSize: "200px 200px"
            }
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-primary/60 to-transparent" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-x-6 bottom-0 h-px bg-gradient-to-r from-transparent via-primary/60 to-transparent" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative z-10 p-7 flex flex-col gap-5 h-full", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-body uppercase tracking-[0.2em] text-primary/60 mb-1", children: "LSBFL" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-xl font-black text-primary leading-tight", children: lottery ? t(lottery.nameEs, lottery.name) : "—" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-3xl", children: (lottery == null ? void 0 : lottery.logoEmoji) ?? "🎟️" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-body text-primary/50 uppercase tracking-widest mb-0.5", children: t("Titular", "Holder") }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display text-base font-bold text-foreground", children: playerName })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-body text-primary/50 uppercase tracking-widest mb-3", children: t("Números elegidos", "Selected numbers") }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-2.5", children: numbers.map((n, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
              "span",
              {
                className: "w-11 h-11 rounded-full bg-primary/90 text-primary-foreground font-display font-black text-base flex items-center justify-center glow-gold",
                children: n ?? "?"
              },
              SLOT_IDS[i]
            )) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-auto flex items-end justify-between pt-4 border-t border-primary/20", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-body text-primary/50 uppercase tracking-widest mb-0.5", children: t("Sorteo", "Draw") }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-body text-xs font-semibold text-foreground", children: (lottery == null ? void 0 : lottery.drawDateFormatted) ?? "—" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-right", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-body text-primary/50 uppercase tracking-widest mb-0.5", children: t("Serial", "Serial") }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-mono text-[10px] text-primary/70", children: serial })
            ] })
          ] })
        ] })
      ]
    }
  );
}
function Step3({
  lotteryId,
  numbers,
  serial,
  onPay
}) {
  const { t } = useLanguage();
  const playerName = typeof localStorage !== "undefined" && localStorage.getItem("lsbfl-player-name") || "Ana García";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.div,
    {
      initial: { opacity: 0, y: 30 },
      animate: { opacity: 1, y: 0 },
      exit: { opacity: 0, y: -30 },
      transition: { duration: 0.4 },
      className: "flex flex-col gap-8",
      "data-ocid": "purchase.step3.section",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-2xl font-bold text-foreground", children: t("Tu boleto coleccionable", "Your collectible ticket") }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground font-body text-sm mt-1", children: t(
            "Aquí está tu obra de arte. Confírmalo abajo.",
            "Here's your piece of art. Confirm it below."
          ) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          HolographicTicket,
          {
            lotteryId,
            numbers,
            serial,
            playerName
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          GlowButton,
          {
            type: "button",
            variant: "gold",
            size: "xl",
            shimmer: true,
            className: "w-full",
            onClick: onPay,
            "data-ocid": "purchase.step3.pay_button",
            children: [
              "🔒 ",
              t("Pagar y sellar", "Pay & seal")
            ]
          }
        )
      ]
    },
    "step3"
  );
}
function PaymentCard({
  method,
  selected,
  onSelect,
  icon,
  label,
  sublabel
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "button",
    {
      type: "button",
      onClick: () => onSelect(method),
      "aria-pressed": selected,
      "data-ocid": `purchase.payment.${method}`,
      className: cn(
        "w-full p-4 rounded-2xl border-2 text-left transition-smooth flex items-center gap-4",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary",
        selected ? "border-primary bg-primary/10 glow-gold" : "border-border bg-card hover:border-primary/40"
      ),
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-2xl", children: icon }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-body font-semibold text-foreground text-sm", children: label }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-body text-xs text-muted-foreground", children: sublabel })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: cn(
              "w-5 h-5 rounded-full border-2 transition-smooth shrink-0",
              selected ? "border-primary bg-primary" : "border-muted-foreground bg-transparent"
            )
          }
        )
      ]
    }
  );
}
function SealOverlay() {
  const { t } = useLanguage();
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.div,
    {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      exit: { opacity: 0 },
      className: "fixed inset-0 z-40 bg-background/90 backdrop-blur-sm flex flex-col items-center justify-center gap-6",
      "data-ocid": "purchase.seal_overlay",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          motion.div,
          {
            animate: { rotate: 360, scale: [1, 1.15, 1] },
            transition: {
              duration: 1.2,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear"
            },
            className: "text-6xl",
            "aria-hidden": "true",
            children: "🔮"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display text-2xl font-bold text-primary text-center", children: t("Sellando tu boleto...", "Sealing your ticket...") }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-1.5", children: [0, 1, 2].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          motion.span,
          {
            animate: { opacity: [0.3, 1, 0.3] },
            transition: {
              duration: 0.8,
              delay: i * 0.2,
              repeat: Number.POSITIVE_INFINITY
            },
            className: "w-2 h-2 rounded-full bg-primary"
          },
          i
        )) })
      ]
    }
  );
}
function SuccessPanel({ onViewWallet }) {
  const { t } = useLanguage();
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.div,
    {
      initial: { opacity: 0, scale: 0.92 },
      animate: { opacity: 1, scale: 1 },
      transition: { duration: 0.45, type: "spring", bounce: 0.3 },
      className: "flex flex-col items-center gap-6 py-8 text-center",
      "data-ocid": "purchase.success.section",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          motion.div,
          {
            initial: { scale: 0 },
            animate: { scale: 1 },
            transition: { delay: 0.2, type: "spring", bounce: 0.5 },
            className: "text-7xl",
            children: "🎟️"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-3xl font-black text-primary mb-2", children: t("¡Tu boleto está listo!", "Your ticket is ready!") }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-body text-muted-foreground text-sm max-w-xs mx-auto", children: t(
            "Tu suerte está sellada. Recuerda revisar el sorteo el día del evento.",
            "Your luck is sealed. Remember to check the draw on the event day."
          ) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          GlowButton,
          {
            type: "button",
            variant: "gold",
            size: "xl",
            shimmer: true,
            className: "w-full max-w-xs",
            onClick: onViewWallet,
            "data-ocid": "purchase.success.view_wallet_button",
            children: [
              t("Ver mi boleto", "View ticket"),
              " →"
            ]
          }
        )
      ]
    },
    "success"
  );
}
function Step4({
  lotteryId,
  numbers,
  serial,
  onSuccess
}) {
  const { lotteries, user } = useMockData();
  const { t } = useLanguage();
  const [selected, setSelected] = reactExports.useState("card");
  const [isSealing, setIsSealing] = reactExports.useState(false);
  const lottery = lotteries.find((l) => l.id === lotteryId);
  const handleConfirm = () => {
    setIsSealing(true);
    const newTicket = {
      id: `ticket-${Date.now()}`,
      lotteryId,
      lotteryName: (lottery == null ? void 0 : lottery.name) ?? "Sorteo",
      lotteryNameEs: (lottery == null ? void 0 : lottery.nameEs) ?? "Sorteo",
      drawId: (lottery == null ? void 0 : lottery.nextDrawId) ?? "draw-next",
      userId: user.id,
      numbers: numbers.filter((n) => n !== null),
      status: "Active",
      purchasedAt: (/* @__PURE__ */ new Date()).toISOString(),
      drawDate: (lottery == null ? void 0 : lottery.drawDate) ?? (/* @__PURE__ */ new Date()).toISOString(),
      price: (lottery == null ? void 0 : lottery.price) ?? 5,
      currency: (lottery == null ? void 0 : lottery.currency) ?? "USD",
      serialCode: serial,
      isPhygital: false
    };
    const stored = localStorage.getItem("lsbfl-tickets");
    const existing = stored ? JSON.parse(stored) : [];
    localStorage.setItem(
      "lsbfl-tickets",
      JSON.stringify([...existing, newTicket])
    );
    setTimeout(() => {
      setIsSealing(false);
      onSuccess();
    }, 2200);
  };
  const paymentMethods = [
    {
      method: "card",
      icon: "💳",
      label: t("Tarjeta de crédito", "Credit card"),
      sublabel: "Visa, Mastercard, AMEX"
    },
    {
      method: "crypto",
      icon: "₿",
      label: t("Cripto", "Crypto"),
      sublabel: "BTC, ETH, USDC, ICP"
    },
    {
      method: "balance",
      icon: "💰",
      label: t("Saldo interno", "Internal balance"),
      sublabel: `$${user.balance.toLocaleString()} ${user.currency} ${t("disponibles", "available")}`
    }
  ];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { children: isSealing && /* @__PURE__ */ jsxRuntimeExports.jsx(SealOverlay, {}) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        initial: { opacity: 0, x: 40 },
        animate: { opacity: 1, x: 0 },
        exit: { opacity: 0, x: -40 },
        transition: { duration: 0.35 },
        className: "flex flex-col gap-6",
        "data-ocid": "purchase.step4.section",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-2xl font-bold text-foreground", children: t("Método de pago", "Payment method") }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground font-body text-sm mt-1", children: t("Elige cómo quieres pagar tu boleto", "Choose how to pay") })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-col gap-3", "data-ocid": "purchase.payment_list", children: paymentMethods.map((pm) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            PaymentCard,
            {
              method: pm.method,
              selected: selected === pm.method,
              onSelect: setSelected,
              icon: pm.icon,
              label: pm.label,
              sublabel: pm.sublabel
            },
            pm.method
          )) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "rounded-2xl border border-border bg-muted/40 p-4 flex items-center justify-between",
              "data-ocid": "purchase.total_display",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-body text-sm text-muted-foreground", children: t("Total", "Total") }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-right", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-display text-xl font-black text-primary", children: [
                    "$",
                    (lottery == null ? void 0 : lottery.price) ?? 5,
                    " USD"
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-body text-xs text-muted-foreground", children: [
                    "~$",
                    (((lottery == null ? void 0 : lottery.price) ?? 5) * 20).toLocaleString(),
                    " MXN"
                  ] })
                ] })
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            GlowButton,
            {
              type: "button",
              variant: "gold",
              size: "xl",
              shimmer: true,
              className: "w-full",
              onClick: handleConfirm,
              disabled: isSealing,
              "data-ocid": "purchase.confirm_button",
              children: [
                "✅ ",
                t("Confirmar compra", "Confirm purchase")
              ]
            }
          )
        ]
      },
      "step4"
    )
  ] });
}
function PurchasePage() {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const { lotteryId } = useParams({ from: "/purchase/$lotteryId" });
  const { lotteries } = useMockData();
  const lottery = lotteries.find((l) => l.id === lotteryId);
  const [step, setStep] = reactExports.useState(1);
  const [numbers, setNumbers] = reactExports.useState(
    Array((lottery == null ? void 0 : lottery.numbersToSelect) ?? 6).fill(null)
  );
  const [serial] = reactExports.useState(
    () => `LSBFL-${(lotteryId ?? "XX").slice(-3).toUpperCase()}-${(/* @__PURE__ */ new Date()).getFullYear()}-${Math.random().toString(36).slice(2, 7).toUpperCase()}`
  );
  const [showConfetti, setShowConfetti] = reactExports.useState(false);
  const [confirmed, setConfirmed] = reactExports.useState(false);
  const handleSuccess = () => {
    setShowConfetti(true);
    setConfirmed(true);
  };
  const handleViewWallet = () => {
    navigate({ to: "/wallet" });
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "min-h-screen bg-ceremonial flex flex-col",
      "data-ocid": "purchase.page",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Confetti,
          {
            active: showConfetti,
            duration: 4e3,
            onComplete: () => setShowConfetti(false)
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "sticky top-0 z-20 bg-card/80 backdrop-blur-md border-b border-border/60 px-4 py-3 flex items-center gap-3", children: [
          !confirmed && step > 1 && /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              onClick: () => setStep((s) => s > 1 ? s - 1 : s),
              className: "w-9 h-9 rounded-xl flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted transition-smooth",
              "aria-label": t("Paso anterior", "Previous step"),
              "data-ocid": "purchase.back_button",
              children: "←"
            }
          ),
          (confirmed || step === 1) && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-9" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 flex justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display font-bold text-primary text-lg", children: t("Comprar boleto", "Buy ticket") }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              onClick: () => navigate({ to: "/home" }),
              className: "w-9 h-9 rounded-xl flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted transition-smooth",
              "aria-label": t("Cerrar", "Close"),
              "data-ocid": "purchase.close_button",
              children: "✕"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 px-4 pt-6 pb-10 max-w-lg mx-auto w-full", children: [
          !confirmed && /* @__PURE__ */ jsxRuntimeExports.jsx(StepDots, { current: step }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { mode: "wait", children: confirmed ? /* @__PURE__ */ jsxRuntimeExports.jsx(SuccessPanel, { onViewWallet: handleViewWallet }, "success") : step === 1 ? /* @__PURE__ */ jsxRuntimeExports.jsx(
            Step1,
            {
              lotteryId,
              onContinue: () => setStep(2)
            },
            "s1"
          ) : step === 2 ? /* @__PURE__ */ jsxRuntimeExports.jsx(
            Step2,
            {
              lotteryId,
              numbers,
              setNumbers,
              onPreview: () => setStep(3)
            },
            "s2"
          ) : step === 3 ? /* @__PURE__ */ jsxRuntimeExports.jsx(
            Step3,
            {
              lotteryId,
              numbers,
              serial,
              onPay: () => setStep(4)
            },
            "s3"
          ) : /* @__PURE__ */ jsxRuntimeExports.jsx(
            Step4,
            {
              lotteryId,
              numbers,
              serial,
              onSuccess: handleSuccess
            },
            "s4"
          ) })
        ] })
      ]
    }
  );
}
export {
  PurchasePage as default
};
