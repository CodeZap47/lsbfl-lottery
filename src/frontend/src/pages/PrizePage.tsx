import { Confetti } from "@/components/ui/Confetti";
import { GlowButton } from "@/components/ui/GlowButton";
import { PAYOUT_OPTIONS } from "@/constants/payoutOptions";
import { useLanguage } from "@/hooks/useLanguage";
import { useMockData } from "@/hooks/useMockData";
import { loadPayoutProfile } from "@/lib/payoutProfileStorage";
import { cn } from "@/lib/utils";
import type { PrizePayoutMethod } from "@/types";
import { Link, useNavigate, useParams } from "@tanstack/react-router";
import {
  ArrowLeft,
  CheckCircle2,
  Download,
  Lock,
  MapPin,
  ShieldCheck,
  Sparkles,
  Star,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

// ── Types ──────────────────────────────────────────────────────────────────────

type Step = "celebrate" | "payout" | "verify" | "confirmed";

// ── Subcomponents ──────────────────────────────────────────────────────────────

function WinningNumbers({
  numbers,
  matched,
}: { numbers: number[]; matched?: number[] }) {
  return (
    <div className="flex flex-wrap gap-2 justify-center">
      {numbers.map((n) => {
        const isMatch = matched?.includes(n);
        return (
          <motion.span
            key={n}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 400, damping: 20 }}
            className={cn(
              "w-10 h-10 rounded-full flex items-center justify-center font-display font-black text-sm border-2 transition-smooth",
              isMatch
                ? "bg-secondary text-secondary-foreground border-secondary/60 shadow-[0_0_12px_oklch(var(--secondary)/0.5)]"
                : "bg-primary text-primary-foreground border-primary/60 shadow-[0_0_12px_oklch(var(--primary)/0.4)]",
            )}
          >
            {n}
          </motion.span>
        );
      })}
    </div>
  );
}

function FoilTicketCard({
  ticket,
  t,
}: {
  ticket: ReturnType<typeof useMockData>["tickets"][number];
  t: (es: string, en: string) => string;
}) {
  return (
    <div
      className={cn(
        "relative ticket-card border overflow-hidden foil-ticket-surface",
        "border-primary/25 dark:border-primary/40",
      )}
      data-ocid="prize.foil_ticket_card"
    >
      {/* Foil shimmer overlay */}
      <div
        className="foil-ticket-shimmer absolute inset-0 pointer-events-none"
        aria-hidden="true"
      />

      {/* Ticket perforations top */}
      <div className="flex gap-1 px-4 pt-3" aria-hidden="true">
        {Array.from({ length: 14 }, (_, i) => i).map((i) => (
          <div
            key={`top-perf-${i}`}
            className="flex-1 h-[2px] rounded-full bg-primary/12 dark:bg-primary/20"
          />
        ))}
      </div>

      <div className="px-6 py-5 space-y-4">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div>
            <p className="font-body text-xs uppercase tracking-[0.25em] text-primary/80 dark:text-primary/70 mb-1">
              LSBFL · {t(ticket.lotteryNameEs, ticket.lotteryName)}
            </p>
            <p className="font-mono text-xs text-muted-foreground/75 dark:text-muted-foreground/60">
              {ticket.serialCode}
            </p>
          </div>
          <div className="flex items-center gap-1.5 bg-secondary/15 border border-secondary/35 dark:bg-secondary/20 dark:border-secondary/30 rounded-xl px-3 py-1.5">
            <ShieldCheck size={13} className="text-secondary" />
            <span className="font-body text-xs font-semibold text-secondary">
              {t("Verificado", "Verified")}
            </span>
          </div>
        </div>

        {/* Numbers */}
        <WinningNumbers
          numbers={ticket.numbers}
          matched={ticket.matchedNumbers}
        />

        {/* Draw date */}
        <div className="flex items-center justify-between text-xs font-mono">
          <span className="text-muted-foreground/70 dark:text-muted-foreground/60">
            {t("Sorteo", "Draw")}:{" "}
            {new Date(ticket.drawDate).toLocaleDateString("es-MX", {
              day: "2-digit",
              month: "short",
              year: "numeric",
            })}
          </span>
          {ticket.isPhygital && (
            <span className="text-primary/70 dark:text-primary/60 flex items-center gap-1">
              <MapPin size={10} />
              {t("Phygital", "Phygital")}
            </span>
          )}
        </div>
      </div>

      {/* Ticket perforations bottom */}
      <div className="flex gap-1 px-4 pb-3" aria-hidden="true">
        {Array.from({ length: 14 }, (_, i) => i).map((i) => (
          <div
            key={`bot-perf-${i}`}
            className="flex-1 h-[2px] rounded-full bg-primary/12 dark:bg-primary/20"
          />
        ))}
      </div>
    </div>
  );
}

