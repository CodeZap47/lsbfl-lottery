import { c as createLucideIcon, a as useLanguage, j as jsxRuntimeExports, L as Link, n as LayoutDashboard } from "./index-6HgylvRh.js";
import { B as Badge } from "./badge-D5-aCfvX.js";
import { C as Card, B as Button } from "./card-BBUTJoby.js";
import { u as useMockData } from "./useMockData-BjtQoZZA.js";
import { A as ArrowLeft } from "./arrow-left-BVM99XS0.js";
import { S as Sparkles } from "./sparkles-B2suCNYQ.js";
import "./index-DVd-QpaJ.js";
import "./index-NwINJ8tx.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["path", { d: "M21 7.5V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h3.5", key: "1osxxc" }],
  ["path", { d: "M16 2v4", key: "4m81vk" }],
  ["path", { d: "M8 2v4", key: "1cmpym" }],
  ["path", { d: "M3 10h5", key: "r794hk" }],
  ["path", { d: "M17.5 17.5 16 16.3V14", key: "akvzfd" }],
  ["circle", { cx: "16", cy: "16", r: "6", key: "qoo3c4" }]
];
const CalendarClock = createLucideIcon("calendar-clock", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M5 12h14", key: "1ays0h" }],
  ["path", { d: "M12 5v14", key: "s699le" }]
];
const Plus = createLucideIcon("plus", __iconNode);
function AdminPage() {
  const { t, lang } = useLanguage();
  const { lotteries } = useMockData();
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "min-h-screen bg-background pb-24 lg:pb-10",
      "data-ocid": "admin.page",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "border-b border-border bg-card/80 backdrop-blur-sm sticky top-0 z-20 lg:static", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-4xl mx-auto px-4 py-4 flex items-center gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Link,
            {
              to: "/home",
              className: "shrink-0 w-10 h-10 rounded-xl border border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-primary/40 transition-smooth",
              "aria-label": t("Volver al inicio", "Back to home"),
              "data-ocid": "admin.back_home",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { size: 18 })
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0 flex items-center gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "shrink-0 w-10 h-10 rounded-xl bg-primary/15 border border-primary/25 flex items-center justify-center text-primary", children: /* @__PURE__ */ jsxRuntimeExports.jsx(LayoutDashboard, { size: 20, "aria-hidden": true }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-xl font-black text-foreground truncate", children: t("Panel de administración", "Administration panel") }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-body text-xs text-muted-foreground truncate", children: t(
                "Sorteos y vista operativa (datos demo hasta API en canister)",
                "Draws and ops view (demo data until canister admin API)"
              ) })
            ] })
          ] })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-4xl mx-auto px-4 py-6 space-y-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "p-4 border-primary/20 bg-primary/5", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Sparkles,
              {
                className: "shrink-0 text-primary mt-0.5",
                size: 18,
                "aria-hidden": true
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-body text-sm text-muted-foreground leading-relaxed", children: t(
              "Las acciones de escritura (crear sorteo, cerrar venta, ejecutar draw) se conectarán al canister Motoko cuando existan métodos admin autorizados por principal.",
              "Write actions (create draw, close sales, run draw) will call the Motoko canister once admin methods authorized by principal exist."
            ) })
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { type: "button", variant: "outline", className: "gap-2", asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Link,
              {
                to: "/admin/lotteries/new",
                "data-ocid": "admin.new_lottery_wizard",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { size: 16, "aria-hidden": true }),
                  t("Nuevo sorteo", "New lottery")
                ]
              }
            ) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { type: "button", disabled: true, variant: "outline", className: "gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(CalendarClock, { size: 16, "aria-hidden": true }),
              t("Programar draw", "Schedule draw")
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "overflow-hidden border-border", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-4 py-3 border-b border-border bg-muted/30 flex items-center justify-between gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-sm font-bold uppercase tracking-wide text-foreground", children: t("Sorteos configurados", "Configured lotteries") }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { variant: "secondary", className: "font-body text-[10px]", children: [
                lotteries.length,
                " ",
                t("activos (demo)", "active (demo)")
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-left font-body text-sm", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "border-b border-border text-muted-foreground text-xs uppercase tracking-wide", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3 font-medium", children: "ID" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3 font-medium", children: t("Nombre", "Name") }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3 font-medium", children: t("Tipo", "Type") }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3 font-medium text-right", children: t("Precio", "Price") }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3 font-medium text-right", children: t("Pozo", "Pool") }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3 font-medium", children: t("Próximo draw", "Next draw") })
              ] }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: lotteries.map((lot) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "tr",
                {
                  className: "border-b border-border/80 hover:bg-muted/20 transition-colors",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 font-mono text-xs text-muted-foreground", children: lot.id }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 font-medium text-foreground", children: lang === "es" ? lot.nameEs : lot.name }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Badge,
                      {
                        variant: "outline",
                        className: "font-mono text-[10px]",
                        children: lot.type
                      }
                    ) }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "px-4 py-3 text-right tabular-nums", children: [
                      lot.currency,
                      " ",
                      lot.price.toFixed(2)
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-right tabular-nums text-primary font-semibold", children: lot.jackpotFormatted }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-muted-foreground text-xs", children: lot.drawDateFormatted })
                  ]
                },
                lot.id
              )) })
            ] }) })
          ] })
        ] })
      ]
    }
  );
}
export {
  AdminPage as default
};
