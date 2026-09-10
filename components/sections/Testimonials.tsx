'use client';

import { useTranslations, useLocale } from 'next-intl';
import useInView from '@/hooks/useInView';
import { testimonialsData, type Locale } from '@/i18n/data';

const Testimonials = () => {
  const t = useTranslations('testimonials');
  const locale = useLocale() as Locale;
  const [ref, inView] = useInView(0.06);
  const items = testimonialsData[locale] ?? testimonialsData.es;

  return (
    <section className="py-24 sm:py-32 bg-white dark:bg-black text-[#1d1d1f] dark:text-[#f5f5f7] border-b border-black/[0.06] dark:border-white/[0.08] transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Encabezado estilo Apple */}
        <div
          ref={ref}
          className={`mb-16 transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#1d1d1f] dark:text-white max-w-xl font-heading leading-tight">
            {t('title')}{' '}
            <span className="text-[#0071e3] dark:text-[#2997ff]">{t('titleHighlight')}</span>
          </h2>
          <p className="text-[#86868b] dark:text-slate-400 text-sm sm:text-base mt-3 max-w-lg leading-relaxed">
            {t('subtitle')}
          </p>
        </div>

        {/* Grid de testimonios estilo Apple */}
        <div className="grid sm:grid-cols-2 gap-6">
          {items.map((item, index) => (
            <div
              key={index}
              className="p-8 sm:p-9 rounded-3xl border border-black/[0.05] dark:border-white/[0.08] bg-[#f5f5f7] dark:bg-[#161617] flex flex-col justify-between hover:shadow-[0_12px_40px_rgba(0,0,0,0.06)] dark:hover:shadow-[0_12px_40px_rgba(0,0,0,0.5)] transition-all"
            >
              <div>
                <div className="flex items-center justify-between mb-5">
                  <span className="text-xs font-semibold px-3 py-1 rounded-full bg-black/[0.04] dark:bg-white/[0.08] text-[#1d1d1f]/75 dark:text-slate-300">
                    {item.project}
                  </span>
                  <span className="text-xs font-semibold text-[#0071e3] dark:text-[#2997ff]">
                    Caso verificado
                  </span>
                </div>

                <p className="text-[#1d1d1f] dark:text-slate-200 text-base sm:text-lg leading-relaxed mb-6 font-normal">
                  &ldquo;{item.text}&rdquo;
                </p>
              </div>

              <div className="flex items-center gap-3 pt-5 border-t border-black/[0.06] dark:border-white/[0.08]">
                <div className="w-10 h-10 rounded-full bg-black/[0.06] dark:bg-white/[0.1] text-[#1d1d1f] dark:text-white flex items-center justify-center text-xs font-bold">
                  {item.avatar}
                </div>
                <div>
                  <p className="text-sm font-bold text-[#1d1d1f] dark:text-white">{item.name}</p>
                  <p className="text-xs text-[#86868b] dark:text-slate-400">
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
