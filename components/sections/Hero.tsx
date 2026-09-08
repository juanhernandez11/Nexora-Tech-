'use client';

import { useTranslations } from 'next-intl';
import { ArrowRight } from 'lucide-react';
import useInView from '@/hooks/useInView';

const Hero = () => {
  const t  = useTranslations('hero');
  const ts = useTranslations('stats');
  const [ref, inView] = useInView(0.05);

  const stats = [
    { value: '15',   label: ts('0.label') },
    { value: '100%', label: ts('1.label') },
    { value: '2',    label: ts('2.label') },
    { value: '<2s',  label: ts('3.label') },
  ];

  return (
    <section
      ref={ref}
      className="relative pt-32 pb-20 sm:pt-44 sm:pb-28 min-h-[88vh] flex flex-col justify-center"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 w-full">

        {/* Indicador disponible — pequeño, sin pill */}
        <div
          className={`flex items-center gap-2 mb-8 transition-all duration-500 ${inView ? 'opacity-100' : 'opacity-0'}`}
        >
          <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full" />
          <span className="text-xs font-medium text-slate-400 dark:text-slate-500">
            {t('badge')}
          </span>
        </div>

        {/* Headline principal */}
        <h1
          className={`font-heading text-[clamp(2.8rem,8vw,6.5rem)] font-black text-slate-900 dark:text-white leading-[0.9] tracking-tight mb-8 max-w-5xl transition-all duration-700 delay-75 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
        >
          {t('title')}
        </h1>

        {/* Subtítulo + CTAs en grid */}
        <div
          className={`grid sm:grid-cols-2 gap-8 items-end mb-16 transition-all duration-700 delay-150 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
        >
          <p className="text-base sm:text-lg text-slate-500 dark:text-slate-400 leading-relaxed max-w-md">
            {t('subtitle')}
          </p>

          <div className="flex flex-col sm:flex-row gap-3 sm:justify-end">
            <a
              href="#contacto-form"
              className="inline-flex items-center justify-center gap-2 bg-slate-900 dark:bg-white text-white dark:text-slate-900 px-6 py-3 rounded-lg text-sm font-semibold hover:bg-slate-700 dark:hover:bg-slate-100 transition-colors group"
            >
              {t('ctaPrimary')}
              <ArrowRight size={15} className="group-hover:translate-x-0.5 transition-transform" />
            </a>
            <a
              href="#casos-de-exito"
              className="inline-flex items-center justify-center gap-2 text-sm font-semibold text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors px-6 py-3"
            >
              {t('ctaSecondary')}
            </a>
          </div>
        </div>

        {/* Stats — línea horizontal, sin cards */}
        <div
          className={`border-t border-slate-100 dark:border-slate-800 pt-8 grid grid-cols-2 sm:grid-cols-4 gap-6 transition-all duration-700 delay-200 ${inView ? 'opacity-100' : 'opacity-0'}`}
        >
          {stats.map((s, i) => (
            <div key={i}>
              <p className="font-heading text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
                {s.value}
              </p>
              <p className="text-xs text-slate-400 dark:text-slate-500 mt-1 leading-snug">
                {s.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;
