"use client";

import React from "react";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { User as UserIcon, Mail, MapPin, Save, Loader2, Shield, LogOut } from "lucide-react";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import { PageHero } from "@/components/dashboard/PageHero";
import { Button } from "@/components/ui/Button";
import { useAuth } from "@/contexts/AuthContext";
import { useUpdateProfileLocal } from "@/lib/hooks/useAuthQueries";

const inputCls =
  "h-[46px] w-full rounded-[13px] border border-border bg-card/80 pl-11 pr-4 text-[14px] font-[450] tracking-[-0.01em] text-foreground shadow-sm transition-all placeholder:text-muted-foreground/70 hover:border-border-strong focus:border-[#2563EB]/50 focus:outline-none focus:ring-4 focus:ring-[#2563EB]/10 disabled:opacity-60";

function getInitials(name: string) {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (!parts.length) return "JL";
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

function ProfileInner() {
  const { user, logout, loading } = useAuth();
  const updateProfile = useUpdateProfileLocal();

  const userKey = user?.id ?? "";
  const [name, setName] = React.useState(user?.fullName || user?.name || "");
  const [location, setLocation] = React.useState(user?.location || "");
  const [saving, setSaving] = React.useState(false);
  const lastUserKeyRef = React.useRef(userKey);

  // Reset form fields when the underlying user identity changes (e.g. after
  // /me refresh or profile save). Setting state during render is the
  // recommended pattern for "derived on change" state.
  if (lastUserKeyRef.current !== userKey) {
    lastUserKeyRef.current = userKey;
    setName(user?.fullName || user?.name || "");
    setLocation(user?.location || "");
  }

  if (!user) return null;

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      await updateProfile.mutateAsync({
        fullName: name.trim(),
        name: name.trim(),
        location: location.trim() || undefined,
      });
      toast.success("Profile updated.");
    } catch (err) {
      toast.error((err as Error).message || "Could not update profile.");
    } finally {
      setSaving(false);
    }
  };

  const initials = getInitials(user.fullName || user.name || user.email);

  return (
    <div className="space-y-6">
      <PageHero
        gradient="blue"
        icon={UserIcon}
        eyebrow="Account • Profile"
        title="Your Profile"
        subtitle="Manage your JobLiberty identity — the info shown across the app."
        stats={[
          { label: "Signed in as", value: user.email },
          { label: "Role", value: user.role || "Member" },
          { label: "Location", value: user.location || "—" },
        ]}
      />

      <motion.section
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="grid gap-5 lg:grid-cols-[minmax(0,320px)_1fr]"
      >
        {/* Avatar card */}
        <div className="rounded-[22px] border bg-card p-6 shadow-sm">
          <div className="flex flex-col items-center text-center">
            <div className="flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-[#7C3AED] via-[#4F46E5] to-[#2563EB] text-[28px] font-bold text-white shadow-lg">
              {initials}
            </div>
            <div className="mt-4 text-[16px] font-bold tracking-[-0.01em]">{user.fullName || user.name || user.email}</div>
            <div className="mt-0.5 text-[12.5px] font-medium text-muted-foreground">{user.email}</div>
            <div className="mt-4 inline-flex items-center gap-1.5 rounded-full bg-[#EFF6FF] px-3 py-1 text-[11px] font-bold text-[#1D4ED8] ring-1 ring-[#DBEAFE] dark:bg-[#1E3A8A]/30 dark:text-[#93C5FD] dark:ring-[#1E3A8A]/40">
              <Shield className="h-3 w-3" /> Authenticated
            </div>
          </div>

          <div className="mt-6 border-t border-border/60 pt-4">
            <Button
              variant="outline"
              className="w-full gap-2 rounded-full text-[#DC2626] dark:text-[#F98B8B]"
              onClick={() => logout()}
              disabled={loading}
            >
              <LogOut className="h-4 w-4" /> Sign out
            </Button>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSave} className="rounded-[22px] border bg-card p-6 shadow-sm space-y-5">
          <div>
            <h3 className="text-[15px] font-bold tracking-[-0.01em]">Personal details</h3>
            <p className="mt-0.5 text-[12px] font-medium text-muted-foreground">
              These appear on your resume analysis, chat, and dashboard.
            </p>
          </div>

          <div>
            <label className="mb-1.5 block text-[12.5px] font-bold tracking-[-0.01em]">Full name</label>
            <div className="relative">
              <UserIcon className="pointer-events-none absolute left-3.5 top-1/2 h-[16px] w-[16px] -translate-y-1/2 text-muted-foreground" />
              <input value={name} onChange={(e) => setName(e.target.value)} className={inputCls} placeholder="Your full name" disabled={saving} />
            </div>
          </div>

          <div>
            <label className="mb-1.5 block text-[12.5px] font-bold tracking-[-0.01em]">Email</label>
            <div className="relative">
              <Mail className="pointer-events-none absolute left-3.5 top-1/2 h-[16px] w-[16px] -translate-y-1/2 text-muted-foreground" />
              <input value={user.email} readOnly className={`${inputCls} cursor-not-allowed opacity-70`} />
            </div>
            <p className="mt-1 text-[11px] font-medium text-muted-foreground">Email changes must be made through support.</p>
          </div>

          <div>
            <label className="mb-1.5 block text-[12.5px] font-bold tracking-[-0.01em]">Location</label>
            <div className="relative">
              <MapPin className="pointer-events-none absolute left-3.5 top-1/2 h-[16px] w-[16px] -translate-y-1/2 text-muted-foreground" />
              <input value={location} onChange={(e) => setLocation(e.target.value)} className={inputCls} placeholder="City, Country" disabled={saving} />
            </div>
          </div>

          <div className="flex justify-end pt-2">
            <Button type="submit" className="gap-2 rounded-full px-5" disabled={saving}>
              {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
              {saving ? "Saving…" : "Save changes"}
            </Button>
          </div>
        </form>
      </motion.section>
    </div>
  );
}

export default function ProfilePage() {
  return (
    <ProtectedRoute>
      <ProfileInner />
    </ProtectedRoute>
  );
}
