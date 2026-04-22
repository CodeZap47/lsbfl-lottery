"use client";

import { useTheme } from "@/hooks/useTheme";
import { CheckCircle2 } from "lucide-react";
import { Toaster as Sonner, type ToasterProps } from "sonner";

const Toaster = ({ ...props }: ToasterProps) => {
  const { isDark } = useTheme();

  return (
    <Sonner
      theme={isDark ? "dark" : "light"}
      className="toaster group font-body"
      icons={{
        success: (
          <CheckCircle2
            className="size-[18px] shrink-0 opacity-95"
            aria-hidden
          />
        ),
      }}
      toastOptions={{
        classNames: {
          toast: "rounded-2xl border shadow-lg",
          title: "font-display font-semibold text-base leading-snug",
          description: "text-sm text-muted-foreground leading-snug",
          closeButton:
            "border-border bg-background text-foreground hover:bg-muted",
        },
      }}
      style={
        {
          "--normal-bg": "oklch(var(--popover))",
          "--normal-text": "oklch(var(--popover-foreground))",
          "--normal-border": "oklch(var(--border))",
        } as React.CSSProperties
      }
      {...props}
    />
  );
};

export { Toaster };
