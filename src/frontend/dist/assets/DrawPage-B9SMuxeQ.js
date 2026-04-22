import { d as useParams, u as useNavigate, a as useLanguage, g as useTheme, r as reactExports, j as jsxRuntimeExports, b as cn, T as Ticket, f as ue, C as CircleCheck } from "./index-6HgylvRh.js";
import { C as Confetti } from "./Confetti-5Ih_F5-g.js";
import { C as CountdownTimer } from "./CountdownTimer-BuCJa6Ia.js";
import { G as GlowButton } from "./GlowButton-Duv2phZR.js";
import { u as useMockData } from "./useMockData-BjtQoZZA.js";
import { A as AnimatePresence } from "./index-DocTykfO.js";
import { m as motion } from "./proxy-HmngNdo3.js";
import { A as ArrowLeft } from "./arrow-left-BVM99XS0.js";
import { S as Shield } from "./shield-DvZ2_BE1.js";
function getDrawPageSurfaces(isDark) {
  return {
    pageBackground: isDark ? "radial-gradient(ellipse at 50% 0%, oklch(0.14 0.04 80 / 0.5) 0%, oklch(0.07 0.01 50) 60%)" : "radial-gradient(ellipse at 50% 0%, oklch(0.92 0.1 85 / 0.45) 0%, oklch(0.97 0.02 78) 55%), oklch(var(--background))",
    megaWinOverlay: isDark ? "oklch(0.06 0.01 50 / 0.9)" : "oklch(var(--background) / 0.92)",
    headerBackground: isDark ? "oklch(0.09 0.01 50 / 0.9)" : "oklch(var(--card) / 0.88)",
    countdownCard: isDark ? "oklch(0.12 0.02 80 / 0.5)" : "oklch(var(--card) / 0.82)",
    jackpotGoldShadow: isDark ? "0 0 40px oklch(0.72 0.18 80 / 0.4)" : "0 2px 20px oklch(0.55 0.12 80 / 0.2)",
    jackpotCardGoldShadow: isDark ? "0 0 30px oklch(0.72 0.18 80 / 0.3)" : "0 2px 16px oklch(0.55 0.12 80 / 0.18)",
    winBanner: isDark ? {
      background: "radial-gradient(ellipse at 50% 0%, oklch(0.18 0.06 80 / 0.8), oklch(0.1 0.02 80 / 0.4))",
      boxShadow: "0 0 40px oklch(0.72 0.18 80 / 0.3)"
    } : {
      background: "radial-gradient(ellipse at 50% 0%, oklch(0.95 0.08 85 / 0.9) 0%, oklch(var(--card)) 70%)",
      boxShadow: "0 8px 32px oklch(0.55 0.12 80 / 0.12)"
    },
    jackpotCard: isDark ? "oklch(0.11 0.02 80 / 0.6)" : "oklch(var(--card) / 0.92)",
    revealPlaceholder: isDark ? "oklch(0.12 0.02 80 / 0.4)" : "oklch(var(--muted) / 0.65)",
    resultsTable: isDark ? "oklch(0.10 0.01 50 / 0.7)" : "oklch(var(--card) / 0.96)",
    ticketWinnerBg: isDark ? "radial-gradient(ellipse at 0% 50%, oklch(0.15 0.05 80 / 0.6), oklch(0.10 0.01 50 / 0.8))" : "radial-gradient(ellipse at 0% 50%, oklch(0.92 0.12 85 / 0.65), oklch(var(--card)) 75%)",
    ticketWinnerBoxShadow: isDark ? "0 0 20px oklch(0.72 0.18 80 / 0.2)" : "0 4px 24px oklch(0.55 0.12 80 / 0.14)",
    winnerBadge: isDark ? {
      background: "oklch(0.72 0.18 80 / 0.15)",
      color: "oklch(0.88 0.18 80)"
    } : {
      background: "oklch(var(--primary) / 0.14)",
      color: "oklch(var(--primary))"
    },
    ticketLoserBg: isDark ? "oklch(0.10 0.01 50 / 0.7)" : "oklch(var(--muted) / 0.45)",
    ticketNumberMuted: isDark ? "oklch(0.14 0.01 50)" : "oklch(var(--muted))",
    nextDrawCard: isDark ? "oklch(0.10 0.02 80 / 0.4)" : "oklch(var(--card) / 0.88)",
    liveCtaCard: isDark ? "oklch(0.11 0.03 80 / 0.4)" : "oklch(var(--card) / 0.88)"
  };
}
const STAR_COUNT = 60;
const STARS = Array.from({ length: STAR_COUNT }, (_, i) => ({
  id: i,
  x: Math.random() * 100,
  y: Math.random() * 100,
  size: Math.random() * 2 + 0.5,
  delay: Math.random() * 4,
  duration: 2 + Math.random() * 3
}));
function Starfield() {
  const { isDark } = useTheme();
  if (!isDark) return null;
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      className: "absolute inset-0 overflow-hidden pointer-events-none",
      "aria-hidden": "true",
      children: STARS.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: "absolute rounded-full bg-primary animate-twinkle",
          style: {
            left: `${s.x}%`,
            top: `${s.y}%`,
            width: s.size,
            height: s.size,
            animationDelay: `${s.delay}s`,
            animationDuration: `${s.duration}s`
          }
        },
        s.id
      ))
    }
  );
}
function FairnessSeal({ t }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-secondary/40 bg-secondary/10", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Shield, { size: 13, className: "text-secondary" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-body font-semibold text-secondary tracking-wide", children: t(
      "Sorteo certificado · Blockchain verified",
      "Certified draw · Blockchain verified"
    ) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { size: 13, className: "text-secondary" })
  ] });
}
function GoldBall({
  number,
  size = "lg",
  delay = 0,
  animate: shouldAnimate = false
}) {
  const { isDark } = useTheme();
  const sizeMap = {
    sm: "w-10 h-10 text-sm",
    md: "w-12 h-12 text-base",
    lg: "w-16 h-16 text-xl"
  };
  const ballShadow = isDark ? "0 0 20px oklch(0.72 0.18 80 / 0.5), 0 4px 12px oklch(0 0 0 / 0.4), inset 0 1px 0 oklch(1 0 0 / 0.3)" : "0 0 18px oklch(0.65 0.14 80 / 0.45), 0 4px 10px oklch(0 0 0 / 0.12), inset 0 1px 0 oklch(1 0 0 / 0.45)";
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      className: cn(
        "rounded-full flex items-center justify-center font-mono font-black text-primary-foreground",
        "border-2 border-primary/60",
        sizeMap[size],
        shouldAnimate && "animate-ball-pop"
      ),
      style: {
        background: "radial-gradient(circle at 35% 35%, oklch(0.88 0.18 80), oklch(0.65 0.18 65) 55%, oklch(0.45 0.14 60))",
        boxShadow: ballShadow,
        animationDelay: `${delay}s`
      },
      "data-ocid": `draw.gold_ball.${number}`,
      children: number
    }
  );
}
const ORBIT_BALLS = [
  {
    num: "✦",
    orbitClass: "animate-orbit",
    size: 10,
    color: "oklch(0.72 0.18 80)"
  },
  {
    num: "●",
    orbitClass: "animate-orbit-reverse",
    size: 8,
    color: "oklch(0.55 0.12 160)"
  },
  {
    num: "◆",
    orbitClass: "animate-orbit-outer",
    size: 7,
    color: "oklch(0.72 0.18 80 / 0.7)"
  },
  {
    num: "✦",
    orbitClass: "animate-orbit",
    size: 9,
    color: "oklch(0.55 0.12 160 / 0.8)",
    style: { animationDelay: "1.2s" }
  },
  {
    num: "●",
    orbitClass: "animate-orbit-reverse",
    size: 6,
    color: "oklch(0.82 0.16 40)",
    style: { animationDelay: "0.6s" }
  },
  {
    num: "◆",
    orbitClass: "animate-orbit-outer",
    size: 8,
    color: "oklch(0.72 0.18 80 / 0.5)",
    style: { animationDelay: "1.8s" }
  }
];
function BallMachine({ spinning }) {
  const { t } = useLanguage();
  const { isDark } = useTheme();
  const machineBg = isDark ? "radial-gradient(ellipse at 30% 30%, oklch(0.16 0.03 80 / 0.8), oklch(0.08 0.01 50) 70%)" : "radial-gradient(ellipse at 30% 30%, oklch(0.99 0.02 80 / 0.95), oklch(0.9 0.04 78) 72%)";
  const machineShadow = isDark ? "0 0 40px oklch(0.72 0.18 80 / 0.3), 0 0 80px oklch(0.72 0.18 80 / 0.15), inset 0 0 30px oklch(0 0 0 / 0.5)" : "0 0 28px oklch(0.72 0.16 80 / 0.2), 0 8px 32px oklch(0 0 0 / 0.08), inset 0 0 24px oklch(1 0 0 / 0.65)";
  const centerGlow = isDark ? "radial-gradient(circle, oklch(0.72 0.18 80 / 0.3), transparent 70%)" : "radial-gradient(circle, oklch(0.72 0.18 80 / 0.22), transparent 70%)";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center gap-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: cn(
          "relative w-56 h-56 rounded-full border-2 border-primary/60 flex items-center justify-center",
          spinning && "animate-glow-pulse"
        ),
        style: {
          background: machineBg,
          boxShadow: machineShadow
        },
        "data-ocid": "draw.ball_machine",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "absolute inset-2 rounded-full border border-primary/20",
              style: { borderStyle: "dashed" }
            }
          ),
          spinning && ORBIT_BALLS.map((ball, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: cn(
                "absolute w-0 h-0 flex items-center justify-center",
                ball.orbitClass
              ),
              style: {
                ...ball.style ?? {},
                left: "50%",
                top: "50%",
                marginLeft: "-4px",
                marginTop: "-4px"
              },
              "aria-hidden": "true",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  className: "rounded-full",
                  style: {
                    width: ball.size,
                    height: ball.size,
                    background: ball.color
                  }
                }
              )
            },
            `orbit-${ball.orbitClass}-${i}-${ball.color.slice(0, 8)}`
          )),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "w-16 h-16 rounded-full flex items-center justify-center",
              style: {
                background: centerGlow
              },
              children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-3xl", "aria-hidden": "true", children: "🍀" })
            }
          )
        ]
      }
    ),
    spinning && /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "flex items-center gap-2",
        "data-ocid": "draw.spinning_indicator",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-body text-sm font-medium text-muted-foreground", children: t("Girando…", "Drawing…") }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-1", children: [0, 1, 2].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            "span",
            {
              className: "w-1.5 h-1.5 rounded-full bg-primary animate-pulse-dot",
              style: { animationDelay: `${i * 0.2}s` },
              "aria-hidden": "true"
            },
            i
          )) })
        ]
      }
    )
  ] });
}
function DrawPage() {
  const { drawId } = useParams({ from: "/draw/$drawId" });
  const navigate = useNavigate();
  const { t } = useLanguage();
  const { draws, tickets } = useMockData();
  const { isDark } = useTheme();
  const s = reactExports.useMemo(() => getDrawPageSurfaces(isDark), [isDark]);
  const draw = draws.find((d) => d.id === drawId) ?? draws[0];
  const userTickets = tickets.filter((tk) => tk.drawId === draw.id);
  const [phase, setPhase] = reactExports.useState(
    () => draw.status === "Completed" ? "done" : "pre"
  );
  const [revealedCount, setRevealedCount] = reactExports.useState(
    draw.status === "Completed" ? draw.drawnNumbers.length : 0
  );
  const [showConfetti, setShowConfetti] = reactExports.useState(false);
  const [showMegaWin, setShowMegaWin] = reactExports.useState(false);
  const [notified, setNotified] = reactExports.useState(false);
  const revealTimerRef = reactExports.useRef(null);
  const isWinner = userTickets.some((tk) => tk.status === "Winner");
  const matchedCount = userTickets.reduce(
    (max, tk) => Math.max(max, (tk.matchedNumbers ?? []).length),
    0
  );
  const isMegaWin = matchedCount >= 3;
  const vibrate = reactExports.useCallback((pattern) => {
    if ("vibrate" in navigator) navigator.vibrate(pattern);
  }, []);
  reactExports.useEffect(() => {
    return () => {
      if (revealTimerRef.current) clearTimeout(revealTimerRef.current);
    };
  }, []);
  const handleStartDraw = reactExports.useCallback(async () => {
    setPhase("spinning");
    vibrate([100, 50, 100]);
    await new Promise((r) => setTimeout(r, 3e3));
    setPhase("revealing");
    vibrate([30]);
    let count = 0;
    const reveal = () => {
      count++;
      setRevealedCount(count);
      vibrate([80]);
      if (count < draw.drawnNumbers.length) {
        revealTimerRef.current = setTimeout(reveal, 600);
      } else {
        revealTimerRef.current = setTimeout(() => {
          setPhase("done");
          if (isWinner) {
            vibrate([200, 100, 200, 100, 400]);
            setShowConfetti(true);
            if (isMegaWin) setShowMegaWin(true);
          }
        }, 800);
      }
    };
    revealTimerRef.current = setTimeout(reveal, 400);
  }, [draw.drawnNumbers.length, isWinner, isMegaWin, vibrate]);
  const handleNotify = () => {
    setNotified(true);
    ue.success(
      t(
        "¡Te avisaremos cuando empiece el sorteo!",
        "We'll notify you when the draw starts!"
      ),
      {
        icon: "🔔"
      }
    );
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      Confetti,
      {
        active: showConfetti,
        duration: 4500,
        onComplete: () => setShowConfetti(false)
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { children: showMegaWin && /* @__PURE__ */ jsxRuntimeExports.jsx(
      motion.div,
      {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        exit: { opacity: 0 },
        className: "fixed inset-0 z-40 flex items-center justify-center",
        style: { background: s.megaWinOverlay },
        "data-ocid": "draw.mega_win_overlay",
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            className: "text-center px-8",
            initial: { scale: 0.5, opacity: 0 },
            animate: { scale: 1, opacity: 1 },
            transition: { type: "spring", stiffness: 200, delay: 0.1 },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-8xl mb-4", "aria-hidden": "true", children: "🎉" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "h2",
                {
                  className: "font-display text-5xl font-black mb-2",
                  style: { color: "oklch(0.88 0.18 80)" },
                  children: t("¡GANASTE!", "YOU WON!")
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-body text-lg text-muted-foreground mb-8", children: t(
                `¡${matchedCount} números coinciden!`,
                `${matchedCount} numbers match!`
              ) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                GlowButton,
                {
                  type: "button",
                  variant: "gold",
                  size: "xl",
                  shimmer: true,
                  onClick: () => setShowMegaWin(false),
                  "data-ocid": "draw.mega_win_close_button",
                  children: t("¡Ver mi premio!", "See my prize!")
                }
              )
            ]
          }
        )
      }
    ) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "min-h-screen relative overflow-x-hidden",
        style: { background: s.pageBackground },
        "data-ocid": "draw.page",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Starfield, {}),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "header",
            {
              className: "sticky top-0 z-20 border-b border-primary/20 px-4 py-3 flex items-center gap-3",
              style: {
                background: s.headerBackground,
                backdropFilter: "blur(12px)"
              },
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    type: "button",
                    onClick: () => navigate({ to: "/home" }),
                    className: "p-2 rounded-xl text-muted-foreground hover:text-foreground hover:bg-muted/20 transition-smooth",
                    "data-ocid": "draw.back_button",
                    "aria-label": t("Volver", "Go back"),
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { size: 20 })
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-lg font-bold text-foreground flex-1 truncate min-w-0", children: draw.lotteryName }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "span",
                  {
                    className: cn(
                      "text-xs font-body font-semibold px-2.5 py-1 rounded-full border shrink-0",
                      phase === "done" ? "bg-secondary/20 text-secondary border-secondary/40" : phase === "spinning" || phase === "revealing" ? "bg-primary/20 text-primary border-primary/40 animate-pulse" : "bg-muted/40 text-muted-foreground border-border"
                    ),
                    "data-ocid": "draw.status_badge",
                    children: phase === "done" ? t("Completado", "Completed") : phase === "spinning" ? t("En vivo", "Live") : phase === "revealing" ? t("Revelando", "Revealing") : t("Próximo", "Upcoming")
                  }
                )
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-lg mx-auto px-4 py-8 space-y-8", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(AnimatePresence, { mode: "wait", children: [
              phase === "pre" && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                motion.div,
                {
                  initial: { opacity: 0, y: 20 },
                  animate: { opacity: 1, y: 0 },
                  exit: { opacity: 0, y: -20 },
                  className: "flex flex-col items-center gap-8 py-4",
                  "data-ocid": "draw.pre_draw_section",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center space-y-2", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-body text-xs uppercase tracking-[0.3em] text-primary/80", children: t("Próximo sorteo", "Next draw") }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "h2",
                        {
                          className: "font-display text-6xl font-black",
                          style: {
                            color: "oklch(0.88 0.18 80)",
                            textShadow: s.jackpotGoldShadow
                          },
                          children: draw.jackpotFormatted
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-body text-sm text-muted-foreground", children: "Classic 6/45 · USD" })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      "div",
                      {
                        className: "rounded-2xl border border-primary/20 p-6 text-center w-full",
                        style: {
                          background: s.countdownCard,
                          backdropFilter: "blur(8px)"
                        },
                        "data-ocid": "draw.countdown_card",
                        children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-body text-xs uppercase tracking-widest text-muted-foreground mb-4", children: t("El sorteo comienza en", "Draw begins in") }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            CountdownTimer,
                            {
                              targetDate: draw.scheduledAt,
                              className: "justify-center [&_.font-mono]:text-4xl [&_.font-mono]:font-black"
                            }
                          )
                        ]
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      GlowButton,
                      {
                        type: "button",
                        variant: notified ? "ghost" : "gold",
                        size: "xl",
                        shimmer: !notified,
                        onClick: handleNotify,
                        disabled: notified,
                        "data-ocid": "draw.notify_button",
                        className: "w-full max-w-xs",
                        children: notified ? `🔔 ${t("¡Listo, te avisamos!", "You'll be notified!")}` : `🔔 ${t("Notificarme / Notify me", "Notify me")}`
                      }
                    ),
                    draw.drawnNumbers.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(
                      GlowButton,
                      {
                        type: "button",
                        variant: "outline",
                        size: "lg",
                        onClick: handleStartDraw,
                        "data-ocid": "draw.watch_live_button",
                        className: "w-full max-w-xs",
                        children: t("Ver sorteo en vivo →", "Watch live draw →")
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(FairnessSeal, { t })
                  ]
                },
                "pre"
              ),
              phase === "spinning" && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                motion.div,
                {
                  initial: { opacity: 0, scale: 0.9 },
                  animate: { opacity: 1, scale: 1 },
                  exit: { opacity: 0, scale: 1.05 },
                  className: "flex flex-col items-center gap-6 py-4",
                  "data-ocid": "draw.spinning_section",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "p",
                      {
                        className: "font-display text-2xl font-bold tracking-wide text-center",
                        style: { color: "oklch(0.88 0.18 80)" },
                        children: t("Sorteo en curso…", "Draw in progress…")
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(BallMachine, { spinning: true }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-body text-sm text-muted-foreground text-center max-w-xs", children: t(
                      "Las bolas están girando. El universo decide tu destino.",
                      "The balls are spinning. The universe decides your fate."
                    ) })
                  ]
                },
                "spinning"
              ),
              phase === "revealing" && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                motion.div,
                {
                  initial: { opacity: 0 },
                  animate: { opacity: 1 },
                  exit: { opacity: 0 },
                  className: "flex flex-col items-center gap-8 py-4",
                  "data-ocid": "draw.revealing_section",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(BallMachine, { spinning: false }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center space-y-2", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "p",
                        {
                          className: "font-display text-xl font-bold",
                          style: { color: "oklch(0.88 0.18 80)" },
                          children: t("Números revelados", "Numbers revealed")
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-body text-sm text-muted-foreground", children: [
                        revealedCount,
                        "/",
                        draw.drawnNumbers.length
                      ] })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      "div",
                      {
                        className: "flex flex-wrap justify-center gap-3",
                        "data-ocid": "draw.reveal_row",
                        "aria-live": "polite",
                        "aria-label": t("Números sorteados", "Drawn numbers"),
                        children: [
                          draw.drawnNumbers.slice(0, revealedCount).map((n, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                            GoldBall,
                            {
                              number: n,
                              size: "lg",
                              animate: i === revealedCount - 1
                            },
                            n
                          )),
                          draw.drawnNumbers.slice(revealedCount).map((n) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "div",
                            {
                              className: "w-16 h-16 rounded-full border-2 border-primary/20 flex items-center justify-center animate-pulse",
                              style: { background: s.revealPlaceholder },
                              "aria-hidden": "true",
                              children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary/30 font-mono text-xl font-bold", children: "?" })
                            },
                            `placeholder-${n}`
                          ))
                        ]
                      }
                    )
                  ]
                },
                "revealing"
              ),
              phase === "done" && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                motion.div,
                {
                  initial: { opacity: 0, y: 16 },
                  animate: { opacity: 1, y: 0 },
                  transition: { duration: 0.5 },
                  className: "space-y-8",
                  "data-ocid": "draw.results_section",
                  children: [
                    isWinner && !showMegaWin && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      motion.div,
                      {
                        initial: { opacity: 0, scale: 0.9 },
                        animate: { opacity: 1, scale: 1 },
                        transition: { type: "spring", stiffness: 200 },
                        className: "rounded-2xl border border-primary/50 p-5 text-center",
                        style: s.winBanner,
                        "data-ocid": "draw.win_banner",
                        children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-4xl mb-2", "aria-hidden": "true", children: "🎉" }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "p",
                            {
                              className: "font-display text-2xl font-black",
                              style: { color: "oklch(0.88 0.18 80)" },
                              children: t(
                                "¡Tienes un número ganador!",
                                "You have a winning number!"
                              )
                            }
                          ),
                          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-body text-sm text-muted-foreground mt-1", children: t(
                            `${matchedCount} coincidencias encontradas`,
                            `${matchedCount} matches found`
                          ) })
                        ]
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      motion.div,
                      {
                        initial: { opacity: 0, scale: 0.95 },
                        animate: { opacity: 1, scale: 1 },
                        transition: { delay: 0.1 },
                        className: "rounded-2xl border border-primary/20 p-6 text-center",
                        style: {
                          background: s.jackpotCard,
                          backdropFilter: "blur(8px)"
                        },
                        "data-ocid": "draw.jackpot_card",
                        children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-body text-xs uppercase tracking-[0.25em] text-primary/80 mb-1", children: t("Premio Mayor", "Jackpot") }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "p",
                            {
                              className: "font-display text-5xl font-black",
                              style: {
                                color: "oklch(0.88 0.18 80)",
                                textShadow: s.jackpotCardGoldShadow
                              },
                              children: draw.jackpotFormatted
                            }
                          ),
                          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-body text-sm text-muted-foreground mt-1", children: [
                            draw.totalTickets.toLocaleString(),
                            " ",
                            t("boletos vendidos", "tickets sold"),
                            draw.winnersCount > 0 && ` · ${draw.winnersCount} ${t("ganador(es)", "winner(s)")}`
                          ] })
                        ]
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { "data-ocid": "draw.final_numbers", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-4", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-lg font-bold text-foreground", children: t("Números Sorteados", "Drawn Numbers") }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(FairnessSeal, { t })
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-3 justify-center", children: draw.drawnNumbers.map((n, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                        motion.div,
                        {
                          initial: { opacity: 0, scale: 0, rotate: -180 },
                          animate: { opacity: 1, scale: 1, rotate: 0 },
                          transition: {
                            delay: i * 0.08,
                            type: "spring",
                            stiffness: 180
                          },
                          "data-ocid": `draw.drawn_number.${i + 1}`,
                          children: /* @__PURE__ */ jsxRuntimeExports.jsx(GoldBall, { number: n, size: "lg" })
                        },
                        n
                      )) })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      motion.div,
                      {
                        initial: { opacity: 0, y: 12 },
                        animate: { opacity: 1, y: 0 },
                        transition: { delay: 0.4 },
                        className: "rounded-2xl border border-border/40 overflow-hidden",
                        style: { background: s.resultsTable },
                        "data-ocid": "draw.results_table",
                        children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-4 py-3 border-b border-border/30", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-body text-xs font-semibold uppercase tracking-widest text-muted-foreground", children: t("Detalles del Sorteo", "Draw Details") }) }),
                          [
                            { label: t("ID del sorteo", "Draw ID"), value: draw.id },
                            {
                              label: t("Fecha", "Date"),
                              value: draw.completedAt ? new Date(draw.completedAt).toLocaleString() : new Date(draw.scheduledAt).toLocaleString()
                            },
                            {
                              label: t("Boletos totales", "Total tickets"),
                              value: draw.totalTickets.toLocaleString()
                            },
                            {
                              label: t("Ganadores", "Winners"),
                              value: String(draw.winnersCount)
                            }
                          ].map(({ label, value }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                            "div",
                            {
                              className: "flex items-center justify-between px-4 py-3 border-b border-border/20 last:border-0",
                              children: [
                                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-body text-sm text-muted-foreground", children: label }),
                                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-sm text-foreground text-right ml-4 truncate max-w-[60%]", children: value })
                              ]
                            },
                            label
                          ))
                        ]
                      }
                    ),
                    userTickets.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      motion.div,
                      {
                        initial: { opacity: 0, y: 12 },
                        animate: { opacity: 1, y: 0 },
                        transition: { delay: 0.5 },
                        "data-ocid": "draw.user_tickets_section",
                        children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-base font-bold text-foreground mb-3", children: t(
                            "Tus boletos en este sorteo",
                            "Your tickets in this draw"
                          ) }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: userTickets.map((ticket, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                            "div",
                            {
                              className: cn(
                                "rounded-2xl border p-4",
                                ticket.status === "Winner" ? "border-primary/50" : "border-border/40"
                              ),
                              style: {
                                background: ticket.status === "Winner" ? s.ticketWinnerBg : s.ticketLoserBg,
                                boxShadow: ticket.status === "Winner" ? s.ticketWinnerBoxShadow : void 0
                              },
                              "data-ocid": `draw.user_ticket.${i + 1}`,
                              children: [
                                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-3", children: [
                                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-mono text-xs text-muted-foreground", children: ticket.serialCode }),
                                  ticket.status === "Winner" && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                                    "span",
                                    {
                                      className: "text-xs px-2.5 py-1 rounded-full font-body font-semibold border border-primary/40",
                                      style: s.winnerBadge,
                                      children: [
                                        "🏆 ",
                                        t("¡Ganaste!", "Winner!")
                                      ]
                                    }
                                  )
                                ] }),
                                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-2 flex-wrap", children: ticket.numbers.map((n) => {
                                  const matched = draw.drawnNumbers.includes(n);
                                  return matched ? /* @__PURE__ */ jsxRuntimeExports.jsx(GoldBall, { number: n, size: "sm" }, n) : /* @__PURE__ */ jsxRuntimeExports.jsx(
                                    "div",
                                    {
                                      className: "w-10 h-10 rounded-full flex items-center justify-center border border-border/40 font-mono text-sm font-bold text-muted-foreground",
                                      style: {
                                        background: s.ticketNumberMuted
                                      },
                                      children: n
                                    },
                                    n
                                  );
                                }) })
                              ]
                            },
                            ticket.id
                          )) })
                        ]
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      motion.div,
                      {
                        initial: { opacity: 0, y: 12 },
                        animate: { opacity: 1, y: 0 },
                        transition: { delay: 0.6 },
                        className: "flex flex-col gap-3 pt-2",
                        children: [
                          isWinner && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                            GlowButton,
                            {
                              type: "button",
                              variant: "gold",
                              size: "xl",
                              shimmer: true,
                              onClick: () => navigate({ to: "/wallet" }),
                              "data-ocid": "draw.claim_prize_button",
                              className: "w-full",
                              children: [
                                /* @__PURE__ */ jsxRuntimeExports.jsx(Ticket, { size: 18 }),
                                t("Reclamar mi premio", "Claim my prize")
                              ]
                            }
                          ),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            GlowButton,
                            {
                              type: "button",
                              variant: isWinner ? "ghost" : "outline",
                              size: "lg",
                              onClick: () => navigate({ to: "/wallet" }),
                              "data-ocid": "draw.check_tickets_button",
                              className: "w-full",
                              children: t("Ver mis boletos", "Check my tickets")
                            }
                          )
                        ]
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      motion.div,
                      {
                        initial: { opacity: 0 },
                        animate: { opacity: 1 },
                        transition: { delay: 0.7 },
                        className: "rounded-2xl border border-border/30 p-5 text-center",
                        style: { background: s.nextDrawCard },
                        "data-ocid": "draw.next_draw_card",
                        children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-body text-xs uppercase tracking-widest text-muted-foreground mb-3", children: t("Próximo sorteo", "Next draw") }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            CountdownTimer,
                            {
                              targetDate: new Date(
                                Date.now() + 7 * 24 * 60 * 60 * 1e3
                              ).toISOString(),
                              className: "justify-center"
                            }
                          ),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            GlowButton,
                            {
                              type: "button",
                              variant: "gold",
                              size: "md",
                              shimmer: true,
                              onClick: () => navigate({
                                to: "/purchase/$lotteryId",
                                params: { lotteryId: draw.lotteryId }
                              }),
                              "data-ocid": "draw.buy_next_button",
                              className: "mt-4",
                              children: t("Comprar boleto →", "Buy ticket →")
                            }
                          )
                        ]
                      }
                    )
                  ]
                },
                "done"
              )
            ] }),
            phase === "pre" && draw.drawnNumbers.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(
              motion.div,
              {
                initial: { opacity: 0, y: 16 },
                animate: { opacity: 1, y: 0 },
                transition: { delay: 0.3 },
                className: "rounded-2xl border border-primary/30 p-6 text-center",
                style: {
                  background: s.liveCtaCard,
                  backdropFilter: "blur(8px)"
                },
                "data-ocid": "draw.live_cta",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display text-lg font-bold text-foreground mb-1", children: t("¿Listo para el show?", "Ready for the show?") }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-body text-sm text-muted-foreground mb-4", children: t(
                    "Cuando llegue el momento, las bolas girarán aquí en vivo.",
                    "When the time comes, the balls will spin live right here."
                  ) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    GlowButton,
                    {
                      type: "button",
                      variant: "outline",
                      size: "lg",
                      onClick: handleStartDraw,
                      "data-ocid": "draw.demo_watch_button",
                      className: "w-full",
                      children: t("Ver demo del sorteo ✨", "Watch draw demo ✨")
                    }
                  )
                ]
              }
            )
          ] })
        ]
      }
    )
  ] });
}
export {
  DrawPage as default
};
