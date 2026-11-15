'use client';

import { useTranslations, useLocale } from 'next-intl';
import Link from 'next/link';
import { ArrowUpRight, Zap, Server, ShieldCheck } from 'lucide-react';
import useInView from '@/hooks/useInView';
import { solutionsData, type Locale } from '@/i18n/data';
import { MagicCard } from '@/components/ui/MagicCard';

const ICONS = [Zap, Server, ShieldCheck];

const ICON_COLORS = [
  { from: '#2997ff', to: '#5ac8fa' },
  { from: '#a855f7', to: '#ec4899' },
  { from: '#34d399', to: '#059669' },
];

export default function Solutions() {
  const t = useTranslations('solutions');
  const locale = useLocale() as Locale;
  const [ref, inView] = useInView(0.06);
  const items = solutionsData[locale] ?? solutionsData.es;

  return (
    <section id="soluciones" className="theme-surface relative overflow-hidden py-28 sm:py-36 bg-[#000] text-white">

      {/* Grid background */}
      <div className="pointer-events-none absolute inset-0 z-0"
        style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)',
          backgroundSize: '48px 48px',
        }}
      />

      {/* Radial glow center */}
      <div className="pointer-events-none absolute inset-0 z-0 flex items-center justify-center">
        <div className="h-[600px] w-[800px] rounded-full bg-[#2997ff]/5 blur-[120px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">

        {/* Header */}
        <div
          ref={ref}
          className={`mb-20 transition-all duration-300 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'}`}
        >
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#2997ff] mb-4">
                {t('badge') ?? 'Servicios'}
              </p>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-[-0.03em] text-white max-w-xl leading-[1.05]">
                ¿Qué problema{' '}
                <span className="bg-gradient-to-r from-[#2997ff] to-[#5ac8fa] bg-clip-text text-transparent">
                  necesitas resolver?
                </span>
              </h2>
              <p className="text-white/40 text-sm sm:text-base mt-4 max-w-lg leading-relaxed">
                {t('subtitle')}
              </p>
            </div>
            <Link
              href={locale === 'en' ? '/en/servicios' : '/servicios'}
              className="inline-flex items-center gap-1.5 text-sm font-medium text-white/50 hover:text-white transition-colors group w-fit shrink-0"
            >
              <span>{locale === 'en' ? 'All services' : 'Ver todos los servicios'}</span>
              <ArrowUpRight size={15} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </Link>
          </div>
        </div>

        {/* SVG connecting lines (Features-Flow style) — desktop only */}
        <div className="pointer-events-none absolute left-1/2 -translate-x-1/2 top-[320px] w-[900px] hidden xl:block" aria-hidden="true">
          <svg width="900" height="120" viewBox="0 0 900 120" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M150 60 Q300 10 450 60 Q600 110 750 60"
              stroke="url(#lineGrad)"
              strokeWidth="1"
              strokeDasharray="6 4"
              strokeLinecap="round"
              opacity="0.35"
            />
            <circle cx="150" cy="60" r="4" fill="#2997ff" opacity="0.6" />
            <circle cx="450" cy="60" r="4" fill="#a855f7" opacity="0.6" />
            <circle cx="750" cy="60" r="4" fill="#34d399" opacity="0.6" />
            <defs>
              <linearGradient id="lineGrad" x1="0" y1="0" x2="900" y2="0" gradientUnits="userSpaceOnUse">
                <stop stopColor="#2997ff" />
                <stop offset="0.5" stopColor="#a855f7" />
                <stop offset="1" stopColor="#34d399" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-3 gap-5 sm:gap-6">
          {items.map((sol, i) => {
            const Icon = ICONS[i % ICONS.length];
            const color = ICON_COLORS[i % ICON_COLORS.length];
            return (
              <MagicCard
                key={i}
                gradientColor={`${color.from}18`}
                gradientSize={280}
                gradientOpacity={1}
                className="relative bg-[#0a0a0a] border-white/[0.08] p-7 flex flex-col justify-between min-h-[380px] rounded-2xl"
              >
                <div>
                  {/* Icon + tag */}
                  <div className="flex items-center justify-between mb-7">
                    <div
                      className="w-11 h-11 rounded-xl flex items-center justify-center"
                      style={{ background: `linear-gradient(135deg, ${color.from}20, ${color.to}20)`, border: `1px solid ${color.from}30` }}
                    >
                      <Icon size={20} style={{ color: color.from }} />
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-white/30 border border-white/10 px-2.5 py-1 rounded-full">
                      {sol.type}
                    </span>
                  </div>

                  <h3 className="text-xl font-black tracking-[-0.03em] text-white mb-3 leading-snug">
                    {sol.title}
                  </h3>
                  <p className="text-sm text-white/40 leading-relaxed mb-6">
                    {sol.description}
                  </p>
                </div>

                <div>
                  {/* Features */}
                  <ul className="space-y-2 mb-6 pt-5 border-t border-white/[0.06]">
                    {sol.features.slice(0, 3).map((f, j) => (
                      <li key={j} className="flex items-center gap-2.5 text-xs text-white/50">
                        <span className="w-1 h-1 rounded-full shrink-0" style={{ background: color.from }} />
                        {f}
                      </li>
                    ))}
                  </ul>

                  <a
                    href="#contacto-form"
                    className="inline-flex items-center gap-1.5 text-xs font-semibold transition-colors"
                    style={{ color: color.from }}
                  >
                    {t('cta')}
                    <ArrowUpRight size={13} />
                  </a>
                </div>
              </MagicCard>
            );
          })}
        </div>
      </div>
    </section>
  );
}
