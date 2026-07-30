import React from 'react';
import { Sparkles } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 py-8 text-xs text-zinc-500">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 rounded bg-zinc-900 dark:bg-zinc-100 flex items-center justify-center text-white dark:text-zinc-900">
            <Sparkles className="w-3 h-3" />
          </div>
          <span className="font-semibold text-zinc-900 dark:text-zinc-100">HireForge AI</span>
          <span className="text-zinc-400 dark:text-zinc-500">•</span>
          <span className="text-zinc-600 dark:text-zinc-400">AI-powered career assistant for students and job seekers.</span>
        </div>
        <div>
          <span>© 2026 HireForge AI</span>
        </div>
      </div>
    </footer>
  );
};

