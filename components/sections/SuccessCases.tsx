'use client';

import { useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { ArrowUpRight, ChevronDown } from 'lucide-react';
import useInView from '@/hooks/useInView';
import { casesData, type Locale } from '@/i18n/data';

const SuccessCases = () => {
  const t      = useTranslations('cases');
  const locale = useLocale() as Locale;
  const [ref, inView] = useInView(0.06);
  const [expanded, setExpanded] = useState<number | null>(null);
  const items  = casesData[locale] ?? casesData.es;

  return (
    <section id="casos-de-exito" className="py-20 sm:py-28 bg-slate-50 dark:bg-slate-900/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">

        {/* Encabezado */}
        <div
          ref={ref}
          className={`mb-14 transition-all duration-600 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
        >
          <p className="text-xs font-medium text-slate-400 dark:text-slate-500 mb-3 uppercase tracking-widest">
            {t('badge')}
          </p>
          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 dark:text-white max-w-xl">
            {t('title')} <span className="text-brand-600">{t('titleHighlight')}</span>
          </h2>
        </div>

        {/* Casos */}
        <div className="space-y-3">
          {items.map((project, index) => (
            <div
              key={index}
              className={`bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-xl overflow-hidden transition-all duration-500 ${inView ? 'opacity-100' : 'opacity-0'}`}
              style={{ transitionDelay: `${index * 80}ms` }}
            >
              {/* Fila principal */}
              <button
                onClick={() => setExpanded(expanded === index ? null : index)}
                className="w-full text-left"
                aria-expanded={expanded === index}
              >
                <div className="flex flex-col sm:flex-row sm:items-center gap-3 p-5 sm:p-6 hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors">

                  {/* Tag */}
                  <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest w-32 shrink-0">
                    {project.tag}
                  </span>

                  {/* Empresa + título */}
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-slate-400 dark:text-slate-500 mb-0.5">{project.company}</p>
                    <h3 className="font-heading text-base sm:text-lg font-black text-slate-900 dark:text-white truncate">
                      {project.title}
                    </h3>
                  </div>

                  {/* Métrica */}
                  <span className="text-sm font-bold text-emerald-600 dark:text-emerald-400 shrink-0">
                    {project.metricsShort}
                  </span>

                  {/* Tech pills — desktop */}
                  <div className="hidden lg:flex gap-1.5 w-48 shrink-0 flex-wrap">
                    {project.tech.slice(0, 3).map(tech => (
                      <span
                        key={tech}
                        className="text-[10px] font-medium bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 px-2 py-0.5 rounded"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <ChevronDown
                    size={16}
                    className={`text-slate-300 dark:text-slate-600 shrink-0 transition-transform duration-200 ${expanded === index ? 'rotate-180' : ''}`}
                  />
                </div>
              </button>

              {/* Detalle expandible */}
              <div className={`overflow-hidden transition-all duration-300 ${expanded === index ? 'max-h-96' : 'max-h-0'}`}>
                <div className="px-5 sm:px-6 pb-6 pt-2 border-t border-slate-100 dark:border-slate-800">
                  <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
                    {project.description}
                  </p>
                  <div className="grid sm:grid-cols-2 gap-4 mb-4">
                    <div>
                      <p className="text-[10px] font-bold text-red-500 uppercase tracking-widest mb-1">
                        {t('labelProblem')}
                      </p>
                      <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                        {project.problem}
                      </p>
                    </div>
                    <div>
                      <p className="text-[10px] font-bold text-emerald-600 uppercase tracking-widest mb-1">
                        {t('labelSolution')}
                      </p>
                      <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                        {project.solution}
                      </p>
                    </div>
                  </div>
                  {project.link && (
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-brand-600 hover:text-brand-700 transition-colors"
                    >
                      {t('viewProject')} <ArrowUpRight size={13} />
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 border-t border-slate-200 dark:border-slate-800">
          <p className="text-sm text-slate-500 dark:text-slate-400">{t('ctaText')}</p>
          <a
            href="#contacto-form"
            className="inline-flex items-center gap-2 text-sm font-semibold bg-slate-900 dark:bg-white text-white dark:text-slate-900 px-5 py-2.5 rounded-lg hover:bg-slate-700 dark:hover:bg-slate-100 transition-colors"
          >
            {t('ctaButton')} <ArrowUpRight size={14} />
          </a>
        </div>
      </div>
    </section>
  );
};

export default SuccessCases;
