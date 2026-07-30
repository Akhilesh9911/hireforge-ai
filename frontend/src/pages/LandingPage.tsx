import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  FileText, Bot, Briefcase, ArrowRight,
  CheckCircle2, Upload, MessageSquare, LayoutDashboard,
  Star, Zap, Shield, Sparkles,
} from 'lucide-react';
import { Navbar } from '../components/layout/Navbar';
import { Footer } from '../components/layout/Footer';
import { Button } from '../components/ui/Button';
import { HireForgeLogo } from '../components/ui/HireForgeLogo';

export const LandingPage: React.FC = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: <FileText className="w-5 h-5" />,
      color: 'bg-violet-50 dark:bg-violet-950/40 text-violet-600 dark:text-violet-400',
      title: 'Resume Analyzer',
      desc: 'Upload your resume and get an instant ATS score, skill gap analysis, and clear improvement tips — powered by Gemini AI.',
    },
    {
      icon: <Bot className="w-5 h-5" />,
      color: 'bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400',
      title: 'AI Interview Prep',
      desc: 'Get personalized interview questions based on your resume and the role you are applying for. Walk in prepared.',
    },
    {
      icon: <Briefcase className="w-5 h-5" />,
      color: 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400',
      title: 'Job Tracker',
      desc: 'Track every application and its status in one clean dashboard. Never lose track of an opportunity again.',
    },
  ];

  const steps = [
    { icon: <Upload className="w-5 h-5" />,         step: '01', title: 'Upload your resume',       desc: 'PDF or DOCX — Gemini AI reads it in seconds.' },
    { icon: <MessageSquare className="w-5 h-5" />,  step: '02', title: 'Get tailored insights',    desc: 'Resume feedback and interview questions specific to your profile.' },
    { icon: <LayoutDashboard className="w-5 h-5" />, step: '03', title: 'Track and land the job',  desc: 'Manage your pipeline from Applied to Offer in one place.' },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 font-sans">
      <Navbar />

      {/* ── Hero ── */}
      <section className="relative overflow-hidden">
        {/* Grid background */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#f4f4f580_1px,transparent_1px),linear-gradient(to_bottom,#f4f4f580_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#27272a40_1px,transparent_1px),linear-gradient(to_bottom,#27272a40_1px,transparent_1px)] bg-[size:48px_48px]" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/60 to-white dark:via-zinc-950/60 dark:to-zinc-950" />
        {/* Ambient glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-violet-500/10 dark:bg-violet-500/5 blur-3xl rounded-full" />

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 py-24 md:py-36 text-center animate-fade-in">

          {/* Eyebrow */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-violet-200 dark:border-violet-800/60 bg-violet-50 dark:bg-violet-950/40 text-xs font-semibold text-violet-700 dark:text-violet-400 mb-8">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Powered by Gemini AI</span>
          </div>

          {/* Headline */}
          <h1 className="text-5xl sm:text-7xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-50 leading-[1.05] mb-6">
            Get hired faster
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-indigo-500 mt-1">
              with AI on your side
            </span>
          </h1>

          {/* Subline */}
          <p className="text-base sm:text-lg text-zinc-500 dark:text-zinc-400 max-w-xl mx-auto leading-relaxed mb-10">
            HireForge AI analyzes your resume, prepares you for interviews, and tracks every application — so you can focus on getting the job.
          </p>

          {/* CTA buttons */}
          <div className="flex items-center justify-center gap-3 flex-wrap mb-16">
            <Button size="lg" onClick={() => navigate('/register')} icon={<ArrowRight className="w-4 h-4" />}>
              Get Started Free
            </Button>
            <Button variant="outline" size="lg" onClick={() => navigate('/login')}>
              Sign In
            </Button>
          </div>

          {/* Trust pills with icons */}
          <div className="flex items-center justify-center gap-6 sm:gap-12 flex-wrap">
            {[
              { icon: <FileText className="w-5 h-5" />, value: 'Resume Analysis',  sub: 'ATS-optimized feedback',   color: 'bg-violet-50 dark:bg-violet-950/40 text-violet-600 dark:text-violet-400' },
              { icon: <Bot className="w-5 h-5" />,      value: 'Interview Prep',   sub: 'Role-specific questions',  color: 'bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400' },
              { icon: <Briefcase className="w-5 h-5" />, value: 'Job Tracking',    sub: 'Full pipeline management', color: 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400' },
            ].map((s) => (
              <div key={s.value} className="flex flex-col items-center gap-2">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${s.color}`}>
                  {s.icon}
                </div>
                <p className="text-sm font-bold text-zinc-900 dark:text-zinc-100">{s.value}</p>
                <p className="text-xs text-zinc-500 dark:text-zinc-400">{s.sub}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Features ── */}
      <section id="features" className="py-20 border-t border-zinc-100 dark:border-zinc-800/80 bg-zinc-50/60 dark:bg-zinc-900/30">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-14">
            <p className="text-xs font-bold uppercase tracking-widest text-violet-600 dark:text-violet-400 mb-3">Features</p>
            <h2 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
              Everything you need to land the job
            </h2>
            <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-3 max-w-md mx-auto">
              Three focused tools. One app. Built for students and job seekers who want results.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {features.map((f) => (
              <div
                key={f.title}
                className="group p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 hover:border-violet-300 dark:hover:border-violet-700 hover:shadow-lg hover:shadow-violet-100/60 dark:hover:shadow-violet-900/20 transition-all duration-300 space-y-4"
              >
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${f.color} group-hover:scale-110 transition-transform duration-200`}>
                  {f.icon}
                </div>
                <h3 className="font-semibold text-base text-zinc-900 dark:text-zinc-100">{f.title}</h3>
                <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── How It Works ── */}
      <section id="how-it-works" className="py-20 border-t border-zinc-100 dark:border-zinc-800/80">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-14">
            <p className="text-xs font-bold uppercase tracking-widest text-indigo-600 dark:text-indigo-400 mb-3">How It Works</p>
            <h2 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
              Three steps from resume to offer
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            <div className="hidden md:block absolute top-8 left-1/3 right-1/3 h-px bg-gradient-to-r from-zinc-200 via-violet-300 to-zinc-200 dark:from-zinc-800 dark:via-violet-700 dark:to-zinc-800" />
            {steps.map((s) => (
              <div key={s.step} className="relative text-center space-y-4">
                <div className="relative inline-block">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-violet-600 to-indigo-600 text-white flex items-center justify-center mx-auto shadow-lg shadow-violet-200 dark:shadow-violet-900/40">
                    {s.icon}
                  </div>
                  <span className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 text-[10px] font-bold flex items-center justify-center">
                    {s.step}
                  </span>
                </div>
                <h3 className="font-semibold text-sm text-zinc-900 dark:text-zinc-100">{s.title}</h3>
                <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed max-w-[200px] mx-auto">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Why HireForge ── */}
      <section className="py-20 border-t border-zinc-100 dark:border-zinc-800/80 bg-zinc-50/60 dark:bg-zinc-900/30">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <p className="text-xs font-bold uppercase tracking-widest text-violet-600 dark:text-violet-400">Why HireForge AI</p>
              <h2 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
                Stop applying blindly.<br />Start applying smartly.
              </h2>
              <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">
                Most job seekers send the same resume everywhere and walk into interviews unprepared. HireForge gives you the insight and tools to be strategic at every step.
              </p>
              <div className="space-y-3">
                {[
                  { icon: <Zap className="w-4 h-4 text-amber-500" />,       text: 'Instant AI analysis — results in seconds' },
                  { icon: <Shield className="w-4 h-4 text-emerald-500" />,   text: 'Your data stays private and secure' },
                  { icon: <Star className="w-4 h-4 text-violet-500" />,      text: 'Feedback tailored to your resume, not generic tips' },
                  { icon: <CheckCircle2 className="w-4 h-4 text-indigo-500" />, text: 'Track every step — Applied, Interview, Offer' },
                ].map((item) => (
                  <div key={item.text} className="flex items-center gap-3">
                    <div className="w-7 h-7 rounded-lg bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 flex items-center justify-center shrink-0 shadow-xs">
                      {item.icon}
                    </div>
                    <p className="text-sm text-zinc-700 dark:text-zinc-300">{item.text}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Preview cards */}
            <div className="space-y-3">
              <div className="p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-sm hover:shadow-md transition-shadow duration-200">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-8 h-8 rounded-lg bg-violet-50 dark:bg-violet-950/40 flex items-center justify-center">
                    <FileText className="w-4 h-4 text-violet-600 dark:text-violet-400" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-zinc-900 dark:text-zinc-100">Resume Analysis</p>
                    <p className="text-[10px] text-zinc-500">ATS Score: 90/100 ✓</p>
                  </div>
                </div>
                <div className="w-full h-1.5 bg-zinc-100 dark:bg-zinc-800 rounded-full overflow-hidden">
                  <div className="h-full w-[90%] bg-gradient-to-r from-violet-500 to-indigo-500 rounded-full" />
                </div>
              </div>

              <div className="p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-sm hover:shadow-md transition-shadow duration-200">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-8 h-8 rounded-lg bg-indigo-50 dark:bg-indigo-950/40 flex items-center justify-center">
                    <Bot className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                  </div>
                  <p className="text-xs font-semibold text-zinc-900 dark:text-zinc-100">Interview Questions Ready</p>
                </div>
                <p className="text-[11px] text-zinc-500 dark:text-zinc-400 leading-relaxed">
                  "Tell me about a time you optimized a backend system for performance..."
                </p>
              </div>

              <div className="p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-sm hover:shadow-md transition-shadow duration-200">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 flex items-center justify-center">
                      <Briefcase className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-zinc-900 dark:text-zinc-100">Google — Software Engineer</p>
                      <p className="text-[10px] text-zinc-500">Applied Jan 15</p>
                    </div>
                  </div>
                  <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-amber-50 text-amber-700 border border-amber-200 dark:bg-amber-950/40 dark:text-amber-400 dark:border-amber-800">
                    Interview
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-24 border-t border-zinc-100 dark:border-zinc-800/80 relative overflow-hidden bg-gradient-to-br from-violet-600 via-indigo-600 to-purple-700">
        <div className="absolute -top-16 -right-16 w-64 h-64 rounded-full bg-white/10 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-16 -left-16 w-64 h-64 rounded-full bg-indigo-900/40 blur-3xl pointer-events-none" />

        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center space-y-6 relative z-10">
          <div className="flex items-center justify-center mx-auto">
            <HireForgeLogo size={52} />
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
            Ready to land your next role?
          </h2>
          <p className="text-sm text-violet-200 max-w-md mx-auto leading-relaxed">
            Create your free account and start with your resume today. No credit card needed.
          </p>
          <div className="flex items-center justify-center gap-3 flex-wrap pt-2">
            <button
              onClick={() => navigate('/register')}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white text-violet-700 font-bold text-base hover:bg-violet-50 shadow-lg transition-all duration-200 active:scale-[0.97]"
            >
              <ArrowRight className="w-4 h-4" />
              Create Free Account
            </button>
            <button
              onClick={() => navigate('/login')}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-white/40 text-white font-semibold text-base hover:bg-white/10 hover:border-white/60 transition-all duration-200 active:scale-[0.97]"
            >
              Sign In
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};
