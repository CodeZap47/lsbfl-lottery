const PAYOUT_OPTIONS = [
  {
    key: "Wallet",
    icon: "💳",
    titleEs: "Cartera digital",
    titleEn: "Digital wallet",
    subtitleEs: "Instantáneo",
    subtitleEn: "Instant",
    linkEs: "Recargar saldo",
    linkEn: "Add funds",
    linkTo: "/wallet/deposit"
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
    linkTo: "/help"
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
    linkTo: "/map"
  }
];
const LSBFL_PAYOUT_PROFILE_KEY = "lsbfl-payout-profile-v1";
function defaultPayoutProfile() {
  return {
    preferredMethod: "Wallet",
    contactFullName: "",
    contactPhone: "",
    bank: {
      accountHolder: "",
      bankName: "",
      clabeOrIban: "",
      taxId: ""
    },
    preferredCity: ""
  };
}
function loadPayoutProfile() {
  var _a, _b, _c, _d;
  const base = defaultPayoutProfile();
  try {
    const raw = localStorage.getItem(LSBFL_PAYOUT_PROFILE_KEY);
    if (!raw) return base;
    const parsed = JSON.parse(raw);
    return {
      preferredMethod: parsed.preferredMethod === "BankTransfer" || parsed.preferredMethod === "StoreCredit" || parsed.preferredMethod === "Wallet" ? parsed.preferredMethod : base.preferredMethod,
      contactFullName: parsed.contactFullName ?? "",
      contactPhone: parsed.contactPhone ?? "",
      bank: {
        accountHolder: ((_a = parsed.bank) == null ? void 0 : _a.accountHolder) ?? "",
        bankName: ((_b = parsed.bank) == null ? void 0 : _b.bankName) ?? "",
        clabeOrIban: ((_c = parsed.bank) == null ? void 0 : _c.clabeOrIban) ?? "",
        taxId: ((_d = parsed.bank) == null ? void 0 : _d.taxId) ?? ""
      },
      preferredCity: parsed.preferredCity ?? ""
    };
  } catch {
    return base;
  }
}
function savePayoutProfile(profile) {
  localStorage.setItem(LSBFL_PAYOUT_PROFILE_KEY, JSON.stringify(profile));
}
export {
  PAYOUT_OPTIONS as P,
  loadPayoutProfile as l,
  savePayoutProfile as s
};
