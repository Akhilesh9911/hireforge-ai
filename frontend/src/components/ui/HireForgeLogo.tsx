import React from 'react';

interface HireForgeLogoProps {
  size?: number;
  className?: string;
}

// Custom H-shaped logo with a spark — unique to HireForge AI
export const HireForgeLogo: React.FC<HireForgeLogoProps> = ({ size = 32, className = '' }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Gradient definitions */}
      <defs>
        <linearGradient id="hf-grad" x1="0" y1="0" x2="32" y2="32" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#7c3aed" />
          <stop offset="100%" stopColor="#4f46e5" />
        </linearGradient>
        <linearGradient id="hf-spark" x1="0" y1="0" x2="16" y2="16" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#a78bfa" />
          <stop offset="100%" stopColor="#818cf8" />
        </linearGradient>
      </defs>

      {/* Background rounded square */}
      <rect width="32" height="32" rx="9" fill="url(#hf-grad)" />

      {/* Letter H — left vertical bar */}
      <rect x="6" y="7" width="4" height="18" rx="1.5" fill="white" />

      {/* Letter H — right vertical bar */}
      <rect x="22" y="7" width="4" height="18" rx="1.5" fill="white" />

      {/* Letter H — crossbar */}
      <rect x="6" y="14" width="20" height="4" rx="1.5" fill="white" />

      {/* Spark / AI dot — top-right accent */}
      <circle cx="26" cy="6" r="3.5" fill="url(#hf-spark)" />
      <circle cx="26" cy="6" r="1.5" fill="white" />
    </svg>
  );
};
