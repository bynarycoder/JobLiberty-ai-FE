/**
 * Defensive mappers that accept either camelCase or snake_case payloads
 * from the production FastAPI backend without inventing business logic.
 */

type UnknownRecord = Record<string, unknown>;

function isRecord(value: unknown): value is UnknownRecord {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

export function asRecord(value: unknown): UnknownRecord {
  return isRecord(value) ? value : {};
}

export function pick<T = unknown>(obj: unknown, ...keys: string[]): T | undefined {
  const record = asRecord(obj);
  for (const key of keys) {
    if (record[key] !== undefined && record[key] !== null) return record[key] as T;
  }
  return undefined;
}

export function asString(value: unknown, fallback = ""): string {
  if (typeof value === "string") return value;
  if (typeof value === "number" || typeof value === "boolean") return String(value);
  return fallback;
}

export function asNumber(value: unknown, fallback = 0): number {
  if (typeof value === "number" && Number.isFinite(value)) return value;
  if (typeof value === "string" && value.trim() !== "") {
    const n = Number(value);
    if (Number.isFinite(n)) return n;
  }
  return fallback;
}

export function asBoolean(value: unknown, fallback = false): boolean {
  if (typeof value === "boolean") return value;
  if (value === "true" || value === 1 || value === "1") return true;
  if (value === "false" || value === 0 || value === "0") return false;
  return fallback;
}

export function asStringArray(value: unknown): string[] {
  if (!Array.isArray(value)) {
    if (typeof value === "string" && value.trim()) return [value.trim()];
    return [];
  }
  return value
    .map((item) => {
      if (typeof item === "string") return item;
      if (isRecord(item)) return asString(pick(item, "name", "skill", "title", "value", "label"));
      return "";
    })
    .filter(Boolean);
}

export function asArray(value: unknown): unknown[] {
  if (Array.isArray(value)) return value;
  if (!isRecord(value)) return [];
  for (const key of [
    "items",
    "results",
    "data",
    "jobs",
    "opportunities",
    "recommendations",
    "profiles",
    "steps",
    "stages",
    "milestones",
  ]) {
    if (Array.isArray(value[key])) return value[key] as unknown[];
  }
  return [];
}

export function firstString(...values: unknown[]): string {
  for (const value of values) {
    const s = asString(value).trim();
    if (s) return s;
  }
  return "";
}

export function scoreOf(value: unknown, ...keys: string[]): number {
  const direct = keys.length ? pick(value, ...keys) : value;
  const n = asNumber(direct, NaN);
  if (Number.isFinite(n)) return Math.max(0, Math.min(100, Math.round(n)));
  return 0;
}
