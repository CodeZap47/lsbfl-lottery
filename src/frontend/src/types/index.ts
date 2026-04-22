// ─── Enums ────────────────────────────────────────────────────────────────────

export type LotteryType = "Classic645" | "Daily" | "NFTRaffle" | "NoLoss";
export type TicketStatus =
  | "Unclaimed"
  | "Active"
  | "InDraw"
  | "Winner"
  | "Lost";
export type DrawStatus = "Upcoming" | "InProgress" | "Completed";
export type PayoutMethod = "Wallet" | "BankTransfer" | "StoreCredit" | "Crypto";
/** Métodos mostrados en premios y perfil de cobro */
export type PrizePayoutMethod = Extract<
  PayoutMethod,
  "Wallet" | "BankTransfer" | "StoreCredit"
>;
export type Language = "es" | "en";

export interface PayoutBankDetails {
  accountHolder: string;
  bankName: string;
  clabeOrIban: string;
  /** RFC u otro identificador fiscal (opcional) */
  taxId?: string;
}

export interface PayoutProfile {
  preferredMethod: PrizePayoutMethod;
  /** Nombre completo para verificación / liquidación (todos los métodos) */
  contactFullName: string;
  /** Teléfono de contacto para seguimiento del cobro */
  contactPhone: string;
  bank: PayoutBankDetails;
  /** Ciudad o sucursal preferida para cobro en tienda */
  preferredCity: string;
}

// ─── Core Entities ─────────────────────────────────────────────────────────────

export interface User {
  id: string;
  name: string;
  email: string;
  country: string;
  countryCode: string;
  avatarUrl?: string;
  balance: number;
  currency: string;
  ticketsBought: number;
  wins: number;
  badges: Badge[];
  joinedAt: string;
}

export interface Lottery {
  id: string;
  name: string;
  nameEs: string;
  type: LotteryType;
  description: string;
  descriptionEs: string;
  price: number;
  currency: string;
  jackpot: number;
  jackpotFormatted: string;
  drawDate: string;
  drawDateFormatted: string;
  odds: string;
  numbersToSelect: number;
  maxNumber: number;
  nextDrawId: string;
  coverColor: string;
  accentColor: string;
  logoEmoji: string;
  tags: string[];
}

export interface Draw {
  id: string;
  lotteryId: string;
  lotteryName: string;
  status: DrawStatus;
  scheduledAt: string;
  completedAt?: string;
  drawnNumbers: number[];
  jackpot: number;
  jackpotFormatted: string;
  totalTickets: number;
  winnersCount: number;
}

export interface Ticket {
  id: string;
  lotteryId: string;
  lotteryName: string;
  lotteryNameEs: string;
  drawId: string;
  userId: string;
  numbers: number[];
  status: TicketStatus;
  purchasedAt: string;
  drawDate: string;
  price: number;
  currency: string;
  serialCode: string;
  isPhygital: boolean;
  matchedNumbers?: number[];
  prizeAmount?: number;
}

export interface Store {
  id: string;
  name: string;
  address: string;
  city: string;
  country: string;
  countryCode: string;
  lat: number;
  lng: number;
  phone: string;
  hours: string;
  isOpen: boolean;
  hasActiveDraw: boolean;
}

export interface POSSale {
  id: string;
  storeId: string;
  ticketId: string;
  amount: number;
  currency: string;
  soldAt: string;
  customerRef: string;
}

export interface Winner {
  id: string;
  name: string;
  country: string;
  countryCode: string;
  prize: number;
  prizeFormatted: string;
  currency: string;
  lotteryName: string;
  wonAt: string;
  message: string;
  messageEs: string;
  avatarColor: string;
}

export interface Badge {
  id: string;
  name: string;
  nameEs: string;
  emoji: string;
  description: string;
  earnedAt: string;
}

export interface PrizeClaim {
  id: string;
  ticketId: string;
  userId: string;
  amount: number;
  currency: string;
  method: PayoutMethod;
  status: "Pending" | "Processing" | "Completed" | "Failed";
  claimedAt: string;
  completedAt?: string;
}

// ─── UI / App Types ────────────────────────────────────────────────────────────

export interface NavItem {
  path: string;
  labelEs: string;
  labelEn: string;
  icon: string;
  showInBottom: boolean;
}

export interface MockData {
  user: User;
  lotteries: Lottery[];
  draws: Draw[];
  tickets: Ticket[];
  stores: Store[];
  winners: Winner[];
}
