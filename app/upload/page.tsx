"use client";

import React from "react";
import { UploadZone } from "@/components/ui/UploadZone";
import { useI18n } from "@/providers/I18nProvider";
import { useMutation } from "@tanstack/react-query";
import { api } from "@/lib/services/api";
import { Button } from "@/components/ui/Button";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Sparkles, Shield, Zap, FileText, ArrowRight, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/Badge";

export default function UploadPage() {
  const { t } = useI18n();
  const router = useRouter();
  const [file, setFile] = React.useState<File | null>(null);
  const [progress, setProgress] = React.useState(0);
  const [isAnalyzing, setIsAnalyzing] = React.useState(false);

  const uploadMutation = useMutation({
    mutationFn: (file: File) => api.uploadResume(file),
    onSuccess: async (resume) => {
      toast.success(t("upload.success"));
      setIsAnalyzing(true);
      const interval = setInterval(() => {
        setProgress((p) => {
          const newP = p + 25;
          if (newP >= 100) {
            clearInterval(interval);
            setTimeout(async () => {
              await api.analyzeResume(resume.id);
              router.push("/resume");
            }, 400);
          }
          return Math.min(newP, 100);
        });
      }, 420);
    },
  });

  const handleFileSelect = (selectedFile: File) => {
    if (selectedFile.size > 5 * 1024 * 1024) {
      toast.error("File too large. Max 5MB");
      return;
    }
    setFile(selectedFile);
    uploadMutation.mutate(selectedFile);
  };

  return (
    <div className="max-w-[780px] mx-auto pt-6 pb-10">
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }} className="text-center mb-10">
        <div className="inline-flex items-center gap-2 rounded-full border border-[#DBEAFE] dark:border-[#1E3A8A]/40 bg-[#EFF6FF] dark:bg-[#1E3A8A]/20 px-3 py-1 text-[11px] font-bold tracking-[0.06em] text-[#1D4ED8] dark:text-[#93C5FD] mb-4">
          <Sparkles className="h-3 w-3" />
          AI-POWERED RESUME ANALYSIS • PRIVATE & SECURE
        </div>
        <h1 className="text-[32px] md:text-[42px] font-[800] tracking-[-0.03em] leading-[0.95] text-slate-900 dark:text-white mb-3">{t("upload.title")}</h1>
        <p className="text-[16px] leading-[1.6] font-[450] text-slate-600 dark:text-slate-400 max-w-[48ch] mx-auto">{t("upload.subtitle")}</p>

        <div className="mt-4 flex items-center justify-center gap-2 flex-wrap">
          {[
            { icon: Shield, label: "Encrypted" },
            { icon: Zap, label: "Instant AI" },
            { icon: FileText, label: "ATS Check" },
          ].map((feat) => (
            <span key={feat.label} className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 dark:border-slate-700 bg-white dark:bg-white/[0.04] px-2.5 py-1 text-[11.5px] font-medium text-slate-600 dark:text-slate-400">
              <feat.icon className="h-3 w-3" />
              {feat.label}
            </span>
          ))}
        </div>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}>
        <UploadZone onFileSelect={handleFileSelect} isUploading={uploadMutation.isPending || isAnalyzing} progress={progress} />
      </motion.div>

      {file && !uploadMutation.isPending && !isAnalyzing && (
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="mt-6 flex flex-col items-center gap-4">
          <div className="flex items-center gap-3 rounded-[14px] border border-[#A7F3D0] dark:border-[#064E3B]/40 bg-[#ECFDF5] dark:bg-[#064E3B]/20 px-4 py-3 w-full max-w-[480px]">
            <div className="h-10 w-10 rounded-[10px] bg-white dark:bg-slate-800 border border-[#A7F3D0] dark:border-[#064E3B]/40 flex items-center justify-center">
              <FileText className="h-5 w-5 text-[#059669] dark:text-[#34D399]" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-[13.5px] font-semibold tracking-[-0.01em] text-slate-900 dark:text-slate-100 truncate">{file.name}</div>
              <div className="text-[11px] text-slate-500 dark:text-slate-400">{(file.size / 1024).toFixed(0)} KB • Ready to analyze</div>
            </div>
            <CheckCircle2 className="h-5 w-5 text-[#10B981] shrink-0" />
          </div>

          <Button onClick={() => router.push("/resume")} size="lg" className="rounded-full px-8 h-[48px] gap-2">
            Analyze Resume
            <ArrowRight className="h-4 w-4" />
          </Button>
        </motion.div>
      )}

      <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-3 max-w-[640px] mx-auto">
        {[
          { title: "ATS-optimized parsing", desc: "We check formatting, keywords & readability like real ATS", icon: "🎯" },
          { title: "Skill extraction", desc: "AI extracts 30+ skills, tools, and experience signals", icon: "✨" },
          { title: "Private & secure", desc: "Encrypted at rest, never shared without consent", icon: "🔒" },
        ].map((txt, i) => (
          <motion.div
            key={txt.title}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 + i * 0.08 }}
            className="rounded-[16px] border border-slate-200/60 dark:border-slate-800 bg-white dark:bg-[#1E293B] p-4 hover:shadow-sm hover:-translate-y-[1px] transition-all duration-300 text-left"
          >
            <div className="flex items-center gap-2 mb-1.5">
              <span className="text-[16px]">{txt.icon}</span>
              <span className="text-[13px] font-semibold tracking-[-0.01em] text-slate-900 dark:text-slate-100">{txt.title}</span>
            </div>
            <p className="text-[12px] leading-[1.5] text-slate-500 dark:text-slate-400">{txt.desc}</p>
          </motion.div>
        ))}
      </div>

      <div className="mt-8 text-center">
        <p className="text-[11px] font-medium tracking-[0.04em] uppercase text-slate-400 dark:text-slate-500">
          Trusted by 47k+ job seekers • 3MTT NextGen Showcase 2026 • Built by Abdulwahab Abdulyekeen
        </p>
      </div>
    </div>
  );
}
