'use client';

import { useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { Send, CheckCircle, AlertCircle, ChevronDown, Linkedin, MessageCircle } from 'lucide-react';
import useInView from '@/hooks/useInView';
import { projectTypesData, type Locale } from '@/i18n/data';

interface FormData {
  name: string;
  email: string;
  projectType: string;
  message: string;
  website: string;
}

const ContactForm = () => {
  const t        = useTranslations('contact');
  const locale   = useLocale() as Locale;
  const base     = locale === 'en' ? '/en' : '';
  const [formData, setFormData] = useState<FormData>({ name: '', email: '', projectType: '', message: '', website: '' });
  const [status, setStatus]     = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [ref, inView]           = useInView(0.06);
  const projectTypes            = projectTypesData[locale] ?? projectTypesData.es;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');
    try {
      const res  = await fetch('/api/contact', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(formData) });
      const data = await res.json();
      if (data.success) {
        setStatus('success');
        setFormData({ name: '', email: '', projectType: '', message: '', website: '' });
        setTimeout(() => setStatus('idle'), 6000);
      } else {
        setStatus('error');
        setTimeout(() => setStatus('idle'), 4000);
      }
    } catch {
      setStatus('error');
      setTimeout(() => setStatus('idle'), 4000);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const inputClass = "w-full px-4 py-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white text-sm focus:border-brand-500 focus:outline-none transition-colors placeholder:text-slate-400";

  return (
    <section id="contacto-form" className="py-20 sm:py-28 bg-white dark:bg-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div
          ref={ref}
          className={`grid lg:grid-cols-2 gap-12 lg:gap-20 transition-all duration-600 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
        >

          {/* Columna izquierda */}
          <div className="lg:pt-2">
            <p className="text-xs font-medium text-slate-400 dark:text-slate-500 mb-3 uppercase tracking-widest">
              {t('badge')}
            </p>
            <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 dark:text-white mb-4">
              {t('title')} <span className="text-brand-600">{t('titleHighlight')}</span>
            </h2>
            <p className="text-slate-500 dark:text-slate-400 text-base leading-relaxed mb-10 max-w-md">
              {t('subtitle')}
            </p>

            {/* Beneficios */}
            <div className="space-y-4 mb-10">
              {[
                { title: t('benefit1Title'), desc: t('benefit1Desc') },
                { title: t('benefit2Title'), desc: t('benefit2Desc') },
                { title: t('benefit3Title'), desc: t('benefit3Desc') },
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 bg-brand-600 rounded-full mt-2 shrink-0" />
                  <div>
                    <p className="text-sm font-semibold text-slate-900 dark:text-white">{item.title}</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Contacto directo */}
            <div className="pt-6 border-t border-slate-100 dark:border-slate-800">
              <p className="text-xs text-slate-400 dark:text-slate-500 mb-3">{t('directContact')}</p>
              <div className="flex flex-wrap gap-3">
                <a
                  href="https://www.linkedin.com/in/juan-ramon-moreno-bravo-0830b1271/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
                >
                  <Linkedin size={14} /> {t('linkedinBtn')}
                </a>
                <span className="text-slate-200 dark:text-slate-700">·</span>
                <a
                  href="https://wa.me/522382440637?text=Hola%20Juan%2C%20me%20interesa%20una%20consultor%C3%ADa"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
                >
                  <MessageCircle size={14} /> {t('whatsappBtn')}
                </a>
              </div>
            </div>
          </div>

          {/* Formulario */}
          <div className="bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl p-6 sm:p-8">
            <h3 className="font-heading text-xl font-black text-slate-900 dark:text-white mb-1">{t('formTitle')}</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 mb-6">{t('formSubtitle')}</p>

            {status === 'success' ? (
              <div className="text-center py-12">
                <CheckCircle className="text-emerald-500 mx-auto mb-4" size={36} />
                <h4 className="font-heading text-xl font-black text-slate-900 dark:text-white mb-2">{t('successTitle')}</h4>
                <p className="text-sm text-slate-500 dark:text-slate-400">{t('successDesc')}</p>
              </div>
            ) : status === 'error' ? (
              <div className="text-center py-12">
                <AlertCircle className="text-red-500 mx-auto mb-4" size={36} />
                <h4 className="font-heading text-xl font-black text-slate-900 dark:text-white mb-2">{t('errorTitle')}</h4>
                <p className="text-sm text-slate-500 dark:text-slate-400">{t('errorDesc')}</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1.5">{t('labelName')} *</label>
                  <input id="name" type="text" name="name" value={formData.name} onChange={handleChange} required autoComplete="name" placeholder={t('placeholderName')} className={inputClass} />
                </div>
                <div>
                  <label htmlFor="email" className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1.5">{t('labelEmail')} *</label>
                  <input id="email" type="email" name="email" value={formData.email} onChange={handleChange} required autoComplete="email" placeholder={t('placeholderEmail')} className={inputClass} />
                </div>
                <div>
                  <label htmlFor="projectType" className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1.5">{t('labelProjectType')} *</label>
                  <div className="relative">
                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={15} />
                    <select id="projectType" name="projectType" value={formData.projectType} onChange={handleChange} required className={`${inputClass} appearance-none pr-9 cursor-pointer`}>
                      <option value="">{t('placeholderSelect')}</option>
                      {projectTypes.map(pt => <option key={pt} value={pt}>{pt}</option>)}
                    </select>
                  </div>
                </div>
                <div>
                  <label htmlFor="message" className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1.5">{t('labelMessage')} *</label>
                  <textarea id="message" name="message" value={formData.message} onChange={handleChange} required rows={4} placeholder={t('placeholderMessage')} className={`${inputClass} resize-none`} />
                </div>

                {/* Honeypot */}
                <div aria-hidden="true" style={{ position: 'absolute', left: '-9999px', opacity: 0, pointerEvents: 'none' } as React.CSSProperties}>
                  <input type="text" name="website" value={formData.website} onChange={handleChange} autoComplete="off" tabIndex={-1} />
                </div>

                <button
                  type="submit"
                  disabled={status === 'sending'}
                  className="w-full bg-slate-900 dark:bg-white text-white dark:text-slate-900 py-3 rounded-lg text-sm font-semibold hover:bg-slate-700 dark:hover:bg-slate-100 transition-colors disabled:opacity-50 flex items-center justify-center gap-2 group"
                >
                  {status === 'sending' ? (
                    <><div className="w-4 h-4 border-2 border-white/30 dark:border-slate-900/30 border-t-white dark:border-t-slate-900 rounded-full animate-spin" />{t('sending')}</>
                  ) : (
                    <>{t('submitBtn')}<Send size={14} className="group-hover:translate-x-0.5 transition-transform" /></>
                  )}
                </button>

                <p className="text-xs text-slate-400 text-center">
                  {t('privacyText')}{' '}
                  <a href={`${base}/privacy`} className="underline hover:text-slate-600 dark:hover:text-slate-300 transition-colors">{t('privacyLink')}</a>
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;
