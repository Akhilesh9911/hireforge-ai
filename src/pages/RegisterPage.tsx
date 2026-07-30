import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { Sparkles, User, Mail, Lock, ArrowRight, AlertCircle } from 'lucide-react';
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

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<RegisterFormInputs>();

  const passValue = watch('pass');

  const onSubmit = async (data: RegisterFormInputs) => {
    setErrorMessage(null);
    setIsSubmitting(true);
    const success = await registerAuth(data.name, data.email, data.pass);
    setIsSubmitting(false);

    if (success) {
      navigate('/dashboard');
    } else {
      setErrorMessage('Registration failed. Please check your details and try again.');
    }
  };

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 flex flex-col justify-center items-center p-4">
      <Link to="/" className="flex items-center gap-2 mb-8 group">
        <div className="w-8 h-8 rounded-lg bg-zinc-900 dark:bg-zinc-100 flex items-center justify-center text-white dark:text-zinc-900">
          <Sparkles className="w-4 h-4" />
        </div>
        <span className="font-semibold text-lg tracking-tight text-zinc-900 dark:text-zinc-100">
          HireForge AI
        </span>
      </Link>

      <Card className="w-full max-w-md shadow-sm">
        <CardHeader className="space-y-1 text-center pb-4">
          <CardTitle className="text-xl">Create your account</CardTitle>
          <CardDescription>
            Join HireForge AI to track applications and generate interview prep
          </CardDescription>
        </CardHeader>

        <CardContent>
          {errorMessage && (
            <div className="mb-4 p-3 rounded-lg border border-red-200 bg-red-50 dark:border-red-900/50 dark:bg-red-950/20 text-red-700 dark:text-red-300 text-xs flex items-start gap-2">
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
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: 'Invalid email address',
                },
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

            <Button
              type="submit"
              className="w-full mt-2"
              isLoading={isSubmitting}
              icon={<ArrowRight className="w-4 h-4" />}
            >
              Create Account
            </Button>
          </form>
        </CardContent>
      </Card>

      <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-6 text-center">
        Already have an account?{' '}
        <Link to="/login" className="font-semibold text-zinc-900 dark:text-zinc-100 hover:underline">
          Login
        </Link>
      </p>
    </div>
  );
};

