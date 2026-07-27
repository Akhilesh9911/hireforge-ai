import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  FileText,
  Bot,
  Briefcase,
  ArrowUpRight,
  Sparkles,
  CheckCircle2,
  XCircle,
  Clock,
  Layers
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { jobService } from '../services/jobService';
import { JobApplication } from '../types';

export const DashboardPage: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [jobs, setJobs] = useState<JobApplication[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const loadDashboardData = async () => {
      setIsLoading(true);
      const jobList = await jobService.getJobs();
      setJobs(jobList);
      setIsLoading(false);
    };
    loadDashboardData();
  }, []);

  const applicationsCount = jobs.length;
  const interviewsCount = jobs.filter((j) => j.status === 'Interviewing').length;
  const offersCount = jobs.filter((j) => j.status === 'Offer').length;
  const rejectedCount = jobs.filter((j) => j.status === 'Rejected').length;

  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <Card className="bg-zinc-900 text-white border-none shadow-sm overflow-hidden relative">
        <div className="p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 relative z-10">
          <div className="space-y-2 max-w-xl">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-zinc-800 text-[11px] font-medium text-zinc-300">
              <Sparkles className="w-3 h-3 text-zinc-100" />
              <span>Career Assistant</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight">
              Welcome back, {user?.name || 'User'}
            </h2>
            <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
              Analyze your resumes, practice AI-generated interview questions, and manage your job application pipeline from one workspace.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2 shrink-0">
            <Button
              variant="secondary"
              size="sm"
              onClick={() => navigate('/dashboard/resume')}
              icon={<FileText className="w-3.5 h-3.5" />}
            >
              Upload Resume
            </Button>
            <Button
              variant="primary"
              size="sm"
              className="bg-white text-zinc-900 hover:bg-zinc-100 dark:bg-zinc-100 dark:text-zinc-900"
              onClick={() => navigate('/dashboard/interview')}
              icon={<Bot className="w-3.5 h-3.5" />}
            >
              Practice Interview
            </Button>
          </div>
        </div>
      </Card>

      {/* Metrics Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 flex items-center justify-between">
            <div>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 font-medium">Applications</p>
              <h3 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 mt-1">{applicationsCount}</h3>
            </div>
            <div className="w-9 h-9 rounded-lg bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center text-zinc-700 dark:text-zinc-300">
              <Briefcase className="w-4 h-4" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 flex items-center justify-between">
            <div>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 font-medium">Interviews</p>
              <h3 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 mt-1">{interviewsCount}</h3>
            </div>
            <div className="w-9 h-9 rounded-lg bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center text-zinc-700 dark:text-zinc-300">
              <Clock className="w-4 h-4" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 flex items-center justify-between">
            <div>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 font-medium">Offers</p>
              <h3 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 mt-1">{offersCount}</h3>
            </div>
            <div className="w-9 h-9 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
              <CheckCircle2 className="w-4 h-4" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 flex items-center justify-between">
            <div>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 font-medium">Rejected</p>
              <h3 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 mt-1">{rejectedCount}</h3>
            </div>
            <div className="w-9 h-9 rounded-lg bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center text-zinc-500 dark:text-zinc-400">
              <XCircle className="w-4 h-4" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Action Navigation Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card
          className="hover:border-zinc-400 dark:hover:border-zinc-700 transition-colors cursor-pointer group"
          onClick={() => navigate('/dashboard/resume')}
        >
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm">Resume Analyzer</CardTitle>
            <ArrowUpRight className="w-4 h-4 text-zinc-400 group-hover:text-zinc-900 dark:group-hover:text-zinc-100 transition-colors" />
          </CardHeader>
          <CardContent>
            <p className="text-xs text-zinc-500 dark:text-zinc-400">
              Upload your resume and receive AI-powered insights.
            </p>
          </CardContent>
        </Card>

        <Card
          className="hover:border-zinc-400 dark:hover:border-zinc-700 transition-colors cursor-pointer group"
          onClick={() => navigate('/dashboard/interview')}
        >
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm">AI Interview Generator</CardTitle>
            <ArrowUpRight className="w-4 h-4 text-zinc-400 group-hover:text-zinc-900 dark:group-hover:text-zinc-100 transition-colors" />
          </CardHeader>
          <CardContent>
            <p className="text-xs text-zinc-500 dark:text-zinc-400">
              Practice personalized interview questions based on your resume.
            </p>
          </CardContent>
        </Card>

        <Card
          className="hover:border-zinc-400 dark:hover:border-zinc-700 transition-colors cursor-pointer group"
          onClick={() => navigate('/dashboard/jobs')}
        >
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm">Job Tracker</CardTitle>
            <ArrowUpRight className="w-4 h-4 text-zinc-400 group-hover:text-zinc-900 dark:group-hover:text-zinc-100 transition-colors" />
          </CardHeader>
          <CardContent>
            <p className="text-xs text-zinc-500 dark:text-zinc-400">
              Manage job applications and update their status.
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity Card with Proper Empty State */}
      <Card>
        <CardHeader className="py-4">
          <CardTitle className="text-sm font-semibold">Recent Activity</CardTitle>
        </CardHeader>

        <CardContent className="p-8 text-center border-t border-zinc-100 dark:border-zinc-800">
          <div className="max-w-xs mx-auto space-y-2">
            <p className="text-xs text-zinc-500 dark:text-zinc-400">No recent activity.</p>
            <p className="text-[11px] text-zinc-400 dark:text-zinc-500">
              Get started by uploading your resume or adding a job application.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