// ── Celebrate Step ─────────────────────────────────────────────────────────────

function CelebrateStep({
  prizeAmount,
  ticketName,
  drawDate,
  ticket,
  onContinue,
  t,
}: {
  prizeAmount: number;
  ticketName: string;
  drawDate: string;
  ticket: ReturnType<typeof useMockData>["tickets"][number];
  onContinue: () => void;
  t: (es: string, en: string) => string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="space-y-8"
      data-ocid="prize.celebrate_section"
    >
      {/* Hero headline */}
      <div className="text-center pt-4 space-y-3">
        <motion.div
          initial={{ scale: 0.4, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{
            type: "spring",
            stiffness: 260,
            damping: 18,
            delay: 0.1,
          }}
          className="inline-flex items-center gap-2 bg-primary/10 border border-primary/30 rounded-full px-4 py-2"
        >
          <Sparkles size={16} className="text-primary animate-pulse" />
          <span className="font-body text-sm font-semibold text-primary uppercase tracking-widest">
            {t("Ganador verificado", "Verified winner")}
          </span>
          <Sparkles size={16} className="text-primary animate-pulse" />
        </motion.div>

        <motion.h1
          initial={{ scale: 0.5, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          transition={{
            type: "spring",
            stiffness: 200,
            damping: 15,
            delay: 0.25,
          }}
          className="font-display font-black text-5xl sm:text-6xl leading-none"
          style={{
            color: "oklch(var(--primary))",
            textShadow: "0 0 40px oklch(var(--primary) / 0.5)",
          }}
        >
          ¡GANASTE!
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="font-display text-xl text-muted-foreground font-semibold"
        >
          YOU WON
        </motion.p>

        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{
            type: "spring",
            stiffness: 150,
            damping: 12,
            delay: 0.4,
          }}
          className="py-2"
        >
          <span
            className="font-display font-black text-7xl sm:text-8xl block"
            style={{
              color: "oklch(var(--primary))",
              textShadow:
                "0 0 60px oklch(var(--primary) / 0.6), 0 0 120px oklch(var(--primary) / 0.2)",
            }}
          >
            ${prizeAmount.toLocaleString()}
          </span>
          <span className="font-body text-sm text-muted-foreground">USD</span>
        </motion.div>

        {/* Meta info */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="flex items-center justify-center gap-3 text-xs font-body text-muted-foreground"
        >
          <span>{ticketName}</span>
          <span className="w-1 h-1 rounded-full bg-muted-foreground/40" />
          <span>
            {new Date(drawDate).toLocaleDateString("es-MX", {
              day: "2-digit",
              month: "short",
              year: "numeric",
            })}
          </span>
        </motion.div>

        {/* Winner badge */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.75 }}
          className="inline-flex items-center gap-2 bg-primary/15 border border-primary/40 rounded-2xl px-5 py-2.5"
        >
          <Star size={16} className="text-primary fill-primary" />
          <span className="font-display font-bold text-primary text-sm">
            {t(
              "Boleto ganador · Winner ticket",
              "Winner ticket · Boleto ganador",
            )}
          </span>
          <Star size={16} className="text-primary fill-primary" />
        </motion.div>
      </div>

      {/* Foil ticket card */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.65, duration: 0.5 }}
      >
        <FoilTicketCard ticket={ticket} t={t} />
      </motion.div>

      {/* CTA */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.85 }}
        className="pt-2"
      >
        <GlowButton
          type="button"
          variant="gold"
          size="xl"
          shimmer
          className="w-full"
          onClick={onContinue}
          data-ocid="prize.celebrate_continue_button"
        >
          {t("Reclamar premio →", "Claim prize →")}
        </GlowButton>
      </motion.div>
    </motion.div>
  );
}

