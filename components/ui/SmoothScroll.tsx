'use client';

import { useEffect } from 'react';

export default function SmoothScroll() {
  useEffect(() => {
    // Only run on client and if user doesn't prefer reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    let destroyed = false;
    let lenisInstance: any = null;
    let rafId: number | null = null;

    import('lenis').then(({ default: Lenis }) => {
      if (destroyed) return;

      lenisInstance = new Lenis({
        duration: 1.2,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: 'vertical',
        gestureOrientation: 'vertical',
        smoothWheel: true,
        touchMultiplier: 2,
      });

      function raf(time: number) {
        if (lenisInstance) {
          lenisInstance.raf(time);
          rafId = requestAnimationFrame(raf);
        }
      }

      rafId = requestAnimationFrame(raf);

      // Handle initial hash in URL if arriving from another page
      if (typeof window !== 'undefined' && window.location.hash) {
        const targetId = window.location.hash.replace(/^#/, '');
        const el = document.getElementById(targetId);
        if (el) {
          setTimeout(() => {
            if (!destroyed && lenisInstance) {
              lenisInstance.scrollTo(el, { offset: -80, duration: 1 });
            }
          }, 300);
        }
      }
    });

    const handleHashChange = () => {
      if (typeof window === 'undefined' || !window.location.hash) return;
      const targetId = window.location.hash.replace(/^#/, '');
      const el = document.getElementById(targetId);
      if (el) {
        if (lenisInstance) {
          lenisInstance.scrollTo(el, { offset: -80, duration: 1 });
        } else {
          const top = el.getBoundingClientRect().top + window.scrollY - 80;
          window.scrollTo({ top, behavior: 'smooth' });
        }
      }
    };

    window.addEventListener('hashchange', handleHashChange);

    return () => {
      destroyed = true;
      window.removeEventListener('hashchange', handleHashChange);
      if (rafId !== null) {
        cancelAnimationFrame(rafId);
      }
      if (lenisInstance) {
        lenisInstance.destroy();
      }
    };
  }, []);

  return null;
}
