import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Button } from '../ui/Button';
import { HireForgeLogo } from '../ui/HireForgeLogo';

export const Navbar: React.FC = () => {
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-40 w-full border-b border-zinc-200 dark:border-zinc-800 bg-white/90 dark:bg-zinc-950/90 backdrop-blur-md">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2.5 group">
          <HireForgeLogo size={32} className="group-hover:opacity-90 transition-opacity" />
          <span className="font-bold text-sm tracking-tight text-zinc-900 dark:text-zinc-100">
            HireForge{' '}
            <span className="text-violet-600 dark:text-violet-400">AI</span>
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-6 text-xs font-medium text-zinc-600 dark:text-zinc-400">
          <Link to="/" className="hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors">Home</Link>
          <a href="#features" className="hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors">Features</a>
        </nav>

        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" onClick={() => navigate('/login')}>Login</Button>
          <Button variant="outline" size="sm" onClick={() => navigate('/register')}>Register</Button>
          <Button size="sm" onClick={() => navigate('/dashboard')} icon={<ArrowRight className="w-3.5 h-3.5" />}>
            Get Started
          </Button>
        </div>
      </div>
    </header>
  );
};
