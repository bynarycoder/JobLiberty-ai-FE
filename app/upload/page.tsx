"use client";

import React from 'react';
import { UploadZone } from '@/components/ui/UploadZone';
import { useI18n } from '@/providers/I18nProvider';
import { useMutation } from '@tanstack/react-query';
import { api } from '@/lib/services/api';
import { Button } from '@/components/ui/Button';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

export default function UploadPage() {
  const { t } = useI18n();
  const router = useRouter();
  const [file, setFile] = React.useState<File | null>(null);
  const [progress, setProgress] = React.useState(0);
  const [isAnalyzing, setIsAnalyzing] = React.useState(false);

  const uploadMutation = useMutation({
    mutationFn: (file: File) => api.uploadResume(file),
    onSuccess: async (resume) => {
      toast.success(t('upload.success'));
      setIsAnalyzing(true);
      
      // Simulate analysis progress
      const interval = setInterval(() => {
        setProgress(p => {
          const newP = p + 25;
          if (newP >= 100) {
            clearInterval(interval);
            setTimeout(async () => {
              await api.analyzeResume(resume.id);
              router.push('/resume');
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
    <div className="max-w-3xl mx-auto pt-8">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-semibold tracking-tighter mb-3">{t('upload.title')}</h1>
        <p className="text-xl text-muted-foreground">{t('upload.subtitle')}</p>
      </div>

      <UploadZone 
        onFileSelect={handleFileSelect} 
        isUploading={uploadMutation.isPending || isAnalyzing} 
        progress={progress} 
      />

      {file && !uploadMutation.isPending && !isAnalyzing && (
        <div className="mt-4 text-center">
          <Button onClick={() => router.push('/resume')} size="lg" className="btn-primary">Analyze Resume</Button>
        </div>
      )}

      <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
        {[
          "ATS-optimized parsing", "Skill extraction", "AI-powered insights"
        ].map((txt) => (
          <div key={txt} className="flex items-center gap-2 text-muted-foreground justify-center">
            <div className="w-1 h-1 bg-emerald-500 rounded-full" /> {txt}
          </div>
        ))}
      </div>
    </div>
  );
}
