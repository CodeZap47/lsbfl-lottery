import { z } from "zod";

/** Must match Motoko `adminPublishLottery` accepted versions. */
export const SUPPORTED_SCHEMA_VERSION = 1 as const;

export const lifecycleStateSchema = z.enum([
  "draft",
  "scheduled",
  "live",
  "paused",
  "archived",
]);

export const productCategorySchema = z.enum([
  "classic",
  "no-loss",
  "raffle-nft",
  "progressive",
  "instant-win",
]);

export const frequencyTypeSchema = z.enum([
  "one-shot",
  "recurring",
  "progressive-rolling",
  "threshold-triggered",
]);

export const ticketFormatSchema = z.enum([
  "icrc-nft",
  "internal-mapping",
  "icrc-ledger-pool-token",
  "legacy-erc721-ref",
]);

export const saleChannelSchema = z.enum(["online", "pos", "both"]);

export const winnerAlgorithmSchema = z.enum([
  "match_N_numbers",
  "random_weighted_by_balance",
  "random_single_winner",
  "top_K_winners",
  "tiered",
]);

export const tiePolicySchema = z.enum([
  "split-equally",
  "random-among-tied",
  "all-winners-full-prize",
]);

export const prizePayoutModeSchema = z.enum(["auto-push", "pull"]);

export const unclaimedPolicySchema = z.enum([
  "rollover",
  "burn",
  "treasury",
  "charity",
]);

export const rngStrategySchema = z.enum([
  "icp_chain_key",
  "raw_rand",
  "commit_reveal",
  "drand_compatible",
]);

export const voucherTechSchema = z.enum(["qr-pin", "nfc", "rfid-hologram"]);

export const adminRoleSchema = z.enum([
  "SUPER_ADMIN",
  "OPERATOR",
  "POS_ROLE",
  "AUDITOR",
  "TREASURER",
  "PAUSER",
]);

const isoDateTime = z.string().min(4).describe("ISO-8601 UTC or with offset");

const treasuryPercentsSchema = z
  .object({
    prizes: z.number().int().min(0).max(100),
    protocol: z.number().int().min(0).max(100),
    stores: z.number().int().min(0).max(100),
    contingency: z.number().int().min(0).max(100),
    gasOrOps: z.number().int().min(0).max(100),
  })
  .refine(
    (p) =>
      p.prizes + p.protocol + p.stores + p.contingency + p.gasOrOps === 100,
    { message: "Treasury splits must sum to 100" },
  );

const prizeTierSchema = z.object({
  label: z.string(),
  minMatches: z.number().int().min(0),
  poolPercent: z.number().min(0).max(100),
  maxWinners: z.number().int().min(0).optional(),
});

