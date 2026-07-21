"use client";

import React from "react";
import { UploadZone } from "@/components/ui/UploadZone";
import { useI18n } from "@/providers/I18nProvider";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/services/api";
import { Button } from "@/components/ui/Button";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Sparkles, Shield, Zap, FileText, ArrowRight, CheckCircle2, Upload, Target, Lock, Wand2 } from "lucide-react";
import { motion } from "framer-motion";
import { PageHero } from "@/components/dashboard/PageHero";
import { getApiError } from "@/lib/api/client";

export default function UploadPage() {
  const { t } = useI18n();
  const router = useRouter();
  const queryClient = useQueryClient();
  const [file, setFile] = React.useState<File | null>(null);
  const [progress, setProgress] = React.useState(0);
  const [isAnalyzing, setIsAnalyzing] = React.useState(false);

  const uploadMutation = useMutation({
    mutationFn: async (selectedFile: File) => {
      setProgress(15);
      const resume = await api.uploadResume(selectedFile);
      setProgress(55);
      setIsAnalyzing(true);
      const analyzed = await api.analyzeResume(resume.resume_id);
      setProgress(100);
      return analyzed;
    },
    onSuccess: async (analyzed) => {
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ["resume"] }),
        queryClient.invalidateQueries({ queryKey: ["ats"] }),
        queryClient.invalidateQueries({ queryKey: ["jobs"] }),
        queryClient.invalidateQueries({ queryKey: ["dashboard-stats"] }),
        queryClient.invalidateQueries({ queryKey: ["skill-gap"] }),
        queryClient.invalidateQueries({ queryKey: ["report"] }),
        queryClient.invalidateQueries({ queryKey: ["roadmap"] }),
      ]);
      if (analyzed?.id) queryClient.setQueryData(["resume"], analyzed);
      toast.success(t("upload.success"));
      router.push("/resume");
    },
    onError: (error) => {
      setIsAnalyzing(false);
      setProgress(0);
      toast.error(getApiError(error).message);
    },
  });

  const handleFileSelect = (selectedFile: File) => {
    if (selectedFile.size > 5 * 1024 * 1024) {
      toast.error("File too large. Max 5MB");
      return;
    }
    if (selectedFile.type && selectedFile.type !== "application/pdf" && !selectedFile.name.toLowerCase().endsWith(".pdf")) {
      toast.error("Please upload a PDF resume");
      return;
    }
    setFile(selectedFile);
    uploadMutation.mutate(selectedFile);
  };

  return (
    <div className="mx-auto max-w-[860px] space-y-8 pb-6">
      <PageHero
        gradient="amber"
        icon={Upload}
        eyebrow="AI-POWERED ANALYSIS • PRIVATE & SECURE"
        title={t("upload.title")}
        subtitle={t("upload.subtitle")}
        stats={[
          { label: "Supported format", value: "PDF", sub: "Max 5MB" },
          { label: "Pipeline", value: "Upload → Analyze", sub: "Backend Gemini" },
          { label: "Next step", value: "Resume", sub: "View analysis" },
          { label: "Also available", value: "ATS", sub: "Score & tips" },
        ]}
        actions={
          <div className="flex flex-wrap items-center gap-2">
            {[
              { icon: Lock, label: "Encrypted at rest" },
              { icon: Zap, label: "Instant AI" },
              { icon: Target, label: "ATS Check" },
            ].map((feat) => (
              <span key={feat.label} className="inline-flex items-center gap-1.5 rounded-full border border-white/25 bg-white/15 px-3 py-1.5 text-[11.5px] font-bold text-white backdrop-blur-sm">
                <feat.icon className="h-3.5 w-3.5" />
                {feat.label}
              </span>
            ))}
          </div>
        }
      />

      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}>
        <UploadZone onFileSelect={handleFileSelect} isUploading={uploadMutation.isPending || isAnalyzing} progress={progress} />
      </motion.div>

      {file && !uploadMutation.isPending && !isAnalyzing && (
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col items-center gap-4">
          <div className="tint-emerald flex w-full max-w-[480px] items-center gap-3 rounded-[16px] border px-4 py-3 shadow-sm">
            <div className="flex h-10 w-10 items-center justify-center rounded-[11px] bg-card text-[#059669] shadow-sm dark:text-[#4ADEAC]">
              <FileText className="h-5 w-5" />
            </div>
            <div className="min-w-0 flex-1">
              <div className="truncate text-[13.5px] font-bold tracking-[-0.01em]">{file.name}</div>
              <div className="text-[11px] font-medium text-muted-foreground">{(file.size / 1024).toFixed(0)} KB • Ready to analyze</div>
            </div>
            <CheckCircle2 className="h-5 w-5 shrink-0 text-[#10B981]" />
          </div>

          <Button onClick={() => router.push("/resume")} size="lg" className="h-[48px] gap-2 rounded-full px-8">
            <Wand2 className="h-4 w-4" />
            Analyze Resume
            <ArrowRight className="h-4 w-4" />
          </Button>
        </motion.div>
      )}

      <div className="mx-auto grid max-w-[720px] grid-cols-1 gap-3 md:grid-cols-3">
        {[
          { title: "ATS-optimized parsing", desc: "Formatting, keywords & readability checked by the backend ATS engine", icon: Target, tint: "tint-purple", color: "text-[#7C3AED] dark:text-[#B691FF]" },
          { title: "Skill extraction", desc: "Gemini extracts skills, experience and education on the server", icon: Sparkles, tint: "tint-blue", color: "text-[#2563EB] dark:text-[#7FA8FF]" },
          { title: "Private & secure", desc: "Encrypted at rest, never shared without consent", icon: Shield, tint: "tint-emerald", color: "text-[#059669] dark:text-[#4ADEAC]" },
        ].map((feat, i) => (
          <motion.div
            key={feat.title}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 + i * 0.08, duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            whileHover={{ y: -4 }}
            className={`group relative overflow-hidden rounded-[18px] border p-4 shadow-sm transition-shadow hover:shadow-lg ${feat.tint}`}
          >
            <div className={`mb-2 flex h-9 w-9 items-center justify-center rounded-[11px] bg-card shadow-sm ring-1 ring-border/60 transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-6 ${feat.color}`}>
              <feat.icon className="h-4.5 w-4.5 h-[18px] w-[18px]" />
            </div>
            <div className="text-[13px] font-bold tracking-[-0.01em]">{feat.title}</div>
            <p className="mt-1 text-[12px] leading-[1.55] text-muted-foreground">{feat.desc}</p>
          </motion.div>
        ))}
      </div>

      <p className="text-center text-[11px] font-bold uppercase tracking-[0.06em] text-muted-foreground/80">
        Powered by JobLiberty backend • Gemini analysis • ATS feedback
      </p>
    </div>
  );
}