// ── Payout Step ────────────────────────────────────────────────────────────────

function PayoutStep({
  selected,
  onSelect,
  onContinue,
  prizeAmount,
  t,
}: {
  selected: PrizePayoutMethod | null;
  onSelect: (m: PrizePayoutMethod) => void;
  onContinue: () => void;
  prizeAmount: number;
  t: (es: string, en: string) => string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -40 }}
      className="space-y-6"
      data-ocid="prize.payout_section"
    >
      <div className="text-center">
        <h2 className="font-display text-2xl font-black text-foreground mb-1">
          {t("¿Cómo quieres recibir", "How would you like")}
        </h2>
        <h2 className="font-display text-2xl font-black text-primary mb-2">
          {t("tu premio?", "your prize?")}
        </h2>
        <p className="font-body text-sm text-muted-foreground">
          ${prizeAmount.toLocaleString()} USD{" "}
          {t("listos para ti", "ready for you")}
        </p>
      </div>

      <div className="space-y-3" data-ocid="prize.payout_options_list">
        {PAYOUT_OPTIONS.map((opt, i) => {
          const isSelected = selected === opt.key;
          return (
            <motion.button
              key={opt.key}
              type="button"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              onClick={() => onSelect(opt.key)}
              data-ocid={`prize.payout_option.${i + 1}`}
              className={cn(
                "w-full ticket-card p-4 border text-left transition-smooth flex items-start gap-4",
                isSelected
                  ? "border-primary/60 bg-primary/10 shadow-[0_0_20px_oklch(var(--primary)/0.2)]"
                  : "border-border bg-card hover:border-primary/30 hover:bg-primary/5",
              )}
            >
              <span className="text-3xl flex-shrink-0">{opt.icon}</span>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-0.5">
                  <span className="font-display text-base font-bold text-foreground">
                    {t(opt.titleEs, opt.titleEn)}
                  </span>
                  {isSelected && (
                    <CheckCircle2
                      size={16}
                      className="text-primary flex-shrink-0"
                    />
                  )}
                </div>
                <p className="font-body text-xs text-muted-foreground">
                  {t(opt.subtitleEs, opt.subtitleEn)}
                  {opt.linkTo && (
                    <>
                      {" · "}
                      <Link
                        to={opt.linkTo}
                        className="text-primary underline underline-offset-2 hover:text-primary/80"
                        onClick={(e) => e.stopPropagation()}
                        data-ocid={`prize.payout_option_link.${opt.key}`}
                      >
                        {t(opt.linkEs ?? "", opt.linkEn ?? "")}
                      </Link>
                    </>
                  )}
                </p>
              </div>
              <div
                className={cn(
                  "w-5 h-5 rounded-full border-2 flex-shrink-0 mt-0.5 transition-smooth",
                  isSelected
                    ? "border-primary bg-primary"
                    : "border-border bg-transparent",
                )}
              >
                {isSelected && (
                  <div className="w-full h-full rounded-full bg-primary-foreground scale-50 block" />
                )}
              </div>
            </motion.button>
          );
        })}
      </div>

      <GlowButton
        type="button"
        variant="gold"
        size="xl"
        shimmer
        className="w-full"
        disabled={!selected}
        onClick={onContinue}
        data-ocid="prize.payout_continue_button"
      >
        {t("Continuar →", "Continue →")}
      </GlowButton>

      {!selected && (
        <p className="text-center font-body text-xs text-muted-foreground">
          {t(
            "Selecciona una opción para continuar",
            "Select an option to continue",
          )}
        </p>
      )}
    </motion.div>
  );
}

// ── Verify Step ────────────────────────────────────────────────────────────────

