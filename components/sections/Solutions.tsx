'use client';

import { useTranslations, useLocale } from 'next-intl';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import useInView from '@/hooks/useInView';
import { solutionsData, type Locale } from '@/i18n/data';

const Solutions = () => {
  const t      = useTranslations('solutions');
  const locale = useLocale() as Locale;
  const [ref, inView] = useInView(0.06);
  const items  = solutionsData[locale] ?? solutionsData.es;

  return (
    <section id="soluciones" className="py-20 sm:py-28 bg-white dark:bg-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">

        {/* Encabezado */}
        <div
          ref={ref}
          className={`mb-14 transition-all duration-600 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
        >
          <p className="text-xs font-medium text-slate-400 dark:text-slate-500 mb-3 uppercase tracking-widest">
            {t('badge')}
          </p>
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
            <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 dark:text-white max-w-xl">
              {t('title')}
            </h2>
            <Link
              href={locale === 'en' ? '/en/servicios' : '/servicios'}
              className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors shrink-0"
            >
              {locale === 'en' ? 'All services' : 'Todos los servicios'}
              <ArrowUpRight size={14} />
            </Link>
          </div>
        </div>

        {/* Lista de soluciones */}
        <div className="divide-y divide-slate-100 dark:divide-slate-800">
          {items.map((sol, i) => (
            <a
              key={i}
              href="#contacto-form"
              className={`group flex flex-col sm:flex-row sm:items-center gap-4 py-6 hover:bg-slate-50 dark:hover:bg-slate-900/40 -mx-4 px-4 rounded-xl transition-colors duration-200 ${inView ? 'opacity-100' : 'opacity-0'}`}
              style={{ transitionDelay: `${i * 60}ms` }}
            >
              {/* Número */}
              <span className="font-heading text-xs font-black text-slate-300 dark:text-slate-700 w-8 shrink-0">
                {String(i + 1).padStart(2, '0')}
              </span>

              {/* Tipo */}
              <span className="text-xs font-medium text-slate-400 dark:text-slate-500 w-28 shrink-0">
                {sol.type}
              </span>

              {/* Título */}
              <h3 className="font-heading text-lg sm:text-xl font-black text-slate-900 dark:text-white flex-1 group-hover:text-brand-600 transition-colors">
                {sol.title}
              </h3>

              {/* Descripción — visible en desktop */}
              <p className="hidden md:block text-sm text-slate-500 dark:text-slate-400 flex-1 leading-relaxed">
                {sol.description}
              </p>

              {/* Features */}
              <div className="hidden lg:flex flex-wrap gap-2 w-56 shrink-0">
                {sol.features.map((f, j) => (
                  <span
                    key={j}
                    className="text-[10px] font-medium text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded"
                  >
                    {f}
                  </span>
                ))}
              </div>

              <ArrowUpRight
                size={16}
                className="text-slate-300 dark:text-slate-700 group-hover:text-brand-600 transition-colors shrink-0"
              />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Solutions;
