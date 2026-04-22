import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useLanguage } from "@/hooks/useLanguage";
import { useMockData } from "@/hooks/useMockData";
import { Link } from "@tanstack/react-router";
import {
  ArrowLeft,
  CalendarClock,
  LayoutDashboard,
  Plus,
  Sparkles,
} from "lucide-react";

export default function AdminPage() {
  const { t, lang } = useLanguage();
  const { lotteries } = useMockData();

  return (
    <div
      className="min-h-screen bg-background pb-24 lg:pb-10"
      data-ocid="admin.page"
    >
      <div className="border-b border-border bg-card/80 backdrop-blur-sm sticky top-0 z-20 lg:static">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center gap-4">
          <Link
            to="/home"
            className="shrink-0 w-10 h-10 rounded-xl border border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-primary/40 transition-smooth"
            aria-label={t("Volver al inicio", "Back to home")}
            data-ocid="admin.back_home"
          >
            <ArrowLeft size={18} />
          </Link>
          <div className="flex-1 min-w-0 flex items-center gap-3">
            <span className="shrink-0 w-10 h-10 rounded-xl bg-primary/15 border border-primary/25 flex items-center justify-center text-primary">
              <LayoutDashboard size={20} aria-hidden />
            </span>
            <div className="min-w-0">
              <h1 className="font-display text-xl font-black text-foreground truncate">
                {t("Panel de administración", "Administration panel")}
              </h1>
              <p className="font-body text-xs text-muted-foreground truncate">
                {t(
                  "Sorteos y vista operativa (datos demo hasta API en canister)",
                  "Draws and ops view (demo data until canister admin API)",
                )}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-6 space-y-6">
        <Card className="p-4 border-primary/20 bg-primary/5">
          <div className="flex gap-3">
            <Sparkles
              className="shrink-0 text-primary mt-0.5"
              size={18}
              aria-hidden
            />
            <p className="font-body text-sm text-muted-foreground leading-relaxed">
              {t(
                "Las acciones de escritura (crear sorteo, cerrar venta, ejecutar draw) se conectarán al canister Motoko cuando existan métodos admin autorizados por principal.",
                "Write actions (create draw, close sales, run draw) will call the Motoko canister once admin methods authorized by principal exist.",
              )}
            </p>
          </div>
        </Card>

        <div className="flex flex-wrap gap-3">
          <Button type="button" variant="outline" className="gap-2" asChild>
            <Link
              to="/admin/lotteries/new"
              data-ocid="admin.new_lottery_wizard"
            >
              <Plus size={16} aria-hidden />
              {t("Nuevo sorteo", "New lottery")}
            </Link>
          </Button>
          <Button type="button" disabled variant="outline" className="gap-2">
            <CalendarClock size={16} aria-hidden />
            {t("Programar draw", "Schedule draw")}
          </Button>
        </div>

        <Card className="overflow-hidden border-border">
          <div className="px-4 py-3 border-b border-border bg-muted/30 flex items-center justify-between gap-2">
            <h2 className="font-display text-sm font-bold uppercase tracking-wide text-foreground">
              {t("Sorteos configurados", "Configured lotteries")}
            </h2>
            <Badge variant="secondary" className="font-body text-[10px]">
              {lotteries.length} {t("activos (demo)", "active (demo)")}
            </Badge>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left font-body text-sm">
              <thead>
                <tr className="border-b border-border text-muted-foreground text-xs uppercase tracking-wide">
                  <th className="px-4 py-3 font-medium">ID</th>
                  <th className="px-4 py-3 font-medium">
                    {t("Nombre", "Name")}
                  </th>
                  <th className="px-4 py-3 font-medium">{t("Tipo", "Type")}</th>
                  <th className="px-4 py-3 font-medium text-right">
                    {t("Precio", "Price")}
                  </th>
                  <th className="px-4 py-3 font-medium text-right">
                    {t("Pozo", "Pool")}
                  </th>
                  <th className="px-4 py-3 font-medium">
                    {t("Próximo draw", "Next draw")}
                  </th>
                </tr>
              </thead>
              <tbody>
                {lotteries.map((lot) => (
                  <tr
                    key={lot.id}
                    className="border-b border-border/80 hover:bg-muted/20 transition-colors"
                  >
                    <td className="px-4 py-3 font-mono text-xs text-muted-foreground">
                      {lot.id}
                    </td>
                    <td className="px-4 py-3 font-medium text-foreground">
                      {lang === "es" ? lot.nameEs : lot.name}
                    </td>
                    <td className="px-4 py-3">
                      <Badge
                        variant="outline"
                        className="font-mono text-[10px]"
                      >
                        {lot.type}
                      </Badge>
                    </td>
                    <td className="px-4 py-3 text-right tabular-nums">
                      {lot.currency} {lot.price.toFixed(2)}
                    </td>
                    <td className="px-4 py-3 text-right tabular-nums text-primary font-semibold">
                      {lot.jackpotFormatted}
                    </td>
                    <td className="px-4 py-3 text-muted-foreground text-xs">
                      {lot.drawDateFormatted}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </div>
  );
}
