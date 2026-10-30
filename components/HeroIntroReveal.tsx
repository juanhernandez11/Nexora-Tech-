'use client';

import { useRef } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';

import TextLoop from '@/components/ui/TextLoop';
import './HeroIntroReveal.css';

gsap.registerPlugin(useGSAP);

export type HeroIntroRevealProps = {
  wordLeft?: string;
  wordRight?: string;
  headlineLines?: string[];
  subcopy?: string;
  ctaPrimary?: { label: string; href: string };
  ctaSecondary?: { label: string; href: string };
  bgImage?: string;
  className?: string;
};

export default function HeroIntroReveal({
  wordLeft = 'NEXORA',
  wordRight = 'TECH',
  headlineLines = ['Software pensado para', 'la forma en que trabajas.'],
  subcopy = 'Diseñamos sitios, sistemas y automatizaciones a partir de los problemas reales de tu equipo.',
  ctaPrimary = { label: 'Cuéntanos tu proyecto', href: '#contacto-form' },
  ctaSecondary = { label: 'Ver nuestro trabajo', href: '#casos-de-exito' },
  bgImage = '/hero-bg.svg',
  className = '',
}: HeroIntroRevealProps) {
  const rootRef = useRef<HTMLElement>(null);
  const wordLeftRef = useRef<HTMLSpanElement>(null);
  const wordRightRef = useRef<HTMLSpanElement>(null);
  const bgWrapRef = useRef<HTMLDivElement>(null);
  const bgImgRef = useRef<HTMLDivElement>(null);
  const hazeRef = useRef<HTMLDivElement>(null);
  const wordsWrapRef = useRef<HTMLDivElement>(null);
  const headlineLineRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const subcopyRef = useRef<HTMLHeadingElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      let cancelled = false;
      let idleTween: gsap.core.Tween | undefined;
      let failsafe: number | undefined;
      let finished = false;

      document.documentElement.classList.add('hero-intro-running');

      const finish = () => {
        if (finished) return;
        finished = true;
        if (failsafe !== undefined) window.clearTimeout(failsafe);
        gsap.set(bgWrapRef.current, { clipPath: 'inset(0px 0px 0px 0px round 0px)' });
        gsap.set(bgImgRef.current, { scale: 1, yPercent: 0, willChange: 'auto' });
        gsap.set([wordLeftRef.current, wordRightRef.current], { clearProps: 'all' });
        if (wordsWrapRef.current) {
          wordsWrapRef.current.style.display = 'none';
        }
        document.documentElement.classList.remove('hero-intro-running');
        rootRef.current?.classList.remove('hir-pending');
      };

      const startDrift = () => {
        idleTween = gsap.to(bgImgRef.current, {
          yPercent: -1.5,
          scale: 1.03,
          duration: 14,
          ease: 'sine.inOut',
          repeat: -1,
          yoyo: true,
        });
      };

      const ctaChildren = () => Array.from(ctaRef.current?.children ?? []);

      const revealFinalState = () => {
        finish();
        gsap.set([subcopyRef.current, ...ctaChildren()], { clearProps: 'all', opacity: 1 });
        headlineLineRefs.current.forEach((lineRef) => {
          if (lineRef) gsap.set(lineRef, { yPercent: 0, rotate: 0, opacity: 1 });
        });
        startDrift();
      };

      try {
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
          revealFinalState();
          return;
        }

        const left = wordLeftRef.current;
        const right = wordRightRef.current;
        const bgWrap = bgWrapRef.current;
        const bgImageEl = bgImgRef.current;
        if (!left || !right || !bgWrap || !bgImageEl) return;

        // La animación arranca de inmediato, sin esperar a las fuentes.
        failsafe = window.setTimeout(() => {
          if (!cancelled) revealFinalState();
        }, 3500);

        const clip = { top: 0, bottom: 0, left: 0, right: 0, radius: 999 };
        const applyClip = () => {
          bgWrap.style.clipPath = `inset(${clip.top}px ${clip.right}px ${clip.bottom}px ${clip.left}px round ${clip.radius}px)`;
        };

        const leftRect = left.getBoundingClientRect();
        const rightRect = right.getBoundingClientRect();
        clip.top = Math.max(0, leftRect.top);
        clip.bottom = Math.max(0, window.innerHeight - leftRect.bottom);
        clip.radius = Math.max(1, Math.min(leftRect.height, rightRect.height) / 2);
        // Medidas tomadas una sola vez: durante la animación se interpolan
        // con los valores de x, sin volver a leer el DOM en cada frame.
        const startLeft = Math.max(0, leftRect.right);
        const startRight = Math.max(0, window.innerWidth - rightRect.left);
        clip.left = startLeft;
        clip.right = startRight;
        applyClip();

        gsap.set(bgImageEl, { scale: 1.25, willChange: 'transform' });
        gsap.set(subcopyRef.current, { opacity: 0, yPercent: 100 });
        gsap.set(ctaChildren(), { opacity: 0, y: 16 });
        headlineLineRefs.current.forEach((lineRef) => {
          if (lineRef) gsap.set(lineRef, { yPercent: 110, rotate: 2 });
        });
        rootRef.current?.classList.remove('hir-pending');

        const leftExit = -(leftRect.right + 32);
        const rightExit = window.innerWidth - rightRect.left + 32;
        const headlineInners = headlineLineRefs.current.filter(Boolean) as HTMLSpanElement[];

        const timeline = gsap.timeline({
          defaults: { ease: 'power4.inOut' },
          onComplete: () => {
            finish();
            startDrift();
          },
        });

        timeline
          .to(left, {
            x: leftExit,
            duration: 0.7,
            ease: 'power3.inOut',
            onUpdate: () => {
              clip.left = Math.max(0, startLeft + (gsap.getProperty(left, 'x') as number));
              applyClip();
            },
          }, 0)
          .to(right, {
            x: rightExit,
            duration: 0.7,
            ease: 'power3.inOut',
            onUpdate: () => {
              clip.right = Math.max(0, startRight - (gsap.getProperty(right, 'x') as number));
              applyClip();
            },
          }, 0)
          .to(bgImageEl, { scale: 1.12, duration: 0.7, ease: 'power3.inOut' }, 0)
          .to(
            clip,
            {
              top: 0,
              right: 0,
              bottom: 0,
              left: 0,
              radius: 0,
              duration: 0.8,
              ease: 'expo.out',
              onUpdate: applyClip,
            },
            '-=0.15',
          )
          .to(bgImageEl, { scale: 1, duration: 0.8, ease: 'expo.out' }, '<')
          .to(hazeRef.current, { opacity: 1, duration: 0.6, ease: 'power2.out' }, '<+=0.15')
          .to(
            headlineInners,
            {
              yPercent: 0,
              rotate: 0,
              stagger: 0.08,
              duration: 0.7,
              ease: 'power3.out',
            },
            '-=0.55',
          )
          .to(
            subcopyRef.current,
            { opacity: 1, yPercent: 0, duration: 0.5, ease: 'power3.out' },
            '-=0.45',
          )
          .to(
            ctaChildren(),
            { opacity: 1, y: 0, stagger: 0.07, duration: 0.45 },
            '-=0.35',
          );
      } catch {
        if (!cancelled) revealFinalState();
      }

      return () => {
        cancelled = true;
        if (failsafe !== undefined) window.clearTimeout(failsafe);
        idleTween?.kill();
        document.documentElement.classList.remove('hero-intro-running');
      };
    },
    { scope: rootRef },
  );

  return (
    <section
      ref={rootRef}
      className={`hir-pending relative min-h-[100svh] overflow-hidden bg-[#f1f0ec] ${className}`}
    >
      <noscript>
        <style>{'.hir-pending .hir-hide,.hir-pending .hir-hide-children>*{opacity:1!important}.hir-pending .hir-line-inner{transform:none!important}.hir-pending .hir-words{display:none}'}</style>
      </noscript>
      <div ref={wordsWrapRef} className="hir-words pointer-events-none absolute inset-0 z-20 flex items-center justify-center whitespace-nowrap">
        <span
          ref={wordLeftRef}
          className="text-4xl font-bold tracking-tight text-black sm:text-6xl lg:text-7xl"
        >
          {wordLeft}
        </span>
        <span className="w-3 shrink-0 sm:w-5" />
        <span
          ref={wordRightRef}
          className="text-4xl font-bold tracking-tight text-black sm:text-6xl lg:text-7xl"
        >
          {wordRight}
        </span>
      </div>

      <div
        ref={bgWrapRef}
        className="absolute inset-0 z-0 overflow-hidden"
        style={{ clipPath: 'inset(0px 50% 0px 50% round 999px)' }}
      >
        <div
          ref={bgImgRef}
          className="hir-bg h-full w-full bg-cover bg-center"
          style={{ backgroundImage: `url(${bgImage})` }}
        />
        <div
          ref={hazeRef}
          className="absolute inset-0 bg-gradient-to-b from-white/70 via-white/10 to-transparent opacity-0"
        />
      </div>

      <div className="relative z-10 flex min-h-[100svh] flex-col items-center justify-center gap-6 px-6 py-24 text-center">
        <h1 className="max-w-3xl text-4xl font-bold leading-tight tracking-tight text-black sm:text-5xl lg:text-6xl">
          {headlineLines.map((line, i) => (
            <span key={i} className="hir-line-mask block overflow-hidden">
              <span
                ref={(el) => { headlineLineRefs.current[i] = el; }}
                className="hir-line-inner block"
              >
                {line}
              </span>
            </span>
          ))}
        </h1>

        <div className="overflow-hidden">
          <h2
            ref={subcopyRef}
            className="hir-hide mx-auto max-w-xl text-base font-normal text-black/60 sm:text-lg"
          >
            {subcopy}
          </h2>
        </div>

        <div ref={ctaRef} className="hir-hide-children flex flex-wrap items-center justify-center gap-3">
          <a
            href={ctaPrimary.href}
            className="rounded-full bg-black px-6 py-3 text-sm font-semibold text-white transition hover:bg-black/80"
          >
            {ctaPrimary.label}
          </a>
          <a
            href={ctaSecondary.href}
            className="rounded-full border border-black/20 px-6 py-3 text-sm font-semibold text-black transition hover:bg-black/5"
          >
            {ctaSecondary.label}
          </a>
        </div>
      </div>

      <div className="hir-textloop absolute bottom-0 left-0 right-0 z-10 w-full">
        <TextLoop
          text="NEXORA TECH · SOFTWARE · AUTOMATIZACIÓN · IA"
          shape="wave"
          speed={65}
          separator="✦"
          curviness={28}
          fontSize={26}
          fontWeight={700}
          letterSpacing={2}
          uppercase
          color="#ffffff"
          ribbon
          ribbonColor="#111111"
          ribbonWidth={54}
          compact
          pauseOnHover
        />
      </div>
    </section>
  );
}
