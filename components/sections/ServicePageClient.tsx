'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowRight, CheckCircle, ChevronDown } from 'lucide-react';

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
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const base = locale === 'en' ? '/en' : '';

  return (
    <div className="min-h-screen bg-[#FAFAFA] dark:bg-slate-950 text-slate-900 dark:text-slate-100">
      {/* Hero */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-600/5 dark:bg-brand-600/10 rounded-full blur-3xl translate-x-1/3 -translate-y-1/4" />
        </div>
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-brand-50 dark:bg-brand-900/30 border border-brand-100 dark:border-brand-800 rounded-full mb-6">
            <span className="text-[11px] font-black text-brand-600 dark:text-brand-400 uppercase tracking-widest">{badge}</span>
          </div>
          <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-black tracking-tighter text-slate-900 dark:text-white mb-6 leading-tight">
            {h1} <span className="text-brand-600">{h1Highlight}</span>
          </h1>
          <p className="text-lg sm:text-xl text-slate-600 dark:text-slate-300 mb-10 max-w-3xl leading-relaxed">{subtitle}</p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link href={`${base}/#contacto-form`} className="inline-flex items-center justify-center gap-3 bg-brand-600 text-white px-8 py-4 rounded-xl font-bold hover:bg-brand-700 transition-all shadow-brand group">
              {ctaText} <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link href={`${base}/#casos-de-exito`} className="inline-flex items-center justify-center gap-3 bg-white dark:bg-slate-800 text-slate-900 dark:text-white px-8 py-4 rounded-xl font-bold border-2 border-slate-200 dark:border-slate-700 hover:border-brand-600 transition-all">
              Ver casos de éxito
            </Link>
          </div>
        </div>
      </section>

      {/* Beneficios */}
      <section className="py-16 bg-white dark:bg-slate-900">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="grid sm:grid-cols-3 gap-6">
            {benefits.map((b, i) => (
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

      {/* Contenido */}
      <section className="py-20 bg-[#FAFAFA] dark:bg-slate-950">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 space-y-16">
          {sections.map((sec, i) => (
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
          <h2 className="font-heading text-2xl font-black text-slate-900 dark:text-white mb-8 text-center">Tecnologías que utilizamos</h2>
          <div className="flex flex-wrap justify-center gap-3">
            {tech.map((t) => (
              <span key={t} className="px-4 py-2 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-xl text-sm font-bold border border-slate-200 dark:border-slate-700">{t}</span>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-[#FAFAFA] dark:bg-slate-950">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <h2 className="font-heading text-2xl sm:text-3xl font-black text-slate-900 dark:text-white mb-8 text-center">Preguntas frecuentes</h2>
          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <div key={i} className="bg-white dark:bg-slate-800/60 rounded-2xl border-2 border-slate-100 dark:border-slate-700 overflow-hidden hover:border-brand-200 dark:hover:border-brand-700 transition-all">
                <button onClick={() => setOpenFaq(openFaq === i ? null : i)} aria-expanded={openFaq === i} className="w-full px-6 py-5 flex items-center justify-between gap-4 text-left group">
                  <span className="font-heading font-black text-sm sm:text-base text-slate-900 dark:text-white group-hover:text-brand-600 transition-colors flex-1">{faq.q}</span>
                  <ChevronDown size={18} className={`text-slate-400 flex-shrink-0 transition-transform duration-300 ${openFaq === i ? 'rotate-180 text-brand-600' : ''}`} />
                </button>
                <div className={`overflow-hidden transition-all duration-300 ${openFaq === i ? 'max-h-64' : 'max-h-0'}`}>
                  <div className="px-6 pb-6 text-sm text-slate-600 dark:text-slate-300 leading-relaxed border-t border-slate-100 dark:border-slate-700 pt-4">{faq.a}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Relacionados */}
      <section className="py-16 bg-white dark:bg-slate-900">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <h2 className="font-heading text-xl font-black text-slate-900 dark:text-white mb-6">Servicios relacionados</h2>
          <div className="flex flex-wrap gap-3">
            {relatedServices.map((s) => (
              <Link key={s.href} href={`${base}${s.href}`} className="px-5 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm font-bold text-slate-600 dark:text-slate-300 hover:border-brand-600 hover:text-brand-600 transition-all">
                {s.name}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA final */}
      <section className="py-20 bg-slate-900 text-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="font-heading text-3xl sm:text-4xl font-black mb-4">¿Listo para empezar?</h2>
          <p className="text-slate-300 text-lg mb-8">Consultoría gratuita de 30 minutos. Sin compromiso. Respuesta en menos de 24 horas.</p>
          <Link href={`${base}/#contacto-form`} className="inline-flex items-center gap-3 bg-brand-600 text-white px-10 py-4 rounded-xl font-black uppercase tracking-widest text-sm hover:bg-brand-700 transition-all shadow-brand group">
            {ctaText} <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </section>
    </div>
  );
}
