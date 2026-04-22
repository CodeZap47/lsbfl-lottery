import { GlowButton } from "@/components/ui/GlowButton";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useLanguage } from "@/hooks/useLanguage";
import { useMockData } from "@/hooks/useMockData";
import { cn } from "@/lib/utils";
import type { Winner } from "@/types";
import { motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";

// ─── Helpers ──────────────────────────────────────────────────────────────────
function countryFlag(code: string): string {
  return code
    .toUpperCase()
    .split("")
    .map((c) => String.fromCodePoint(0x1f1e6 + c.charCodeAt(0) - 65))
    .join("");
}

// ─── Badge definitions ────────────────────────────────────────────────────────
interface BadgeDef {
  id: string;
  nameEs: string;
  emoji: string;
  descriptionEs: string;
  howToEarnEs: string;
  locked: boolean;
}

const ALL_BADGES: BadgeDef[] = [
  {
    id: "participant",
    nameEs: "Participante",
    emoji: "🎟️",
    descriptionEs: "Compraste 5 boletos",
    howToEarnEs: "Compra 5 boletos para desbloquear",
    locked: false,
  },
  {
    id: "gifter",
    nameEs: "Generoso",
    emoji: "🎁",
    descriptionEs: "Regalaste un boleto",
    howToEarnEs: "Regala un boleto a un amigo",
    locked: false,
  },
  {
    id: "winner",
    nameEs: "Ganador",
    emoji: "🏆",
    descriptionEs: "Ganaste un premio",
    howToEarnEs: "Gana cualquier premio para desbloquear",
    locked: true,
  },
  {
    id: "mega-winner",
    nameEs: "Mega Ganador",
    emoji: "⭐",
    descriptionEs: "Ganaste el jackpot",
    howToEarnEs: "Gana el gran pozo principal",
    locked: true,
  },
  {
    id: "lucky7",
    nameEs: "Lucky 7",
    emoji: "🍀",
    descriptionEs: "Jugaste 7 semanas seguidas",
    howToEarnEs: "Participa 7 semanas consecutivas",
    locked: true,
  },
];

// ─── WinnerCard ───────────────────────────────────────────────────────────────
function WinnerCard({
  winner,
  index,
  congratulated,
  onCongratulate,
  t,
}: {
  winner: Winner;
  index: number;
  congratulated: boolean;
  onCongratulate: (id: string) => void;
  t: (es: string, en: string) => string;
}) {
  return (
    <motion.div
      data-ocid={`winners.item.${index + 1}`}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.08, duration: 0.4 }}
      className="relative bg-card border border-border rounded-2xl p-5 flex gap-4 overflow-hidden group"
    >
      {/* shimmer hover overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-smooth pointer-events-none" />

      {/* ¡Ganador! pill */}
      <span className="absolute top-3 right-3 text-[10px] font-body font-bold px-2 py-0.5 rounded-full bg-primary/20 text-primary border border-primary/40 tracking-wider">
        ¡GANADOR!
      </span>

      {/* Avatar */}
      <div
        className="w-14 h-14 shrink-0 rounded-full flex items-center justify-center text-2xl border-2 border-primary/40"
        style={{ background: `${winner.avatarColor}22` }}
        aria-label={winner.name}
      >
        {countryFlag(winner.countryCode)}
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0 flex flex-col gap-1">
        <p className="font-body font-semibold text-foreground truncate">
          {winner.name} · {countryFlag(winner.countryCode)} {winner.country}
        </p>

        <p className="font-display text-xl font-bold text-primary leading-none">
          {winner.prizeFormatted}{" "}
          <span className="text-sm text-muted-foreground font-body font-normal">
            {winner.currency}
          </span>
        </p>

        <p className="text-xs text-muted-foreground font-body">
          {winner.lotteryName} ·{" "}
          {new Date(winner.wonAt).toLocaleDateString("es-MX", {
            day: "numeric",
            month: "long",
            year: "numeric",
          })}
        </p>

        <blockquote className="mt-1 text-sm text-foreground/80 italic border-l-2 border-primary/40 pl-3 leading-snug line-clamp-2">
          "{t(winner.messageEs, winner.message)}"
        </blockquote>

        <div className="mt-3">
          <GlowButton
            type="button"
            data-ocid={`winners.congratulate_button.${index + 1}`}
            variant={congratulated ? "ghost" : "outline"}
            size="sm"
            onClick={() => onCongratulate(winner.id)}
            disabled={congratulated}
            className="text-xs"
          >
            {congratulated ? "✓ ¡Felicitado!" : "🎉 Felicitar / Congratulate"}
          </GlowButton>
        </div>
      </div>
    </motion.div>
  );
}

