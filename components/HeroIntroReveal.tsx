'use client';

import { useRef } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { useLocale, useTranslations } from 'next-intl';

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
  headlineLines,
  subcopy,
  ctaPrimary,
  ctaSecondary,
  bgImage = '/hero-bg.svg',
  className = '',
}: HeroIntroRevealProps) {
  const t = useTranslations('hero');
  const locale = useLocale();

  const rootRef = useRef<HTMLElement>(null);
  const wordLeftRef = useRef<HTMLSpanElement>(null);
  const wordRightRef = useRef<HTMLSpanElement>(null);
  const bgWrapRef = useRef<HTMLDivElement>(null);
  const bgImgRef = useRef<HTMLDivElement>(null);
  const hazeRef = useRef<HTMLDivElement>(null);
  const wordsWrapRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subcopyRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  const finalSubcopy = subcopy ?? t('subtitle');
  const finalCtaPrimary = ctaPrimary ?? { label: t('ctaPrimary'), href: '#contacto-form' };
  const finalCtaSecondary = ctaSecondary ?? { label: t('ctaSecondary'), href: '#casos-de-exito' };

  const lines = headlineLines ?? [
    locale === 'en' ? 'Software shaped around' : 'Software pensado para',
    locale === 'en' ? 'the way you work.' : 'la forma en que trabajas.',
  ];

  const renderLineContent = (line: string) => {
    const highlight = locale === 'en' ? 'work.' : 'trabajas.';
    if (line.includes(highlight)) {
      const parts = line.split(highlight);
      return (
        <>
          {parts[0]}
          <span className="bg-gradient-to-r from-[#2997ff] to-[#5ac8fa] bg-clip-text text-transparent drop-shadow-[0_0_30px_rgba(41,151,255,0.5)]">
            {highlight}
          </span>
          {parts[1]}
        </>
      );
    }
    return line;
  };

  useGSAP(
    () => {
      let cancelled = false;
      let idleTween: gsap.core.Tween | undefined;
      let failsafe: number | undefined;
      let finished = false;

      if (bgWrapRef.current) {
        bgWrapRef.current.style.clipPath = 'inset(0px 50% 0px 50% round 999px)';
      }

      rootRef.current?.classList.add('hir-animated');
      document.documentElement.classList.add('hero-intro-running');

      const finish = () => {
        if (finished) return;
        finished = true;
        if (failsafe !== undefined) window.clearTimeout(failsafe);
        gsap.set(bgWrapRef.current, { clipPath: 'inset(0px 0px 0px 0px round 0px)' });
        gsap.set(bgImgRef.current, { scale: 1, yPercent: 0, willChange: 'auto' });
        gsap.set([wordLeftRef.current, wordRightRef.current], { clearProps: 'all' });
        gsap.set(headlineRef.current, { clearProps: 'all', opacity: 1 });
        if (wordsWrapRef.current) wordsWrapRef.current.style.display = 'none';
        document.documentElement.classList.remove('hero-intro-running');
        rootRef.current?.classList.remove('hir-pending');
      };

      const startDrift = () => {
        idleTween = gsap.to(bgImgRef.current, {
          yPercent: -1.5, scale: 1.03, duration: 14,
          ease: 'sine.inOut', repeat: -1, yoyo: true,
        });
      };

      const ctaChildren = () => Array.from(ctaRef.current?.children ?? []);

      const revealFinalState = () => {
        finish();
        gsap.set([headlineRef.current, subcopyRef.current, ...ctaChildren()], { clearProps: 'all', opacity: 1 });
        startDrift();
      };

      try {
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) { revealFinalState(); return; }
        if (window.scrollY > 80 || (window.location.hash && window.location.hash !== '#' && window.location.hash !== '#main-content')) { revealFinalState(); return; }

        const left = wordLeftRef.current;
        const right = wordRightRef.current;
        const bgWrap = bgWrapRef.current;
        const bgImageEl = bgImgRef.current;
        if (!left || !right || !bgWrap || !bgImageEl) { revealFinalState(); return; }

        failsafe = window.setTimeout(() => { if (!cancelled) revealFinalState(); }, 4800);

        const leftRect = left.getBoundingClientRect();
        const rightRect = right.getBoundingClientRect();
        const midY = (leftRect.top + leftRect.bottom) / 2 || window.innerHeight / 2;
        const pillHeight = Math.max(leftRect.height || 64, 48);
        const initialTop = Math.max(0, midY - pillHeight / 2);
        const initialBottom = Math.max(0, window.innerHeight - (midY + pillHeight / 2));
        const initialRadius = pillHeight / 2;
        const startLeft = Math.max(0, leftRect.right);
        const startRight = Math.max(0, window.innerWidth - rightRect.left);

        const clipState = { top: initialTop, bottom: initialBottom, left: startLeft, right: startRight, radius: initialRadius };
        const applyClip = () => {
          if (bgWrapRef.current) bgWrapRef.current.style.clipPath = `inset(${clipState.top}px ${clipState.right}px ${clipState.bottom}px ${clipState.left}px round ${clipState.radius}px)`;
        };
        applyClip();

        gsap.set(bgImageEl, { scale: 1.25, willChange: 'transform' });
        gsap.set(headlineRef.current, { opacity: 0, y: 18 });
        gsap.set(subcopyRef.current, { opacity: 0, yPercent: 100 });
        gsap.set(ctaChildren(), { opacity: 0, y: 16 });

        const leftExit = -(leftRect.right + 60);
        const rightExit = window.innerWidth - rightRect.left + 60;

        const tl = gsap.timeline({ defaults: { ease: 'power3.inOut' }, onComplete: () => { finish(); startDrift(); } });

        tl.to(left, { x: leftExit, opacity: 0, duration: 1.25 }, 0.25)
          .to(right, { x: rightExit, opacity: 0, duration: 1.25 }, 0.25)
          .to(clipState, { left: 0, right: 0, duration: 1.25, onUpdate: applyClip }, 0.25)
          .to(bgImageEl, { scale: 1.12, duration: 1.25 }, 0.25)
          .to(clipState, { top: 0, bottom: 0, radius: 0, duration: 1.05, ease: 'expo.out', onUpdate: applyClip }, '-=0.2')
          .to(bgImageEl, { scale: 1, duration: 1.05, ease: 'expo.out' }, '<')
          .to(hazeRef.current, { opacity: 1, duration: 0.8, ease: 'power2.out' }, '<+=0.1')
          .to(headlineRef.current, { opacity: 1, y: 0, duration: 0.65, ease: 'power3.out' }, 1.55)
          .to(subcopyRef.current, { opacity: 1, yPercent: 0, duration: 0.7, ease: 'power3.out' }, '-=0.5')
          .to(ctaChildren(), { opacity: 1, y: 0, stagger: 0.08, duration: 0.55, ease: 'power3.out' }, '-=0.4');

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
      className={`hir-hero hir-pending relative min-h-[100svh] overflow-hidden bg-[#000000] ${className}`}
    >
      <noscript>
        <style>{'.hir-pending .hir-hide,.hir-pending .hir-hide-children>*{opacity:1!important}.hir-pending .hir-words{display:none}'}</style>
      </noscript>

      {/* Intro words */}
      <div
        ref={wordsWrapRef}
        aria-hidden="true"
        className="hir-words pointer-events-none absolute inset-0 z-20 flex items-center justify-center whitespace-nowrap px-4"
      >
        <span ref={wordLeftRef} className="text-4xl font-extrabold tracking-[-0.04em] text-white sm:text-6xl lg:text-7xl">
          {wordLeft}
        </span>
        <span className="w-3 shrink-0 sm:w-5" />
        <span ref={wordRightRef} className="text-4xl font-extrabold tracking-[-0.04em] text-white/60 sm:text-6xl lg:text-7xl">
          {wordRight}
        </span>
      </div>

      {/* Background */}
      <div ref={bgWrapRef} className="hir-bgwrap absolute inset-0 z-0 overflow-hidden">
        <div ref={bgImgRef} className="hir-bg h-full w-full bg-cover bg-center" style={{ backgroundImage: `url(${bgImage})` }} />
        {/* Dark overlay gradient */}
        <div ref={hazeRef} className="hir-haze absolute inset-0 opacity-0"
          style={{ background: 'linear-gradient(to bottom, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.4) 50%, rgba(0,0,0,0.85) 100%)' }}
        />
      </div>

      {/* Noise grain overlay */}
      <div className="pointer-events-none absolute inset-0 z-[1] opacity-[0.025]"
        style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E\")", backgroundRepeat: 'repeat', backgroundSize: '128px 128px' }}
      />

      {/* Content */}
      <div className="relative z-30 flex min-h-[100svh] flex-col items-center justify-center gap-6 px-4 sm:px-6 pt-20 pb-32 text-center max-w-5xl mx-auto w-full">

        {/* Headline */}
        <h1
          ref={headlineRef}
          className="hir-headline w-full max-w-4xl mx-auto font-heading font-black tracking-[-0.04em] text-white text-4xl sm:text-5xl lg:text-6xl xl:text-[5rem] leading-[1.05]"
        >
          {lines.map((line, i) => (
            <span key={i} className="hir-line-mask block overflow-hidden">
              <span className="hir-line-inner block">
                {renderLineContent(line)}
              </span>
            </span>
          ))}
        </h1>

        {/* Subtitle */}
        <div className="overflow-hidden w-full max-w-2xl mx-auto">
          <p
            ref={subcopyRef}
            className="hir-hide mx-auto text-center text-base sm:text-lg lg:text-xl font-normal text-white/60 leading-relaxed"
          >
            {finalSubcopy}
          </p>
        </div>

        {/* CTAs */}
        <div ref={ctaRef} className="hir-hide-children flex flex-wrap items-center justify-center gap-3 pt-1">
          <a
            href={finalCtaPrimary.href}
            className="group relative inline-flex items-center gap-2 rounded-full bg-white px-7 py-3.5 text-sm font-semibold text-black transition-all hover:bg-white/90 hover:scale-[1.02] active:scale-[0.98] shadow-[0_0_30px_rgba(255,255,255,0.15)]"
          >
            {finalCtaPrimary.label}
            <svg className="w-4 h-4 transition-transform group-hover:translate-x-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
          </a>
          <a
            href={finalCtaSecondary.href}
            className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-7 py-3.5 text-sm font-semibold text-white/80 backdrop-blur-sm transition-all hover:border-white/40 hover:bg-white/10 hover:text-white hover:scale-[1.02] active:scale-[0.98]"
          >
            {finalCtaSecondary.label}
          </a>
        </div>

      </div>

      {/* TextLoop ribbon */}
      <div className="hir-textloop absolute -bottom-8 left-0 right-0 z-10 w-full pointer-events-none">
        <TextLoop
          text={t('loopText')}
          shape="wave"
          speed={60}
          separator="✦"
          curviness={26}
          fontSize={24}
          fontWeight={700}
          letterSpacing={2}
          uppercase
          color="#ffffff"
          ribbon
          ribbonClassName="hir-ribbon-path"
          ribbonColor="#0a0a0a"
          ribbonWidth={52}
          compact
          pauseOnHover
        />
      </div>
    </section>
  );
}
