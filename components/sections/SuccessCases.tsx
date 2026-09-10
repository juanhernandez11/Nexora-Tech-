'use client';

import { useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { ChevronDown, AlertTriangle, CheckCircle2, ExternalLink, ArrowRight } from 'lucide-react';
import useInView from '@/hooks/useInView';
import { casesData, type Locale } from '@/i18n/data';
import { Button } from '@/components/ui/button';
import ProjectPreviewMockup from '@/components/ui/ProjectPreviewMockup';
import GsapMagnetic from '@/components/ui/GsapMagnetic';

const SuccessCases = () => {
  const t = useTranslations('cases');
  const locale = useLocale() as Locale;
  const [ref, inView] = useInView(0.06);
  const [expanded, setExpanded] = useState<number | null>(0);
  const items = casesData[locale] ?? casesData.es;

  return (
    <section id="casos-de-exito" className="py-24 sm:py-32 bg-[#fbfbfd] dark:bg-black text-[#1d1d1f] dark:text-[#f5f5f7] border-b border-black/[0.06] dark:border-white/[0.08] relative overflow-hidden transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Encabezado estilo Apple */}
        <div
          ref={ref}
          className={`mb-16 transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#1d1d1f] dark:text-white max-w-xl font-heading leading-tight">
            Resultados reales,{' '}
            <span className="text-[#0071e3] dark:text-[#2997ff]">
              no promesas.
            </span>
          </h2>
          <p className="text-sm sm:text-base text-[#86868b] dark:text-slate-400 mt-3 max-w-2xl leading-relaxed">
            {t('subtitle')}
          </p>
        </div>

        {/* Lista de proyectos en tarjetas limpias estilo Apple */}
        <div className="space-y-4">
          {items.map((project, index) => {
            const isExpanded = expanded === index;
            return (
              <div
                key={index}
                className={`bg-white dark:bg-[#161617] border rounded-3xl overflow-hidden transition-all duration-300 shadow-sm ${
                  isExpanded
                    ? 'border-[#0071e3]/40 dark:border-[#2997ff]/40 shadow-md'
                    : 'border-black/[0.06] dark:border-white/[0.08] hover:border-black/[0.12] dark:hover:border-white/[0.16]'
                }`}
              >
                <button
                  onClick={() => setExpanded(isExpanded ? null : index)}
                  className="w-full text-left focus:outline-none"
                  aria-expanded={isExpanded}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center gap-4 p-6 sm:p-7 hover:bg-black/[0.01] dark:hover:bg-white/[0.02] transition-colors">
                    <span className="text-xs font-semibold px-3 py-1 rounded-full bg-black/[0.04] dark:bg-white/[0.08] text-[#1d1d1f] dark:text-white w-fit shrink-0 border border-black/[0.05] dark:border-white/[0.08]">
                      {project.tag}
                    </span>

                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-[#86868b] dark:text-slate-400 mb-0.5 uppercase tracking-wider">{project.company}</p>
                      <h3 className="text-base sm:text-lg font-bold text-[#1d1d1f] dark:text-white truncate font-heading">
                        {project.title}
                      </h3>
                    </div>

                    <span className="text-xs font-bold text-[#0071e3] dark:text-[#2997ff] shrink-0 px-3 py-1 rounded-full bg-[#0071e3]/10 dark:bg-[#0071e3]/20">
                      {project.metricsShort}
                    </span>

                    <div className="hidden lg:flex gap-1.5 shrink-0 flex-wrap">
                      {project.tech.slice(0, 3).map(tech => (
                        <span
                          key={tech}
                          className="text-[11px] bg-black/[0.03] dark:bg-white/[0.05] text-[#1d1d1f]/70 dark:text-slate-300 px-2.5 py-1 rounded-full border border-black/[0.04] dark:border-white/[0.06]"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    <div className={`p-2 rounded-full bg-black/[0.04] dark:bg-white/[0.06] text-[#1d1d1f] dark:text-white shrink-0 transition-transform duration-200 ${isExpanded ? 'rotate-180 text-[#0071e3] dark:text-[#2997ff]' : ''}`}>
                      <ChevronDown size={16} />
                    </div>
                  </div>
                </button>

                {isExpanded && (
                  <div className="px-6 sm:px-8 pb-8 pt-3 border-t border-black/[0.06] dark:border-white/[0.08] bg-[#f5f5f7] dark:bg-[#121214]">
                    <p className="text-sm text-[#1d1d1f]/80 dark:text-slate-300 leading-relaxed mb-6 pt-2">
                      {project.description}
                    </p>

                    <div className="grid sm:grid-cols-2 gap-4 mb-6">
                      <div className="p-5 rounded-2xl bg-white dark:bg-[#1a1a1c] border border-black/[0.06] dark:border-white/[0.08] shadow-xs">
                        <p className="text-xs font-bold text-[#1d1d1f] dark:text-slate-200 uppercase tracking-wider mb-2.5 flex items-center gap-2">
                          <AlertTriangle size={14} className="text-[#86868b] dark:text-slate-400" />
                          {t('labelProblem')}
                        </p>
                        <p className="text-xs text-[#1d1d1f]/80 dark:text-slate-300 leading-relaxed font-normal">
                          {project.problem}
                        </p>
                      </div>

                      <div className="p-5 rounded-2xl bg-white dark:bg-[#1a1a1c] border border-black/[0.06] dark:border-white/[0.08] shadow-xs">
                        <p className="text-xs font-bold text-[#0071e3] dark:text-[#2997ff] uppercase tracking-wider mb-2.5 flex items-center gap-2">
                          <CheckCircle2 size={14} />
                          {t('labelSolution')}
                        </p>
                        <p className="text-xs text-[#1d1d1f]/80 dark:text-slate-300 leading-relaxed font-normal">
                          {project.solution}
                        </p>
                      </div>
                    </div>

                    {/* Componente interactivo de arquitectura / vista de producción */}
                    <ProjectPreviewMockup
                      title={project.title}
                      company={project.company}
                      url={project.link}
                      tag={project.tag}
                      gradient="from-slate-200 to-slate-100 dark:from-slate-800 dark:to-slate-950"
                      tech={project.tech}
                    />

                    <div className="flex flex-wrap items-center justify-between gap-4 pt-6 mt-6 border-t border-black/[0.06] dark:border-white/[0.08]">
                      <div className="flex flex-wrap gap-1.5">
                        {project.tech.map(tech => (
                          <span
                            key={tech}
                            className="text-[11px] bg-white dark:bg-white/[0.05] text-[#1d1d1f]/75 dark:text-slate-300 px-2.5 py-1 rounded-full border border-black/[0.06] dark:border-white/[0.08]"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>

                      {project.link && (
                        <a
                          href={project.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 text-xs font-medium text-[#0071e3] dark:text-[#2997ff] hover:underline"
                        >
                          <span>{t('viewProject')}</span>
                          <ExternalLink size={13} />
                        </a>
                      )}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* CTA estilo Apple */}
        <div className="mt-14 flex flex-col sm:flex-row items-center justify-between gap-6 pt-10 border-t border-black/[0.06] dark:border-white/[0.08]">
          <p className="text-sm text-[#86868b] dark:text-slate-300 font-medium">{t('ctaText')}</p>
          <GsapMagnetic strength={0.2}>
            <a href="#contacto-form" className="inline-block">
              <Button size="lg" className="gap-2 font-medium bg-[#0071e3] hover:bg-[#0077ed] text-white transition-all rounded-full h-12 px-7 shadow-sm shadow-[#0071e3]/20">
                <span>{t('ctaButton')}</span>
                <ArrowRight size={15} />
              </Button>
            </a>
          </GsapMagnetic>
        </div>
      </div>
    </section>
  );
};

export default SuccessCases;