export const lotteryIdentitySchema = z.object({
  name: z.string().min(1).max(200),
  slug: z
    .string()
    .min(1)
    .max(80)
    .regex(/^[a-z0-9][-a-z0-9]*$/, "Slug: lowercase, digits, hyphens"),
  shortDescription: z.string().max(500).default(""),
  iconEmoji: z.string().max(16).default("🍀"),
  themeColorHex: z
    .string()
    .regex(/^#[0-9A-Fa-f]{6}$/, "Use #RRGGBB")
    .default("#C9A84C"),
  productCategory: productCategorySchema,
  contractSchemaSemantic: z.string().default("0.1.0"),
  schemaVersion: z.literal(SUPPORTED_SCHEMA_VERSION),
  lifecycle: lifecycleStateSchema.default("draft"),
});

export const scheduleConfigSchema = z.object({
  frequencyType: frequencyTypeSchema,
  cronExpression: z.string().max(120).default(""),
  timezoneIana: z.string().max(64).default("America/Mexico_City"),
  salesStartAt: isoDateTime,
  salesCloseMinutesBeforeDraw: z.number().int().min(0).max(1440).default(10),
  drawAt: isoDateTime,
  claimWindowDays: z.number().int().min(1).max(3650).default(90),
  physicalRedeemPolicy: z.string().max(200).default("until_1h_before_draw"),
  rolloverPolicy: z.string().max(200).default("accumulate_next_draw"),
  blackoutIsoDates: z.array(z.string()).default([]),
});

export const ticketConfigSchema = z.object({
  format: ticketFormatSchema,
  pickRule: z.string().max(80).default("6-de-49"),
  numberMin: z.number().int().min(1).default(1),
  numberMax: z.number().int().min(2).default(49),
  userPickAllowed: z.boolean().default(true),
  defaultQuickPick: z.boolean().default(false),
  basePriceAmount: z.number().positive(),
  basePriceCurrency: z.string().max(16).default("USD"),
  dynamicPricingNote: z.string().max(200).optional(),
  physicalPriceDeltaNote: z.string().max(200).optional(),
  maxTicketsPerUser: z.number().int().min(0).default(100),
  maxTicketsTotal: z.number().int().min(0).default(0),
  minTicketsFloor: z.number().int().min(0).default(0),
  transferableResale: z.boolean().default(false),
  resaleRoyaltyPercent: z.number().min(0).max(50).default(0),
  saleChannels: z.array(saleChannelSchema).min(1).default(["both"]),
  authorizedStoreIds: z.array(z.string()).default([]),
});

export const winnerSelectionConfigSchema = z.object({
  algorithm: winnerAlgorithmSchema,
  tiers: z.array(prizeTierSchema).default([]),
  tiePolicy: tiePolicySchema.default("split-equally"),
  minMatchesForPayout: z.number().int().min(0).default(3),
  weekdayProbabilityMultiplierNote: z.string().max(200).optional(),
  kycRequiredForPrizeAbove: z.number().min(0).optional(),
});

export const treasuryConfigSchema = z.object({
  prizeCurrency: z.string().max(32).default("USD"),
  poolSource: z
    .enum(["ticket-sales", "yield-deposits", "sponsor", "mixed"])
    .default("ticket-sales"),
  guaranteedSeedAmount: z.number().min(0).default(0),
  poolCapAmount: z.number().min(0).optional(),
  percents: treasuryPercentsSchema,
  storeCommissionPercent: z.number().min(0).max(100).default(7),
  protocolCommissionPercent: z.number().min(0).max(100).default(8),
  contingencyPercent: z.number().min(0).max(100).default(5),
  donationPercent: z.number().min(0).max(100).default(0),
  payoutMode: prizePayoutModeSchema.default("pull"),
  unclaimedPolicy: unclaimedPolicySchema.default("treasury"),
});

export const rngConfigSchema = z.object({
  primary: rngStrategySchema.default("icp_chain_key"),
  fallback: rngStrategySchema.default("raw_rand"),
  randomWords: z.number().int().min(1).max(32).default(4),
  minConfirmationsNote: z.string().max(120).default("subnet-finality"),
  vrfTimeoutBlocksNote: z.string().max(120).optional(),
  auditProofUrlOrHash: z.string().max(512).optional(),
  optionalExternalSeedNote: z.string().max(200).optional(),
});

export const phygitalConfigSchema = z.object({
  enabled: z.boolean().default(true),
  voucherTechnology: voucherTechSchema.default("qr-pin"),
  pinLength: z.number().int().min(4).max(16).default(8),
  hashAlgorithmLabel: z.string().max(64).default("icp-canister-blake"),
  printTemplateNote: z.string().max(200).optional(),
  custodyModel: z.string().max(120).default("per-store-subaccount"),
  relayerPayer: z.string().max(80).default("protocol-cycles"),
  maxPhysicalStockPerStore: z.number().int().min(0).default(0),
  voucherTtlNote: z.string().max(200).optional(),
  reprintPolicy: z.string().max(200).default("no-replacement"),
});

export const complianceConfigSchema = z.object({
  allowedCountryCodes: z
    .array(z.string().length(2))
    .default(["MX", "AR", "CO"]),
  blockedCountryCodes: z.array(z.string().length(2)).default([]),
  minimumAge: z.union([z.literal(18), z.literal(21)]).default(18),
  kycThresholdAmount: z.number().min(0).default(10_000),
  kycProvider: z.string().max(64).default(""),
  taxReportingRequired: z.boolean().default(false),
  licenseJurisdictionNote: z.string().max(200).optional(),
  termsUrl: z.string().url().or(z.literal("")).default(""),
  termsContentHash: z.string().max(128).optional(),
  selfExclusionListRef: z.string().max(200).optional(),
  spendingLimitDaily: z.number().min(0).optional(),
  spendingLimitWeekly: z.number().min(0).optional(),
  spendingLimitMonthly: z.number().min(0).optional(),
});

export const governanceConfigSchema = z.object({
  rolesEnabled: z.array(adminRoleSchema).default(["OPERATOR", "PAUSER"]),
  multisigRequiredNote: z.string().max(200).optional(),
  timelockHours: z.number().int().min(0).default(48),
  immutableAfterPublishFields: z
    .array(z.string())
    .default(["winnerSelection.tiers"]),
  emergencyPauseRoles: z.array(adminRoleSchema).default(["PAUSER"]),
  refundPolicySummary: z.string().max(500).default(""),
  auditReportUrl: z.string().max(512).optional(),
  bugBountyNote: z.string().max(200).optional(),
  daoGovernanceEnabled: z.boolean().default(false),
  mevProtectionNote: z.string().max(200).optional(),
});

export const observabilityUxConfigSchema = z.object({
  chainEventNames: z
    .array(z.string())
    .default([
      "TicketSold",
      "DrawRequested",
      "DrawFulfilled",
      "WinnerSelected",
      "PrizeClaimed",
      "VoucherRedeemed",
    ]),
  webhookUrls: z.array(z.string().url()).default([]),
  kpiDashboardEnabled: z.boolean().default(true),
  userNotificationChannels: z
    .array(z.enum(["email", "sms", "push", "in-app"]))
    .default(["in-app"]),
  supportedLocales: z.array(z.string()).default(["es-MX", "en-US"]),
  drawStreamUrl: z.string().max(512).optional(),
  referralPercent: z.number().min(0).max(50).default(0),
  promoCodesNote: z.string().max(200).optional(),
  abTestFlag: z.string().max(64).optional(),
  seoTitle: z.string().max(120).optional(),
  seoDescription: z.string().max(300).optional(),
  seoOgImageUrl: z.string().max(512).optional(),
});

export const lotteryProductConfigSchema = z.object({
  identity: lotteryIdentitySchema,
  schedule: scheduleConfigSchema,
  ticket: ticketConfigSchema,
  winnerSelection: winnerSelectionConfigSchema,
  treasury: treasuryConfigSchema,
  rng: rngConfigSchema,
  phygital: phygitalConfigSchema,
  compliance: complianceConfigSchema,
  governance: governanceConfigSchema,
  observability: observabilityUxConfigSchema,
});

export type LotteryProductConfig = z.infer<typeof lotteryProductConfigSchema>;

export function defaultLotteryProductConfig(
  partial?: Partial<LotteryProductConfig>,
): LotteryProductConfig {
  const base: LotteryProductConfig = {
    identity: {
      name: "Nuevo sorteo",
      slug: "nuevo-sorteo",
      shortDescription: "",
      iconEmoji: "🍀",
      themeColorHex: "#C9A84C",
      productCategory: "classic",
      contractSchemaSemantic: "0.1.0",
      schemaVersion: SUPPORTED_SCHEMA_VERSION,
      lifecycle: "draft",
    },
    schedule: {
      frequencyType: "recurring",
      cronExpression: "0 21 * * 3,6",
      timezoneIana: "America/Mexico_City",
      salesStartAt: new Date().toISOString(),
      salesCloseMinutesBeforeDraw: 15,
      drawAt: new Date(Date.now() + 7 * 864e5).toISOString(),
      claimWindowDays: 90,
      physicalRedeemPolicy: "until_1h_before_draw",
      rolloverPolicy: "accumulate_next_draw",
      blackoutIsoDates: [],
    },
    ticket: {
      format: "internal-mapping",
      pickRule: "6-de-49",
      numberMin: 1,
      numberMax: 49,
      userPickAllowed: true,
      defaultQuickPick: false,
      basePriceAmount: 5,
      basePriceCurrency: "USD",
      maxTicketsPerUser: 100,
      maxTicketsTotal: 0,
      minTicketsFloor: 0,
      transferableResale: false,
      resaleRoyaltyPercent: 0,
      saleChannels: ["both"],
      authorizedStoreIds: [],
    },
    winnerSelection: {
      algorithm: "tiered" as const,
      tiers: [
        { label: "Jackpot", minMatches: 6, poolPercent: 60, maxWinners: 10 },
        { label: "Tier2", minMatches: 5, poolPercent: 20, maxWinners: 50 },
        { label: "Tier3", minMatches: 4, poolPercent: 12, maxWinners: 200 },
        { label: "Tier4", minMatches: 3, poolPercent: 8, maxWinners: 2000 },
      ],
      tiePolicy: "split-equally",
      minMatchesForPayout: 3,
    },
    treasury: {
      prizeCurrency: "USD",
      poolSource: "ticket-sales",
      guaranteedSeedAmount: 0,
      percents: {
        prizes: 70,
        protocol: 10,
        stores: 8,
        contingency: 7,
        gasOrOps: 5,
      },
      storeCommissionPercent: 7,
      protocolCommissionPercent: 8,
      contingencyPercent: 5,
      donationPercent: 0,
      payoutMode: "pull",
      unclaimedPolicy: "treasury",
    },
    rng: {
      primary: "icp_chain_key",
      fallback: "raw_rand",
      randomWords: 6,
      minConfirmationsNote: "subnet-finality",
    },
    phygital: {
      enabled: true,
      voucherTechnology: "qr-pin",
      pinLength: 8,
      hashAlgorithmLabel: "icp-canister-blake",
      custodyModel: "per-store-subaccount",
      relayerPayer: "protocol-cycles",
      maxPhysicalStockPerStore: 5000,
      reprintPolicy: "no-replacement",
    },
    compliance: {
      allowedCountryCodes: ["MX", "AR", "CO", "PE", "CL"],
      blockedCountryCodes: [],
      minimumAge: 18,
      kycThresholdAmount: 10_000,
      kycProvider: "",
      taxReportingRequired: false,
      termsUrl: "",
    },
    governance: {
      rolesEnabled: ["OPERATOR", "PAUSER"],
      timelockHours: 48,
      immutableAfterPublishFields: ["winnerSelection.tiers"],
      emergencyPauseRoles: ["PAUSER"],
      refundPolicySummary: "",
      daoGovernanceEnabled: false,
    },
    observability: {
      chainEventNames: [
        "TicketSold",
        "DrawRequested",
        "DrawFulfilled",
        "WinnerSelected",
        "PrizeClaimed",
        "VoucherRedeemed",
      ],
      webhookUrls: [],
      kpiDashboardEnabled: true,
      userNotificationChannels: ["in-app"],
      supportedLocales: ["es-MX", "en-US"],
      referralPercent: 0,
    },
  };
  if (!partial) return base;
  return lotteryProductConfigSchema.parse(deepMerge(base, partial));
}

function deepMerge<T extends Record<string, unknown>>(
  base: T,
  patch: Partial<T>,
): T {
  const out = { ...base } as Record<string, unknown>;
  for (const k of Object.keys(patch) as (keyof T)[]) {
    const v = patch[k];
    if (v === undefined) continue;
    if (
      v !== null &&
      typeof v === "object" &&
      !Array.isArray(v) &&
      typeof base[k] === "object" &&
      base[k] !== null &&
      !Array.isArray(base[k])
    ) {
      out[k as string] = deepMerge(
        base[k] as Record<string, unknown>,
        v as Record<string, unknown>,
      );
    } else {
      out[k as string] = v as unknown;
    }
  }
  return out as T;
}

export function validateLotteryProductConfig(
  data: unknown,
):
  | { success: true; data: LotteryProductConfig }
  | { success: false; error: z.ZodError } {
  const r = lotteryProductConfigSchema.safeParse(data);
  if (r.success) return { success: true, data: r.data };
  return { success: false, error: r.error };
}
