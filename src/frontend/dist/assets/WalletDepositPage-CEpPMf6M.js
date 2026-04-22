import { a as useLanguage, u as useNavigate, r as reactExports, j as jsxRuntimeExports, L as Link, b as cn, f as ue } from "./index-6HgylvRh.js";
import { G as GlowButton } from "./GlowButton-Duv2phZR.js";
import { I as Input } from "./input-8APUtn1S.js";
import { u as useMockData } from "./useMockData-BjtQoZZA.js";
import { A as ArrowLeft } from "./arrow-left-BVM99XS0.js";
import { m as motion } from "./proxy-HmngNdo3.js";
import { S as ShieldCheck } from "./shield-check-mivpJYFB.js";
const PRESETS = [10, 25, 50, 100];
const MIN_USD = 1;
const MAX_USD = 1e5;
function parseCustomUsd(raw) {
  const n = Number.parseFloat(raw.trim().replace(",", "."));
  return Number.isFinite(n) ? n : Number.NaN;
}
function WalletDepositPage() {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const { user } = useMockData();
  const [selection, setSelection] = reactExports.useState(25);
  const [customInput, setCustomInput] = reactExports.useState("");
  const [busy, setBusy] = reactExports.useState(false);
  const amount = reactExports.useMemo(() => {
    if (selection === "custom") {
      const n = parseCustomUsd(customInput);
      return Number.isFinite(n) ? n : 0;
    }
    return selection;
  }, [selection, customInput]);
  const amountError = reactExports.useMemo(() => {
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
  const selectPreset = (n) => {
    setSelection(n);
    setCustomInput("");
  };
  const handleContinue = async () => {
    if (!canContinue) {
      ue.error(amountError ?? t("Revisa el monto", "Check the amount"));
      return;
    }
    setBusy(true);
    await new Promise((r) => setTimeout(r, 600));
    setBusy(false);
    ue.info(
      t(
        "Aquí se abrirá el checkout del proveedor de pagos (p. ej. Stripe). El saldo se actualizará al confirmar el pago en backend.",
        "The payment provider checkout (e.g. Stripe) opens here. Balance updates after the backend confirms payment."
      )
    );
    navigate({ to: "/wallet" });
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-background", "data-ocid": "wallet.deposit.page", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-card border-b border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-2xl mx-auto px-4 py-4 flex items-center gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Link,
        {
          to: "/wallet",
          className: "p-2 rounded-xl border border-border text-muted-foreground hover:text-foreground hover:border-primary/40 transition-smooth",
          "aria-label": t("Volver a la cartera", "Back to wallet"),
          "data-ocid": "wallet.deposit.back_link",
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "w-5 h-5" })
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-xl font-black text-foreground leading-tight", children: t("Recargar saldo", "Add funds") }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-body text-xs text-muted-foreground mt-0.5", children: [
          t("Saldo actual", "Current balance"),
          ":",
          " ",
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-primary font-semibold", children: [
            "$",
            user.balance.toLocaleString(),
            " ",
            user.currency
          ] })
        ] })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-2xl mx-auto px-4 py-6 pb-24 space-y-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { opacity: 0, y: 10 },
          animate: { opacity: 1, y: 0 },
          className: "ticket-card bg-card border border-border p-4 flex gap-3",
          "data-ocid": "wallet.deposit.psp_notice",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldCheck, { className: "w-5 h-5 text-secondary shrink-0 mt-0.5" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-body text-sm text-muted-foreground leading-relaxed", children: t(
              "Los depósitos reales pasan por un proveedor certificado (PCI). Esta pantalla es la base de UX; conecta tu sesión de Stripe u otro PSP en el botón de abajo.",
              "Real deposits use a certified provider (PCI). This screen is the UX shell; wire your Stripe session or other PSP on the button below."
            ) })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-body text-xs font-semibold text-muted-foreground uppercase tracking-wider", children: t("Monto (USD)", "Amount (USD)") }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 sm:grid-cols-4 gap-2", children: PRESETS.map((n, i) => {
          const selected = selection === n;
          return /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              type: "button",
              onClick: () => selectPreset(n),
              "data-ocid": `wallet.deposit.preset.${i + 1}`,
              className: cn(
                "h-12 rounded-2xl font-display font-bold text-sm border transition-smooth",
                selected ? "border-primary bg-primary/15 text-primary shadow-[0_0_16px_oklch(var(--primary)/0.15)]" : "border-border bg-muted/30 text-foreground hover:border-primary/40"
              ),
              children: [
                "$",
                n
              ]
            },
            n
          );
        }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "label",
            {
              className: "font-body text-xs font-semibold text-muted-foreground",
              htmlFor: "wallet-deposit-custom-amount",
              children: t("Otro monto", "Other amount")
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "span",
              {
                className: "font-body text-sm text-muted-foreground shrink-0",
                "aria-hidden": true,
                children: "$"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                id: "wallet-deposit-custom-amount",
                type: "text",
                inputMode: "decimal",
                autoComplete: "off",
                enterKeyHint: "done",
                placeholder: t("Ej. 75 o 12,50", "e.g. 75 or 12.50"),
                value: customInput,
                onChange: (e) => {
                  setSelection("custom");
                  setCustomInput(e.target.value);
                },
                "aria-invalid": selection === "custom" && amountError != null,
                "data-ocid": "wallet.deposit.custom_amount",
                className: "h-12 rounded-2xl font-body text-sm border-border"
              }
            )
          ] }),
          selection === "custom" && amountError && /* @__PURE__ */ jsxRuntimeExports.jsx(
            "p",
            {
              className: "font-body text-xs text-destructive",
              "data-ocid": "wallet.deposit.custom_amount_error",
              children: amountError
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        GlowButton,
        {
          type: "button",
          variant: "gold",
          size: "xl",
          shimmer: true,
          className: "w-full",
          loading: busy,
          disabled: !canContinue,
          onClick: handleContinue,
          "data-ocid": "wallet.deposit.continue_button",
          children: [
            t("Continuar al pago seguro", "Continue to secure checkout"),
            " · $",
            amount > 0 ? amount % 1 === 0 ? amount.toLocaleString() : amount.toLocaleString(void 0, {
              minimumFractionDigits: 0,
              maximumFractionDigits: 2
            }) : "—"
          ]
        }
      )
    ] })
  ] });
}
export {
  WalletDepositPage as default
};
