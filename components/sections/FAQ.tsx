'use client';

import { useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { ChevronDown, ArrowRight } from 'lucide-react';
import useInView from '@/hooks/useInView';
import { faqData, type Locale } from '@/i18n/data';

const FAQ = () => {
  const t = useTranslations('faq');
  const locale = useLocale() as Locale;
  const [open, setOpen] = useState(0);
  const [ref, inView] = useInView(0.06);
  const items = faqData[locale] ?? faqData.es;

  return (
    <section className="py-24 sm:py-32 bg-[#fbfbfd] dark:bg-black text-[#1d1d1f] dark:text-[#f5f5f7] border-b border-black/[0.06] dark:border-white/[0.08] relative overflow-hidden transition-colors">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Encabezado estilo Apple */}
        <div
          ref={ref}
          className={`mb-16 transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#1d1d1f] dark:text-white font-heading leading-tight">
            {t('title')}{' '}
            <span className="text-[#0071e3] dark:text-[#2997ff]">
              {t('titleHighlight')}
            </span>
          </h2>
        </div>

        {/* Acordeón */}
        <div className="space-y-4">
          {items.map((faq, index) => {
            const isOpen = open === index;
            return (
              <div
                key={index}
                className={`rounded-3xl border transition-all duration-300 ${
                  isOpen
                    ? 'border-[#0071e3]/40 dark:border-[#2997ff]/40 bg-white dark:bg-[#161617] shadow-md'
                    : 'border-black/[0.06] dark:border-white/[0.08] bg-white dark:bg-[#161617] hover:border-black/[0.12] dark:hover:border-white/[0.16]'
                }`}
              >
                <button
                  onClick={() => setOpen(isOpen ? -1 : index)}
                  aria-expanded={isOpen}
                  className="w-full flex items-start justify-between gap-4 p-6 sm:p-7 text-left group"
                >
                  <span className="text-base sm:text-lg font-bold text-[#1d1d1f] dark:text-white font-heading group-hover:text-[#0071e3] dark:group-hover:text-[#2997ff] transition-colors">
                    {faq.q}
                  </span>
                  <div className={`p-2 rounded-full bg-black/[0.04] dark:bg-white/[0.06] text-[#1d1d1f] dark:text-white shrink-0 transition-transform duration-200 ${isOpen ? 'rotate-180 text-[#0071e3] dark:text-[#2997ff]' : ''}`}>
                    <ChevronDown size={16} />
                  </div>
                </button>
                {isOpen && (
                  <div className="px-6 sm:px-7 pb-6 sm:pb-7">
                    <p className="text-sm text-[#86868b] dark:text-slate-300 leading-relaxed pt-3 border-t border-black/[0.05] dark:border-white/[0.08] font-normal">
                      {faq.a}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* CTA simple estilo Apple */}
        <div className="mt-14 pt-8 border-t border-black/[0.06] dark:border-white/[0.08] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <p className="text-base font-bold text-[#1d1d1f] dark:text-white font-heading">{t('ctaTitle')}</p>
            <p className="text-xs text-[#86868b] dark:text-slate-400 mt-0.5">{t('ctaSubtitle')}</p>
          </div>
          <a
            href="#contacto-form"
            className="shrink-0 inline-flex items-center gap-2 text-xs font-medium bg-[#0071e3] hover:bg-[#0077ed] text-white px-6 py-3 rounded-full transition-all shadow-sm shadow-[#0071e3]/20"
          >
            <span>{t('ctaButton')}</span>
            <ArrowRight size={14} />
          </a>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
