import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export type Timestamp = bigint;
export interface POSSale {
    id: string;
    soldAt: Timestamp;
    storeId: StoreId;
    ticketIds: Array<TicketId>;
    commission: bigint;
    totalAmount: bigint;
}
export interface UserPublic {
    id: UserId;
    country: string;
    isGuest: boolean;
    name: string;
    joinedAt: Timestamp;
    email?: string;
    currency: string;
}
export interface Lottery {
    id: LotteryId;
    lotteryType: LotteryType;
    name: string;
    drawDate: Timestamp;
    isActive: boolean;
    participatingCountries: Array<string>;
    ticketPrice: bigint;
    prizePool: bigint;
}
export interface Draw {
    id: DrawId;
    status: DrawStatus;
    drawnNumbers: Array<bigint>;
    fairnessSeal: string;
    lotteryId: LotteryId;
    drawnAt?: Timestamp;
}
export type DrawId = string;
export type LotteryId = string;
export type TicketId = string;
export interface Badge {
    id: string;
    badgeType: BadgeType;
    name: string;
    description: string;
    earnedAt: Timestamp;
}
export type UserId = Principal;
export type StoreId = string;
export interface Winner {
    id: string;
    lotteryName: string;
    country: string;
    consentToShare: boolean;
    displayName: string;
    prizeAmount: bigint;
    userId: UserId;
    wonAt: Timestamp;
}
export interface UserSettings {
    notificationsEnabled: boolean;
    country: string;
    language: string;
    currency: string;
}
export interface Ticket {
    id: TicketId;
    status: TicketStatus;
    ownerId: UserId;
    isGifted: boolean;
    artSeed: bigint;
    lotteryId: LotteryId;
    purchasedAt: Timestamp;
    numbers: Array<bigint>;
    giftedTo?: string;
}
export interface PrizeClaim {
    id: string;
    status: ClaimStatus;
    method: PayoutMethod;
    userId: UserId;
    ticketId: TicketId;
    claimedAt: Timestamp;
    amountClaimed: bigint;
}
export interface Store {
    id: StoreId;
    lat: number;
    lng: number;
    country: string;
    city: string;
    name: string;
    hoursOpen: string;
    address: string;
    hasTickets: boolean;
    phone?: string;
}
export interface UserStats {
    badges: Array<string>;
    totalWins: bigint;
    totalWon: bigint;
    totalSpent: bigint;
    totalTickets: bigint;
}
export enum BadgeType {
    Gifter = "Gifter",
    MegaWinner = "MegaWinner",
    Participant = "Participant",
    Winner = "Winner"
}
export enum ClaimStatus {
    Processing = "Processing",
    Completed = "Completed",
    Pending = "Pending"
}
export enum DrawStatus {
    InProgress = "InProgress",
    Completed = "Completed",
    Upcoming = "Upcoming"
}
export enum LotteryType {
    NoLoss = "NoLoss",
    Classic645 = "Classic645",
    Daily = "Daily",
    NFTRaffle = "NFTRaffle"
}
export enum PayoutMethod {
    BankTransfer = "BankTransfer",
    Crypto = "Crypto",
    Wallet = "Wallet",
    StoreCredit = "StoreCredit"
}
export enum TicketStatus {
    Unclaimed = "Unclaimed",
    Lost = "Lost",
    Active = "Active",
    Winner = "Winner",
    InDraw = "InDraw"
}
export interface backendInterface {
    claimPrize(ticketId: TicketId, method: PayoutMethod): Promise<PrizeClaim | null>;
    createUser(name: string, email: string | null, country: string, currency: string, isGuest: boolean): Promise<UserPublic>;
    getDrawByLottery(lotteryId: LotteryId): Promise<Array<Draw>>;
    getLatestDraw(lotteryId: LotteryId): Promise<Draw | null>;
    getLotteries(): Promise<Array<Lottery>>;
    getLotteryById(id: LotteryId): Promise<Lottery | null>;
    getMyBadges(): Promise<Array<Badge>>;
    getMyTickets(): Promise<Array<Ticket>>;
    getStoreSales(storeId: StoreId): Promise<Array<POSSale>>;
    getStores(): Promise<Array<Store>>;
    getStoresByCountry(country: string): Promise<Array<Store>>;
    getTicketById(id: TicketId): Promise<Ticket | null>;
    getUser(id: UserId): Promise<UserPublic | null>;
    getUserStats(): Promise<UserStats | null>;
    getWinners(): Promise<Array<Winner>>;
    giftTicket(ticketId: TicketId, recipientIdentifier: string): Promise<boolean>;
    purchaseTicket(lotteryId: LotteryId, numbers: Array<bigint>, artSeed: bigint): Promise<Ticket>;
    recordSale(storeId: StoreId, ticketIds: Array<TicketId>, totalAmount: bigint, commission: bigint): Promise<POSSale>;
    updateSettings(settings: UserSettings): Promise<boolean>;
    updateUserProfile(name: string | null, email: string | null, country: string | null, currency: string | null): Promise<boolean>;
}
