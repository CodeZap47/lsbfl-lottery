import { c as createLucideIcon, d as useParams, u as useNavigate, a as useLanguage, r as reactExports, j as jsxRuntimeExports, b as cn, L as Link, S as Star, C as CircleCheck, M as MapPin, f as ue } from "./index-6HgylvRh.js";
import { C as Confetti } from "./Confetti-5Ih_F5-g.js";
import { G as GlowButton } from "./GlowButton-Duv2phZR.js";
import { l as loadPayoutProfile, P as PAYOUT_OPTIONS } from "./payoutProfileStorage-d_9Ed9L1.js";
import { u as useMockData } from "./useMockData-BjtQoZZA.js";
import { A as ArrowLeft } from "./arrow-left-BVM99XS0.js";
import { A as AnimatePresence } from "./index-DocTykfO.js";
import { m as motion } from "./proxy-HmngNdo3.js";
import { S as Sparkles } from "./sparkles-B2suCNYQ.js";
import { S as ShieldCheck } from "./shield-check-mivpJYFB.js";
import { D as Download } from "./download-BZCZBIpE.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["rect", { width: "18", height: "11", x: "3", y: "11", rx: "2", ry: "2", key: "1w4ew1" }],
  ["path", { d: "M7 11V7a5 5 0 0 1 10 0v4", key: "fwvmzm" }]
];
const Lock = createLucideIcon("lock", __iconNode);
function WinningNumbers({
  numbers,
  matched
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-2 justify-center", children: numbers.map((n) => {
    const isMatch = matched == null ? void 0 : matched.includes(n);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      motion.span,
      {
        initial: { scale: 0, opacity: 0 },
        animate: { scale: 1, opacity: 1 },
        transition: { type: "spring", stiffness: 400, damping: 20 },
        className: cn(
          "w-10 h-10 rounded-full flex items-center justify-center font-display font-black text-sm border-2 transition-smooth",
          isMatch ? "bg-secondary text-secondary-foreground border-secondary/60 shadow-[0_0_12px_oklch(var(--secondary)/0.5)]" : "bg-primary text-primary-foreground border-primary/60 shadow-[0_0_12px_oklch(var(--primary)/0.4)]"
        ),
        children: n
      },
      n
    );
  }) });
}
function FoilTicketCard({
  ticket,
  t
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: cn(
        "relative ticket-card border overflow-hidden foil-ticket-surface",
        "border-primary/25 dark:border-primary/40"
      ),
      "data-ocid": "prize.foil_ticket_card",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "foil-ticket-shimmer absolute inset-0 pointer-events-none",
            "aria-hidden": "true"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-1 px-4 pt-3", "aria-hidden": "true", children: Array.from({ length: 14 }, (_, i) => i).map((i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "flex-1 h-[2px] rounded-full bg-primary/12 dark:bg-primary/20"
          },
          `top-perf-${i}`
        )) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-6 py-5 space-y-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-body text-xs uppercase tracking-[0.25em] text-primary/80 dark:text-primary/70 mb-1", children: [
                "LSBFL · ",
                t(ticket.lotteryNameEs, ticket.lotteryName)
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-mono text-xs text-muted-foreground/75 dark:text-muted-foreground/60", children: ticket.serialCode })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 bg-secondary/15 border border-secondary/35 dark:bg-secondary/20 dark:border-secondary/30 rounded-xl px-3 py-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldCheck, { size: 13, className: "text-secondary" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-body text-xs font-semibold text-secondary", children: t("Verificado", "Verified") })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            WinningNumbers,
            {
              numbers: ticket.numbers,
              matched: ticket.matchedNumbers
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between text-xs font-mono", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-muted-foreground/70 dark:text-muted-foreground/60", children: [
              t("Sorteo", "Draw"),
              ":",
              " ",
              new Date(ticket.drawDate).toLocaleDateString("es-MX", {
                day: "2-digit",
                month: "short",
                year: "numeric"
              })
            ] }),
            ticket.isPhygital && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-primary/70 dark:text-primary/60 flex items-center gap-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { size: 10 }),
              t("Phygital", "Phygital")
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-1 px-4 pb-3", "aria-hidden": "true", children: Array.from({ length: 14 }, (_, i) => i).map((i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "flex-1 h-[2px] rounded-full bg-primary/12 dark:bg-primary/20"
          },
          `bot-perf-${i}`
        )) })
      ]
    }
  );
}
function CelebrateStep({
  prizeAmount,
  ticketName,
  drawDate,
  ticket,
  onContinue,
  t
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.div,
    {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      exit: { opacity: 0 },
      className: "space-y-8",
      "data-ocid": "prize.celebrate_section",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center pt-4 space-y-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.div,
            {
              initial: { scale: 0.4, opacity: 0 },
              animate: { scale: 1, opacity: 1 },
              transition: {
                type: "spring",
                stiffness: 260,
                damping: 18,
                delay: 0.1
              },
              className: "inline-flex items-center gap-2 bg-primary/10 border border-primary/30 rounded-full px-4 py-2",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { size: 16, className: "text-primary animate-pulse" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-body text-sm font-semibold text-primary uppercase tracking-widest", children: t("Ganador verificado", "Verified winner") }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { size: 16, className: "text-primary animate-pulse" })
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            motion.h1,
            {
              initial: { scale: 0.5, opacity: 0, y: 20 },
              animate: { scale: 1, opacity: 1, y: 0 },
              transition: {
                type: "spring",
                stiffness: 200,
                damping: 15,
                delay: 0.25
              },
              className: "font-display font-black text-5xl sm:text-6xl leading-none",
              style: {
                color: "oklch(var(--primary))",
                textShadow: "0 0 40px oklch(var(--primary) / 0.5)"
              },
              children: "¡GANASTE!"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            motion.p,
            {
              initial: { opacity: 0 },
              animate: { opacity: 1 },
              transition: { delay: 0.5 },
              className: "font-display text-xl text-muted-foreground font-semibold",
              children: "YOU WON"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.div,
            {
              initial: { scale: 0.8, opacity: 0 },
              animate: { scale: 1, opacity: 1 },
              transition: {
                type: "spring",
                stiffness: 150,
                damping: 12,
                delay: 0.4
              },
              className: "py-2",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "span",
                  {
                    className: "font-display font-black text-7xl sm:text-8xl block",
                    style: {
                      color: "oklch(var(--primary))",
                      textShadow: "0 0 60px oklch(var(--primary) / 0.6), 0 0 120px oklch(var(--primary) / 0.2)"
                    },
                    children: [
                      "$",
                      prizeAmount.toLocaleString()
                    ]
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-body text-sm text-muted-foreground", children: "USD" })
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.div,
            {
              initial: { opacity: 0, y: 8 },
              animate: { opacity: 1, y: 0 },
              transition: { delay: 0.6 },
              className: "flex items-center justify-center gap-3 text-xs font-body text-muted-foreground",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: ticketName }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-1 h-1 rounded-full bg-muted-foreground/40" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: new Date(drawDate).toLocaleDateString("es-MX", {
                  day: "2-digit",
                  month: "short",
                  year: "numeric"
                }) })
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.div,
            {
              initial: { opacity: 0, y: 10 },
              animate: { opacity: 1, y: 0 },
              transition: { delay: 0.75 },
              className: "inline-flex items-center gap-2 bg-primary/15 border border-primary/40 rounded-2xl px-5 py-2.5",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Star, { size: 16, className: "text-primary fill-primary" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display font-bold text-primary text-sm", children: t(
                  "Boleto ganador · Winner ticket",
                  "Winner ticket · Boleto ganador"
                ) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(Star, { size: 16, className: "text-primary fill-primary" })
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          motion.div,
          {
            initial: { opacity: 0, y: 24 },
            animate: { opacity: 1, y: 0 },
            transition: { delay: 0.65, duration: 0.5 },
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(FoilTicketCard, { ticket, t })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          motion.div,
          {
            initial: { opacity: 0, y: 16 },
            animate: { opacity: 1, y: 0 },
            transition: { delay: 0.85 },
            className: "pt-2",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              GlowButton,
              {
                type: "button",
                variant: "gold",
                size: "xl",
                shimmer: true,
                className: "w-full",
                onClick: onContinue,
                "data-ocid": "prize.celebrate_continue_button",
                children: t("Reclamar premio →", "Claim prize →")
              }
            )
          }
        )
      ]
    }
  );
}
function PayoutStep({
  selected,
  onSelect,
  onContinue,
  prizeAmount,
  t
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.div,
    {
      initial: { opacity: 0, x: 40 },
      animate: { opacity: 1, x: 0 },
      exit: { opacity: 0, x: -40 },
      className: "space-y-6",
      "data-ocid": "prize.payout_section",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-2xl font-black text-foreground mb-1", children: t("¿Cómo quieres recibir", "How would you like") }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-2xl font-black text-primary mb-2", children: t("tu premio?", "your prize?") }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-body text-sm text-muted-foreground", children: [
            "$",
            prizeAmount.toLocaleString(),
            " USD",
            " ",
            t("listos para ti", "ready for you")
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", "data-ocid": "prize.payout_options_list", children: PAYOUT_OPTIONS.map((opt, i) => {
          const isSelected = selected === opt.key;
          return /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.button,
            {
              type: "button",
              initial: { opacity: 0, y: 12 },
              animate: { opacity: 1, y: 0 },
              transition: { delay: i * 0.08 },
              onClick: () => onSelect(opt.key),
              "data-ocid": `prize.payout_option.${i + 1}`,
              className: cn(
                "w-full ticket-card p-4 border text-left transition-smooth flex items-start gap-4",
                isSelected ? "border-primary/60 bg-primary/10 shadow-[0_0_20px_oklch(var(--primary)/0.2)]" : "border-border bg-card hover:border-primary/30 hover:bg-primary/5"
              ),
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-3xl flex-shrink-0", children: opt.icon }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-0.5", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display text-base font-bold text-foreground", children: t(opt.titleEs, opt.titleEn) }),
                    isSelected && /* @__PURE__ */ jsxRuntimeExports.jsx(
                      CircleCheck,
                      {
                        size: 16,
                        className: "text-primary flex-shrink-0"
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-body text-xs text-muted-foreground", children: [
                    t(opt.subtitleEs, opt.subtitleEn),
                    opt.linkTo && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                      " · ",
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        Link,
                        {
                          to: opt.linkTo,
                          className: "text-primary underline underline-offset-2 hover:text-primary/80",
                          onClick: (e) => e.stopPropagation(),
                          "data-ocid": `prize.payout_option_link.${opt.key}`,
                          children: t(opt.linkEs ?? "", opt.linkEn ?? "")
                        }
                      )
                    ] })
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    className: cn(
                      "w-5 h-5 rounded-full border-2 flex-shrink-0 mt-0.5 transition-smooth",
                      isSelected ? "border-primary bg-primary" : "border-border bg-transparent"
                    ),
                    children: isSelected && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-full h-full rounded-full bg-primary-foreground scale-50 block" })
                  }
                )
              ]
            },
            opt.key
          );
        }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          GlowButton,
          {
            type: "button",
            variant: "gold",
            size: "xl",
            shimmer: true,
            className: "w-full",
            disabled: !selected,
            onClick: onContinue,
            "data-ocid": "prize.payout_continue_button",
            children: t("Continuar →", "Continue →")
          }
        ),
        !selected && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-center font-body text-xs text-muted-foreground", children: t(
          "Selecciona una opción para continuar",
          "Select an option to continue"
        ) })
      ]
    }
  );
}
function VerifyStep({
  onVerified,
  t
}) {
  const [verifying, setVerifying] = reactExports.useState(false);
  const [form, setForm] = reactExports.useState({
    name: "",
    email: "",
    country: "",
    doc: ""
  });
  const isValid = form.name && form.email && form.country && form.doc;
  const handleVerify = async () => {
    setVerifying(true);
    await new Promise((r) => setTimeout(r, 1800));
    setVerifying(false);
    onVerified();
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.div,
    {
      initial: { opacity: 0, x: 40 },
      animate: { opacity: 1, x: 0 },
      exit: { opacity: 0, x: -40 },
      className: "space-y-6",
      "data-ocid": "prize.verify_section",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-14 h-14 rounded-2xl bg-primary/15 border border-primary/30 flex items-center justify-center mx-auto mb-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldCheck, { size: 28, className: "text-primary" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-2xl font-black text-foreground mb-2", children: t("Verificar identidad", "Verify identity") }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-body text-sm text-muted-foreground max-w-xs mx-auto", children: t(
            "Para premios mayores a $1,000 requerimos verificar tu identidad.",
            "For prizes over $1,000 we need to verify your identity."
          ) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-4", "data-ocid": "prize.verify_form", children: [
          {
            id: "name",
            labelEs: "Nombre completo",
            labelEn: "Full name",
            type: "text",
            placeholder: "Ana García López",
            ocid: "prize.verify_name_input"
          },
          {
            id: "email",
            labelEs: "Email",
            labelEn: "Email",
            type: "email",
            placeholder: "ana@correo.mx",
            ocid: "prize.verify_email_input"
          },
          {
            id: "country",
            labelEs: "País",
            labelEn: "Country",
            type: "text",
            placeholder: "México",
            ocid: "prize.verify_country_input"
          },
          {
            id: "doc",
            labelEs: "Número de documento",
            labelEn: "Document number",
            type: "text",
            placeholder: "CURP / DNI / Passport",
            ocid: "prize.verify_doc_input"
          }
        ].map((field) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "label",
            {
              htmlFor: `verify-${field.id}`,
              className: "font-body text-sm font-medium text-foreground",
              children: t(field.labelEs, field.labelEn)
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              id: `verify-${field.id}`,
              type: field.type,
              placeholder: field.placeholder,
              value: form[field.id],
              onChange: (e) => setForm((f) => ({ ...f, [field.id]: e.target.value })),
              "data-ocid": field.ocid,
              className: cn(
                "w-full h-12 px-4 rounded-2xl border border-input bg-card text-foreground",
                "font-body text-sm placeholder:text-muted-foreground/50",
                "focus:outline-none focus:ring-2 focus:ring-ring focus:border-primary/40",
                "transition-smooth"
              )
            }
          )
        ] }, field.id)) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-3 bg-muted/40 border border-border rounded-2xl px-4 py-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Lock,
            {
              size: 16,
              className: "text-muted-foreground flex-shrink-0 mt-0.5"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-body text-xs text-muted-foreground leading-relaxed", children: t(
            "Tu información está protegida y encriptada. Solo se usa para verificar tu premio.",
            "Your information is protected and encrypted. Only used to verify your prize."
          ) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          GlowButton,
          {
            type: "button",
            variant: "gold",
            size: "xl",
            shimmer: true,
            className: "w-full",
            disabled: !isValid,
            loading: verifying,
            onClick: handleVerify,
            "data-ocid": "prize.verify_submit_button",
            children: t("Verificar identidad", "Verify identity")
          }
        )
      ]
    }
  );
}
function ConfirmedStep({
  selectedPayout,
  prizeAmount,
  t
}) {
  const navigate = useNavigate();
  const etaEs = selectedPayout === "Wallet" ? "Instantáneo" : selectedPayout === "StoreCredit" ? "En tienda" : "2–5 días hábiles";
  const etaEn = selectedPayout === "Wallet" ? "Instant" : selectedPayout === "StoreCredit" ? "At store" : "2–5 business days";
  const methodOpt = PAYOUT_OPTIONS.find((p) => p.key === selectedPayout);
  const methodLabel = methodOpt ? t(methodOpt.titleEs, methodOpt.titleEn) : selectedPayout ?? "—";
  const handleDownloadReceipt = () => {
    ue.success(t("Recibo descargado", "Receipt downloaded"), {
      description: t(
        "Tu recibo de premio fue guardado.",
        "Your prize receipt has been saved."
      )
    });
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.div,
    {
      initial: { opacity: 0, scale: 0.95 },
      animate: { opacity: 1, scale: 1 },
      exit: { opacity: 0 },
      className: "space-y-6 text-center",
      "data-ocid": "prize.confirmed_section",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          motion.div,
          {
            initial: { scale: 0 },
            animate: { scale: 1 },
            transition: { type: "spring", stiffness: 300, damping: 18, delay: 0.1 },
            className: "w-20 h-20 rounded-full bg-secondary/20 border-2 border-secondary/40 flex items-center justify-center mx-auto",
            style: { boxShadow: "0 0 40px oklch(var(--secondary)/0.4)" },
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { size: 40, className: "text-secondary" })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            initial: { opacity: 0, y: 12 },
            animate: { opacity: 1, y: 0 },
            transition: { delay: 0.3 },
            className: "space-y-2",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "h2",
                {
                  className: "font-display font-black text-3xl",
                  style: { color: "oklch(var(--primary))" },
                  children: t("¡Premio en camino!", "Prize on its way!")
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-body text-sm text-muted-foreground max-w-xs mx-auto", children: t(
                "Tu premio ha sido registrado y está siendo procesado.",
                "Your prize has been registered and is being processed."
              ) })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            initial: { opacity: 0, y: 10 },
            animate: { opacity: 1, y: 0 },
            transition: { delay: 0.45 },
            className: "ticket-card bg-card border border-primary/20 px-6 py-5 space-y-3",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between text-sm", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-body text-muted-foreground", children: t("Premio", "Prize") }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-display font-bold text-primary", children: [
                  "$",
                  prizeAmount.toLocaleString(),
                  " USD"
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-px bg-border" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between text-sm", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-body text-muted-foreground", children: t("Método", "Method") }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-body text-foreground font-medium", children: methodLabel })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-px bg-border" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between text-sm", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-body text-muted-foreground", children: t("Llegada estimada", "Estimated arrival") }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-body text-secondary font-semibold", children: t(etaEs, etaEn) })
              ] })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            initial: { opacity: 0, y: 10 },
            animate: { opacity: 1, y: 0 },
            transition: { delay: 0.6 },
            className: "space-y-3",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "button",
                {
                  type: "button",
                  onClick: handleDownloadReceipt,
                  "data-ocid": "prize.download_receipt_button",
                  className: cn(
                    "w-full h-12 rounded-2xl border border-border bg-card",
                    "flex items-center justify-center gap-2",
                    "font-body text-sm font-medium text-foreground",
                    "hover:bg-muted/50 hover:border-primary/30 transition-smooth"
                  ),
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Download, { size: 16, className: "text-muted-foreground" }),
                    t("Descargar recibo", "Download receipt")
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                GlowButton,
                {
                  type: "button",
                  variant: "outline",
                  size: "lg",
                  className: "w-full",
                  onClick: () => navigate({ to: "/wallet" }),
                  "data-ocid": "prize.back_to_wallet_button",
                  children: t("Ver mis boletos", "Back to wallet")
                }
              )
            ]
          }
        )
      ]
    }
  );
}
function NoPrizeState({ t }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.div,
    {
      initial: { opacity: 0, y: 16 },
      animate: { opacity: 1, y: 0 },
      className: "flex flex-col items-center text-center py-16 space-y-5",
      "data-ocid": "prize.no_prize_state",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-6xl", children: "🎟️" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-2xl font-black text-foreground", children: t("Este boleto no ganó", "This ticket didn't win") }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-body text-sm text-muted-foreground max-w-xs mx-auto leading-relaxed", children: t(
            "¡No te rindas! La suerte siempre está a un boleto de distancia.",
            "Don't give up! Luck is always one ticket away."
          ) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/home", "data-ocid": "prize.try_again_link", children: /* @__PURE__ */ jsxRuntimeExports.jsx(GlowButton, { type: "button", variant: "gold", size: "lg", shimmer: true, children: t("Comprar un boleto", "Buy a ticket") }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Link,
          {
            to: "/wallet",
            className: "font-body text-sm text-muted-foreground hover:text-foreground underline underline-offset-4 transition-smooth",
            "data-ocid": "prize.back_wallet_link",
            children: t("Ver mi cartera", "View my wallet")
          }
        )
      ]
    }
  );
}
function PrizePage() {
  const { ticketId } = useParams({ from: "/prize/$ticketId" });
  const navigate = useNavigate();
  const { t } = useLanguage();
  const { tickets } = useMockData();
  const ticket = tickets.find((tk) => tk.id === ticketId) ?? tickets.find((tk) => tk.status === "Winner");
  const isWinner = (ticket == null ? void 0 : ticket.status) === "Winner";
  const prizeAmount = (ticket == null ? void 0 : ticket.prizeAmount) ?? 0;
  const needsVerification = prizeAmount > 1e3;
  const [step, setStep] = reactExports.useState("celebrate");
  const [selectedPayout, setSelectedPayout] = reactExports.useState(null);
  const [showConfetti, setShowConfetti] = reactExports.useState(false);
  reactExports.useEffect(() => {
    const saved = loadPayoutProfile().preferredMethod;
    setSelectedPayout(saved);
  }, []);
  reactExports.useEffect(() => {
    if (isWinner) {
      const t2 = setTimeout(() => {
        setShowConfetti(true);
      }, 200);
      return () => clearTimeout(t2);
    }
  }, [isWinner]);
  const handleCelebrateContinue = () => setStep("payout");
  const handlePayoutContinue = () => {
    if (needsVerification) {
      setStep("verify");
    } else {
      setStep("confirmed");
    }
  };
  const handleVerified = () => setStep("confirmed");
  const stepTitle = {
    celebrate: { es: "Premio", en: "Prize" },
    payout: { es: "Cobrar premio", en: "Claim prize" },
    verify: { es: "Verificación", en: "Verification" },
    confirmed: { es: "¡Confirmado!", en: "Confirmed!" }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      Confetti,
      {
        active: showConfetti,
        duration: 4e3,
        onComplete: () => setShowConfetti(false)
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: cn(
          "min-h-screen",
          isWinner && step === "celebrate" ? "bg-ceremonial" : "bg-background"
        ),
        "data-ocid": "prize.page",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "sticky top-0 z-20 bg-card border-b border-border px-4 py-3 flex items-center gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                onClick: () => {
                  if (step === "payout") setStep("celebrate");
                  else if (step === "verify") setStep("payout");
                  else navigate({ to: "/wallet" });
                },
                className: "p-2 rounded-xl text-muted-foreground hover:text-foreground hover:bg-muted/60 transition-smooth",
                "data-ocid": "prize.back_button",
                "aria-label": t("Volver", "Go back"),
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { size: 20 })
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-lg font-bold text-foreground flex-1", children: t(stepTitle[step].es, stepTitle[step].en) }),
            isWinner && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-1.5", "aria-hidden": "true", children: [
              "celebrate",
              "payout",
              needsVerification ? "verify" : null,
              "confirmed"
            ].filter(Boolean).map((s) => /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: cn(
                  "rounded-full transition-smooth",
                  s === step ? "w-5 h-2 bg-primary" : "w-2 h-2 bg-border"
                )
              },
              s
            )) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-w-lg mx-auto px-4 py-6 pb-16", children: !ticket || !isWinner ? /* @__PURE__ */ jsxRuntimeExports.jsx(NoPrizeState, { t }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(AnimatePresence, { mode: "wait", children: [
            step === "celebrate" && /* @__PURE__ */ jsxRuntimeExports.jsx(
              CelebrateStep,
              {
                prizeAmount,
                ticketName: t(ticket.lotteryNameEs, ticket.lotteryName),
                drawDate: ticket.drawDate,
                ticket,
                onContinue: handleCelebrateContinue,
                t
              },
              "celebrate"
            ),
            step === "payout" && /* @__PURE__ */ jsxRuntimeExports.jsx(
              PayoutStep,
              {
                selected: selectedPayout,
                onSelect: setSelectedPayout,
                onContinue: handlePayoutContinue,
                prizeAmount,
                t
              },
              "payout"
            ),
            step === "verify" && /* @__PURE__ */ jsxRuntimeExports.jsx(VerifyStep, { onVerified: handleVerified, t }, "verify"),
            step === "confirmed" && /* @__PURE__ */ jsxRuntimeExports.jsx(
              ConfirmedStep,
              {
                selectedPayout,
                prizeAmount,
                t
              },
              "confirmed"
            )
          ] }) })
        ]
      }
    )
  ] });
}
export {
  PrizePage as default
};
