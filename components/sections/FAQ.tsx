'use client';

import { useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { ChevronDown } from 'lucide-react';
import useInView from '@/hooks/useInView';
import { faqData, type Locale } from '@/i18n/data';

const FAQ = () => {
  const t          = useTranslations('faq');
  const locale     = useLocale() as Locale;
  const [open, setOpen] = useState(0);
  const [ref, inView]   = useInView(0.06);
  const items      = faqData[locale] ?? faqData.es;

  return (
    <section className="py-20 sm:py-28 bg-slate-50 dark:bg-slate-900/30">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">

        {/* Encabezado */}
        <div
          ref={ref}
          className={`mb-10 transition-all duration-600 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
        >
          <p className="text-xs font-medium text-slate-400 dark:text-slate-500 mb-3 uppercase tracking-widest">
            {t('badge')}
          </p>
          <h2 className="font-heading text-3xl sm:text-4xl font-black text-slate-900 dark:text-white">
            {t('title')} <span className="text-brand-600">{t('titleHighlight')}</span>
          </h2>
        </div>

        {/* Acordeón */}
        <div className="divide-y divide-slate-200 dark:divide-slate-800">
          {items.map((faq, index) => (
            <div key={index}>
              <button
                onClick={() => setOpen(open === index ? -1 : index)}
                aria-expanded={open === index}
                className="w-full flex items-start justify-between gap-4 py-5 text-left group"
              >
                <span className={`text-sm sm:text-base font-semibold transition-colors ${open === index ? 'text-brand-600' : 'text-slate-900 dark:text-white group-hover:text-brand-600'}`}>
                  {faq.q}
                </span>
                <ChevronDown
                  size={16}
                  className={`text-slate-400 shrink-0 mt-0.5 transition-transform duration-200 ${open === index ? 'rotate-180 text-brand-600' : ''}`}
                />
              </button>
              <div className={`overflow-hidden transition-all duration-300 ${open === index ? 'max-h-96 pb-5' : 'max-h-0'}`}>
                <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                  {faq.a}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA simple */}
        <div className="mt-12 pt-8 border-t border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <p className="text-sm font-semibold text-slate-900 dark:text-white">{t('ctaTitle')}</p>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{t('ctaSubtitle')}</p>
          </div>
          <a
            href="#contacto-form"
            className="shrink-0 inline-flex items-center gap-2 text-sm font-semibold bg-slate-900 dark:bg-white text-white dark:text-slate-900 px-5 py-2.5 rounded-lg hover:bg-slate-700 dark:hover:bg-slate-100 transition-colors"
          >
            {t('ctaButton')}
          </a>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
