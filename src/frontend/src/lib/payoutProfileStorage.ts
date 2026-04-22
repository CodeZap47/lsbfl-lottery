import type { PayoutProfile } from "@/types";

export const LSBFL_PAYOUT_PROFILE_KEY = "lsbfl-payout-profile-v1";

export function defaultPayoutProfile(): PayoutProfile {
  return {
    preferredMethod: "Wallet",
    contactFullName: "",
    contactPhone: "",
    bank: {
      accountHolder: "",
      bankName: "",
      clabeOrIban: "",
      taxId: "",
    },
    preferredCity: "",
  };
}

export function loadPayoutProfile(): PayoutProfile {
  const base = defaultPayoutProfile();
  try {
    const raw = localStorage.getItem(LSBFL_PAYOUT_PROFILE_KEY);
    if (!raw) return base;
    const parsed = JSON.parse(raw) as Partial<PayoutProfile>;
    return {
      preferredMethod:
        parsed.preferredMethod === "BankTransfer" ||
        parsed.preferredMethod === "StoreCredit" ||
        parsed.preferredMethod === "Wallet"
          ? parsed.preferredMethod
          : base.preferredMethod,
      contactFullName: parsed.contactFullName ?? "",
      contactPhone: parsed.contactPhone ?? "",
      bank: {
        accountHolder: parsed.bank?.accountHolder ?? "",
        bankName: parsed.bank?.bankName ?? "",
        clabeOrIban: parsed.bank?.clabeOrIban ?? "",
        taxId: parsed.bank?.taxId ?? "",
      },
      preferredCity: parsed.preferredCity ?? "",
    };
  } catch {
    return base;
  }
}

export function savePayoutProfile(profile: PayoutProfile): void {
  localStorage.setItem(LSBFL_PAYOUT_PROFILE_KEY, JSON.stringify(profile));
}
