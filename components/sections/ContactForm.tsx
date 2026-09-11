'use client';

import { useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { Send, CheckCircle2, AlertCircle, ChevronDown, Linkedin, MessageCircle, ShieldCheck } from 'lucide-react';
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
  const t = useTranslations('contact');
  const locale = useLocale() as Locale;
  const base = locale === 'en' ? '/en' : '';
  const [formData, setFormData] = useState<FormData>({ name: '', email: '', projectType: '', message: '', website: '' });
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [ref, inView] = useInView(0.06);
  const projectTypes = projectTypesData[locale] ?? projectTypesData.es;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');
    try {
      const res = await fetch('/api/contact', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(formData) });
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

  const inputClass = "w-full px-4 py-3 bg-white dark:bg-[#121214] border border-black/[0.1] dark:border-white/[0.12] rounded-2xl text-[#1d1d1f] dark:text-white text-sm focus:border-[#0071e3] dark:focus:border-[#2997ff] focus:outline-none transition-colors placeholder:text-[#86868b] dark:placeholder:text-slate-500 shadow-xs";

  return (
    <section id="contacto-form" className="scroll-mt-20 py-24 sm:py-32 bg-white dark:bg-black text-[#1d1d1f] dark:text-[#f5f5f7] border-b border-black/[0.06] dark:border-white/[0.08] relative overflow-hidden transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <div
          ref={ref}
          className={`grid lg:grid-cols-2 gap-12 lg:gap-16 transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
        >
          {/* Columna izquierda: Información del consultor y compromisos */}
          <div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#1d1d1f] dark:text-white mb-4 font-heading leading-tight">
              {t('title')}{' '}
              <span className="text-[#0071e3] dark:text-[#2997ff]">
                {t('titleHighlight')}
              </span>
            </h2>
            <p className="text-[#86868b] dark:text-slate-400 text-sm sm:text-base leading-relaxed mb-8">
              {t('subtitle')}
            </p>

            {/* Ficha técnica del desarrollador */}
            <div className="p-7 rounded-3xl border border-black/[0.05] dark:border-white/[0.08] bg-[#f5f5f7] dark:bg-[#161617] shadow-xs mb-8">
              <div className="flex items-center gap-3.5 mb-3">
                <div className="w-11 h-11 rounded-2xl bg-white dark:bg-white/10 text-[#0071e3] dark:text-[#2997ff] border border-black/[0.06] dark:border-white/[0.1] flex items-center justify-center font-bold text-sm shadow-xs">
                  JM
                </div>
                <div>
                  <h3 className="text-sm font-bold text-[#1d1d1f] dark:text-white font-heading">Juan Ramón Moreno Bravo</h3>
                  <p className="text-xs text-[#0071e3] dark:text-[#2997ff] font-medium">Ingeniería de Software & Sistemas Distribuidos</p>
                </div>
              </div>
              <p className="text-xs text-[#86868b] dark:text-slate-400 leading-relaxed pt-3 border-t border-black/[0.06] dark:border-white/[0.08] font-normal">
                {locale === 'en'
                  ? 'Every engagement is developed directly by me with documented code, WCAG standards, and reproducible deployment pipelines.'
                  : 'Cada proyecto es ejecutado de forma directa con código auditable, estándares de accesibilidad WCAG y pipelines de despliegue reproducibles.'}
              </p>
            </div>

            {/* Beneficios directos */}
            <div className="space-y-4 mb-8">
              {[
                { title: t('benefit1Title'), desc: t('benefit1Desc') },
                { title: t('benefit2Title'), desc: t('benefit2Desc') },
                { title: t('benefit3Title'), desc: t('benefit3Desc') },
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-3.5">
                  <div className="p-1.5 rounded-full bg-[#0071e3]/10 dark:bg-[#0071e3]/20 text-[#0071e3] dark:text-[#2997ff] shrink-0 mt-0.5">
                    <ShieldCheck size={14} />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-[#1d1d1f] dark:text-white font-heading">{item.title}</p>
                    <p className="text-xs text-[#86868b] dark:text-slate-400 mt-0.5 leading-relaxed font-normal">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Canales directos */}
            <div className="pt-6 border-t border-black/[0.06] dark:border-white/[0.08]">
              <p className="text-xs uppercase tracking-wider text-[#86868b] dark:text-slate-400 mb-3 font-semibold">{t('directContact')}</p>
              <div className="flex flex-wrap gap-3">
                <a
                  href="https://www.linkedin.com/in/juan-ramon-moreno-bravo-0830b1271/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-xs font-medium text-[#1d1d1f] dark:text-white bg-black/[0.04] dark:bg-white/[0.08] hover:bg-black/[0.08] dark:hover:bg-white/[0.14] px-4 py-2.5 rounded-full border border-black/[0.05] dark:border-white/[0.08] transition-all"
                >
                  <Linkedin size={14} className="text-[#0071e3] dark:text-[#2997ff]" /> {t('linkedinBtn')}
                </a>
                <a
                  href="https://wa.me/522382440637?text=Hola%20Juan%2C%20me%20interesa%20una%20consultor%C3%ADa"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-xs font-medium text-[#1d1d1f] dark:text-white bg-black/[0.04] dark:bg-white/[0.08] hover:bg-black/[0.08] dark:hover:bg-white/[0.14] px-4 py-2.5 rounded-full border border-black/[0.05] dark:border-white/[0.08] transition-all"
                >
                  <MessageCircle size={14} className="text-[#0071e3] dark:text-[#2997ff]" /> {t('whatsappBtn')}
                </a>
              </div>
            </div>
          </div>

          {/* Formulario en tarjeta limpia estilo Apple */}
          <div className="bg-[#f5f5f7] dark:bg-[#161617] border border-black/[0.05] dark:border-white/[0.08] rounded-3xl p-7 sm:p-9 shadow-xs">
            <h3 className="text-xl font-bold text-[#1d1d1f] dark:text-white font-heading mb-1">{t('formTitle')}</h3>
            <p className="text-xs sm:text-sm text-[#86868b] dark:text-slate-400 mb-6">{t('formSubtitle')}</p>

            {status === 'success' ? (
              <div className="text-center py-12">
                <CheckCircle2 className="text-[#0071e3] dark:text-[#2997ff] mx-auto mb-3" size={42} />
                <h4 className="text-lg font-bold text-[#1d1d1f] dark:text-white font-heading mb-1">{t('successTitle')}</h4>
                <p className="text-xs text-[#86868b] dark:text-slate-400">{t('successDesc')}</p>
              </div>
            ) : status === 'error' ? (
              <div className="text-center py-12">
                <AlertCircle className="text-rose-500 mx-auto mb-3" size={42} />
                <h4 className="text-lg font-bold text-[#1d1d1f] dark:text-white font-heading mb-1">{t('errorTitle')}</h4>
                <p className="text-xs text-[#86868b] dark:text-slate-400">{t('errorDesc')}</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-xs font-medium text-[#1d1d1f] dark:text-slate-300 mb-1.5">{t('labelName')} *</label>
                  <input id="name" type="text" name="name" value={formData.name} onChange={handleChange} required autoComplete="name" placeholder={t('placeholderName')} className={inputClass} />
                </div>
                <div>
                  <label htmlFor="email" className="block text-xs font-medium text-[#1d1d1f] dark:text-slate-300 mb-1.5">{t('labelEmail')} *</label>
                  <input id="email" type="email" name="email" value={formData.email} onChange={handleChange} required autoComplete="email" placeholder={t('placeholderEmail')} className={inputClass} />
                </div>
                <div>
                  <label htmlFor="projectType" className="block text-xs font-medium text-[#1d1d1f] dark:text-slate-300 mb-1.5">{t('labelProjectType')} *</label>
                  <div className="relative">
                    <ChevronDown className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#86868b] pointer-events-none" size={15} />
                    <select id="projectType" name="projectType" value={formData.projectType} onChange={handleChange} required className={`${inputClass} appearance-none pr-9 cursor-pointer`}>
                      <option value="" className="bg-white dark:bg-[#161617] text-[#86868b]">{t('placeholderSelect')}</option>
                      {projectTypes.map(pt => <option key={pt} value={pt} className="bg-white dark:bg-[#161617] text-[#1d1d1f] dark:text-white">{pt}</option>)}
                    </select>
                  </div>
                </div>
                <div>
                  <label htmlFor="message" className="block text-xs font-medium text-[#1d1d1f] dark:text-slate-300 mb-1.5">{t('labelMessage')} *</label>
                  <textarea id="message" name="message" value={formData.message} onChange={handleChange} required rows={4} placeholder={t('placeholderMessage')} className={`${inputClass} resize-none`} />
                </div>

                {/* Honeypot anti-spam */}
                <div aria-hidden="true" style={{ position: 'absolute', left: '-9999px', opacity: 0, pointerEvents: 'none' } as React.CSSProperties}>
                  <input type="text" name="website" value={formData.website} onChange={handleChange} autoComplete="off" tabIndex={-1} />
                </div>

                <button
                  type="submit"
                  disabled={status === 'sending'}
                  className="w-full bg-[#0071e3] hover:bg-[#0077ed] text-white py-3.5 rounded-full text-xs font-medium transition-all shadow-sm shadow-[#0071e3]/20 disabled:opacity-50 flex items-center justify-center gap-2 cursor-pointer mt-2"
                >
                  {status === 'sending' ? (
                    <span className="flex items-center gap-2">
                      <div className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      {t('sending')}
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      {t('submitBtn')}
                      <Send size={13} />
                    </span>
                  )}
                </button>

                <p className="text-[11px] text-[#86868b] dark:text-slate-500 text-center pt-1">
                  {t('privacyText')}{' '}
                  <a href={`${base}/privacy`} className="underline hover:text-[#1d1d1f] dark:hover:text-slate-300 transition-colors">{t('privacyLink')}</a>
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
