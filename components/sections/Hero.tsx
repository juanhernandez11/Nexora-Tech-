'use client';

import { useTranslations } from 'next-intl';
import { ArrowRight, Clock, ShieldCheck, Star } from 'lucide-react';
import useInView from '@/hooks/useInView';

const Hero = () => {
  const t = useTranslations('hero');
  const ts = useTranslations('stats');
  const [ref, inView] = useInView(0.05);

  const stats = [
    { value: '15',   label: ts('0.label') },
    { value: '100%', label: ts('1.label') },
    { value: '2',    label: ts('2.label') },
    { value: '<2s',  label: ts('3.label') },
  ];

  return (
    <section ref={ref} className="relative pt-28 pb-16 sm:pt-40 sm:pb-20 lg:pt-52 lg:pb-32 overflow-hidden min-h-[90vh] flex items-center">
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-brand-600/5 dark:bg-brand-600/10 rounded-full blur-3xl translate-x-1/3 -translate-y-1/4" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-accent-500/5 rounded-full blur-3xl -translate-x-1/3 translate-y-1/4" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 w-full">
        <div className={`max-w-4xl transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm rounded-full mb-8">
            <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse flex-shrink-0" />
            <span className="text-[11px] font-bold text-slate-600 dark:text-slate-300 uppercase tracking-widest">{t('badge')}</span>
          </div>

          <h1 className="font-heading text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-slate-900 dark:text-white leading-[0.92] tracking-tighter mb-6">
            {t('title')}
          </h1>

          <p className="text-lg sm:text-xl md:text-2xl text-slate-600 dark:text-slate-300 mb-10 leading-relaxed font-medium max-w-2xl">
            {t('subtitle')}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mb-14">
            <a href="#contacto-form" className="inline-flex items-center justify-center gap-3 bg-brand-600 text-white px-8 py-4 rounded-xl font-bold text-base hover:bg-brand-700 transition-all shadow-brand hover:shadow-brand-lg group active:scale-95">
              {t('ctaPrimary')} <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </a>
            <a href="#casos-de-exito" className="inline-flex items-center justify-center gap-3 bg-white dark:bg-slate-800 text-slate-900 dark:text-white px-8 py-4 rounded-xl font-bold text-base border-2 border-slate-200 dark:border-slate-700 hover:border-brand-600 dark:hover:border-brand-500 transition-all">
              {t('ctaSecondary')}
            </a>
          </div>

          <div className="flex flex-wrap gap-x-8 gap-y-4 pt-8 border-t border-slate-100 dark:border-slate-800">
            {stats.map((s, i) => (
              <div key={i} className="flex flex-col">
                <span className="font-heading text-2xl font-black text-slate-900 dark:text-white leading-none">{s.value}</span>
                <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 mt-1 uppercase tracking-widest">{s.label}</span>
              </div>
            ))}
          </div>
        </div>

        <div className={`mt-12 flex flex-wrap gap-4 transition-all duration-700 delay-200 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 dark:text-slate-400">
            <ShieldCheck size={14} className="text-emerald-500" /> {t('trust1')}
          </div>
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 dark:text-slate-400">
            <Clock size={14} className="text-brand-600" /> {t('trust2')}
          </div>
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 dark:text-slate-400">
            <Star size={14} className="text-yellow-500 fill-yellow-500" /> {t('trust3')}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
