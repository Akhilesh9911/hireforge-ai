import React from 'react';
import { AlertCircle, RefreshCw } from 'lucide-react';
import { Button } from './Button';

export interface ErrorStateProps {
  title?: string;
  message: string;
  onRetry?: () => void;
}

export const ErrorState: React.FC<ErrorStateProps> = ({
  title = 'Something went wrong',
  message,
  onRetry,
}) => {
  return (
    <div className="p-4 rounded-xl border border-rose-200 bg-rose-50/50 dark:border-rose-900/50 dark:bg-rose-950/20 text-rose-900 dark:text-rose-200 flex items-start gap-3">
      <AlertCircle className="w-5 h-5 text-rose-600 dark:text-rose-400 shrink-0 mt-0.5" />
      <div className="flex-1 text-xs">
        <h5 className="font-semibold text-rose-800 dark:text-rose-300">{title}</h5>
        <p className="text-rose-600 dark:text-rose-400 mt-0.5 leading-relaxed">{message}</p>
        {onRetry && (
          <Button variant="outline" size="sm" onClick={onRetry} className="mt-3 text-xs gap-1 border-rose-300 dark:border-rose-800">
            <RefreshCw className="w-3 h-3" /> Retry Connection
          </Button>
        )}
      </div>
    </div>
  );
};
