import React, { useState, useEffect } from 'react';
import {
  Upload,
  FileText,
  Trash2,
  CheckCircle2,
  AlertCircle,
  FileCheck2,
  Sparkles,
  Download,
  Target
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Badge } from '../components/ui/Badge';
import { Loader } from '../components/ui/Loader';
import { Resume } from '../types';
import { resumeService } from '../services/resumeService';

export const ResumeUploadPage: React.FC = () => {
  const [resumes, setResumes] = useState<Resume[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [targetRole, setTargetRole] = useState('Software Engineer');
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const fetchResumes = async () => {
    const list = await resumeService.getResumes();
    setResumes(list);
  };

  useEffect(() => {
    fetchResumes();
  }, []);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      if (file.type === 'application/pdf' || file.name.endsWith('.pdf')) {
        setSelectedFile(file);
        setErrorMsg(null);
      } else {
        setErrorMsg('Please upload a PDF document (.pdf).');
      }
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);
      setErrorMsg(null);
    }
  };

  const handleStartUpload = async () => {
    if (!selectedFile) return;
    setIsUploading(true);
    setUploadProgress(15);
    setSuccessMsg(null);
    setErrorMsg(null);

    // Simulate progress animation for realistic UX
    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 90) {
          clearInterval(interval);
          return 90;
        }
        return prev + 25;
      });
    }, 300);

    try {
      const newResume = await resumeService.uploadResume(selectedFile, targetRole);
      clearInterval(interval);
      setUploadProgress(100);

      setTimeout(() => {
        setIsUploading(false);
        setSelectedFile(null);
        setUploadProgress(0);
        setSuccessMsg(`Successfully uploaded and analyzed ${newResume.fileName}`);
        fetchResumes();
      }, 500);
    } catch {
      clearInterval(interval);
      setIsUploading(false);
      setErrorMsg('Failed to process resume upload. Please try again.');
    }
  };

  const handleDelete = async (id: string) => {
    await resumeService.deleteResume(id);
    fetchResumes();
  };

  return (
    <div className="space-y-6">
      {/* Header Info */}
      <div className="space-y-1">
        <h2 className="text-lg font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
          <FileText className="w-5 h-5 text-zinc-700 dark:text-zinc-300" /> Resume Upload & ATS Parsing
        </h2>
        <p className="text-xs text-zinc-500 dark:text-zinc-400">
          Upload PDF resumes to extract skills, calculate ATS match score, and receive targeted insights.
        </p>
      </div>

      {/* Target Role Input + Drag & Drop Upload Zone */}
      <Card>
        <CardHeader>
          <CardTitle className="text-sm">Upload New Resume</CardTitle>
          <CardDescription className="text-xs">
            Select a target position and drag & drop your PDF resume
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">
          <Input
            label="Target Position / Role"
            value={targetRole}
            onChange={(e) => setTargetRole(e.target.value)}
            placeholder="e.g. Software Engineer"
            icon={<Target className="w-4 h-4" />}
          />

          {/* Drag & Drop Area */}
          <div
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            className={`border-2 border-dashed rounded-xl p-8 text-center transition-colors cursor-pointer ${
              isDragging
                ? 'border-zinc-900 bg-zinc-100/80 dark:border-zinc-100 dark:bg-zinc-800/80'
                : 'border-zinc-300 dark:border-zinc-700 bg-zinc-50/50 dark:bg-zinc-900/40 hover:bg-zinc-100/50 dark:hover:bg-zinc-800/40'
            }`}
          >
            <input
              type="file"
              accept=".pdf"
              id="resume-file-input"
              className="hidden"
              onChange={handleFileSelect}
            />

            <label htmlFor="resume-file-input" className="cursor-pointer space-y-2 block">
              <div className="w-10 h-10 rounded-full bg-zinc-200 dark:bg-zinc-800 flex items-center justify-center text-zinc-700 dark:text-zinc-300 mx-auto">
                <Upload className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs font-semibold text-zinc-800 dark:text-zinc-200">
                  {selectedFile ? selectedFile.name : 'Click to select or drag and drop PDF file'}
                </p>
                <p className="text-[11px] text-zinc-400 mt-0.5">
                  PDF format required (Max size 10MB)
                </p>
              </div>
            </label>
          </div>

          {/* Upload Progress & Actions */}
          {isUploading && (
            <div className="space-y-1.5 p-3 rounded-lg bg-zinc-100 dark:bg-zinc-800/80">
              <div className="flex justify-between text-xs font-mono">
                <span>Analyzing skills & ATS score...</span>
                <span>{uploadProgress}%</span>
              </div>
              <div className="w-full h-1.5 bg-zinc-200 dark:bg-zinc-700 rounded-full overflow-hidden">
                <div
                  className="h-full bg-zinc-900 dark:bg-zinc-100 transition-all duration-300"
                  style={{ width: `${uploadProgress}%` }}
                />
              </div>
            </div>
          )}

          {successMsg && (
            <div className="p-3 rounded-lg border border-emerald-200 bg-emerald-50 dark:border-emerald-900/50 dark:bg-emerald-950/20 text-emerald-800 dark:text-emerald-300 text-xs flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600" />
              <span>{successMsg}</span>
            </div>
          )}

          {errorMsg && (
            <div className="p-3 rounded-lg border border-rose-200 bg-rose-50 dark:border-rose-900/50 dark:bg-rose-950/20 text-rose-800 dark:text-rose-300 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
              <span>{errorMsg}</span>
            </div>
          )}

          <div className="flex justify-end gap-2 pt-2">
            {selectedFile && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => setSelectedFile(null)}
                disabled={isUploading}
              >
                Clear Selection
              </Button>
            )}
            <Button
              size="sm"
              onClick={handleStartUpload}
              disabled={!selectedFile || isUploading}
              isLoading={isUploading}
              icon={<Upload className="w-3.5 h-3.5" />}
            >
              Upload & Analyze
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Uploaded Resumes List */}
      <div className="space-y-4">
        <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
          Parsed Resumes ({resumes.length})
        </h3>

        {resumes.length === 0 ? (
          <Card className="p-8 text-center text-xs text-zinc-500">
            No resumes uploaded yet. Upload a PDF file above to begin ATS parsing.
          </Card>
        ) : (
          <div className="space-y-4">
            {resumes.map((res) => (
              <Card key={res.id}>
                <CardHeader className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-3">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-9 h-9 rounded-lg bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center text-zinc-800 dark:text-zinc-200 shrink-0">
                      <FileCheck2 className="w-5 h-5" />
                    </div>
                    <div className="min-w-0">
                      <CardTitle className="text-sm font-semibold truncate">{res.fileName}</CardTitle>
                      <p className="text-[11px] text-zinc-400 font-mono mt-0.5">
                        Target: {res.targetRole} • {res.fileSize} • Uploaded {res.uploadDate}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="text-right">
                      <span className="text-[10px] text-zinc-400 uppercase tracking-wider block font-medium">ATS Match</span>
                      <span className="text-base font-bold text-emerald-600 dark:text-emerald-400 font-mono">
                        {res.atsScore}%
                      </span>
                    </div>

                    <button
                      onClick={() => handleDelete(res.id)}
                      className="p-2 rounded-lg text-zinc-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/30 transition-colors"
                      title="Delete Resume"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </CardHeader>

                <CardContent className="space-y-3 pt-0 border-t border-zinc-100 dark:border-zinc-800/60 mt-3">
                  <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed pt-3">
                    {res.summary}
                  </p>

                  <div>
                    <span className="text-[10px] font-semibold text-zinc-400 uppercase tracking-wider block mb-1.5">
                      Extracted Tech Skills
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {res.extractedSkills.map((skill, idx) => (
                        <Badge key={idx} variant="default" size="sm">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
