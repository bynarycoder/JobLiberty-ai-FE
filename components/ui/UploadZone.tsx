"use client";

import React from "react";
import { Upload, FileText, CheckCircle2, XCircle, Sparkles, CloudUpload } from "lucide-react";
import { Button } from "./Button";
import { useI18n } from "@/providers/I18nProvider";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

interface UploadZoneProps {
  onFileSelect: (file: File) => void;
  isUploading?: boolean;
  progress?: number;
  error?: string;
}

export function UploadZone({ onFileSelect, isUploading, progress, error }: UploadZoneProps) {
  const { t } = useI18n();
  const [isDragOver, setIsDragOver] = React.useState(false);
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    const files = Array.from(e.dataTransfer.files);
    const pdfFile = files.find((f) => f.type === "application/pdf" || f.name.endsWith(".pdf") || f.name.endsWith(".docx") || f.type.includes("word"));
    if (pdfFile) {
      onFileSelect(pdfFile);
    } else if (files[0]) {
      onFileSelect(files[0]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) onFileSelect(file);
  };

  return (
    <div className="relative">
      <input type="file" ref={fileInputRef} className="hidden" accept=".pdf,.docx,.doc" onChange={handleFileChange} />

      <motion.div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        animate={{
          scale: isDragOver ? 1.01 : 1,
          borderColor: isDragOver ? "#2563EB" : undefined,
        }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
        className={cn(
          "group relative rounded-[28px] border-[2.5px] border-dashed p-8 md:p-14 text-center overflow-hidden",
          "bg-white dark:bg-[#1E293B]/60 backdrop-blur-sm",
          "transition-all duration-300",
          isDragOver
            ? "border-[#2563EB] bg-[#EFF6FF] dark:bg-[#1E3A8A]/20 shadow-[0_0_0_4px_rgba(37,99,235,0.08),0_20px_40px_rgba(37,99,235,0.12)]"
            : "border-slate-200 dark:border-slate-700/60 hover:border-slate-300 dark:hover:border-slate-600 hover:shadow-[0_8px_24px_rgba(15,23,42,0.06)] hover:bg-slate-50/50 dark:hover:bg-[#1E293B]/80",
          isUploading && "pointer-events-none",
        )}
      >
        {/* Gradient mesh background */}
        <div className="pointer-events-none absolute inset-0 opacity-40 group-hover:opacity-60 transition-opacity">
          <div className="absolute inset-0 gradient-mesh opacity-[0.06]" />
        </div>

        {/* Glow effect on drag */}
        <AnimatePresence>
          {isDragOver && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="pointer-events-none absolute inset-0 rounded-[26px] bg-gradient-to-br from-[#2563EB]/[0.06] via-[#7C3AED]/[0.04] to-[#10B981]/[0.06]"
            />
          )}
        </AnimatePresence>

        {isUploading ? (
          <div className="relative space-y-6">
            {/* Animated icon */}
            <div className="relative mx-auto w-fit">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1.2, repeat: Infinity, ease: "linear" }}
                className="h-[72px] w-[72px] rounded-[20px] border-[3.5px] border-slate-100 dark:border-slate-800 border-t-[#2563EB] dark:border-t-[#60A5FA]"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.div
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  className="h-10 w-10 rounded-xl bg-gradient-to-br from-[#2563EB] to-[#7C3AED] flex items-center justify-center shadow-lg shadow-blue-500/20"
                >
                  <Sparkles className="h-5 w-5 text-white" />
                </motion.div>
              </div>
            </div>

            <div className="space-y-3">
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-[18px] font-semibold tracking-[-0.02em] text-slate-900 dark:text-slate-100"
              >
                {t("upload.analyzing")}
              </motion.div>
              <p className="text-[14px] text-slate-500 dark:text-slate-400">Our AI is extracting skills, experience & insights</p>
            </div>

            <div className="mx-auto max-w-[320px] space-y-3">
              <div className="h-[8px] w-full overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800 p-[2px]">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${progress || 45}%` }}
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                  className="h-full rounded-full bg-gradient-to-r from-[#2563EB] via-[#4F46E5] to-[#7C3AED] relative overflow-hidden"
                >
                  <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-[shimmer_1.2s_infinite]" />
                </motion.div>
              </div>
              <div className="flex justify-between text-[12px] font-medium">
                <span className="text-slate-500 dark:text-slate-400">{progress || 45}% complete</span>
                <span className="text-[#2563EB] dark:text-[#60A5FA] flex items-center gap-1">
                  <span className="h-[5px] w-[5px] rounded-full bg-[#10B981] animate-pulse" />
                  AI processing
                </span>
              </div>
            </div>

            <div className="flex items-center justify-center gap-2 text-[12px] text-slate-400 dark:text-slate-500">
              <FileText className="h-3.5 w-3.5" />
              Secure • Encrypted • Private
            </div>
          </div>
        ) : error ? (
          <div className="relative space-y-5">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-[18px] bg-[#FEF2F2] dark:bg-[#7F1D1D]/20">
              <XCircle className="h-8 w-8 text-[#EF4444]" />
            </div>
            <div>
              <div className="text-[18px] font-semibold text-slate-900 dark:text-slate-100">Upload failed</div>
              <p className="mt-1 text-[14px] text-[#EF4444] dark:text-[#FCA5A5]">{error}</p>
            </div>
            <Button variant="outline" onClick={() => fileInputRef.current?.click()}>
              Try again
            </Button>
          </div>
        ) : (
          <div className="relative">
            {/* Icon */}
            <motion.div
              animate={isDragOver ? { y: [0, -6, 0], scale: [1, 1.05, 1] } : {}}
              transition={{ duration: 0.6, repeat: isDragOver ? Infinity : 0 }}
              className="mx-auto mb-6 flex h-[72px] w-[72px] items-center justify-center rounded-[20px] bg-gradient-to-br from-[#EFF6FF] to-[#DBEAFE] dark:from-[#1E3A8A]/40 dark:to-[#1E40AF]/30 border border-[#2563EB]/10 dark:border-[#3B82F6]/20 shadow-[0_8px_20px_rgba(37,99,235,0.12)] group-hover:shadow-[0_12px_28px_rgba(37,99,235,0.18)] group-hover:scale-[1.02] transition-all duration-300"
            >
              <CloudUpload className="h-8 w-8 text-[#2563EB] dark:text-[#60A5FA]" />
            </motion.div>

            <div className="space-y-2">
              <h3 className="text-[22px] font-bold tracking-[-0.03em] text-slate-900 dark:text-slate-100">
                {t("upload.dragDrop")}
              </h3>
              <p className="text-[14.5px] leading-[1.6] text-slate-500 dark:text-slate-400 max-w-[36ch] mx-auto">{t("upload.supported")}</p>
            </div>

            <div className="mt-8 flex flex-col items-center gap-4">
              <Button size="lg" onClick={() => fileInputRef.current?.click()} className="px-8 h-[48px] rounded-[14px] text-[15px] shadow-brand">
                <Upload className="h-[18px] w-[18px]" />
                {t("upload.browse")}
              </Button>

              <div className="flex items-center gap-2">
                <div className="flex -space-x-1">
                  {["PDF", "DOCX", "DOC"].map((fmt) => (
                    <span
                      key={fmt}
                      className="inline-flex h-[26px] items-center rounded-full border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-[10px] text-[10px] font-bold tracking-[0.04em] text-slate-600 dark:text-slate-400 shadow-sm"
                    >
                      {fmt}
                    </span>
                  ))}
                </div>
                <span className="text-[12px] font-medium text-slate-400 dark:text-slate-500">• Max 5MB • Encrypted</span>
              </div>
            </div>

            {/* Feature pills */}
            <div className="mt-10 grid grid-cols-3 gap-2.5 max-w-[520px] mx-auto">
              {[
                { icon: "🎯", label: "ATS-optimized parsing" },
                { icon: "✨", label: "AI skill extraction" },
                { icon: "🔒", label: "Private & secure" },
              ].map((feat) => (
                <div
                  key={feat.label}
                  className="flex items-center justify-center gap-1.5 rounded-full border border-slate-200/70 dark:border-slate-700/50 bg-slate-50/70 dark:bg-white/[0.03] px-3 py-[7px] text-[11.5px] font-medium text-slate-600 dark:text-slate-400"
                >
                  <span>{feat.icon}</span>
                  {feat.label}
                </div>
              ))}
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
}
