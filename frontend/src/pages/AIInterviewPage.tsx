import React, { useState } from 'react';
import {
  Bot, Upload, Sparkles, AlertCircle, FileText, Copy, Check, X, File, Briefcase,
} from 'lucide-react';
import { Card, CardContent } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { interviewService, InterviewResult } from '../services/interviewService';
import { MarkdownRenderer } from '../components/ui/MarkdownRenderer';

export const AIInterviewPage: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [jobRole, setJobRole] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [result, setResult] = useState<InterviewResult | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleDragOver = (e: React.DragEvent) => { e.preventDefault(); setIsDragging(true); };
  const handleDragLeave = () => setIsDragging(false);

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault(); setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) { setSelectedFile(file); setErrorMsg(null); }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) { setSelectedFile(file); setErrorMsg(null); }
  };

  const handleGenerate = async () => {
    if (!selectedFile || !jobRole.trim()) return;
    setIsGenerating(true); setErrorMsg(null); setResult(null);
    try {
      const data = await interviewService.generateQuestions(selectedFile, jobRole.trim());
      setResult(data);
    } catch (err: any) {
      const msg = err?.response?.data?.message || err?.response?.data || 'Failed to generate questions. Please try again.';
      setErrorMsg(typeof msg === 'string' ? msg : 'Failed to generate questions. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCopy = () => {
    if (!result) return;
    navigator.clipboard.writeText(result.questions);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleClear = () => { setSelectedFile(null); setJobRole(''); setResult(null); setErrorMsg(null); };

  const canGenerate = !!selectedFile && !!jobRole.trim() && !isGenerating;

  return (
    <div className="space-y-5 max-w-4xl">
      {/* Header */}
      <div>
        <h2 className="text-lg font-bold text-zinc-900 dark:text-zinc-100">AI Interview Prep</h2>
        <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
          Upload your resume and enter a job role — Gemini AI generates tailored interview questions.
        </p>
      </div>

      {/* Input card */}
      <Card>
        <CardContent className="p-5 space-y-4">
          {/* Job Role */}
          <Input
            label="Target Job Role"
            value={jobRole}
            onChange={(e) => setJobRole(e.target.value)}
            placeholder="e.g. Software Engineer, Data Scientist, Backend Developer"
            icon={<Briefcase className="w-4 h-4" />}
          />

          {/* Resume upload */}
          <div>
            <label className="block text-[10px] font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mb-1.5">
              Resume File (PDF or DOCX)
            </label>
            <div
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              className={`border-2 border-dashed rounded-2xl transition-all duration-200 ${
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
                id="interview-file-input"
                className="hidden"
                onChange={handleFileSelect}
              />
              <label htmlFor="interview-file-input" className="cursor-pointer block p-6 text-center">
                {selectedFile ? (
                  <div className="flex items-center justify-center gap-3">
                    <div className="w-8 h-8 rounded-xl bg-emerald-100 dark:bg-emerald-900/40 flex items-center justify-center shrink-0">
                      <File className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                    </div>
                    <div className="text-left">
                      <p className="text-xs font-semibold text-zinc-900 dark:text-zinc-100">{selectedFile.name}</p>
                      <p className="text-[11px] text-zinc-500 mt-0.5">Click to change</p>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <div className="w-10 h-10 rounded-xl bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center mx-auto">
                      <Upload className="w-5 h-5 text-zinc-500" />
                    </div>
                    <p className="text-xs text-zinc-500 dark:text-zinc-400">
                      Drop resume here or <span className="text-violet-600 dark:text-violet-400 font-medium">browse</span>
                    </p>
                  </div>
                )}
              </label>
            </div>
          </div>

          {/* Generating state */}
          {isGenerating && (
            <div className="flex items-center gap-3 p-4 rounded-xl bg-violet-50 dark:bg-violet-950/20 border border-violet-200 dark:border-violet-800/50">
              <div className="w-8 h-8 rounded-lg bg-violet-100 dark:bg-violet-900/40 flex items-center justify-center shrink-0">
                <Bot className="w-4 h-4 text-violet-600 dark:text-violet-400 animate-bounce" />
              </div>
              <div>
                <p className="text-xs font-semibold text-violet-800 dark:text-violet-200">Generating questions with Gemini AI...</p>
                <p className="text-[11px] text-violet-600 dark:text-violet-400 mt-0.5">Analyzing your resume for {jobRole}</p>
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
            <div className="flex items-center gap-2 text-[11px] text-zinc-400">
              {!selectedFile && <span className="flex items-center gap-1"><FileText className="w-3 h-3" /> No file</span>}
              {!jobRole && <span className="flex items-center gap-1"><Briefcase className="w-3 h-3" /> No role</span>}
              {selectedFile && jobRole && <span className="text-emerald-600 dark:text-emerald-400 font-medium">Ready to generate</span>}
            </div>
            <div className="flex items-center gap-2">
              {(selectedFile || result) && (
                <Button variant="outline" size="sm" onClick={handleClear} disabled={isGenerating} icon={<X className="w-3.5 h-3.5" />}>
                  Clear
                </Button>
              )}
              <Button
                size="sm"
                onClick={handleGenerate}
                disabled={!canGenerate}
                isLoading={isGenerating}
                icon={<Sparkles className="w-3.5 h-3.5" />}
              >
                Generate Questions
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Results */}
      {result && (
        <Card className="overflow-hidden">
          <div className="flex items-center justify-between px-5 py-3.5 bg-gradient-to-r from-violet-50 to-transparent dark:from-violet-950/20 dark:to-transparent border-b border-zinc-100 dark:border-zinc-800">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-violet-100 dark:bg-violet-900/40 flex items-center justify-center">
                <Bot className="w-4 h-4 text-violet-600 dark:text-violet-400" />
              </div>
              <div>
                <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">Interview Questions Ready</p>
                <p className="text-[11px] text-zinc-500 dark:text-zinc-400">
                  Role: <span className="font-medium text-zinc-700 dark:text-zinc-300">{result.jobRole}</span>
                </p>
              </div>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={handleCopy}
              icon={copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
            >
              {copied ? 'Copied!' : 'Copy All'}
            </Button>
          </div>
          <CardContent className="p-6 max-h-[72vh] overflow-y-auto">
            <MarkdownRenderer content={result.questions} />
          </CardContent>
        </Card>
      )}
    </div>
  );
};
