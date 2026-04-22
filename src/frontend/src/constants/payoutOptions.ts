import type { PrizePayoutMethod } from "@/types";

export interface PayoutOption {
  key: PrizePayoutMethod;
  icon: string;
  titleEs: string;
  titleEn: string;
  subtitleEs: string;
  subtitleEn: string;
  linkEs?: string;
  linkEn?: string;
  linkTo?: string;
}

export const PAYOUT_OPTIONS: PayoutOption[] = [
  {
    key: "Wallet",
    icon: "💳",
    titleEs: "Cartera digital",
    titleEn: "Digital wallet",
    subtitleEs: "Instantáneo",
    subtitleEn: "Instant",
    linkEs: "Recargar saldo",
    linkEn: "Add funds",
    linkTo: "/wallet/deposit",
  },
  {
    key: "BankTransfer",
    icon: "🏦",
    titleEs: "Transferencia bancaria",
    titleEn: "Bank transfer",
    subtitleEs: "2–5 días hábiles",
    subtitleEn: "2–5 business days",
    linkEs: "Ayuda e instrucciones",
    linkEn: "Help and instructions",
    linkTo: "/help",
  },
  {
    key: "StoreCredit",
    icon: "🏪",
    titleEs: "En tienda física",
    titleEn: "At physical store",
    subtitleEs: "Ver tiendas",
    subtitleEn: "See stores",
    linkEs: "Ver tiendas",
    linkEn: "See stores",
    linkTo: "/map",
  },
];
