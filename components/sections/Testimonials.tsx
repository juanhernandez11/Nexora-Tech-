'use client';

import { useTranslations, useLocale } from 'next-intl';
import { Star } from 'lucide-react';
import useInView from '@/hooks/useInView';
import { testimonialsData, type Locale } from '@/i18n/data';

const AVATAR_COLORS: Record<string, string> = {
  'bg-indigo-500':  '#6366F1',
  'bg-emerald-500': '#10B981',
  'bg-blue-500':    '#3B82F6',
  'bg-violet-500':  '#8B5CF6',
};

const Testimonials = () => {
  const t      = useTranslations('testimonials');
  const locale = useLocale() as Locale;
  const [ref, inView] = useInView(0.06);
  const items  = testimonialsData[locale] ?? testimonialsData.es;

  return (
    <section className="py-20 sm:py-28 bg-white dark:bg-slate-950">
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
        </div>

        {/* Grid de testimonios */}
        <div className="grid sm:grid-cols-2 gap-5">
          {items.map((item, index) => (
            <div
              key={index}
              className={`p-6 sm:p-7 border border-slate-100 dark:border-slate-800 rounded-xl transition-all duration-500 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
              style={{ transitionDelay: `${index * 80}ms` }}
            >
              {/* Estrellas */}
              <div className="flex gap-0.5 mb-4">
                {Array.from({ length: item.rating }).map((_, i) => (
                  <Star key={i} size={12} className="fill-yellow-400 text-yellow-400" />
                ))}
              </div>

              {/* Texto */}
              <p className="text-slate-700 dark:text-slate-300 text-sm leading-relaxed mb-6">
                "{item.text}"
              </p>

              {/* Autor */}
              <div className="flex items-center gap-3 pt-4 border-t border-slate-100 dark:border-slate-800">
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold shrink-0"
                  style={{ backgroundColor: AVATAR_COLORS[item.avatarColor] ?? '#6366F1' }}
                >
                  {item.avatar}
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-slate-900 dark:text-white truncate">{item.name}</p>
                  <p className="text-xs text-slate-400 dark:text-slate-500 truncate">
                    {item.role} · {item.company}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
