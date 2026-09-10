'use client';

import React from 'react';
import { cn } from '@/lib/utils';

interface ShimmerBadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  pulseDot?: boolean;
}

export const ShimmerBadge: React.FC<ShimmerBadgeProps> = ({
  children,
  pulseDot = false,
  className,
  ...props
}) => {
  return (
    <div
      className={cn(
        'inline-flex items-center gap-2 rounded-md border border-slate-300/80 bg-slate-100/80 px-2.5 py-0.5 text-xs font-mono font-semibold text-slate-700 dark:border-slate-800 dark:bg-slate-900/90 dark:text-slate-300',
        className
      )}
      {...props}
    >
      {pulseDot && (
        <span className="relative flex h-1.5 w-1.5">
          <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500" />
        </span>
      )}
      <span className="tracking-wider uppercase text-[10px] font-bold">
        {children}
      </span>
    </div>
  );
};

export default ShimmerBadge;
