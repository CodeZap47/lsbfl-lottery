import { GlowButton } from "@/components/ui/GlowButton";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useLanguage } from "@/hooks/useLanguage";
import { useNavigate } from "@tanstack/react-router";
import { AnimatePresence, motion } from "motion/react";
import React, { useEffect, useRef, useState } from "react";

// ── Country → Currency map ─────────────────────────────────────────────────────
const COUNTRIES = [
  {
    code: "MX",
    flag: "🇲🇽",
    es: "México",
    en: "Mexico",
    currency: "MXN",
    symbol: "$",
  },
  {
    code: "AR",
    flag: "🇦🇷",
    es: "Argentina",
    en: "Argentina",
    currency: "ARS",
    symbol: "$",
  },
  {
    code: "CO",
    flag: "🇨🇴",
    es: "Colombia",
    en: "Colombia",
    currency: "COP",
    symbol: "$",
  },
  {
    code: "ES",
    flag: "🇪🇸",
    es: "España",
    en: "Spain",
    currency: "EUR",
    symbol: "€",
  },
  {
    code: "US",
    flag: "🇺🇸",
    es: "Estados Unidos",
    en: "United States",
    currency: "USD",
    symbol: "$",
  },
  {
    code: "GB",
    flag: "🇬🇧",
    es: "Reino Unido",
    en: "United Kingdom",
    currency: "GBP",
    symbol: "£",
  },
  {
    code: "CL",
    flag: "🇨🇱",
    es: "Chile",
    en: "Chile",
    currency: "CLP",
    symbol: "$",
  },
  {
    code: "PE",
    flag: "🇵🇪",
    es: "Perú",
    en: "Peru",
    currency: "PEN",
    symbol: "S/",
  },
  {
    code: "VE",
    flag: "🇻🇪",
    es: "Venezuela",
    en: "Venezuela",
    currency: "USD",
    symbol: "$",
  },
  {
    code: "BR",
    flag: "🇧🇷",
    es: "Brasil",
    en: "Brazil",
    currency: "BRL",
    symbol: "R$",
  },
] as const;

type CountryCode = (typeof COUNTRIES)[number]["code"];

// ── Confetti helper ─────────────────────────────────────────────────────────────
function fireConfetti(canvas: HTMLCanvasElement) {
  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  const W = canvas.width;
  const H = canvas.height;
  const COLORS = ["#D4AF37", "#34C759", "#FFE066", "#A8F0C8", "#FFFFFF"];
  const count = 140;

  type Particle = {
    x: number;
    y: number;
    vx: number;
    vy: number;
    r: number;
    color: string;
    rot: number;
    rotV: number;
    alpha: number;
  };

  const particles: Particle[] = Array.from({ length: count }, () => ({
    x: W / 2 + (Math.random() - 0.5) * 120,
    y: H / 2,
    vx: (Math.random() - 0.5) * 14,
    vy: -(Math.random() * 14 + 4),
    r: Math.random() * 6 + 3,
    color: COLORS[Math.floor(Math.random() * COLORS.length)],
    rot: Math.random() * Math.PI * 2,
    rotV: (Math.random() - 0.5) * 0.2,
    alpha: 1,
  }));

  let frame = 0;
  function draw() {
    ctx!.clearRect(0, 0, W, H);
    for (const p of particles) {
      p.x += p.vx;
      p.y += p.vy;
      p.vy += 0.35;
      p.rot += p.rotV;
      p.alpha = Math.max(0, p.alpha - 0.013);
      ctx!.save();
      ctx!.globalAlpha = p.alpha;
      ctx!.translate(p.x, p.y);
      ctx!.rotate(p.rot);
      ctx!.fillStyle = p.color;
      ctx!.fillRect(-p.r, -p.r / 2, p.r * 2, p.r);
      ctx!.restore();
    }
    frame++;
    if (frame < 120) requestAnimationFrame(draw);
    else ctx!.clearRect(0, 0, W, H);
  }
  draw();
}

