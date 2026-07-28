import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  FileText, Bot, Briefcase, ArrowUpRight, Sparkles,
  CheckCircle2, XCircle, Clock, Building, Calendar,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { jobService } from '../services/jobService';
import { JobApplication } from '../types';

const STATUS_LABELS: Record<string, string> = {
  APPLIED: 'Applied', INTERVIEW: 'Interview', OFFER: 'Offer', REJECTED: 'Rejected',
};
const getBadgeVariant = (status: string) => {
  switch (status) {
    case 'OFFER':     return 'success' as const;
    case 'INTERVIEW': return 'warning' as const;
    case 'APPLIED':   return 'info' as const;
    case 'REJECTED':  return 'danger' as const;
    default:          return 'neutral' as const;
  }
};

export const DashboardPage: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [jobs, setJobs] = useState<JobApplication[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    jobService.getJobs()
      .then(setJobs)
      .catch(() => {})
      .finally(() => setIsLoading(false));
  }, []);

  const total      = jobs.length;
  const interviews = jobs.filter(j => j.status === 'INTERVIEW').length;
  const offers     = jobs.filter(j => j.status === 'OFFER').length;
  const rejected   = jobs.filter(j => j.status === 'REJECTED').length;
  const recentJobs = [...jobs].slice(0, 5);

  const stats = [
    { label: 'Applications', value: total,      icon: Briefcase,    color: 'text-violet-600 dark:text-violet-400',   bg: 'bg-violet-50 dark:bg-violet-950/40' },
    { label: 'Interviews',   value: interviews, icon: Clock,        color: 'text-amber-600 dark:text-amber-400',     bg: 'bg-amber-50 dark:bg-amber-950/40' },
    { label: 'Offers',       value: offers,     icon: CheckCircle2, color: 'text-emerald-600 dark:text-emerald-400', bg: 'bg-emerald-50 dark:bg-emerald-950/40' },
    { label: 'Rejected',     value: rejected,   icon: XCircle,      color: 'text-zinc-500 dark:text-zinc-400',       bg: 'bg-zinc-100 dark:bg-zinc-800' },
  ];

  const quickActions = [
    { label: 'Resume Analyzer',          desc: 'Upload your resume and receive AI-powered insights.', path: '/dashboard/resume',    icon: FileText },
    { label: 'AI Interview Generator',   desc: 'Practice personalized interview questions based on your resume.', path: '/dashboard/interview', icon: Bot },
    { label: 'Job Tracker',              desc: 'Manage job applications and update their status.', path: '/dashboard/jobs',      icon: Briefcase },
  ];

  return (
    <div className="space-y-6 page-enter">
      {/* Welcome Banner */}
      <div className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-violet-600 via-indigo-600 to-purple-700 p-6 sm:p-8 shadow-lg shadow-violet-200 dark:shadow-violet-900/30">
        {/* decorative blobs */}
        <div className="absolute -top-10 -right-10 w-48 h-48 rounded-full bg-white/10 blur-2xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/3 w-32 h-32 rounded-full bg-indigo-900/30 blur-2xl pointer-events-none" />

        <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/20 text-[11px] font-semibold text-white/90 backdrop-blur-sm border border-white/20">
              <Sparkles className="w-3 h-3" />
              Career Assistant
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Welcome back, {user?.name?.split(' ')[0] || 'User'} 👋
            </h2>
            <p className="text-violet-200 text-sm max-w-md leading-relaxed">
              Analyze resumes, practice AI interview questions, and manage your application pipeline from one workspace.
            </p>
          </div>
          <div className="flex flex-wrap gap-2 shrink-0">
            <Button
              size="sm"
              className="bg-white/20 hover:bg-white/30 text-white border border-white/30 backdrop-blur-sm"
              onClick={() => navigate('/dashboard/resume')}
              icon={<FileText className="w-3.5 h-3.5" />}
            >
              Upload Resume
            </Button>
            <Button
              size="sm"
              className="bg-white !text-violet-700 hover:bg-violet-50 shadow-sm font-semibold"
              onClick={() => navigate('/dashboard/interview')}
              icon={<Bot className="w-3.5 h-3.5 text-violet-600" />}
            >
              Practice Interview
            </Button>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map(({ label, value, icon: Icon, color, bg }, i) => (
          <Card key={label} className={`animate-slide-up delay-${i * 75} hover:shadow-md transition-shadow duration-300`}>
            <CardContent className="p-4 flex items-center justify-between">
              <div>
                <p className="text-xs text-zinc-500 dark:text-zinc-400 font-medium">{label}</p>
                <h3 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 mt-1">
                  {isLoading ? <span className="inline-block w-6 h-6 rounded shimmer" /> : value}
                </h3>
              </div>
              <div className={`w-10 h-10 rounded-xl ${bg} flex items-center justify-center ${color}`}>
                <Icon className="w-5 h-5" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {quickActions.map(({ label, desc, path, icon: Icon }, i) => (
          <Card
            key={label}
            className={`cursor-pointer group hover:border-violet-300 dark:hover:border-violet-700 hover:shadow-md hover:shadow-violet-100 dark:hover:shadow-violet-900/20 transition-all duration-300 animate-slide-up delay-${(i + 4) * 75}`}
            onClick={() => navigate(path)}
          >
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-violet-50 dark:bg-violet-950/40 flex items-center justify-center text-violet-600 dark:text-violet-400 group-hover:scale-110 transition-transform duration-200">
                  <Icon className="w-3.5 h-3.5" />
                </div>
                <CardTitle className="text-sm">{label}</CardTitle>
              </div>
              <ArrowUpRight className="w-4 h-4 text-zinc-300 dark:text-zinc-600 group-hover:text-violet-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-200" />
            </CardHeader>
            <CardContent className="pt-0">
              <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">{desc}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent Applications */}
      <Card className="animate-slide-up delay-300">
        <CardHeader className="py-4 flex flex-row items-center justify-between">
          <CardTitle className="text-sm font-semibold">Recent Applications</CardTitle>
          {jobs.length > 0 && (
            <button
              onClick={() => navigate('/dashboard/jobs')}
              className="text-xs text-violet-600 dark:text-violet-400 hover:underline font-medium transition-colors"
            >
              View all →
            </button>
          )}
        </CardHeader>

        <CardContent className="p-0 border-t border-zinc-100 dark:border-zinc-800">
          {isLoading ? (
            <div className="divide-y divide-zinc-100 dark:divide-zinc-800">
              {[1,2,3].map(i => (
                <div key={i} className="flex items-center gap-3 px-5 py-3">
                  <div className="w-7 h-7 rounded-lg shimmer" />
                  <div className="space-y-1.5 flex-1">
                    <div className="h-3 w-32 rounded shimmer" />
                    <div className="h-2.5 w-20 rounded shimmer" />
                  </div>
                </div>
              ))}
            </div>
          ) : recentJobs.length === 0 ? (
            <div className="p-10 text-center space-y-2">
              <p className="text-sm text-zinc-500 dark:text-zinc-400">No job applications yet.</p>
              <button onClick={() => navigate('/dashboard/jobs')} className="text-xs font-semibold text-violet-600 dark:text-violet-400 hover:underline mt-1">
                Add your first application →
              </button>
            </div>
          ) : (
            <ul className="divide-y divide-zinc-100 dark:divide-zinc-800/80">
              {recentJobs.map((job, i) => (
                <li
                  key={job.id}
                  className={`flex items-center justify-between px-5 py-3 hover:bg-violet-50/40 dark:hover:bg-violet-950/10 transition-colors duration-150 cursor-pointer animate-fade-in delay-${i * 75}`}
                  onClick={() => navigate('/dashboard/jobs')}
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div className="w-7 h-7 rounded-lg bg-violet-50 dark:bg-violet-950/40 flex items-center justify-center shrink-0">
                      <Building className="w-3.5 h-3.5 text-violet-500 dark:text-violet-400" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs font-semibold text-zinc-900 dark:text-zinc-100 truncate">{job.companyName}</p>
                      <p className="text-[11px] text-zinc-400 dark:text-zinc-500 truncate">{job.jobTitle}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 shrink-0 ml-3">
                    {job.appliedDate && (
                      <span className="text-[10px] text-zinc-400 font-mono hidden sm:flex items-center gap-1">
                        <Calendar className="w-3 h-3" /> {job.appliedDate}
                      </span>
                    )}
                    <Badge variant={getBadgeVariant(job.status)} size="sm">
                      {STATUS_LABELS[job.status] ?? job.status}
                    </Badge>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
