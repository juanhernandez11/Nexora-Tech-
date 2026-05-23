import { useTranslations } from 'next-intl';
import { Linkedin, MapPin, Mail } from 'lucide-react';
import Logo from '@/components/ui/Logo';

const NAV_ITEMS = [
  { key: 'services', href: '#soluciones' },
  { key: 'cases',    href: '#casos-de-exito' },
  { key: 'process',  href: '#proceso' },
  { key: 'contact',  href: '#contacto-form' },
] as const;

const Footer = () => {
  const t  = useTranslations('footer');
  const tn = useTranslations('nav');
  const year = new Date().getFullYear();

  return (
    <footer className="bg-white dark:bg-slate-950 border-t border-slate-100 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-14 sm:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">

          {/* Marca */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <Logo className="w-9 h-9 text-slate-900 dark:text-white flex-shrink-0" />
              <div className="leading-none">
                <span className="font-heading font-black text-lg tracking-tighter uppercase text-slate-900 dark:text-white">
                  NEXORA<span className="text-brand-600">TECH</span>
                </span>
                <p className="text-[9px] font-bold text-slate-400 uppercase tracking-[0.3em] mt-0.5">{t('tagline')}</p>
              </div>
            </div>
            <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed max-w-xs mb-5">{t('description')}</p>
            <div className="flex items-center gap-2 text-xs text-slate-400">
              <MapPin size={12} className="flex-shrink-0" />
              {t('location')}
            </div>
          </div>

          {/* Navegación */}
          <div>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">{t('navTitle')}</p>
            <ul className="space-y-3">
              {NAV_ITEMS.map(({ key, href }) => (
                <li key={key}>
                  <a href={href} className="text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-brand-600 dark:hover:text-brand-400 transition-colors">
                    {tn(key)}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contacto */}
          <div>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">{t('contactTitle')}</p>
            <div className="space-y-3">
              <a
                href="https://www.linkedin.com/in/juan-ramon-moreno-bravo-0830b1271/"
                target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-3 text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                <Linkedin size={15} className="flex-shrink-0" /> {t('linkedinLabel')}
              </a>
              <a
                href="#contacto-form"
                className="flex items-center gap-3 text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-brand-600 dark:hover:text-brand-400 transition-colors"
              >
                <Mail size={15} className="flex-shrink-0" /> {t('formLabel')}
              </a>
            </div>
            <div className="mt-6 inline-flex items-center gap-2 px-3 py-2 bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-100 dark:border-emerald-800 rounded-lg">
              <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
              <span className="text-[10px] font-black text-emerald-700 dark:text-emerald-400 uppercase tracking-widest">{t('available')}</span>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row justify-between items-center gap-4 text-center sm:text-left">
          <p className="text-[11px] font-medium text-slate-400 uppercase tracking-widest">
            © {year} Nexora Tech · {t('copyright')}
          </p>
          <div className="flex items-center gap-4">
            <a href="/privacy" className="text-[11px] font-medium text-slate-400 hover:text-brand-600 dark:hover:text-brand-400 uppercase tracking-widest transition-colors">{t('privacy')}</a>
            <span className="text-slate-200 dark:text-slate-700">·</span>
            <a href="/terms" className="text-[11px] font-medium text-slate-400 hover:text-brand-600 dark:hover:text-brand-400 uppercase tracking-widest transition-colors">{t('terms')}</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
