import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { User, Mail, Lock, ArrowRight, AlertCircle } from 'lucide-react';
import { validateEmail } from '../utils/emailValidator';
import { HireForgeLogo } from '../components/ui/HireForgeLogo';
import { useAuth } from '../context/AuthContext';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../components/ui/Card';

interface RegisterFormInputs {
  name: string;
  email: string;
  pass: string;
  confirmPass: string;
}

export const RegisterPage: React.FC = () => {
  const navigate = useNavigate();
  const { register: registerAuth } = useAuth();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { register, handleSubmit, watch, formState: { errors } } = useForm<RegisterFormInputs>();
  const passValue = watch('pass');

  const onSubmit = async (data: RegisterFormInputs) => {
    setErrorMessage(null);
    setIsSubmitting(true);
    const result = await registerAuth(data.name, data.email, data.pass);
    setIsSubmitting(false);
    if (result.success) {
      navigate('/dashboard');
    } else {
      setErrorMessage(result.message || 'Registration failed. Please try again.');
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left panel */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-violet-600 via-indigo-600 to-purple-700 flex-col justify-between p-12 relative overflow-hidden">
        <div className="absolute -top-24 -right-24 w-72 h-72 rounded-full bg-white/10 blur-2xl" />
        <div className="absolute -bottom-32 -left-16 w-96 h-96 rounded-full bg-indigo-900/40 blur-3xl" />

        <div className="flex items-center gap-3 relative z-10">
          <HireForgeLogo size={36} />
          <span className="font-bold text-lg text-white tracking-tight">HireForge AI</span>
        </div>

        <div className="relative z-10 space-y-4">
          <h1 className="text-4xl font-bold text-white leading-tight">
            Start your<br />career journey
          </h1>
          <p className="text-violet-200 text-sm leading-relaxed max-w-xs">
            Create your free account and let AI accelerate your job search today.
          </p>
        </div>

        <p className="text-violet-300/60 text-xs relative z-10">© 2026 HireForge AI</p>
      </div>

      {/* Right panel */}
      <div className="flex-1 flex flex-col justify-center items-center p-6 bg-zinc-50 dark:bg-zinc-950">
        <div className="lg:hidden flex items-center gap-2.5 mb-8">
          <HireForgeLogo size={32} />
          <span className="font-bold text-zinc-900 dark:text-zinc-100">HireForge AI</span>
        </div>

        <Card className="w-full max-w-md shadow-lg animate-fade-in">
          <CardHeader className="text-center pb-4">
            <CardTitle className="text-xl">Create your account</CardTitle>
            <CardDescription>Join HireForge AI to start your AI-powered job search</CardDescription>
          </CardHeader>

          <CardContent>
            {errorMessage && (
              <div className="mb-4 p-3 rounded-xl border border-rose-200 bg-rose-50 dark:border-rose-900/50 dark:bg-rose-950/20 text-rose-700 dark:text-rose-300 text-xs flex items-start gap-2 animate-fade-in">
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                <span>{errorMessage}</span>
              </div>
            )}

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-3.5">
              <Input
                label="Full Name"
                type="text"
                placeholder="Your Name"
                icon={<User className="w-4 h-4" />}
                error={errors.name?.message}
                {...register('name', {
                  required: 'Full name is required',
                  minLength: { value: 2, message: 'Name must be at least 2 characters' },
                })}
              />
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
              <Input
                label="Confirm Password"
                type="password"
                placeholder="••••••••"
                icon={<Lock className="w-4 h-4" />}
                error={errors.confirmPass?.message}
                {...register('confirmPass', {
                  required: 'Please confirm your password',
                  validate: (val) => val === passValue || 'Passwords do not match',
                })}
              />
              <Button type="submit" className="w-full mt-2" isLoading={isSubmitting} icon={<ArrowRight className="w-4 h-4" />}>
                Create Account
              </Button>
            </form>
          </CardContent>
        </Card>

        <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-6">
          Already have an account?{' '}
          <Link to="/login" className="font-semibold text-violet-600 dark:text-violet-400 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};
