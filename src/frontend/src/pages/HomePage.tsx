import { CountdownTimer } from "@/components/ui/CountdownTimer";
import { GlowButton } from "@/components/ui/GlowButton";
import { LotteryCard } from "@/components/ui/LotteryCard";
import { useLanguage } from "@/hooks/useLanguage";
import { useMockData } from "@/hooks/useMockData";
import type { Ticket } from "@/types";
import { Link, useNavigate } from "@tanstack/react-router";
import {
  ChevronRight,
  Globe,
  MapPin,
  Ticket as TicketIcon,
  Tv2,
  Users,
} from "lucide-react";
import { animate, useMotionValue, useTransform } from "motion/react";
import { motion } from "motion/react";
import { useEffect, useRef } from "react";

// ── Animated count-up number ──────────────────────────────────────────────────
function CountUp({
  target,
  prefix = "",
  suffix = "",
  duration = 1.8,
}: {
  target: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
}) {
  const count = useMotionValue(0);
  const rounded = useTransform(count, (v) =>
    Math.round(v).toLocaleString("en-US"),
  );
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const controls = animate(count, target, {
      duration,
      ease: "easeOut",
    });
    return controls.stop;
  }, [count, target, duration]);

  const reserveText = prefix + target.toLocaleString("en-US") + suffix;

  return (
    <span
      ref={ref}
      className="inline-grid grid-cols-1 justify-items-center whitespace-nowrap"
    >
      <span
        className="col-start-1 row-start-1 invisible select-none"
        aria-hidden
      >
        {reserveText}
      </span>
      <span className="col-start-1 row-start-1">
        {prefix}
        <motion.span className="tabular-nums">{rounded}</motion.span>
        {suffix}
      </span>
    </span>
  );
}

// ── Quick-nav item ────────────────────────────────────────────────────────────
interface QuickNavItemProps {
  icon: React.ReactNode;
  label: string;
  to: string;
  ocid: string;
  accent?: boolean;
}

