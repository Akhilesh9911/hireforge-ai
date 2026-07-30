import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { Search, User, Menu } from 'lucide-react';

interface TopbarProps {
  onToggleMobileMenu?: () => void;
}

export const Topbar: React.FC<TopbarProps> = ({ onToggleMobileMenu }) => {
  const location = useLocation();

  const getPageTitle = (path: string) => {
    if (path.includes('/dashboard/resume')) return 'Resume Upload';
    if (path.includes('/dashboard/interview')) return 'AI Interview Generator';
    if (path.includes('/dashboard/jobs')) return 'Job Tracker';
    if (path.includes('/dashboard/profile')) return 'Profile';
    return 'Dashboard';
  };

  return (
    <header className="h-14 border-b border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 px-4 sm:px-6 flex items-center justify-between sticky top-0 z-30">
      <div className="flex items-center gap-2.5">
        <button
          onClick={onToggleMobileMenu}
          className="md:hidden p-1.5 rounded-lg text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors"
          aria-label="Toggle Navigation"
        >
          <Menu className="w-5 h-5" />
        </button>
        <h1 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
          {getPageTitle(location.pathname)}
        </h1>
      </div>

      <div className="flex items-center gap-3">
        <div className="relative hidden sm:block w-48 lg:w-64">
          <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-zinc-400" />
          <input
            type="text"
            placeholder="Search applications, questions..."
            className="w-full bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg pl-8 pr-3 py-1.5 text-xs text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 focus:outline-none focus:ring-1 focus:ring-zinc-900 dark:focus:ring-zinc-100"
          />
        </div>

        <Link
          to="/dashboard/profile"
          className="p-1.5 text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors"
          title="Account Profile"
        >
          <User className="w-4 h-4" />
        </Link>
      </div>
    </header>
  );
};

