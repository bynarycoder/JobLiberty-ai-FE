/**
 * Lightweight client-side profile store.
 *
 * When the backend publishes an auth endpoint this module will be replaced
 * by a real session call.  Until then it keeps the last-known user info in
 * localStorage so the DashboardTopbar and Settings page never display
 * hard-coded names or e-mails.
 */

const STORAGE_KEY = "jobliberty_user_profile";

export interface StoredProfile {
  name: string;
  email: string;
  location?: string;
  role?: string;
}

function read(): StoredProfile | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as StoredProfile;
  } catch {
    return null;
  }
}

function write(profile: StoredProfile): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(profile));
  } catch {
    /* quota exceeded – silently ignore */
  }
}

function clear(): void {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem(STORAGE_KEY);
}

/** Return the stored profile or a safe guest fallback. */
export function getUserProfile(): StoredProfile {
  return read() ?? { name: "Guest User", email: "guest@jobliberty.ai" };
}

/** Persist profile info (e.g. after sign-up). */
export function setUserProfile(profile: StoredProfile): void {
  write(profile);
}

/** Wipe profile (e.g. on logout). */
export function clearUserProfile(): void {
  clear();
}

/** Derive initials from a full name. */
export function getInitials(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "GU";
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}