// ─── BadgeCard ────────────────────────────────────────────────────────────────
function BadgeCard({ badge, index }: { badge: BadgeDef; index: number }) {
  return (
    <motion.div
      data-ocid={`badges.item.${index + 1}`}
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.07, duration: 0.35 }}
      className={cn(
        "flex flex-col items-center gap-2 p-4 rounded-2xl border text-center transition-smooth",
        badge.locked
          ? "bg-muted/40 border-border opacity-60 grayscale"
          : "bg-card border-primary/40 glow-gold",
      )}
    >
      <div
        className={cn(
          "w-14 h-14 rounded-full flex items-center justify-center text-3xl border-2",
          badge.locked
            ? "border-border bg-muted"
            : "border-primary/60 bg-primary/10",
        )}
      >
        {badge.locked ? (
          <span className="text-xl" aria-hidden="true">
            🔒
          </span>
        ) : (
          <span aria-label={badge.nameEs}>{badge.emoji}</span>
        )}
      </div>

      <p
        className={cn(
          "text-sm font-body font-semibold leading-tight",
          badge.locked ? "text-muted-foreground" : "text-foreground",
        )}
      >
        {badge.nameEs}
      </p>

      <p className="text-xs text-muted-foreground font-body leading-snug">
        {badge.locked ? (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <span
                  data-ocid={`badges.tooltip.${index + 1}`}
                  className="underline decoration-dotted cursor-help text-primary/70"
                >
                  ¿Cómo ganar?
                </span>
              </TooltipTrigger>
              <TooltipContent
                side="top"
                className="max-w-[180px] text-center text-xs"
              >
                {badge.howToEarnEs}
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        ) : (
          badge.descriptionEs
        )}
      </p>

      {!badge.locked && (
        <Badge
          variant="outline"
          className="text-[10px] border-primary/40 text-primary px-2"
        >
          Ganado ✓
        </Badge>
      )}
    </motion.div>
  );
}