function VerifyStep({
  onVerified,
  t,
}: {
  onVerified: () => void;
  t: (es: string, en: string) => string;
}) {
  const [verifying, setVerifying] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    country: "",
    doc: "",
  });

  const isValid = form.name && form.email && form.country && form.doc;

  const handleVerify = async () => {
    setVerifying(true);
    await new Promise((r) => setTimeout(r, 1800));
    setVerifying(false);
    onVerified();
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -40 }}
      className="space-y-6"
      data-ocid="prize.verify_section"
    >
      <div className="text-center">
        <div className="w-14 h-14 rounded-2xl bg-primary/15 border border-primary/30 flex items-center justify-center mx-auto mb-4">
          <ShieldCheck size={28} className="text-primary" />
        </div>
        <h2 className="font-display text-2xl font-black text-foreground mb-2">
          {t("Verificar identidad", "Verify identity")}
        </h2>
        <p className="font-body text-sm text-muted-foreground max-w-xs mx-auto">
          {t(
            "Para premios mayores a $1,000 requerimos verificar tu identidad.",
            "For prizes over $1,000 we need to verify your identity.",
          )}
        </p>
      </div>

      <div className="space-y-4" data-ocid="prize.verify_form">
        {(
          [
            {
              id: "name",
              labelEs: "Nombre completo",
              labelEn: "Full name",
              type: "text",
              placeholder: "Ana García López",
              ocid: "prize.verify_name_input",
            },
            {
              id: "email",
              labelEs: "Email",
              labelEn: "Email",
              type: "email",
              placeholder: "ana@correo.mx",
              ocid: "prize.verify_email_input",
            },
            {
              id: "country",
              labelEs: "País",
              labelEn: "Country",
              type: "text",
              placeholder: "México",
              ocid: "prize.verify_country_input",
            },
            {
              id: "doc",
              labelEs: "Número de documento",
              labelEn: "Document number",
              type: "text",
              placeholder: "CURP / DNI / Passport",
              ocid: "prize.verify_doc_input",
            },
          ] as const
        ).map((field) => (
          <div key={field.id} className="space-y-1.5">
            <label
              htmlFor={`verify-${field.id}`}
              className="font-body text-sm font-medium text-foreground"
            >
              {t(field.labelEs, field.labelEn)}
            </label>
            <input
              id={`verify-${field.id}`}
              type={field.type}
              placeholder={field.placeholder}
              value={form[field.id]}
              onChange={(e) =>
                setForm((f) => ({ ...f, [field.id]: e.target.value }))
              }
              data-ocid={field.ocid}
              className={cn(
                "w-full h-12 px-4 rounded-2xl border border-input bg-card text-foreground",
                "font-body text-sm placeholder:text-muted-foreground/50",
                "focus:outline-none focus:ring-2 focus:ring-ring focus:border-primary/40",
                "transition-smooth",
              )}
            />
          </div>
        ))}
      </div>

      {/* Privacy note */}
      <div className="flex items-start gap-3 bg-muted/40 border border-border rounded-2xl px-4 py-3">
        <Lock
          size={16}
          className="text-muted-foreground flex-shrink-0 mt-0.5"
        />
        <p className="font-body text-xs text-muted-foreground leading-relaxed">
          {t(
            "Tu información está protegida y encriptada. Solo se usa para verificar tu premio.",
            "Your information is protected and encrypted. Only used to verify your prize.",
          )}
        </p>
      </div>

      <GlowButton
        type="button"
        variant="gold"
        size="xl"
        shimmer
        className="w-full"
        disabled={!isValid}
        loading={verifying}
        onClick={handleVerify}
        data-ocid="prize.verify_submit_button"
      >
        {t("Verificar identidad", "Verify identity")}
      </GlowButton>
    </motion.div>
  );
}

// ── Confirmed Step ─────────────────────────────────────────────────────────────

