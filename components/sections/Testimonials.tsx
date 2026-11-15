'use client';

import { useTranslations, useLocale } from 'next-intl';
import useInView from '@/hooks/useInView';
import { testimonialsData, type Locale } from '@/i18n/data';

const GLOW_COLORS = ['#2997ff', '#a855f7', '#34d399', '#f59e0b'];

export default function Testimonials() {
  const t = useTranslations('testimonials');
  const locale = useLocale() as Locale;
  const [ref, inView] = useInView(0.06);
  const items = testimonialsData[locale] ?? testimonialsData.es;

  return (
    <section className="theme-surface relative overflow-hidden py-28 sm:py-36 bg-[#000]">

      {/* Matrix grid background */}
      <div
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)',
          backgroundSize: '36px 36px',
        }}
      />

      {/* Ambient glows */}
      <div className="pointer-events-none absolute top-1/4 left-1/4 w-72 h-72 rounded-full bg-[#2997ff]/8 blur-[100px]" />
      <div className="pointer-events-none absolute bottom-1/4 right-1/4 w-72 h-72 rounded-full bg-[#a855f7]/8 blur-[100px]" />

      {/* Grid intersection dots */}
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 rounded-full animate-glow-pulse"
            style={{
              left: `${(i * 8.3) % 100}%`,
              top: `${(i * 11.7 + 10) % 90}%`,
              background: GLOW_COLORS[i % GLOW_COLORS.length],
              opacity: 0.4,
              animationDelay: `${i * 0.4}s`,
            }}
          />
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">

        {/* Header */}
        <div
          ref={ref}
          className={`mb-20 text-center transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
        >
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#2997ff] mb-4">Testimonios</p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-[-0.03em] text-white leading-[1.05]">
            {t('title')}{' '}
            <span className="bg-gradient-to-r from-[#2997ff] to-[#5ac8fa] bg-clip-text text-transparent">
              {t('titleHighlight')}
            </span>
          </h2>
          <p className="text-white/40 text-sm sm:text-base mt-4 max-w-lg mx-auto leading-relaxed">
            {t('subtitle')}
          </p>
        </div>

        {/* Testimonial cards — Matrix style (masonry-like asymmetric grid) */}
        <div className="grid sm:grid-cols-2 gap-4 sm:gap-5">
          {items.map((item, index) => {
            const glow = GLOW_COLORS[index % GLOW_COLORS.length];
            const isLarge = index === 0 || index === 3;
            return (
              <div
                key={index}
                className={`group relative rounded-2xl border border-white/[0.06] bg-white/[0.02] backdrop-blur-sm p-7 flex flex-col justify-between transition-all duration-300 hover:border-white/[0.12] hover:bg-white/[0.04] ${isLarge ? 'sm:row-span-1' : ''}`}
                style={{ boxShadow: `0 0 0 0 ${glow}00`, transition: 'box-shadow 0.4s ease, border-color 0.3s, background 0.3s' }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.boxShadow = `0 0 40px ${glow}12`; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.boxShadow = 'none'; }}
              >
                {/* Glow dot top-right */}
                <div
                  className="absolute top-5 right-5 w-2 h-2 rounded-full animate-glow-pulse"
                  style={{ background: glow, boxShadow: `0 0 8px ${glow}` }}
                />

                {/* Quote mark */}
                <div className="text-5xl font-black leading-none mb-4" style={{ color: `${glow}30` }}>&quot;</div>

                <p className="text-sm sm:text-base text-white/70 leading-relaxed mb-6 flex-1">
                  {item.text}
                </p>

                {/* Project tag */}
                <div className="mb-5">
                  <span
                    className="text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full"
                    style={{ background: `${glow}18`, color: glow, border: `1px solid ${glow}30` }}
                  >
                    {item.project}
                  </span>
                </div>

                {/* Author */}
                <div className="flex items-center gap-3 pt-4 border-t border-white/[0.06]">
                  <div
                    className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-black"
                    style={{ background: `${glow}20`, color: glow, border: `1px solid ${glow}30` }}
                  >
                    {item.avatar}
                  </div>
                  <div>
                    <p className="text-sm font-bold text-white">{item.name}</p>
                    <p className="text-[11px] text-white/30">{item.role} · {item.company}</p>
                  </div>
                  {/* Verified badge */}
                  <div className="ml-auto flex items-center gap-1 text-[10px] text-white/30">
                    <div className="w-3.5 h-3.5 rounded-full border border-white/20 flex items-center justify-center">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#34d399]" />
                    </div>
                    Verificado
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
