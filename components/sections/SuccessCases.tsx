'use client';

import { useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { TrendingUp, ExternalLink, ChevronDown, ChevronUp, Cpu, Zap, ClipboardCheck, Package } from 'lucide-react';
import useInView from '@/hooks/useInView';
import { casesData, type Locale } from '@/i18n/data';

const ICONS = [Cpu, Zap, ClipboardCheck, Package];

const SuccessCases = () => {
  const t = useTranslations('cases');
  const locale = useLocale() as Locale;
  const [ref, inView] = useInView(0.06);
  const [expanded, setExpanded] = useState<number | null>(null);
  const items = casesData[locale] ?? casesData.es;

  return (
    <section id="casos-de-exito" className="py-20 sm:py-28 lg:py-36 bg-slate-50 dark:bg-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">

        {/* Encabezado */}
        <div
          ref={ref}
          className={`text-center mb-14 sm:mb-20 transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-brand-50 dark:bg-brand-900/30 border border-brand-100 dark:border-brand-800 rounded-full mb-6">
            <TrendingUp size={14} className="text-brand-600 dark:text-brand-400" />
            <span className="text-[11px] font-black text-brand-600 dark:text-brand-400 uppercase tracking-widest">{t('badge')}</span>
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-black tracking-tighter text-slate-900 dark:text-white mb-4">
            {t('title')} <span className="text-brand-600">{t('titleHighlight')}</span>
          </h2>
          <p className="text-slate-600 dark:text-slate-300 font-medium text-base sm:text-lg max-w-2xl mx-auto">{t('subtitle')}</p>
        </div>

        {/* Grid de casos */}
        <div className="grid sm:grid-cols-2 gap-6 sm:gap-8">
          {items.map((project, index) => {
            const Icon = ICONS[index];
            return (
              <div
                key={index}
                className="group bg-slate-50 dark:bg-slate-800/60 rounded-2xl border border-slate-200 dark:border-slate-700 overflow-hidden shadow-md hover:shadow-xl hover:shadow-slate-300/60 dark:hover:shadow-slate-900/50 hover:-translate-y-1 transition-all duration-500 flex flex-col"
              >
                {/* Header con gradiente */}
                <div className={`h-48 sm:h-60 bg-gradient-to-br ${project.gradient} p-6 sm:p-10 flex flex-col justify-between relative overflow-hidden`}>
                  {/* Ícono decorativo — más visible */}
                  <div className="absolute top-0 right-0 p-4 sm:p-6 opacity-30 group-hover:opacity-40 group-hover:scale-110 transition-all duration-700">
                    <Icon size={110} className="text-gray-500" />
                  </div>

                  {/* Tag */}
                  <span className="bg-black/20 backdrop-blur-sm text-white text-[10px] font-black px-3 py-1.5 rounded-full w-fit border border-white/20 uppercase tracking-widest self-start">
                    {project.tag}
                  </span>

                  {/* Título + empresa */}
                  <div>
                    <p className="text-gray-500 text-xs font-bold uppercase tracking-widest mb-1">{project.company}</p>
                    <h3 className="font-heading text-xl sm:text-2xl font-black text-gray leading-tight drop-shadow-sm">
                      {project.title}
                    </h3>
                  </div>
                </div>

                {/* Body */}
                <div className="p-6 sm:p-8 flex-grow flex flex-col">
                  <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed mb-5">{project.description}</p>

                  {/* Toggle Problema / Solución */}
                  <button
                    onClick={() => setExpanded(expanded === index ? null : index)}
                    className="flex items-center gap-2 text-xs font-black text-slate-400 hover:text-brand-600 dark:hover:text-brand-400 uppercase tracking-widest mb-4 transition-colors w-fit"
                    aria-expanded={expanded === index}
                  >
                    {expanded === index ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                    {expanded === index ? t('hideDetail') : t('showDetail')}
                  </button>

                  {expanded === index && (
                    <div className="space-y-4 mb-5 p-4 bg-slate-50 dark:bg-slate-900/50 rounded-xl border border-slate-200 dark:border-slate-700">
                      <div>
                        <p className="text-[10px] font-black text-red-500 uppercase tracking-widest mb-1.5">{t('labelProblem')}</p>
                        <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">{project.problem}</p>
                      </div>
                      <div className="pt-3 border-t border-slate-200 dark:border-slate-700">
                        <p className="text-[10px] font-black text-emerald-600 uppercase tracking-widest mb-1.5">{t('labelSolution')}</p>
                        <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">{project.solution}</p>
                      </div>
                    </div>
                  )}

                  {/* Tech badges */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.tech.map(tech => (
                      <span
                        key={tech}
                        className="text-[10px] font-bold bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-600 px-2.5 py-1 rounded-lg uppercase tracking-wide"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Footer: métrica + link */}
                  <div className="mt-auto pt-5 border-t border-slate-200 dark:border-slate-700 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400">
                      <TrendingUp size={15} className="flex-shrink-0" />
                      <span className="text-xs font-black uppercase tracking-widest">{project.metricsShort}</span>
                    </div>
                    {project.link && (
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 font-black text-brand-600 dark:text-brand-400 hover:text-brand-700 dark:hover:text-brand-300 transition-colors uppercase tracking-widest text-[10px]"
                      >
                        {t('viewProject')} <ExternalLink size={12} />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA inferior */}
        <div className="mt-14 text-center">
          <p className="text-slate-500 dark:text-slate-400 text-sm mb-4">{t('ctaText')}</p>
          <a
            href="#contacto-form"
            className="inline-flex items-center gap-2 bg-brand-600 text-white px-8 py-4 rounded-xl font-bold hover:bg-brand-700 transition-all shadow-brand"
          >
            {t('ctaButton')} <ExternalLink size={16} />
          </a>
        </div>
      </div>
    </section>
  );
};

export default SuccessCases;
