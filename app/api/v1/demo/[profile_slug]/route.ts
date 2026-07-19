import { NextResponse } from "next/server";
import {
  DETAILED_SOFTWARE_ENGINEER_PROFILE,
  sanitizeDemoData,
  transformDetailedProfile,
} from "@/lib/data/demo-profiles";

export const dynamic = "force-dynamic";

const BACKEND_URL = (process.env.NEXT_PUBLIC_API_URL || "https://jobliberty-backend.onrender.com").replace(/\/$/, "");

async function fetchUpstreamProfile(slug: string): Promise<Record<string, unknown> | null> {
  try {
    const res = await fetch(`${BACKEND_URL}/api/v1/demo/${encodeURIComponent(slug)}`, {
      headers: { Accept: "application/json" },
      next: { revalidate: 60 },
    });
    if (!res.ok) return null;
    const data = await res.json();
    return data as Record<string, unknown>;
  } catch {
    return null;
  }
}

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ profile_slug: string }> | { profile_slug: string } }
) {
  const resolvedParams = params instanceof Promise ? await params : params;
  const slug = resolvedParams.profile_slug;

  if (!slug) {
    return NextResponse.json({ detail: "Profile slug required" }, { status: 400 });
  }

  if (slug === "software_engineer") {
    // Return canonical updated profile, preserving structure
    return NextResponse.json(sanitizeDemoData(DETAILED_SOFTWARE_ENGINEER_PROFILE), {
      headers: { "Cache-Control": "no-store, must-revalidate" },
    });
  }

  // For other slugs, proxy to backend and sanitize any lingering old name
  const upstream = await fetchUpstreamProfile(slug);
  if (upstream) {
    const transformed = transformDetailedProfile(slug, upstream);
    return NextResponse.json(sanitizeDemoData(transformed), {
      headers: { "Cache-Control": "no-store, must-revalidate" },
    });
  }

  // If upstream fails and it's not software_engineer, return 404 with sanitized message
  return NextResponse.json(
    sanitizeDemoData({ detail: `Demo profile '${slug}' not found`, slug }),
    { status: 404 }
  );
}