function QuickNavItem({ icon, label, to, ocid, accent }: QuickNavItemProps) {
  return (
    <Link
      to={to}
      data-ocid={ocid}
      className="flex flex-col items-center gap-1.5 min-w-[72px] group focus-visible:outline-none"
    >
      <div
        className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-smooth group-hover:-translate-y-0.5 group-hover:shadow-lg group-focus-visible:ring-2 group-focus-visible:ring-ring ${
          accent
            ? "bg-primary/20 border border-primary/40 text-primary group-hover:shadow-glow-gold"
            : "bg-card border border-border/60 text-foreground group-hover:border-primary/30"
        }`}
      >
        {icon}
      </div>
      <span className="font-body text-xs text-muted-foreground text-center leading-tight">
        {label}
      </span>
    </Link>
  );
}

// ── Mini ticket card ──────────────────────────────────────────────────────────
function MiniTicketCard({ ticket, index }: { ticket: Ticket; index: number }) {
  const { t } = useLanguage();

  const statusColor: Record<string, string> = {
    Active: "text-secondary",
    InDraw: "text-primary animate-pulse",
    Winner: "text-yellow-400",
    Lost: "text-muted-foreground",
    Unclaimed: "text-muted-foreground",
  };

  const statusLabel: Record<string, [string, string]> = {
    Active: ["Activo", "Active"],
    InDraw: ["En sorteo", "In Draw"],
    Winner: ["¡Ganador!", "Winner!"],
    Lost: ["Perdido", "Lost"],
    Unclaimed: ["Sin reclamar", "Unclaimed"],
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.4 }}
      data-ocid={`home.ticket_preview.${index + 1}`}
    >
      <div className="ticket-card bg-card border border-border/60 hover:border-primary/30 p-4 flex items-center gap-4 transition-smooth hover:-translate-y-0.5 hover:shadow-glow-gold">
        {/* Ticket number dots */}
        <div className="shrink-0 w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center">
          <TicketIcon size={18} className="text-primary" aria-hidden="true" />
        </div>

        <div className="flex-1 min-w-0">
          <p className="font-body font-semibold text-sm text-foreground truncate">
            {t(ticket.lotteryNameEs, ticket.lotteryName)}
          </p>
          <p className="font-mono text-xs text-muted-foreground truncate mt-0.5">
            {ticket.serialCode}
          </p>
          <div className="flex items-center gap-2 mt-1 flex-wrap">
            {ticket.numbers.map((n) => (
              <span
                key={n}
                className="text-xs font-mono w-6 h-6 rounded-full bg-muted flex items-center justify-center text-foreground"
              >
                {n}
              </span>
            ))}
          </div>
        </div>

        <div className="text-right shrink-0">
          <span
            className={`font-body text-xs font-semibold ${statusColor[ticket.status] ?? "text-muted-foreground"}`}
          >
            {t(...(statusLabel[ticket.status] ?? ["Desconocido", "Unknown"]))}
          </span>
          <p className="font-body text-xs text-muted-foreground mt-1">
            {new Date(ticket.drawDate).toLocaleDateString("es", {
              day: "2-digit",
              month: "short",
            })}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

// ── HomePage ──────────────────────────────────────────────────────────────────
export default function HomePage() {
  const { t } = useLanguage();
  const { lotteries, tickets } = useMockData();
  const navigate = useNavigate();

  const megaJackpot = 1_233_000_000;
  const megaLottery = lotteries[0];
  const upcomingTickets = tickets.filter(
    (tk) => tk.status === "Active" || tk.status === "InDraw",
  );

  return (
    <div className="min-h-screen bg-background">
      {/* ── Hero ── */}
      <section
        className="relative overflow-hidden px-4 pt-8 pb-12"
        data-ocid="home.hero_section"
        style={{
          background:
            "radial-gradient(ellipse at 50% -10%, oklch(0.22 0.07 80 / 0.55) 0%, transparent 68%), oklch(var(--background))",
        }}
      >
        {/* Ambient blobs */}
        <div
          className="absolute inset-0 pointer-events-none overflow-hidden"
          aria-hidden="true"
        >
          <div className="absolute -top-10 right-0 w-72 h-72 rounded-full bg-secondary/10 blur-3xl" />
          <div className="absolute bottom-0 left-0 w-56 h-56 rounded-full bg-primary/10 blur-3xl" />
        </div>

        <div className="relative max-w-2xl mx-auto">
          {/* Mega jackpot card */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: "easeOut" }}
            className="ticket-card relative overflow-hidden border border-primary/40 p-6 mb-6"
            style={{
              background:
                "radial-gradient(ellipse at 60% 20%, oklch(0.25 0.08 80 / 0.7) 0%, #0d0d0d 70%)",
              boxShadow:
                "0 0 0 1px oklch(0.72 0.18 80 / 0.25), 0 0 40px oklch(0.72 0.18 80 / 0.18), 0 20px 60px oklch(0 0 0 / 0.5)",
            }}
            data-ocid="home.mega_jackpot_card"
          >
            {/* Corner filigree lines */}
            <div
              className="absolute inset-0 pointer-events-none opacity-[0.07]"
              style={{
                backgroundImage:
                  "linear-gradient(45deg, transparent 40%, oklch(0.72 0.18 80 / 0.8) 50%, transparent 60%), linear-gradient(-45deg, transparent 40%, oklch(0.72 0.18 80 / 0.5) 50%, transparent 60%)",
                backgroundSize: "80px 80px",
              }}
              aria-hidden="true"
            />

            {/* Mega label */}
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <span className="text-xl" aria-hidden="true">
                  🎰
                </span>
                <span className="font-body text-xs uppercase tracking-[0.25em] text-primary/80">
                  LSBFL
                </span>
              </div>
              <span
                className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-body font-bold uppercase tracking-wider"
                style={{
                  background: "oklch(0.72 0.18 80 / 0.2)",
                  border: "1px solid oklch(0.72 0.18 80 / 0.5)",
                  color: "oklch(0.85 0.16 80)",
                }}
              >
                ✦ Mega Jackpot
              </span>
            </div>

            {/* Prize amount */}
            <div className="text-center my-5">
              <p className="font-body text-xs uppercase tracking-[0.2em] text-white/50 mb-2">
                {t("Premio Mayor", "Grand Prize")}
              </p>
              <h1
                className="font-display font-black leading-none"
                style={{
                  fontSize: "clamp(2.4rem, 8vw, 3.6rem)",
                  color: "oklch(0.85 0.18 80)",
                  textShadow:
                    "0 0 30px oklch(0.72 0.18 80 / 0.6), 0 0 80px oklch(0.72 0.18 80 / 0.25)",
                }}
              >
                <CountUp target={megaJackpot} prefix="$" suffix=" USD" />
              </h1>
              <p className="font-body text-xs text-white/40 mt-2">
                {t("Participantes", "Participants")}:{" "}
                <strong className="text-white/70">342,891</strong>
                &nbsp;·&nbsp;
                <Globe size={11} className="inline mb-0.5" aria-hidden="true" />
                &nbsp;23 {t("países", "countries")}
              </p>
            </div>

            {/* Countdown */}
            <div className="rounded-xl bg-black/30 border border-white/10 px-4 py-3 mb-5 flex flex-col items-center">
              <p className="font-body text-xs text-white/40 uppercase tracking-widest mb-2">
                {t("Próximo sorteo", "Next draw")}
              </p>
              <CountdownTimer
                targetDate={megaLottery.drawDate}
                className="text-white"
              />
            </div>

            {/* CTA */}
            <GlowButton
              variant="gold"
              size="xl"
              shimmer
              className="w-full"
              type="button"
              data-ocid="home.hero_buy_button"
              onClick={() =>
                navigate({
                  to: "/purchase/$lotteryId",
                  params: { lotteryId: "classic-645" },
                })
              }
            >
              🎟️ {t("Comprar boleto", "Buy ticket")}
            </GlowButton>
          </motion.div>
        </div>
      </section>

      {/* ── Quick Nav Strip ── */}
      <section
        className="px-4 py-5 bg-card border-y border-border/60"
        data-ocid="home.quick_nav_section"
      >
        <div className="max-w-lg mx-auto">
          <nav
            className="flex justify-center gap-3 overflow-x-auto pb-1 scrollbar-none"
            style={{ scrollbarWidth: "none" }}
            aria-label={t("Acciones rápidas", "Quick actions")}
          >
            <QuickNavItem
              icon={<TicketIcon size={22} />}
              label={t("Mis boletos", "My tickets")}
              to="/wallet"
              ocid="home.quick_nav.wallet"
              accent
            />
            <QuickNavItem
              icon={<Tv2 size={22} />}
              label={t("Sorteo en vivo", "Live draw")}
              to="/draw/draw-001"
              ocid="home.quick_nav.draw"
            />
            <QuickNavItem
              icon={<MapPin size={22} />}
              label={t("Tiendas", "Stores")}
              to="/map"
              ocid="home.quick_nav.map"
            />
            <QuickNavItem
              icon={<Users size={22} />}
              label={t("Comunidad", "Community")}
              to="/community"
              ocid="home.quick_nav.community"
            />
          </nav>
        </div>
      </section>

      {/* ── Lottery Carousel ── */}
      <section
        className="py-7 bg-background"
        data-ocid="home.lotteries_section"
      >
        <div className="max-w-lg mx-auto lg:max-w-none lg:mx-0">
          {/* Section header */}
          <div className="flex items-center justify-between px-4 lg:px-6 mb-4">
            <h2 className="font-display text-xl font-bold text-foreground">
              ✦ {t("Sorteos activos", "Active draws")}
            </h2>
            <Link
              to="/wallet"
              className="text-xs font-body text-primary hover:text-primary/80 flex items-center gap-0.5 transition-colors"
              data-ocid="home.view_all_link"
            >
              {t("Ver todos", "See all")}
              <ChevronRight size={14} />
            </Link>
          </div>

          {/* Horizontal scroll container */}
          <ul
            className="flex gap-4 overflow-x-auto px-4 lg:px-6 pb-2 scrollbar-none snap-x snap-mandatory list-none"
            style={{ scrollbarWidth: "none" }}
            aria-label={t("Carrusel de sorteos", "Lottery carousel")}
          >
            {lotteries.map((lottery, i) => (
              <motion.li
                key={lottery.id}
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.4 }}
                className="min-w-[300px] max-w-[320px] snap-start"
                data-ocid={`home.lottery_carousel_item.${i + 1}`}
              >
                <LotteryCard
                  lottery={lottery}
                  className={
                    lottery.type === "NoLoss" ? "border-secondary/40" : ""
                  }
                />
              </motion.li>
            ))}
          </ul>
        </div>
      </section>

      {/* ── My Tickets Preview ── */}
      <section
        className="px-4 py-7 bg-muted/30 border-t border-border/60"
        data-ocid="home.tickets_section"
      >
        <div className="max-w-lg mx-auto">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-display text-xl font-bold text-foreground">
              🎟️ {t("Mis próximos sorteos", "My upcoming draws")}
            </h2>
            <Link
              to="/wallet"
              className="text-xs font-body text-primary hover:text-primary/80 flex items-center gap-0.5 transition-colors"
              data-ocid="home.view_all_tickets_link"
            >
              {t("Ver todos", "See all")}
              <ChevronRight size={14} />
            </Link>
          </div>

          {upcomingTickets.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="ticket-card bg-card border border-border/50 p-8 text-center"
              data-ocid="home.tickets_empty_state"
            >
              <p className="text-3xl mb-3">🎫</p>
              <p className="font-display text-base font-semibold text-foreground mb-1">
                {t("No tienes boletos activos", "No active tickets yet")}
              </p>
              <p className="font-body text-sm text-muted-foreground mb-4">
                {t(
                  "¡Compra tu primer boleto y entra al sorteo!",
                  "Buy your first ticket and join the draw!",
                )}
              </p>
              <GlowButton
                variant="outline"
                size="md"
                type="button"
                data-ocid="home.tickets_empty_buy_button"
                onClick={() =>
                  navigate({
                    to: "/purchase/$lotteryId",
                    params: { lotteryId: lotteries[0].id },
                  })
                }
              >
                {t("Comprar ahora", "Buy now")}
              </GlowButton>
            </motion.div>
          ) : (
            <div className="space-y-3">
              {upcomingTickets.slice(0, 2).map((ticket, i) => (
                <MiniTicketCard key={ticket.id} ticket={ticket} index={i} />
              ))}
              {upcomingTickets.length > 2 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.25 }}
                  className="text-center pt-1"
                >
                  <Link
                    to="/wallet"
                    className="font-body text-sm text-primary hover:text-primary/80 transition-colors inline-flex items-center gap-1"
                    data-ocid="home.see_more_tickets_link"
                  >
                    {t(
                      `+${upcomingTickets.length - 2} boletos más`,
                      `+${upcomingTickets.length - 2} more tickets`,
                    )}
                    <ChevronRight size={14} />
                  </Link>
                </motion.div>
              )}
            </div>
          )}
        </div>
      </section>

      {/* ── Bottom CTA / Footer ── */}
      <section
        className="px-4 pt-8 pb-6 bg-card border-t border-border"
        data-ocid="home.footer_cta_section"
      >
        <div className="max-w-lg mx-auto text-center">
          <p
            className="font-display text-2xl font-black mb-1"
            style={{ color: "oklch(0.85 0.16 80)" }}
          >
            {t("La suerte como un derecho,", "Luck as a right,")}
          </p>
          <p className="font-display text-2xl font-black text-foreground mb-4">
            {t("no como un privilegio.", "not a privilege.")}
          </p>
          <p className="font-body text-sm text-muted-foreground mb-6">
            {t(
              "Desde $1 USD · Sin comisiones ocultas · 23 países",
              "From $1 USD · No hidden fees · 23 countries",
            )}
          </p>
          <GlowButton
            variant="gold"
            size="lg"
            shimmer
            type="button"
            className="w-full max-w-xs mx-auto"
            data-ocid="home.footer_buy_button"
            onClick={() =>
              navigate({
                to: "/purchase/$lotteryId",
                params: { lotteryId: lotteries[0].id },
              })
            }
          >
            🎟️ {t("Comprar boleto", "Buy ticket")}
          </GlowButton>

          <p className="mt-6 text-xs text-muted-foreground font-body">
            © {new Date().getFullYear()}{" "}
            <a
              href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(typeof window !== "undefined" ? window.location.hostname : "")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-primary transition-colors"
            >
              Built with love using caffeine.ai
            </a>
          </p>
        </div>
      </section>
    </div>
  );
}
