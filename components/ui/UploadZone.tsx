"use client";

import React from 'react';
import { Upload, File, CheckCircle } from 'lucide-react';
import { Button } from './Button';
import { useI18n } from '@/providers/I18nProvider';

interface UploadZoneProps {
  onFileSelect: (file: File) => void;
  isUploading?: boolean;
  progress?: number;
}

export function UploadZone({ onFileSelect, isUploading, progress }: UploadZoneProps) {
  const { t } = useI18n();
  const [isDragOver, setIsDragOver] = React.useState(false);
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = () => setIsDragOver(false);

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    
    const files = Array.from(e.dataTransfer.files);
    const pdfFile = files.find(f => f.type === 'application/pdf' || f.name.endsWith('.pdf'));
    
    if (pdfFile) {
      onFileSelect(pdfFile);
    } else {
      alert('Please upload a PDF file');
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) onFileSelect(file);
  };

  return (
    <div 
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      className={`upload-zone rounded-3xl p-16 text-center border-2 border-dashed transition-all ${isDragOver ? 'border-blue-500 bg-blue-50 dark:bg-blue-950/30' : 'border-zinc-200 dark:border-zinc-800'}`}
    >
      <input 
        type="file" 
        ref={fileInputRef} 
        className="hidden" 
        accept=".pdf,.docx" 
        onChange={handleFileChange} 
      />

      {isUploading ? (
        <div className="space-y-4">
          <div className="mx-auto w-16 h-16 rounded-full border-4 border-blue-600 border-t-transparent animate-spin" />
          <div className="font-medium">{t('upload.analyzing')}</div>
          <div className="max-w-[220px] mx-auto">
            <div className="h-2 bg-zinc-200 rounded-full overflow-hidden">
              <div className="progress-bar h-full bg-blue-600" style={{ width: `${progress || 45}%` }} />
            </div>
          </div>
        </div>
      ) : (
        <>
          <div className="mx-auto w-14 h-14 bg-zinc-100 dark:bg-zinc-800 rounded-2xl flex items-center justify-center mb-5">
            <Upload className="h-7 w-7 text-zinc-600 dark:text-zinc-400" />
          </div>

          <div className="text-xl font-semibold tracking-tight mb-1">{t('upload.dragDrop')}</div>
          <p className="text-muted-foreground mb-6">{t('upload.supported')}</p>

          <Button onClick={() => fileInputRef.current?.click()} className="btn-primary px-8">
            {t('upload.browse')}
          </Button>

          <div className="mt-6 text-xs text-muted-foreground">PDF • DOCX • Max 5MB</div>
        </>
      )}
    </div>
  );
}