// ─── CommunityPage ────────────────────────────────────────────────────────────
export default function CommunityPage() {
  const { winners } = useMockData();
  const { t } = useLanguage();
  const [congratulated, setCongratulated] = useState<Set<string>>(new Set());
  const [selectedCause, setSelectedCause] = useState("education");
  const [donateToggle, setDonateToggle] = useState(false);
  const [activeTab, setActiveTab] = useState<"winners" | "badges" | "purpose">(
    "winners",
  );

  function handleCongratulate(id: string) {
    setCongratulated((prev) => {
      const next = new Set(prev);
      next.add(id);
      return next;
    });
    toast.success("¡Enviaste felicitaciones! 🎉", {
      description: "Tu mensaje llegará al ganador.",
      duration: 4000,
    });
  }

  function handleDonateToggle(checked: boolean) {
    setDonateToggle(checked);
    if (checked) {
      toast.success(
        "¡Activado! El 1% de tu próximo premio irá a la causa. 💚",
        {
          duration: 4500,
        },
      );
    }
  }

  return (
    <div className="min-h-screen bg-background" data-ocid="community.page">
      {/* ── Header ────────────────────────────────────────────────────────── */}
      <section className="bg-card border-b border-border px-4 pt-8 pb-6">
        <div className="max-w-lg mx-auto">
          <motion.h1
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="font-display text-3xl font-bold text-foreground"
          >
            Comunidad{" "}
            <span className="text-muted-foreground font-normal text-xl">
              / Community
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.15, duration: 0.5 }}
            className="mt-1 font-body text-base text-muted-foreground italic"
          >
            "La suerte compartida es doble suerte"
          </motion.p>

          {/* Stats bar */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25, duration: 0.45 }}
            data-ocid="community.stats_bar"
            className="mt-4 flex items-center gap-2 flex-wrap"
          >
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/30 text-sm font-body text-primary font-medium">
              🏆 <span>4,891 ganadores este mes</span>
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-secondary/10 border border-secondary/30 text-sm font-body text-secondary font-medium">
              🌎 <span>23 países</span>
            </span>
          </motion.div>
        </div>
      </section>

      {/* ── Tabs ──────────────────────────────────────────────────────────── */}
      <div className="max-w-lg mx-auto px-4 pt-6 pb-20">
        <Tabs
          value={activeTab}
          onValueChange={(v) =>
            setActiveTab(v as "winners" | "badges" | "purpose")
          }
        >
          <TabsList
            data-ocid="community.tabs"
            className="w-full grid grid-cols-3 mb-6 bg-muted/40 border border-border rounded-2xl p-1 h-auto"
          >
            <TabsTrigger
              value="winners"
              data-ocid="community.tab.winners"
              className="rounded-xl text-xs font-body font-semibold py-2 data-[state=active]:bg-card data-[state=active]:text-primary data-[state=active]:shadow-sm transition-smooth"
            >
              🏆 Ganadores
            </TabsTrigger>
            <TabsTrigger
              value="badges"
              data-ocid="community.tab.badges"
              className="rounded-xl text-xs font-body font-semibold py-2 data-[state=active]:bg-card data-[state=active]:text-primary data-[state=active]:shadow-sm transition-smooth"
            >
              🎖️ Insignias
            </TabsTrigger>
            <TabsTrigger
              value="purpose"
              data-ocid="community.tab.purpose"
              className="rounded-xl text-xs font-body font-semibold py-2 data-[state=active]:bg-card data-[state=active]:text-secondary data-[state=active]:shadow-sm transition-smooth"
            >
              💚 Propósito
            </TabsTrigger>
          </TabsList>

          {/* ── Winners Feed ────────────────────────────────────────────── */}
          <TabsContent value="winners" className="mt-0">
            <ScrollArea
              className="h-[calc(100vh-320px)] min-h-[400px]"
              data-ocid="winners.list"
            >
              <div className="flex flex-col gap-4 pr-1">
                {winners.map((winner, i) => (
                  <WinnerCard
                    key={winner.id}
                    winner={winner}
                    index={i}
                    congratulated={congratulated.has(winner.id)}
                    onCongratulate={handleCongratulate}
                    t={t}
                  />
                ))}
              </div>
            </ScrollArea>
          </TabsContent>

          {/* ── My Badges ───────────────────────────────────────────────── */}
          <TabsContent value="badges" className="mt-0">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.35 }}
            >
              <div className="mb-4">
                <h2 className="font-display text-xl font-semibold text-foreground">
                  Mis logros{" "}
                  <span className="text-muted-foreground font-normal text-base">
                    / My achievements
                  </span>
                </h2>
                <p className="text-sm text-muted-foreground font-body mt-0.5">
                  Colecciona insignias completando retos
                </p>
              </div>

              <div className="grid grid-cols-3 gap-3" data-ocid="badges.grid">
                {ALL_BADGES.map((badge, i) => (
                  <BadgeCard key={badge.id} badge={badge} index={i} />
                ))}
              </div>

              <div className="mt-5 bg-muted/30 border border-border rounded-2xl p-4 flex items-center gap-3">
                <span className="text-2xl" aria-hidden="true">
                  🎯
                </span>
                <div>
                  <p className="text-sm font-body font-semibold text-foreground">
                    2 de 5 insignias desbloqueadas
                  </p>
                  <p className="text-xs text-muted-foreground font-body">
                    Sigue jugando para ganar más logros
                  </p>
                </div>
              </div>
            </motion.div>
          </TabsContent>

          {/* ── Con Propósito ───────────────────────────────────────────── */}
          <TabsContent value="purpose" className="mt-0">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="flex flex-col gap-5"
            >
              <div>
                <h2 className="font-display text-xl font-semibold text-foreground">
                  Tu suerte también ayuda
                </h2>
                <p className="text-sm text-muted-foreground font-body mt-0.5">
                  Your luck also helps
                </p>
              </div>

              {/* Campaign card */}
              <div
                data-ocid="purpose.campaign_card"
                className="bg-card border border-secondary/30 rounded-2xl p-5 glow-green"
              >
                <div className="flex items-start gap-3 mb-4">
                  <span className="text-3xl" aria-hidden="true">
                    📚
                  </span>
                  <div className="flex-1 min-w-0">
                    <p className="font-body font-semibold text-foreground leading-snug">
                      Educación en Latinoamérica
                    </p>
                    <p className="text-xs text-muted-foreground font-body">
                      Education in Latin America
                    </p>
                  </div>
                  <Badge
                    variant="outline"
                    className="text-[10px] border-secondary/50 text-secondary shrink-0"
                  >
                    Activa
                  </Badge>
                </div>

                <div className="mb-2">
                  <div className="flex justify-between items-center mb-1.5">
                    <span className="text-xs font-body text-muted-foreground">
                      $320,450 recaudado
                    </span>
                    <span className="text-xs font-body font-semibold text-secondary">
                      67%
                    </span>
                  </div>
                  <Progress
                    data-ocid="purpose.progress_bar"
                    value={67}
                    className="h-2.5 rounded-full bg-muted [&>div]:bg-secondary [&>div]:rounded-full"
                  />
                  <p className="text-xs text-muted-foreground font-body mt-1.5">
                    Meta: $480,000 USD
                  </p>
                </div>

                <div className="mt-3 bg-secondary/10 border border-secondary/20 rounded-xl px-4 py-2.5 flex items-center gap-2">
                  <span className="text-base" aria-hidden="true">
                    💚
                  </span>
                  <p className="text-sm font-body text-secondary font-medium">
                    $45 USD donados en tu nombre este mes
                  </p>
                </div>
              </div>

              {/* Cause selector */}
              <div className="flex flex-col gap-2">
                <label
                  htmlFor="cause-select"
                  className="text-sm font-body font-semibold text-foreground"
                >
                  Elegir causa / Choose cause
                </label>
                <Select
                  value={selectedCause}
                  onValueChange={(v) => setSelectedCause(v)}
                >
                  <SelectTrigger
                    id="cause-select"
                    data-ocid="purpose.cause_select"
                    className="rounded-xl border-border bg-card font-body"
                  >
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="rounded-xl font-body">
                    <SelectItem value="education">
                      📚 Educación / Education
                    </SelectItem>
                    <SelectItem value="environment">
                      🌿 Medio Ambiente / Environment
                    </SelectItem>
                    <SelectItem value="healthcare">
                      🏥 Salud / Healthcare
                    </SelectItem>
                    <SelectItem value="children">
                      👶 Niñez / Children
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Donate toggle */}
              <div
                data-ocid="purpose.donate_toggle"
                className="flex items-center justify-between bg-card border border-border rounded-2xl px-5 py-4 gap-4"
              >
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-body font-semibold text-foreground leading-snug">
                    Donar 1% de mi próximo premio
                  </p>
                  <p className="text-xs text-muted-foreground font-body mt-0.5">
                    Donate 1% of my next prize
                  </p>
                </div>
                <Switch
                  checked={donateToggle}
                  onCheckedChange={handleDonateToggle}
                  aria-label="Donar 1% del próximo premio"
                  className="data-[state=checked]:bg-secondary shrink-0"
                />
              </div>

              {/* Community stat */}
              <div
                data-ocid="purpose.community_stat"
                className="bg-muted/30 border border-border rounded-2xl px-5 py-4 flex items-center gap-3"
              >
                <span className="text-2xl" aria-hidden="true">
                  🌎
                </span>
                <p className="text-sm font-body text-foreground">
                  <span className="font-semibold text-primary">
                    12,403 participantes
                  </span>{" "}
                  han donado este mes
                </p>
              </div>
            </motion.div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
