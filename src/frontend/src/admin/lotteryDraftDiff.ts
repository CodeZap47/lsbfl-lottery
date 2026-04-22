import type { LotteryProductConfig } from "./lotteryDraftSchema";

function flatten(
  obj: unknown,
  prefix = "",
): Array<{ path: string; value: string }> {
  if (obj === null || obj === undefined) {
    return [{ path: prefix || "(root)", value: String(obj) }];
  }
  if (typeof obj !== "object") {
    return [{ path: prefix || "(root)", value: JSON.stringify(obj) }];
  }
  if (Array.isArray(obj)) {
    return obj.flatMap((item, i) => flatten(item, `${prefix}[${i}]`));
  }
  const rows: Array<{ path: string; value: string }> = [];
  for (const [k, v] of Object.entries(obj as Record<string, unknown>)) {
    const p = prefix ? `${prefix}.${k}` : k;
    rows.push(...flatten(v, p));
  }
  return rows;
}

/** Simple path/value diff for JSON configs (testnet review / multisig preview). */
export function diffLotteryConfigs(
  before: LotteryProductConfig,
  after: LotteryProductConfig,
): { path: string; before: string; after: string }[] {
  const a = new Map(flatten(before).map((r) => [r.path, r.value]));
  const b = new Map(flatten(after).map((r) => [r.path, r.value]));
  const paths = new Set([...a.keys(), ...b.keys()]);
  const out: { path: string; before: string; after: string }[] = [];
  for (const path of paths) {
    const va = a.get(path) ?? "";
    const vb = b.get(path) ?? "";
    if (va !== vb) out.push({ path, before: va, after: vb });
  }
  out.sort((x, y) => x.path.localeCompare(y.path));
  return out;
}
