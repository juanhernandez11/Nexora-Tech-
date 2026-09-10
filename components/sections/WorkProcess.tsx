'use client';

import { useTranslations, useLocale } from 'next-intl';
import { Clock, ShieldCheck, FileCheck, GitCommit } from 'lucide-react';
import useInView from '@/hooks/useInView';
import { processData, type Locale } from '@/i18n/data';
import TechCarousel from '@/components/ui/TechCarousel';

const WorkProcess = () => {
  const t = useTranslations('process');
  const locale = useLocale() as Locale;
  const [ref, inView] = useInView(0.06);
  const [techRef, techInView] = useInView(0.06);
  const { steps, guarantees } = processData[locale] ?? processData.es;

  const guaranteeIcons = [Clock, ShieldCheck, FileCheck];

  return (
    <section id="proceso" className="py-24 sm:py-32 bg-white dark:bg-black text-[#1d1d1f] dark:text-[#f5f5f7] border-b border-black/[0.06] dark:border-white/[0.08] relative overflow-hidden transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Encabezado estilo Apple */}
        <div
          ref={ref}
          className={`mb-16 transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#1d1d1f] dark:text-white max-w-xl font-heading leading-tight">
            {t('title')}{' '}
            <span className="text-[#0071e3] dark:text-[#2997ff]">
              {t('titleHighlight')}
            </span>
          </h2>
          <p className="text-[#86868b] dark:text-slate-400 text-sm sm:text-base mt-3 max-w-lg leading-relaxed">
            {t('subtitle')}
          </p>
        </div>

        {/* Pasos en tarjetas limpias estilo Apple */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-16">
          {steps.map((step, i) => (
            <div
              key={i}
              className="p-7 rounded-3xl border border-black/[0.05] dark:border-white/[0.08] bg-[#f5f5f7] dark:bg-[#161617] flex flex-col justify-between hover:shadow-[0_8px_30px_rgba(0,0,0,0.06)] dark:hover:shadow-[0_8px_30px_rgba(0,0,0,0.5)] transition-all group"
            >
              <div>
                <div className="flex items-center justify-between mb-5">
                  <span className="text-xs font-semibold text-[#0071e3] dark:text-[#2997ff] px-2.5 py-1 rounded-full bg-[#0071e3]/10 dark:bg-[#0071e3]/20">
                    ETAPA {step.number}
                  </span>
                  <span className="text-[11px] font-medium text-[#86868b] dark:text-slate-400">
                    {step.duration}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-[#1d1d1f] dark:text-white mb-2.5 font-heading">
                  {step.title}
                </h3>
                <p className="text-xs sm:text-sm text-[#86868b] dark:text-slate-400 leading-relaxed font-normal">
                  {step.description}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-black/[0.06] dark:border-white/[0.08] text-[11px] text-[#86868b] dark:text-slate-400 flex items-center justify-between">
                <span className="flex items-center gap-1.5">
                  <GitCommit size={13} className="text-[#0071e3] dark:text-[#2997ff]" />
                  <span>Entregable auditable</span>
                </span>
                <span className="text-[10px] font-medium">0{i + 1}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Garantías contractuales estilo Apple */}
        <div className="grid sm:grid-cols-3 gap-5 mb-20 p-8 rounded-3xl bg-[#f5f5f7] dark:bg-[#161617] border border-black/[0.05] dark:border-white/[0.08] shadow-xs">
          {guarantees.map((g, i) => {
            const Icon = guaranteeIcons[i % guaranteeIcons.length];
            return (
              <div
                key={i}
                className="flex items-start gap-4 p-2"
              >
                <div className="p-3 rounded-2xl bg-[#0071e3]/10 dark:bg-[#0071e3]/20 text-[#0071e3] dark:text-[#2997ff] shrink-0">
                  <Icon size={20} />
                </div>
                <div>
                  <p className="text-sm font-bold text-[#1d1d1f] dark:text-white mb-1 font-heading">{g.title}</p>
                  <p className="text-xs text-[#86868b] dark:text-slate-400 leading-relaxed">{g.desc}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Stack Tecnológico */}
        <div
          ref={techRef}
          className={`transition-all duration-700 pt-8 border-t border-black/[0.06] dark:border-white/[0.08] ${techInView ? 'opacity-100' : 'opacity-0'}`}
        >
          <div className="text-center mb-8">
            <h3 className="text-xl sm:text-2xl font-bold text-[#1d1d1f] dark:text-white font-heading">
              {t('techTitle')}
            </h3>
            <p className="text-xs sm:text-sm text-[#86868b] dark:text-slate-400 mt-1 max-w-md mx-auto">
              {t('techSubtitle')}
            </p>
          </div>
          <TechCarousel />
        </div>
      </div>
    </section>
  );
};

export default WorkProcess;
