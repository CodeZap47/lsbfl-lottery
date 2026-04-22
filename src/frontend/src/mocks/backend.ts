import type { backendInterface } from "../backend";
import {
  BadgeType,
  ClaimStatus,
  DrawStatus,
  LotteryType,
  PayoutMethod,
  TicketStatus,
} from "../backend";
import type {
  AdminPublishLotteryResult,
  AdminUpsertDraftResult,
  DraftEntry,
  LotteryProductConfig as CandidLotteryProductConfig,
} from "../declarations/backend.did.d.ts";
import { Principal } from "@icp-sdk/core/principal";

const mockPrincipal = Principal.fromText("aaaaa-aa");

export const mockBackend: backendInterface = {
  claimPrize: async (_ticketId, _method) => ({
    id: "claim-001",
    status: ClaimStatus.Completed,
    method: PayoutMethod.Wallet,
    userId: mockPrincipal,
    ticketId: "ticket-001",
    claimedAt: BigInt(1700000000000000000),
    amountClaimed: BigInt(500000),
  }),

  createUser: async (name, email, country, currency, isGuest) => ({
    id: mockPrincipal,
    name,
    email: email ?? undefined,
    country,
    currency,
    isGuest,
    joinedAt: BigInt(1700000000000000000),
  }),

  getDrawByLottery: async (_lotteryId) => [
    {
      id: "draw-classic645-001",
      lotteryId: "lottery-classic645",
      drawnNumbers: [BigInt(14), BigInt(22), BigInt(37), BigInt(5), BigInt(41)],
      status: DrawStatus.Completed,
      drawnAt: BigInt(1700000000000000000),
      fairnessSeal: "SHA256:a1b2c3d4e5f6",
    },
  ],

  getLatestDraw: async (_lotteryId) => ({
    id: "draw-classic645-001",
    lotteryId: "lottery-classic645",
    drawnNumbers: [BigInt(14), BigInt(22), BigInt(37), BigInt(5), BigInt(41)],
    status: DrawStatus.Completed,
    drawnAt: BigInt(1700000000000000000),
    fairnessSeal: "SHA256:a1b2c3d4e5f6",
  }),

  getLotteries: async () => [
    {
      id: "lottery-classic645",
      name: "Classic 6/45",
      lotteryType: LotteryType.Classic645,
      drawDate: BigInt(1800000000000000000),
      prizePool: BigInt(10000000),
      ticketPrice: BigInt(50),
      isActive: true,
      participatingCountries: ["MX", "AR", "CO", "PE", "CL"],
    },
    {
      id: "lottery-daily",
      name: "Sorteo Diario",
      lotteryType: LotteryType.Daily,
      drawDate: BigInt(1800000000000000000),
      prizePool: BigInt(500000),
      ticketPrice: BigInt(20),
      isActive: true,
      participatingCountries: ["MX", "AR", "CO", "PE", "CL", "VE", "EC"],
    },
    {
      id: "lottery-nft",
      name: "Rifa NFT",
      lotteryType: LotteryType.NFTRaffle,
      drawDate: BigInt(1800000000000000000),
      prizePool: BigInt(2000000),
      ticketPrice: BigInt(100),
      isActive: true,
      participatingCountries: ["MX", "AR", "CO"],
    },
    {
      id: "lottery-noloss",
      name: "Sin Pérdida",
      lotteryType: LotteryType.NoLoss,
      drawDate: BigInt(1800000000000000000),
      prizePool: BigInt(1000000),
      ticketPrice: BigInt(30),
      isActive: true,
      participatingCountries: ["MX", "AR", "CO", "PE", "CL"],
    },
  ],

  getLotteryById: async (_id) => ({
    id: "lottery-classic645",
    name: "Classic 6/45",
    lotteryType: LotteryType.Classic645,
    drawDate: BigInt(1800000000000000000),
    prizePool: BigInt(10000000),
    ticketPrice: BigInt(50),
    isActive: true,
    participatingCountries: ["MX", "AR", "CO", "PE", "CL"],
  }),

  getMyBadges: async () => [
    {
      id: "badge-001",
      badgeType: BadgeType.Participant,
      name: "Primer Boleto",
      description: "Compraste tu primer boleto",
      earnedAt: BigInt(1700000000000000000),
    },
    {
      id: "badge-002",
      badgeType: BadgeType.Winner,
      name: "Ganador",
      description: "Ganaste un premio",
      earnedAt: BigInt(1700100000000000000),
    },
  ],

  getMyTickets: async () => [
    {
      id: "ticket-001",
      status: TicketStatus.Active,
      ownerId: mockPrincipal,
      isGifted: false,
      artSeed: BigInt(42),
      lotteryId: "lottery-classic645",
      purchasedAt: BigInt(1700000000000000000),
      numbers: [BigInt(7), BigInt(14), BigInt(22), BigInt(31), BigInt(45)],
      giftedTo: undefined,
    },
    {
      id: "ticket-002",
      status: TicketStatus.Winner,
      ownerId: mockPrincipal,
      isGifted: false,
      artSeed: BigInt(99),
      lotteryId: "lottery-daily",
      purchasedAt: BigInt(1700100000000000000),
      numbers: [BigInt(3), BigInt(9), BigInt(17)],
      giftedTo: undefined,
    },
  ],

  getStoreSales: async (_storeId) => [
    {
      id: "sale-001",
      storeId: "store-mx-cdmx-001",
      soldAt: BigInt(1700000000000000000),
      ticketIds: ["ticket-pos-001", "ticket-pos-002"],
      commission: BigInt(5000),
      totalAmount: BigInt(100000),
    },
  ],

  getStores: async () => [
    {
      id: "store-mx-cdmx-001",
      name: "LSBFL Centro CDMX",
      address: "Av. Juárez 100, Centro Histórico",
      city: "Ciudad de México",
      country: "MX",
      lat: 19.4326,
      lng: -99.1332,
      hoursOpen: "09:00–21:00",
      hasTickets: true,
      phone: "+52 55 1234 5678",
    },
    {
      id: "store-ar-bue-001",
      name: "LSBFL Buenos Aires",
      address: "Florida 600, Microcentro",
      city: "Buenos Aires",
      country: "AR",
      lat: -34.6037,
      lng: -58.3816,
      hoursOpen: "09:00–20:00",
      hasTickets: true,
      phone: "+54 11 4567 8901",
    },
    {
      id: "store-co-bog-001",
      name: "LSBFL Bogotá",
      address: "Carrera 7 # 32-15, La Candelaria",
      city: "Bogotá",
      country: "CO",
      lat: 4.7110,
      lng: -74.0721,
      hoursOpen: "09:00–19:00",
      hasTickets: true,
      phone: "+57 1 345 6789",
    },
  ],

  getStoresByCountry: async (_country) => [
    {
      id: "store-mx-cdmx-001",
      name: "LSBFL Centro CDMX",
      address: "Av. Juárez 100, Centro Histórico",
      city: "Ciudad de México",
      country: "MX",
      lat: 19.4326,
      lng: -99.1332,
      hoursOpen: "09:00–21:00",
      hasTickets: true,
      phone: "+52 55 1234 5678",
    },
  ],

  getTicketById: async (_id) => ({
    id: "ticket-001",
    status: TicketStatus.Active,
    ownerId: mockPrincipal,
    isGifted: false,
    artSeed: BigInt(42),
    lotteryId: "lottery-classic645",
    purchasedAt: BigInt(1700000000000000000),
    numbers: [BigInt(7), BigInt(14), BigInt(22), BigInt(31), BigInt(45)],
    giftedTo: undefined,
  }),

  getUser: async (_id) => ({
    id: mockPrincipal,
    name: "María González",
    email: "maria@ejemplo.com",
    country: "MX",
    currency: "MXN",
    isGuest: false,
    joinedAt: BigInt(1700000000000000000),
  }),

  getUserStats: async () => ({
    badges: ["badge-001", "badge-002"],
    totalWins: BigInt(2),
    totalWon: BigInt(750000),
    totalSpent: BigInt(500),
    totalTickets: BigInt(10),
  }),

  getWinners: async () => [
    {
      id: "winner-001",
      userId: mockPrincipal,
      displayName: "María G.",
      country: "MX",
      prizeAmount: BigInt(500000),
      lotteryName: "Classic 6/45",
      wonAt: BigInt(1700000000000000000),
      consentToShare: true,
    },
    {
      id: "winner-002",
      userId: mockPrincipal,
      displayName: "Carlos R.",
      country: "AR",
      prizeAmount: BigInt(250000),
      lotteryName: "Sorteo Diario",
      wonAt: BigInt(1700100000000000000),
      consentToShare: true,
    },
    {
      id: "winner-003",
      userId: mockPrincipal,
      displayName: "Ana P.",
      country: "CO",
      prizeAmount: BigInt(1000000),
      lotteryName: "Rifa NFT",
      wonAt: BigInt(1700200000000000000),
      consentToShare: true,
    },
  ],

  giftTicket: async (_ticketId, _recipientIdentifier) => true,

  purchaseTicket: async (lotteryId, numbers, artSeed) => ({
    id: "ticket-new-001",
    status: TicketStatus.Active,
    ownerId: mockPrincipal,
    isGifted: false,
    artSeed,
    lotteryId,
    purchasedAt: BigInt(Date.now()),
    numbers,
    giftedTo: undefined,
  }),

  recordSale: async (storeId, ticketIds, totalAmount, commission) => ({
    id: "sale-new-001",
    storeId,
    soldAt: BigInt(Date.now()),
    ticketIds,
    commission,
    totalAmount,
  }),

  updateSettings: async (_settings) => true,

  updateUserProfile: async (_name, _email, _country, _currency) => true,

  adminBootstrap: async () => {},

  adminIsCallerAuthorized: async (_caller) => true,

  adminListDraftEntries: async (): Promise<Array<DraftEntry>> => [],

  adminUpsertDraft: async (
    _config: CandidLotteryProductConfig,
  ): Promise<AdminUpsertDraftResult> => ({ ok: null }),

  adminPublishLottery: async (
    _slug: string,
  ): Promise<AdminPublishLotteryResult> => ({
    err: "mock_canister_publish",
  }),
};