// ── Screen 1: Hero ─────────────────────────────────────────────────────────────
function HeroScreen({ onNext }: { onNext: () => void }) {
  const { t } = useLanguage();

  return (
    <motion.div
      key="hero"
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, x: -60 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="flex flex-col items-center justify-center flex-1 px-8 text-center gap-10"
    >
      {/* Logo wordmark */}
      <div className="flex flex-col items-center gap-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.7 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            delay: 0.15,
            duration: 0.6,
            ease: [0.34, 1.56, 0.64, 1],
          }}
          className="relative"
        >
          {/* Outer glow ring */}
          <div className="absolute inset-0 rounded-full blur-2xl bg-primary/30 scale-150 animate-pulse" />
          <div
            className="relative w-28 h-28 rounded-full flex items-center justify-center"
            style={{
              background:
                "radial-gradient(circle at 40% 35%, oklch(0.82 0.18 80 / 0.25) 0%, oklch(0.12 0.02 80 / 0.9) 70%)",
              border: "1.5px solid oklch(0.72 0.18 80 / 0.6)",
              boxShadow:
                "0 0 40px oklch(0.72 0.18 80 / 0.4), inset 0 1px 0 oklch(0.9 0.1 80 / 0.3)",
            }}
          >
            {/* Shimmer sweep */}
            <motion.div
              className="absolute inset-0 rounded-full overflow-hidden pointer-events-none"
              aria-hidden="true"
            >
              <motion.div
                className="absolute inset-y-0 w-1/3 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12"
                animate={{ x: ["-100%", "300%"] }}
                transition={{
                  duration: 2.4,
                  repeat: Number.POSITIVE_INFINITY,
                  repeatDelay: 1.5,
                  ease: "easeInOut",
                }}
              />
            </motion.div>
            <span className="text-5xl" role="img" aria-label="LSBFL clover">
              🍀
            </span>
          </div>
        </motion.div>

        {/* LSBFL wordmark */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="flex flex-col items-center"
        >
          <span
            className="font-display font-black text-2xl tracking-[0.18em] uppercase"
            style={{ color: "oklch(0.82 0.18 80)" }}
          >
            LSBFL
          </span>
          <span className="font-body text-[0.65rem] tracking-[0.35em] uppercase text-muted-foreground mt-0.5">
            Life Should Be Free Lottery
          </span>
        </motion.div>
      </div>

      {/* Headline block */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.45, duration: 0.55 }}
        className="flex flex-col gap-3"
      >
        <h1
          className="font-display font-black leading-[1.1] tracking-tight"
          style={{
            fontSize: "clamp(2.4rem, 9vw, 4rem)",
            color: "oklch(0.95 0.01 70)",
          }}
        >
          {t("La suerte", "Luck")}{" "}
          <span style={{ color: "oklch(0.82 0.18 80)" }}>
            {t("es tuya", "is yours")}
          </span>
        </h1>
        <p className="font-body text-base text-muted-foreground max-w-xs mx-auto leading-relaxed">
          {t(
            "El boleto más elegante del mundo.",
            "The world's most elegant lottery ticket.",
          )}
        </p>
      </motion.div>

      {/* CTA */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.65, duration: 0.45 }}
        className="w-full max-w-xs"
      >
        <GlowButton
          variant="gold"
          size="xl"
          shimmer
          className="w-full"
          onClick={onNext}
          data-ocid="onboarding.start_button"
        >
          {t("Comenzar  →", "Let's start  →")}
        </GlowButton>
        <p className="text-center text-xs text-muted-foreground mt-3">
          {t(
            "Sin compromisos. Siempre gratis explorar.",
            "No commitments. Always free to explore.",
          )}
        </p>
      </motion.div>
    </motion.div>
  );
}

