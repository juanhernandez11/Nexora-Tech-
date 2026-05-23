'use client';

import { useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { ChevronDown, HelpCircle } from 'lucide-react';
import useInView from '@/hooks/useInView';
import { faqData, type Locale } from '@/i18n/data';

const FAQ = () => {
  const t = useTranslations('faq');
  const locale = useLocale() as Locale;
  const [openIndex, setOpenIndex] = useState(0);
  const [ref, inView] = useInView(0.06);
  const items = faqData[locale] ?? faqData.es;

  return (
    <section className="py-20 sm:py-28 lg:py-36 bg-white dark:bg-slate-950">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <div ref={ref} className={`text-center mb-12 sm:mb-16 transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-brand-50 dark:bg-brand-900/30 border border-brand-100 dark:border-brand-800 rounded-full mb-6">
            <HelpCircle size={14} className="text-brand-600 dark:text-brand-400" />
            <span className="text-[11px] font-black text-brand-600 dark:text-brand-400 uppercase tracking-widest">{t('badge')}</span>
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-black tracking-tighter text-slate-900 dark:text-white mb-4">
            {t('title')} <span className="text-brand-600">{t('titleHighlight')}</span>
          </h2>
          <p className="text-slate-600 dark:text-slate-300 font-medium text-base sm:text-lg">{t('subtitle')}</p>
        </div>
        <div className="space-y-3">
          {items.map((faq, index) => (
            <div key={index} className="bg-slate-50 dark:bg-slate-800/60 rounded-2xl border-2 border-slate-100 dark:border-slate-700 overflow-hidden transition-all hover:border-brand-200 dark:hover:border-brand-700">
              <button onClick={() => setOpenIndex(openIndex === index ? -1 : index)} aria-expanded={openIndex === index} aria-controls={`faq-${index}`} className="w-full px-6 py-5 flex items-start sm:items-center justify-between gap-4 text-left group">
                <span className="font-heading font-black text-base sm:text-lg text-slate-900 dark:text-white group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors flex-1">{faq.q}</span>
                <ChevronDown size={20} className={`text-slate-400 flex-shrink-0 transition-transform duration-300 ${openIndex === index ? 'rotate-180 text-brand-600' : ''}`} />
              </button>
              <div id={`faq-${index}`} role="region" className={`overflow-hidden transition-all duration-300 ${openIndex === index ? 'max-h-96' : 'max-h-0'}`}>
                <div className="px-6 pb-6 text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed border-t border-slate-100 dark:border-slate-700 pt-5">{faq.a}</div>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-12 sm:mt-16">
          <div className="bg-gradient-to-br from-brand-600 to-violet-600 rounded-2xl p-8 sm:p-10 text-white text-center">
            <h3 className="font-heading text-2xl sm:text-3xl font-black mb-3">{t('ctaTitle')}</h3>
            <p className="text-brand-100 text-base mb-7">{t('ctaSubtitle')}</p>
            <a href="#contacto-form" className="inline-block bg-white text-brand-600 px-8 py-3.5 rounded-xl font-black uppercase tracking-widest text-sm hover:bg-brand-50 transition-all shadow-xl">{t('ctaButton')}</a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
