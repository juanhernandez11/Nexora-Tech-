'use client';

import { useLayoutEffect, useRef, useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { ExternalLink, ArrowRight, ChevronDown, AlertTriangle, CheckCircle2 } from 'lucide-react';
import useInView from '@/hooks/useInView';
import { casesData, type Locale } from '@/i18n/data';
import { Spotlight } from '@/components/ui/Spotlight';
import ProjectPreviewMockup from '@/components/ui/ProjectPreviewMockup';

export default function SuccessCases() {
  const t = useTranslations('cases');
  const locale = useLocale() as Locale;
  const [ref, inView] = useInView(0.06);
  const [expanded, setExpanded] = useState<number | null>(0);
  const casesListRef = useRef<HTMLDivElement>(null);
  const pendingScrollRef = useRef<{ index: number; top: number } | null>(null);
  const items = casesData[locale] ?? casesData.es;

  const ACCENT_COLORS = ['#2997ff', '#a855f7', '#34d399', '#f59e0b', '#ec4899'];

  useLayoutEffect(() => {
    const pendingScroll = pendingScrollRef.current;
    if (!pendingScroll) return;

    pendingScrollRef.current = null;
    const button = casesListRef.current?.querySelector<HTMLButtonElement>(
      `[data-case-index="${pendingScroll.index}"]`,
    );
    if (!button) return;

    const offset = button.getBoundingClientRect().top - pendingScroll.top;
    if (Math.abs(offset) > 1) {
      window.scrollBy({ top: offset, behavior: 'instant' });
    }
  }, [expanded]);

  return (
    <section id="casos-de-exito" className="theme-surface relative overflow-hidden py-28 sm:py-36 bg-[#000]">

      {/* Spotlight */}
      <Spotlight className="top-10 left-0 opacity-30" fill="#2997ff" />

      {/* Grid */}
      <div className="pointer-events-none absolute inset-0 z-0"
        style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)',
          backgroundSize: '48px 48px',
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">

        {/* Header */}
        <div
          ref={ref}
          className={`mb-20 transition-all duration-300 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'}`}
        >
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#2997ff] mb-4">Casos de éxito</p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-[-0.03em] text-white max-w-xl leading-[1.05]">
            Resultados reales,{' '}
            <span className="bg-gradient-to-r from-[#2997ff] to-[#5ac8fa] bg-clip-text text-transparent">
              no promesas.
            </span>
          </h2>
          <p className="text-white/40 text-sm sm:text-base mt-4 max-w-2xl leading-relaxed">
            {t('subtitle')}
          </p>
        </div>

        {/* Cases list */}
        <div ref={casesListRef} className="space-y-3" style={{ overflowAnchor: 'none' }}>
          {items.map((project, index) => {
            const isOpen = expanded === index;
            const accent = ACCENT_COLORS[index % ACCENT_COLORS.length];
            return (
              <div
                key={index}
                className="theme-card rounded-2xl border overflow-hidden transition-all duration-300"
                style={{
                  borderColor: isOpen ? `${accent}40` : 'rgba(255,255,255,0.06)',
                  background: isOpen ? 'rgba(255,255,255,0.03)' : 'rgba(255,255,255,0.02)',
                  boxShadow: isOpen ? `0 0 40px ${accent}08` : 'none',
                }}
              >
                <button
                  data-case-index={index}
                  onClick={(event) => {
                    pendingScrollRef.current = {
                      index,
                      top: event.currentTarget.getBoundingClientRect().top,
                    };
                    setExpanded(isOpen ? null : index);
                  }}
                  className="w-full text-left focus:outline-none"
                  aria-expanded={isOpen}
                  aria-controls={`case-details-${index}`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center gap-4 p-5 sm:p-6 hover:bg-white/[0.02] transition-colors">
                    {/* Accent line */}
                    <div className="w-0.5 h-8 rounded-full shrink-0 hidden sm:block" style={{ background: accent }} />

                    <div className="flex-1 min-w-0">
                      <p className="text-[10px] font-bold uppercase tracking-widest mb-0.5" style={{ color: accent }}>
                        {project.company}
                      </p>
                      <h3 className="text-base sm:text-lg font-black tracking-[-0.02em] text-white truncate">
                        {project.title}
                      </h3>
                    </div>

                    <div className="flex items-center gap-3 shrink-0">
                      <span
                        className="text-xs font-bold px-3 py-1.5 rounded-full"
                        style={{ background: `${accent}18`, color: accent, border: `1px solid ${accent}30` }}
                      >
                        {project.metricsShort}
                      </span>
                      <span className="text-[11px] text-white/30 hidden lg:block border border-white/[0.06] px-2.5 py-1 rounded-full">
                        {project.tag}
                      </span>
                      <div className={`w-7 h-7 rounded-full border border-white/10 flex items-center justify-center transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}>
                        <ChevronDown size={14} className="text-white/40" />
                      </div>
                    </div>
                  </div>
                </button>

                {isOpen && (
                  <div id={`case-details-${index}`} className="px-5 sm:px-6 pb-6 pt-4 border-t border-white/[0.06]">
                    <p className="text-sm text-white/50 leading-relaxed mb-6">
                      {project.description}
                    </p>

                    <div className="grid sm:grid-cols-2 gap-4 mb-6">
                      <div className="p-4 rounded-xl border border-white/[0.06] bg-white/[0.02]">
                        <p className="text-[10px] font-bold uppercase tracking-widest text-white/30 mb-2 flex items-center gap-2">
                          <AlertTriangle size={11} />
                          {t('labelProblem')}
                        </p>
                        <p className="text-xs text-white/50 leading-relaxed">{project.problem}</p>
                      </div>
                      <div className="p-4 rounded-xl border border-white/[0.06] bg-white/[0.02]">
                        <p className="text-[10px] font-bold uppercase tracking-widest mb-2 flex items-center gap-2" style={{ color: accent }}>
                          <CheckCircle2 size={11} />
                          {t('labelSolution')}
                        </p>
                        <p className="text-xs text-white/50 leading-relaxed">{project.solution}</p>
                      </div>
                    </div>

                    <ProjectPreviewMockup
                      title={project.title}
                      company={project.company}
                      url={project.link}
                      tag={project.tag}
                      gradient="from-slate-900 to-slate-800"
                      tech={project.tech}
                    />

                    <div className="flex flex-wrap items-center justify-between gap-4 pt-5 mt-5 border-t border-white/[0.06]">
                      <div className="flex flex-wrap gap-1.5">
                        {project.tech.map(tech => (
                          <span key={tech} className="text-[10px] text-white/30 border border-white/[0.06] px-2.5 py-1 rounded-full">
                            {tech}
                          </span>
                        ))}
                      </div>
                      {project.link && (
                        <a href={project.link} target="_blank" rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 text-xs font-semibold transition-colors"
                          style={{ color: accent }}
                        >
                          {t('viewProject')} <ExternalLink size={12} />
                        </a>
                      )}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* CTA */}
        <div className="mt-16 flex flex-col sm:flex-row items-center justify-between gap-6 pt-10 border-t border-white/[0.06]">
          <p className="text-sm text-white/40">{t('ctaText')}</p>
          <a
            href="#contacto-form"
            className="inline-flex items-center gap-2 rounded-full bg-white text-black px-7 py-3.5 text-sm font-semibold transition-all hover:bg-white/90 hover:scale-[1.02] active:scale-[0.98]"
          >
            {t('ctaButton')} <ArrowRight size={15} />
          </a>
        </div>
      </div>
    </section>
  );
}