function ConfirmedStep({
  selectedPayout,
  prizeAmount,
  t,
}: {
  selectedPayout: PrizePayoutMethod | null;
  prizeAmount: number;
  t: (es: string, en: string) => string;
}) {
  const navigate = useNavigate();

  const etaEs =
    selectedPayout === "Wallet"
      ? "Instantáneo"
      : selectedPayout === "StoreCredit"
        ? "En tienda"
        : "2–5 días hábiles";
  const etaEn =
    selectedPayout === "Wallet"
      ? "Instant"
      : selectedPayout === "StoreCredit"
        ? "At store"
        : "2–5 business days";

  const methodOpt = PAYOUT_OPTIONS.find((p) => p.key === selectedPayout);
  const methodLabel = methodOpt
    ? t(methodOpt.titleEs, methodOpt.titleEn)
    : (selectedPayout ?? "—");

  const handleDownloadReceipt = () => {
    toast.success(t("Recibo descargado", "Receipt downloaded"), {
      description: t(
        "Tu recibo de premio fue guardado.",
        "Your prize receipt has been saved.",
      ),
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0 }}
      className="space-y-6 text-center"
      data-ocid="prize.confirmed_section"
    >
      {/* Success icon */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 300, damping: 18, delay: 0.1 }}
        className="w-20 h-20 rounded-full bg-secondary/20 border-2 border-secondary/40 flex items-center justify-center mx-auto"
        style={{ boxShadow: "0 0 40px oklch(var(--secondary)/0.4)" }}
      >
        <CheckCircle2 size={40} className="text-secondary" />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="space-y-2"
      >
        <h2
          className="font-display font-black text-3xl"
          style={{ color: "oklch(var(--primary))" }}
        >
          {t("¡Premio en camino!", "Prize on its way!")}
        </h2>
        <p className="font-body text-sm text-muted-foreground max-w-xs mx-auto">
          {t(
            "Tu premio ha sido registrado y está siendo procesado.",
            "Your prize has been registered and is being processed.",
          )}
        </p>
      </motion.div>

      {/* ETA card */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.45 }}
        className="ticket-card bg-card border border-primary/20 px-6 py-5 space-y-3"
      >
        <div className="flex items-center justify-between text-sm">
          <span className="font-body text-muted-foreground">
            {t("Premio", "Prize")}
          </span>
          <span className="font-display font-bold text-primary">
            ${prizeAmount.toLocaleString()} USD
          </span>
        </div>
        <div className="h-px bg-border" />
        <div className="flex items-center justify-between text-sm">
          <span className="font-body text-muted-foreground">
            {t("Método", "Method")}
          </span>
          <span className="font-body text-foreground font-medium">
            {methodLabel}
          </span>
        </div>
        <div className="h-px bg-border" />
        <div className="flex items-center justify-between text-sm">
          <span className="font-body text-muted-foreground">
            {t("Llegada estimada", "Estimated arrival")}
          </span>
          <span className="font-body text-secondary font-semibold">
            {t(etaEs, etaEn)}
          </span>
        </div>
      </motion.div>

      {/* Actions */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="space-y-3"
      >
        <button
          type="button"
          onClick={handleDownloadReceipt}
          data-ocid="prize.download_receipt_button"
          className={cn(
            "w-full h-12 rounded-2xl border border-border bg-card",
            "flex items-center justify-center gap-2",
            "font-body text-sm font-medium text-foreground",
            "hover:bg-muted/50 hover:border-primary/30 transition-smooth",
          )}
        >
          <Download size={16} className="text-muted-foreground" />
          {t("Descargar recibo", "Download receipt")}
        </button>

        <GlowButton
          type="button"
          variant="outline"
          size="lg"
          className="w-full"
          onClick={() => navigate({ to: "/wallet" })}
          data-ocid="prize.back_to_wallet_button"
        >
          {t("Ver mis boletos", "Back to wallet")}
        </GlowButton>
      </motion.div>
    </motion.div>
  );
}

// ── No Prize State ─────────────────────────────────────────────────────────────

function NoPrizeState({ t }: { t: (es: string, en: string) => string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center text-center py-16 space-y-5"
      data-ocid="prize.no_prize_state"
    >
      <span className="text-6xl">🎟️</span>
      <div className="space-y-2">
        <h2 className="font-display text-2xl font-black text-foreground">
          {t("Este boleto no ganó", "This ticket didn't win")}
        </h2>
        <p className="font-body text-sm text-muted-foreground max-w-xs mx-auto leading-relaxed">
          {t(
            "¡No te rindas! La suerte siempre está a un boleto de distancia.",
            "Don't give up! Luck is always one ticket away.",
          )}
        </p>
      </div>
      <Link to="/home" data-ocid="prize.try_again_link">
        <GlowButton type="button" variant="gold" size="lg" shimmer>
          {t("Comprar un boleto", "Buy a ticket")}
        </GlowButton>
      </Link>
      <Link
        to="/wallet"
        className="font-body text-sm text-muted-foreground hover:text-foreground underline underline-offset-4 transition-smooth"
        data-ocid="prize.back_wallet_link"
      >
        {t("Ver mi cartera", "View my wallet")}
      </Link>
    </motion.div>
  );
}

// ── PrizePage ──────────────────────────────────────────────────────────────────

