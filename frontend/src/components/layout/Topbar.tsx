import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { User, Menu, FileText, Bot, Briefcase, LayoutDashboard } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

interface TopbarProps {
  onToggleMobileMenu?: () => void;
}

const PAGE_META: Record<string, { title: string; icon: React.ReactNode }> = {
  '/dashboard/resume':    { title: 'Resume Upload',    icon: <FileText className="w-4 h-4" /> },
  '/dashboard/interview': { title: 'AI Interview',     icon: <Bot className="w-4 h-4" /> },
  '/dashboard/jobs':      { title: 'Job Tracker',      icon: <Briefcase className="w-4 h-4" /> },
  '/dashboard/profile':   { title: 'Profile',          icon: <User className="w-4 h-4" /> },
  '/dashboard':           { title: 'Dashboard',        icon: <LayoutDashboard className="w-4 h-4" /> },
};

export const Topbar: React.FC<TopbarProps> = ({ onToggleMobileMenu }) => {
  const location = useLocation();
  const { user } = useAuth();

  const meta = Object.entries(PAGE_META).find(([path]) =>
    location.pathname === path || (path !== '/dashboard' && location.pathname.startsWith(path))
  )?.[1] ?? { title: 'Dashboard', icon: <LayoutDashboard className="w-4 h-4" /> };

  return (
    <header className="h-14 border-b border-zinc-100 dark:border-zinc-800/80 bg-white/95 dark:bg-zinc-950/95 backdrop-blur-sm px-4 sm:px-6 flex items-center justify-between sticky top-0 z-30 shrink-0">
      <div className="flex items-center gap-3">
        <button
          onClick={onToggleMobileMenu}
          className="md:hidden p-1.5 rounded-xl text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-all duration-200"
          aria-label="Toggle Navigation"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2">
          <span className="text-violet-500 dark:text-violet-400">{meta.icon}</span>
          <h1 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">{meta.title}</h1>
        </div>
      </div>

      <Link
        to="/dashboard/profile"
        className="w-8 h-8 rounded-full bg-gradient-to-br from-violet-500 to-indigo-500 flex items-center justify-center text-white text-xs font-bold hover:shadow-md hover:shadow-violet-200 dark:hover:shadow-violet-900/40 transition-all duration-200"
        title="Profile"
      >
        {user?.name?.[0]?.toUpperCase() || 'U'}
      </Link>
    </header>
  );
};
