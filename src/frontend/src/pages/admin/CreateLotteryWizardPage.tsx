import { diffLotteryConfigs } from "@/admin/lotteryDraftDiff";
import {
  type LotteryProductConfig,
  lotteryProductConfigSchema,
  productCategorySchema,
  rngStrategySchema,
  validateLotteryProductConfig,
  winnerAlgorithmSchema,
} from "@/admin/lotteryDraftSchema";
import {
  clearDraftStorage,
  exportDraftJson,
  loadOrCreateDraft,
  loadSnapshotFromStorage,
  saveDraftToStorage,
  saveSnapshotToStorage,
} from "@/admin/lotteryDraftStorage";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useLanguage } from "@/hooks/useLanguage";
import { cn } from "@/lib/utils";
import { Link } from "@tanstack/react-router";
import {
  ArrowLeft,
  Check,
  ChevronRight,
  Download,
  GitCompare,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";

const STEPS = [
  { id: 0, es: "Básico", en: "Basics" },
  { id: 1, es: "Calendario", en: "Schedule" },
  { id: 2, es: "Mecánica", en: "Mechanics" },
  { id: 3, es: "Premios y RNG", en: "Prizes & RNG" },
  { id: 4, es: "Compliance y revisión", en: "Compliance & review" },
] as const;

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-1.5">
      <Label className="text-xs font-body text-muted-foreground uppercase tracking-wide">
        {label}
      </Label>
      {children}
    </div>
  );
}

