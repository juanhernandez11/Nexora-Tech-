'use client';

import { useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { Send, CheckCircle2, AlertCircle, ChevronDown, Linkedin, MessageCircle } from 'lucide-react';
import useInView from '@/hooks/useInView';
import { projectTypesData, type Locale } from '@/i18n/data';
import { BorderBeam } from '@/components/ui/BorderBeam';

interface FormData {
  name: string;
  email: string;
  projectType: string;
  message: string;
  website: string;
}

export default function ContactForm() {
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

  const inputClass = "w-full px-4 py-3 bg-white/[0.04] border border-white/[0.08] rounded-xl text-white text-sm focus:border-[#2997ff]/60 focus:bg-white/[0.06] focus:outline-none transition-all placeholder:text-white/20";

  return (
    <section id="contacto-form" className="theme-surface relative overflow-hidden py-28 sm:py-36 bg-[#000]">

      {/* Grid */}
      <div className="pointer-events-none absolute inset-0 z-0"
        style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)',
          backgroundSize: '48px 48px',
        }}
      />

      {/* Glow */}
      <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full bg-[#2997ff]/5 blur-[140px]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <div
          ref={ref}
          className={`grid lg:grid-cols-2 gap-12 lg:gap-16 transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
        >

          {/* Left column */}
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#2997ff] mb-4">Contacto</p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-[-0.03em] text-white mb-4 leading-[1.05]">
              {t('title')}{' '}
              <span className="bg-gradient-to-r from-[#2997ff] to-[#5ac8fa] bg-clip-text text-transparent">
                {t('titleHighlight')}
              </span>
            </h2>
            <p className="text-white/40 text-sm sm:text-base leading-relaxed mb-10">
              {t('subtitle')}
            </p>

            {/* Developer card */}
            <div className="relative rounded-2xl border border-white/[0.08] bg-white/[0.02] p-6 mb-8 overflow-hidden">
              <BorderBeam size={120} duration={14} colorFrom="#2997ff" colorTo="#5ac8fa" borderWidth={0.8} />
              <div className="flex items-center gap-3.5 mb-4">
                <div className="w-11 h-11 rounded-xl bg-[#2997ff]/10 border border-[#2997ff]/20 text-[#2997ff] flex items-center justify-center font-black text-sm">
                  JM
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white">Juan Ramón Moreno Bravo</h3>
                  <p className="text-xs text-[#2997ff]">Software & Full-Stack Developer</p>
                </div>
              </div>
              <p className="text-xs text-white/30 leading-relaxed pt-4 border-t border-white/[0.06]">
                {locale === 'en'
                  ? 'Every project is built directly by me — auditable code, WCAG standards, reproducible deployments.'
                  : 'Cada proyecto es ejecutado por mí directamente — código auditable, estándares WCAG y deploys reproducibles.'}
              </p>
            </div>

            {/* Benefits */}
            <div className="space-y-4 mb-10">
              {[
                { title: t('benefit1Title'), desc: t('benefit1Desc') },
                { title: t('benefit2Title'), desc: t('benefit2Desc') },
                { title: t('benefit3Title'), desc: t('benefit3Desc') },
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#2997ff] mt-1.5 shrink-0 animate-glow-pulse" />
                  <div>
                    <p className="text-sm font-bold text-white">{item.title}</p>
                    <p className="text-xs text-white/30 mt-0.5 leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Direct channels */}
            <div className="pt-6 border-t border-white/[0.06]">
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/30 mb-4">{t('directContact')}</p>
              <div className="flex flex-wrap gap-3">
                <a
                  href="https://www.linkedin.com/company/nexoratech-tehuacan"
                  target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-xs font-semibold text-white/60 bg-white/[0.04] hover:bg-white/[0.08] hover:text-white px-4 py-2.5 rounded-full border border-white/[0.08] transition-all"
                >
                  <Linkedin size={13} className="text-[#2997ff]" /> {t('linkedinBtn')}
                </a>
                <a
                  href="https://wa.me/522382440637?text=Hola%20Juan%2C%20me%20interesa%20una%20consultor%C3%ADa"
                  target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-xs font-semibold text-white/60 bg-white/[0.04] hover:bg-white/[0.08] hover:text-white px-4 py-2.5 rounded-full border border-white/[0.08] transition-all"
                >
                  <MessageCircle size={13} className="text-[#34d399]" /> {t('whatsappBtn')}
                </a>
              </div>
            </div>
          </div>

          {/* Form card */}
          <div className="relative rounded-2xl border border-white/[0.08] bg-white/[0.02] backdrop-blur-sm p-7 sm:p-9 overflow-hidden">
            <BorderBeam size={180} duration={18} colorFrom="#2997ff" colorTo="#a855f7" borderWidth={1} />

            <h3 className="text-xl font-black tracking-[-0.03em] text-white mb-1">{t('formTitle')}</h3>
            <p className="text-xs text-white/30 mb-7">{t('formSubtitle')}</p>

            {status === 'success' ? (
              <div className="text-center py-16">
                <CheckCircle2 className="text-[#34d399] mx-auto mb-4" size={44} />
                <h4 className="text-lg font-black text-white mb-2">{t('successTitle')}</h4>
                <p className="text-xs text-white/40">{t('successDesc')}</p>
              </div>
            ) : status === 'error' ? (
              <div className="text-center py-16">
                <AlertCircle className="text-rose-500 mx-auto mb-4" size={44} />
                <h4 className="text-lg font-black text-white mb-2">{t('errorTitle')}</h4>
                <p className="text-xs text-white/40">{t('errorDesc')}</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-xs font-semibold text-white/50 mb-1.5">{t('labelName')} *</label>
                  <input id="name" type="text" name="name" value={formData.name} onChange={handleChange} required autoComplete="name" placeholder={t('placeholderName')} className={inputClass} />
                </div>
                <div>
                  <label htmlFor="email" className="block text-xs font-semibold text-white/50 mb-1.5">{t('labelEmail')} *</label>
                  <input id="email" type="email" name="email" value={formData.email} onChange={handleChange} required autoComplete="email" placeholder={t('placeholderEmail')} className={inputClass} />
                </div>
                <div>
                  <label htmlFor="projectType" className="block text-xs font-semibold text-white/50 mb-1.5">{t('labelProjectType')} *</label>
                  <div className="relative">
                    <ChevronDown className="absolute right-3.5 top-1/2 -translate-y-1/2 text-white/20 pointer-events-none" size={14} />
                    <select id="projectType" name="projectType" value={formData.projectType} onChange={handleChange} required
                      className={`${inputClass} appearance-none pr-9 cursor-pointer`}
                      style={{ colorScheme: 'dark' }}
                    >
                      <option value="" className="bg-[#0a0a0a] text-white/40">{t('placeholderSelect')}</option>
                      {projectTypes.map(pt => <option key={pt} value={pt} className="bg-[#0a0a0a] text-white">{pt}</option>)}
                    </select>
                  </div>
                </div>
                <div>
                  <label htmlFor="message" className="block text-xs font-semibold text-white/50 mb-1.5">{t('labelMessage')} *</label>
                  <textarea id="message" name="message" value={formData.message} onChange={handleChange} required rows={4} placeholder={t('placeholderMessage')} className={`${inputClass} resize-none`} />
                </div>

                {/* Honeypot */}
                <div aria-hidden="true" style={{ position: 'absolute', left: '-9999px', opacity: 0, pointerEvents: 'none' } as React.CSSProperties}>
                  <input type="text" name="website" value={formData.website} onChange={handleChange} autoComplete="off" tabIndex={-1} />
                </div>

                <button
                  type="submit"
                  disabled={status === 'sending'}
                  className="w-full bg-white hover:bg-white/90 text-black py-3.5 rounded-full text-sm font-bold transition-all disabled:opacity-50 flex items-center justify-center gap-2 cursor-pointer mt-2 hover:scale-[1.01] active:scale-[0.98]"
                >
                  {status === 'sending' ? (
                    <span className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-black/20 border-t-black rounded-full animate-spin" />
                      {t('sending')}
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      {t('submitBtn')} <Send size={14} />
                    </span>
                  )}
                </button>

                <p className="text-[11px] text-white/20 text-center pt-1">
                  {t('privacyText')}{' '}
                  <a href={`${base}/privacy`} className="underline hover:text-white/50 transition-colors">{t('privacyLink')}</a>
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
