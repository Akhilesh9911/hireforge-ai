import React from 'react';
import { User, Mail, LogOut, Shield } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../components/ui/Card';
import { Button } from '../components/ui/Button';

export const ProfilePage: React.FC = () => {
  const { user, logout } = useAuth();

  return (
    <div className="space-y-6 max-w-3xl">
      <div className="space-y-1">
        <h2 className="text-lg font-bold text-zinc-900 dark:text-zinc-100">Account & Profile</h2>
        <p className="text-xs text-zinc-500 dark:text-zinc-400">Your account information from HireForge AI</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {/* Avatar card */}
        <Card className="md:col-span-1 flex flex-col items-center text-center p-6 gap-4">
          <div className="relative">
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-violet-500 to-blue-600 flex items-center justify-center font-bold text-3xl text-white shadow-lg">
              {user?.name?.[0]?.toUpperCase() || 'U'}
            </div>
            <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-emerald-500 border-2 border-white dark:border-zinc-900" title="Active" />
          </div>

          <div>
            <h3 className="font-bold text-sm text-zinc-900 dark:text-zinc-100">{user?.name}</h3>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">{user?.email}</p>
          </div>

          <div className="w-full pt-2 border-t border-zinc-100 dark:border-zinc-800 space-y-2">
            <div className="flex items-center justify-between text-[11px]">
              <span className="text-zinc-500">Account ID</span>
              <span className="font-mono text-zinc-700 dark:text-zinc-300">#{user?.id}</span>
            </div>
            <div className="flex items-center justify-between text-[11px]">
              <span className="text-zinc-500">Status</span>
              <span className="text-emerald-600 dark:text-emerald-400 font-medium flex items-center gap-1">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" /> Active
              </span>
            </div>
          </div>

          <Button
            variant="danger"
            size="sm"
            className="w-full"
            onClick={logout}
            icon={<LogOut className="w-3.5 h-3.5" />}
          >
            Sign Out
          </Button>
        </Card>

        {/* Info card */}
        <div className="md:col-span-2 space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <User className="w-4 h-4 text-zinc-500" />
                <CardTitle className="text-sm">Account Information</CardTitle>
              </div>
              <CardDescription className="text-xs">
                Details registered with your HireForge AI account
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-[10px] font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                  Full Name
                </label>
                <div className="flex items-center gap-2.5 px-3 py-2.5 rounded-lg border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-900/60">
                  <User className="w-3.5 h-3.5 text-zinc-400 shrink-0" />
                  <span className="text-sm text-zinc-800 dark:text-zinc-200">{user?.name}</span>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                  Email Address
                </label>
                <div className="flex items-center gap-2.5 px-3 py-2.5 rounded-lg border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-900/60">
                  <Mail className="w-3.5 h-3.5 text-zinc-400 shrink-0" />
                  <span className="text-sm text-zinc-800 dark:text-zinc-200">{user?.email}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4 flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-blue-50 dark:bg-blue-950/40 flex items-center justify-center shrink-0">
                <Shield className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <p className="text-xs font-semibold text-zinc-900 dark:text-zinc-100">Secured with JWT</p>
                <p className="text-[11px] text-zinc-500 dark:text-zinc-400 mt-0.5">
                  Your session is protected with industry-standard JWT authentication
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};
