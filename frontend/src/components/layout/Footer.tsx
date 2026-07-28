import React from 'react';
import { Link } from 'react-router-dom';
import { HireForgeLogo } from '../ui/HireForgeLogo';

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 py-10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2.5">
            <HireForgeLogo size={28} />
            <div>
              <p className="font-bold text-sm text-zinc-900 dark:text-zinc-100 leading-none">HireForge AI</p>
              <p className="text-[11px] text-zinc-500 mt-0.5">AI-powered career assistant</p>
            </div>
          </div>

          <nav className="flex items-center gap-5 text-xs text-zinc-500 dark:text-zinc-400">
            <Link to="/" className="hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors">Home</Link>
            <a href="#features" className="hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors">Features</a>
            <Link to="/login" className="hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors">Login</Link>
            <Link to="/register" className="hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors">Register</Link>
          </nav>

          <p className="text-xs text-zinc-400">© 2026 HireForge AI. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};
