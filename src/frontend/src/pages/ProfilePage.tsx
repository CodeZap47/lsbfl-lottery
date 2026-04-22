import { GlowButton } from "@/components/ui/GlowButton";
import { PAYOUT_OPTIONS } from "@/constants/payoutOptions";
import { useLanguage } from "@/hooks/useLanguage";
import { useMockData } from "@/hooks/useMockData";
import { useTheme } from "@/hooks/useTheme";
import {
  loadPayoutProfile,
  savePayoutProfile,
} from "@/lib/payoutProfileStorage";
import {
  loadProfileAccount,
  saveProfileAccount,
} from "@/lib/profileAccountStorage";
import { cn } from "@/lib/utils";
import type { PayoutProfile } from "@/types";
import { Link } from "@tanstack/react-router";
import {
  Bell,
  ChevronDown,
  Download,
  Globe,
  LayoutDashboard,
  Mail,
  MapPin,
  Moon,
  Pencil,
  Shield,
  ShieldAlert,
  Sun,
  Trash2,
  Wallet,
  X,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";

// ─── Types ────────────────────────────────────────────────────────────────────

type SectionKey =
  | "account"
  | "payout"
  | "notifications"
  | "appearance"
  | "responsible"
  | "privacy";

interface NotifState {
  draw_start: boolean;
  draw_results: boolean;
  prize_won: boolean;
  unclaimed: boolean;
  news: boolean;
}

interface SpendingLimits {
  daily: string;
  monthly: string;
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function SectionAccordion({
  id,
  label,
  icon,
  open,
  onToggle,
  children,
}: {
  id: SectionKey;
  label: string;
  icon: React.ReactNode;
  open: boolean;
  onToggle: (id: SectionKey) => void;
  children: React.ReactNode;
}) {
  return (
    <div className="ticket-card bg-card border border-border overflow-hidden">
      <button
        type="button"
        onClick={() => onToggle(id)}
        data-ocid={`profile.section_${id}_toggle`}
        className="w-full flex items-center gap-3 px-5 py-4 hover:bg-muted/30 transition-smooth text-left group"
        aria-expanded={open}
      >
        <span className="text-primary shrink-0">{icon}</span>
        <span className="flex-1 font-body font-semibold text-foreground text-sm">
          {label}
        </span>
        <motion.span
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.25 }}
          className="text-muted-foreground"
        >
          <ChevronDown size={16} />
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.28, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="border-t border-border px-5 py-4">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function ToggleSwitch({
  checked,
  onChange,
  id,
  "data-ocid": ocid,
}: {
  checked: boolean;
  onChange: () => void;
  id: string;
  "data-ocid"?: string;
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      id={id}
      onClick={onChange}
      data-ocid={ocid}
      className={cn(
        "relative inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full transition-smooth focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
        checked ? "bg-primary shadow-glow-gold" : "bg-muted",
      )}
    >
      <motion.span
        layout
        transition={{ type: "spring", stiffness: 500, damping: 35 }}
        className={cn(
          "pointer-events-none inline-block h-4 w-4 rounded-full shadow-md",
          checked ? "bg-primary-foreground ml-6" : "bg-foreground/40 ml-1",
        )}
      />
    </button>
  );
}

function LabeledToggle({
  label,
  sublabel,
  checked,
  onChange,
  toggleId,
  ocid,
}: {
  label: string;
  sublabel?: string;
  checked: boolean;
  onChange: () => void;
  toggleId: string;
  ocid?: string;
}) {
  return (
    <label
      htmlFor={toggleId}
      className="flex items-center justify-between gap-4 py-3 cursor-pointer group"
    >
      <div className="flex-1 min-w-0">
        <p className="font-body text-sm text-foreground leading-snug">
          {label}
        </p>
        {sublabel && (
          <p className="font-body text-xs text-muted-foreground mt-0.5">
            {sublabel}
          </p>
        )}
      </div>
      <ToggleSwitch
        checked={checked}
        onChange={onChange}
        id={toggleId}
        data-ocid={ocid}
      />
    </label>
  );
}

// ─── Break-time modal ─────────────────────────────────────────────────────────

function BreakModal({
  open,
  onClose,
  t,
}: {
  open: boolean;
  onClose: () => void;
  t: (es: string, en: string) => string;
}) {
  const [selected, setSelected] = useState<string | null>(null);

  const options = [
    { id: "24h", label: t("24 horas", "24 hours") },
    { id: "1w", label: t("1 semana", "1 week") },
    { id: "1m", label: t("1 mes", "1 month") },
  ];

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4"
          data-ocid="profile.break_modal"
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={onClose}
          />
          <motion.div
            initial={{ y: 40, opacity: 0, scale: 0.97 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 40, opacity: 0, scale: 0.97 }}
            transition={{ type: "spring", stiffness: 380, damping: 32 }}
            className="relative z-10 w-full max-w-sm ticket-card bg-card border border-border p-6"
          >
            <button
              type="button"
              onClick={onClose}
              data-ocid="profile.break_modal.close_button"
              className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors"
            >
              <X size={18} />
            </button>
            <h3 className="font-display text-xl font-bold text-foreground mb-1">
              {t("¿Por cuánto tiempo?", "For how long?")}
            </h3>
            <p className="font-body text-sm text-muted-foreground mb-5">
              {t(
                "Elegir una pausa te ayuda a mantener el juego como disfrute.",
                "Taking a break helps you keep playing as fun.",
              )}
            </p>
            <div className="flex flex-col gap-2 mb-5">
              {options.map((opt) => (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => setSelected(opt.id)}
                  data-ocid={`profile.break_option.${opt.id}`}
                  className={cn(
                    "w-full py-3 px-4 rounded-2xl font-body font-medium text-sm border transition-smooth text-left",
                    selected === opt.id
                      ? "border-primary bg-primary/10 text-primary shadow-glow-gold"
                      : "border-border bg-muted/30 text-foreground hover:border-primary/50",
                  )}
                >
                  {opt.label}
                </button>
              ))}
            </div>
            <GlowButton
              type="button"
              variant="gold"
              size="md"
              className="w-full"
              disabled={!selected}
              data-ocid="profile.break_modal.confirm_button"
              onClick={() => {
                toast.success(t("Pausa activada 🌿", "Break activated 🌿"));
                onClose();
              }}
            >
              {t("Confirmar pausa", "Confirm break")}
            </GlowButton>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// ─── Delete account dialog ────────────────────────────────────────────────────

function DeleteDialog({
  open,
  onClose,
  t,
}: {
  open: boolean;
  onClose: () => void;
  t: (es: string, en: string) => string;
}) {
  const [confirmed, setConfirmed] = useState(false);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4"
          data-ocid="profile.delete_dialog"
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            onClick={onClose}
          />
          <motion.div
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 40, opacity: 0 }}
            transition={{ type: "spring", stiffness: 380, damping: 32 }}
            className="relative z-10 w-full max-w-sm ticket-card bg-card border border-destructive/40 p-6"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-destructive/15 flex items-center justify-center">
                <ShieldAlert size={20} className="text-destructive" />
              </div>
              <h3 className="font-display text-lg font-bold text-foreground">
                {t("¿Eliminar cuenta?", "Delete account?")}
              </h3>
            </div>
            <p className="font-body text-sm text-muted-foreground mb-4">
              {t(
                "Esta acción es permanente. Perderás tu historial, boletos y saldo. No se puede deshacer.",
                "This is permanent. You'll lose your history, tickets, and balance. This cannot be undone.",
              )}
            </p>
            <label className="flex items-start gap-3 mb-5 cursor-pointer">
              <input
                type="checkbox"
                checked={confirmed}
                onChange={() => setConfirmed((v) => !v)}
                data-ocid="profile.delete_confirm_checkbox"
                className="mt-0.5 accent-destructive"
              />
              <span className="font-body text-sm text-foreground">
                {t(
                  "Entiendo que perderé todos mis datos",
                  "I understand I will lose all my data",
                )}
              </span>
            </label>
            <div className="flex gap-3">
              <GlowButton
                type="button"
                variant="ghost"
                size="sm"
                className="flex-1"
                onClick={onClose}
                data-ocid="profile.delete_dialog.cancel_button"
              >
                {t("Cancelar", "Cancel")}
              </GlowButton>
              <button
                type="button"
                disabled={!confirmed}
                data-ocid="profile.delete_dialog.confirm_button"
                onClick={() => {
                  toast.error(t("Solicitud enviada", "Request submitted"));
                  onClose();
                }}
                className={cn(
                  "flex-1 h-9 px-4 rounded-xl font-body font-medium text-sm border transition-smooth",
                  "bg-destructive/10 border-destructive/40 text-destructive",
                  "hover:bg-destructive hover:text-destructive-foreground",
                  "disabled:opacity-40 disabled:cursor-not-allowed",
                )}
              >
                {t("Eliminar", "Delete")}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// ─── Main Page ─────────────────────────────────────────────────────────────────

const COUNTRIES = [
  { code: "MX", label: "🇲🇽 México", currency: "MXN" },
  { code: "AR", label: "🇦🇷 Argentina", currency: "ARS" },
  { code: "CO", label: "🇨🇴 Colombia", currency: "COP" },
  { code: "CL", label: "🇨🇱 Chile", currency: "CLP" },
  { code: "US", label: "🇺🇸 United States", currency: "USD" },
  { code: "ES", label: "🇪🇸 España", currency: "EUR" },
];

const CURRENCIES = ["USD", "MXN", "ARS", "COP", "EUR", "BTC", "ETH"];

const ACCOUNT_STORAGE_OPTS = {
  validCountryCodes: COUNTRIES.map((c) => c.code),
  validCurrencies: CURRENCIES,
} as const;

export default function ProfilePage() {
  const { t, toggleLang, lang } = useLanguage();
  const { toggleTheme, isDark } = useTheme();
  const { user } = useMockData();

  // ── Accordion state
  const [openSection, setOpenSection] = useState<SectionKey | null>("account");
  const toggleSection = (id: SectionKey) =>
    setOpenSection((prev) => (prev === id ? null : id));

  // ── Edit mode
  const [editMode, setEditMode] = useState(false);
  const [accountSnapshot] = useState(() =>
    loadProfileAccount(
      {
        email: user.email,
        countryCode: user.countryCode,
        currency: user.currency,
      },
      ACCOUNT_STORAGE_OPTS,
    ),
  );
  const [email, setEmail] = useState(accountSnapshot.email);
  const [country, setCountry] = useState(accountSnapshot.countryCode);
  const [currency, setCurrency] = useState(accountSnapshot.currency);

  const handleEditProfileClick = () => {
    setEditMode((wasEditing) => {
      if (wasEditing) return false;
      queueMicrotask(() => {
        setOpenSection("account");
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            sectionRef.current?.scrollIntoView({
              behavior: "smooth",
              block: "start",
            });
          });
        });
      });
      return true;
    });
  };

  // ── Payout profile (localStorage)
  const [payoutProfile, setPayoutProfile] = useState<PayoutProfile>(() =>
    loadPayoutProfile(),
  );
  const [payoutEditMode, setPayoutEditMode] = useState(false);

  // ── Notifications
  const [notifs, setNotifs] = useState<NotifState>({
    draw_start: true,
    draw_results: true,
    prize_won: true,
    unclaimed: true,
    news: false,
  });
  const toggleNotif = (key: keyof NotifState) =>
    setNotifs((n) => ({ ...n, [key]: !n[key] }));

  // ── Spending limits (localStorage)
  const [limits, setLimits] = useState<SpendingLimits>(() => {
    const stored = localStorage.getItem("lsbfl-limits");
    return stored
      ? (JSON.parse(stored) as SpendingLimits)
      : { daily: "", monthly: "" };
  });
  useEffect(() => {
    localStorage.setItem("lsbfl-limits", JSON.stringify(limits));
  }, [limits]);

  // ── Privacy toggles
  const [showName, setShowName] = useState(true);

  // ── Modals
  const [showBreak, setShowBreak] = useState(false);
  const [showDelete, setShowDelete] = useState(false);

  // ── Avatar initials
  const initials = user.name
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  const countryInfo = COUNTRIES.find((c) => c.code === country);
  const displayCountry = countryInfo ? countryInfo.label : `🌎 ${user.country}`;

  const memberYear = new Date(user.joinedAt).toLocaleDateString(
    lang === "es" ? "es-MX" : "en-US",
    { month: "long", year: "numeric" },
  );

  const inputCls =
    "w-full h-11 px-4 rounded-xl bg-muted/50 border border-input text-foreground font-body text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-smooth";

  const labelCls =
    "block font-body text-xs text-muted-foreground mb-1.5 uppercase tracking-wide";

  const sectionRef = useRef<HTMLDivElement>(null);

  return (
    <>
      <div
        className="min-h-screen bg-background pb-24"
        data-ocid="profile.page"
      >
        {/* ─── Profile Header ─────────────────────────────────────────────── */}
        <div
          className="relative px-4 pt-10 pb-8 border-b border-border bg-card"
          style={{
            background:
              "radial-gradient(ellipse at 60% -10%, oklch(0.18 0.06 80 / 0.35) 0%, transparent 55%), oklch(var(--card))",
          }}
          data-ocid="profile.header_section"
        >
          <div className="max-w-lg mx-auto">
            {/* Avatar + name row */}
            <div className="flex items-start gap-5">
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: "spring", stiffness: 300, damping: 22 }}
                className="relative shrink-0"
                data-ocid="profile.avatar"
              >
                <div
                  className="w-20 h-20 rounded-full flex items-center justify-center font-display text-2xl font-black text-background shadow-glow-gold border-2 border-primary"
                  style={{ background: "oklch(var(--primary))" }}
                >
                  {initials}
                </div>
                {/* online dot */}
                <span className="absolute bottom-1 right-1 w-3.5 h-3.5 rounded-full bg-secondary border-2 border-card" />
              </motion.div>

              <div className="flex-1 min-w-0 pt-1">
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0">
                    <h1 className="font-display text-2xl font-black text-foreground truncate">
                      {user.name}
                    </h1>
                    <p className="font-body text-sm text-muted-foreground mt-0.5">
                      {displayCountry} ·{" "}
                      {countryInfo?.currency ?? user.currency}
                    </p>
                    <p className="font-body text-xs text-muted-foreground mt-1">
                      {t("Miembro desde", "Member since")} {memberYear}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={handleEditProfileClick}
                    data-ocid="profile.edit_button"
                    className={cn(
                      "shrink-0 w-9 h-9 rounded-xl flex items-center justify-center border transition-smooth mt-0.5",
                      editMode
                        ? "bg-primary/20 border-primary text-primary"
                        : "bg-muted/50 border-border text-muted-foreground hover:text-foreground hover:border-primary/50",
                    )}
                    aria-pressed={editMode}
                    aria-label={t("Editar perfil", "Edit profile")}
                  >
                    <Pencil size={15} />
                  </button>
                </div>
              </div>
            </div>

            {/* Stats row */}
            <div
              className="grid grid-cols-4 gap-3 mt-6"
              data-ocid="profile.stats_section"
            >
              {[
                {
                  emoji: "🎟️",
                  value: user.ticketsBought,
                  labelEs: "Comprados",
                  labelEn: "Bought",
                  ocid: "profile.stat_tickets",
                },
                {
                  emoji: "🏆",
                  value: user.wins,
                  labelEs: "Premios",
                  labelEn: "Prizes",
                  ocid: "profile.stat_wins",
                },
                {
                  emoji: "🎁",
                  value: 2,
                  labelEs: "Regalados",
                  labelEn: "Gifted",
                  ocid: "profile.stat_gifted",
                },
                {
                  emoji: "⭐",
                  value: 14,
                  labelEs: "Favorito",
                  labelEn: "Lucky#",
                  ocid: "profile.stat_lucky",
                },
              ].map((s) => (
                <motion.div
                  key={s.ocid}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="ticket-card bg-background/60 border border-primary/15 p-3 flex flex-col items-center gap-1"
                  data-ocid={s.ocid}
                >
                  <span className="text-xl">{s.emoji}</span>
                  <p className="font-display text-xl font-black text-primary leading-none">
                    {s.value}
                  </p>
                  <p className="font-body text-[10px] text-muted-foreground text-center leading-tight">
                    {t(s.labelEs, s.labelEn)}
                  </p>
                </motion.div>
              ))}
            </div>

            {/* Last win pill */}
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="mt-4 inline-flex items-center gap-2 bg-secondary/15 border border-secondary/30 rounded-full px-4 py-2"
              data-ocid="profile.last_win_highlight"
            >
              <span className="text-sm">🏅</span>
              <span className="font-body text-xs text-secondary font-semibold">
                {t("Último premio:", "Last win:")}
              </span>
              <span className="font-body text-xs text-foreground">
                $2,500 USD · Classic 6/45
              </span>
            </motion.div>
          </div>
        </div>

        {/* ─── Badges ────────────────────────────────────────────────────── */}
        <div
          className="max-w-lg mx-auto px-4 pt-6"
          data-ocid="profile.badges_section"
        >
          <h2 className="font-display text-sm font-bold text-muted-foreground uppercase tracking-widest mb-3">
            {t("Insignias", "Badges")}
          </h2>
          <div className="flex gap-3 overflow-x-auto pb-2">
            {user.badges.map((badge, i) => (
              <motion.div
                key={badge.id}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.08 }}
                className="ticket-card bg-card border border-primary/20 p-3 flex flex-col items-center gap-1 shrink-0 w-20 hover:border-primary/50 transition-smooth"
                data-ocid={`profile.badge.${i + 1}`}
              >
                <span className="text-2xl">{badge.emoji}</span>
                <p className="font-body text-[11px] text-center text-foreground leading-tight">
                  {t(badge.nameEs, badge.name)}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* ─── Admin shortcut ─────────────────────────────────────────────── */}
        <div className="max-w-lg mx-auto px-4 pt-6">
          <Link
            to="/admin"
            data-ocid="profile.admin_panel_link"
            className="ticket-card flex items-center gap-4 p-4 border border-primary/25 bg-primary/5 hover:border-primary/45 hover:bg-primary/10 transition-smooth group"
          >
            <span className="shrink-0 w-11 h-11 rounded-xl bg-primary/15 border border-primary/30 flex items-center justify-center text-primary group-hover:shadow-glow-gold transition-smooth">
              <LayoutDashboard size={22} aria-hidden />
            </span>
            <div className="min-w-0 flex-1 text-left">
              <p className="font-display text-sm font-bold text-foreground">
                {t("Panel de administración", "Administration panel")}
              </p>
              <p className="font-body text-xs text-muted-foreground mt-0.5">
                {t(
                  "Gestionar sorteos y vista operativa",
                  "Manage draws and operational view",
                )}
              </p>
            </div>
            <span className="text-muted-foreground group-hover:text-primary text-sm font-body shrink-0">
              →
            </span>
          </Link>
        </div>

        {/* ─── Settings accordion ──────────────────────────────────────────── */}
        <div
          className="max-w-lg mx-auto px-4 pt-6 flex flex-col gap-3"
          ref={sectionRef}
        >
          {/* ── Cuenta / Account ── */}
          <SectionAccordion
            id="account"
            label={t("Cuenta / Account", "Account / Cuenta")}
            icon={<Mail size={17} />}
            open={openSection === "account"}
            onToggle={toggleSection}
          >
            <div className="flex flex-col gap-4">
              <div>
                <label htmlFor="email-input" className={labelCls}>
                  {t("Correo electrónico", "Email address")}
                </label>
                <input
                  id="email-input"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={!editMode}
                  placeholder="tu@correo.com"
                  className={cn(
                    inputCls,
                    !editMode && "opacity-60 cursor-not-allowed",
                  )}
                  data-ocid="profile.account.email_input"
                />
              </div>
              <div>
                <label htmlFor="country-select" className={labelCls}>
                  {t("País", "Country")}
                </label>
                <select
                  id="country-select"
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  disabled={!editMode}
                  className={cn(
                    inputCls,
                    !editMode && "opacity-60 cursor-not-allowed",
                  )}
                  data-ocid="profile.account.country_select"
                >
                  {COUNTRIES.map((c) => (
                    <option key={c.code} value={c.code}>
                      {c.label}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="currency-select" className={labelCls}>
                  {t("Moneda preferida", "Preferred currency")}
                </label>
                <select
                  id="currency-select"
                  value={currency}
                  onChange={(e) => setCurrency(e.target.value)}
                  disabled={!editMode}
                  className={cn(
                    inputCls,
                    !editMode && "opacity-60 cursor-not-allowed",
                  )}
                  data-ocid="profile.account.currency_select"
                >
                  {CURRENCIES.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>
              {editMode && (
                <motion.div
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <GlowButton
                    type="button"
                    variant="gold"
                    size="md"
                    className="w-full"
                    data-ocid="profile.account.save_button"
                    onClick={() => {
                      saveProfileAccount({
                        email,
                        countryCode: country,
                        currency,
                      });
                      setEditMode(false);
                      toast.success(
                        t("Cambios guardados ✓", "Changes saved ✓"),
                      );
                    }}
                  >
                    {t("Guardar cambios", "Save changes")}
                  </GlowButton>
                </motion.div>
              )}
            </div>
          </SectionAccordion>

          {/* ── Datos de cobro de premios ── */}
          <SectionAccordion
            id="payout"
            label={t("Datos de cobro de premios", "Prize payout details")}
            icon={<Wallet size={17} />}
            open={openSection === "payout"}
            onToggle={toggleSection}
          >
            <div
              className="flex flex-col gap-4"
              data-ocid="profile.payout.body"
            >
              <div className="flex items-start justify-between gap-2">
                <p className="font-body text-xs text-muted-foreground leading-relaxed flex-1">
                  {t(
                    "Usaremos estos datos para liquidar premios ganadores. Puedes cambiarlos cuando quieras.",
                    "We use this information to pay out prizes. You can update it anytime.",
                  )}
                </p>
                <button
                  type="button"
                  onClick={() => {
                    if (payoutEditMode) {
                      setPayoutProfile(loadPayoutProfile());
                      setPayoutEditMode(false);
                    } else {
                      setPayoutEditMode(true);
                    }
                  }}
                  data-ocid="profile.payout.edit_toggle"
                  className={cn(
                    "shrink-0 w-9 h-9 rounded-xl flex items-center justify-center border transition-smooth",
                    payoutEditMode
                      ? "bg-muted/80 border-border text-foreground"
                      : "bg-muted/50 border-border text-muted-foreground hover:text-foreground hover:border-primary/50",
                  )}
                  aria-label={
                    payoutEditMode
                      ? t("Cancelar edición", "Cancel editing")
                      : t("Editar datos de cobro", "Edit payout details")
                  }
                >
                  {payoutEditMode ? <X size={15} /> : <Pencil size={15} />}
                </button>
              </div>

              <div
                className="flex flex-col gap-3"
                data-ocid="profile.payout.contact_fields"
              >
                <p className={labelCls}>
                  {t("Datos para liquidación", "Payout identity")}
                </p>
                <div>
                  <label htmlFor="payout-contact-name" className={labelCls}>
                    {t(
                      "Nombre completo (como en identificación)",
                      "Full name (as on ID)",
                    )}
                  </label>
                  <input
                    id="payout-contact-name"
                    type="text"
                    autoComplete="name"
                    disabled={!payoutEditMode}
                    value={payoutProfile.contactFullName}
                    onChange={(e) =>
                      setPayoutProfile((p) => ({
                        ...p,
                        contactFullName: e.target.value,
                      }))
                    }
                    className={cn(
                      inputCls,
                      !payoutEditMode && "opacity-60 cursor-not-allowed",
                    )}
                    data-ocid="profile.payout.contact_name_input"
                  />
                </div>
                <div>
                  <label htmlFor="payout-contact-phone" className={labelCls}>
                    {t("Teléfono de contacto", "Contact phone")}
                  </label>
                  <input
                    id="payout-contact-phone"
                    type="tel"
                    autoComplete="tel"
                    disabled={!payoutEditMode}
                    value={payoutProfile.contactPhone}
                    onChange={(e) =>
                      setPayoutProfile((p) => ({
                        ...p,
                        contactPhone: e.target.value,
                      }))
                    }
                    placeholder={t(
                      "Ej. +52 55 1234 5678",
                      "e.g. +1 415 555 0100",
                    )}
                    className={cn(
                      inputCls,
                      !payoutEditMode && "opacity-60 cursor-not-allowed",
                    )}
                    data-ocid="profile.payout.contact_phone_input"
                  />
                </div>
              </div>

              <div data-ocid="profile.payout.method_list">
                <p className={labelCls}>
                  {t("Método preferido", "Preferred method")}
                </p>
                <div className="flex flex-col gap-2 mt-2">
                  {PAYOUT_OPTIONS.map((opt) => {
                    const isSel = payoutProfile.preferredMethod === opt.key;
                    return (
                      <button
                        key={opt.key}
                        type="button"
                        disabled={!payoutEditMode}
                        onClick={() =>
                          setPayoutProfile((p) => ({
                            ...p,
                            preferredMethod: opt.key,
                          }))
                        }
                        data-ocid={`profile.payout.method_${opt.key}`}
                        className={cn(
                          "w-full ticket-card p-3 border text-left transition-smooth flex items-center gap-3 rounded-xl",
                          isSel
                            ? "border-primary/60 bg-primary/10"
                            : "border-border bg-card/80",
                          !payoutEditMode && "opacity-70 cursor-not-allowed",
                        )}
                      >
                        <span className="text-2xl shrink-0">{opt.icon}</span>
                        <div className="min-w-0 flex-1">
                          <p className="font-display text-sm font-bold text-foreground">
                            {t(opt.titleEs, opt.titleEn)}
                          </p>
                          <p className="font-body text-[11px] text-muted-foreground">
                            {t(opt.subtitleEs, opt.subtitleEn)}
                          </p>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {payoutProfile.preferredMethod === "Wallet" && (
                <div
                  className="rounded-xl bg-muted/40 border border-border px-4 py-3"
                  data-ocid="profile.payout.wallet_info"
                >
                  <p className="font-body text-sm text-foreground leading-relaxed">
                    {t(
                      "Los premios en cartera digital se acreditan a tu saldo LSBFL de forma instantánea.",
                      "Digital wallet prizes are credited to your LSBFL balance instantly.",
                    )}
                  </p>
                </div>
              )}

              {payoutProfile.preferredMethod === "BankTransfer" && (
                <div
                  className="flex flex-col gap-3"
                  data-ocid="profile.payout.bank_fields"
                >
                  <div>
                    <label htmlFor="payout-bank-holder" className={labelCls}>
                      {t("Titular de la cuenta", "Account holder")}
                    </label>
                    <input
                      id="payout-bank-holder"
                      type="text"
                      disabled={!payoutEditMode}
                      value={payoutProfile.bank.accountHolder}
                      onChange={(e) =>
                        setPayoutProfile((p) => ({
                          ...p,
                          bank: {
                            ...p.bank,
                            accountHolder: e.target.value,
                          },
                        }))
                      }
                      className={cn(
                        inputCls,
                        !payoutEditMode && "opacity-60 cursor-not-allowed",
                      )}
                      data-ocid="profile.payout.bank_holder_input"
                    />
                  </div>
                  <div>
                    <label htmlFor="payout-bank-name" className={labelCls}>
                      {t("Banco", "Bank name")}
                    </label>
                    <input
                      id="payout-bank-name"
                      type="text"
                      disabled={!payoutEditMode}
                      value={payoutProfile.bank.bankName}
                      onChange={(e) =>
                        setPayoutProfile((p) => ({
                          ...p,
                          bank: { ...p.bank, bankName: e.target.value },
                        }))
                      }
                      className={cn(
                        inputCls,
                        !payoutEditMode && "opacity-60 cursor-not-allowed",
                      )}
                      data-ocid="profile.payout.bank_name_input"
                    />
                  </div>
                  <div>
                    <label htmlFor="payout-clabe" className={labelCls}>
                      {t("CLABE / IBAN / cuenta", "CLABE / IBAN / account")}
                    </label>
                    <input
                      id="payout-clabe"
                      type="text"
                      inputMode="numeric"
                      autoComplete="off"
                      disabled={!payoutEditMode}
                      value={payoutProfile.bank.clabeOrIban}
                      onChange={(e) =>
                        setPayoutProfile((p) => ({
                          ...p,
                          bank: { ...p.bank, clabeOrIban: e.target.value },
                        }))
                      }
                      className={cn(
                        inputCls,
                        !payoutEditMode && "opacity-60 cursor-not-allowed",
                      )}
                      data-ocid="profile.payout.bank_clabe_input"
                    />
                  </div>
                  <div>
                    <label htmlFor="payout-tax" className={labelCls}>
                      {t("RFC / ID fiscal (opcional)", "Tax ID (optional)")}
                    </label>
                    <input
                      id="payout-tax"
                      type="text"
                      disabled={!payoutEditMode}
                      value={payoutProfile.bank.taxId ?? ""}
                      onChange={(e) =>
                        setPayoutProfile((p) => ({
                          ...p,
                          bank: { ...p.bank, taxId: e.target.value },
                        }))
                      }
                      className={cn(
                        inputCls,
                        !payoutEditMode && "opacity-60 cursor-not-allowed",
                      )}
                      data-ocid="profile.payout.bank_tax_input"
                    />
                  </div>
                </div>
              )}

              {payoutProfile.preferredMethod === "StoreCredit" && (
                <div
                  className="flex flex-col gap-3"
                  data-ocid="profile.payout.store_fields"
                >
                  <div>
                    <label htmlFor="payout-city" className={labelCls}>
                      {t("Ciudad o zona preferida", "Preferred city or area")}
                    </label>
                    <input
                      id="payout-city"
                      type="text"
                      disabled={!payoutEditMode}
                      value={payoutProfile.preferredCity}
                      onChange={(e) =>
                        setPayoutProfile((p) => ({
                          ...p,
                          preferredCity: e.target.value,
                        }))
                      }
                      placeholder={t("Ej. CDMX", "e.g. Mexico City")}
                      className={cn(
                        inputCls,
                        !payoutEditMode && "opacity-60 cursor-not-allowed",
                      )}
                      data-ocid="profile.payout.store_city_input"
                    />
                  </div>
                  <Link
                    to="/map"
                    className="inline-flex items-center gap-2 font-body text-sm text-primary font-semibold hover:underline"
                    data-ocid="profile.payout.store_map_link"
                  >
                    {t("Ver mapa de tiendas", "View store map")} →
                  </Link>
                </div>
              )}

              <div className="flex items-start gap-2 rounded-xl bg-muted/30 border border-border px-3 py-2.5">
                <ShieldAlert
                  size={14}
                  className="text-muted-foreground shrink-0 mt-0.5"
                />
                <p className="font-body text-[11px] text-muted-foreground leading-relaxed">
                  {t(
                    "Datos sensibles: solo para liquidación de premios, no se comparten con fines publicitarios.",
                    "Sensitive data: used for prize payouts only, not for marketing.",
                  )}
                </p>
              </div>

              {payoutEditMode && (
                <div className="flex flex-col gap-2 pt-1">
                  <GlowButton
                    type="button"
                    variant="gold"
                    size="md"
                    className="w-full"
                    data-ocid="profile.payout.save_button"
                    onClick={() => {
                      savePayoutProfile(payoutProfile);
                      setPayoutEditMode(false);
                      toast.success(
                        t(
                          "Datos de cobro guardados ✓",
                          "Payout details saved ✓",
                        ),
                      );
                    }}
                  >
                    {t("Guardar datos de cobro", "Save payout details")}
                  </GlowButton>
                </div>
              )}
            </div>
          </SectionAccordion>

          {/* ── Notificaciones ── */}
          <SectionAccordion
            id="notifications"
            label={t(
              "Notificaciones / Notifications",
              "Notifications / Notificaciones",
            )}
            icon={<Bell size={17} />}
            open={openSection === "notifications"}
            onToggle={toggleSection}
          >
            <div className="flex flex-col divide-y divide-border">
              <LabeledToggle
                label={t("Sorteo por comenzar", "Draw about to start")}
                checked={notifs.draw_start}
                onChange={() => toggleNotif("draw_start")}
                toggleId="notif-draw-start"
                ocid="profile.notif.draw_start"
              />
              <LabeledToggle
                label={t("Resultado del sorteo", "Draw results")}
                checked={notifs.draw_results}
                onChange={() => toggleNotif("draw_results")}
                toggleId="notif-draw-results"
                ocid="profile.notif.draw_results"
              />
              <LabeledToggle
                label={t("Premio ganado", "Prize won")}
                sublabel={t("Notificación inmediata", "Immediate notification")}
                checked={notifs.prize_won}
                onChange={() => toggleNotif("prize_won")}
                toggleId="notif-prize"
                ocid="profile.notif.prize_won"
              />
              <LabeledToggle
                label={t("Boleto sin reclamar", "Unclaimed ticket")}
                checked={notifs.unclaimed}
                onChange={() => toggleNotif("unclaimed")}
                toggleId="notif-unclaimed"
                ocid="profile.notif.unclaimed"
              />
              <LabeledToggle
                label={t("Noticias y ofertas", "News and offers")}
                checked={notifs.news}
                onChange={() => toggleNotif("news")}
                toggleId="notif-news"
                ocid="profile.notif.news"
              />
            </div>
          </SectionAccordion>

          {/* ── Idioma y apariencia ── */}
          <SectionAccordion
            id="appearance"
            label={t("Idioma y apariencia", "Language & appearance")}
            icon={<Globe size={17} />}
            open={openSection === "appearance"}
            onToggle={toggleSection}
          >
            <div className="flex flex-col gap-5">
              {/* Language selector */}
              <div>
                <p className={labelCls}>{t("Idioma", "Language")}</p>
                <div
                  className="flex rounded-2xl border border-border overflow-hidden"
                  aria-label={t("Seleccionar idioma", "Select language")}
                >
                  {(["es", "en"] as const).map((l) => (
                    <button
                      key={l}
                      type="button"
                      aria-pressed={lang === l}
                      onClick={() => lang !== l && toggleLang()}
                      data-ocid={`profile.lang_option_${l}`}
                      className={cn(
                        "flex-1 py-3 font-body font-semibold text-sm transition-smooth",
                        lang === l
                          ? "bg-primary text-primary-foreground shadow-glow-gold"
                          : "bg-muted/30 text-muted-foreground hover:text-foreground",
                      )}
                    >
                      {l === "es" ? "🇲🇽 Español" : "🇺🇸 English"}
                    </button>
                  ))}
                </div>
              </div>

              {/* Theme toggle */}
              <div>
                <p className={labelCls}>{t("Tema", "Theme")}</p>
                <div
                  className="flex rounded-2xl border border-border overflow-hidden"
                  aria-label={t("Seleccionar tema", "Select theme")}
                >
                  <button
                    type="button"
                    aria-pressed={isDark}
                    onClick={() => !isDark && toggleTheme()}
                    data-ocid="profile.theme_option_dark"
                    className={cn(
                      "flex-1 py-3 flex items-center justify-center gap-2 font-body font-semibold text-sm transition-smooth",
                      isDark
                        ? "bg-primary text-primary-foreground shadow-glow-gold"
                        : "bg-muted/30 text-muted-foreground hover:text-foreground",
                    )}
                  >
                    <Moon size={14} />
                    {t("Oscuro", "Dark")}
                  </button>
                  <button
                    type="button"
                    aria-pressed={!isDark}
                    onClick={() => isDark && toggleTheme()}
                    data-ocid="profile.theme_option_light"
                    className={cn(
                      "flex-1 py-3 flex items-center justify-center gap-2 font-body font-semibold text-sm transition-smooth",
                      !isDark
                        ? "bg-primary text-primary-foreground shadow-glow-gold"
                        : "bg-muted/30 text-muted-foreground hover:text-foreground",
                    )}
                  >
                    <Sun size={14} />
                    {t("Claro", "Light")}
                  </button>
                </div>
              </div>
            </div>
          </SectionAccordion>

          {/* ── Juego responsable ── */}
          <SectionAccordion
            id="responsible"
            label={t("Juego responsable", "Responsible gaming")}
            icon={<Shield size={17} />}
            open={openSection === "responsible"}
            onToggle={toggleSection}
          >
            {/* Warm intro */}
            <div className="mb-5 rounded-2xl bg-secondary/10 border border-secondary/25 px-4 py-3.5">
              <p className="font-body text-sm text-foreground leading-relaxed">
                🌿{" "}
                <span className="font-semibold">
                  {t(
                    "Tu bienestar es parte de la experiencia.",
                    "Your wellbeing is part of the experience.",
                  )}
                </span>{" "}
                {t(
                  "Jugar debe ser siempre un disfrute.",
                  "Playing should always be enjoyable.",
                )}
              </p>
            </div>

            {/* Spending limits */}
            <div className="flex flex-col gap-3 mb-5">
              <p className={labelCls}>
                {t("Límites de gasto", "Spending limits")}
              </p>
              <div>
                <label
                  htmlFor="daily-limit"
                  className="font-body text-xs text-muted-foreground mb-1 block"
                >
                  {t("Límite diario (USD)", "Daily limit (USD)")}
                </label>
                <input
                  id="daily-limit"
                  type="number"
                  min="0"
                  value={limits.daily}
                  onChange={(e) =>
                    setLimits((l) => ({ ...l, daily: e.target.value }))
                  }
                  placeholder="$0.00"
                  className={inputCls}
                  data-ocid="profile.responsible.daily_limit_input"
                />
              </div>
              <div>
                <label
                  htmlFor="monthly-limit"
                  className="font-body text-xs text-muted-foreground mb-1 block"
                >
                  {t("Límite mensual (USD)", "Monthly limit (USD)")}
                </label>
                <input
                  id="monthly-limit"
                  type="number"
                  min="0"
                  value={limits.monthly}
                  onChange={(e) =>
                    setLimits((l) => ({ ...l, monthly: e.target.value }))
                  }
                  placeholder="$0.00"
                  className={inputCls}
                  data-ocid="profile.responsible.monthly_limit_input"
                />
              </div>
            </div>

            {/* Break button */}
            <GlowButton
              type="button"
              variant="green"
              size="md"
              className="w-full mb-3"
              data-ocid="profile.responsible.break_button"
              onClick={() => setShowBreak(true)}
            >
              🌿 {t("Tomar una pausa", "Take a break")}
            </GlowButton>

            {/* Self-exclusion */}
            <button
              type="button"
              data-ocid="profile.responsible.self_exclusion_link"
              className="w-full text-center font-body text-sm text-muted-foreground underline underline-offset-2 hover:text-destructive transition-colors py-1"
              onClick={() =>
                toast.warning(
                  t(
                    "Contacta soporte para autoexclusión.",
                    "Contact support for self-exclusion.",
                  ),
                )
              }
            >
              {t(
                "Autoexclusión / Self-exclusion",
                "Self-exclusion / Autoexclusión",
              )}
            </button>

            {/* Helpline */}
            <div className="mt-4 rounded-xl bg-muted/40 border border-border px-4 py-3 text-center">
              <p className="font-body text-xs text-muted-foreground">
                {t("¿Necesitas ayuda?", "Need help?")}{" "}
                <span className="text-primary font-semibold">
                  Línea 800-LSBFL
                </span>
              </p>
            </div>
          </SectionAccordion>

          {/* ── Privacidad ── */}
          <SectionAccordion
            id="privacy"
            label={t("Privacidad / Privacy", "Privacy / Privacidad")}
            icon={<MapPin size={17} />}
            open={openSection === "privacy"}
            onToggle={toggleSection}
          >
            <div className="flex flex-col gap-4">
              <LabeledToggle
                label={t("Mostrar mi nombre si gano", "Show my name if I win")}
                sublabel={t(
                  "Aparecerás en el muro de ganadores",
                  "You'll appear on the winners wall",
                )}
                checked={showName}
                onChange={() => setShowName((v) => !v)}
                toggleId="privacy-show-name"
                ocid="profile.privacy.show_name_toggle"
              />

              <div className="flex flex-col gap-2 pt-1 border-t border-border">
                <GlowButton
                  type="button"
                  variant="outline"
                  size="sm"
                  className="w-full gap-2"
                  data-ocid="profile.privacy.export_button"
                  onClick={() =>
                    toast.success(
                      t(
                        "Descarga lista en tu correo 📩",
                        "Download link sent to your email 📩",
                      ),
                    )
                  }
                >
                  <Download size={14} />
                  {t("Exportar mis datos", "Export my data")}
                </GlowButton>

                <button
                  type="button"
                  data-ocid="profile.privacy.delete_account_button"
                  onClick={() => setShowDelete(true)}
                  className="w-full flex items-center justify-center gap-2 h-9 px-4 rounded-xl font-body text-sm text-destructive/80 hover:text-destructive border border-transparent hover:border-destructive/30 hover:bg-destructive/5 transition-smooth"
                >
                  <Trash2 size={14} />
                  {t(
                    "Solicitar eliminación de cuenta",
                    "Request account deletion",
                  )}
                </button>
              </div>
            </div>
          </SectionAccordion>
        </div>
      </div>

      {/* ─── Modals ───────────────────────────────────────────────────────────── */}
      <BreakModal open={showBreak} onClose={() => setShowBreak(false)} t={t} />
      <DeleteDialog
        open={showDelete}
        onClose={() => setShowDelete(false)}
        t={t}
      />
    </>
  );
}
