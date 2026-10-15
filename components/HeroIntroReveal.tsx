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
  const badgeRef = useRef<HTMLDivElement>(null);
  // Ref to the full words container — hidden in finish() to guarantee it leaves the DOM flow
  const wordsWrapRef = useRef<HTMLDivElement>(null);
  // Refs to individual headline line wrappers (the overflow:hidden masks)
  const headlineLineRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const subcopyRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      let cancelled = false;
      let idleTween: gsap.core.Tween | undefined;

      // Hide the site Navbar while the intro runs so it doesn't overlap
      document.documentElement.classList.add('hero-intro-running');

      const finish = () => {
        gsap.set(bgWrapRef.current, { clipPath: 'inset(0px 0px 0px 0px round 0px)' });
        gsap.set(bgImgRef.current, { scale: 1, yPercent: 0, willChange: 'auto' });
        // Hide the entire words container (not just the child spans) so no GSAP
        // timing edge-case can leave "NEXORA TECH" floating over the Hero.
        gsap.set([wordLeftRef.current, wordRightRef.current], { clearProps: 'all' });
        if (wordsWrapRef.current) {
          wordsWrapRef.current.style.display = 'none';
        }
        // Reveal the site Navbar after the intro completes
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

      const revealFinalState = () => {
        finish();
        // Show everything immediately without animation
        gsap.set(
          [badgeRef.current, subcopyRef.current, ...ctaChildren()],
          { clearProps: 'all', opacity: 1 },
        );
        // Show the inner spans (the text) inside headline line masks
        headlineLineRefs.current.forEach((lineRef) => {
          if (lineRef) gsap.set(lineRef, { yPercent: 0, rotate: 0, opacity: 1 });
        });
        startDrift();
      };

      const ctaChildren = () => Array.from(ctaRef.current?.children ?? []);

      // Timeout fallback so the page isn't stuck if fonts never load
      const fontsReady = Promise.race([
        document.fonts?.ready ?? Promise.resolve(),
        new Promise<void>((resolve) => window.setTimeout(resolve, 1500)),
      ]);

      fontsReady
        .then(() => {
          if (cancelled) return;

          try {
            if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
              revealFinalState();
              return;
            }

            const left = wordLeftRef.current;
            const right = wordRightRef.current;
            const bgWrap = bgWrapRef.current;
            const bgImage = bgImgRef.current;
            if (!left || !right || !bgWrap || !bgImage) return;

            // ---------- clip-path state ----------
            const clip = { top: 0, bottom: 0, left: 0, right: 0, radius: 999 };
            const applyClip = () => {
              bgWrap.style.clipPath = `inset(${clip.top}px ${clip.right}px ${clip.bottom}px ${clip.left}px round ${clip.radius}px)`;
            };

            const measureWords = (setHeight = false) => {
              const leftRect = left.getBoundingClientRect();
              const rightRect = right.getBoundingClientRect();
              if (setHeight) {
                clip.top = Math.max(0, leftRect.top);
                clip.bottom = Math.max(0, window.innerHeight - leftRect.bottom);
                clip.radius = Math.max(1, Math.min(leftRect.height, rightRect.height) / 2);
              }
              clip.left = Math.max(0, leftRect.right);
              clip.right = Math.max(0, window.innerWidth - rightRect.left);
              applyClip();
            };

            measureWords(true);
            gsap.set(bgImage, { scale: 1.35, willChange: 'transform' });

            // Set the intro start state inline, then drop the SSR `hir-pending`
            // class that kept this content hidden before hydration.
            gsap.set(badgeRef.current, { opacity: 0, y: 14, scale: 0.94 });
            gsap.set(subcopyRef.current, { opacity: 0, yPercent: 100 });
            gsap.set(ctaChildren(), { opacity: 0, y: 16 });
            headlineLineRefs.current.forEach((lineRef) => {
              if (lineRef) gsap.set(lineRef, { yPercent: 110, rotate: 2 });
            });
            rootRef.current?.classList.remove('hir-pending');

            const leftRect = left.getBoundingClientRect();
            const rightRect = right.getBoundingClientRect();
            const leftExit = -(leftRect.right + 32);
            const rightExit = window.innerWidth - rightRect.left + 32;

            // Collect the inner text spans for staggered reveal
            const headlineInners = headlineLineRefs.current.filter(Boolean) as HTMLSpanElement[];

            const timeline = gsap.timeline({
              defaults: { ease: 'power4.inOut' },
              onComplete: () => {
                finish();
                startDrift();
              },
            });

            timeline
              // Words push apart → clip opens between them (cinematic, slow)
              .to(left, { x: leftExit, duration: 1.8, onUpdate: measureWords }, 0)
              .to(right, { x: rightExit, duration: 1.8, onUpdate: measureWords }, 0)
              .to(bgImage, { scale: 1.15, duration: 1.8 }, 0)
              // Clip grows to full screen (more gradual expand)
              .to(
                clip,
                {
                  top: 0,
                  right: 0,
                  bottom: 0,
                  left: 0,
                  radius: 0,
                  duration: 2.0,
                  ease: 'expo.out',
                  onUpdate: applyClip,
                },
                '>-0.1',
              )
              .to(bgImage, { scale: 1, duration: 2.0, ease: 'expo.out' }, '<')
              .to(hazeRef.current, { opacity: 1, duration: 1.4, ease: 'power2.out' }, '<+=0.3')
              // Badge pop-in
              // (.to, not .from: the start state is already set above, so a
              // .from would animate opacity 0 → 0 and leave it invisible)
              .to(
                badgeRef.current,
                { opacity: 1, y: 0, scale: 1, duration: 0.7, ease: 'back.out(1.8)' },
                '-=0.9',
              )
              // Headline lines rise out of their CSS masks (overflow:hidden on the outer span)
              .to(
                headlineInners,
                {
                  yPercent: 0,
                  rotate: 0,
                  stagger: 0.12,
                  duration: 1.1,
                  ease: 'power3.out',
                },
                '-=0.5',
              )
              // Subcopy
              .to(
                subcopyRef.current,
                { opacity: 1, yPercent: 0, duration: 0.8, ease: 'power3.out' },
                '-=0.6',
              )
              // CTAs
              .to(
                ctaChildren(),
                { opacity: 1, y: 0, stagger: 0.1, duration: 0.7 },
                '-=0.5',
              );
          } catch (error) {
            console.error('HeroIntroReveal animation failed:', error);
            if (!cancelled) revealFinalState();
          }
        })
        .catch((error) => {
          console.error('HeroIntroReveal font loading failed:', error);
          if (!cancelled) revealFinalState();
        });

      return () => {
        cancelled = true;
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
      {/* Without JS the intro never runs, so show the final state */}
      <noscript>
        <style>{'.hir-pending .hir-hide,.hir-pending .hir-hide-children>*{opacity:1!important}.hir-pending .hir-line-inner{transform:none!important}.hir-pending .hir-words{display:none}'}</style>
      </noscript>
      {/* Intro words — push apart to open the clip-path window */}
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

      {/* Background image + haze */}
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

      {/* Hero content */}
      <div className="relative z-10 flex min-h-[100svh] flex-col items-center justify-center gap-6 px-6 py-24 text-center">
        {/* Badge */}
        <div
          ref={badgeRef}
          className="hir-hide rounded-full border border-black/10 bg-white/80 px-4 py-1.5 text-xs font-semibold uppercase tracking-wide text-black/70"
        >
          Desarrollo de Software · Automatización · IA
        </div>

        {/* Headline — each line gets an overflow:hidden wrapper so the inner span
            can animate from yPercent 110 → 0 without needing SplitText */}
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

        {/* Subcopy — wrapped in overflow:hidden for the mask effect */}
        <div className="overflow-hidden">
          <p
            ref={subcopyRef}
            className="hir-hide max-w-xl text-base text-black/60 sm:text-lg"
          >
            {subcopy}
          </p>
        </div>

        {/* CTAs */}
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

      {/* TextLoop — wave ribbon at the bottom of the hero, hidden while intro runs */}
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