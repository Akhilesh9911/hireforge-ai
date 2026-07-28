import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { Lock, Mail, ArrowRight, AlertCircle } from 'lucide-react';
import { validateEmail } from '../utils/emailValidator';
import { HireForgeLogo } from '../components/ui/HireForgeLogo';
import { useAuth } from '../context/AuthContext';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../components/ui/Card';

interface LoginFormInputs {
  email: string;
  pass: string;
}

export const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormInputs>();

  const onSubmit = async (data: LoginFormInputs) => {
    setErrorMessage(null);
    setIsSubmitting(true);
    const result = await login(data.email, data.pass);
    setIsSubmitting(false);
    if (result.success) {
      navigate('/dashboard');
    } else {
      setErrorMessage(result.message || 'Invalid email or password.');
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left panel — brand */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-violet-600 via-indigo-600 to-purple-700 flex-col justify-between p-12 relative overflow-hidden">
        {/* decorative circles */}
        <div className="absolute -top-24 -right-24 w-72 h-72 rounded-full bg-white/10 blur-2xl" />
        <div className="absolute -bottom-32 -left-16 w-96 h-96 rounded-full bg-indigo-900/40 blur-3xl" />

        <div className="flex items-center gap-3 relative z-10">
          <HireForgeLogo size={36} />
          <span className="font-bold text-lg text-white tracking-tight">HireForge AI</span>
        </div>

        <div className="relative z-10 space-y-6">
          <h1 className="text-4xl font-bold text-white leading-tight">
            Your AI-powered<br />career companion
          </h1>
          <p className="text-violet-200 text-sm leading-relaxed max-w-xs">
            Analyze resumes, practice interviews, and track your job applications — all in one place.
          </p>
          <div className="flex flex-col gap-3 mt-4">
            {['Resume AI Analysis', 'Interview Question Generator', 'Job Application Tracker'].map((f, i) => (
              <div key={f} className={`flex items-center gap-2.5 text-sm text-violet-100 animate-slide-left delay-${i * 75}`}>
                <div className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center shrink-0">
                  <span className="text-white text-[10px] font-bold">✓</span>
                </div>
                {f}
              </div>
            ))}
          </div>
        </div>

        <p className="text-violet-300/60 text-xs relative z-10">© 2026 HireForge AI</p>
      </div>

      {/* Right panel — form */}
      <div className="flex-1 flex flex-col justify-center items-center p-6 bg-zinc-50 dark:bg-zinc-950">
        {/* Mobile brand */}
        <div className="lg:hidden flex items-center gap-2.5 mb-8">
          <HireForgeLogo size={32} />
          <span className="font-bold text-zinc-900 dark:text-zinc-100">HireForge AI</span>
        </div>

        <Card className="w-full max-w-md shadow-lg border-zinc-200/80 dark:border-zinc-800 animate-fade-in">
          <CardHeader className="text-center pb-4">
            <CardTitle className="text-xl">Sign in to your account</CardTitle>
            <CardDescription>Enter your credentials to access your dashboard</CardDescription>
          </CardHeader>

          <CardContent>
            {errorMessage && (
              <div className="mb-4 p-3 rounded-xl border border-rose-200 bg-rose-50 dark:border-rose-900/50 dark:bg-rose-950/20 text-rose-700 dark:text-rose-300 text-xs flex items-start gap-2 animate-fade-in">
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                <span>{errorMessage}</span>
              </div>
            )}

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <Input
                label="Email address"
                type="email"
                placeholder="you@example.com"
                icon={<Mail className="w-4 h-4" />}
                error={errors.email?.message}
                {...register('email', {
                  required: 'Email is required',
                  validate: validateEmail,
                })}
              />
              <Input
                label="Password"
                type="password"
                placeholder="••••••••"
                icon={<Lock className="w-4 h-4" />}
                error={errors.pass?.message}
                {...register('pass', {
                  required: 'Password is required',
                  minLength: { value: 6, message: 'Password must be at least 6 characters' },
                })}
              />
              <Button type="submit" className="w-full mt-2" isLoading={isSubmitting} icon={<ArrowRight className="w-4 h-4" />}>
                Sign In
              </Button>
            </form>
          </CardContent>
        </Card>

        <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-6">
          Don't have an account?{' '}
          <Link to="/register" className="font-semibold text-violet-600 dark:text-violet-400 hover:underline">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};
