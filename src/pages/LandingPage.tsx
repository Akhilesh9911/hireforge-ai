import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  FileText,
  Bot,
  Briefcase,
  User,
  ArrowRight,
  Upload,
  Sparkles,
  CheckCircle2,
} from 'lucide-react';
import { Navbar } from '../components/layout/Navbar';
import { Footer } from '../components/layout/Footer';
import { Button } from '../components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';

export const LandingPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 font-sans">
      <Navbar />

      {/* Hero Section */}
      <section className="py-20 md:py-28 px-4 sm:px-6 max-w-4xl mx-auto text-center flex-1 flex flex-col justify-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-xs font-medium text-zinc-600 dark:text-zinc-400 mb-6 mx-auto">
          <Sparkles className="w-3.5 h-3.5 text-zinc-900 dark:text-zinc-100" />
          <span>All-in-one Career Assistant</span>
        </div>

        <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-50 leading-tight">
          HireForge AI
        </h1>
        <p className="mt-4 text-base sm:text-lg text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto leading-relaxed">
          AI-powered career assistant that helps students and job seekers analyze resumes, prepare for interviews, and track job applications from one place.
        </p>

        {/* Hero Action Buttons */}
        <div className="mt-8 flex items-center justify-center gap-3">
          <Button size="lg" onClick={() => navigate('/register')} icon={<ArrowRight className="w-4 h-4" />}>
            Get Started
          </Button>
          <Button variant="outline" size="lg" onClick={() => navigate('/login')}>
            Login
          </Button>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-16 border-t border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
              Key Features
            </h2>
            <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 mt-1">
              Everything you need to navigate your job search with confidence.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="hover:border-zinc-300 dark:hover:border-zinc-700 transition-colors">
              <CardHeader>
                <div className="w-9 h-9 rounded-lg bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center text-zinc-900 dark:text-zinc-100 mb-2">
                  <FileText className="w-5 h-5" />
                </div>
                <CardTitle>Resume Analyzer</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
                  Upload your resume and receive AI-powered insights.
                </p>
              </CardContent>
            </Card>

            <Card className="hover:border-zinc-300 dark:hover:border-zinc-700 transition-colors">
              <CardHeader>
                <div className="w-9 h-9 rounded-lg bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center text-zinc-900 dark:text-zinc-100 mb-2">
                  <Bot className="w-5 h-5" />
                </div>
                <CardTitle>AI Interview Generator</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
                  Practice personalized interview questions based on your resume.
                </p>
              </CardContent>
            </Card>

            <Card className="hover:border-zinc-300 dark:hover:border-zinc-700 transition-colors">
              <CardHeader>
                <div className="w-9 h-9 rounded-lg bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center text-zinc-900 dark:text-zinc-100 mb-2">
                  <Briefcase className="w-5 h-5" />
                </div>
                <CardTitle>Job Tracker</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
                  Manage job applications and update their status.
                </p>
              </CardContent>
            </Card>

            <Card className="hover:border-zinc-300 dark:hover:border-zinc-700 transition-colors">
              <CardHeader>
                <div className="w-9 h-9 rounded-lg bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center text-zinc-900 dark:text-zinc-100 mb-2">
                  <User className="w-5 h-5" />
                </div>
                <CardTitle>Profile</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
                  Manage your account and personal information.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-16 border-t border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
              How It Works
            </h2>
            <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 mt-1">
              Start building your career readiness in three simple steps.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 space-y-3">
              <div className="w-9 h-9 rounded-lg bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 flex items-center justify-center font-bold text-xs">
                Step 1
              </div>
              <h3 className="font-semibold text-sm text-zinc-900 dark:text-zinc-100">Upload Resume</h3>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
                Upload your resume securely.
              </p>
            </div>

            <div className="p-6 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 space-y-3">
              <div className="w-9 h-9 rounded-lg bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 flex items-center justify-center font-bold text-xs">
                Step 2
              </div>
              <h3 className="font-semibold text-sm text-zinc-900 dark:text-zinc-100">Generate Interview Questions</h3>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
                Practice AI-generated interview questions.
              </p>
            </div>

            <div className="p-6 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 space-y-3">
              <div className="w-9 h-9 rounded-lg bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 flex items-center justify-center font-bold text-xs">
                Step 3
              </div>
              <h3 className="font-semibold text-sm text-zinc-900 dark:text-zinc-100">Track Applications</h3>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
                Manage all job applications in one dashboard.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call To Action Section */}
      <section className="py-16 border-t border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/30">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center space-y-6">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
            Ready to accelerate your job search?
          </h2>
          <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 max-w-xl mx-auto">
            Get started today and streamline your resume analysis, interview preparation, and job application tracking.
          </p>
          <div>
            <Button size="lg" onClick={() => navigate('/register')} icon={<ArrowRight className="w-4 h-4" />}>
              Get Started Now
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

