export const LSBFL_PROFILE_ACCOUNT_KEY = "lsbfl-profile-account-v1";

export interface ProfileAccountStored {
  email: string;
  countryCode: string;
  currency: string;
}

export function loadProfileAccount(
  defaults: ProfileAccountStored,
  opts: {
    validCountryCodes: readonly string[];
    validCurrencies: readonly string[];
  },
): ProfileAccountStored {
  try {
    const raw = localStorage.getItem(LSBFL_PROFILE_ACCOUNT_KEY);
    if (!raw) return defaults;
    const parsed = JSON.parse(raw) as Partial<ProfileAccountStored>;
    const email =
      typeof parsed.email === "string" ? parsed.email : defaults.email;
    const countryCode =
      typeof parsed.countryCode === "string" &&
      opts.validCountryCodes.includes(parsed.countryCode)
        ? parsed.countryCode
        : defaults.countryCode;
    const currency =
      typeof parsed.currency === "string" &&
      opts.validCurrencies.includes(parsed.currency)
        ? parsed.currency
        : defaults.currency;
    return { email, countryCode, currency };
  } catch {
    return defaults;
  }
}

export function saveProfileAccount(data: ProfileAccountStored): void {
  localStorage.setItem(LSBFL_PROFILE_ACCOUNT_KEY, JSON.stringify(data));
}
