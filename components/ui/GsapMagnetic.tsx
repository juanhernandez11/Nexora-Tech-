'use client';

import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';

interface GsapMagneticProps {
  children: React.ReactElement;
  strength?: number; // 0 to 1
  className?: string;
}

export default function GsapMagnetic({
  children,
  strength = 0.35,
  className = 'inline-block',
}: GsapMagneticProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Disable magnetic physics on touch devices or reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    if (prefersReducedMotion || isTouchDevice) return;

    const xTo = gsap.quickTo(el, 'x', { duration: 0.6, ease: 'power3.out' });
    const yTo = gsap.quickTo(el, 'y', { duration: 0.6, ease: 'power3.out' });

    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const { left, top, width, height } = el.getBoundingClientRect();
      const x = (clientX - (left + width / 2)) * strength;
      const y = (clientY - (top + height / 2)) * strength;
      xTo(x);
      yTo(y);
    };

    const handleMouseLeave = () => {
      xTo(0);
      yTo(0);
    };

    el.addEventListener('mousemove', handleMouseMove);
    el.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      el.removeEventListener('mousemove', handleMouseMove);
      el.removeEventListener('mouseleave', handleMouseLeave);
      gsap.killTweensOf(el);
    };
  }, [strength]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}

