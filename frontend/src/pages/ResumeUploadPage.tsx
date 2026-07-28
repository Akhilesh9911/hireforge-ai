import React, { useState } from 'react';
import {
  Upload, FileText, CheckCircle2, AlertCircle, Sparkles, X, File,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { resumeService } from '../services/resumeService';
import { MarkdownRenderer } from '../components/ui/MarkdownRenderer';

export const ResumeUploadPage: React.FC = () => {
  const [isDragging, setIsDragging] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [analysis, setAnalysis] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleDragOver = (e: React.DragEvent) => { e.preventDefault(); setIsDragging(true); };
  const handleDragLeave = () => setIsDragging(false);

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault(); setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) { setSelectedFile(file); setErrorMsg(null); setAnalysis(null); }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) { setSelectedFile(file); setErrorMsg(null); setAnalysis(null); }
  };

  const handleUpload = async () => {
    if (!selectedFile) return;
    setIsUploading(true); setErrorMsg(null); setAnalysis(null);
    try {
      const result = await resumeService.uploadResume(selectedFile);
      setAnalysis(result);
    } catch (err: any) {
      const msg = err?.response?.data || err?.response?.data?.message || 'Failed to analyze resume. Please try again.';
      setErrorMsg(typeof msg === 'string' ? msg : 'Failed to analyze resume. Please try again.');
    } finally {
      setIsUploading(false);
    }
  };

  const handleClear = () => { setSelectedFile(null); setAnalysis(null); setErrorMsg(null); };

  const fileSizeKB = selectedFile ? (selectedFile.size / 1024).toFixed(0) : null;

  return (
    <div className="space-y-5 max-w-4xl">
      {/* Header */}
      <div>
        <h2 className="text-lg font-bold text-zinc-900 dark:text-zinc-100">Resume Analyzer</h2>
        <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
          Upload your resume and get an ATS score, skill gap analysis, and recommendations from Gemini AI.
        </p>
      </div>

      {/* Upload Card */}
      <Card>
        <CardContent className="p-5 space-y-4">
          {/* Drop zone */}
          <div
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            className={`relative border-2 border-dashed rounded-2xl transition-all duration-200 ${
              isDragging
                ? 'border-violet-400 bg-violet-50 dark:border-violet-500 dark:bg-violet-950/20 scale-[1.01]'
                : selectedFile
                ? 'border-emerald-300 bg-emerald-50/50 dark:border-emerald-800 dark:bg-emerald-950/10'
                : 'border-zinc-300 dark:border-zinc-700 hover:border-zinc-400 dark:hover:border-zinc-600 bg-zinc-50/50 dark:bg-zinc-900/30'
            }`}
          >
            <input
              type="file"
              accept=".pdf,.docx"
              id="resume-file-input"
              className="hidden"
              onChange={handleFileSelect}
            />
            <label htmlFor="resume-file-input" className="cursor-pointer block p-8 text-center">
              {selectedFile ? (
                <div className="space-y-3">
                  <div className="w-12 h-12 rounded-2xl bg-emerald-100 dark:bg-emerald-900/40 flex items-center justify-center mx-auto">
                    <File className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">{selectedFile.name}</p>
                    <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">{fileSizeKB} KB — Click to change file</p>
                  </div>
                </div>
              ) : (
                <div className="space-y-3">
                  <div className="w-12 h-12 rounded-2xl bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center mx-auto">
                    <Upload className="w-6 h-6 text-zinc-500 dark:text-zinc-400" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-zinc-800 dark:text-zinc-200">
                      Drop your resume here, or <span className="text-violet-600 dark:text-violet-400">browse</span>
                    </p>
                    <p className="text-xs text-zinc-400 mt-1">Supports PDF and DOCX — Max 10MB</p>
                  </div>
                </div>
              )}
            </label>
          </div>

          {/* Uploading state */}
          {isUploading && (
            <div className="flex items-center gap-3 p-4 rounded-xl bg-violet-50 dark:bg-violet-950/20 border border-violet-200 dark:border-violet-800/50">
              <div className="w-8 h-8 rounded-lg bg-violet-100 dark:bg-violet-900/40 flex items-center justify-center shrink-0">
                <Sparkles className="w-4 h-4 text-violet-600 dark:text-violet-400 animate-pulse" />
              </div>
              <div>
                <p className="text-xs font-semibold text-violet-800 dark:text-violet-200">Analyzing with Gemini AI...</p>
                <p className="text-[11px] text-violet-600 dark:text-violet-400 mt-0.5">This usually takes 15–30 seconds</p>
              </div>
            </div>
          )}

          {/* Error */}
          {errorMsg && (
            <div className="flex items-start gap-2.5 p-3.5 rounded-xl border border-red-200 bg-red-50 dark:border-red-900/50 dark:bg-red-950/20 text-red-700 dark:text-red-300 text-xs">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-red-500" />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* Actions */}
          <div className="flex items-center justify-between pt-1">
            <p className="text-[11px] text-zinc-400">
              {selectedFile ? `Ready to analyze: ${selectedFile.name}` : 'No file selected'}
            </p>
            <div className="flex items-center gap-2">
              {(selectedFile || analysis) && (
                <Button variant="outline" size="sm" onClick={handleClear} disabled={isUploading} icon={<X className="w-3.5 h-3.5" />}>
                  Clear
                </Button>
              )}
              <Button
                size="sm"
                onClick={handleUpload}
                disabled={!selectedFile || isUploading}
                isLoading={isUploading}
                icon={<Sparkles className="w-3.5 h-3.5" />}
              >
                Analyze Resume
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Analysis result */}
      {analysis && (
        <Card className="overflow-hidden">
          <div className="flex items-center justify-between px-5 py-3.5 bg-gradient-to-r from-emerald-50 to-transparent dark:from-emerald-950/20 dark:to-transparent border-b border-zinc-100 dark:border-zinc-800">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-emerald-100 dark:bg-emerald-900/40 flex items-center justify-center">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              </div>
              <div>
                <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">Analysis Complete</p>
                <p className="text-[11px] text-zinc-500 dark:text-zinc-400">{selectedFile?.name}</p>
              </div>
            </div>
            <span className="hidden sm:flex items-center gap-1.5 text-[10px] font-semibold text-emerald-700 dark:text-emerald-400 bg-emerald-100 dark:bg-emerald-900/40 px-2.5 py-1 rounded-full">
              <Sparkles className="w-3 h-3" /> Gemini AI
            </span>
          </div>
          <CardContent className="p-6 max-h-[72vh] overflow-y-auto">
            <MarkdownRenderer content={analysis} />
          </CardContent>
        </Card>
      )}
    </div>
  );
};
