'use client';

import { useTranslations, useLocale } from 'next-intl';
import useInView from '@/hooks/useInView';
import { processData, type Locale } from '@/i18n/data';
import TechCarousel from '@/components/ui/TechCarousel';

const WorkProcess = () => {
  const t      = useTranslations('process');
  const locale = useLocale() as Locale;
  const [ref, inView]   = useInView(0.06);
  const [techRef, techInView] = useInView(0.06);
  const { steps, guarantees } = processData[locale] ?? processData.es;

  return (
    <section id="proceso" className="py-20 sm:py-28 bg-slate-50 dark:bg-slate-900/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">

        {/* Encabezado */}
        <div
          ref={ref}
          className={`mb-14 transition-all duration-600 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
        >
          <p className="text-xs font-medium text-slate-400 dark:text-slate-500 mb-3 uppercase tracking-widest">
            {t('badge')}
          </p>
          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 dark:text-white max-w-xl">
            {t('title')} <span className="text-brand-600">{t('titleHighlight')}</span>
          </h2>
          <p className="text-slate-500 dark:text-slate-400 text-base mt-3 max-w-lg">{t('subtitle')}</p>
        </div>

        {/* Pasos */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          {steps.map((step, i) => (
            <div
              key={i}
              className={`bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-xl p-6 transition-all duration-500 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
              style={{ transitionDelay: `${i * 70}ms` }}
            >
              <span className="font-heading text-3xl font-black text-slate-100 dark:text-slate-800 block mb-4">
                {step.number}
              </span>
              <h3 className="font-heading text-base font-black text-slate-900 dark:text-white mb-2">
                {step.title}
              </h3>
              <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed mb-3">
                {step.description}
              </p>
              <span className="text-xs font-medium text-brand-600 dark:text-brand-400">
                {step.duration}
              </span>
            </div>
          ))}
        </div>

        {/* Garantías — lista horizontal */}
        <div className="grid sm:grid-cols-3 gap-4 mb-16">
          {guarantees.map((g, i) => (
            <div
              key={i}
              className={`flex items-start gap-3 p-5 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-xl transition-all duration-500 ${inView ? 'opacity-100' : 'opacity-0'}`}
              style={{ transitionDelay: `${(i + 4) * 70}ms` }}
            >
              <span className="w-1.5 h-1.5 bg-brand-600 rounded-full mt-2 shrink-0" />
              <div>
                <p className="text-sm font-semibold text-slate-900 dark:text-white mb-0.5">{g.title}</p>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">{g.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Carrusel de tecnologías */}
        <div
          ref={techRef}
          className={`transition-all duration-600 ${techInView ? 'opacity-100' : 'opacity-0'}`}
        >
          <p className="text-xs font-medium text-slate-400 dark:text-slate-500 mb-6 uppercase tracking-widest text-center">
            {t('techTitle')}
          </p>
          <TechCarousel />
        </div>
      </div>
    </section>
  );
};

export default WorkProcess;
