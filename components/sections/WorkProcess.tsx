'use client';

import { useTranslations, useLocale } from 'next-intl';
import { Clock, ShieldCheck, FileCheck } from 'lucide-react';
import useInView from '@/hooks/useInView';
import { processData, type Locale } from '@/i18n/data';
import TechCarousel from '@/components/ui/TechCarousel';

const STEP_COLORS = ['#2997ff', '#a855f7', '#34d399', '#f59e0b'];

export default function WorkProcess() {
  const t = useTranslations('process');
  const locale = useLocale() as Locale;
  const [ref, inView] = useInView(0.06);
  const [techRef, techInView] = useInView(0.06);
  const { steps, guarantees } = processData[locale] ?? processData.es;
  const guaranteeIcons = [Clock, ShieldCheck, FileCheck];

  return (
    <section id="proceso" className="theme-surface relative overflow-hidden py-28 sm:py-36 bg-[#000]">

      {/* Grid */}
      <div className="pointer-events-none absolute inset-0 z-0"
        style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)',
          backgroundSize: '48px 48px',
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">

        {/* Header */}
        <div
          ref={ref}
          className={`mb-20 transition-all duration-300 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'}`}
        >
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#2997ff] mb-4">Proceso</p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-[-0.03em] text-white max-w-xl leading-[1.05]">
            {t('title')}{' '}
            <span className="bg-gradient-to-r from-[#2997ff] to-[#5ac8fa] bg-clip-text text-transparent">
              {t('titleHighlight')}
            </span>
          </h2>
          <p className="text-white/40 text-sm sm:text-base mt-4 max-w-lg leading-relaxed">
            {t('subtitle')}
          </p>
        </div>

        {/* Steps — numbered cards with BorderBeam */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {steps.map((step, i) => {
            const color = STEP_COLORS[i % STEP_COLORS.length];
            return (
              <div
                key={i}
                className="relative rounded-2xl bg-white/[0.02] border border-white/[0.06] p-6 flex flex-col gap-4 overflow-hidden transition-all duration-300 hover:bg-white/[0.04] hover:border-white/[0.1]"
              >
                {/* Step number */}
                <div className="flex items-center justify-between">
                  <span
                    className="text-3xl font-black tracking-tight opacity-20 select-none"
                    style={{ color }}
                  >
                    0{step.number}
                  </span>
                  <span className="text-[10px] font-bold text-white/20 border border-white/[0.06] px-2 py-0.5 rounded-full">
                    {step.duration}
                  </span>
                </div>

                <div>
                  <h3 className="text-base font-black tracking-[-0.02em] text-white mb-2">
                    {step.title}
                  </h3>
                  <p className="text-xs text-white/40 leading-relaxed">
                    {step.description}
                  </p>
                </div>

                {/* Connector line */}
                {i < steps.length - 1 && (
                  <div
                    className="absolute top-1/2 -right-3 w-6 h-px hidden lg:block z-10"
                    style={{ background: `linear-gradient(to right, ${color}60, transparent)` }}
                  />
                )}
              </div>
            );
          })}
        </div>

        {/* Guarantees */}
        <div className="relative rounded-2xl border border-white/[0.06] bg-white/[0.02] p-7 sm:p-8 mb-20 overflow-hidden">
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/30 mb-6">Garantías contractuales</p>
          <div className="grid sm:grid-cols-3 gap-6">
            {guarantees.map((g, i) => {
              const Icon = guaranteeIcons[i % guaranteeIcons.length];
              return (
                <div key={i} className="flex items-start gap-4">
                  <div className="p-2.5 rounded-xl bg-[#2997ff]/10 border border-[#2997ff]/20 shrink-0">
                    <Icon size={16} className="text-[#2997ff]" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-white mb-1">{g.title}</p>
                    <p className="text-xs text-white/40 leading-relaxed">{g.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Tech Stack */}
        <div
          ref={techRef}
          className={`transition-all duration-700 ${techInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
        >
          <div className="text-center mb-10 pb-10 border-t border-white/[0.06] pt-10">
            <h3 className="text-xl sm:text-2xl font-black tracking-[-0.03em] text-white mb-2">
              {t('techTitle')}
            </h3>
            <p className="text-xs text-white/40 max-w-md mx-auto">{t('techSubtitle')}</p>
          </div>
          <TechCarousel />
        </div>
      </div>
    </section>
  );
}
