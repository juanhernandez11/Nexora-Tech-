'use client';

import { useLocale, useTranslations } from 'next-intl';
import { ArrowRight, Check, ChevronRight, CheckCircle2 } from 'lucide-react';
import useInView from '@/hooks/useInView';
import { casesData, type Locale } from '@/i18n/data';
import GsapMagnetic from '@/components/ui/GsapMagnetic';
import { Button } from '@/components/ui/button';

const Hero = () => {
  const t = useTranslations('hero');
  const locale = useLocale() as Locale;
  const [ref, inView] = useInView(0.05);
  const projects = (casesData[locale] ?? casesData.es).slice(0, 3);

  const trustItems = [
    t('trust1'),
    t('trust2'),
    t('trust3'),
  ];

  return (
    <section
      ref={ref}
      className="relative overflow-hidden pt-28 pb-20 sm:pt-36 sm:pb-28 border-b border-black/[0.06] dark:border-white/[0.08] bg-gradient-to-b from-white via-[#fbfbfd] to-[#f5f5f7] dark:from-black dark:via-[#0a0a0c] dark:to-[#111113] transition-colors duration-300"
    >
      {/* Subtle Apple-style atmospheric light */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[450px] bg-[#0071e3]/[0.04] dark:bg-[#0071e3]/[0.08] rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 w-full relative z-10">
        <div className="grid lg:grid-cols-[minmax(0,1.2fr)_minmax(360px,0.8fr)] gap-12 lg:gap-16 items-center">
          <div>
            <h1
              className={`text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#1d1d1f] dark:text-white leading-[1.08] mb-6 transition-all duration-700 font-heading ${
                inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'
              }`}
            >
              Software pensado para la forma en que{' '}
              <span className="text-[#0071e3] dark:text-[#2997ff]">
                trabajas.
              </span>
            </h1>

            <p className="text-base sm:text-lg text-[#86868b] dark:text-slate-300 leading-relaxed max-w-2xl mb-8 font-normal">
              {t('subtitle')}
            </p>

            {/* Apple-style CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center mb-10">
              <GsapMagnetic strength={0.25}>
                <a href="#contacto-form" id="hero-primary-cta" className="inline-block">
                  <Button
                    size="lg"
                    className="w-full sm:w-auto font-medium gap-2 bg-[#0071e3] hover:bg-[#0077ed] text-white transition-all rounded-full h-12 px-7 shadow-sm shadow-[#0071e3]/30"
                  >
                    <span>{t('ctaPrimary')}</span>
                    <ArrowRight size={16} />
                  </Button>
                </a>
              </GsapMagnetic>

              <a href="#casos-de-exito" id="hero-secondary-cta" className="inline-block">
                <Button
                  variant="outline"
                  size="lg"
                  className="w-full sm:w-auto font-medium border-black/15 dark:border-white/15 bg-white/60 dark:bg-white/[0.04] hover:bg-black/5 dark:hover:bg-white/[0.08] text-[#1d1d1f] dark:text-white rounded-full h-12 px-6 backdrop-blur-sm transition-all"
                >
                  <span>{t('ctaSecondary')}</span>
                </Button>
              </a>
            </div>

            {/* Garantías de confianza (Apple-style clean trust row) */}
            <div className="grid sm:grid-cols-3 gap-3.5 pt-6 border-t border-black/[0.08] dark:border-white/[0.08]">
              {trustItems.map((item, idx) => (
                <div key={idx} className="flex items-start gap-2">
                  <div className="w-4 h-4 rounded-full bg-[#0071e3]/10 dark:bg-[#0071e3]/20 flex items-center justify-center mt-0.5 shrink-0">
                    <Check size={11} className="text-[#0071e3] dark:text-[#2997ff]" />
                  </div>
                  <span className="text-xs font-medium text-[#1d1d1f]/80 dark:text-slate-300 leading-snug">{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Panel interactivo estilo ventana macOS / Apple Pro Showcase */}
          <div className="relative rounded-3xl border border-black/[0.08] dark:border-white/[0.1] bg-white dark:bg-[#161617] shadow-[0_20px_50px_rgba(0,0,0,0.06)] dark:shadow-[0_20px_60px_rgba(0,0,0,0.6)] p-6 sm:p-7 overflow-hidden transition-colors">
            {/* Header estilo ventana macOS */}
            <div className="flex items-center justify-between pb-4 mb-5 border-b border-black/[0.06] dark:border-white/[0.08]">
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1.5 mr-2">
                  <span className="w-3 h-3 rounded-full bg-[#ff5f56]/80" />
                  <span className="w-3 h-3 rounded-full bg-[#ffbd2e]/80" />
                  <span className="w-3 h-3 rounded-full bg-[#27c93f]/80" />
                </div>
                <div>
                  <span className="text-xs uppercase tracking-wider text-[#1d1d1f] dark:text-white font-semibold block">
                    {locale === 'en' ? 'Active Production Work' : 'Entregas en Producción'}
                  </span>
                  <span className="text-[11px] text-[#86868b] dark:text-slate-400">
                    High Performance Engineering
                  </span>
                </div>
              </div>
              <span className="text-xs font-medium text-[#0071e3] dark:text-[#2997ff]">
                SLA 99.9%
              </span>
            </div>

            {/* Lista de proyectos activos con tarjetas limpias estilo Apple */}
            <div className="space-y-3">
              {projects.map((project, idx) => (
                <a
                  key={idx}
                  href="#casos-de-exito"
                  className="group block p-4 rounded-2xl border border-black/[0.04] dark:border-white/[0.06] bg-[#f5f5f7] dark:bg-[#222224] hover:bg-black/[0.04] dark:hover:bg-white/[0.08] transition-all"
                >
                  <div className="flex items-center justify-between gap-2 mb-1.5">
                    <span className="text-xs font-semibold text-[#86868b] dark:text-slate-400 uppercase tracking-wider">{project.company}</span>
                    <span className="text-[11px] px-2 py-0.5 rounded-full bg-white dark:bg-black/40 text-[#1d1d1f] dark:text-slate-200 font-medium border border-black/[0.05] dark:border-white/[0.08]">
                      {project.tag}
                    </span>
                  </div>
                  <h3 className="text-sm font-bold text-[#1d1d1f] dark:text-white group-hover:text-[#0071e3] dark:group-hover:text-[#2997ff] transition-colors">
                    {project.title}
                  </h3>
                  <div className="flex items-center justify-between mt-2 pt-2 border-t border-black/[0.04] dark:border-white/[0.06] text-xs text-[#86868b] dark:text-slate-400">
                    <span>{project.metricsShort}</span>
                    <ChevronRight size={14} className="text-[#0071e3] dark:text-[#2997ff] group-hover:translate-x-0.5 transition-transform" />
                  </div>
                </a>
              ))}
            </div>

            {/* Footer de la tarjeta con stack y estado */}
            <div className="mt-5 pt-4 border-t border-black/[0.06] dark:border-white/[0.08] flex items-center justify-between text-xs text-[#86868b] dark:text-slate-400">
              <span>Next.js · TypeScript · Cloud</span>
              <span className="inline-flex items-center gap-1 text-[#1d1d1f] dark:text-white font-medium">
                <CheckCircle2 size={13} className="text-[#0071e3] dark:text-[#2997ff]" />
                Verificado
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
