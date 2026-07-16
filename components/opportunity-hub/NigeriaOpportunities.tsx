"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useI18n } from "@/providers/I18nProvider";
import { Card, CardContent, CardFooter } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import {
  MapPin,
  Building2,
  ExternalLink,
  Bookmark,
  RefreshCw,
  Cpu,
  GraduationCap,
  Briefcase,
  Rocket,
  Globe,
  BookOpen,
  Trophy,
  Code2,
  Sparkles,
  Flag,
  Users,
  Calendar,
  Handshake,
  Laptop,
  CheckCircle2,
  ArrowRight,
  TrendingUp,
} from "lucide-react";
import {
  NIGERIA_FEATURED_CATEGORIES,
  NIGERIA_STATE_OPPORTUNITIES,
  NIGERIA_POPULAR_INDUSTRIES,
  NIGERIA_COMMUNITY_EVENTS,
  NIGERIA_FEATURED_ORGANIZATIONS,
  NIGERIA_AI_RECOMMENDATIONS,
} from "@/services/nigeria-opportunities";
import type {
  NigeriaFeaturedCategory,
  NigeriaStateOpportunity,
  NigeriaPopularIndustry,
  NigeriaCommunityEvent,
  NigeriaOrganization,
  NigeriaAIRecommendation,
} from "@/types/nigeria-opportunity";

interface NigeriaOpportunitiesProps {
  opportunities: any[];
  isLoading: boolean;
  city: string;
  workMode: string;
  onCityChange: (city: string) => void;
  onWorkModeChange: (mode: any) => void;
  bookmarkedIds: Set<string>;
  onToggleBookmark: (id: string) => void;
}

// Icon mapping helper
function CategoryIcon({ name, className }: { name: string; className?: string }) {
  switch (name) {
    case "Flag":
      return <Flag className={className} />;
    case "GraduationCap":
      return <GraduationCap className={className} />;
    case "Briefcase":
      return <Briefcase className={className} />;
    case "Rocket":
      return <Rocket className={className} />;
    case "Globe":
      return <Globe className={className} />;
    case "Cpu":
      return <Cpu className={className} />;
    case "BookOpen":
      return <BookOpen className={className} />;
    case "Trophy":
      return <Trophy className={className} />;
    case "Code2":
      return <Code2 className={className} />;
    case "Sparkles":
      return <Sparkles className={className} />;
    case "Users":
      return <Users className={className} />;
    case "Calendar":
      return <Calendar className={className} />;
    case "Handshake":
      return <Handshake className={className} />;
    case "Laptop":
      return <Laptop className={className} />;
    default:
      return <Sparkles className={className} />;
  }
}

