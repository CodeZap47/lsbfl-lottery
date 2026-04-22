import { GlowButton } from "@/components/ui/GlowButton";
import { Input } from "@/components/ui/input";
import { useLanguage } from "@/hooks/useLanguage";
import { useMockData } from "@/hooks/useMockData";
import { cn } from "@/lib/utils";
import { Link, useNavigate } from "@tanstack/react-router";
import { ArrowLeft, ShieldCheck } from "lucide-react";
import { motion } from "motion/react";
import { useMemo, useState } from "react";
import { toast } from "sonner";

const PRESETS = [10, 25, 50, 100] as const;
const MIN_USD = 1;
const MAX_USD = 100_000;

function parseCustomUsd(raw: string): number {
  const n = Number.parseFloat(raw.trim().replace(",", "."));
  return Number.isFinite(n) ? n : Number.NaN;
}

export default function WalletDepositPage() {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const { user } = useMockData();
  const [selection, setSelection] = useState<number | "custom">(25);
  const [customInput, setCustomInput] = useState("");
  const [busy, setBusy] = useState(false);

  const amount = useMemo(() => {
    if (selection === "custom") {
      const n = parseCustomUsd(customInput);
      return Number.isFinite(n) ? n : 0;
    }
    return selection;
  }, [selection, customInput]);

  const amountError = useMemo(() => {
    if (selection !== "custom") return null;
    if (customInput.trim() === "")
      return t("Ingresa un monto", "Enter an amount");
    if (!Number.isFinite(parseCustomUsd(customInput)))
      return t("Monto no válido", "Invalid amount");
    if (amount < MIN_USD) return t("El mínimo es $1", "Minimum is $1");
    if (amount > MAX_USD)
      return t("El monto excede el límite", "Amount exceeds the limit");
    return null;
  }, [selection, customInput, amount, t]);

  const canContinue = amount >= MIN_USD && amount <= MAX_USD;

  const selectPreset = (n: (typeof PRESETS)[number]) => {
    setSelection(n);
    setCustomInput("");
  };

  const handleContinue = async () => {
    if (!canContinue) {
      toast.error(amountError ?? t("Revisa el monto", "Check the amount"));
      return;
    }
    setBusy(true);
    await new Promise((r) => setTimeout(r, 600));
    setBusy(false);
    toast.info(
      t(
        "Aquí se abrirá el checkout del proveedor de pagos (p. ej. Stripe). El saldo se actualizará al confirmar el pago en backend.",
        "The payment provider checkout (e.g. Stripe) opens here. Balance updates after the backend confirms payment.",
      ),
    );
    navigate({ to: "/wallet" });
  };

  return (
    <div className="min-h-screen bg-background" data-ocid="wallet.deposit.page">
      <div className="bg-card border-b border-border">
        <div className="max-w-2xl mx-auto px-4 py-4 flex items-center gap-3">
          <Link
            to="/wallet"
            className="p-2 rounded-xl border border-border text-muted-foreground hover:text-foreground hover:border-primary/40 transition-smooth"
            aria-label={t("Volver a la cartera", "Back to wallet")}
            data-ocid="wallet.deposit.back_link"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <h1 className="font-display text-xl font-black text-foreground leading-tight">
              {t("Recargar saldo", "Add funds")}
            </h1>
            <p className="font-body text-xs text-muted-foreground mt-0.5">
              {t("Saldo actual", "Current balance")}:{" "}
              <span className="text-primary font-semibold">
                ${user.balance.toLocaleString()} {user.currency}
              </span>
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 py-6 pb-24 space-y-6">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="ticket-card bg-card border border-border p-4 flex gap-3"
          data-ocid="wallet.deposit.psp_notice"
        >
          <ShieldCheck className="w-5 h-5 text-secondary shrink-0 mt-0.5" />
          <p className="font-body text-sm text-muted-foreground leading-relaxed">
            {t(
              "Los depósitos reales pasan por un proveedor certificado (PCI). Esta pantalla es la base de UX; conecta tu sesión de Stripe u otro PSP en el botón de abajo.",
              "Real deposits use a certified provider (PCI). This screen is the UX shell; wire your Stripe session or other PSP on the button below.",
            )}
          </p>
        </motion.div>

        <div className="space-y-3">
          <p className="font-body text-xs font-semibold text-muted-foreground uppercase tracking-wider">
            {t("Monto (USD)", "Amount (USD)")}
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {PRESETS.map((n, i) => {
              const selected = selection === n;
              return (
                <button
                  key={n}
                  type="button"
                  onClick={() => selectPreset(n)}
                  data-ocid={`wallet.deposit.preset.${i + 1}`}
                  className={cn(
                    "h-12 rounded-2xl font-display font-bold text-sm border transition-smooth",
                    selected
                      ? "border-primary bg-primary/15 text-primary shadow-[0_0_16px_oklch(var(--primary)/0.15)]"
                      : "border-border bg-muted/30 text-foreground hover:border-primary/40",
                  )}
                >
                  ${n}
                </button>
              );
            })}
          </div>

          <div className="space-y-2">
            <label
              className="font-body text-xs font-semibold text-muted-foreground"
              htmlFor="wallet-deposit-custom-amount"
            >
              {t("Otro monto", "Other amount")}
            </label>
            <div className="flex items-center gap-2">
              <span
                className="font-body text-sm text-muted-foreground shrink-0"
                aria-hidden
              >
                $
              </span>
              <Input
                id="wallet-deposit-custom-amount"
                type="text"
                inputMode="decimal"
                autoComplete="off"
                enterKeyHint="done"
                placeholder={t("Ej. 75 o 12,50", "e.g. 75 or 12.50")}
                value={customInput}
                onChange={(e) => {
                  setSelection("custom");
                  setCustomInput(e.target.value);
                }}
                aria-invalid={selection === "custom" && amountError != null}
                data-ocid="wallet.deposit.custom_amount"
                className="h-12 rounded-2xl font-body text-sm border-border"
              />
            </div>
            {selection === "custom" && amountError && (
              <p
                className="font-body text-xs text-destructive"
                data-ocid="wallet.deposit.custom_amount_error"
              >
                {amountError}
              </p>
            )}
          </div>
        </div>

        <GlowButton
          type="button"
          variant="gold"
          size="xl"
          shimmer
          className="w-full"
          loading={busy}
          disabled={!canContinue}
          onClick={handleContinue}
          data-ocid="wallet.deposit.continue_button"
        >
          {t("Continuar al pago seguro", "Continue to secure checkout")} · $
          {amount > 0
            ? amount % 1 === 0
              ? amount.toLocaleString()
              : amount.toLocaleString(undefined, {
                  minimumFractionDigits: 0,
                  maximumFractionDigits: 2,
                })
            : "—"}
        </GlowButton>
      </div>
    </div>
  );
}
