import { c as createLucideIcon, r as reactExports, a as useLanguage, j as jsxRuntimeExports, b as cn, u as useNavigate, T as Ticket, e as Trophy, L as Link, f as ue } from "./index-6HgylvRh.js";
import { G as GlowButton } from "./GlowButton-Duv2phZR.js";
import { u as useMockData } from "./useMockData-BjtQoZZA.js";
import { m as motion } from "./proxy-HmngNdo3.js";
import { A as AnimatePresence } from "./index-DocTykfO.js";
import { X } from "./x-gBBbqBmc.js";
import { C as Check } from "./check-O68XnJIB.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$3 = [
  ["rect", { width: "20", height: "12", x: "2", y: "6", rx: "2", key: "9lu3g6" }],
  ["circle", { cx: "12", cy: "12", r: "2", key: "1c9p78" }],
  ["path", { d: "M6 12h.01M18 12h.01", key: "113zkx" }]
];
const Banknote = createLucideIcon("banknote", __iconNode$3);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [
  ["rect", { width: "14", height: "14", x: "8", y: "8", rx: "2", ry: "2", key: "17jyea" }],
  ["path", { d: "M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2", key: "zix9uf" }]
];
const Copy = createLucideIcon("copy", __iconNode$2);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["rect", { x: "3", y: "8", width: "18", height: "4", rx: "1", key: "bkv52" }],
  ["path", { d: "M12 8v13", key: "1c76mn" }],
  ["path", { d: "M19 12v7a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-7", key: "6wjy6b" }],
  [
    "path",
    {
      d: "M7.5 8a2.5 2.5 0 0 1 0-5A4.8 8 0 0 1 12 8a4.8 8 0 0 1 4.5-5 2.5 2.5 0 0 1 0 5",
      key: "1ihvrl"
    }
  ]
];
const Gift = createLucideIcon("gift", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  [
    "path",
    {
      d: "M14.536 21.686a.5.5 0 0 0 .937-.024l6.5-19a.496.496 0 0 0-.635-.635l-19 6.5a.5.5 0 0 0-.024.937l7.93 3.18a2 2 0 0 1 1.112 1.11z",
      key: "1ffxy3"
    }
  ],
  ["path", { d: "m21.854 2.147-10.94 10.939", key: "12cjpa" }]
];
const Send = createLucideIcon("send", __iconNode);
const statusConfig = {
  Active: {
    label: "Activo",
    labelEn: "Active",
    color: "bg-secondary/20 text-secondary border-secondary/40"
  },
  InDraw: {
    label: "En Sorteo",
    labelEn: "In Draw",
    color: "bg-primary/20 text-primary border-primary/40"
  },
  Winner: {
    label: "¡Ganador!",
    labelEn: "Winner!",
    color: "bg-green-500/20 text-green-400 border-green-400/40"
  },
  Lost: {
    label: "Perdido",
    labelEn: "Lost",
    color: "bg-muted text-muted-foreground border-border"
  },
  Unclaimed: {
    label: "Sin reclamar",
    labelEn: "Unclaimed",
    color: "bg-orange-500/20 text-orange-400 border-orange-400/40"
  }
};
function TicketCard({ ticket, className, onClick }) {
  const [flipped, setFlipped] = reactExports.useState(false);
  const { t } = useLanguage();
  const status = statusConfig[ticket.status];
  const handleFlip = () => {
    setFlipped((f) => !f);
    onClick == null ? void 0 : onClick();
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "button",
    {
      type: "button",
      className: cn(
        "w-full perspective-1000 cursor-pointer bg-transparent border-0 p-0 text-left",
        className
      ),
      style: { perspective: "1000px" },
      onClick: handleFlip,
      "aria-label": t(
        `Boleto ${ticket.lotteryNameEs}`,
        `Ticket ${ticket.lotteryName}`
      ),
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "relative w-full aspect-[2/1] min-h-[200px] transition-transform duration-700 ease-in-out",
          style: {
            transformStyle: "preserve-3d",
            transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)"
          },
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: cn(
                  "absolute inset-0 rounded-3xl overflow-hidden backface-hidden",
                  "bg-card border border-border",
                  "p-5 flex flex-col justify-between",
                  ticket.status === "Winner" && "border-primary/60 glow-gold"
                ),
                style: { backfaceVisibility: "hidden" },
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-2", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-body text-muted-foreground uppercase tracking-widest mb-1", children: t(ticket.lotteryNameEs, ticket.lotteryName) }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-mono text-xs text-muted-foreground/60 truncate", children: ticket.serialCode })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "span",
                      {
                        className: cn(
                          "text-xs font-body font-semibold px-2.5 py-1 rounded-full border shrink-0",
                          status.color
                        ),
                        children: t(status.label, status.labelEn)
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-2 justify-center my-3", children: ticket.numbers.map((n) => {
                    var _a;
                    const isMatch = (_a = ticket.matchedNumbers) == null ? void 0 : _a.includes(n);
                    return /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "span",
                      {
                        className: cn(
                          "w-9 h-9 rounded-full flex items-center justify-center font-mono text-sm font-bold border transition-smooth",
                          isMatch ? "bg-primary text-primary-foreground border-primary shadow-glow-gold" : "bg-muted text-muted-foreground border-border"
                        ),
                        children: n
                      },
                      n
                    );
                  }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between text-xs font-body text-muted-foreground", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: new Date(ticket.drawDate).toLocaleDateString(
                      t("es-MX", "en-US"),
                      { day: "numeric", month: "short" }
                    ) }),
                    ticket.isPhygital && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-1.5 h-1.5 rounded-full bg-secondary inline-block" }),
                      t("Físico", "Physical")
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground/60", children: t("Toca para voltear", "Tap to flip") })
                  ] })
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: "absolute inset-0 rounded-3xl overflow-hidden backface-hidden bg-card border border-border p-5 flex flex-col justify-between",
                style: { backfaceVisibility: "hidden", transform: "rotateY(180deg)" },
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display text-lg font-bold text-primary mb-1", children: ticket.status === "Winner" ? `🏆 ${t("¡Ganaste!", "You Won!")}` : t("Detalle del Boleto", "Ticket Detail") }),
                    ticket.prizeAmount && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-display text-3xl font-black text-primary", children: [
                      "$",
                      ticket.prizeAmount.toLocaleString()
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2 text-sm font-body", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: t("Código", "Code") }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-xs text-foreground", children: ticket.serialCode })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: t("Precio", "Price") }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-foreground", children: [
                        "$",
                        ticket.price,
                        " ",
                        ticket.currency
                      ] })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: t("Comprado", "Purchased") }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground", children: new Date(ticket.purchasedAt).toLocaleDateString(
                        t("es-MX", "en-US")
                      ) })
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-center text-xs text-muted-foreground/60 font-body", children: t("Toca para voltear", "Tap to flip back") })
                ]
              }
            )
          ]
        }
      )
    }
  );
}
const FILTERS = [
  { key: "All", labelEs: "Todos", labelEn: "All" },
  { key: "Active", labelEs: "Activos", labelEn: "Active" },
  { key: "InDraw", labelEs: "En Sorteo", labelEn: "In Draw" },
  { key: "Winner", labelEs: "Ganadores", labelEn: "Winners" },
  { key: "Lost", labelEs: "Históricos", labelEn: "Past" },
  { key: "Gifted", labelEs: "Regalados", labelEn: "Gifted" }
];
function StatPill({
  icon,
  value,
  label,
  accent
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: cn(
        "flex flex-col items-center gap-0.5 px-4 py-2.5 rounded-2xl border flex-1 min-w-0",
        accent ? "bg-primary/10 border-primary/30 glow-gold" : "bg-card border-border"
      ),
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "span",
          {
            className: cn(
              "text-lg",
              accent ? "text-primary" : "text-muted-foreground"
            ),
            children: icon
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "span",
          {
            className: cn(
              "font-display font-black text-lg leading-none",
              accent ? "text-primary" : "text-foreground"
            ),
            children: value
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-body text-[10px] text-muted-foreground uppercase tracking-widest truncate w-full text-center", children: label })
      ]
    }
  );
}
function GiftModal({
  ticket,
  onClose
}) {
  const { t } = useLanguage();
  const [recipient, setRecipient] = reactExports.useState("");
  const [copied, setCopied] = reactExports.useState(false);
  const inputRef = reactExports.useRef(null);
  const mockLink = `https://lsbfl.app/claim/${ticket.serialCode}`;
  function handleCopy() {
    navigator.clipboard.writeText(mockLink).catch(() => {
    });
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
    ue.success(t("¡Enlace copiado!", "Link copied!"), {
      description: /* @__PURE__ */ jsxRuntimeExports.jsx(
        "span",
        {
          className: "block max-w-full truncate font-mono text-xs opacity-90",
          title: mockLink,
          children: mockLink
        }
      ),
      duration: 4e3
    });
  }
  function handleSend() {
    var _a;
    if (!recipient.trim()) {
      (_a = inputRef.current) == null ? void 0 : _a.focus();
      return;
    }
    const handle = recipient.trim().replace(/^@+/, "");
    ue.success(t("¡Boleto enviado!", "Ticket sent!"), {
      description: /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex flex-wrap items-center gap-x-1.5 gap-y-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: t("Enviado a", "Sent to") }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex max-w-[min(100%,12rem)] items-center truncate rounded-md bg-primary/15 px-2 py-0.5 font-mono text-xs font-semibold text-primary", children: [
          "@",
          handle
        ] })
      ] }),
      duration: 5e3
    });
    onClose();
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(
    motion.div,
    {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      exit: { opacity: 0 },
      className: "fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-end sm:items-center justify-center p-4",
      onClick: onClose,
      "data-ocid": "wallet.gift_modal",
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { opacity: 0, y: 40, scale: 0.96 },
          animate: { opacity: 1, y: 0, scale: 1 },
          exit: { opacity: 0, y: 40, scale: 0.96 },
          transition: { type: "spring", stiffness: 320, damping: 28 },
          className: "w-full max-w-md bg-card rounded-3xl border border-primary/20 p-6 shadow-2xl glow-gold relative",
          onClick: (e) => e.stopPropagation(),
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                onClick: onClose,
                className: "absolute top-4 right-4 w-8 h-8 rounded-full bg-muted/60 flex items-center justify-center text-muted-foreground hover:text-foreground transition-smooth",
                "aria-label": t("Cerrar", "Close"),
                "data-ocid": "wallet.gift_modal.close_button",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-4 h-4" })
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 mb-5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-10 h-10 rounded-2xl bg-primary/15 border border-primary/30 flex items-center justify-center text-primary", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Gift, { className: "w-5 h-5" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-lg font-bold text-foreground", children: t("Regalar Boleto", "Gift Ticket") }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-mono text-xs text-muted-foreground", children: ticket.serialCode })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "ticket-card bg-muted/40 border border-border p-3 mb-5 flex items-center gap-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-2xl", children: "🎟️" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-body text-sm font-semibold text-foreground truncate", children: t(ticket.lotteryNameEs, ticket.lotteryName) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-body text-xs text-muted-foreground", children: ticket.numbers.join(" · ") })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "block mb-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-body text-xs text-muted-foreground uppercase tracking-widest mb-1.5 block", children: t("Email o usuario", "Email or username") }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "input",
                {
                  ref: inputRef,
                  type: "text",
                  value: recipient,
                  onChange: (e) => setRecipient(e.target.value),
                  placeholder: t(
                    "ana@correo.mx o @anagarcia",
                    "ana@mail.com or @anagarcia"
                  ),
                  className: "w-full h-11 px-4 rounded-2xl bg-muted/60 border border-input text-sm font-body text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-smooth",
                  "data-ocid": "wallet.gift_modal.recipient_input"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              GlowButton,
              {
                type: "button",
                variant: "gold",
                size: "md",
                className: "w-full mb-3",
                onClick: handleSend,
                "data-ocid": "wallet.gift_modal.send_button",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Send, { className: "w-4 h-4" }),
                  t("Enviar Regalo", "Send Gift")
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                onClick: handleCopy,
                className: cn(
                  "w-full h-11 rounded-2xl border font-body text-sm font-medium flex items-center justify-center gap-2 transition-smooth",
                  copied ? "bg-secondary/15 border-secondary/40 text-secondary" : "bg-muted/40 border-border text-muted-foreground hover:border-primary/40 hover:text-foreground"
                ),
                "data-ocid": "wallet.gift_modal.copy_link_button",
                children: copied ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "w-4 h-4" }),
                  t("¡Enlace copiado!", "Link copied!")
                ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Copy, { className: "w-4 h-4" }),
                  t("Copiar enlace compartible", "Copy shareable link")
                ] })
              }
            )
          ]
        },
        "sheet"
      )
    },
    "backdrop"
  ) });
}
function WalletTicketCard({
  ticket,
  index,
  onGift
}) {
  const { t } = useLanguage();
  const isWinner = ticket.status === "Winner";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.div,
    {
      initial: { opacity: 0, y: 18 },
      animate: { opacity: 1, y: 0 },
      transition: {
        delay: index * 0.07,
        type: "spring",
        stiffness: 280,
        damping: 26
      },
      className: "relative",
      "data-ocid": `wallet.ticket.${index + 1}`,
      children: [
        isWinner && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute -inset-0.5 rounded-3xl glow-gold pointer-events-none z-0" }),
        isWinner && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute -top-2.5 left-1/2 -translate-x-1/2 z-10 flex items-center gap-1 bg-primary text-primary-foreground px-3 py-0.5 rounded-full text-xs font-body font-bold shadow-glow-gold", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Trophy, { className: "w-3 h-3" }),
          t("¡Ganador!", "Winner!")
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: cn("relative z-[1]", isWinner ? "pt-2.5" : "pt-1"), children: /* @__PURE__ */ jsxRuntimeExports.jsx(TicketCard, { ticket }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          motion.div,
          {
            initial: { opacity: 0 },
            animate: { opacity: 1 },
            transition: { delay: index * 0.07 + 0.2 },
            className: "flex justify-end mt-1.5 px-1",
            children: isWinner ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Link,
              {
                to: "/prize/$ticketId",
                params: { ticketId: ticket.id },
                className: "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-primary/15 border border-primary/40 text-xs font-body font-semibold text-primary hover:border-primary hover:bg-primary/20 transition-smooth",
                "data-ocid": `wallet.claim_button.${index + 1}`,
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Banknote, { className: "w-3 h-3" }),
                  t("Cobrar", "Claim")
                ]
              }
            ) : /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "button",
              {
                type: "button",
                onClick: () => onGift(ticket),
                className: "flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-muted/50 border border-border text-xs font-body text-muted-foreground hover:border-primary/40 hover:text-primary transition-smooth",
                "data-ocid": `wallet.gift_button.${index + 1}`,
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Gift, { className: "w-3 h-3" }),
                  t("Regalar", "Gift")
                ]
              }
            )
          }
        )
      ]
    }
  );
}
function WalletPage() {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const { tickets, user } = useMockData();
  const [filter, setFilter] = reactExports.useState("All");
  const [giftTicket, setGiftTicket] = reactExports.useState(null);
  const activeCount = tickets.filter(
    (tk) => tk.status === "Active" || tk.status === "InDraw"
  ).length;
  const winnerCount = tickets.filter((tk) => tk.status === "Winner").length;
  const totalSpent = tickets.reduce((sum, tk) => sum + tk.price, 0);
  const filtered = (() => {
    if (filter === "All") return tickets;
    if (filter === "Gifted") return [];
    return tickets.filter((tk) => tk.status === filter);
  })();
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-background", "data-ocid": "wallet.page", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-card border-b border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-2xl mx-auto px-4 pt-5 pb-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-2xl font-black text-foreground leading-tight", children: t("Mis Boletos", "My Tickets") }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-body text-sm text-muted-foreground mt-0.5", children: [
          activeCount,
          " ",
          t("boletos activos", "active tickets"),
          winnerCount > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-primary font-semibold", children: [
            " ",
            "· ",
            winnerCount,
            " ",
            t("ganador", "winner")
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", "data-ocid": "wallet.stats_row", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          StatPill,
          {
            icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Ticket, { className: "w-4 h-4" }),
            value: String(tickets.length),
            label: t("Boletos", "Tickets")
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          StatPill,
          {
            icon: "💸",
            value: `$${totalSpent}`,
            label: t("Invertido", "Spent")
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          StatPill,
          {
            icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Trophy, { className: "w-4 h-4" }),
            value: String(winnerCount),
            label: t("Victorias", "Wins"),
            accent: winnerCount > 0
          }
        )
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-2xl mx-auto px-4 py-5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { opacity: 0, y: 12 },
          animate: { opacity: 1, y: 0 },
          transition: { type: "spring", stiffness: 260, damping: 24 },
          className: "ticket-card bg-card border border-primary/25 p-4 mb-5 flex items-center justify-between",
          style: {
            boxShadow: "0 0 24px oklch(var(--primary) / 0.15), 0 0 48px oklch(var(--primary) / 0.08)"
          },
          "data-ocid": "wallet.balance_card",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-body text-muted-foreground uppercase tracking-widest mb-0.5", children: t("Saldo disponible", "Available Balance") }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-display text-3xl font-black text-primary", children: [
                "$",
                user.balance.toLocaleString()
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-body text-xs text-muted-foreground mt-0.5", children: user.currency })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              GlowButton,
              {
                type: "button",
                variant: "outline",
                size: "sm",
                "data-ocid": "wallet.add_funds_button",
                onClick: () => navigate({ to: "/wallet/deposit" }),
                children: t("Recargar", "Add Funds")
              }
            )
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: "flex gap-2 overflow-x-auto pb-2 mb-5 -mx-4 px-4 scrollbar-hide",
          role: "tablist",
          "aria-label": t("Filtrar boletos", "Filter tickets"),
          "data-ocid": "wallet.filter_bar",
          children: FILTERS.map(({ key, labelEs, labelEn }) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              role: "tab",
              "aria-selected": filter === key,
              onClick: () => setFilter(key),
              "data-ocid": `wallet.filter.${key.toLowerCase()}_tab`,
              className: cn(
                "shrink-0 px-4 py-1.5 rounded-full text-sm font-body font-medium border transition-smooth",
                filter === key ? "bg-primary text-primary-foreground border-primary shadow-glow-gold" : "bg-muted/40 text-muted-foreground border-border hover:border-primary/40 hover:text-foreground"
              ),
              children: t(labelEs, labelEn)
            },
            key
          ))
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { mode: "wait", children: filtered.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { opacity: 0, scale: 0.97 },
          animate: { opacity: 1, scale: 1 },
          exit: { opacity: 0, scale: 0.97 },
          transition: { duration: 0.2 },
          className: "flex flex-col items-center justify-center py-16 text-center",
          "data-ocid": "wallet.empty_state",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-28 h-28 mb-5 relative", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "svg",
              {
                viewBox: "0 0 112 112",
                fill: "none",
                xmlns: "http://www.w3.org/2000/svg",
                className: "w-full h-full",
                "aria-hidden": "true",
                role: "img",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("title", { children: "Boleto vacío" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "rect",
                    {
                      x: "8",
                      y: "24",
                      width: "96",
                      height: "64",
                      rx: "14",
                      fill: "oklch(var(--card))",
                      stroke: "oklch(var(--primary) / 0.4)",
                      strokeWidth: "2",
                      strokeDasharray: "6 3"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "circle",
                    {
                      cx: "56",
                      cy: "56",
                      r: "18",
                      fill: "oklch(var(--muted))",
                      stroke: "oklch(var(--primary) / 0.3)",
                      strokeWidth: "1.5"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "text",
                    {
                      x: "56",
                      y: "61",
                      textAnchor: "middle",
                      fontSize: "18",
                      fill: "oklch(var(--primary) / 0.6)",
                      children: "?"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "circle",
                    {
                      cx: "8",
                      cy: "56",
                      r: "6",
                      fill: "oklch(var(--background))",
                      stroke: "oklch(var(--border))",
                      strokeWidth: "1.5"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "circle",
                    {
                      cx: "104",
                      cy: "56",
                      r: "6",
                      fill: "oklch(var(--background))",
                      stroke: "oklch(var(--border))",
                      strokeWidth: "1.5"
                    }
                  )
                ]
              }
            ) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display text-xl font-bold text-foreground mb-2", children: filter === "Gifted" ? t("Sin boletos regalados", "No gifted tickets yet") : t("Aún no tienes boletos", "No tickets here yet") }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-body text-sm text-muted-foreground mb-6 max-w-xs", children: filter === "Gifted" ? t(
              "Regala la suerte a alguien especial. Voltea un boleto y usa el botón Regalar.",
              "Share luck with someone special. Flip a ticket and tap Gift."
            ) : t(
              "La suerte es un derecho. ¡Compra tu primer boleto y empieza a soñar!",
              "Luck is a right. Buy your first ticket and start dreaming!"
            ) }),
            filter !== "Gifted" && /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/home", "data-ocid": "wallet.buy_first_ticket_link", children: /* @__PURE__ */ jsxRuntimeExports.jsx(GlowButton, { type: "button", variant: "gold", size: "lg", shimmer: true, children: t("Comprar mi primer boleto", "Buy my first ticket") }) })
          ]
        },
        `empty-${filter}`
      ) : /* @__PURE__ */ jsxRuntimeExports.jsx(
        motion.div,
        {
          initial: { opacity: 0 },
          animate: { opacity: 1 },
          exit: { opacity: 0 },
          className: "grid grid-cols-1 md:grid-cols-2 gap-5",
          children: filtered.map((ticket, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            WalletTicketCard,
            {
              ticket,
              index: i,
              onGift: setGiftTicket
            },
            ticket.id
          ))
        },
        `grid-${filter}`
      ) }),
      filtered.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(
        motion.div,
        {
          initial: { opacity: 0, y: 12 },
          animate: { opacity: 1, y: 0 },
          transition: { delay: 0.4 },
          className: "mt-8 flex justify-center",
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/home", "data-ocid": "wallet.buy_more_link", children: /* @__PURE__ */ jsxRuntimeExports.jsx(GlowButton, { type: "button", variant: "outline", size: "md", children: t("Comprar más boletos", "Buy more tickets") }) })
        }
      )
    ] }),
    giftTicket && /* @__PURE__ */ jsxRuntimeExports.jsx(GiftModal, { ticket: giftTicket, onClose: () => setGiftTicket(null) })
  ] });
}
export {
  WalletPage as default
};
