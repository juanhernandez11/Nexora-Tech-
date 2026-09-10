'use client';

import React from 'react';
import { cn } from '@/lib/utils';

interface MeteorsProps {
  number?: number;
  className?: string;
}

export const Meteors: React.FC<MeteorsProps> = ({ number = 15, className }) => {
  const meteors = new Array(number).fill(true);
  return (
    <div className={cn('pointer-events-none absolute inset-0 overflow-hidden', className)}>
      {meteors.map((_, idx) => {
        // Pre-computed positions based on index to be SSR safe
        const left = `${(idx * 7.1) % 100}%`;
        const delay = `${((idx * 0.3) % 4).toFixed(2)}s`;
        const duration = `${(3 + ((idx * 0.5) % 4)).toFixed(2)}s`;

        return (
          <span
            key={`meteor-${idx}`}
            className={cn(
              'animate-meteor absolute top-1/2 left-1/2 h-0.5 w-0.5 rounded-[9999px] bg-slate-500 shadow-[0_0_0_1px_#ffffff10] rotate-[215deg]',
              "before:content-[''] before:absolute before:top-1/2 before:transform before:-translate-y-[50%] before:w-[50px] before:h-[1px] before:bg-gradient-to-r before:from-brand-500 before:via-accent-400 before:to-transparent"
            )}
            style={{
              top: '-20px',
              left,
              animationDelay: delay,
              animationDuration: duration,
            }}
          />
        );
      })}
    </div>
  );
};

export default Meteors;
