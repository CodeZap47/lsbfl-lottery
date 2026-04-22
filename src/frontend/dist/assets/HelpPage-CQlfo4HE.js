import { c as createLucideIcon, a as useLanguage, r as reactExports, j as jsxRuntimeExports, e as Trophy, b as cn, f as ue } from "./index-6HgylvRh.js";
import { G as GlowButton } from "./GlowButton-Duv2phZR.js";
import { m as motion } from "./proxy-HmngNdo3.js";
import { S as Search } from "./search-ClXG3ZDc.js";
import { S as ShoppingCart } from "./shopping-cart-D-fehQPQ.js";
import { S as ShieldCheck } from "./shield-check-mivpJYFB.js";
import { A as AnimatePresence } from "./index-DocTykfO.js";
import { C as ChevronDown } from "./chevron-down-D77ky-PO.js";
import { X } from "./x-gBBbqBmc.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M7.9 20A9 9 0 1 0 4 16.1L2 22Z", key: "vv11sd" }]
];
const MessageCircle = createLucideIcon("message-circle", __iconNode);
const STEPS = [
  {
    emoji: "🎟️",
    titleEs: "Compra tu boleto",
    titleEn: "Buy your ticket",
    descEs: "Adquiere digitalmente desde tu dispositivo o en una tienda física cerca de ti.",
    descEn: "Purchase digitally from your device or at a physical store near you."
  },
  {
    emoji: "🎯",
    titleEs: "Elige tus números",
    titleEn: "Pick your numbers",
    descEs: "Selecciona tus números de la suerte o déjanos elegir por ti con QuickPick.",
    descEn: "Select your lucky numbers or let us choose for you with QuickPick."
  },
  {
    emoji: "🎰",
    titleEs: "Mira el sorteo en vivo",
    titleEn: "Watch the live draw",
    descEs: "Cada sorteo es un show animado en tiempo real con bolas giratorias y confeti.",
    descEn: "Every draw is an animated real-time show with spinning balls and confetti."
  },
  {
    emoji: "🏆",
    titleEs: "Cobra tu premio",
    titleEn: "Claim your prize",
    descEs: "Retira tus ganancias a tu wallet, cuenta bancaria o crédito en tienda.",
    descEn: "Withdraw your winnings to your wallet, bank account, or store credit."
  }
];
const FAQS = [
  {
    qEs: "¿Cómo compro un boleto?",
    qEn: "How do I buy a ticket?",
    aEs: "Selecciona una lotería activa desde la pantalla principal. Elige tus números o usa QuickPick, elige tu método de pago (crypto, tarjeta o saldo interno) y confirma. Recibirás un boleto digital con código único en tu wallet.",
    aEn: "Select an active lottery from the main screen. Choose your numbers or use QuickPick, pick your payment method (crypto, card, or internal balance) and confirm. You'll receive a digital ticket with a unique code in your wallet."
  },
  {
    qEs: "¿Cuáles son las probabilidades de ganar?",
    qEn: "What are the odds of winning?",
    aEs: "Las probabilidades varían por tipo: Clásica 6/45 → 1 en 8,145,060 para el jackpot; Premio menor (3 de 6) → 1 en 57. La lotería Sin Pérdida garantiza retorno del 80% del precio. Mostramos probabilidades exactas antes de comprar.",
    aEn: "Odds vary by type: Classic 6/45 → 1 in 8,145,060 for the jackpot; Minor prize (3 of 6) → 1 in 57. The No-Loss lottery guarantees 80% return of the ticket price. We always show exact odds before you buy."
  },
  {
    qEs: "¿Cómo reclamo mi premio?",
    qEn: "How do I claim my prize?",
    aEs: "Los premios menores se acreditan automáticamente en tu wallet tras el sorteo. Para premios mayores, recibirás notificación con instrucciones. Puedes transferir a tu banco, retirar en tienda asociada o mantenerlo para futuros boletos.",
    aEn: "Minor prizes are automatically credited to your LSBFL wallet after the draw. For major prizes, you'll receive a notification with instructions. You can transfer to your bank, withdraw at a partner store, or keep it as balance for future tickets."
  },
  {
    qEs: "¿Es LSBFL una lotería legal?",
    qEn: "Is LSBFL a legal lottery?",
    aEs: "Sí. LSBFL opera bajo certificaciones internacionales de juego responsable y cumple con regulaciones de cada país donde opera. Nuestros sorteos son auditados por terceros independientes y los resultados son verificables en blockchain.",
    aEn: "Yes. LSBFL operates under international responsible gaming certifications and complies with regulations in every country it operates in. Our draws are audited by independent third parties and results are verifiable on the blockchain."
  },
  {
    qEs: "¿Puedo regalar boletos?",
    qEn: "Can I gift tickets?",
    aEs: "¡Claro! Puedes regalar boletos a través de un enlace personalizado que envías por WhatsApp, email o redes sociales. El destinatario crea su cuenta gratis y el boleto aparece en su wallet automáticamente.",
    aEn: "Absolutely! You can gift tickets via a personalized link sent by WhatsApp, email, or social media. The recipient creates their free account and the ticket appears in their wallet automatically."
  },
  {
    qEs: "¿Qué es la lotería 'sin pérdida' (no-loss)?",
    qEn: "What is the 'no-loss' lottery?",
    aEs: "En la lotería Sin Pérdida, el 80% del precio de tu boleto se deposita en un fondo de ahorro que gana intereses. Si no ganas el jackpot, recuperas tu depósito más intereses al final del período. Es la forma más segura de jugar.",
    aEn: "In the No-Loss lottery, 80% of your ticket price is deposited in a savings fund that earns interest. If you don't win the jackpot, you get your deposit back plus interest at the end of the period. It's the safest way to play."
  },
  {
    qEs: "¿Cómo funciona el sorteo en vivo?",
    qEn: "How does the live draw work?",
    aEs: "Los sorteos se transmiten en vivo dentro de la app. Una máquina de bolas animada selecciona los números ganadores en tiempo real. El resultado se registra en blockchain antes de anunciarse para evitar manipulaciones.",
    aEn: "Draws are streamed live within the app. An animated ball machine selects winning numbers in real time. The result is recorded on the blockchain before it's announced to prevent manipulation."
  },
  {
    qEs: "¿Cómo protegen mis datos?",
    qEn: "How is my data protected?",
    aEs: "Tu identidad se gestiona mediante Internet Identity, un sistema descentralizado sin contraseñas tradicionales. No almacenamos datos bancarios directamente. Todo se cifra en tránsito y en reposo. Puedes eliminar tu cuenta desde Perfil → Configuración.",
    aEn: "Your identity is managed through Internet Identity, a decentralized system with no traditional passwords. We don't store banking data directly. All data is encrypted in transit and at rest. You can delete your account from Profile → Settings."
  }
];
const QUICK_LINKS = [
  {
    Icon: ShoppingCart,
    labelEs: "Comprar boleto",
    labelEn: "Buy a ticket",
    href: "/purchase/classic-645"
  },
  {
    Icon: Trophy,
    labelEs: "Reclamar premio",
    labelEn: "Claim prize",
    href: "/wallet"
  },
  {
    Icon: ShieldCheck,
    labelEs: "Cuenta y seguridad",
    labelEn: "Account & security",
    href: "/profile"
  }
];
const LEGAL_CONTENT = {
  terms: {
    titleEs: "Términos y Condiciones",
    titleEn: "Terms & Conditions",
    bodyEs: "Al usar LSBFL aceptas nuestros términos de servicio. El uso de la plataforma está sujeto a la legislación de tu país de residencia. Los sorteos son administrados por LSBFL International S.A. Nos reservamos el derecho de suspender cuentas que infrinjan nuestras políticas de uso responsable. Para dudas sobre términos específicos, contáctanos a legal@lsbfl.io.",
    bodyEn: "By using LSBFL you accept our terms of service. Use of the platform is subject to the laws of your country of residence. Draws are administered by LSBFL International S.A. We reserve the right to suspend accounts that violate our responsible use policies. For questions about specific terms, contact us at legal@lsbfl.io."
  },
  privacy: {
    titleEs: "Política de Privacidad",
    titleEn: "Privacy Policy",
    bodyEs: "LSBFL recoge únicamente los datos necesarios para operar el servicio: identidad descentralizada, historial de transacciones y preferencias de idioma. No vendemos ni compartimos tus datos con terceros sin tu consentimiento. Puedes solicitar la exportación o eliminación de tus datos en cualquier momento desde Perfil → Configuración → Privacidad.",
    bodyEn: "LSBFL collects only the data necessary to operate the service: decentralized identity, transaction history, and language preferences. We do not sell or share your data with third parties without your consent. You can request export or deletion of your data at any time from Profile → Settings → Privacy."
  },
  licenses: {
    titleEs: "Licencias y Certificaciones",
    titleEn: "Licenses & Certifications",
    bodyEs: "LSBFL opera bajo las siguientes certificaciones: GLI (Gaming Laboratories International) para sorteos, ISO 27001 para seguridad de datos, y certificación de Juego Responsable de la World Lottery Association (WLA). Nuestros contratos inteligentes han sido auditados por CertiK y los reportes están disponibles en nuestro repositorio público.",
    bodyEn: "LSBFL operates under the following certifications: GLI (Gaming Laboratories International) for draws, ISO 27001 for data security, and World Lottery Association (WLA) Responsible Gaming certification. Our smart contracts have been audited by CertiK and reports are available in our public repository."
  }
};
function StepCard({
  step,
  index,
  t
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.div,
    {
      initial: { opacity: 0, y: 28 },
      whileInView: { opacity: 1, y: 0 },
      viewport: { once: true },
      transition: { duration: 0.5, delay: index * 0.1 },
      className: "flex flex-col items-center text-center gap-3 p-6 rounded-2xl bg-card border border-border hover:border-primary/40 transition-smooth group",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center text-3xl group-hover:scale-110 transition-smooth", children: step.emoji }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-6 h-6 rounded-full bg-primary/15 flex items-center justify-center text-xs font-mono font-bold text-primary", children: index + 1 }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-semibold text-base text-foreground leading-snug", children: t(step.titleEs, step.titleEn) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground leading-relaxed", children: t(step.descEs, step.descEn) })
      ]
    }
  );
}
function FaqItem({
  item,
  index,
  isOpen,
  onToggle,
  t
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.div,
    {
      initial: { opacity: 0, x: -12 },
      whileInView: { opacity: 1, x: 0 },
      viewport: { once: true },
      transition: { duration: 0.4, delay: index * 0.06 },
      className: "border border-border rounded-2xl overflow-hidden",
      "data-ocid": `faq.item.${index + 1}`,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            type: "button",
            onClick: onToggle,
            className: cn(
              "w-full flex items-center justify-between gap-4 px-5 py-4 text-left transition-smooth",
              isOpen ? "bg-primary/5" : "bg-card hover:bg-muted/40"
            ),
            "aria-expanded": isOpen,
            "data-ocid": `faq.toggle.${index + 1}`,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-body font-semibold text-foreground text-sm leading-snug min-w-0", children: t(item.qEs, item.qEn) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                ChevronDown,
                {
                  className: cn(
                    "shrink-0 w-5 h-5 text-muted-foreground transition-transform duration-300",
                    isOpen && "rotate-180 text-primary"
                  )
                }
              )
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { initial: false, children: isOpen && /* @__PURE__ */ jsxRuntimeExports.jsx(
          motion.div,
          {
            initial: { height: 0, opacity: 0 },
            animate: { height: "auto", opacity: 1 },
            exit: { height: 0, opacity: 0 },
            transition: { duration: 0.28, ease: "easeInOut" },
            children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-5 pb-5 pt-3 bg-muted/20", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground leading-relaxed", children: t(item.aEs, item.aEn) }) })
          },
          "answer"
        ) })
      ]
    }
  );
}
function ChatModal({
  onClose,
  t
}) {
  const [message, setMessage] = reactExports.useState("");
  const [email, setEmail] = reactExports.useState(() => {
    try {
      return localStorage.getItem("lsbfl-email") ?? "";
    } catch {
      return "";
    }
  });
  const [sending, setSending] = reactExports.useState(false);
  const textareaRef = reactExports.useRef(null);
  reactExports.useEffect(() => {
    var _a;
    (_a = textareaRef.current) == null ? void 0 : _a.focus();
  }, []);
  const handleSend = () => {
    if (!message.trim()) return;
    setSending(true);
    setTimeout(() => {
      setSending(false);
      onClose();
      ue.success(
        t(
          "¡Mensaje enviado! Te respondemos en menos de 24 horas.",
          "Message sent! We'll reply within 24 hours."
        ),
        { duration: 5e3 }
      );
    }, 1200);
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      role: "presentation",
      className: "fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4 bg-foreground/20 backdrop-blur-sm",
      onClick: (e) => e.target === e.currentTarget && onClose(),
      onKeyDown: (e) => e.key === "Escape" && onClose(),
      "data-ocid": "chat.dialog",
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { opacity: 0, y: 32 },
          animate: { opacity: 1, y: 0 },
          exit: { opacity: 0, y: 32 },
          transition: { duration: 0.3 },
          className: "w-full max-w-md bg-card border border-border rounded-3xl shadow-xl overflow-hidden",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between px-6 pt-6 pb-4 border-b border-border", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-10 h-10 rounded-2xl bg-secondary/20 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(MessageCircle, { className: "w-5 h-5 text-secondary" }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display font-semibold text-foreground text-sm", children: t("Soporte LSBFL", "LSBFL Support") }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: t(
                    "Respondemos en menos de 24 horas",
                    "We reply within 24 hours"
                  ) })
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  onClick: onClose,
                  className: "w-8 h-8 rounded-full flex items-center justify-center text-muted-foreground hover:bg-muted/40 transition-smooth",
                  "aria-label": t("Cerrar", "Close"),
                  "data-ocid": "chat.close_button",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-4 h-4" })
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-6 py-5 flex flex-col gap-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-1.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "label",
                  {
                    htmlFor: "chat-email",
                    className: "text-xs font-medium text-muted-foreground uppercase tracking-wide",
                    children: t("Tu email", "Your email")
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "input",
                  {
                    id: "chat-email",
                    type: "email",
                    value: email,
                    onChange: (e) => setEmail(e.target.value),
                    placeholder: "nombre@correo.com",
                    className: "w-full h-10 px-4 rounded-xl bg-muted/40 border border-input text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-smooth",
                    "data-ocid": "chat.input"
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-1.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "label",
                  {
                    htmlFor: "chat-message",
                    className: "text-xs font-medium text-muted-foreground uppercase tracking-wide",
                    children: t("Cuéntanos tu problema", "Tell us your issue")
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "textarea",
                  {
                    ref: textareaRef,
                    id: "chat-message",
                    value: message,
                    onChange: (e) => setMessage(e.target.value),
                    placeholder: t(
                      "Describe detalladamente tu consulta…",
                      "Describe your query in detail…"
                    ),
                    rows: 4,
                    className: "w-full px-4 py-3 rounded-xl bg-muted/40 border border-input text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring resize-none transition-smooth",
                    "data-ocid": "chat.textarea"
                  }
                )
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-6 pb-6 flex gap-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  onClick: onClose,
                  className: "flex-1 h-11 rounded-2xl border border-border text-sm font-medium text-muted-foreground hover:bg-muted/40 transition-smooth",
                  "data-ocid": "chat.cancel_button",
                  children: t("Cancelar", "Cancel")
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                GlowButton,
                {
                  type: "button",
                  size: "md",
                  variant: "green",
                  loading: sending,
                  disabled: !message.trim(),
                  onClick: handleSend,
                  className: "flex-1",
                  "data-ocid": "chat.submit_button",
                  children: t("Enviar", "Send")
                }
              )
            ] })
          ]
        }
      )
    }
  );
}
function LegalModalDialog({
  type,
  onClose,
  t
}) {
  const content = LEGAL_CONTENT[type];
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      role: "presentation",
      className: "fixed inset-0 z-50 flex items-center justify-center p-4 bg-foreground/20 backdrop-blur-sm",
      onClick: (e) => e.target === e.currentTarget && onClose(),
      onKeyDown: (e) => e.key === "Escape" && onClose(),
      "data-ocid": "legal.dialog",
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { opacity: 0, scale: 0.95 },
          animate: { opacity: 1, scale: 1 },
          exit: { opacity: 0, scale: 0.95 },
          transition: { duration: 0.25 },
          className: "w-full max-w-lg bg-card border border-border rounded-3xl shadow-xl overflow-hidden",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between px-6 pt-6 pb-4 border-b border-border", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-semibold text-foreground text-lg", children: t(content.titleEs, content.titleEn) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  onClick: onClose,
                  className: "w-8 h-8 rounded-full flex items-center justify-center text-muted-foreground hover:bg-muted/40 transition-smooth",
                  "aria-label": t("Cerrar", "Close"),
                  "data-ocid": "legal.close_button",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-4 h-4" })
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-6 py-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground leading-relaxed", children: t(content.bodyEs, content.bodyEn) }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-6 pb-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              GlowButton,
              {
                type: "button",
                size: "md",
                variant: "outline",
                onClick: onClose,
                className: "w-full",
                "data-ocid": "legal.confirm_button",
                children: t("Entendido", "Got it")
              }
            ) })
          ]
        }
      )
    }
  );
}
function HelpPage() {
  const { t } = useLanguage();
  const [search, setSearch] = reactExports.useState("");
  const [openFaqIndex, setOpenFaqIndex] = reactExports.useState(0);
  const [isChatOpen, setIsChatOpen] = reactExports.useState(false);
  const [legalOpen, setLegalOpen] = reactExports.useState(null);
  const filteredFaqs = FAQS.filter((faq) => {
    if (!search.trim()) return true;
    const q = search.toLowerCase();
    return faq.qEs.toLowerCase().includes(q) || faq.qEn.toLowerCase().includes(q) || faq.aEs.toLowerCase().includes(q) || faq.aEn.toLowerCase().includes(q);
  });
  const toggleFaq = (index) => {
    setOpenFaqIndex((prev) => prev === index ? null : index);
  };
  reactExports.useEffect(() => {
    const handleKey = (e) => {
      if (e.key !== "Escape") return;
      if (isChatOpen) setIsChatOpen(false);
      if (legalOpen) setLegalOpen(null);
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [isChatOpen, legalOpen]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "flex flex-col min-h-screen bg-background",
      "data-ocid": "help.page",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "bg-ceremonial border-b border-border px-4 py-14 flex flex-col items-center text-center gap-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.div,
            {
              initial: { opacity: 0, y: -16 },
              animate: { opacity: 1, y: 0 },
              transition: { duration: 0.6 },
              className: "flex flex-col items-center gap-3",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-5xl", "aria-hidden": "true", children: "🍀" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display font-bold text-3xl sm:text-4xl text-foreground leading-tight", children: t("Centro de ayuda", "Help Center") }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm max-w-xs", children: t(
                  "Aquí encontrarás todo lo que necesitas saber sobre LSBFL.",
                  "Here you'll find everything you need to know about LSBFL."
                ) })
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.div,
            {
              initial: { opacity: 0, y: 12 },
              animate: { opacity: 1, y: 0 },
              transition: { duration: 0.6, delay: 0.15 },
              className: "w-full max-w-lg relative",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Search,
                  {
                    className: "absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none",
                    "aria-hidden": "true"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "input",
                  {
                    type: "search",
                    value: search,
                    onChange: (e) => setSearch(e.target.value),
                    placeholder: t(
                      "¿En qué te podemos ayudar?",
                      "How can we help you?"
                    ),
                    className: "w-full h-12 pl-11 pr-4 rounded-2xl bg-card border border-border text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-smooth shadow-subtle",
                    "data-ocid": "help.search_input"
                  }
                )
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            motion.div,
            {
              initial: { opacity: 0 },
              animate: { opacity: 1 },
              transition: { duration: 0.6, delay: 0.3 },
              className: "flex flex-wrap justify-center gap-3",
              children: QUICK_LINKS.map((link) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "a",
                {
                  href: link.href,
                  className: "inline-flex items-center gap-2 px-4 h-9 rounded-xl bg-card border border-border text-sm font-medium text-foreground hover:border-primary/50 hover:text-primary hover:bg-primary/5 transition-smooth",
                  "data-ocid": "help.quick_link",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(link.Icon, { className: "w-3.5 h-3.5", "aria-hidden": "true" }),
                    t(link.labelEs, link.labelEn)
                  ]
                },
                link.href
              ))
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "section",
          {
            className: "px-4 py-14 max-w-4xl mx-auto w-full",
            "data-ocid": "help.how_it_works.section",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                motion.h2,
                {
                  initial: { opacity: 0 },
                  whileInView: { opacity: 1 },
                  viewport: { once: true },
                  transition: { duration: 0.5 },
                  className: "font-display font-bold text-2xl text-foreground text-center mb-10",
                  children: t("¿Cómo funciona LSBFL?", "How does LSBFL work?")
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5", children: STEPS.map((step, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(StepCard, { step, index: i, t }, step.titleEn)) })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "section",
          {
            className: "bg-muted/30 border-t border-border px-4 py-14",
            "data-ocid": "help.faq.section",
            children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-2xl mx-auto flex flex-col gap-6", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                motion.h2,
                {
                  initial: { opacity: 0 },
                  whileInView: { opacity: 1 },
                  viewport: { once: true },
                  transition: { duration: 0.5 },
                  className: "font-display font-bold text-2xl text-foreground text-center",
                  children: t("Preguntas frecuentes", "Frequently asked questions")
                }
              ),
              filteredFaqs.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  className: "py-10 text-center text-muted-foreground text-sm",
                  "data-ocid": "faq.empty_state",
                  children: t(
                    "No encontramos resultados para tu búsqueda.",
                    "No results found for your search."
                  )
                }
              ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-col gap-3", "data-ocid": "help.faq.list", children: filteredFaqs.map((faq, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                FaqItem,
                {
                  item: faq,
                  index: i,
                  isOpen: openFaqIndex === i,
                  onToggle: () => toggleFaq(i),
                  t
                },
                faq.qEn
              )) })
            ] })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "section",
          {
            className: "px-4 py-14 flex flex-col items-center gap-5 bg-background",
            "data-ocid": "help.support.section",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                motion.div,
                {
                  initial: { opacity: 0, y: 16 },
                  whileInView: { opacity: 1, y: 0 },
                  viewport: { once: true },
                  transition: { duration: 0.5 },
                  className: "flex flex-col items-center gap-2 text-center",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-3xl", "aria-hidden": "true", children: "💬" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-bold text-xl text-foreground", children: t("¿Necesitas más ayuda?", "Need more help?") }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground max-w-xs", children: t(
                      "Nuestro equipo responde en menos de 24 horas.",
                      "Our team replies within 24 hours."
                    ) })
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                GlowButton,
                {
                  type: "button",
                  size: "lg",
                  variant: "green",
                  shimmer: true,
                  onClick: () => setIsChatOpen(true),
                  "data-ocid": "help.chat.open_modal_button",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(MessageCircle, { className: "w-5 h-5", "aria-hidden": "true" }),
                    t("Hablar con soporte", "Chat with support")
                  ]
                }
              )
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "footer",
          {
            className: "bg-card border-t border-border px-4 py-6 flex flex-col items-center gap-3",
            "data-ocid": "help.footer",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap justify-center gap-4 text-xs text-muted-foreground", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    type: "button",
                    onClick: () => setLegalOpen("terms"),
                    className: "hover:text-foreground transition-smooth hover:underline underline-offset-2",
                    "data-ocid": "help.legal.terms_button",
                    children: t("Términos", "Terms")
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { "aria-hidden": "true", children: "·" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    type: "button",
                    onClick: () => setLegalOpen("privacy"),
                    className: "hover:text-foreground transition-smooth hover:underline underline-offset-2",
                    "data-ocid": "help.legal.privacy_button",
                    children: t("Privacidad", "Privacy")
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { "aria-hidden": "true", children: "·" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    type: "button",
                    onClick: () => setLegalOpen("licenses"),
                    className: "hover:text-foreground transition-smooth hover:underline underline-offset-2",
                    "data-ocid": "help.legal.licenses_button",
                    children: t("Licencias", "Licenses")
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
                "© ",
                (/* @__PURE__ */ new Date()).getFullYear(),
                ".",
                " ",
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "a",
                  {
                    href: `https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(
                      typeof window !== "undefined" ? window.location.hostname : "lsbfl"
                    )}`,
                    target: "_blank",
                    rel: "noopener noreferrer",
                    className: "hover:text-primary transition-smooth",
                    children: "Built with love using caffeine.ai"
                  }
                )
              ] })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { children: isChatOpen && /* @__PURE__ */ jsxRuntimeExports.jsx(ChatModal, { onClose: () => setIsChatOpen(false), t }, "chat") }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { children: legalOpen && /* @__PURE__ */ jsxRuntimeExports.jsx(
          LegalModalDialog,
          {
            type: legalOpen,
            onClose: () => setLegalOpen(null),
            t
          },
          "legal"
        ) })
      ]
    }
  );
}
export {
  HelpPage as default
};
