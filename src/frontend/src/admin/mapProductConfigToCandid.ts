import type {
  LotteryProductConfig as CandidLotteryProductConfig,
  ComplianceConfig,
  Lifecycle,
  LotteryIdentity,
  ProductCategory,
  RngConfig,
  RngStrategy,
  ScheduleConfig,
  TicketConfig,
  TreasuryConfig,
  TreasuryPercents,
  WinnerAlgorithm,
  WinnerSelectionConfig,
} from "../declarations/backend.did.d.ts";
import type { LotteryProductConfig } from "./lotteryDraftSchema";

function lifecycleVariant(
  v: LotteryProductConfig["identity"]["lifecycle"],
): Lifecycle {
  const m: Record<string, Lifecycle> = {
    draft: { draft: null },
    scheduled: { scheduled: null },
    live: { live: null },
    paused: { paused: null },
    archived: { archived: null },
  };
  return m[v] ?? { draft: null };
}

function productCategoryVariant(
  v: LotteryProductConfig["identity"]["productCategory"],
): ProductCategory {
  const m: Record<string, ProductCategory> = {
    classic: { classic: null },
    "no-loss": { no_loss: null },
    "raffle-nft": { raffle_nft: null },
    progressive: { progressive: null },
    "instant-win": { instant_win: null },
  };
  return m[v] ?? { classic: null };
}

function winnerAlgorithmVariant(
  v: LotteryProductConfig["winnerSelection"]["algorithm"],
): WinnerAlgorithm {
  const m: Record<string, WinnerAlgorithm> = {
    match_N_numbers: { match_N_numbers: null },
    random_weighted_by_balance: { random_weighted_by_balance: null },
    random_single_winner: { random_single_winner: null },
    top_K_winners: { top_K_winners: null },
    tiered: { tiered: null },
  };
  return m[v] ?? { tiered: null };
}

function rngStrategyVariant(
  v:
    | LotteryProductConfig["rng"]["primary"]
    | LotteryProductConfig["rng"]["fallback"],
): RngStrategy {
  const m: Record<string, RngStrategy> = {
    icp_chain_key: { icp_chain_key: null },
    raw_rand: { raw_rand: null },
    commit_reveal: { commit_reveal: null },
    drand_compatible: { drand_compatible: null },
  };
  return m[v] ?? { icp_chain_key: null };
}

function treasuryPercents(
  p: LotteryProductConfig["treasury"]["percents"],
): TreasuryPercents {
  return {
    prizes: BigInt(p.prizes),
    protocol: BigInt(p.protocol),
    stores: BigInt(p.stores),
    contingency: BigInt(p.contingency),
    gasOrOps: BigInt(p.gasOrOps),
  };
}

export function mapProductConfigToCandid(
  c: LotteryProductConfig,
): CandidLotteryProductConfig {
  const identity: LotteryIdentity = {
    name: c.identity.name,
    slug: c.identity.slug,
    shortDescription: c.identity.shortDescription,
    iconEmoji: c.identity.iconEmoji,
    themeColorHex: c.identity.themeColorHex,
    productCategory: productCategoryVariant(c.identity.productCategory),
    contractSchemaSemantic: c.identity.contractSchemaSemantic,
    schemaVersion: BigInt(c.identity.schemaVersion),
    lifecycle: lifecycleVariant(c.identity.lifecycle),
  };

  const schedule: ScheduleConfig = {
    cronExpression: c.schedule.cronExpression,
    timezoneIana: c.schedule.timezoneIana,
    salesStartAtIso: c.schedule.salesStartAt,
    salesCloseMinutesBeforeDraw: BigInt(c.schedule.salesCloseMinutesBeforeDraw),
    drawAtIso: c.schedule.drawAt,
    claimWindowDays: BigInt(c.schedule.claimWindowDays),
  };

  const ticket: TicketConfig = {
    pickRule: c.ticket.pickRule,
    numberMin: BigInt(c.ticket.numberMin),
    numberMax: BigInt(c.ticket.numberMax),
    basePriceMinorUnits: BigInt(Math.round(c.ticket.basePriceAmount * 100)),
    basePriceCurrency: c.ticket.basePriceCurrency,
    maxTicketsPerUser: BigInt(c.ticket.maxTicketsPerUser),
  };

  const winnerSelection: WinnerSelectionConfig = {
    algorithm: winnerAlgorithmVariant(c.winnerSelection.algorithm),
    minMatchesForPayout: BigInt(c.winnerSelection.minMatchesForPayout),
  };

  const treasury: TreasuryConfig = {
    prizeCurrency: c.treasury.prizeCurrency,
    guaranteedSeedAmount: BigInt(Math.round(c.treasury.guaranteedSeedAmount)),
    percents: treasuryPercents(c.treasury.percents),
    storeCommissionPercent: BigInt(c.treasury.storeCommissionPercent),
    protocolCommissionPercent: BigInt(c.treasury.protocolCommissionPercent),
  };

  const rng: RngConfig = {
    primary: rngStrategyVariant(c.rng.primary),
    fallback: rngStrategyVariant(c.rng.fallback),
    randomWords: BigInt(c.rng.randomWords),
  };

  const compliance: ComplianceConfig = {
    allowedCountryCodes: c.compliance.allowedCountryCodes,
    minimumAge: BigInt(c.compliance.minimumAge),
    termsUrl: c.compliance.termsUrl,
  };

  return {
    identity,
    schedule,
    ticket,
    winnerSelection,
    treasury,
    rng,
    compliance,
  };
}
