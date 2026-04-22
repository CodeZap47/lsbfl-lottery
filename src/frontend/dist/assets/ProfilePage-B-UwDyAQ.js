import { c as createLucideIcon, a as useLanguage, g as useTheme, r as reactExports, j as jsxRuntimeExports, b as cn, L as Link, n as LayoutDashboard, f as ue, o as Moon, p as Sun, G as Globe, M as MapPin } from "./index-6HgylvRh.js";
import { G as GlowButton } from "./GlowButton-Duv2phZR.js";
import { l as loadPayoutProfile, P as PAYOUT_OPTIONS, s as savePayoutProfile } from "./payoutProfileStorage-d_9Ed9L1.js";
import { u as useMockData } from "./useMockData-BjtQoZZA.js";
import { m as motion } from "./proxy-HmngNdo3.js";
import { X } from "./x-gBBbqBmc.js";
import { B as Bell } from "./bell-BB6jVs1U.js";
import { S as Shield } from "./shield-DvZ2_BE1.js";
import { D as Download } from "./download-BZCZBIpE.js";
import { T as Trash2 } from "./trash-2-DrQ-5xAX.js";
import { C as ChevronDown } from "./chevron-down-D77ky-PO.js";
import { A as AnimatePresence } from "./index-DocTykfO.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$3 = [
  ["path", { d: "m22 7-8.991 5.727a2 2 0 0 1-2.009 0L2 7", key: "132q7q" }],
  ["rect", { x: "2", y: "4", width: "20", height: "16", rx: "2", key: "izxlao" }]
];
const Mail = createLucideIcon("mail", __iconNode$3);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [
  [
    "path",
    {
      d: "M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z",
      key: "1a8usu"
    }
  ],
  ["path", { d: "m15 5 4 4", key: "1mk7zo" }]
];
const Pencil = createLucideIcon("pencil", __iconNode$2);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  [
    "path",
    {
      d: "M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z",
      key: "oel41y"
    }
  ],
  ["path", { d: "M12 8v4", key: "1got3b" }],
  ["path", { d: "M12 16h.01", key: "1drbdi" }]
];
const ShieldAlert = createLucideIcon("shield-alert", __iconNode$1);
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
      d: "M19 7V4a1 1 0 0 0-1-1H5a2 2 0 0 0 0 4h15a1 1 0 0 1 1 1v4h-3a2 2 0 0 0 0 4h3a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1",
      key: "18etb6"
    }
  ],
  ["path", { d: "M3 5v14a2 2 0 0 0 2 2h15a1 1 0 0 0 1-1v-4", key: "xoc0q4" }]
];
const Wallet = createLucideIcon("wallet", __iconNode);
const LSBFL_PROFILE_ACCOUNT_KEY = "lsbfl-profile-account-v1";
function loadProfileAccount(defaults, opts) {
  try {
    const raw = localStorage.getItem(LSBFL_PROFILE_ACCOUNT_KEY);
    if (!raw) return defaults;
    const parsed = JSON.parse(raw);
    const email = typeof parsed.email === "string" ? parsed.email : defaults.email;
    const countryCode = typeof parsed.countryCode === "string" && opts.validCountryCodes.includes(parsed.countryCode) ? parsed.countryCode : defaults.countryCode;
    const currency = typeof parsed.currency === "string" && opts.validCurrencies.includes(parsed.currency) ? parsed.currency : defaults.currency;
    return { email, countryCode, currency };
  } catch {
    return defaults;
  }
}
function saveProfileAccount(data) {
  localStorage.setItem(LSBFL_PROFILE_ACCOUNT_KEY, JSON.stringify(data));
}
function SectionAccordion({
  id,
  label,
  icon,
  open,
  onToggle,
  children
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "ticket-card bg-card border border-border overflow-hidden", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "button",
      {
        type: "button",
        onClick: () => onToggle(id),
        "data-ocid": `profile.section_${id}_toggle`,
        className: "w-full flex items-center gap-3 px-5 py-4 hover:bg-muted/30 transition-smooth text-left group",
        "aria-expanded": open,
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary shrink-0", children: icon }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "flex-1 font-body font-semibold text-foreground text-sm", children: label }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            motion.span,
            {
              animate: { rotate: open ? 180 : 0 },
              transition: { duration: 0.25 },
              className: "text-muted-foreground",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronDown, { size: 16 })
            }
          )
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { initial: false, children: open && /* @__PURE__ */ jsxRuntimeExports.jsx(
      motion.div,
      {
        initial: { height: 0, opacity: 0 },
        animate: { height: "auto", opacity: 1 },
        exit: { height: 0, opacity: 0 },
        transition: { duration: 0.28, ease: "easeInOut" },
        className: "overflow-hidden",
        children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "border-t border-border px-5 py-4", children })
      },
      "content"
    ) })
  ] });
}
function ToggleSwitch({
  checked,
  onChange,
  id,
  "data-ocid": ocid
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "button",
    {
      type: "button",
      role: "switch",
      "aria-checked": checked,
      id,
      onClick: onChange,
      "data-ocid": ocid,
      className: cn(
        "relative inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full transition-smooth focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
        checked ? "bg-primary shadow-glow-gold" : "bg-muted"
      ),
      children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        motion.span,
        {
          layout: true,
          transition: { type: "spring", stiffness: 500, damping: 35 },
          className: cn(
            "pointer-events-none inline-block h-4 w-4 rounded-full shadow-md",
            checked ? "bg-primary-foreground ml-6" : "bg-foreground/40 ml-1"
          )
        }
      )
    }
  );
}
function LabeledToggle({
  label,
  sublabel,
  checked,
  onChange,
  toggleId,
  ocid
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "label",
    {
      htmlFor: toggleId,
      className: "flex items-center justify-between gap-4 py-3 cursor-pointer group",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-body text-sm text-foreground leading-snug", children: label }),
          sublabel && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-body text-xs text-muted-foreground mt-0.5", children: sublabel })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          ToggleSwitch,
          {
            checked,
            onChange,
            id: toggleId,
            "data-ocid": ocid
          }
        )
      ]
    }
  );
}
function BreakModal({
  open,
  onClose,
  t
}) {
  const [selected, setSelected] = reactExports.useState(null);
  const options = [
    { id: "24h", label: t("24 horas", "24 hours") },
    { id: "1w", label: t("1 semana", "1 week") },
    { id: "1m", label: t("1 mes", "1 month") }
  ];
  return /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { children: open && /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.div,
    {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      exit: { opacity: 0 },
      className: "fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4",
      "data-ocid": "profile.break_modal",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          motion.div,
          {
            initial: { opacity: 0 },
            animate: { opacity: 1 },
            exit: { opacity: 0 },
            className: "absolute inset-0 bg-black/60 backdrop-blur-sm",
            onClick: onClose
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            initial: { y: 40, opacity: 0, scale: 0.97 },
            animate: { y: 0, opacity: 1, scale: 1 },
            exit: { y: 40, opacity: 0, scale: 0.97 },
            transition: { type: "spring", stiffness: 380, damping: 32 },
            className: "relative z-10 w-full max-w-sm ticket-card bg-card border border-border p-6",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  onClick: onClose,
                  "data-ocid": "profile.break_modal.close_button",
                  className: "absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { size: 18 })
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-xl font-bold text-foreground mb-1", children: t("¿Por cuánto tiempo?", "For how long?") }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-body text-sm text-muted-foreground mb-5", children: t(
                "Elegir una pausa te ayuda a mantener el juego como disfrute.",
                "Taking a break helps you keep playing as fun."
              ) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-col gap-2 mb-5", children: options.map((opt) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  onClick: () => setSelected(opt.id),
                  "data-ocid": `profile.break_option.${opt.id}`,
                  className: cn(
                    "w-full py-3 px-4 rounded-2xl font-body font-medium text-sm border transition-smooth text-left",
                    selected === opt.id ? "border-primary bg-primary/10 text-primary shadow-glow-gold" : "border-border bg-muted/30 text-foreground hover:border-primary/50"
                  ),
                  children: opt.label
                },
                opt.id
              )) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                GlowButton,
                {
                  type: "button",
                  variant: "gold",
                  size: "md",
                  className: "w-full",
                  disabled: !selected,
                  "data-ocid": "profile.break_modal.confirm_button",
                  onClick: () => {
                    ue.success(t("Pausa activada 🌿", "Break activated 🌿"));
                    onClose();
                  },
                  children: t("Confirmar pausa", "Confirm break")
                }
              )
            ]
          }
        )
      ]
    }
  ) });
}
function DeleteDialog({
  open,
  onClose,
  t
}) {
  const [confirmed, setConfirmed] = reactExports.useState(false);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { children: open && /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.div,
    {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      exit: { opacity: 0 },
      className: "fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4",
      "data-ocid": "profile.delete_dialog",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          motion.div,
          {
            initial: { opacity: 0 },
            animate: { opacity: 1 },
            exit: { opacity: 0 },
            className: "absolute inset-0 bg-black/70 backdrop-blur-sm",
            onClick: onClose
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            initial: { y: 40, opacity: 0 },
            animate: { y: 0, opacity: 1 },
            exit: { y: 40, opacity: 0 },
            transition: { type: "spring", stiffness: 380, damping: 32 },
            className: "relative z-10 w-full max-w-sm ticket-card bg-card border border-destructive/40 p-6",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 mb-4", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-10 h-10 rounded-full bg-destructive/15 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldAlert, { size: 20, className: "text-destructive" }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-lg font-bold text-foreground", children: t("¿Eliminar cuenta?", "Delete account?") })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-body text-sm text-muted-foreground mb-4", children: t(
                "Esta acción es permanente. Perderás tu historial, boletos y saldo. No se puede deshacer.",
                "This is permanent. You'll lose your history, tickets, and balance. This cannot be undone."
              ) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "flex items-start gap-3 mb-5 cursor-pointer", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "input",
                  {
                    type: "checkbox",
                    checked: confirmed,
                    onChange: () => setConfirmed((v) => !v),
                    "data-ocid": "profile.delete_confirm_checkbox",
                    className: "mt-0.5 accent-destructive"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-body text-sm text-foreground", children: t(
                  "Entiendo que perderé todos mis datos",
                  "I understand I will lose all my data"
                ) })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  GlowButton,
                  {
                    type: "button",
                    variant: "ghost",
                    size: "sm",
                    className: "flex-1",
                    onClick: onClose,
                    "data-ocid": "profile.delete_dialog.cancel_button",
                    children: t("Cancelar", "Cancel")
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    type: "button",
                    disabled: !confirmed,
                    "data-ocid": "profile.delete_dialog.confirm_button",
                    onClick: () => {
                      ue.error(t("Solicitud enviada", "Request submitted"));
                      onClose();
                    },
                    className: cn(
                      "flex-1 h-9 px-4 rounded-xl font-body font-medium text-sm border transition-smooth",
                      "bg-destructive/10 border-destructive/40 text-destructive",
                      "hover:bg-destructive hover:text-destructive-foreground",
                      "disabled:opacity-40 disabled:cursor-not-allowed"
                    ),
                    children: t("Eliminar", "Delete")
                  }
                )
              ] })
            ]
          }
        )
      ]
    }
  ) });
}
const COUNTRIES = [
  { code: "MX", label: "🇲🇽 México", currency: "MXN" },
  { code: "AR", label: "🇦🇷 Argentina", currency: "ARS" },
  { code: "CO", label: "🇨🇴 Colombia", currency: "COP" },
  { code: "CL", label: "🇨🇱 Chile", currency: "CLP" },
  { code: "US", label: "🇺🇸 United States", currency: "USD" },
  { code: "ES", label: "🇪🇸 España", currency: "EUR" }
];
const CURRENCIES = ["USD", "MXN", "ARS", "COP", "EUR", "BTC", "ETH"];
const ACCOUNT_STORAGE_OPTS = {
  validCountryCodes: COUNTRIES.map((c) => c.code),
  validCurrencies: CURRENCIES
};
function ProfilePage() {
  const { t, toggleLang, lang } = useLanguage();
  const { toggleTheme, isDark } = useTheme();
  const { user } = useMockData();
  const [openSection, setOpenSection] = reactExports.useState("account");
  const toggleSection = (id) => setOpenSection((prev) => prev === id ? null : id);
  const [editMode, setEditMode] = reactExports.useState(false);
  const [accountSnapshot] = reactExports.useState(
    () => loadProfileAccount(
      {
        email: user.email,
        countryCode: user.countryCode,
        currency: user.currency
      },
      ACCOUNT_STORAGE_OPTS
    )
  );
  const [email, setEmail] = reactExports.useState(accountSnapshot.email);
  const [country, setCountry] = reactExports.useState(accountSnapshot.countryCode);
  const [currency, setCurrency] = reactExports.useState(accountSnapshot.currency);
  const handleEditProfileClick = () => {
    setEditMode((wasEditing) => {
      if (wasEditing) return false;
      queueMicrotask(() => {
        setOpenSection("account");
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            var _a;
            (_a = sectionRef.current) == null ? void 0 : _a.scrollIntoView({
              behavior: "smooth",
              block: "start"
            });
          });
        });
      });
      return true;
    });
  };
  const [payoutProfile, setPayoutProfile] = reactExports.useState(
    () => loadPayoutProfile()
  );
  const [payoutEditMode, setPayoutEditMode] = reactExports.useState(false);
  const [notifs, setNotifs] = reactExports.useState({
    draw_start: true,
    draw_results: true,
    prize_won: true,
    unclaimed: true,
    news: false
  });
  const toggleNotif = (key) => setNotifs((n) => ({ ...n, [key]: !n[key] }));
  const [limits, setLimits] = reactExports.useState(() => {
    const stored = localStorage.getItem("lsbfl-limits");
    return stored ? JSON.parse(stored) : { daily: "", monthly: "" };
  });
  reactExports.useEffect(() => {
    localStorage.setItem("lsbfl-limits", JSON.stringify(limits));
  }, [limits]);
  const [showName, setShowName] = reactExports.useState(true);
  const [showBreak, setShowBreak] = reactExports.useState(false);
  const [showDelete, setShowDelete] = reactExports.useState(false);
  const initials = user.name.split(" ").map((n) => n[0]).slice(0, 2).join("").toUpperCase();
  const countryInfo = COUNTRIES.find((c) => c.code === country);
  const displayCountry = countryInfo ? countryInfo.label : `🌎 ${user.country}`;
  const memberYear = new Date(user.joinedAt).toLocaleDateString(
    lang === "es" ? "es-MX" : "en-US",
    { month: "long", year: "numeric" }
  );
  const inputCls = "w-full h-11 px-4 rounded-xl bg-muted/50 border border-input text-foreground font-body text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-smooth";
  const labelCls = "block font-body text-xs text-muted-foreground mb-1.5 uppercase tracking-wide";
  const sectionRef = reactExports.useRef(null);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "min-h-screen bg-background pb-24",
        "data-ocid": "profile.page",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "relative px-4 pt-10 pb-8 border-b border-border bg-card",
              style: {
                background: "radial-gradient(ellipse at 60% -10%, oklch(0.18 0.06 80 / 0.35) 0%, transparent 55%), oklch(var(--card))"
              },
              "data-ocid": "profile.header_section",
              children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-lg mx-auto", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-5", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    motion.div,
                    {
                      initial: { scale: 0.8, opacity: 0 },
                      animate: { scale: 1, opacity: 1 },
                      transition: { type: "spring", stiffness: 300, damping: 22 },
                      className: "relative shrink-0",
                      "data-ocid": "profile.avatar",
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "div",
                          {
                            className: "w-20 h-20 rounded-full flex items-center justify-center font-display text-2xl font-black text-background shadow-glow-gold border-2 border-primary",
                            style: { background: "oklch(var(--primary))" },
                            children: initials
                          }
                        ),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute bottom-1 right-1 w-3.5 h-3.5 rounded-full bg-secondary border-2 border-card" })
                      ]
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 min-w-0 pt-1", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-2", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-2xl font-black text-foreground truncate", children: user.name }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-body text-sm text-muted-foreground mt-0.5", children: [
                        displayCountry,
                        " ·",
                        " ",
                        (countryInfo == null ? void 0 : countryInfo.currency) ?? user.currency
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-body text-xs text-muted-foreground mt-1", children: [
                        t("Miembro desde", "Member since"),
                        " ",
                        memberYear
                      ] })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "button",
                      {
                        type: "button",
                        onClick: handleEditProfileClick,
                        "data-ocid": "profile.edit_button",
                        className: cn(
                          "shrink-0 w-9 h-9 rounded-xl flex items-center justify-center border transition-smooth mt-0.5",
                          editMode ? "bg-primary/20 border-primary text-primary" : "bg-muted/50 border-border text-muted-foreground hover:text-foreground hover:border-primary/50"
                        ),
                        "aria-pressed": editMode,
                        "aria-label": t("Editar perfil", "Edit profile"),
                        children: /* @__PURE__ */ jsxRuntimeExports.jsx(Pencil, { size: 15 })
                      }
                    )
                  ] }) })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    className: "grid grid-cols-4 gap-3 mt-6",
                    "data-ocid": "profile.stats_section",
                    children: [
                      {
                        emoji: "🎟️",
                        value: user.ticketsBought,
                        labelEs: "Comprados",
                        labelEn: "Bought",
                        ocid: "profile.stat_tickets"
                      },
                      {
                        emoji: "🏆",
                        value: user.wins,
                        labelEs: "Premios",
                        labelEn: "Prizes",
                        ocid: "profile.stat_wins"
                      },
                      {
                        emoji: "🎁",
                        value: 2,
                        labelEs: "Regalados",
                        labelEn: "Gifted",
                        ocid: "profile.stat_gifted"
                      },
                      {
                        emoji: "⭐",
                        value: 14,
                        labelEs: "Favorito",
                        labelEn: "Lucky#",
                        ocid: "profile.stat_lucky"
                      }
                    ].map((s) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      motion.div,
                      {
                        initial: { opacity: 0, y: 10 },
                        animate: { opacity: 1, y: 0 },
                        transition: { delay: 0.1 },
                        className: "ticket-card bg-background/60 border border-primary/15 p-3 flex flex-col items-center gap-1",
                        "data-ocid": s.ocid,
                        children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xl", children: s.emoji }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display text-xl font-black text-primary leading-none", children: s.value }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-body text-[10px] text-muted-foreground text-center leading-tight", children: t(s.labelEs, s.labelEn) })
                        ]
                      },
                      s.ocid
                    ))
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  motion.div,
                  {
                    initial: { opacity: 0, x: -10 },
                    animate: { opacity: 1, x: 0 },
                    transition: { delay: 0.2 },
                    className: "mt-4 inline-flex items-center gap-2 bg-secondary/15 border border-secondary/30 rounded-full px-4 py-2",
                    "data-ocid": "profile.last_win_highlight",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm", children: "🏅" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-body text-xs text-secondary font-semibold", children: t("Último premio:", "Last win:") }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-body text-xs text-foreground", children: "$2,500 USD · Classic 6/45" })
                    ]
                  }
                )
              ] })
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "max-w-lg mx-auto px-4 pt-6",
              "data-ocid": "profile.badges_section",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-sm font-bold text-muted-foreground uppercase tracking-widest mb-3", children: t("Insignias", "Badges") }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-3 overflow-x-auto pb-2", children: user.badges.map((badge, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  motion.div,
                  {
                    initial: { opacity: 0, scale: 0.8 },
                    animate: { opacity: 1, scale: 1 },
                    transition: { delay: i * 0.08 },
                    className: "ticket-card bg-card border border-primary/20 p-3 flex flex-col items-center gap-1 shrink-0 w-20 hover:border-primary/50 transition-smooth",
                    "data-ocid": `profile.badge.${i + 1}`,
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-2xl", children: badge.emoji }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-body text-[11px] text-center text-foreground leading-tight", children: t(badge.nameEs, badge.name) })
                    ]
                  },
                  badge.id
                )) })
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-w-lg mx-auto px-4 pt-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Link,
            {
              to: "/admin",
              "data-ocid": "profile.admin_panel_link",
              className: "ticket-card flex items-center gap-4 p-4 border border-primary/25 bg-primary/5 hover:border-primary/45 hover:bg-primary/10 transition-smooth group",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "shrink-0 w-11 h-11 rounded-xl bg-primary/15 border border-primary/30 flex items-center justify-center text-primary group-hover:shadow-glow-gold transition-smooth", children: /* @__PURE__ */ jsxRuntimeExports.jsx(LayoutDashboard, { size: 22, "aria-hidden": true }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0 flex-1 text-left", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display text-sm font-bold text-foreground", children: t("Panel de administración", "Administration panel") }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-body text-xs text-muted-foreground mt-0.5", children: t(
                    "Gestionar sorteos y vista operativa",
                    "Manage draws and operational view"
                  ) })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground group-hover:text-primary text-sm font-body shrink-0", children: "→" })
              ]
            }
          ) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "max-w-lg mx-auto px-4 pt-6 flex flex-col gap-3",
              ref: sectionRef,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  SectionAccordion,
                  {
                    id: "account",
                    label: t("Cuenta / Account", "Account / Cuenta"),
                    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Mail, { size: 17 }),
                    open: openSection === "account",
                    onToggle: toggleSection,
                    children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-4", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("label", { htmlFor: "email-input", className: labelCls, children: t("Correo electrónico", "Email address") }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "input",
                          {
                            id: "email-input",
                            type: "email",
                            value: email,
                            onChange: (e) => setEmail(e.target.value),
                            disabled: !editMode,
                            placeholder: "tu@correo.com",
                            className: cn(
                              inputCls,
                              !editMode && "opacity-60 cursor-not-allowed"
                            ),
                            "data-ocid": "profile.account.email_input"
                          }
                        )
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("label", { htmlFor: "country-select", className: labelCls, children: t("País", "Country") }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "select",
                          {
                            id: "country-select",
                            value: country,
                            onChange: (e) => setCountry(e.target.value),
                            disabled: !editMode,
                            className: cn(
                              inputCls,
                              !editMode && "opacity-60 cursor-not-allowed"
                            ),
                            "data-ocid": "profile.account.country_select",
                            children: COUNTRIES.map((c) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: c.code, children: c.label }, c.code))
                          }
                        )
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("label", { htmlFor: "currency-select", className: labelCls, children: t("Moneda preferida", "Preferred currency") }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "select",
                          {
                            id: "currency-select",
                            value: currency,
                            onChange: (e) => setCurrency(e.target.value),
                            disabled: !editMode,
                            className: cn(
                              inputCls,
                              !editMode && "opacity-60 cursor-not-allowed"
                            ),
                            "data-ocid": "profile.account.currency_select",
                            children: CURRENCIES.map((c) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: c, children: c }, c))
                          }
                        )
                      ] }),
                      editMode && /* @__PURE__ */ jsxRuntimeExports.jsx(
                        motion.div,
                        {
                          initial: { opacity: 0, y: 6 },
                          animate: { opacity: 1, y: 0 },
                          children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                            GlowButton,
                            {
                              type: "button",
                              variant: "gold",
                              size: "md",
                              className: "w-full",
                              "data-ocid": "profile.account.save_button",
                              onClick: () => {
                                saveProfileAccount({
                                  email,
                                  countryCode: country,
                                  currency
                                });
                                setEditMode(false);
                                ue.success(
                                  t("Cambios guardados ✓", "Changes saved ✓")
                                );
                              },
                              children: t("Guardar cambios", "Save changes")
                            }
                          )
                        }
                      )
                    ] })
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  SectionAccordion,
                  {
                    id: "payout",
                    label: t("Datos de cobro de premios", "Prize payout details"),
                    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Wallet, { size: 17 }),
                    open: openSection === "payout",
                    onToggle: toggleSection,
                    children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      "div",
                      {
                        className: "flex flex-col gap-4",
                        "data-ocid": "profile.payout.body",
                        children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-2", children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-body text-xs text-muted-foreground leading-relaxed flex-1", children: t(
                              "Usaremos estos datos para liquidar premios ganadores. Puedes cambiarlos cuando quieras.",
                              "We use this information to pay out prizes. You can update it anytime."
                            ) }),
                            /* @__PURE__ */ jsxRuntimeExports.jsx(
                              "button",
                              {
                                type: "button",
                                onClick: () => {
                                  if (payoutEditMode) {
                                    setPayoutProfile(loadPayoutProfile());
                                    setPayoutEditMode(false);
                                  } else {
                                    setPayoutEditMode(true);
                                  }
                                },
                                "data-ocid": "profile.payout.edit_toggle",
                                className: cn(
                                  "shrink-0 w-9 h-9 rounded-xl flex items-center justify-center border transition-smooth",
                                  payoutEditMode ? "bg-muted/80 border-border text-foreground" : "bg-muted/50 border-border text-muted-foreground hover:text-foreground hover:border-primary/50"
                                ),
                                "aria-label": payoutEditMode ? t("Cancelar edición", "Cancel editing") : t("Editar datos de cobro", "Edit payout details"),
                                children: payoutEditMode ? /* @__PURE__ */ jsxRuntimeExports.jsx(X, { size: 15 }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Pencil, { size: 15 })
                              }
                            )
                          ] }),
                          /* @__PURE__ */ jsxRuntimeExports.jsxs(
                            "div",
                            {
                              className: "flex flex-col gap-3",
                              "data-ocid": "profile.payout.contact_fields",
                              children: [
                                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: labelCls, children: t("Datos para liquidación", "Payout identity") }),
                                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                                  /* @__PURE__ */ jsxRuntimeExports.jsx("label", { htmlFor: "payout-contact-name", className: labelCls, children: t(
                                    "Nombre completo (como en identificación)",
                                    "Full name (as on ID)"
                                  ) }),
                                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                                    "input",
                                    {
                                      id: "payout-contact-name",
                                      type: "text",
                                      autoComplete: "name",
                                      disabled: !payoutEditMode,
                                      value: payoutProfile.contactFullName,
                                      onChange: (e) => setPayoutProfile((p) => ({
                                        ...p,
                                        contactFullName: e.target.value
                                      })),
                                      className: cn(
                                        inputCls,
                                        !payoutEditMode && "opacity-60 cursor-not-allowed"
                                      ),
                                      "data-ocid": "profile.payout.contact_name_input"
                                    }
                                  )
                                ] }),
                                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                                  /* @__PURE__ */ jsxRuntimeExports.jsx("label", { htmlFor: "payout-contact-phone", className: labelCls, children: t("Teléfono de contacto", "Contact phone") }),
                                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                                    "input",
                                    {
                                      id: "payout-contact-phone",
                                      type: "tel",
                                      autoComplete: "tel",
                                      disabled: !payoutEditMode,
                                      value: payoutProfile.contactPhone,
                                      onChange: (e) => setPayoutProfile((p) => ({
                                        ...p,
                                        contactPhone: e.target.value
                                      })),
                                      placeholder: t(
                                        "Ej. +52 55 1234 5678",
                                        "e.g. +1 415 555 0100"
                                      ),
                                      className: cn(
                                        inputCls,
                                        !payoutEditMode && "opacity-60 cursor-not-allowed"
                                      ),
                                      "data-ocid": "profile.payout.contact_phone_input"
                                    }
                                  )
                                ] })
                              ]
                            }
                          ),
                          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { "data-ocid": "profile.payout.method_list", children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: labelCls, children: t("Método preferido", "Preferred method") }),
                            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-col gap-2 mt-2", children: PAYOUT_OPTIONS.map((opt) => {
                              const isSel = payoutProfile.preferredMethod === opt.key;
                              return /* @__PURE__ */ jsxRuntimeExports.jsxs(
                                "button",
                                {
                                  type: "button",
                                  disabled: !payoutEditMode,
                                  onClick: () => setPayoutProfile((p) => ({
                                    ...p,
                                    preferredMethod: opt.key
                                  })),
                                  "data-ocid": `profile.payout.method_${opt.key}`,
                                  className: cn(
                                    "w-full ticket-card p-3 border text-left transition-smooth flex items-center gap-3 rounded-xl",
                                    isSel ? "border-primary/60 bg-primary/10" : "border-border bg-card/80",
                                    !payoutEditMode && "opacity-70 cursor-not-allowed"
                                  ),
                                  children: [
                                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-2xl shrink-0", children: opt.icon }),
                                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0 flex-1", children: [
                                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display text-sm font-bold text-foreground", children: t(opt.titleEs, opt.titleEn) }),
                                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-body text-[11px] text-muted-foreground", children: t(opt.subtitleEs, opt.subtitleEn) })
                                    ] })
                                  ]
                                },
                                opt.key
                              );
                            }) })
                          ] }),
                          payoutProfile.preferredMethod === "Wallet" && /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "div",
                            {
                              className: "rounded-xl bg-muted/40 border border-border px-4 py-3",
                              "data-ocid": "profile.payout.wallet_info",
                              children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-body text-sm text-foreground leading-relaxed", children: t(
                                "Los premios en cartera digital se acreditan a tu saldo LSBFL de forma instantánea.",
                                "Digital wallet prizes are credited to your LSBFL balance instantly."
                              ) })
                            }
                          ),
                          payoutProfile.preferredMethod === "BankTransfer" && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                            "div",
                            {
                              className: "flex flex-col gap-3",
                              "data-ocid": "profile.payout.bank_fields",
                              children: [
                                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                                  /* @__PURE__ */ jsxRuntimeExports.jsx("label", { htmlFor: "payout-bank-holder", className: labelCls, children: t("Titular de la cuenta", "Account holder") }),
                                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                                    "input",
                                    {
                                      id: "payout-bank-holder",
                                      type: "text",
                                      disabled: !payoutEditMode,
                                      value: payoutProfile.bank.accountHolder,
                                      onChange: (e) => setPayoutProfile((p) => ({
                                        ...p,
                                        bank: {
                                          ...p.bank,
                                          accountHolder: e.target.value
                                        }
                                      })),
                                      className: cn(
                                        inputCls,
                                        !payoutEditMode && "opacity-60 cursor-not-allowed"
                                      ),
                                      "data-ocid": "profile.payout.bank_holder_input"
                                    }
                                  )
                                ] }),
                                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                                  /* @__PURE__ */ jsxRuntimeExports.jsx("label", { htmlFor: "payout-bank-name", className: labelCls, children: t("Banco", "Bank name") }),
                                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                                    "input",
                                    {
                                      id: "payout-bank-name",
                                      type: "text",
                                      disabled: !payoutEditMode,
                                      value: payoutProfile.bank.bankName,
                                      onChange: (e) => setPayoutProfile((p) => ({
                                        ...p,
                                        bank: { ...p.bank, bankName: e.target.value }
                                      })),
                                      className: cn(
                                        inputCls,
                                        !payoutEditMode && "opacity-60 cursor-not-allowed"
                                      ),
                                      "data-ocid": "profile.payout.bank_name_input"
                                    }
                                  )
                                ] }),
                                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                                  /* @__PURE__ */ jsxRuntimeExports.jsx("label", { htmlFor: "payout-clabe", className: labelCls, children: t("CLABE / IBAN / cuenta", "CLABE / IBAN / account") }),
                                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                                    "input",
                                    {
                                      id: "payout-clabe",
                                      type: "text",
                                      inputMode: "numeric",
                                      autoComplete: "off",
                                      disabled: !payoutEditMode,
                                      value: payoutProfile.bank.clabeOrIban,
                                      onChange: (e) => setPayoutProfile((p) => ({
                                        ...p,
                                        bank: { ...p.bank, clabeOrIban: e.target.value }
                                      })),
                                      className: cn(
                                        inputCls,
                                        !payoutEditMode && "opacity-60 cursor-not-allowed"
                                      ),
                                      "data-ocid": "profile.payout.bank_clabe_input"
                                    }
                                  )
                                ] }),
                                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                                  /* @__PURE__ */ jsxRuntimeExports.jsx("label", { htmlFor: "payout-tax", className: labelCls, children: t("RFC / ID fiscal (opcional)", "Tax ID (optional)") }),
                                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                                    "input",
                                    {
                                      id: "payout-tax",
                                      type: "text",
                                      disabled: !payoutEditMode,
                                      value: payoutProfile.bank.taxId ?? "",
                                      onChange: (e) => setPayoutProfile((p) => ({
                                        ...p,
                                        bank: { ...p.bank, taxId: e.target.value }
                                      })),
                                      className: cn(
                                        inputCls,
                                        !payoutEditMode && "opacity-60 cursor-not-allowed"
                                      ),
                                      "data-ocid": "profile.payout.bank_tax_input"
                                    }
                                  )
                                ] })
                              ]
                            }
                          ),
                          payoutProfile.preferredMethod === "StoreCredit" && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                            "div",
                            {
                              className: "flex flex-col gap-3",
                              "data-ocid": "profile.payout.store_fields",
                              children: [
                                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                                  /* @__PURE__ */ jsxRuntimeExports.jsx("label", { htmlFor: "payout-city", className: labelCls, children: t("Ciudad o zona preferida", "Preferred city or area") }),
                                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                                    "input",
                                    {
                                      id: "payout-city",
                                      type: "text",
                                      disabled: !payoutEditMode,
                                      value: payoutProfile.preferredCity,
                                      onChange: (e) => setPayoutProfile((p) => ({
                                        ...p,
                                        preferredCity: e.target.value
                                      })),
                                      placeholder: t("Ej. CDMX", "e.g. Mexico City"),
                                      className: cn(
                                        inputCls,
                                        !payoutEditMode && "opacity-60 cursor-not-allowed"
                                      ),
                                      "data-ocid": "profile.payout.store_city_input"
                                    }
                                  )
                                ] }),
                                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                                  Link,
                                  {
                                    to: "/map",
                                    className: "inline-flex items-center gap-2 font-body text-sm text-primary font-semibold hover:underline",
                                    "data-ocid": "profile.payout.store_map_link",
                                    children: [
                                      t("Ver mapa de tiendas", "View store map"),
                                      " →"
                                    ]
                                  }
                                )
                              ]
                            }
                          ),
                          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-2 rounded-xl bg-muted/30 border border-border px-3 py-2.5", children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx(
                              ShieldAlert,
                              {
                                size: 14,
                                className: "text-muted-foreground shrink-0 mt-0.5"
                              }
                            ),
                            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-body text-[11px] text-muted-foreground leading-relaxed", children: t(
                              "Datos sensibles: solo para liquidación de premios, no se comparten con fines publicitarios.",
                              "Sensitive data: used for prize payouts only, not for marketing."
                            ) })
                          ] }),
                          payoutEditMode && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-col gap-2 pt-1", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                            GlowButton,
                            {
                              type: "button",
                              variant: "gold",
                              size: "md",
                              className: "w-full",
                              "data-ocid": "profile.payout.save_button",
                              onClick: () => {
                                savePayoutProfile(payoutProfile);
                                setPayoutEditMode(false);
                                ue.success(
                                  t(
                                    "Datos de cobro guardados ✓",
                                    "Payout details saved ✓"
                                  )
                                );
                              },
                              children: t("Guardar datos de cobro", "Save payout details")
                            }
                          ) })
                        ]
                      }
                    )
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  SectionAccordion,
                  {
                    id: "notifications",
                    label: t(
                      "Notificaciones / Notifications",
                      "Notifications / Notificaciones"
                    ),
                    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Bell, { size: 17 }),
                    open: openSection === "notifications",
                    onToggle: toggleSection,
                    children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col divide-y divide-border", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        LabeledToggle,
                        {
                          label: t("Sorteo por comenzar", "Draw about to start"),
                          checked: notifs.draw_start,
                          onChange: () => toggleNotif("draw_start"),
                          toggleId: "notif-draw-start",
                          ocid: "profile.notif.draw_start"
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        LabeledToggle,
                        {
                          label: t("Resultado del sorteo", "Draw results"),
                          checked: notifs.draw_results,
                          onChange: () => toggleNotif("draw_results"),
                          toggleId: "notif-draw-results",
                          ocid: "profile.notif.draw_results"
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        LabeledToggle,
                        {
                          label: t("Premio ganado", "Prize won"),
                          sublabel: t("Notificación inmediata", "Immediate notification"),
                          checked: notifs.prize_won,
                          onChange: () => toggleNotif("prize_won"),
                          toggleId: "notif-prize",
                          ocid: "profile.notif.prize_won"
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        LabeledToggle,
                        {
                          label: t("Boleto sin reclamar", "Unclaimed ticket"),
                          checked: notifs.unclaimed,
                          onChange: () => toggleNotif("unclaimed"),
                          toggleId: "notif-unclaimed",
                          ocid: "profile.notif.unclaimed"
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        LabeledToggle,
                        {
                          label: t("Noticias y ofertas", "News and offers"),
                          checked: notifs.news,
                          onChange: () => toggleNotif("news"),
                          toggleId: "notif-news",
                          ocid: "profile.notif.news"
                        }
                      )
                    ] })
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  SectionAccordion,
                  {
                    id: "appearance",
                    label: t("Idioma y apariencia", "Language & appearance"),
                    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Globe, { size: 17 }),
                    open: openSection === "appearance",
                    onToggle: toggleSection,
                    children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-5", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: labelCls, children: t("Idioma", "Language") }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "div",
                          {
                            className: "flex rounded-2xl border border-border overflow-hidden",
                            "aria-label": t("Seleccionar idioma", "Select language"),
                            children: ["es", "en"].map((l) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                              "button",
                              {
                                type: "button",
                                "aria-pressed": lang === l,
                                onClick: () => lang !== l && toggleLang(),
                                "data-ocid": `profile.lang_option_${l}`,
                                className: cn(
                                  "flex-1 py-3 font-body font-semibold text-sm transition-smooth",
                                  lang === l ? "bg-primary text-primary-foreground shadow-glow-gold" : "bg-muted/30 text-muted-foreground hover:text-foreground"
                                ),
                                children: l === "es" ? "🇲🇽 Español" : "🇺🇸 English"
                              },
                              l
                            ))
                          }
                        )
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: labelCls, children: t("Tema", "Theme") }),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs(
                          "div",
                          {
                            className: "flex rounded-2xl border border-border overflow-hidden",
                            "aria-label": t("Seleccionar tema", "Select theme"),
                            children: [
                              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                                "button",
                                {
                                  type: "button",
                                  "aria-pressed": isDark,
                                  onClick: () => !isDark && toggleTheme(),
                                  "data-ocid": "profile.theme_option_dark",
                                  className: cn(
                                    "flex-1 py-3 flex items-center justify-center gap-2 font-body font-semibold text-sm transition-smooth",
                                    isDark ? "bg-primary text-primary-foreground shadow-glow-gold" : "bg-muted/30 text-muted-foreground hover:text-foreground"
                                  ),
                                  children: [
                                    /* @__PURE__ */ jsxRuntimeExports.jsx(Moon, { size: 14 }),
                                    t("Oscuro", "Dark")
                                  ]
                                }
                              ),
                              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                                "button",
                                {
                                  type: "button",
                                  "aria-pressed": !isDark,
                                  onClick: () => isDark && toggleTheme(),
                                  "data-ocid": "profile.theme_option_light",
                                  className: cn(
                                    "flex-1 py-3 flex items-center justify-center gap-2 font-body font-semibold text-sm transition-smooth",
                                    !isDark ? "bg-primary text-primary-foreground shadow-glow-gold" : "bg-muted/30 text-muted-foreground hover:text-foreground"
                                  ),
                                  children: [
                                    /* @__PURE__ */ jsxRuntimeExports.jsx(Sun, { size: 14 }),
                                    t("Claro", "Light")
                                  ]
                                }
                              )
                            ]
                          }
                        )
                      ] })
                    ] })
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  SectionAccordion,
                  {
                    id: "responsible",
                    label: t("Juego responsable", "Responsible gaming"),
                    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Shield, { size: 17 }),
                    open: openSection === "responsible",
                    onToggle: toggleSection,
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-5 rounded-2xl bg-secondary/10 border border-secondary/25 px-4 py-3.5", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-body text-sm text-foreground leading-relaxed", children: [
                        "🌿",
                        " ",
                        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold", children: t(
                          "Tu bienestar es parte de la experiencia.",
                          "Your wellbeing is part of the experience."
                        ) }),
                        " ",
                        t(
                          "Jugar debe ser siempre un disfrute.",
                          "Playing should always be enjoyable."
                        )
                      ] }) }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-3 mb-5", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: labelCls, children: t("Límites de gasto", "Spending limits") }),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "label",
                            {
                              htmlFor: "daily-limit",
                              className: "font-body text-xs text-muted-foreground mb-1 block",
                              children: t("Límite diario (USD)", "Daily limit (USD)")
                            }
                          ),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "input",
                            {
                              id: "daily-limit",
                              type: "number",
                              min: "0",
                              value: limits.daily,
                              onChange: (e) => setLimits((l) => ({ ...l, daily: e.target.value })),
                              placeholder: "$0.00",
                              className: inputCls,
                              "data-ocid": "profile.responsible.daily_limit_input"
                            }
                          )
                        ] }),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "label",
                            {
                              htmlFor: "monthly-limit",
                              className: "font-body text-xs text-muted-foreground mb-1 block",
                              children: t("Límite mensual (USD)", "Monthly limit (USD)")
                            }
                          ),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "input",
                            {
                              id: "monthly-limit",
                              type: "number",
                              min: "0",
                              value: limits.monthly,
                              onChange: (e) => setLimits((l) => ({ ...l, monthly: e.target.value })),
                              placeholder: "$0.00",
                              className: inputCls,
                              "data-ocid": "profile.responsible.monthly_limit_input"
                            }
                          )
                        ] })
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs(
                        GlowButton,
                        {
                          type: "button",
                          variant: "green",
                          size: "md",
                          className: "w-full mb-3",
                          "data-ocid": "profile.responsible.break_button",
                          onClick: () => setShowBreak(true),
                          children: [
                            "🌿 ",
                            t("Tomar una pausa", "Take a break")
                          ]
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "button",
                        {
                          type: "button",
                          "data-ocid": "profile.responsible.self_exclusion_link",
                          className: "w-full text-center font-body text-sm text-muted-foreground underline underline-offset-2 hover:text-destructive transition-colors py-1",
                          onClick: () => ue.warning(
                            t(
                              "Contacta soporte para autoexclusión.",
                              "Contact support for self-exclusion."
                            )
                          ),
                          children: t(
                            "Autoexclusión / Self-exclusion",
                            "Self-exclusion / Autoexclusión"
                          )
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-4 rounded-xl bg-muted/40 border border-border px-4 py-3 text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-body text-xs text-muted-foreground", children: [
                        t("¿Necesitas ayuda?", "Need help?"),
                        " ",
                        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary font-semibold", children: "Línea 800-LSBFL" })
                      ] }) })
                    ]
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  SectionAccordion,
                  {
                    id: "privacy",
                    label: t("Privacidad / Privacy", "Privacy / Privacidad"),
                    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { size: 17 }),
                    open: openSection === "privacy",
                    onToggle: toggleSection,
                    children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-4", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        LabeledToggle,
                        {
                          label: t("Mostrar mi nombre si gano", "Show my name if I win"),
                          sublabel: t(
                            "Aparecerás en el muro de ganadores",
                            "You'll appear on the winners wall"
                          ),
                          checked: showName,
                          onChange: () => setShowName((v) => !v),
                          toggleId: "privacy-show-name",
                          ocid: "profile.privacy.show_name_toggle"
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-2 pt-1 border-t border-border", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsxs(
                          GlowButton,
                          {
                            type: "button",
                            variant: "outline",
                            size: "sm",
                            className: "w-full gap-2",
                            "data-ocid": "profile.privacy.export_button",
                            onClick: () => ue.success(
                              t(
                                "Descarga lista en tu correo 📩",
                                "Download link sent to your email 📩"
                              )
                            ),
                            children: [
                              /* @__PURE__ */ jsxRuntimeExports.jsx(Download, { size: 14 }),
                              t("Exportar mis datos", "Export my data")
                            ]
                          }
                        ),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs(
                          "button",
                          {
                            type: "button",
                            "data-ocid": "profile.privacy.delete_account_button",
                            onClick: () => setShowDelete(true),
                            className: "w-full flex items-center justify-center gap-2 h-9 px-4 rounded-xl font-body text-sm text-destructive/80 hover:text-destructive border border-transparent hover:border-destructive/30 hover:bg-destructive/5 transition-smooth",
                            children: [
                              /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { size: 14 }),
                              t(
                                "Solicitar eliminación de cuenta",
                                "Request account deletion"
                              )
                            ]
                          }
                        )
                      ] })
                    ] })
                  }
                )
              ]
            }
          )
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(BreakModal, { open: showBreak, onClose: () => setShowBreak(false), t }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      DeleteDialog,
      {
        open: showDelete,
        onClose: () => setShowDelete(false),
        t
      }
    )
  ] });
}
export {
  ProfilePage as default
};
