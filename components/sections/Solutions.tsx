'use client';

import { useTranslations, useLocale } from 'next-intl';
import { Users, Building2, Factory, ArrowRight } from 'lucide-react';
import useInView from '@/hooks/useInView';
import { solutionsData, type Locale } from '@/i18n/data';

const ICONS = [Users, Building2, Factory];
const ICON_COLORS = ['text-blue-400', 'text-accent-400', 'text-brand-400'];

const Solutions = () => {
  const t = useTranslations('solutions');
  const locale = useLocale() as Locale;
  const [ref, inView] = useInView(0.08);
  const items = solutionsData[locale] ?? solutionsData.es;

  return (
    <section id="soluciones" className="py-20 sm:py-28 lg:py-36 bg-slate-900 text-white rounded-3xl mx-3 sm:mx-4 relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-brand-600/10 rounded-full blur-3xl -translate-y-1/2 pointer-events-none" />
      <div ref={ref} className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <div className={`text-center mb-14 sm:mb-20 transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 border border-white/10 rounded-full mb-6">
            <span className="text-[11px] font-bold text-slate-300 uppercase tracking-widest">{t('badge')}</span>
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tighter mb-5">{t('title')}</h2>
          <p className="text-slate-400 text-base sm:text-lg font-medium max-w-2xl mx-auto">{t('subtitle')}</p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {items.map((sol, i) => {
            const Icon = ICONS[i];
            return (
              <div key={i} className={`group p-7 sm:p-9 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/10 hover:border-white/20 transition-all duration-300 text-left flex flex-col ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`} style={{ transitionDelay: `${i * 100}ms` }}>
                <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-5">{sol.type}</span>
                <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center mb-5 group-hover:bg-brand-600 transition-colors duration-300">
                  <Icon size={22} className={ICON_COLORS[i]} />
                </div>
                <h3 className="font-heading text-xl sm:text-2xl font-black mb-3">{sol.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed mb-6 flex-grow">{sol.description}</p>
                <div className="space-y-2.5 mb-6">
                  {sol.features.map((f, j) => (
                    <div key={j} className="flex items-center gap-3 text-xs font-semibold text-slate-300">
                      <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 flex-shrink-0" />{f}
                    </div>
                  ))}
                </div>
                <a href="#contacto-form" className="inline-flex items-center gap-2 text-xs font-black text-brand-400 hover:text-white uppercase tracking-widest transition-colors group/link">
                  {t('cta')} <ArrowRight size={13} className="group-hover/link:translate-x-1 transition-transform" />
                </a>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Solutions;
