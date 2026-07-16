"use client";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Sparkles, Zap } from "lucide-react";
import { SkeletonCards } from "./SkeletonCards";
import { getIcon } from "./icons";
import { useI18n } from "@/providers/I18nProvider";
export function SmartRecommendations({ recommendations, isLoading }: { recommendations: any[]; isLoading: boolean }) {
  const { t } = useI18n();
  return (
    <section>
      <Card className="overflow-hidden border-[#DDD6FE] dark:border-[#4C1D95]/30 bg-gradient-to-br from-[#7C3AED] via-[#6D28D9] to-[#4C1D95] text-white shadow-[0_12px_32px_rgba(124,58,237,0.2)]">
        <CardHeader className="pb-2">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-[10px] bg-white/20 border border-white/20"><Sparkles className="h-4 w-4" /></div>
            <CardTitle className="text-white text-[15px]">{t("opportunityHub.recommendations.title")}</CardTitle>
            <Badge className="bg-white/15 border-white/20 text-white ml-auto">AI • Live</Badge>
          </div>
          <p className="text-[12px] text-white/70">{t("opportunityHub.recommendations.subtitle")}</p>
        </CardHeader>
        <CardContent className="pt-2">
          {isLoading ? <SkeletonCards count={3} columns={1} /> : (
            <ul className="space-y-2.5">
              {recommendations.map((rec: any, idx: number) => {
                const Icon = getIcon(rec.icon);
                return (
                  <motion.li key={rec.id} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: idx * 0.06 }} className="flex items-center gap-3 rounded-[14px] bg-white/10 border border-white/10 backdrop-blur-sm p-3 hover:bg-white/15 transition-colors">
                    <div className="flex h-9 w-9 items-center justify-center rounded-[10px] bg-white/15"><Icon className="h-4 w-4" /></div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <h4 className="truncate font-semibold text-[13px] tracking-[-0.01em]">{rec.title}</h4>
                        <Badge className="bg-white/20 text-white border-white/20 text-[10px]">{rec.confidence}%</Badge>
                      </div>
                      <p className="text-[11px] text-white/70 truncate">{t(rec.reasonKey)}</p>
                    </div>
                  </motion.li>
                );
              })}
            </ul>
          )}
        </CardContent>
      </Card>
    </section>
  );
}
