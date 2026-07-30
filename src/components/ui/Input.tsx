import React, { forwardRef } from 'react';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  hint?: string;
  icon?: React.ReactNode;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, hint, icon, className = '', id, ...props }, ref) => {
    const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

    return (
      <div className="w-full space-y-1.5">
        {label && (
          <label htmlFor={inputId} className="block text-xs font-semibold uppercase tracking-wider text-zinc-700 dark:text-zinc-300">
            {label}
          </label>
        )}
        <div className="relative flex items-center">
          {icon && (
            <div className="absolute left-3 text-zinc-400 pointer-events-none flex items-center justify-center">
              {icon}
            </div>
          )}
          <input
            id={inputId}
            ref={ref}
            className={`w-full rounded-lg border text-sm transition-colors py-2 px-3 text-zinc-900 bg-white placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-zinc-900 focus:border-transparent dark:bg-zinc-900 dark:text-zinc-100 dark:placeholder:text-zinc-500 dark:focus:ring-zinc-100 ${
              icon ? 'pl-9' : ''
            } ${
              error
                ? 'border-red-500 focus:ring-red-500 text-red-900 dark:border-red-500'
                : 'border-zinc-300 dark:border-zinc-700'
            } ${className}`}
            {...props}
          />
        </div>
        {error && <p className="text-xs text-red-600 dark:text-red-400 mt-1">{error}</p>}
        {hint && !error && <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">{hint}</p>}
      </div>
    );
  }
);

Input.displayName = 'Input';
