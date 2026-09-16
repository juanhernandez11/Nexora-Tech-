'use client';

import React, { useRef, useState, useCallback } from 'react';
import { cn } from '@/lib/utils';

interface MagicCardProps extends React.HTMLAttributes<HTMLDivElement> {
  gradientSize?: number;
  gradientColor?: string;
  gradientOpacity?: number;
  children: React.ReactNode;
}

export const MagicCard: React.FC<MagicCardProps> = ({
  children,
  className,
  gradientSize = 250,
  gradientColor = 'rgba(185, 233, 91, 0.12)',
  gradientOpacity = 0.8,
  ...props
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState<{ x: number; y: number }>({
    x: -gradientSize,
    y: -gradientSize,
  });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!cardRef.current) return;
      const rect = cardRef.current.getBoundingClientRect();
      setMousePosition({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    },
    []
  );

  const handleMouseEnter = useCallback(() => {
    setIsHovered(true);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
  }, []);

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={cn(
        'group relative overflow-hidden rounded-xl border border-slate-200/80 bg-white/80 p-6 transition-all duration-300 hover:shadow-lg dark:border-slate-800/80 dark:bg-slate-900/80 backdrop-blur-sm',
        className
      )}
      {...props}
    >
      <div
        className="pointer-events-none absolute -inset-px rounded-[inherit] transition-opacity duration-300"
        style={{
          opacity: isHovered ? gradientOpacity : 0,
          background: `radial-gradient(${gradientSize}px circle at ${mousePosition.x}px ${mousePosition.y}px, ${gradientColor}, transparent 80%)`,
        }}
      />
      <div className="relative z-10">{children}</div>
    </div>
  );
};

export default MagicCard;
