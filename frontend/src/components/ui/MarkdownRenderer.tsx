import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface MarkdownRendererProps {
  content: string;
}

// Track ol item index globally per render
let currentOlIndex = 0;

export const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({ content }) => {
  return (
    <div className="animate-fade-in space-y-2 text-sm leading-relaxed">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{

          h1: ({ children }) => (
            <div className="flex items-center gap-2 mt-6 mb-3 first:mt-0">
              <span className="h-5 w-1 rounded-full bg-violet-500 shrink-0" />
              <h1 className="text-base font-bold text-zinc-900 dark:text-white">{children}</h1>
            </div>
          ),

          h2: ({ children }) => (
            <div className="mt-6 mb-3 first:mt-0">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-zinc-800 dark:bg-zinc-700 border border-zinc-700 dark:border-zinc-600 w-full">
                <span className="h-4 w-1 rounded-full bg-violet-500 shrink-0" />
                <h2 className="text-sm font-bold text-white tracking-wide">{children}</h2>
              </div>
            </div>
          ),

          h3: ({ children }) => (
            <h3 className="text-sm font-semibold text-zinc-800 dark:text-zinc-100 mt-4 mb-2">
              {children}
            </h3>
          ),

          p: ({ children }) => (
            <p className="text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed mb-2">
              {children}
            </p>
          ),

          // Ordered list wrapper — reset counter
          ol: ({ children }) => {
            currentOlIndex = 0;
            return (
              <ol className="space-y-3 my-3 list-none">
                {children}
              </ol>
            );
          },

          ul: ({ children }) => (
            <ul className="space-y-2 my-3 list-none">
              {children}
            </ul>
          ),

          // li — detect if inside ol by checking node
          li: ({ children, node, ...props }) => {
            const isOrdered = node?.position && (props as any).ordered !== false;
            // Check parent type
            const ordered = (props as any).ordered ?? false;

            if (ordered) {
              const num = ++currentOlIndex;
              return (
                <li className="flex gap-3 items-start p-4 rounded-xl bg-white dark:bg-zinc-800/80 border border-zinc-200 dark:border-zinc-700 shadow-sm hover:shadow-md hover:border-violet-300 dark:hover:border-violet-700 transition-all duration-200">
                  <span className="flex-shrink-0 min-w-[28px] h-7 w-7 rounded-lg bg-violet-600 text-white text-xs font-bold flex items-center justify-center">
                    {num}
                  </span>
                  <div className="flex-1 text-sm text-zinc-800 dark:text-zinc-100 leading-relaxed pt-0.5">
                    {children}
                  </div>
                </li>
              );
            }

            return (
              <li className="flex gap-2.5 items-start text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed">
                <span className="mt-2 w-1.5 h-1.5 rounded-full bg-violet-500 shrink-0" />
                <span className="flex-1">{children}</span>
              </li>
            );
          },

          // Strong — white/dark high contrast, not violet
          strong: ({ children }) => (
            <strong className="font-semibold text-zinc-900 dark:text-white">
              {children}
            </strong>
          ),

          // em — "Why asked:" in subtle muted style
          em: ({ children }) => (
            <em className="not-italic text-xs text-zinc-500 dark:text-zinc-400">
              {children}
            </em>
          ),

          hr: () => (
            <div className="my-5 h-px bg-gradient-to-r from-transparent via-zinc-300 dark:via-zinc-600 to-transparent" />
          ),

          blockquote: ({ children }) => (
            <blockquote className="border-l-4 border-violet-500 pl-4 my-3 py-2 bg-violet-50 dark:bg-violet-950/20 rounded-r-xl text-sm text-zinc-600 dark:text-zinc-300">
              {children}
            </blockquote>
          ),

          code: ({ children, className }) => {
            const isBlock = className?.includes('language-');
            if (isBlock) {
              return (
                <pre className="bg-zinc-900 text-zinc-100 p-4 rounded-xl text-xs font-mono overflow-x-auto my-3 border border-zinc-700">
                  <code>{children}</code>
                </pre>
              );
            }
            return (
              <code className="bg-zinc-100 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 px-1.5 py-0.5 rounded text-xs font-mono border border-zinc-200 dark:border-zinc-700">
                {children}
              </code>
            );
          },

          pre: ({ children }) => (
            <pre className="bg-zinc-900 text-zinc-100 p-4 rounded-xl text-xs font-mono overflow-x-auto my-3 border border-zinc-700">
              {children}
            </pre>
          ),

          table: ({ children }) => (
            <div className="overflow-x-auto my-4 rounded-xl border border-zinc-200 dark:border-zinc-700">
              <table className="w-full text-xs border-collapse">{children}</table>
            </div>
          ),
          thead: ({ children }) => (
            <thead className="bg-zinc-100 dark:bg-zinc-800">{children}</thead>
          ),
          th: ({ children }) => (
            <th className="px-4 py-2.5 text-left font-semibold text-zinc-900 dark:text-zinc-100 border-b border-zinc-200 dark:border-zinc-700">
              {children}
            </th>
          ),
          td: ({ children }) => (
            <td className="px-4 py-2.5 text-zinc-700 dark:text-zinc-300 border-b border-zinc-100 dark:border-zinc-800">
              {children}
            </td>
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
};
