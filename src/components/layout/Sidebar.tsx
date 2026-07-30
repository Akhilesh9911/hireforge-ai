import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  FileText,
  Bot,
  Briefcase,
  User,
  LogOut,
  Sparkles,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

interface SidebarProps {
  mobileOpen?: boolean;
  onCloseMobile?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ mobileOpen = false, onCloseMobile }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  const navItems = [
    { label: 'Dashboard', path: '/dashboard', icon: LayoutDashboard, end: true },
    { label: 'Resume Upload', path: '/dashboard/resume', icon: FileText },
    { label: 'AI Interview', path: '/dashboard/interview', icon: Bot },
    { label: 'Job Tracker', path: '/dashboard/jobs', icon: Briefcase },
    { label: 'Profile', path: '/dashboard/profile', icon: User },
  ];

  return (
    <>
      {/* Mobile Backdrop */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-zinc-900/50 backdrop-blur-xs z-40 md:hidden"
          onClick={onCloseMobile}
        />
      )}

      <aside
        className={`fixed md:sticky top-0 left-0 z-50 md:z-30 w-64 h-screen border-r border-zinc-200 dark:border-zinc-800 bg-zinc-50/95 dark:bg-zinc-950/95 backdrop-blur-md md:backdrop-blur-none flex flex-col justify-between shrink-0 text-xs select-none transition-transform duration-200 ${
          mobileOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        }`}
      >
        <div>
          {/* Brand Header */}
          <div className="h-14 px-4 border-b border-zinc-200 dark:border-zinc-800 flex items-center justify-between">
            <NavLink to="/dashboard" onClick={onCloseMobile} className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-md bg-zinc-900 dark:bg-zinc-100 flex items-center justify-center text-white dark:text-zinc-900">
                <Sparkles className="w-4 h-4" />
              </div>
              <div>
                <span className="font-semibold text-sm tracking-tight text-zinc-900 dark:text-zinc-100 block leading-none">
                  HireForge AI
                </span>
                <span className="text-[10px] text-zinc-500 font-medium mt-0.5 block">
                  Career Assistant
                </span>
              </div>
            </NavLink>
          </div>

          {/* Nav Links */}
          <div className="p-3 space-y-1">
            <div className="px-2 py-1.5 text-[10px] font-semibold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider">
              Navigation
            </div>
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.end}
                onClick={onCloseMobile}
                className={({ isActive }) =>
                  `flex items-center gap-2.5 px-3 py-2 rounded-lg font-medium transition-colors ${
                    isActive
                      ? 'bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900 shadow-xs'
                      : 'text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200/60 dark:hover:bg-zinc-900 hover:text-zinc-900 dark:hover:text-zinc-100'
                  }`
                }
              >
                <item.icon className="w-4 h-4 shrink-0" />
                <span>{item.label}</span>
              </NavLink>
            ))}
          </div>
        </div>

        {/* User Info & Logout Footer */}
        <div className="p-3 border-t border-zinc-200 dark:border-zinc-800 bg-white/50 dark:bg-zinc-900/50">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 min-w-0">
              {user?.avatarUrl ? (
                <img src={user.avatarUrl} alt={user.name} className="w-7 h-7 rounded-full object-cover shrink-0 border border-zinc-200" />
              ) : (
                <div className="w-7 h-7 rounded-full bg-zinc-200 dark:bg-zinc-800 flex items-center justify-center font-semibold text-zinc-700 dark:text-zinc-300 text-xs shrink-0">
                  {user?.name?.[0]?.toUpperCase() || 'U'}
                </div>
              )}
              <div className="min-w-0">
                <p className="font-semibold text-zinc-900 dark:text-zinc-100 truncate text-xs">{user?.name || 'User'}</p>
                <p className="text-[10px] text-zinc-500 dark:text-zinc-400 truncate">{user?.email || 'user@hireforge.ai'}</p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              title="Logout"
              className="p-1.5 rounded-md text-zinc-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/40 transition-colors cursor-pointer"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};