// ── Screen 2: Country & Currency ───────────────────────────────────────────────
function CountryScreen({
  onNext,
  selectedCountry,
  setSelectedCountry,
}: {
  onNext: () => void;
  selectedCountry: CountryCode;
  setSelectedCountry: (c: CountryCode) => void;
}) {
  const { t } = useLanguage();
  const country = COUNTRIES.find((c) => c.code === selectedCountry)!;

  return (
    <motion.div
      key="country"
      initial={{ opacity: 0, x: 60 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -60 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      className="flex flex-col items-center justify-center flex-1 px-8 gap-8 w-full max-w-sm mx-auto"
    >
      <div className="text-center">
        <p className="font-body text-xs uppercase tracking-[0.3em] text-primary mb-3">
          {t("Paso 2 de 3", "Step 2 of 3")}
        </p>
        <h2 className="font-display font-black text-3xl text-foreground leading-tight mb-2">
          {t("¿Dónde juegas?", "Where do you play?")}
        </h2>
        <p className="font-body text-sm text-muted-foreground">
          {t(
            "Seleccionamos tu moneda automáticamente.",
            "We'll auto-set your currency.",
          )}
        </p>
      </div>

      {/* Country select */}
      <div className="w-full flex flex-col gap-2">
        <Label className="font-body text-sm text-foreground/80 font-medium">
          {t("País / Country", "Country")}
        </Label>
        <div className="relative">
          <select
            value={selectedCountry}
            onChange={(e) => setSelectedCountry(e.target.value as CountryCode)}
            data-ocid="onboarding.country_select"
            className="w-full h-14 pl-5 pr-10 rounded-2xl appearance-none font-body text-base font-medium cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring transition-smooth"
            style={{
              background: "oklch(var(--card))",
              border: "1.5px solid oklch(var(--border))",
              color: "oklch(var(--foreground))",
            }}
          >
            {COUNTRIES.map((c) => (
              <option key={c.code} value={c.code}>
                {c.flag} {t(c.es, c.en)}
              </option>
            ))}
          </select>
          <span className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none">
            ▾
          </span>
        </div>
      </div>

      {/* Currency badge */}
      <motion.div
        key={country.currency}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        className="flex items-center gap-3 rounded-2xl px-5 py-3.5 w-full"
        style={{
          background: "oklch(var(--card))",
          border: "1.5px solid oklch(0.72 0.18 80 / 0.35)",
        }}
      >
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center font-display font-black text-sm flex-shrink-0"
          style={{
            background: "oklch(0.72 0.18 80 / 0.15)",
            color: "oklch(0.82 0.18 80)",
            border: "1px solid oklch(0.72 0.18 80 / 0.3)",
          }}
        >
          {country.symbol}
        </div>
        <div>
          <p className="font-body font-semibold text-sm text-foreground">
            {country.currency}
          </p>
          <p className="font-body text-xs text-muted-foreground">
            {t("Moneda automática", "Auto-detected currency")}
          </p>
        </div>
        <span className="ml-auto text-primary text-lg">✓</span>
      </motion.div>

      <GlowButton
        variant="gold"
        size="xl"
        shimmer
        className="w-full"
        onClick={onNext}
        data-ocid="onboarding.country_continue_button"
      >
        {t("Continuar", "Continue")}
      </GlowButton>
    </motion.div>
  );
}

// ── Screen 3: Your account ─────────────────────────────────────────────────────
function AccountScreen({
  onComplete,
}: {
  onComplete: (isGuest: boolean, email?: string, name?: string) => void;
  selectedCountry: CountryCode;
}) {
  const { t } = useLanguage();
  const [mode, setMode] = useState<"create" | "guest" | null>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

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
    if (valid) onComplete(false, email, name || undefined);
  };

  return (
    <motion.div
      key="account"
      initial={{ opacity: 0, x: 60 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -60 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      className="flex flex-col items-center justify-center flex-1 px-6 gap-7 w-full max-w-sm mx-auto"
    >
      <div className="text-center">
        <p className="font-body text-xs uppercase tracking-[0.3em] text-primary mb-3">
          {t("Paso 3 de 3", "Step 3 of 3")}
        </p>
        <h2 className="font-display font-black text-3xl text-foreground leading-tight mb-2">
          {t("Tu cuenta", "Your account")}
        </h2>
        <p className="font-body text-sm text-muted-foreground">
          {t(
            "Elige cómo quieres continuar.",
            "Choose how you'd like to continue.",
          )}
        </p>
      </div>

      {/* Mode cards */}
      <div className="w-full flex flex-col gap-3">
        {/* Create account card */}
        <motion.button
          type="button"
          whileTap={{ scale: 0.98 }}
          onClick={() => setMode(mode === "create" ? null : "create")}
          data-ocid="onboarding.create_account_card"
          className="w-full text-left rounded-2xl p-5 transition-smooth cursor-pointer"
          style={{
            background:
              mode === "create"
                ? "oklch(0.72 0.18 80 / 0.12)"
                : "oklch(var(--card))",
            border: `2px solid ${mode === "create" ? "oklch(0.72 0.18 80 / 0.7)" : "oklch(var(--border))"}`,
            boxShadow:
              mode === "create" ? "0 0 20px oklch(0.72 0.18 80 / 0.2)" : "none",
          }}
        >
          <div className="flex items-center gap-3 mb-1">
            <span className="text-2xl">✉️</span>
            <span className="font-display font-bold text-base text-foreground">
              {t("Crear cuenta", "Create account")}
            </span>
            {mode === "create" && (
              <span className="ml-auto text-primary font-bold">✓</span>
            )}
          </div>
          <p className="font-body text-xs text-muted-foreground pl-9">
            {t(
              "Guarda tus boletos y premios.",
              "Save your tickets and prizes.",
            )}
          </p>
        </motion.button>

        {/* Guest mode card */}
        <motion.button
          type="button"
          whileTap={{ scale: 0.98 }}
          onClick={() => setMode(mode === "guest" ? null : "guest")}
          data-ocid="onboarding.guest_mode_card"
          className="w-full text-left rounded-2xl p-5 transition-smooth cursor-pointer"
          style={{
            background:
              mode === "guest"
                ? "oklch(0.55 0.12 160 / 0.12)"
                : "oklch(var(--card))",
            border: `2px solid ${mode === "guest" ? "oklch(0.55 0.12 160 / 0.7)" : "oklch(var(--border))"}`,
            boxShadow:
              mode === "guest" ? "0 0 20px oklch(0.55 0.12 160 / 0.2)" : "none",
          }}
        >
          <div className="flex items-center gap-3 mb-1">
            <span className="text-2xl">🎭</span>
            <span className="font-display font-bold text-base text-foreground">
              {t("Modo invitado", "Guest mode")}
            </span>
            {mode === "guest" && (
              <span
                className="ml-auto font-bold"
                style={{ color: "oklch(0.55 0.12 160)" }}
              >
                ✓
              </span>
            )}
          </div>
          <p className="font-body text-xs text-muted-foreground pl-9">
            {t(
              "Sin registro. Reclamar boleto físico.",
              "No sign-up. Claim a physical ticket.",
            )}
          </p>
        </motion.button>
      </div>

      {/* Inline create-account form */}
      <AnimatePresence>
        {mode === "create" && (
          <motion.div
            key="form"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden w-full flex flex-col gap-4"
          >
            <div className="flex flex-col gap-1.5">
              <Label className="font-body text-sm font-medium">
                {t("Nombre (opcional)", "Name (optional)")}
              </Label>
              <Input
                type="text"
                placeholder={t("Tu nombre", "Your name")}
                value={name}
                onChange={(e) => setName(e.target.value)}
                data-ocid="onboarding.name_input"
                className="h-12 rounded-2xl font-body text-sm bg-card border-border"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label className="font-body text-sm font-medium">Email</Label>
              <Input
                type="email"
                placeholder="tu@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onBlur={() => {
                  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
                    setEmailError(t("Email inválido", "Invalid email"));
                  } else setEmailError("");
                }}
                data-ocid="onboarding.email_input"
                className="h-12 rounded-2xl font-body text-sm bg-card border-border"
              />
              {emailError && (
                <p
                  data-ocid="onboarding.email_field_error"
                  className="text-xs text-destructive"
                >
                  {emailError}
                </p>
              )}
            </div>
            <div className="flex flex-col gap-1.5">
              <Label className="font-body text-sm font-medium">
                {t("Contraseña", "Password")}
              </Label>
              <Input
                type="password"
                placeholder={t("Mínimo 6 caracteres", "Minimum 6 characters")}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onBlur={() => {
                  if (password && password.length < 6) {
                    setPasswordError(
                      t("Mínimo 6 caracteres", "Minimum 6 characters"),
                    );
                  } else setPasswordError("");
                }}
                data-ocid="onboarding.password_input"
                className="h-12 rounded-2xl font-body text-sm bg-card border-border"
              />
              {passwordError && (
                <p
                  data-ocid="onboarding.password_field_error"
                  className="text-xs text-destructive"
                >
                  {passwordError}
                </p>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* CTA */}
      <GlowButton
        variant={mode === "guest" ? "green" : "gold"}
        size="xl"
        shimmer
        className="w-full"
        disabled={!mode}
        onClick={() => {
          if (mode === "guest") onComplete(true);
          else validateAndSubmit();
        }}
        data-ocid="onboarding.confirm_button"
      >
        {mode === "guest"
          ? t("Entrar como invitado  →", "Enter as guest  →")
          : mode === "create"
            ? t("Crear mi cuenta  →", "Create my account  →")
            : t("Selecciona una opción", "Select an option")}
      </GlowButton>
    </motion.div>
  );
}

// ── Progress dots ──────────────────────────────────────────────────────────────
const DOT_KEYS = ["dot-a", "dot-b", "dot-c", "dot-d", "dot-e"];
function ProgressDots({ step, total }: { step: number; total: number }) {
  return (
    <div
      className="flex items-center justify-center gap-2 pt-6 pb-2"
      aria-label="Progreso del onboarding"
    >
      {DOT_KEYS.slice(0, total).map((key, i) => (
        <div
          key={key}
          className="rounded-full transition-smooth"
          style={{
            width: i === step ? "2rem" : "0.5rem",
            height: "0.5rem",
            background:
              i === step
                ? "oklch(0.82 0.18 80)"
                : i < step
                  ? "oklch(0.82 0.18 80 / 0.4)"
                  : "oklch(0.5 0.01 70 / 0.3)",
            boxShadow:
              i === step ? "0 0 10px oklch(0.72 0.18 80 / 0.6)" : "none",
          }}
        />
      ))}
    </div>
  );
}

// ── Main OnboardingPage ────────────────────────────────────────────────────────
export default function OnboardingPage() {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [step, setStep] = useState(0);
  const [selectedCountry, setSelectedCountry] = useState<CountryCode>("MX");
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Redirect if already onboarded
  useEffect(() => {
    if (localStorage.getItem("lsbfl-onboarded")) {
      navigate({ to: "/home" });
    }
  }, [navigate]);

  const handleSkip = () => {
    const country = COUNTRIES.find((c) => c.code === "MX")!;
    localStorage.setItem("lsbfl-onboarded", "true");
    localStorage.setItem("lsbfl-country", "MX");
    localStorage.setItem("lsbfl-currency", country.currency);
    localStorage.setItem(
      "lsbfl-user",
      JSON.stringify({
        isGuest: true,
        country: "MX",
        currency: country.currency,
      }),
    );
    navigate({ to: "/home" });
  };

  const handleCountryContinue = () => {
    const country = COUNTRIES.find((c) => c.code === selectedCountry)!;
    localStorage.setItem("lsbfl-country", selectedCountry);
    localStorage.setItem("lsbfl-currency", country.currency);
    setStep(2);
  };

  const handleComplete = (isGuest: boolean, email?: string, name?: string) => {
    const country = COUNTRIES.find((c) => c.code === selectedCountry)!;
    const user = {
      isGuest,
      name: name ?? (isGuest ? t("Invitado", "Guest") : ""),
      email: email ?? "",
      country: selectedCountry,
      currency: country.currency,
    };
    localStorage.setItem("lsbfl-onboarded", "true");
    localStorage.setItem("lsbfl-user", JSON.stringify(user));

    // Fire confetti
    if (canvasRef.current) fireConfetti(canvasRef.current);

    setTimeout(() => navigate({ to: "/home" }), 900);
  };

  return (
    <div
      className="min-h-screen flex flex-col relative overflow-hidden"
      style={{ background: "#0A0A0A" }}
      data-ocid="onboarding.page"
    >
      {/* Confetti canvas */}
      <canvas
        ref={canvasRef}
        className="pointer-events-none fixed inset-0 z-50"
        tabIndex={-1}
      />

      {/* Radial gold glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{
          background:
            "radial-gradient(ellipse 70% 50% at 50% 50%, oklch(0.65 0.16 80 / 0.12) 0%, transparent 65%)",
        }}
      />
      {/* Secondary green glow, bottom right */}
      <div
        className="absolute bottom-0 right-0 w-72 h-72 pointer-events-none"
        aria-hidden="true"
        style={{
          background:
            "radial-gradient(ellipse at 80% 80%, oklch(0.38 0.08 160 / 0.14) 0%, transparent 70%)",
        }}
      />

      {/* Header: progress + skip */}
      <div className="flex items-center justify-between px-6 pt-safe">
        <div />
        <ProgressDots step={step} total={3} />
        <button
          type="button"
          onClick={handleSkip}
          data-ocid="onboarding.skip_button"
          className="font-body text-sm text-muted-foreground hover:text-foreground transition-colors py-2 pl-2"
        >
          {t("Omitir", "Skip")}
        </button>
      </div>

      {/* Animated screens */}
      <div className="flex-1 flex flex-col relative">
        <AnimatePresence mode="wait">
          {step === 0 && <HeroScreen key="hero" onNext={() => setStep(1)} />}
          {step === 1 && (
            <CountryScreen
              key="country"
              onNext={handleCountryContinue}
              selectedCountry={selectedCountry}
              setSelectedCountry={setSelectedCountry}
            />
          )}
          {step === 2 && (
            <AccountScreen
              key="account"
              onComplete={handleComplete}
              selectedCountry={selectedCountry}
            />
          )}
        </AnimatePresence>
      </div>

      {/* Bottom safe-area spacer */}
      <div className="h-8" />
    </div>
  );
}
