import React from 'react';
import { Loader2 } from 'lucide-react';

export interface LoaderProps {
  size?: 'sm' | 'md' | 'lg';
  label?: string;
  className?: string;
}

export const Loader: React.FC<LoaderProps> = ({ size = 'md', label, className = '' }) => {
  const sizeMap = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-10 h-10',
  };

  return (
    <div className={`flex flex-col items-center justify-center gap-2 p-4 text-zinc-500 dark:text-zinc-400 ${className}`}>
      <Loader2 className={`${sizeMap[size]} animate-spin text-zinc-800 dark:text-zinc-200`} />
      {label && <p className="text-xs font-medium tracking-wide">{label}</p>}
    </div>
  );
};

export const FullPageLoader: React.FC<{ label?: string }> = ({ label = 'Loading HireForge AI...' }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-zinc-50 dark:bg-zinc-950">
      <Loader size="lg" label={label} />
    </div>
  );
};
