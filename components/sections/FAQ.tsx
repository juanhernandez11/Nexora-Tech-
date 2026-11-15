'use client';

import { useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { Plus } from 'lucide-react';
import useInView from '@/hooks/useInView';
import { faqData, type Locale } from '@/i18n/data';
import { MagicCard } from '@/components/ui/MagicCard';

export default function FAQ() {
  const t = useTranslations('faq');
  const locale = useLocale() as Locale;
  const [open, setOpen] = useState(0);
  const [ref, inView] = useInView(0.06);
  const items = faqData[locale] ?? faqData.es;

  return (
    <section className="theme-surface relative overflow-hidden py-28 sm:py-36 bg-[#000]">

      {/* Grid */}
      <div className="pointer-events-none absolute inset-0 z-0"
        style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)',
          backgroundSize: '48px 48px',
        }}
      />

      {/* Glow */}
      <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] rounded-full bg-[#a855f7]/6 blur-[120px]" />

      <div className="max-w-3xl mx-auto px-4 sm:px-6 relative z-10">

        {/* Header */}
        <div
          ref={ref}
          className={`mb-16 text-center transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
        >
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#2997ff] mb-4">FAQ</p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-[-0.03em] text-white leading-[1.05]">
            {t('title')}{' '}
            <span className="bg-gradient-to-r from-[#a855f7] to-[#ec4899] bg-clip-text text-transparent">
              {t('titleHighlight')}
            </span>
          </h2>
        </div>

        {/* Accordion */}
        <div className="space-y-3">
          {items.map((faq, index) => {
            const isOpen = open === index;
            return (
              <MagicCard
                key={index}
                gradientColor={isOpen ? 'rgba(169,85,247,0.1)' : 'rgba(169,85,247,0.06)'}
                gradientSize={300}
                gradientOpacity={1}
                className={`bg-white/[0.02] border-white/[0.06] p-0 rounded-xl transition-all duration-300 ${isOpen ? 'border-[#a855f7]/30' : 'hover:border-white/10'}`}
              >
                <button
                  onClick={() => setOpen(isOpen ? -1 : index)}
                  aria-expanded={isOpen}
                  className="w-full flex items-start justify-between gap-4 p-6 text-left"
                >
                  <span className="text-sm sm:text-base font-bold text-white/80 group-hover:text-white transition-colors leading-snug">
                    {faq.q}
                  </span>
                  <div
                    className={`w-7 h-7 rounded-full border flex items-center justify-center shrink-0 transition-all duration-200 ${
                      isOpen
                        ? 'border-[#a855f7]/50 bg-[#a855f7]/10 rotate-45'
                        : 'border-white/10 bg-white/[0.04]'
                    }`}
                  >
                    <Plus size={13} className={isOpen ? 'text-[#a855f7]' : 'text-white/40'} />
                  </div>
                </button>
                {isOpen && (
                  <div className="px-6 pb-6">
                    <div className="h-px bg-white/[0.06] mb-4" />
                    <p className="text-sm text-white/40 leading-relaxed">
                      {faq.a}
                    </p>
                  </div>
                )}
              </MagicCard>
            );
          })}
        </div>

        {/* CTA */}
        <div className="mt-14 pt-10 border-t border-white/[0.06] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5">
          <div>
            <p className="text-base font-bold text-white">{t('ctaTitle')}</p>
            <p className="text-xs text-white/40 mt-0.5">{t('ctaSubtitle')}</p>
          </div>
          <a
            href="#contacto-form"
            className="shrink-0 inline-flex items-center gap-2 text-sm font-semibold bg-white text-black px-6 py-3 rounded-full transition-all hover:bg-white/90 hover:scale-[1.02]"
          >
            {t('ctaButton')}
          </a>
        </div>
      </div>
    </section>
  );
}