export function NigeriaOpportunities({
  bookmarkedIds,
  onToggleBookmark,
}: NigeriaOpportunitiesProps) {
  const { t, language } = useI18n();

  // Component states
  const [dataState, setDataState] = useState<"populated" | "empty">("populated");
  const [localLoading, setLocalLoading] = useState<boolean>(false);
  const [selectedState, setSelectedState] = useState<string | null>(null);
  const [selectedIndustry, setSelectedIndustry] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<string>("all");
  const [successToast, setSuccessToast] = useState<string | null>(null);

  // Local bookmark states
  const [localBookmarks, setLocalBookmarks] = useState<Set<string>>(new Set(bookmarkedIds));

  const handleToggleBookmark = (id: string) => {
    const updated = new Set(localBookmarks);
    if (updated.has(id)) {
      updated.delete(id);
      showToast("Removed from bookmarks");
    } else {
      updated.add(id);
      showToast("Saved to bookmarks!");
    }
    setLocalBookmarks(updated);
    if (onToggleBookmark) {
      onToggleBookmark(id);
    }
  };

  const showToast = (message: string) => {
    setSuccessToast(message);
    setTimeout(() => setSuccessToast(null), 3000);
  };

  const triggerRefresh = () => {
    setLocalLoading(true);
    setTimeout(() => {
      setLocalLoading(false);
      setDataState("populated");
      showToast("Opportunities reloaded successfully!");
    }, 1500);
  };

  const handleStateClick = (stateName: string) => {
    setSelectedState(selectedState === stateName ? null : stateName);
    showToast(`Filtering opportunities in ${stateName}`);
  };

  const handleIndustryClick = (indId: string) => {
    setSelectedIndustry(selectedIndustry === indId ? null : indId);
  };

  // Keyboard navigation helpers
  const handleKeyDown = (e: React.KeyboardEvent, callback: () => void) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      callback();
    }
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring" as const, stiffness: 100, damping: 15 },
    },
  };

  if (localLoading) {
    return (
      <div className="space-y-8 py-10" aria-busy="true" aria-label={t("opportunityHub.madeForNigerians.loading")}>
        <div className="flex flex-col items-center justify-center space-y-4 py-12">
          <RefreshCw className="h-10 w-10 animate-spin text-emerald-600 dark:text-emerald-400" />
          <p className="text-sm font-medium text-muted-foreground animate-pulse">
            {t("opportunityHub.madeForNigerians.loading")}
          </p>
        </div>

        {/* Categories Skeletons */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {Array.from({ length: 8 }).map((_, idx) => (
            <Card key={idx} className="h-48 animate-pulse border-zinc-200 dark:border-zinc-800">
              <CardContent className="p-5 space-y-4">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-zinc-200 dark:bg-zinc-800" />
                  <div className="h-4 w-32 rounded bg-zinc-200 dark:bg-zinc-800" />
                </div>
                <div className="space-y-2">
                  <div className="h-3 w-full rounded bg-zinc-200 dark:bg-zinc-800" />
                  <div className="h-3 w-5/6 rounded bg-zinc-200 dark:bg-zinc-800" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  if (dataState === "empty") {
    return (
      <div className="rounded-3xl border border-dashed border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/20 p-12 text-center my-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex flex-col items-center max-w-md mx-auto"
        >
          <div className="relative mb-6">
            <span className="text-6xl filter drop-shadow-md">🇳🇬</span>
            <div className="absolute -bottom-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full bg-red-500 text-white text-xs font-bold border-2 border-white dark:border-zinc-900">
              !
            </div>
          </div>
          <h3 className="text-xl font-bold tracking-tight mb-2 text-foreground">
            {t("opportunityHub.madeForNigerians.emptyState")}
          </h3>
          <p className="text-sm text-muted-foreground mb-6">
            Our AI engine is currently fetching the latest specialized local programs. Click refresh to query the database.
          </p>
          <Button
            onClick={triggerRefresh}
            className="rounded-xl px-6 bg-emerald-600 hover:bg-emerald-700 text-white flex items-center gap-2 shadow-md transition-all active:scale-95"
            aria-label="Refresh opportunities"
          >
            <RefreshCw className="h-4 w-4" />
            {t("opportunityHub.madeForNigerians.refresh")}
          </Button>

          <Button
            variant="ghost"
            size="sm"
            onClick={() => setDataState("populated")}
            className="mt-4 text-xs text-muted-foreground hover:text-foreground"
          >
            Switch to populated view
          </Button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="space-y-12">
      {/* Toast Notification Container */}
      <AnimatePresence>
        {successToast && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="fixed bottom-6 right-6 z-50 flex items-center gap-2 rounded-2xl bg-zinc-900 px-4 py-3 text-sm font-medium text-white shadow-xl dark:bg-zinc-50 dark:text-zinc-900"
            role="alert"
          >
            <CheckCircle2 className="h-4 w-4 text-emerald-500" />
            <span>{successToast}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* SECTION HEADER & CONTROL BAR */}
      <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between border-b border-zinc-100 dark:border-zinc-800 pb-6">
        <div className="space-y-3">
          <div className="flex items-center gap-2.5">
            <span className="text-3xl filter drop-shadow-sm" aria-hidden="true">
              🇳🇬
            </span>
            <span className="rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-400">
              Premium Highlight
            </span>
          </div>
          <h2 className="text-3xl font-extrabold tracking-tight bg-gradient-to-r from-zinc-900 via-emerald-800 to-zinc-900 bg-clip-text text-transparent dark:from-zinc-100 dark:via-emerald-400 dark:to-zinc-100">
            {t("opportunityHub.madeForNigerians.title")}
          </h2>
          <p className="max-w-2xl text-base text-muted-foreground leading-relaxed">
            {t("opportunityHub.madeForNigerians.subtitle")}
          </p>
        </div>

        {/* Premium Control Panel for Simulator */}
        <div className="flex flex-wrap items-center gap-2.5">
          <div className="flex items-center rounded-xl border border-zinc-200 bg-zinc-50/50 p-1 dark:border-zinc-800 dark:bg-zinc-900/40">
            <button
              onClick={() => setDataState("populated")}
              className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition-all ${
                dataState === "populated"
                  ? "bg-white text-zinc-950 shadow-sm dark:bg-zinc-800 dark:text-zinc-50"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              🔥 Active Hub
            </button>
            <button
              onClick={() => setDataState("empty")}
              className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition-all ${
                (dataState as string) === "empty"
                  ? "bg-white text-zinc-950 shadow-sm dark:bg-zinc-800 dark:text-zinc-50"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              📭 Empty State
            </button>
          </div>

          <Button
            variant="outline"
            size="sm"
            onClick={triggerRefresh}
            className="rounded-xl gap-1.5 h-9 font-semibold hover:border-emerald-500 dark:hover:border-emerald-500/50"
            aria-label="Refresh Data"
          >
            <RefreshCw className="h-3.5 w-3.5" />
            Reload
          </Button>
        </div>
      </div>

      {/* FEATURED GRID (10 Responsive Cards) */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
      >
        {NIGERIA_FEATURED_CATEGORIES.map((category) => (
          <motion.div
            key={category.id}
            variants={itemVariants}
            whileHover={{ y: -6, scale: 1.01 }}
            className="group relative flex flex-col justify-between h-full rounded-2xl border border-zinc-200 bg-card p-5 shadow-sm transition-all hover:border-emerald-500/40 hover:shadow-md dark:border-zinc-800 dark:hover:border-emerald-500/40"
            tabIndex={0}
            role="button"
            aria-label={`${t(category.titleKey)}, ${category.opportunityCount} opportunities available.`}
            onKeyDown={(e) => handleKeyDown(e, () => showToast(`Opening ${t(category.titleKey)}`))}
          >
            {/* Green gradient card glow on hover */}
            <div className="absolute inset-0 -z-10 rounded-2xl bg-gradient-to-br from-emerald-500/0 via-transparent to-emerald-500/0 opacity-0 transition-opacity group-hover:from-emerald-500/[0.02] group-hover:to-emerald-500/[0.02] group-hover:opacity-100" />

            <div className="space-y-4">
              {/* Header Icon + Stats */}
              <div className="flex items-center justify-between">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-400 group-hover:bg-emerald-500 group-hover:text-white transition-colors duration-300">
                  <CategoryIcon name={category.icon} className="h-5 w-5" />
                </div>
                <Badge variant="secondary" className="bg-emerald-500/10 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-300 border-none rounded-lg text-xs font-bold">
                  {category.opportunityCount}+
                </Badge>
              </div>

              {/* Title & Description */}
              <div className="space-y-1.5">
                <h3 className="font-bold text-base text-zinc-900 dark:text-zinc-50 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                  {t(category.titleKey)}
                </h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {t(category.descriptionKey)}
                </p>
              </div>

              {/* Examples & Placeholders Display */}
              {category.examples && (
                <div className="pt-2 border-t border-zinc-100 dark:border-zinc-800/60 space-y-1">
                  <span className="text-[10px] font-bold text-muted-foreground tracking-wider uppercase">
                    Featured Partners:
                  </span>
                  <div className="flex flex-wrap gap-1">
                    {category.examples.slice(0, 5).map((ex) => (
                      <span
                        key={ex}
                        className="text-[10px] px-1.5 py-0.5 rounded-md bg-zinc-100 text-zinc-800 dark:bg-zinc-800 dark:text-zinc-300 font-medium"
                      >
                        {ex}
                      </span>
                    ))}
                    {category.examples.length > 5 && (
                      <span className="text-[9px] text-muted-foreground px-1 py-0.5 font-semibold">
                        +{category.examples.length - 5} more
                      </span>
                    )}
                  </div>
                </div>
              )}

              {/* Specific display options like Remote placeholder */}
              {category.displayDetails?.badge && (
                <div className="pt-2 border-t border-zinc-100 dark:border-zinc-800/60 space-y-2">
                  <div className="flex items-center gap-1.5">
                    <Badge variant="outline" className="bg-blue-500/10 text-blue-700 dark:bg-blue-500/20 dark:text-blue-300 border-none font-bold text-[10px] uppercase">
                      {category.displayDetails.badge}
                    </Badge>
                    <span className="text-[10px] font-semibold text-emerald-600 dark:text-emerald-400">
                      {category.displayDetails.salaryPlaceholder}
                    </span>
                  </div>
                  <div className="flex items-center gap-1 text-[10px] text-muted-foreground">
                    <Building2 className="h-3 w-3" />
                    <span>{category.displayDetails.companyPlaceholder}</span>
                  </div>
                </div>
              )}

              {/* Specific entrepreneurship details */}
              {category.displayDetails?.incubators && (
                <div className="pt-2 border-t border-zinc-100 dark:border-zinc-800/60 space-y-1">
                  <span className="text-[10px] font-bold text-muted-foreground tracking-wider uppercase block">
                    Accelerators & Hubs:
                  </span>
                  <div className="flex flex-wrap gap-1">
                    {category.displayDetails.incubators.map((hub) => (
                      <span
                        key={hub}
                        className="text-[10px] px-1.5 py-0.5 rounded-md bg-zinc-100 text-zinc-800 dark:bg-zinc-800 dark:text-zinc-300 font-medium"
                      >
                        {hub}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="pt-4 mt-auto">
              <Button
                variant="ghost"
                size="sm"
                className="w-full text-xs font-semibold justify-between group-hover:bg-emerald-500/5 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 p-2 rounded-xl transition-all"
                onClick={(e) => {
                  e.stopPropagation();
                  showToast(`Exploring ${t(category.titleKey)}`);
                }}
              >
                Explore Category
                <ArrowRight className="h-3.5 w-3.5 transform group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* LOCAL OPPORTUNITY MAP (Explore by State) */}
      <section className="space-y-6 pt-4">
        <div className="flex flex-col gap-2">
          <h3 className="text-xl font-bold tracking-tight text-foreground flex items-center gap-2">
            <MapPin className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
            {t("opportunityHub.madeForNigerians.exploreByState")}
          </h3>
          <p className="text-sm text-muted-foreground max-w-xl">
            Click on any state to view active talent programs, local hubs, and job openings.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3.5">
          {NIGERIA_STATE_OPPORTUNITIES.map((state) => {
            const isSelected = selectedState === state.stateName;
            return (
              <motion.div
                key={state.id}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleStateClick(state.stateName)}
                className={`cursor-pointer rounded-xl border p-3.5 transition-all text-left focus:outline-none focus:ring-2 focus:ring-emerald-500 ${
                  isSelected
                    ? "border-emerald-500 bg-emerald-500/5 dark:border-emerald-500 dark:bg-emerald-500/10 shadow-sm"
                    : "border-zinc-200 hover:border-zinc-300 bg-card dark:border-zinc-800 dark:hover:border-zinc-700"
                }`}
                tabIndex={0}
                role="button"
                aria-pressed={isSelected}
                aria-label={`State: ${state.stateName}, ${state.opportunityCount} opportunities available.`}
                onKeyDown={(e) => handleKeyDown(e, () => handleStateClick(state.stateName))}
              >
                <div className="flex justify-between items-start">
                  <span className="font-bold text-sm text-zinc-900 dark:text-zinc-100">
                    {state.stateName}
                  </span>
                  <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-md ${
                    isSelected
                      ? "bg-emerald-500 text-white"
                      : "bg-zinc-100 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400"
                  }`}>
                    {state.opportunityCount}
                  </span>
                </div>
                <div className="mt-3 space-y-0.5">
                  <span className="text-[9px] font-bold text-muted-foreground uppercase block">
                    {t("opportunityHub.madeForNigerians.industrySuf")}
                  </span>
                  <span className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">
                    {t(state.popularIndustryKey)}
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* POPULAR INDUSTRIES (Chips) */}
      <section className="space-y-4 pt-4">
        <h3 className="text-xl font-bold tracking-tight text-foreground flex items-center gap-2">
          <TrendingUp className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
          {t("opportunityHub.madeForNigerians.popularIndustries")}
        </h3>
        <div className="flex flex-wrap gap-2">
          {NIGERIA_POPULAR_INDUSTRIES.map((ind) => {
            const isSelected = selectedIndustry === ind.id;
            return (
              <button
                key={ind.id}
                onClick={() => handleIndustryClick(ind.id)}
                className={`rounded-full px-4 py-1.5 text-xs font-semibold transition-all border outline-none focus:ring-2 focus:ring-emerald-500 ${
                  isSelected
                    ? "bg-emerald-600 text-white border-emerald-600"
                    : "bg-zinc-50 border-zinc-200 text-zinc-700 hover:bg-zinc-100 dark:bg-zinc-900 dark:border-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-800"
                }`}
                aria-pressed={isSelected}
              >
                {t(ind.nameKey)}
              </button>
            );
          })}
        </div>
      </section>

      {/* COMMUNITY EVENTS SECTION */}
      <section className="space-y-6 pt-4">
        <div className="flex flex-col gap-1">
          <h3 className="text-xl font-bold tracking-tight text-foreground flex items-center gap-2">
            <Users className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
            {t("opportunityHub.madeForNigerians.communityEvents")}
          </h3>
          <p className="text-sm text-muted-foreground">
            Join thousands of developers, designers, and tech leaders at these hot localized tech events.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {NIGERIA_COMMUNITY_EVENTS.map((event) => (
            <Card
              key={event.id}
              className="flex flex-col justify-between h-full border-zinc-200 hover:border-emerald-500/30 transition-all dark:border-zinc-800 group"
            >
              <CardContent className="p-5 space-y-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-400 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                    <CategoryIcon name={event.icon} className="h-4 w-4" />
                  </div>
                  <h4 className="font-bold text-sm text-zinc-900 dark:text-zinc-50">
                    {t(event.titleKey)}
                  </h4>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {t(event.descriptionKey)}
                </p>
                <div className="space-y-2 pt-2 border-t border-zinc-100 dark:border-zinc-800/60">
                  <div className="flex items-center gap-1.5 text-xs text-zinc-700 dark:text-zinc-300">
                    <Calendar className="h-3.5 w-3.5 text-emerald-600" />
                    <span>{t(event.dateKey)}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-zinc-700 dark:text-zinc-300">
                    <MapPin className="h-3.5 w-3.5 text-emerald-600" />
                    <span className="truncate">{t(event.locationKey)}</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="px-5 py-3 border-t border-zinc-100 dark:border-zinc-800/60 bg-zinc-50/50 dark:bg-zinc-900/30">
                <div className="flex flex-wrap gap-1">
                  {event.tagsKeys.map((tk) => (
                    <Badge key={tk} variant="secondary" className="text-[9px] px-1.5 py-0 rounded font-bold">
                      {t(tk)}
                    </Badge>
                  ))}
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      </section>

      {/* FEATURED ORGANIZATIONS (Logo Wall) */}
      <section className="space-y-6 pt-4">
        <div className="flex flex-col gap-1">
          <h3 className="text-xl font-bold tracking-tight text-foreground flex items-center gap-2">
            <Building2 className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
            {t("opportunityHub.madeForNigerians.featuredOrganizations")}
          </h3>
          <p className="text-sm text-muted-foreground">
            Top companies, ministries, and agencies hiring and supporting tech builders in Nigeria.
          </p>
        </div>

        {/* Animated Infinite Loop-Like Grid Wall */}
        <div className="relative overflow-hidden py-4 rounded-2xl bg-zinc-50 dark:bg-zinc-900/30 border dark:border-zinc-800">
          <motion.div
            animate={{ x: [0, -1200] }}
            transition={{
              repeat: Infinity,
              repeatType: "loop",
              duration: 35,
              ease: "linear",
            }}
            className="flex gap-8 px-4 w-max whitespace-nowrap items-center"
          >
            {/* Render Twice to create seamless loop */}
            {[...NIGERIA_FEATURED_ORGANIZATIONS, ...NIGERIA_FEATURED_ORGANIZATIONS].map((org, index) => (
              <div
                key={`${org.id}-${index}`}
                className="inline-flex h-11 items-center justify-center rounded-xl bg-white px-5 shadow-sm border border-zinc-100 dark:bg-zinc-800 dark:border-zinc-700/60 transition-transform hover:scale-105"
              >
                <span className="text-xs font-bold text-zinc-700 dark:text-zinc-200 flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-emerald-500" />
                  {org.name}
                </span>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* AI RECOMMENDATIONS (Confidence Percentage cards) */}
      <section className="space-y-6 pt-4">
        <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
          <div className="space-y-1">
            <h3 className="text-xl font-extrabold tracking-tight text-foreground flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-emerald-600 dark:text-emerald-400 animate-pulse" />
              {t("opportunityHub.madeForNigerians.aiRecommendations")}
            </h3>
            <p className="text-sm text-muted-foreground">
              {t("opportunityHub.madeForNigerians.aiRecSubtitle")}
            </p>
          </div>
          <Badge variant="outline" className="border-emerald-500/20 bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 font-bold self-start md:self-auto">
            ⚡ Powered by Liberty AI
          </Badge>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {NIGERIA_AI_RECOMMENDATIONS.map((rec) => (
            <Card
              key={rec.id}
              className="relative overflow-hidden border border-zinc-200 dark:border-zinc-800/80 bg-zinc-50/20 hover:border-emerald-500/30 hover:shadow-md transition-all group"
            >
              {/* Highlight ribbon representing Confidence */}
              <div className="absolute top-0 right-0 h-16 w-16">
                <div className="absolute transform rotate-45 bg-emerald-600 text-white text-[9px] font-extrabold text-center py-1 right-[-35px] top-[15px] w-[110px] shadow-sm">
                  {rec.confidence}% MATCH
                </div>
              </div>

              <CardContent className="p-6 space-y-4">
                <div className="space-y-1.5">
                  <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-widest block">
                    {t(rec.roleTypeKey)}
                  </span>
                  <h4 className="font-extrabold text-base text-zinc-900 dark:text-zinc-50 pr-8">
                    {t(rec.titleKey)}
                  </h4>
                  <span className="text-xs font-semibold text-muted-foreground">
                    {rec.organization}
                  </span>
                </div>

                <p className="text-xs text-muted-foreground leading-relaxed">
                  {t(rec.descriptionKey)}
                </p>

                <div className="flex flex-wrap gap-1.5 pt-2 border-t border-zinc-100 dark:border-zinc-800/60">
                  {rec.tagsKeys.map((tagKey) => (
                    <Badge key={tagKey} variant="outline" className="text-[9px] px-2 py-0.5 rounded font-medium">
                      {t(tagKey)}
                    </Badge>
                  ))}
                </div>
              </CardContent>

              <CardFooter className="px-6 py-4 border-t border-zinc-100 dark:border-zinc-800/60 bg-zinc-50/60 dark:bg-zinc-900/40 flex justify-between items-center">
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-lg h-8 w-8 text-zinc-500 hover:text-red-500"
                  onClick={() => handleToggleBookmark(rec.id)}
                  aria-label="Bookmark"
                >
                  <Bookmark
                    className={`h-4 w-4 ${localBookmarks.has(rec.id) ? "fill-emerald-500 text-emerald-600" : ""}`}
                  />
                </Button>

                <Button
                  size="sm"
                  className="rounded-xl h-8 text-xs font-semibold bg-emerald-600 hover:bg-emerald-700 text-white"
                  onClick={() => showToast(`Starting application for ${t(rec.titleKey)}`)}
                >
                  Apply Instantly
                  <ExternalLink className="ml-1.5 h-3.5 w-3.5" />
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}
