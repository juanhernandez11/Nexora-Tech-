'use client';

import { useTranslations, useLocale } from 'next-intl';
import { Star, Quote, Linkedin } from 'lucide-react';
import useInView from '@/hooks/useInView';
import { testimonialsData, type Locale } from '@/i18n/data';

const STATS = [
  { value: '15',  label: 'Proyectos / Projects', color: 'text-brand-600' },
  { value: '100%', label: 'Satisfacción / Satisfaction', color: 'text-emerald-600' },
  { value: '2',    label: 'Años / Years', color: 'text-blue-600' },
  { value: '<2s',  label: 'Carga / Load', color: 'text-violet-600' },
];

// Colores inline para evitar purga de clases dinámicas de Tailwind
const AVATAR_COLORS: Record<string, string> = {
  'bg-indigo-500':  '#6366F1',
  'bg-emerald-500': '#10B981',
  'bg-blue-500':    '#3B82F6',
  'bg-violet-500':  '#8B5CF6',
};

const Testimonials = () => {
  const t = useTranslations('testimonials');
  const locale = useLocale() as Locale;
  const [ref, inView] = useInView(0.06);
  const items = testimonialsData[locale] ?? testimonialsData.es;

  return (
    <section className="py-20 sm:py-28 lg:py-36 bg-slate-50 dark:bg-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div ref={ref} className={`text-center mb-14 sm:mb-20 transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-100 dark:border-yellow-800 rounded-full mb-6">
            <Star size={13} className="text-yellow-500 fill-yellow-500" />
            <span className="text-[11px] font-black text-yellow-700 dark:text-yellow-400 uppercase tracking-widest">{t('badge')}</span>
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-black tracking-tighter text-slate-900 dark:text-white mb-4">
            {t('title')} <span className="text-brand-600">{t('titleHighlight')}</span>
          </h2>
          <p className="text-slate-600 dark:text-slate-300 font-medium text-base sm:text-lg max-w-2xl mx-auto">{t('subtitle')}</p>
        </div>
        <div className="grid sm:grid-cols-2 gap-5 sm:gap-7 mb-14 sm:mb-20">
          {items.map((item, index) => (
            <div key={index} className="bg-white dark:bg-slate-800 rounded-2xl p-7 sm:p-9 border border-slate-100 dark:border-slate-700 shadow-sm hover:shadow-xl transition-all duration-300 relative overflow-hidden">
              <Quote className="absolute top-6 right-6 text-slate-100 dark:text-slate-700" size={40} />
              <div className="flex items-start gap-4 mb-5 relative z-10">
                <div
                  className="w-14 h-14 rounded-xl flex items-center justify-center text-white font-black text-lg flex-shrink-0"
                  style={{ backgroundColor: AVATAR_COLORS[item.avatarColor] ?? '#6366F1' }}
                >
                  {item.avatar}
                </div>
                <div>
                  <h3 className="font-heading font-black text-base text-slate-900 dark:text-white">{item.name}</h3>
                  <p className="text-xs font-semibold text-slate-500 dark:text-slate-400">{item.role}</p>
                  <p className="text-xs font-black text-brand-600 dark:text-brand-400 uppercase tracking-widest mt-0.5">{item.company}</p>
                </div>
              </div>
              <div className="flex gap-1 mb-4">
                {Array.from({ length: item.rating }).map((_, i) => <Star key={i} size={13} className="fill-yellow-400 text-yellow-400" />)}
              </div>
              <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-sm sm:text-base font-medium mb-5">"{item.text}"</p>
              <div className="pt-4 border-t border-slate-100 dark:border-slate-700 flex items-center justify-between">
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{t('projectLabel')} {item.project}</span>
                <a href="https://www.linkedin.com/in/juan-ramon-moreno-bravo-0830b1271/" target="_blank" rel="noopener noreferrer" aria-label={t('verifyLinkedIn')} className="text-slate-300 hover:text-blue-500 transition-colors">
                  <Linkedin size={14} />
                </a>
              </div>
            </div>
          ))}
        </div>
        <div className="flex flex-wrap justify-center gap-0 bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-sm overflow-hidden">
          {STATS.map((s, i) => (
            <div key={i} className={`flex-1 min-w-[120px] text-center py-7 px-4 ${i < STATS.length - 1 ? 'border-r border-slate-100 dark:border-slate-700' : ''}`}>
              <p className={`font-heading text-3xl sm:text-4xl font-black ${s.color}`}>{s.value}</p>
              <p className="text-[10px] sm:text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest mt-1">{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
