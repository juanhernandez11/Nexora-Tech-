'use client';

import React from 'react';
import { cn } from '@/lib/utils';

interface GridBackgroundProps {
  className?: string;
  variant?: 'grid' | 'dots';
}

export const GridBackground: React.FC<GridBackgroundProps> = ({
  className,
  variant = 'grid',
}) => {
  return (
    <div
      className={cn(
        'pointer-events-none absolute inset-0 z-0 h-full w-full',
        className
      )}
    >
      {variant === 'grid' ? (
        <div
          className="absolute inset-0 h-full w-full bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:32px_32px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] dark:bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)]"
        />
      ) : (
        <div
          className="absolute inset-0 h-full w-full bg-[radial-gradient(#80808022_1px,transparent_1px)] [background-size:24px_24px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)] dark:bg-[radial-gradient(#ffffff18_1px,transparent_1px)]"
        />
      )}
    </div>
  );
};

export default GridBackground;