export default function PrizePage() {
  const { ticketId } = useParams({ from: "/prize/$ticketId" });
  const navigate = useNavigate();
  const { t } = useLanguage();
  const { tickets } = useMockData();

  const ticket =
    tickets.find((tk) => tk.id === ticketId) ??
    tickets.find((tk) => tk.status === "Winner");

  const isWinner = ticket?.status === "Winner";
  const prizeAmount = ticket?.prizeAmount ?? 0;
  const needsVerification = prizeAmount > 1000;

  const [step, setStep] = useState<Step>("celebrate");
  const [selectedPayout, setSelectedPayout] =
    useState<PrizePayoutMethod | null>(null);
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    const saved = loadPayoutProfile().preferredMethod;
    setSelectedPayout(saved);
  }, []);

  // Auto-fire confetti on mount for winners
  useEffect(() => {
    if (isWinner) {
      const t = setTimeout(() => {
        setShowConfetti(true);
      }, 200);
      return () => clearTimeout(t);
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

  const stepTitle: Record<Step, { es: string; en: string }> = {
    celebrate: { es: "Premio", en: "Prize" },
    payout: { es: "Cobrar premio", en: "Claim prize" },
    verify: { es: "Verificación", en: "Verification" },
    confirmed: { es: "¡Confirmado!", en: "Confirmed!" },
  };

  return (
    <>
      <Confetti
        active={showConfetti}
        duration={4000}
        onComplete={() => setShowConfetti(false)}
      />

      <div
        className={cn(
          "min-h-screen",
          isWinner && step === "celebrate" ? "bg-ceremonial" : "bg-background",
        )}
        data-ocid="prize.page"
      >
        {/* Header */}
        <div className="sticky top-0 z-20 bg-card border-b border-border px-4 py-3 flex items-center gap-3">
          <button
            type="button"
            onClick={() => {
              if (step === "payout") setStep("celebrate");
              else if (step === "verify") setStep("payout");
              else navigate({ to: "/wallet" });
            }}
            className="p-2 rounded-xl text-muted-foreground hover:text-foreground hover:bg-muted/60 transition-smooth"
            data-ocid="prize.back_button"
            aria-label={t("Volver", "Go back")}
          >
            <ArrowLeft size={20} />
          </button>

          <h1 className="font-display text-lg font-bold text-foreground flex-1">
            {t(stepTitle[step].es, stepTitle[step].en)}
          </h1>

          {/* Step indicators */}
          {isWinner && (
            <div className="flex items-center gap-1.5" aria-hidden="true">
              {(
                [
                  "celebrate",
                  "payout",
                  needsVerification ? "verify" : null,
                  "confirmed",
                ] as (Step | null)[]
              )
                .filter(Boolean)
                .map((s) => (
                  <div
                    key={s}
                    className={cn(
                      "rounded-full transition-smooth",
                      s === step ? "w-5 h-2 bg-primary" : "w-2 h-2 bg-border",
                    )}
                  />
                ))}
            </div>
          )}
        </div>

        {/* Content */}
        <div className="max-w-lg mx-auto px-4 py-6 pb-16">
          {!ticket || !isWinner ? (
            <NoPrizeState t={t} />
          ) : (
            <AnimatePresence mode="wait">
              {step === "celebrate" && (
                <CelebrateStep
                  key="celebrate"
                  prizeAmount={prizeAmount}
                  ticketName={t(ticket.lotteryNameEs, ticket.lotteryName)}
                  drawDate={ticket.drawDate}
                  ticket={ticket}
                  onContinue={handleCelebrateContinue}
                  t={t}
                />
              )}
              {step === "payout" && (
                <PayoutStep
                  key="payout"
                  selected={selectedPayout}
                  onSelect={setSelectedPayout}
                  onContinue={handlePayoutContinue}
                  prizeAmount={prizeAmount}
                  t={t}
                />
              )}
              {step === "verify" && (
                <VerifyStep key="verify" onVerified={handleVerified} t={t} />
              )}
              {step === "confirmed" && (
                <ConfirmedStep
                  key="confirmed"
                  selectedPayout={selectedPayout}
                  prizeAmount={prizeAmount}
                  t={t}
                />
              )}
            </AnimatePresence>
          )}
        </div>
      </div>
    </>
  );
}
