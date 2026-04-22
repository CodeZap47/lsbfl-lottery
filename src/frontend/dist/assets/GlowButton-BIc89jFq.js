import { r as reactExports, j as jsxRuntimeExports, c as cn } from "./index-Cr1cOiS1.js";
const variantClasses = {
  gold: [
    "bg-primary text-primary-foreground",
    "shadow-glow-gold hover:shadow-glow-gold-active",
    "hover:brightness-110 active:scale-[0.98]",
    "border border-primary/30"
  ].join(" "),
  green: [
    "bg-secondary text-secondary-foreground",
    "shadow-glow-green hover:shadow-[0_0_24px_oklch(var(--secondary)/0.5)]",
    "hover:brightness-110 active:scale-[0.98]",
    "border border-secondary/30"
  ].join(" "),
  ghost: [
    "bg-transparent text-foreground",
    "hover:bg-muted/40 active:scale-[0.98]",
    "border border-border"
  ].join(" "),
  outline: [
    "bg-transparent text-primary",
    "border border-primary/50 hover:border-primary hover:bg-primary/10",
    "hover:shadow-glow-gold active:scale-[0.98]"
  ].join(" ")
};
const sizeClasses = {
  sm: "h-9  px-4  text-sm  rounded-xl  font-body font-medium",
  md: "h-11 px-6  text-base rounded-2xl font-body font-medium",
  lg: "h-14 px-8  text-lg  rounded-2xl font-body font-semibold",
  xl: "h-16 px-10 text-xl  rounded-3xl font-body font-bold"
};
const GlowButton = reactExports.forwardRef(
  ({
    variant = "gold",
    size = "lg",
    loading = false,
    shimmer = false,
    className,
    children,
    disabled,
    ...props
  }, ref) => {
    const isDisabled = disabled || loading;
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "button",
      {
        ref,
        disabled: isDisabled,
        className: cn(
          "relative inline-flex items-center justify-center gap-2",
          "transition-smooth cursor-pointer select-none",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
          "disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none",
          variantClasses[variant],
          sizeClasses[size],
          shimmer && !isDisabled && "overflow-hidden",
          className
        ),
        ...props,
        children: [
          shimmer && !isDisabled && /* @__PURE__ */ jsxRuntimeExports.jsx(
            "span",
            {
              className: "absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none",
              "aria-hidden": "true"
            }
          ),
          loading ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "span",
              {
                className: "w-4 h-4 rounded-full border-2 border-current border-t-transparent animate-spin",
                "aria-hidden": "true"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "sr-only", children: "Cargando..." })
          ] }) : children
        ]
      }
    );
  }
);
GlowButton.displayName = "GlowButton";
export {
  GlowButton as G
};
