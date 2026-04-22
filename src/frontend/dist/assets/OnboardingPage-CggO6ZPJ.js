import { r as reactExports, j as jsxRuntimeExports, c as cn, u as useNavigate, a as useLanguage } from "./index-Cr1cOiS1.js";
import { G as GlowButton } from "./GlowButton-BIc89jFq.js";
import { I as Input } from "./input-DTkqAGt9.js";
import { P as Primitive } from "./index-QJrUuAdR.js";
import { A as AnimatePresence } from "./index-BTpLWxc-.js";
import { m as motion } from "./proxy-DwpuNsDN.js";
import "./index-BO87SLi9.js";
var NAME = "Label";
var Label$1 = reactExports.forwardRef((props, forwardedRef) => {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Primitive.label,
    {
      ...props,
      ref: forwardedRef,
      onMouseDown: (event) => {
        var _a;
        const target = event.target;
        if (target.closest("button, input, select, textarea")) return;
        (_a = props.onMouseDown) == null ? void 0 : _a.call(props, event);
        if (!event.defaultPrevented && event.detail > 1) event.preventDefault();
      }
    }
  );
});
Label$1.displayName = NAME;
var Root = Label$1;
function Label({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Root,
    {
      "data-slot": "label",
      className: cn(
        "flex items-center gap-2 text-sm leading-none font-medium select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50",
        className
      ),
      ...props
    }
  );
}
const COUNTRIES = [
  {
    code: "MX",
    flag: "🇲🇽",
    es: "México",
    en: "Mexico",
    currency: "MXN",
    symbol: "$"
  },
  {
    code: "AR",
    flag: "🇦🇷",
    es: "Argentina",
    en: "Argentina",
    currency: "ARS",
    symbol: "$"
  },
  {
    code: "CO",
    flag: "🇨🇴",
    es: "Colombia",
    en: "Colombia",
    currency: "COP",
    symbol: "$"
  },
  {
    code: "ES",
    flag: "🇪🇸",
    es: "España",
    en: "Spain",
    currency: "EUR",
    symbol: "€"
  },
  {
    code: "US",
    flag: "🇺🇸",
    es: "Estados Unidos",
    en: "United States",
    currency: "USD",
    symbol: "$"
  },
  {
    code: "GB",
    flag: "🇬🇧",
    es: "Reino Unido",
    en: "United Kingdom",
    currency: "GBP",
    symbol: "£"
  },
  {
    code: "CL",
    flag: "🇨🇱",
    es: "Chile",
    en: "Chile",
    currency: "CLP",
    symbol: "$"
  },
  {
    code: "PE",
    flag: "🇵🇪",
    es: "Perú",
    en: "Peru",
    currency: "PEN",
    symbol: "S/"
  },
  {
    code: "VE",
    flag: "🇻🇪",
    es: "Venezuela",
    en: "Venezuela",
    currency: "USD",
    symbol: "$"
  },
  {
    code: "BR",
    flag: "🇧🇷",
    es: "Brasil",
    en: "Brazil",
    currency: "BRL",
    symbol: "R$"
  }
];
function fireConfetti(canvas) {
  const ctx = canvas.getContext("2d");
  if (!ctx) return;
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  const W = canvas.width;
  const H = canvas.height;
  const COLORS = ["#D4AF37", "#34C759", "#FFE066", "#A8F0C8", "#FFFFFF"];
  const count = 140;
  const particles = Array.from({ length: count }, () => ({
    x: W / 2 + (Math.random() - 0.5) * 120,
    y: H / 2,
    vx: (Math.random() - 0.5) * 14,
    vy: -(Math.random() * 14 + 4),
    r: Math.random() * 6 + 3,
    color: COLORS[Math.floor(Math.random() * COLORS.length)],
    rot: Math.random() * Math.PI * 2,
    rotV: (Math.random() - 0.5) * 0.2,
    alpha: 1
  }));
  let frame = 0;
  function draw() {
    ctx.clearRect(0, 0, W, H);
    for (const p of particles) {
      p.x += p.vx;
      p.y += p.vy;
      p.vy += 0.35;
      p.rot += p.rotV;
      p.alpha = Math.max(0, p.alpha - 0.013);
      ctx.save();
      ctx.globalAlpha = p.alpha;
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rot);
      ctx.fillStyle = p.color;
      ctx.fillRect(-p.r, -p.r / 2, p.r * 2, p.r);
      ctx.restore();
    }
    frame++;
    if (frame < 120) requestAnimationFrame(draw);
    else ctx.clearRect(0, 0, W, H);
  }
  draw();
}
function HeroScreen({ onNext }) {
  const { t } = useLanguage();
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.div,
    {
      initial: { opacity: 0, scale: 0.96 },
      animate: { opacity: 1, scale: 1 },
      exit: { opacity: 0, x: -60 },
      transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
      className: "flex flex-col items-center justify-center flex-1 px-8 text-center gap-10",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.div,
            {
              initial: { opacity: 0, scale: 0.7 },
              animate: { opacity: 1, scale: 1 },
              transition: {
                delay: 0.15,
                duration: 0.6,
                ease: [0.34, 1.56, 0.64, 1]
              },
              className: "relative",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 rounded-full blur-2xl bg-primary/30 scale-150 animate-pulse" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "div",
                  {
                    className: "relative w-28 h-28 rounded-full flex items-center justify-center",
                    style: {
                      background: "radial-gradient(circle at 40% 35%, oklch(0.82 0.18 80 / 0.25) 0%, oklch(0.12 0.02 80 / 0.9) 70%)",
                      border: "1.5px solid oklch(0.72 0.18 80 / 0.6)",
                      boxShadow: "0 0 40px oklch(0.72 0.18 80 / 0.4), inset 0 1px 0 oklch(0.9 0.1 80 / 0.3)"
                    },
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        motion.div,
                        {
                          className: "absolute inset-0 rounded-full overflow-hidden pointer-events-none",
                          "aria-hidden": "true",
                          children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                            motion.div,
                            {
                              className: "absolute inset-y-0 w-1/3 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12",
                              animate: { x: ["-100%", "300%"] },
                              transition: {
                                duration: 2.4,
                                repeat: Number.POSITIVE_INFINITY,
                                repeatDelay: 1.5,
                                ease: "easeInOut"
                              }
                            }
                          )
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-5xl", role: "img", "aria-label": "LSBFL clover", children: "🍀" })
                    ]
                  }
                )
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.div,
            {
              initial: { opacity: 0, y: 12 },
              animate: { opacity: 1, y: 0 },
              transition: { delay: 0.3, duration: 0.5 },
              className: "flex flex-col items-center",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "span",
                  {
                    className: "font-display font-black text-2xl tracking-[0.18em] uppercase",
                    style: { color: "oklch(0.82 0.18 80)" },
                    children: "LSBFL"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-body text-[0.65rem] tracking-[0.35em] uppercase text-muted-foreground mt-0.5", children: "Life Should Be Free Lottery" })
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            initial: { opacity: 0, y: 20 },
            animate: { opacity: 1, y: 0 },
            transition: { delay: 0.45, duration: 0.55 },
            className: "flex flex-col gap-3",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "h1",
                {
                  className: "font-display font-black leading-[1.1] tracking-tight",
                  style: {
                    fontSize: "clamp(2.4rem, 9vw, 4rem)",
                    color: "oklch(0.95 0.01 70)"
                  },
                  children: [
                    t("La suerte", "Luck"),
                    " ",
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { color: "oklch(0.82 0.18 80)" }, children: t("es tuya", "is yours") })
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-body text-base text-muted-foreground max-w-xs mx-auto leading-relaxed", children: t(
                "El boleto más elegante del mundo.",
                "The world's most elegant lottery ticket."
              ) })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            initial: { opacity: 0, y: 16 },
            animate: { opacity: 1, y: 0 },
            transition: { delay: 0.65, duration: 0.45 },
            className: "w-full max-w-xs",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                GlowButton,
                {
                  variant: "gold",
                  size: "xl",
                  shimmer: true,
                  className: "w-full",
                  onClick: onNext,
                  "data-ocid": "onboarding.start_button",
                  children: t("Comenzar  →", "Let's start  →")
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-center text-xs text-muted-foreground mt-3", children: t(
                "Sin compromisos. Siempre gratis explorar.",
                "No commitments. Always free to explore."
              ) })
            ]
          }
        )
      ]
    },
    "hero"
  );
}
function CountryScreen({
  onNext,
  selectedCountry,
  setSelectedCountry
}) {
  const { t } = useLanguage();
  const country = COUNTRIES.find((c) => c.code === selectedCountry);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.div,
    {
      initial: { opacity: 0, x: 60 },
      animate: { opacity: 1, x: 0 },
      exit: { opacity: 0, x: -60 },
      transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] },
      className: "flex flex-col items-center justify-center flex-1 px-8 gap-8 w-full max-w-sm mx-auto",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-body text-xs uppercase tracking-[0.3em] text-primary mb-3", children: t("Paso 2 de 3", "Step 2 of 3") }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-black text-3xl text-foreground leading-tight mb-2", children: t("¿Dónde juegas?", "Where do you play?") }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-body text-sm text-muted-foreground", children: t(
            "Seleccionamos tu moneda automáticamente.",
            "We'll auto-set your currency."
          ) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full flex flex-col gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "font-body text-sm text-foreground/80 font-medium", children: t("País / Country", "Country") }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "select",
              {
                value: selectedCountry,
                onChange: (e) => setSelectedCountry(e.target.value),
                "data-ocid": "onboarding.country_select",
                className: "w-full h-14 pl-5 pr-10 rounded-2xl appearance-none font-body text-base font-medium cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring transition-smooth",
                style: {
                  background: "oklch(var(--card))",
                  border: "1.5px solid oklch(var(--border))",
                  color: "oklch(var(--foreground))"
                },
                children: COUNTRIES.map((c) => /* @__PURE__ */ jsxRuntimeExports.jsxs("option", { value: c.code, children: [
                  c.flag,
                  " ",
                  t(c.es, c.en)
                ] }, c.code))
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none", children: "▾" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            initial: { opacity: 0, scale: 0.9 },
            animate: { opacity: 1, scale: 1 },
            transition: { duration: 0.3 },
            className: "flex items-center gap-3 rounded-2xl px-5 py-3.5 w-full",
            style: {
              background: "oklch(var(--card))",
              border: "1.5px solid oklch(0.72 0.18 80 / 0.35)"
            },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  className: "w-10 h-10 rounded-xl flex items-center justify-center font-display font-black text-sm flex-shrink-0",
                  style: {
                    background: "oklch(0.72 0.18 80 / 0.15)",
                    color: "oklch(0.82 0.18 80)",
                    border: "1px solid oklch(0.72 0.18 80 / 0.3)"
                  },
                  children: country.symbol
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-body font-semibold text-sm text-foreground", children: country.currency }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-body text-xs text-muted-foreground", children: t("Moneda automática", "Auto-detected currency") })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "ml-auto text-primary text-lg", children: "✓" })
            ]
          },
          country.currency
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          GlowButton,
          {
            variant: "gold",
            size: "xl",
            shimmer: true,
            className: "w-full",
            onClick: onNext,
            "data-ocid": "onboarding.country_continue_button",
            children: t("Continuar", "Continue")
          }
        )
      ]
    },
    "country"
  );
}
function AccountScreen({
  onComplete
}) {
  const { t } = useLanguage();
  const [mode, setMode] = reactExports.useState(null);
  const [email, setEmail] = reactExports.useState("");
  const [password, setPassword] = reactExports.useState("");
  const [name, setName] = reactExports.useState("");
  const [emailError, setEmailError] = reactExports.useState("");
  const [passwordError, setPasswordError] = reactExports.useState("");
  const validateAndSubmit = () => {
    let valid = true;
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setEmailError(t("Email inválido", "Invalid email"));
      valid = false;
    } else setEmailError("");
    if (password.length < 6) {
      setPasswordError(t("Mínimo 6 caracteres", "Minimum 6 characters"));
      valid = false;
    } else setPasswordError("");
    if (valid) onComplete(false, email, name || void 0);
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.div,
    {
      initial: { opacity: 0, x: 60 },
      animate: { opacity: 1, x: 0 },
      exit: { opacity: 0, x: -60 },
      transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] },
      className: "flex flex-col items-center justify-center flex-1 px-6 gap-7 w-full max-w-sm mx-auto",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-body text-xs uppercase tracking-[0.3em] text-primary mb-3", children: t("Paso 3 de 3", "Step 3 of 3") }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-black text-3xl text-foreground leading-tight mb-2", children: t("Tu cuenta", "Your account") }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-body text-sm text-muted-foreground", children: t(
            "Elige cómo quieres continuar.",
            "Choose how you'd like to continue."
          ) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full flex flex-col gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.button,
            {
              type: "button",
              whileTap: { scale: 0.98 },
              onClick: () => setMode(mode === "create" ? null : "create"),
              "data-ocid": "onboarding.create_account_card",
              className: "w-full text-left rounded-2xl p-5 transition-smooth cursor-pointer",
              style: {
                background: mode === "create" ? "oklch(0.72 0.18 80 / 0.12)" : "oklch(var(--card))",
                border: `2px solid ${mode === "create" ? "oklch(0.72 0.18 80 / 0.7)" : "oklch(var(--border))"}`,
                boxShadow: mode === "create" ? "0 0 20px oklch(0.72 0.18 80 / 0.2)" : "none"
              },
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 mb-1", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-2xl", children: "✉️" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display font-bold text-base text-foreground", children: t("Crear cuenta", "Create account") }),
                  mode === "create" && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "ml-auto text-primary font-bold", children: "✓" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-body text-xs text-muted-foreground pl-9", children: t(
                  "Guarda tus boletos y premios.",
                  "Save your tickets and prizes."
                ) })
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.button,
            {
              type: "button",
              whileTap: { scale: 0.98 },
              onClick: () => setMode(mode === "guest" ? null : "guest"),
              "data-ocid": "onboarding.guest_mode_card",
              className: "w-full text-left rounded-2xl p-5 transition-smooth cursor-pointer",
              style: {
                background: mode === "guest" ? "oklch(0.55 0.12 160 / 0.12)" : "oklch(var(--card))",
                border: `2px solid ${mode === "guest" ? "oklch(0.55 0.12 160 / 0.7)" : "oklch(var(--border))"}`,
                boxShadow: mode === "guest" ? "0 0 20px oklch(0.55 0.12 160 / 0.2)" : "none"
              },
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 mb-1", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-2xl", children: "🎭" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display font-bold text-base text-foreground", children: t("Modo invitado", "Guest mode") }),
                  mode === "guest" && /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "span",
                    {
                      className: "ml-auto font-bold",
                      style: { color: "oklch(0.55 0.12 160)" },
                      children: "✓"
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-body text-xs text-muted-foreground pl-9", children: t(
                  "Sin registro. Reclamar boleto físico.",
                  "No sign-up. Claim a physical ticket."
                ) })
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { children: mode === "create" && /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            initial: { opacity: 0, height: 0 },
            animate: { opacity: 1, height: "auto" },
            exit: { opacity: 0, height: 0 },
            transition: { duration: 0.3 },
            className: "overflow-hidden w-full flex flex-col gap-4",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-1.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "font-body text-sm font-medium", children: t("Nombre (opcional)", "Name (optional)") }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Input,
                  {
                    type: "text",
                    placeholder: t("Tu nombre", "Your name"),
                    value: name,
                    onChange: (e) => setName(e.target.value),
                    "data-ocid": "onboarding.name_input",
                    className: "h-12 rounded-2xl font-body text-sm bg-card border-border"
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-1.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "font-body text-sm font-medium", children: "Email" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Input,
                  {
                    type: "email",
                    placeholder: "tu@email.com",
                    value: email,
                    onChange: (e) => setEmail(e.target.value),
                    onBlur: () => {
                      if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
                        setEmailError(t("Email inválido", "Invalid email"));
                      } else setEmailError("");
                    },
                    "data-ocid": "onboarding.email_input",
                    className: "h-12 rounded-2xl font-body text-sm bg-card border-border"
                  }
                ),
                emailError && /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "p",
                  {
                    "data-ocid": "onboarding.email_field_error",
                    className: "text-xs text-destructive",
                    children: emailError
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-1.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "font-body text-sm font-medium", children: t("Contraseña", "Password") }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Input,
                  {
                    type: "password",
                    placeholder: t("Mínimo 6 caracteres", "Minimum 6 characters"),
                    value: password,
                    onChange: (e) => setPassword(e.target.value),
                    onBlur: () => {
                      if (password && password.length < 6) {
                        setPasswordError(
                          t("Mínimo 6 caracteres", "Minimum 6 characters")
                        );
                      } else setPasswordError("");
                    },
                    "data-ocid": "onboarding.password_input",
                    className: "h-12 rounded-2xl font-body text-sm bg-card border-border"
                  }
                ),
                passwordError && /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "p",
                  {
                    "data-ocid": "onboarding.password_field_error",
                    className: "text-xs text-destructive",
                    children: passwordError
                  }
                )
              ] })
            ]
          },
          "form"
        ) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          GlowButton,
          {
            variant: mode === "guest" ? "green" : "gold",
            size: "xl",
            shimmer: true,
            className: "w-full",
            disabled: !mode,
            onClick: () => {
              if (mode === "guest") onComplete(true);
              else validateAndSubmit();
            },
            "data-ocid": "onboarding.confirm_button",
            children: mode === "guest" ? t("Entrar como invitado  →", "Enter as guest  →") : mode === "create" ? t("Crear mi cuenta  →", "Create my account  →") : t("Selecciona una opción", "Select an option")
          }
        )
      ]
    },
    "account"
  );
}
const DOT_KEYS = ["dot-a", "dot-b", "dot-c", "dot-d", "dot-e"];
function ProgressDots({ step, total }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      className: "flex items-center justify-center gap-2 pt-6 pb-2",
      "aria-label": "Progreso del onboarding",
      children: DOT_KEYS.slice(0, total).map((key, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: "rounded-full transition-smooth",
          style: {
            width: i === step ? "2rem" : "0.5rem",
            height: "0.5rem",
            background: i === step ? "oklch(0.82 0.18 80)" : i < step ? "oklch(0.82 0.18 80 / 0.4)" : "oklch(0.5 0.01 70 / 0.3)",
            boxShadow: i === step ? "0 0 10px oklch(0.72 0.18 80 / 0.6)" : "none"
          }
        },
        key
      ))
    }
  );
}
function OnboardingPage() {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [step, setStep] = reactExports.useState(0);
  const [selectedCountry, setSelectedCountry] = reactExports.useState("MX");
  const canvasRef = reactExports.useRef(null);
  reactExports.useEffect(() => {
    if (localStorage.getItem("lsbfl-onboarded")) {
      navigate({ to: "/home" });
    }
  }, [navigate]);
  const handleSkip = () => {
    const country = COUNTRIES.find((c) => c.code === "MX");
    localStorage.setItem("lsbfl-onboarded", "true");
    localStorage.setItem("lsbfl-country", "MX");
    localStorage.setItem("lsbfl-currency", country.currency);
    localStorage.setItem(
      "lsbfl-user",
      JSON.stringify({
        isGuest: true,
        country: "MX",
        currency: country.currency
      })
    );
    navigate({ to: "/home" });
  };
  const handleCountryContinue = () => {
    const country = COUNTRIES.find((c) => c.code === selectedCountry);
    localStorage.setItem("lsbfl-country", selectedCountry);
    localStorage.setItem("lsbfl-currency", country.currency);
    setStep(2);
  };
  const handleComplete = (isGuest, email, name) => {
    const country = COUNTRIES.find((c) => c.code === selectedCountry);
    const user = {
      isGuest,
      name: name ?? (isGuest ? t("Invitado", "Guest") : ""),
      email: email ?? "",
      country: selectedCountry,
      currency: country.currency
    };
    localStorage.setItem("lsbfl-onboarded", "true");
    localStorage.setItem("lsbfl-user", JSON.stringify(user));
    if (canvasRef.current) fireConfetti(canvasRef.current);
    setTimeout(() => navigate({ to: "/home" }), 900);
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "min-h-screen flex flex-col relative overflow-hidden",
      style: { background: "#0A0A0A" },
      "data-ocid": "onboarding.page",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "canvas",
          {
            ref: canvasRef,
            className: "pointer-events-none fixed inset-0 z-50",
            tabIndex: -1
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "absolute inset-0 pointer-events-none",
            "aria-hidden": "true",
            style: {
              background: "radial-gradient(ellipse 70% 50% at 50% 50%, oklch(0.65 0.16 80 / 0.12) 0%, transparent 65%)"
            }
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "absolute bottom-0 right-0 w-72 h-72 pointer-events-none",
            "aria-hidden": "true",
            style: {
              background: "radial-gradient(ellipse at 80% 80%, oklch(0.38 0.08 160 / 0.14) 0%, transparent 70%)"
            }
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between px-6 pt-safe", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", {}),
          /* @__PURE__ */ jsxRuntimeExports.jsx(ProgressDots, { step, total: 3 }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              onClick: handleSkip,
              "data-ocid": "onboarding.skip_button",
              className: "font-body text-sm text-muted-foreground hover:text-foreground transition-colors py-2 pl-2",
              children: t("Omitir", "Skip")
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 flex flex-col relative", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(AnimatePresence, { mode: "wait", children: [
          step === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(HeroScreen, { onNext: () => setStep(1) }, "hero"),
          step === 1 && /* @__PURE__ */ jsxRuntimeExports.jsx(
            CountryScreen,
            {
              onNext: handleCountryContinue,
              selectedCountry,
              setSelectedCountry
            },
            "country"
          ),
          step === 2 && /* @__PURE__ */ jsxRuntimeExports.jsx(
            AccountScreen,
            {
              onComplete: handleComplete,
              selectedCountry
            },
            "account"
          )
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-8" })
      ]
    }
  );
}
export {
  OnboardingPage as default
};
