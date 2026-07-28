import React from 'react';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  children: React.ReactNode;
}

export const Card: React.FC<CardProps> = ({ className = '', children, ...props }) => {
  return (
    <div
      className={`rounded-2xl border border-zinc-200/80 bg-white text-zinc-950 shadow-sm transition-shadow duration-200 dark:border-zinc-800/80 dark:bg-zinc-900 dark:text-zinc-50 ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

export const CardHeader: React.FC<CardProps> = ({ className = '', children, ...props }) => {
  return (
    <div
      className={`flex flex-col space-y-1.5 p-5 border-b border-zinc-100 dark:border-zinc-800/80 ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

export const CardTitle: React.FC<CardProps> = ({ className = '', children, ...props }) => {
  return (
    <h3
      className={`text-base font-semibold tracking-tight text-zinc-900 dark:text-zinc-100 ${className}`}
      {...props}
    >
      {children}
    </h3>
  );
};

export const CardDescription: React.FC<CardProps> = ({ className = '', children, ...props }) => {
  return (
    <p
      className={`text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed ${className}`}
      {...props}
    >
      {children}
    </p>
  );
};

export const CardContent: React.FC<CardProps> = ({ className = '', children, ...props }) => {
  return (
    <div className={`p-5 ${className}`} {...props}>
      {children}
    </div>
  );
};

export const CardFooter: React.FC<CardProps> = ({ className = '', children, ...props }) => {
  return (
    <div
      className={`flex items-center p-5 pt-0 border-t border-zinc-100 dark:border-zinc-800/80 mt-2 ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};
