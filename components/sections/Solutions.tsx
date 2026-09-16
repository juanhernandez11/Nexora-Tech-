'use client';

import { useTranslations, useLocale } from 'next-intl';
import Link from 'next/link';
import { ArrowUpRight, Check, Zap, Server, ShieldCheck, Plus } from 'lucide-react';
import useInView from '@/hooks/useInView';
import { solutionsData, type Locale } from '@/i18n/data';

const Solutions = () => {
  const t = useTranslations('solutions');
  const locale = useLocale() as Locale;
  const [ref, inView] = useInView(0.06);
  const items = solutionsData[locale] ?? solutionsData.es;

  const icons = [Zap, Server, ShieldCheck];

  return (
    <section id="soluciones" className="relative overflow-hidden py-24 sm:py-32 bg-white dark:bg-black text-[#1d1d1f] dark:text-[#f5f5f7] border-b border-black/[0.06] dark:border-white/[0.08] transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Encabezado estilo Apple */}
        <div
          ref={ref}
          className={`mb-16 transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
        >
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#1d1d1f] dark:text-white max-w-xl font-heading leading-tight">
                ¿Qué problema necesitas{' '}
                <span className="text-[#0071e3] dark:text-[#2997ff]">
                  resolver?
                </span>
              </h2>
              <p className="text-[#86868b] dark:text-slate-400 text-sm sm:text-base mt-3 max-w-xl leading-relaxed">
                {t('subtitle')}
              </p>
            </div>
            <Link
              href={locale === 'en' ? '/en/servicios' : '/servicios'}
              className="inline-flex items-center gap-1.5 text-sm font-medium text-[#0071e3] dark:text-[#2997ff] hover:underline group w-fit"
            >
              <span>{locale === 'en' ? 'Technical specifications' : 'Arquitectura e integraciones'}</span>
              <ArrowUpRight size={15} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </Link>
          </div>
        </div>

        {/* Tarjetas limpias estilo Apple (sin bordes de neón ni gradientes cyberpunk) */}
        <div className="grid md:grid-cols-3 gap-6 sm:gap-8">
          {items.map((sol, i) => {
            const Icon = icons[i % icons.length];
            return (
              <div
                key={i}
                className="rounded-3xl border border-black/[0.05] dark:border-white/[0.08] bg-[#f5f5f7] dark:bg-[#161617] p-8 flex flex-col justify-between hover:scale-[1.01] hover:shadow-[0_12px_40px_rgba(0,0,0,0.06)] dark:hover:shadow-[0_12px_40px_rgba(0,0,0,0.5)] transition-all duration-300 group"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-8">
                    <div className="w-12 h-12 rounded-2xl bg-white dark:bg-white/[0.08] border border-black/[0.04] dark:border-white/[0.08] flex items-center justify-center text-[#0071e3] dark:text-[#2997ff] shadow-sm group-hover:scale-105 transition-transform">
                      <Icon size={22} />
                    </div>
                    <span className="text-[11px] font-medium uppercase tracking-wider px-3 py-1 rounded-full bg-black/[0.04] dark:bg-white/[0.08] text-[#1d1d1f]/75 dark:text-slate-300">
                      {sol.type}
                    </span>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-bold text-[#1d1d1f] dark:text-white mb-3 font-heading leading-snug">
                    {sol.title}
                  </h3>

                  <p className="text-sm text-[#86868b] dark:text-slate-400 leading-relaxed mb-6 font-normal">
                    {sol.description}
                  </p>
                </div>

                <div>
                  <div className="pt-6 border-t border-black/[0.06] dark:border-white/[0.08] mb-6 space-y-2.5">
                    {sol.features.map((f, j) => (
                      <div key={j} className="flex items-center gap-2.5 text-xs text-[#1d1d1f]/85 dark:text-slate-300">
                        <div className="w-4 h-4 rounded-full bg-[#0071e3]/10 dark:bg-[#0071e3]/20 flex items-center justify-center shrink-0">
                          <Check size={11} className="text-[#0071e3] dark:text-[#2997ff]" />
                        </div>
                        <span>{f}</span>
                      </div>
                    ))}
                  </div>

                  <div className="flex items-center justify-between pt-2">
                    <a
                      href="#contacto-form"
                      className="inline-flex items-center gap-2 text-xs font-medium py-2.5 px-5 rounded-full bg-[#0071e3] hover:bg-[#0077ed] text-white transition-all shadow-sm shadow-[#0071e3]/20"
                    >
                      <span>{t('cta')}</span>
                      <ArrowUpRight size={14} />
                    </a>

                    <a
                      href="#contacto-form"
                      aria-label="Más detalles"
                      className="w-9 h-9 rounded-full bg-black/[0.05] dark:bg-white/[0.08] hover:bg-black/[0.1] dark:hover:bg-white/[0.15] text-[#1d1d1f] dark:text-white flex items-center justify-center transition-colors"
                    >
                      <Plus size={16} />
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Solutions;
