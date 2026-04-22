import type { LotteryProductConfig } from "./lotteryDraftSchema";
import { defaultLotteryProductConfig } from "./lotteryDraftSchema";

const DRAFT_KEY = "lsbfl-lottery-wizard-draft-v1";
const SNAPSHOT_KEY = "lsbfl-lottery-wizard-draft-snapshot-v1";

export function loadDraftFromStorage(): LotteryProductConfig | null {
  if (typeof localStorage === "undefined") return null;
  try {
    const raw = localStorage.getItem(DRAFT_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as LotteryProductConfig;
  } catch {
    return null;
  }
}

export function saveDraftToStorage(config: LotteryProductConfig): void {
  if (typeof localStorage === "undefined") return;
  localStorage.setItem(DRAFT_KEY, JSON.stringify(config));
}

export function clearDraftStorage(): void {
  if (typeof localStorage === "undefined") return;
  localStorage.removeItem(DRAFT_KEY);
}

export function loadOrCreateDraft(): LotteryProductConfig {
  return loadDraftFromStorage() ?? defaultLotteryProductConfig();
}

/** Baseline for diff viewer (last explicit snapshot). */
export function loadSnapshotFromStorage(): LotteryProductConfig | null {
  if (typeof localStorage === "undefined") return null;
  try {
    const raw = localStorage.getItem(SNAPSHOT_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as LotteryProductConfig;
  } catch {
    return null;
  }
}

export function saveSnapshotToStorage(config: LotteryProductConfig): void {
  if (typeof localStorage === "undefined") return;
  localStorage.setItem(SNAPSHOT_KEY, JSON.stringify(config));
}

export function exportDraftJson(config: LotteryProductConfig): string {
  return JSON.stringify(config, null, 2);
}
