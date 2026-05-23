'use client';

import { useTranslations, useLocale } from 'next-intl';
import { Search, Lightbulb, Code, Rocket, Clock, ShieldCheck, FileCode } from 'lucide-react';
import useInView from '@/hooks/useInView';
import { processData, type Locale } from '@/i18n/data';
import TechCarousel from '@/components/ui/TechCarousel';

const STEP_ICONS = [Search, Lightbulb, Code, Rocket];
const STEP_COLORS = [
  'from-blue-500 to-brand-600',
  'from-brand-500 to-violet-600',
  'from-violet-500 to-purple-600',
  'from-purple-500 to-pink-600',
];
const GUARANTEE_ICONS = [Clock, ShieldCheck, FileCode];
const GUARANTEE_STYLES = [
  { color: 'text-brand-600',   bg: 'bg-brand-50 dark:bg-brand-900/20',     border: 'border-brand-100 dark:border-brand-800' },
  { color: 'text-emerald-600', bg: 'bg-emerald-50 dark:bg-emerald-900/20', border: 'border-emerald-100 dark:border-emerald-800' },
  { color: 'text-violet-600',  bg: 'bg-violet-50 dark:bg-violet-900/20',   border: 'border-violet-100 dark:border-violet-800' },
];

const WorkProcess = () => {
  const t = useTranslations('process');
  const locale = useLocale() as Locale;
  const [headerRef, headerInView] = useInView(0.08);
  const [stepsRef,  stepsInView]  = useInView(0.06);
  const [techRef,   techInView]   = useInView(0.06);

  const { steps, guarantees } = processData[locale] ?? processData.es;

  return (
    <section id="proceso" className="py-20 sm:py-28 lg:py-36 bg-white dark:bg-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">

        {/* ── Encabezado ── */}
        <div
          ref={headerRef}
          className={`text-center mb-16 sm:mb-24 transition-all duration-700 ${headerInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-brand-50 dark:bg-brand-900/30 border border-brand-100 dark:border-brand-800 rounded-full mb-6">
            <span className="text-[11px] font-black text-brand-600 dark:text-brand-400 uppercase tracking-widest">{t('badge')}</span>
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-black tracking-tighter text-slate-900 dark:text-white mb-4">
            {t('title')} <span className="text-brand-600">{t('titleHighlight')}</span>
          </h2>
          <p className="text-slate-600 dark:text-slate-300 font-medium text-base sm:text-lg max-w-2xl mx-auto">{t('subtitle')}</p>
        </div>

        {/* ── Pasos ── */}
        <div
          ref={stepsRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6 mb-14 sm:mb-20"
        >
          {steps.map((step, i) => {
            const Icon = STEP_ICONS[i];
            return (
              <div
                key={i}
                className={`relative group bg-slate-50 dark:bg-slate-800/60 rounded-2xl p-7 border-2 border-slate-100 dark:border-slate-700 hover:border-brand-200 dark:hover:border-brand-600 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 ${stepsInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                style={{ transitionDelay: `${i * 80}ms` }}
              >
                {/* Número decorativo */}
                <div className="absolute top-5 right-5 text-5xl font-black text-slate-100 dark:text-slate-700 group-hover:text-brand-50 dark:group-hover:text-brand-900/50 transition-colors select-none">
                  {step.number}
                </div>

                <div className={`w-14 h-14 bg-gradient-to-br ${STEP_COLORS[i]} rounded-xl flex items-center justify-center text-white mb-5 shadow-md`}>
                  <Icon size={26} />
                </div>

                <h3 className="font-heading text-xl font-black text-slate-900 dark:text-white mb-2 relative z-10">{step.title}</h3>
                <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed mb-4">{step.description}</p>

                <div className="flex items-center gap-2 text-xs font-black text-brand-600 dark:text-brand-400 uppercase tracking-widest">
                  <div className="w-1.5 h-1.5 bg-brand-600 rounded-full" />
                  {step.duration}
                </div>
              </div>
            );
          })}
        </div>

        {/* ── Garantías ── */}
        <div className="grid sm:grid-cols-3 gap-4 sm:gap-5 mb-16 sm:mb-24">
          {guarantees.map((g, i) => {
            const Icon = GUARANTEE_ICONS[i];
            const s = GUARANTEE_STYLES[i];
            return (
              <div key={i} className={`${s.bg} border-2 ${s.border} rounded-2xl p-6 sm:p-7`}>
                <Icon className={`${s.color} mb-4`} size={28} />
                <h4 className="font-heading font-black text-lg text-slate-900 dark:text-white mb-2">{g.title}</h4>
                <p className="text-sm text-slate-600 dark:text-slate-300">{g.desc}</p>
              </div>
            );
          })}
        </div>

        {/* ── Carrusel de tecnologías ── */}
        <div
          ref={techRef}
          className={`transition-all duration-700 ${techInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
        >
          <TechCarousel />
        </div>
      </div>
    </section>
  );
};

export default WorkProcess;
