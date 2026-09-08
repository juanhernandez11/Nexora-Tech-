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
    <section id="soluciones" className="py-24 sm:py-32 bg-[#151a12] text-[#f4f1e9] dark:bg-[#0b0e0a]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">

        {/* Encabezado */}
        <div
          ref={ref}
          className={`mb-14 transition-all duration-600 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
        >
          <p className="text-xs font-bold text-brand-500 mb-3 uppercase tracking-[0.16em]">
            {t('badge')}
          </p>
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
            <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold text-white max-w-xl">
              {t('title')}
            </h2>
            <Link
              href={locale === 'en' ? '/en/servicios' : '/servicios'}
              className="inline-flex items-center gap-1.5 text-sm font-bold text-[#aeb9a6] hover:text-brand-500 transition-colors shrink-0"
            >
              {locale === 'en' ? 'All services' : 'Todos los servicios'}
              <ArrowUpRight size={14} />
            </Link>
          </div>
        </div>

        {/* Lista de soluciones */}
        <div className="divide-y divide-white/10 border-t border-white/10">
          {items.map((sol, i) => (
            <a
              key={i}
              href="#contacto-form"
              className={`group flex flex-col sm:flex-row sm:items-center gap-4 py-7 hover:bg-white/[0.04] -mx-4 px-4 transition-colors duration-200 ${inView ? 'opacity-100' : 'opacity-0'}`}
              style={{ transitionDelay: `${i * 60}ms` }}
            >
              {/* Número */}
              <span className="font-heading text-xs font-bold text-brand-500 w-8 shrink-0">
                {String(i + 1).padStart(2, '0')}
              </span>

              {/* Tipo */}
              <span className="text-[10px] font-bold uppercase tracking-[0.12em] text-[#8e9a87] w-28 shrink-0">
                {sol.type}
              </span>

              {/* Título */}
              <h3 className="font-heading text-lg sm:text-xl font-bold text-white flex-1 group-hover:text-brand-500 transition-colors">
                {sol.title}
              </h3>

              {/* Descripción — visible en desktop */}
              <p className="hidden md:block text-sm text-[#aeb9a6] flex-1 leading-relaxed">
                {sol.description}
              </p>

              {/* Features */}
              <div className="hidden lg:flex flex-wrap gap-2 w-56 shrink-0">
                {sol.features.map((f, j) => (
                  <span
                    key={j}
                    className="text-[10px] font-medium text-[#b8c4ae] border border-white/10 px-2 py-0.5"
                  >
                    {f}
                  </span>
                ))}
              </div>

              <ArrowUpRight
                size={16}
                className="text-[#6f7c68] group-hover:text-brand-500 transition-colors shrink-0"
              />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Solutions;
