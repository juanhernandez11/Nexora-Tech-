'use client';

import { useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { Send, CheckCircle, AlertCircle, Mail, User, ChevronDown, Linkedin, MessageCircle } from 'lucide-react';
import useInView from '@/hooks/useInView';
import { projectTypesData, type Locale } from '@/i18n/data';

interface FormData {
  name: string;
  email: string;
  projectType: string;
  message: string;
}

const ContactForm = () => {
  const t = useTranslations('contact');
  const locale = useLocale() as Locale;
  const [formData, setFormData] = useState<FormData>({ name: '', email: '', projectType: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [ref, inView] = useInView(0.06);

  const projectTypes = projectTypesData[locale] ?? projectTypesData.es;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success) {
        setStatus('success');
        setFormData({ name: '', email: '', projectType: '', message: '' });
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

  return (
    <section id="contacto-form" className="py-20 sm:py-28 lg:py-36 bg-slate-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div ref={ref} className={`grid lg:grid-cols-2 gap-12 lg:gap-20 items-start transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
          {/* Columna izquierda */}
          <div className="order-2 lg:order-1 lg:pt-4">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-500/10 border border-emerald-500/20 rounded-full mb-7">
              <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
              <span className="text-xs font-black text-emerald-400 uppercase tracking-widest">{t('badge')}</span>
            </div>
            <h2 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-black mb-5 leading-tight">
              {t('title')} <span className="text-brand-400">{t('titleHighlight')}</span>
            </h2>
            <p className="text-lg text-slate-300 mb-10 leading-relaxed">{t('subtitle')}</p>
            <div className="space-y-5 mb-10">
              {[
                { title: t('benefit1Title'), desc: t('benefit1Desc') },
                { title: t('benefit2Title'), desc: t('benefit2Desc') },
                { title: t('benefit3Title'), desc: t('benefit3Desc') },
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-brand-600/20 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5">
                    <CheckCircle size={18} className="text-brand-400" />
                  </div>
                  <div>
                    <p className="font-bold text-white">{item.title}</p>
                    <p className="text-slate-400 text-sm mt-0.5">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="pt-8 border-t border-slate-800">
              <p className="text-xs font-black text-slate-500 uppercase tracking-widest mb-4">{t('directContact')}</p>
              <div className="flex flex-col sm:flex-row gap-3">
                <a href="https://www.linkedin.com/in/juan-ramon-moreno-bravo-0830b1271/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 px-5 py-3 bg-blue-600/20 border border-blue-600/30 rounded-xl text-sm font-bold text-blue-400 hover:bg-blue-600/30 transition-colors">
                  <Linkedin size={16} /> {t('linkedinBtn')}
                </a>
                <a href="https://wa.me/522381234567?text=Hola%20Juan%2C%20me%20interesa%20una%20consultor%C3%ADa" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 px-5 py-3 bg-emerald-600/20 border border-emerald-600/30 rounded-xl text-sm font-bold text-emerald-400 hover:bg-emerald-600/30 transition-colors">
                  <MessageCircle size={16} /> {t('whatsappBtn')}
                </a>
              </div>
            </div>
          </div>

          {/* Formulario */}
          <div className="order-1 lg:order-2">
            <div className="bg-white rounded-2xl p-7 sm:p-9 shadow-2xl">
              <h3 className="font-heading text-2xl font-black text-slate-900 mb-2">{t('formTitle')}</h3>
              <p className="text-slate-500 text-sm mb-7">{t('formSubtitle')}</p>
              {status === 'success' ? (
                <div className="text-center py-14">
                  <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-5"><CheckCircle className="text-emerald-600" size={32} /></div>
                  <h4 className="font-heading text-2xl font-black text-slate-900 mb-2">{t('successTitle')}</h4>
                  <p className="text-slate-500 text-sm">{t('successDesc')}</p>
                </div>
              ) : status === 'error' ? (
                <div className="text-center py-14">
                  <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-5"><AlertCircle className="text-red-600" size={32} /></div>
                  <h4 className="font-heading text-2xl font-black text-slate-900 mb-2">{t('errorTitle')}</h4>
                  <p className="text-slate-500 text-sm">{t('errorDesc')}</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <label htmlFor="name" className="block text-xs font-black text-slate-700 uppercase tracking-widest mb-2">{t('labelName')} *</label>
                    <div className="relative">
                      <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={17} aria-hidden="true" />
                      <input id="name" type="text" name="name" value={formData.name} onChange={handleChange} required autoComplete="name" placeholder={t('placeholderName')} className="w-full pl-11 pr-4 py-3.5 bg-slate-50 border-2 border-slate-200 rounded-xl text-slate-900 font-medium text-sm focus:border-brand-500 focus:outline-none transition-colors" />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-xs font-black text-slate-700 uppercase tracking-widest mb-2">{t('labelEmail')} *</label>
                    <div className="relative">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={17} aria-hidden="true" />
                      <input id="email" type="email" name="email" value={formData.email} onChange={handleChange} required autoComplete="email" placeholder={t('placeholderEmail')} className="w-full pl-11 pr-4 py-3.5 bg-slate-50 border-2 border-slate-200 rounded-xl text-slate-900 font-medium text-sm focus:border-brand-500 focus:outline-none transition-colors" />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="projectType" className="block text-xs font-black text-slate-700 uppercase tracking-widest mb-2">{t('labelProjectType')} *</label>
                    <div className="relative">
                      <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={17} />
                      <select id="projectType" name="projectType" value={formData.projectType} onChange={handleChange} required className="w-full px-4 py-3.5 bg-slate-50 border-2 border-slate-200 rounded-xl text-slate-900 font-medium text-sm focus:border-brand-500 focus:outline-none transition-colors appearance-none cursor-pointer">
                        <option value="">{t('placeholderSelect')}</option>
                        {projectTypes.map(pt => <option key={pt} value={pt}>{pt}</option>)}
                      </select>
                    </div>
                  </div>
                  <div>
                    <label htmlFor="message" className="block text-xs font-black text-slate-700 uppercase tracking-widest mb-2">{t('labelMessage')} *</label>
                    <textarea id="message" name="message" value={formData.message} onChange={handleChange} required rows={4} placeholder={t('placeholderMessage')} className="w-full px-4 py-3.5 bg-slate-50 border-2 border-slate-200 rounded-xl text-slate-900 font-medium text-sm focus:border-brand-500 focus:outline-none transition-colors resize-none" />
                  </div>
                  <button type="submit" disabled={status === 'sending'} className="w-full bg-brand-600 text-white py-4 rounded-xl font-black uppercase tracking-widest text-sm hover:bg-brand-700 transition-all shadow-brand hover:shadow-brand-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3 group">
                    {status === 'sending' ? (
                      <><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />{t('sending')}</>
                    ) : (
                      <>{t('submitBtn')}<Send size={16} className="group-hover:translate-x-1 transition-transform" /></>
                    )}
                  </button>
                  <p className="text-xs text-slate-400 text-center">
                    {t('privacyText')}{' '}
                    <a href="/privacy" className="underline hover:text-brand-600 transition-colors">{t('privacyLink')}</a>
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;