export default function CreateLotteryWizardPage() {
  const { t, lang } = useLanguage();
  const [step, setStep] = useState(0);
  const [config, setConfig] = useState<LotteryProductConfig>(() =>
    loadOrCreateDraft(),
  );
  const [diffLines, setDiffLines] = useState<
    { path: string; before: string; after: string }[] | null
  >(null);

  useEffect(() => {
    const tmr = window.setTimeout(() => saveDraftToStorage(config), 400);
    return () => window.clearTimeout(tmr);
  }, [config]);

  const validation = useMemo(
    () => lotteryProductConfigSchema.safeParse(config),
    [config],
  );

  const goNext = () => {
    const r = validateLotteryProductConfig(config);
    if (!r.success) {
      toast.error(
        t("Revisa los campos obligatorios", "Check required fields"),
        { description: r.error.issues[0]?.message },
      );
      return;
    }
    setStep((s) => Math.min(s + 1, STEPS.length - 1));
  };

  const exportJson = () => {
    const blob = new Blob([exportDraftJson(config)], {
      type: "application/json",
    });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = `${config.identity.slug || "lottery-draft"}.json`;
    a.click();
    URL.revokeObjectURL(a.href);
    toast.success(t("JSON exportado", "JSON exported"));
  };

  const runDiff = () => {
    const snap = loadSnapshotFromStorage();
    if (!snap) {
      toast.message(t("Sin snapshot", "No snapshot"), {
        description: t(
          'Pulsa "Guardar snapshot" antes.',
          'Use "Save snapshot" first.',
        ),
      });
      return;
    }
    setDiffLines(diffLotteryConfigs(snap, config));
  };

  const stepLabel = (s: (typeof STEPS)[number]) =>
    lang === "es" ? s.es : s.en;

  return (
    <div
      className="min-h-screen bg-background pb-24 lg:pb-10"
      data-ocid="admin.wizard.page"
    >
      <div className="border-b border-border bg-card/80 sticky top-0 z-20 lg:static">
        <div className="max-w-3xl mx-auto px-4 py-4 flex items-center gap-3">
          <Link
            to="/admin"
            className="shrink-0 w-10 h-10 rounded-xl border border-border flex items-center justify-center text-muted-foreground hover:text-foreground transition-smooth"
            aria-label={t("Volver al panel", "Back to admin")}
          >
            <ArrowLeft size={18} />
          </Link>
          <div className="min-w-0 flex-1">
            <h1 className="font-display text-lg font-black text-foreground truncate">
              {t("Nuevo sorteo", "New lottery")}
            </h1>
            <p className="text-xs text-muted-foreground font-body">
              {t(
                "Asistente en 5 pasos · borrador en localStorage",
                "5-step assistant · draft in localStorage",
              )}
            </p>
          </div>
        </div>

        <div className="max-w-3xl mx-auto px-4 pb-3 flex gap-1 overflow-x-auto">
          {STEPS.map((s, i) => (
            <button
              key={s.id}
              type="button"
              onClick={() => setStep(i)}
              className={cn(
                "shrink-0 px-3 py-1.5 rounded-lg text-xs font-body font-medium transition-smooth border",
                step === i
                  ? "bg-primary/15 border-primary text-primary"
                  : "border-transparent text-muted-foreground hover:bg-muted/50",
              )}
            >
              {i + 1}. {stepLabel(s)}
            </button>
          ))}
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-6 space-y-6">
        {!validation.success && (
          <Card className="p-3 border-destructive/40 bg-destructive/5 text-destructive text-sm font-body">
            {validation.error.issues[0]?.path.join(".")}:{" "}
            {validation.error.issues[0]?.message}
          </Card>
        )}

        {step === 0 && (
          <Card className="p-5 space-y-4 border-border">
            <h2 className="font-display text-sm font-bold text-primary uppercase tracking-wide">
              {stepLabel(STEPS[0])}
            </h2>
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label={t("Nombre", "Name")}>
                <Input
                  value={config.identity.name}
                  onChange={(e) =>
                    setConfig((c) => ({
                      ...c,
                      identity: { ...c.identity, name: e.target.value },
                    }))
                  }
                />
              </Field>
              <Field label={t("Slug (ID interno)", "Slug (internal ID)")}>
                <Input
                  value={config.identity.slug}
                  onChange={(e) =>
                    setConfig((c) => ({
                      ...c,
                      identity: { ...c.identity, slug: e.target.value },
                    }))
                  }
                />
              </Field>
              <Field label={t("Descripción corta", "Short description")}>
                <Input
                  value={config.identity.shortDescription}
                  onChange={(e) =>
                    setConfig((c) => ({
                      ...c,
                      identity: {
                        ...c.identity,
                        shortDescription: e.target.value,
                      },
                    }))
                  }
                  className="sm:col-span-2"
                />
              </Field>
              <Field label={t("Ícono (emoji)", "Icon (emoji)")}>
                <Input
                  value={config.identity.iconEmoji}
                  onChange={(e) =>
                    setConfig((c) => ({
                      ...c,
                      identity: { ...c.identity, iconEmoji: e.target.value },
                    }))
                  }
                />
              </Field>
              <Field label={t("Color tema (#RRGGBB)", "Theme color (#RRGGBB)")}>
                <Input
                  value={config.identity.themeColorHex}
                  onChange={(e) =>
                    setConfig((c) => ({
                      ...c,
                      identity: {
                        ...c.identity,
                        themeColorHex: e.target.value,
                      },
                    }))
                  }
                />
              </Field>
              <Field label={t("Categoría", "Category")}>
                <select
                  className="w-full h-9 rounded-md border border-input bg-transparent px-3 text-sm"
                  value={config.identity.productCategory}
                  onChange={(e) => {
                    const p = productCategorySchema.safeParse(e.target.value);
                    if (!p.success) return;
                    setConfig((c) => ({
                      ...c,
                      identity: { ...c.identity, productCategory: p.data },
                    }));
                  }}
                >
                  {productCategorySchema.options.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
              </Field>
              <Field
                label={t("Versión esquema contrato", "Contract schema semver")}
              >
                <Input
                  value={config.identity.contractSchemaSemantic}
                  onChange={(e) =>
                    setConfig((c) => ({
                      ...c,
                      identity: {
                        ...c.identity,
                        contractSchemaSemantic: e.target.value,
                      },
                    }))
                  }
                />
              </Field>
            </div>
          </Card>
        )}

        {step === 1 && (
          <Card className="p-5 space-y-4 border-border">
            <h2 className="font-display text-sm font-bold text-primary uppercase tracking-wide">
              {stepLabel(STEPS[1])}
            </h2>
            <div className="grid gap-4">
              <Field label={t("Expresión cron", "Cron expression")}>
                <Input
                  value={config.schedule.cronExpression}
                  onChange={(e) =>
                    setConfig((c) => ({
                      ...c,
                      schedule: {
                        ...c.schedule,
                        cronExpression: e.target.value,
                      },
                    }))
                  }
                />
              </Field>
              <Field label={t("Zona horaria IANA", "IANA timezone")}>
                <Input
                  value={config.schedule.timezoneIana}
                  onChange={(e) =>
                    setConfig((c) => ({
                      ...c,
                      schedule: {
                        ...c.schedule,
                        timezoneIana: e.target.value,
                      },
                    }))
                  }
                />
              </Field>
              <Field label={t("Inicio ventas (ISO)", "Sales start (ISO)")}>
                <Input
                  value={config.schedule.salesStartAt}
                  onChange={(e) =>
                    setConfig((c) => ({
                      ...c,
                      schedule: {
                        ...c.schedule,
                        salesStartAt: e.target.value,
                      },
                    }))
                  }
                />
              </Field>
              <Field label={t("Sorteo (ISO)", "Draw at (ISO)")}>
                <Input
                  value={config.schedule.drawAt}
                  onChange={(e) =>
                    setConfig((c) => ({
                      ...c,
                      schedule: { ...c.schedule, drawAt: e.target.value },
                    }))
                  }
                />
              </Field>
              <Field
                label={t(
                  "Cierre ventas (min antes del draw)",
                  "Sales close (min before draw)",
                )}
              >
                <Input
                  type="number"
                  min={0}
                  value={config.schedule.salesCloseMinutesBeforeDraw}
                  onChange={(e) =>
                    setConfig((c) => ({
                      ...c,
                      schedule: {
                        ...c.schedule,
                        salesCloseMinutesBeforeDraw: Number(e.target.value),
                      },
                    }))
                  }
                />
              </Field>
            </div>
          </Card>
        )}

        {step === 2 && (
          <div className="space-y-4">
            <Card className="p-5 space-y-4 border-border">
              <h2 className="font-display text-sm font-bold text-primary uppercase tracking-wide">
                {t("Boleto", "Ticket")}
              </h2>
              <div className="grid gap-4 sm:grid-cols-2">
                <Field label={t("Precio base", "Base price")}>
                  <Input
                    type="number"
                    step="0.01"
                    value={config.ticket.basePriceAmount}
                    onChange={(e) =>
                      setConfig((c) => ({
                        ...c,
                        ticket: {
                          ...c.ticket,
                          basePriceAmount: Number(e.target.value),
                        },
                      }))
                    }
                  />
                </Field>
                <Field label={t("Moneda", "Currency")}>
                  <Input
                    value={config.ticket.basePriceCurrency}
                    onChange={(e) =>
                      setConfig((c) => ({
                        ...c,
                        ticket: {
                          ...c.ticket,
                          basePriceCurrency: e.target.value,
                        },
                      }))
                    }
                  />
                </Field>
                <Field
                  label={t("Regla (ej. 6-de-49)", "Pick rule (e.g. 6-de-49)")}
                >
                  <Input
                    value={config.ticket.pickRule}
                    onChange={(e) =>
                      setConfig((c) => ({
                        ...c,
                        ticket: { ...c.ticket, pickRule: e.target.value },
                      }))
                    }
                  />
                </Field>
                <Field
                  label={t(
                    "Máx. boletos / usuario (0=sin límite)",
                    "Max tickets / user (0=unlimited)",
                  )}
                >
                  <Input
                    type="number"
                    value={config.ticket.maxTicketsPerUser}
                    onChange={(e) =>
                      setConfig((c) => ({
                        ...c,
                        ticket: {
                          ...c.ticket,
                          maxTicketsPerUser: Number(e.target.value),
                        },
                      }))
                    }
                  />
                </Field>
              </div>
            </Card>
            <Card className="p-5 space-y-4 border-border">
              <h2 className="font-display text-sm font-bold text-primary uppercase tracking-wide">
                {t("Selección ganadores", "Winner selection")}
              </h2>
              <Field label={t("Algoritmo", "Algorithm")}>
                <select
                  className="w-full h-9 rounded-md border border-input bg-transparent px-3 text-sm"
                  value={config.winnerSelection.algorithm}
                  onChange={(e) => {
                    const p = winnerAlgorithmSchema.safeParse(e.target.value);
                    if (!p.success) return;
                    setConfig((c) => ({
                      ...c,
                      winnerSelection: {
                        ...c.winnerSelection,
                        algorithm: p.data,
                      },
                    }));
                  }}
                >
                  {winnerAlgorithmSchema.options.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
              </Field>
            </Card>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-4">
            <Card className="p-5 space-y-4 border-border">
              <h2 className="font-display text-sm font-bold text-primary uppercase tracking-wide">
                {t("Tesorería (%)", "Treasury (%)")}
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                {(
                  [
                    ["prizes", t("Premios", "Prizes")],
                    ["protocol", t("Protocolo", "Protocol")],
                    ["stores", t("Tiendas", "Stores")],
                    ["contingency", t("Contingencia", "Contingency")],
                    ["gasOrOps", t("Ops/Gas ICP", "Ops/ICP")],
                  ] as const
                ).map(([key, label]) => (
                  <Field key={key} label={label}>
                    <Input
                      type="number"
                      min={0}
                      max={100}
                      value={config.treasury.percents[key]}
                      onChange={(e) =>
                        setConfig((c) => ({
                          ...c,
                          treasury: {
                            ...c.treasury,
                            percents: {
                              ...c.treasury.percents,
                              [key]: Number(e.target.value),
                            },
                          },
                        }))
                      }
                    />
                  </Field>
                ))}
              </div>
              <p className="text-xs text-muted-foreground font-body">
                {t(
                  "La suma debe ser 100 para publicar en canister.",
                  "Sum must be 100 to publish to canister.",
                )}
              </p>
            </Card>
            <Card className="p-5 space-y-4 border-border">
              <h2 className="font-display text-sm font-bold text-primary uppercase tracking-wide">
                RNG (ICP)
              </h2>
              <div className="grid gap-4 sm:grid-cols-2">
                <Field label={t("Fuente primaria", "Primary source")}>
                  <select
                    className="w-full h-9 rounded-md border border-input bg-transparent px-3 text-sm"
                    value={config.rng.primary}
                    onChange={(e) => {
                      const p = rngStrategySchema.safeParse(e.target.value);
                      if (!p.success) return;
                      setConfig((c) => ({
                        ...c,
                        rng: { ...c.rng, primary: p.data },
                      }));
                    }}
                  >
                    {rngStrategySchema.options.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                </Field>
                <Field label={t("Palabras aleatorias", "Random words")}>
                  <Input
                    type="number"
                    min={1}
                    value={config.rng.randomWords}
                    onChange={(e) =>
                      setConfig((c) => ({
                        ...c,
                        rng: {
                          ...c.rng,
                          randomWords: Number(e.target.value),
                        },
                      }))
                    }
                  />
                </Field>
              </div>
            </Card>
          </div>
        )}

        {step === 4 && (
          <div className="space-y-4">
            <Card className="p-5 space-y-4 border-border">
              <h2 className="font-display text-sm font-bold text-primary uppercase tracking-wide">
                {t("Compliance", "Compliance")}
              </h2>
              <Field
                label={t(
                  "Países permitidos (códigos ISO2 separados por coma)",
                  "Allowed countries (comma ISO2)",
                )}
              >
                <Input
                  value={config.compliance.allowedCountryCodes.join(",")}
                  onChange={(e) =>
                    setConfig((c) => ({
                      ...c,
                      compliance: {
                        ...c.compliance,
                        allowedCountryCodes: e.target.value
                          .split(",")
                          .map((x) => x.trim().toUpperCase())
                          .filter((x) => x.length === 2),
                      },
                    }))
                  }
                />
              </Field>
              <Field label={t("URL términos", "Terms URL")}>
                <Input
                  value={config.compliance.termsUrl}
                  onChange={(e) =>
                    setConfig((c) => ({
                      ...c,
                      compliance: {
                        ...c.compliance,
                        termsUrl: e.target.value,
                      },
                    }))
                  }
                />
              </Field>
            </Card>

            <Card className="p-5 space-y-3 border-border">
              <h2 className="font-display text-sm font-bold text-primary uppercase tracking-wide">
                {t("Revisión y testnet", "Review & testnet")}
              </h2>
              <p className="text-sm text-muted-foreground font-body">
                {t(
                  "Usa snapshot + diff antes de publicar. En testnet, despliega el canister y usa el mismo JSON con `adminPublishLottery` vía consola o app conectada.",
                  "Use snapshot + diff before publishing. On testnet, deploy the canister and pass the same JSON via `adminPublishLottery` from console or connected app.",
                )}
              </p>
              <div className="flex flex-wrap gap-2">
                <Button
                  type="button"
                  variant="secondary"
                  onClick={() => {
                    saveSnapshotToStorage(config);
                    toast.success(t("Snapshot guardado", "Snapshot saved"));
                  }}
                >
                  <Check size={16} className="mr-1" />
                  {t("Guardar snapshot", "Save snapshot")}
                </Button>
                <Button type="button" variant="outline" onClick={runDiff}>
                  <GitCompare size={16} className="mr-1" />
                  {t("Comparar con snapshot", "Compare to snapshot")}
                </Button>
                <Button type="button" variant="outline" onClick={exportJson}>
                  <Download size={16} className="mr-1" />
                  {t("Exportar JSON", "Export JSON")}
                </Button>
                <Button
                  type="button"
                  variant="ghost"
                  onClick={() => {
                    clearDraftStorage();
                    setDiffLines(null);
                    toast.message(t("Borrador borrado", "Draft cleared"));
                  }}
                >
                  {t("Limpiar borrador local", "Clear local draft")}
                </Button>
              </div>
              {diffLines && diffLines.length > 0 && (
                <div className="mt-3 max-h-48 overflow-auto rounded-md border border-border bg-muted/20 p-2 font-mono text-[11px]">
                  {diffLines.slice(0, 80).map((row) => (
                    <div
                      key={row.path}
                      className="py-0.5 border-b border-border/40"
                    >
                      <span className="text-primary">{row.path}</span>
                      <div className="text-destructive truncate">
                        - {row.before}
                      </div>
                      <div className="text-secondary truncate">
                        + {row.after}
                      </div>
                    </div>
                  ))}
                  {diffLines.length > 80 && (
                    <p className="text-muted-foreground pt-1">
                      +{diffLines.length - 80} {t("más", "more")}
                    </p>
                  )}
                </div>
              )}
              {diffLines && diffLines.length === 0 && (
                <p className="text-sm text-muted-foreground">
                  {t("Sin diferencias.", "No differences.")}
                </p>
              )}
            </Card>
          </div>
        )}

        <div className="flex justify-between gap-3 pt-2">
          <Button
            type="button"
            variant="outline"
            disabled={step === 0}
            onClick={() => setStep((s) => Math.max(0, s - 1))}
          >
            {t("Anterior", "Back")}
          </Button>
          {step < STEPS.length - 1 ? (
            <Button type="button" onClick={goNext} className="gap-1">
              {t("Siguiente", "Next")}
              <ChevronRight size={16} />
            </Button>
          ) : (
            <Button type="button" onClick={exportJson} className="gap-1">
              <Download size={16} />
              {t("Finalizar y exportar", "Finish & export")}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
