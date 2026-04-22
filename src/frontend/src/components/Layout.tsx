import { useLanguage } from "@/hooks/useLanguage";
import { useTheme } from "@/hooks/useTheme";
import { cn } from "@/lib/utils";
import { Link, useNavigate, useRouterState } from "@tanstack/react-router";
import {
  Globe,
  HelpCircle,
  Home,
  LayoutDashboard,
  MapPin,
  Moon,
  Settings,
  Star,
  Store,
  Sun,
  Ticket,
  Trophy,
  User,
  Users,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

interface LayoutProps {
  children: React.ReactNode;
}

type StaticPath =
  | "/home"
  | "/wallet"
  | "/map"
  | "/profile"
  | "/community"
  | "/pos"
  | "/help"
  | "/admin";

interface NavItem {
  staticPath: StaticPath | null;
  navigateTo: string;
  activePrefix: string;
  labelEs: string;
  labelEn: string;
  Icon: LucideIcon;
  showInBottom: boolean;
}

const NAV_ITEMS: NavItem[] = [
  {
    staticPath: "/home",
    navigateTo: "/home",
    activePrefix: "/home",
    labelEs: "Inicio",
    labelEn: "Home",
    Icon: Home,
    showInBottom: true,
  },
  {
    staticPath: "/wallet",
    navigateTo: "/wallet",
    activePrefix: "/wallet",
    labelEs: "Boletos",
    labelEn: "Tickets",
    Icon: Ticket,
    showInBottom: true,
  },
  {
    staticPath: null,
    navigateTo: "/draw/draw-001",
    activePrefix: "/draw",
    labelEs: "Sorteo",
    labelEn: "Draw",
    Icon: Star,
    showInBottom: true,
  },
  {
    staticPath: "/map",
    navigateTo: "/map",
    activePrefix: "/map",
    labelEs: "Mapa",
    labelEn: "Map",
    Icon: MapPin,
    showInBottom: true,
  },
  {
    staticPath: "/profile",
    navigateTo: "/profile",
    activePrefix: "/profile",
    labelEs: "Perfil",
    labelEn: "Profile",
    Icon: User,
    showInBottom: true,
  },
  {
    staticPath: "/community",
    navigateTo: "/community",
    activePrefix: "/community",
    labelEs: "Comunidad",
    labelEn: "Community",
    Icon: Users,
    showInBottom: false,
  },
  {
    staticPath: null,
    navigateTo: "/prize/ticket-001",
    activePrefix: "/prize",
    labelEs: "Premios",
    labelEn: "Prizes",
    Icon: Trophy,
    showInBottom: false,
  },
  {
    staticPath: "/pos",
    navigateTo: "/pos",
    activePrefix: "/pos",
    labelEs: "POS",
    labelEn: "POS",
    Icon: Store,
    showInBottom: false,
  },
  {
    staticPath: "/help",
    navigateTo: "/help",
    activePrefix: "/help",
    labelEs: "Ayuda",
    labelEn: "Help",
    Icon: HelpCircle,
    showInBottom: false,
  },
  {
    staticPath: "/admin",
    navigateTo: "/admin",
    activePrefix: "/admin",
    labelEs: "Admin",
    labelEn: "Admin",
    Icon: LayoutDashboard,
    showInBottom: false,
  },
];

function isActive(pathname: string, prefix: string) {
  if (prefix === "/home") return pathname === "/home";
  return pathname.startsWith(prefix);
}

function NavLink({ item, className }: { item: NavItem; className: string }) {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const { pathname } = useRouterState({ select: (s) => s.location });
  const active = isActive(pathname, item.activePrefix);
  const cls = cn(
    className,
    active ? "text-primary" : "text-muted-foreground hover:text-foreground",
  );

  if (item.staticPath) {
    return (
      <Link
        to={item.staticPath}
        data-ocid={`nav.${item.labelEn.toLowerCase()}_link`}
        className={cls}
      >
        <item.Icon size={18} aria-hidden="true" />
        {t(item.labelEs, item.labelEn)}
      </Link>
    );
  }

  return (
    <button
      type="button"
      onClick={() =>
        navigate({
          to: item.navigateTo as Parameters<typeof navigate>[0]["to"],
        })
      }
      data-ocid={`nav.${item.labelEn.toLowerCase()}_link`}
      className={cn(cls, "w-full")}
    >
      <item.Icon size={18} aria-hidden="true" />
      {t(item.labelEs, item.labelEn)}
    </button>
  );
}

function BottomNavLink({ item }: { item: NavItem }) {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const { pathname } = useRouterState({ select: (s) => s.location });
  const active = isActive(pathname, item.activePrefix);

  const cls = cn(
    "flex-1 flex flex-col items-center justify-center py-2 gap-0.5 text-[10px] font-body font-medium transition-smooth min-w-0",
    active ? "text-primary" : "text-muted-foreground hover:text-foreground",
  );

  const iconEl = (
    <>
      <item.Icon
        size={20}
        aria-hidden="true"
        className={cn(
          "transition-smooth",
          active && "drop-shadow-[0_0_6px_oklch(var(--primary)/0.8)]",
        )}
      />
      <span className="truncate">{t(item.labelEs, item.labelEn)}</span>
    </>
  );

  if (item.staticPath) {
    return (
      <Link
        to={item.staticPath}
        data-ocid={`bottom_nav.${item.labelEn.toLowerCase()}_link`}
        className={cls}
      >
        {iconEl}
      </Link>
    );
  }

  return (
    <button
      type="button"
      onClick={() =>
        navigate({
          to: item.navigateTo as Parameters<typeof navigate>[0]["to"],
        })
      }
      data-ocid={`bottom_nav.${item.labelEn.toLowerCase()}_link`}
      className={cls}
    >
      {iconEl}
    </button>
  );
}

export function Layout({ children }: LayoutProps) {
  const { pathname } = useRouterState({ select: (s) => s.location });
  const { t, toggleLang, lang } = useLanguage();
  const { toggleTheme, isDark } = useTheme();
  const isOnboarding = pathname === "/onboarding";

  if (isOnboarding) return <>{children}</>;

  const sidebarLinkCls =
    "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-body font-medium transition-smooth";

  return (
    <div className="min-h-screen flex bg-background">
      {/* ── Sidebar (desktop) ──────────────────────────────────── */}
      <aside className="hidden lg:flex flex-col w-60 shrink-0 bg-card border-r border-border sticky top-0 h-screen">
        <div className="flex items-center gap-2.5 px-6 py-5 border-b border-border">
          <span className="text-2xl" aria-hidden="true">
            🍀
          </span>
          <span className="font-display text-xl font-bold text-primary tracking-wide">
            LSBFL
          </span>
        </div>

        <nav
          className="flex-1 px-3 py-4 space-y-1 overflow-y-auto"
          aria-label={t("Navegación principal", "Main navigation")}
        >
          {NAV_ITEMS.map((item) => (
            <NavLink
              key={item.activePrefix}
              item={item}
              className={cn(
                sidebarLinkCls,
                isActive(pathname, item.activePrefix)
                  ? "bg-primary/15 text-primary shadow-glow-gold"
                  : "text-muted-foreground hover:bg-muted/60 hover:text-foreground",
              )}
            />
          ))}
        </nav>

        <div className="px-4 py-4 border-t border-border space-y-2">
          <button
            type="button"
            onClick={toggleTheme}
            data-ocid="nav.theme_toggle"
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-body text-muted-foreground hover:bg-muted/60 hover:text-foreground transition-smooth"
          >
            {isDark ? (
              <Sun size={16} aria-hidden="true" />
            ) : (
              <Moon size={16} aria-hidden="true" />
            )}
            {isDark
              ? t("Modo Claro", "Light Mode")
              : t("Modo Oscuro", "Dark Mode")}
          </button>
          <button
            type="button"
            onClick={toggleLang}
            data-ocid="nav.lang_toggle"
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-body text-muted-foreground hover:bg-muted/60 hover:text-foreground transition-smooth"
          >
            <Globe size={16} aria-hidden="true" />
            {lang === "es" ? "English" : "Español"}
          </button>
          <Link
            to="/profile"
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-body text-muted-foreground hover:bg-muted/60 hover:text-foreground transition-smooth"
          >
            <Settings size={16} aria-hidden="true" />
            {t("Configuración", "Settings")}
          </Link>
        </div>
      </aside>

      {/* ── Main content ───────────────────────────────────────── */}
      <div className="flex-1 flex flex-col min-w-0">
        <header className="lg:hidden flex items-center justify-between px-4 py-3 bg-card border-b border-border sticky top-0 z-30">
          <div className="flex items-center gap-2">
            <span className="text-lg" aria-hidden="true">
              🍀
            </span>
            <span className="font-display text-lg font-bold text-primary">
              LSBFL
            </span>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={toggleLang}
              data-ocid="mobile.lang_toggle"
              className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted/60 transition-smooth"
              aria-label={
                lang === "es" ? "Switch to English" : "Cambiar a Español"
              }
            >
              <Globe size={18} />
            </button>
            <button
              type="button"
              onClick={toggleTheme}
              data-ocid="mobile.theme_toggle"
              className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted/60 transition-smooth"
              aria-label={
                isDark
                  ? t("Activar modo claro", "Enable light mode")
                  : t("Activar modo oscuro", "Enable dark mode")
              }
            >
              {isDark ? <Sun size={18} /> : <Moon size={18} />}
            </button>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto pb-20 lg:pb-0">{children}</main>

        <footer className="hidden lg:block bg-muted/40 border-t border-border px-6 py-4 text-center text-xs text-muted-foreground font-body">
          © {new Date().getFullYear()}{" "}
          <a
            href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(typeof window !== "undefined" ? window.location.hostname : "")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-primary transition-colors"
          >
            Built with love using caffeine.ai
          </a>
        </footer>
      </div>

      {/* ── Bottom Nav (mobile) ────────────────────────────────── */}
      <nav
        className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-card border-t border-border flex items-stretch"
        aria-label={t("Navegación", "Navigation")}
      >
        {NAV_ITEMS.filter((i) => i.showInBottom).map((item) => (
          <BottomNavLink key={item.activePrefix} item={item} />
        ))}
      </nav>
    </div>
  );
}
