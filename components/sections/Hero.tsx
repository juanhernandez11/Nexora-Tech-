'use client';

import { useLocale, useTranslations } from 'next-intl';
import { ArrowDownRight, ArrowRight } from 'lucide-react';
import useInView from '@/hooks/useInView';
import { casesData, type Locale } from '@/i18n/data';

const Hero = () => {
  const t  = useTranslations('hero');
  const ts = useTranslations('stats');
  const locale = useLocale() as Locale;
  const [ref, inView] = useInView(0.05);
  const projects = (casesData[locale] ?? casesData.es).slice(0, 3);

  const stats = [
    { value: '15',   label: ts('0.label') },
    { value: '2',    label: ts('2.label') },
  ];

  return (
    <section
      ref={ref}
      className="relative overflow-hidden pt-28 pb-16 sm:pt-36 sm:pb-24 min-h-[92vh] flex items-center border-b border-slate-900/10 dark:border-white/10"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 w-full relative">
        <div className="grid lg:grid-cols-[minmax(0,1.15fr)_minmax(280px,0.65fr)] gap-12 lg:gap-24 items-end">
          <div>
            <h1
              className={`font-heading text-[clamp(3.1rem,7vw,6.7rem)] font-bold text-slate-900 dark:text-white leading-[0.88] tracking-tight mb-8 max-w-4xl transition-all duration-700 delay-75 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
            >
              {t('title')}
            </h1>
            <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed max-w-xl mb-8">
              {t('subtitle')}
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
            <a
              href="#contacto-form"
              className="inline-flex items-center justify-center gap-3 bg-slate-900 dark:bg-brand-500 text-white dark:text-slate-950 px-6 py-3.5 rounded-none text-sm font-bold hover:bg-brand-700 dark:hover:bg-brand-400 transition-colors group"
            >
              {t('ctaPrimary')}
              <ArrowRight size={15} className="group-hover:translate-x-0.5 transition-transform" />
            </a>
            <a
              href="#casos-de-exito"
              className="inline-flex items-center justify-center gap-2 text-sm font-semibold text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors px-3 py-3"
            >
              {t('ctaSecondary')}
              <ArrowDownRight size={15} />
            </a>
          </div>
          </div>

          <div className={`border-l border-slate-900/15 dark:border-white/15 pl-6 sm:pl-8 transition-all duration-1000 delay-200 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <p className="eyebrow mb-5">{locale === 'en' ? 'Selected work' : 'Trabajo seleccionado'}</p>
            <div className="divide-y divide-slate-900/10 dark:divide-white/10">
              {projects.map((project, index) => (
                <a key={project.title} href="#casos-de-exito" className="group flex items-start gap-4 py-4 first:pt-0 last:pb-0">
                  <span className="font-heading text-xs text-brand-700 dark:text-brand-400 pt-1">0{index + 1}</span>
                  <span><span className="block text-[10px] uppercase tracking-[0.12em] text-slate-500 dark:text-slate-400 mb-1">{project.company}</span><span className="text-sm sm:text-base font-semibold text-slate-800 dark:text-slate-200 group-hover:text-brand-700 dark:group-hover:text-brand-400 transition-colors">{project.title}</span></span>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Stats — línea horizontal, sin cards */}
        <div
          className={`border-t border-slate-900/15 dark:border-white/15 pt-8 mt-16 grid grid-cols-2 gap-6 max-w-sm transition-all duration-700 delay-200 ${inView ? 'opacity-100' : 'opacity-0'}`}
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
