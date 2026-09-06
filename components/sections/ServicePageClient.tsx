// Server Component — todo el contenido es indexable por Google
import Link from 'next/link';
import { ArrowRight, CheckCircle } from 'lucide-react';
import ServiceFaqAccordion from './ServiceFaqAccordion';
import { englishServiceContent } from './service-en-content';

interface ServicePageProps {
  badge: string;
  h1: string;
  h1Highlight: string;
  subtitle: string;
  benefits: { title: string; desc: string }[];
  sections: { h2: string; content: string; items?: string[] }[];
  faqs: { q: string; a: string }[];
  tech: string[];
  ctaText: string;
  relatedServices: { name: string; href: string }[];
  locale: string;
}

export default function ServicePageClient({
  badge, h1, h1Highlight, subtitle, benefits, sections, faqs, tech, ctaText, relatedServices, locale,
}: ServicePageProps) {
  const base = locale === 'en' ? '/en' : '';
  const localized = locale === 'en' ? englishServiceContent[badge] : undefined;
  const page = localized ?? { badge, h1, h1Highlight, subtitle, benefits, sections, faqs, ctaText, relatedServices };
  const labels = locale === 'en'
    ? { cases: 'View success cases', technology: 'Technologies we use', faq: 'Frequently asked questions', related: 'Related services', ready: 'Ready to get started?', cta: 'Free 30-minute consultation. No commitment. Response within 24 hours.' }
    : { cases: 'Ver casos de éxito', technology: 'Tecnologías que utilizamos', faq: 'Preguntas frecuentes', related: 'Servicios relacionados', ready: '¿Listo para empezar?', cta: 'Consultoría gratuita de 30 minutos. Sin compromiso. Respuesta en menos de 24 horas.' };

  // FAQ Schema para rich snippets en páginas de servicio
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: page.faqs.map((item) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: { '@type': 'Answer', text: item.a },
    })),
  };

  return (
    <div className="min-h-screen bg-[#FAFAFA] dark:bg-slate-950 text-slate-900 dark:text-slate-100">
      {/* FAQ Schema inyectado en cada página de servicio */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* Hero */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-600/5 dark:bg-brand-600/10 rounded-full blur-3xl translate-x-1/3 -translate-y-1/4" />
        </div>
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-brand-50 dark:bg-brand-900/30 border border-brand-100 dark:border-brand-800 rounded-full mb-6">
            <span className="text-[11px] font-black text-brand-600 dark:text-brand-400 uppercase tracking-widest">{page.badge}</span>
          </div>
          <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-black tracking-tighter text-slate-900 dark:text-white mb-6 leading-tight">
            {page.h1} <span className="text-brand-600">{page.h1Highlight}</span>
          </h1>
          <p className="text-lg sm:text-xl text-slate-600 dark:text-slate-300 mb-10 max-w-3xl leading-relaxed">{page.subtitle}</p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href={`${base}/#contacto-form`}
              className="inline-flex items-center justify-center gap-3 bg-brand-600 text-white px-8 py-4 rounded-xl font-bold hover:bg-brand-700 transition-all shadow-brand group"
            >
              {page.ctaText} <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href={`${base}/#casos-de-exito`}
              className="inline-flex items-center justify-center gap-3 bg-white dark:bg-slate-800 text-slate-900 dark:text-white px-8 py-4 rounded-xl font-bold border-2 border-slate-200 dark:border-slate-700 hover:border-brand-600 transition-all"
            >
              {labels.cases}
            </Link>
          </div>
        </div>
      </section>

      {/* Beneficios */}
      <section className="py-16 bg-white dark:bg-slate-900">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="grid sm:grid-cols-3 gap-6">
            {page.benefits.map((b, i) => (
              <div key={i} className="flex items-start gap-4 p-6 bg-slate-50 dark:bg-slate-800/60 rounded-2xl border border-slate-100 dark:border-slate-700">
                <div className="w-10 h-10 bg-brand-600/10 rounded-xl flex items-center justify-center flex-shrink-0">
                  <CheckCircle size={18} className="text-brand-600" />
                </div>
                <div>
                  <p className="font-black text-slate-900 dark:text-white text-sm mb-1">{b.title}</p>
                  <p className="text-slate-500 dark:text-slate-400 text-xs leading-relaxed">{b.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contenido — Server rendered, 100% indexable */}
      <section className="py-20 bg-[#FAFAFA] dark:bg-slate-950">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 space-y-16">
          {page.sections.map((sec, i) => (
            <div key={i}>
              <h2 className="font-heading text-2xl sm:text-3xl font-black text-slate-900 dark:text-white mb-4">{sec.h2}</h2>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed mb-4">{sec.content}</p>
              {sec.items && (
                <ul className="grid sm:grid-cols-2 gap-3 mt-4">
                  {sec.items.map((item, j) => (
                    <li key={j} className="flex items-center gap-3 text-sm font-medium text-slate-700 dark:text-slate-300">
                      <div className="w-1.5 h-1.5 bg-brand-600 rounded-full flex-shrink-0" />{item}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Tech */}
      <section className="py-16 bg-white dark:bg-slate-900">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <h2 className="font-heading text-2xl font-black text-slate-900 dark:text-white mb-8 text-center">{labels.technology}</h2>
          <div className="flex flex-wrap justify-center gap-3">
            {tech.map((t) => (
              <span key={t} className="px-4 py-2 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-xl text-sm font-bold border border-slate-200 dark:border-slate-700">{t}</span>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ — accordion interactivo (client) + contenido indexable en schema */}
      <section className="py-20 bg-[#FAFAFA] dark:bg-slate-950">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <h2 className="font-heading text-2xl sm:text-3xl font-black text-slate-900 dark:text-white mb-8 text-center">
            {labels.faq}
          </h2>
          <ServiceFaqAccordion faqs={page.faqs} />
        </div>
      </section>

      {/* Relacionados — enlaces internos que distribuyen PageRank */}
      <section className="py-16 bg-white dark:bg-slate-900">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <h2 className="font-heading text-xl font-black text-slate-900 dark:text-white mb-6">{labels.related}</h2>
          <div className="flex flex-wrap gap-3">
            {page.relatedServices.map((s) => (
              <Link
                key={s.href}
                href={`${base}${s.href}`}
                className="px-5 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm font-bold text-slate-600 dark:text-slate-300 hover:border-brand-600 hover:text-brand-600 transition-all"
              >
                {s.name}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA final */}
      <section className="py-20 bg-slate-900 text-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="font-heading text-3xl sm:text-4xl font-black mb-4">{labels.ready}</h2>
          <p className="text-slate-300 text-lg mb-8">{labels.cta}</p>
          <Link
            href={`${base}/#contacto-form`}
            className="inline-flex items-center gap-3 bg-brand-600 text-white px-10 py-4 rounded-xl font-black uppercase tracking-widest text-sm hover:bg-brand-700 transition-all shadow-brand group"
          >
            {page.ctaText} <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </section>
    </div>
  );
}
