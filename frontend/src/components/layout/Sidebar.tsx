import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  FileText,
  Bot,
  Briefcase,
  User,
  LogOut,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { HireForgeLogo } from '../ui/HireForgeLogo';

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
    { label: 'Dashboard',     path: '/dashboard',           icon: LayoutDashboard, end: true },
    { label: 'Resume Upload', path: '/dashboard/resume',    icon: FileText },
    { label: 'AI Interview',  path: '/dashboard/interview', icon: Bot },
    { label: 'Job Tracker',   path: '/dashboard/jobs',      icon: Briefcase },
    { label: 'Profile',       path: '/dashboard/profile',   icon: User },
  ];

  return (
    <>
      {/* Mobile Backdrop */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-zinc-900/60 backdrop-blur-sm z-40 md:hidden animate-fade-in"
          onClick={onCloseMobile}
        />
      )}

      <aside
        className={`fixed md:sticky top-0 left-0 z-50 md:z-30 w-64 h-screen flex flex-col justify-between shrink-0 text-xs select-none transition-transform duration-300 ease-in-out
          bg-white dark:bg-zinc-950
          border-r border-zinc-100 dark:border-zinc-800/80
          ${mobileOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}`}
      >
        {/* Top section */}
        <div>
          {/* Brand */}
          <div className="h-16 px-5 flex items-center border-b border-zinc-100 dark:border-zinc-800/80">
            <NavLink to="/dashboard" onClick={onCloseMobile} className="flex items-center gap-2.5 group">
              <HireForgeLogo size={32} className="group-hover:opacity-90 transition-opacity shrink-0" />
              <div>
                <span className="font-bold text-sm tracking-tight text-zinc-900 dark:text-zinc-100 block leading-none">
                  HireForge <span className="text-violet-600 dark:text-violet-400">AI</span>
                </span>
                <span className="text-[10px] text-zinc-400 dark:text-zinc-500 font-medium mt-0.5 block">
                  Career Assistant
                </span>
              </div>
            </NavLink>
          </div>

          {/* Nav */}
          <nav className="p-3 space-y-0.5">
            <p className="px-3 py-2 text-[10px] font-bold text-zinc-400 dark:text-zinc-600 uppercase tracking-widest">
              Navigation
            </p>
            {navItems.map((item, i) => (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.end}
                onClick={onCloseMobile}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3 py-2.5 rounded-xl font-medium transition-all duration-200 group animate-slide-left delay-${i * 75}
                  ${isActive
                    ? 'bg-violet-600 text-white shadow-sm shadow-violet-200 dark:shadow-violet-900/40'
                    : 'text-zinc-500 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-900 hover:text-zinc-900 dark:hover:text-zinc-100'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <item.icon className={`w-4 h-4 shrink-0 transition-transform duration-200 ${isActive ? '' : 'group-hover:scale-110'}`} />
                    <span>{item.label}</span>
                    {isActive && (
                      <span className="ml-auto w-1.5 h-1.5 rounded-full bg-white/60" />
                    )}
                  </>
                )}
              </NavLink>
            ))}
          </nav>
        </div>

        {/* User Footer */}
        <div className="p-3 border-t border-zinc-100 dark:border-zinc-800/80">
          <div className="flex items-center justify-between px-2 py-2 rounded-xl hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-colors duration-200 group">
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-violet-500 to-indigo-500 flex items-center justify-center font-bold text-white text-xs shrink-0 shadow-sm">
                {user?.name?.[0]?.toUpperCase() || 'U'}
              </div>
              <div className="min-w-0">
                <p className="font-semibold text-zinc-900 dark:text-zinc-100 truncate text-xs">
                  {user?.name || 'User'}
                </p>
                <p className="text-[10px] text-zinc-400 dark:text-zinc-500 truncate">
                  {user?.email || ''}
                </p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              title="Logout"
              className="p-1.5 rounded-lg text-zinc-400 hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-all duration-200 cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};
