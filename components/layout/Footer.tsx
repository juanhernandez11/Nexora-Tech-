import { useTranslations, useLocale } from 'next-intl';
import Link from 'next/link';
import { Linkedin, MapPin, Mail } from 'lucide-react';
import Logo from '@/components/ui/Logo';

const NAV_ITEMS = [
  { key: 'services', href: '/servicios' },
  { key: 'faq',      href: '/faq' },
  { key: 'blog',     href: '/blog' },
  { key: 'cases',    href: '#casos-de-exito' },
  { key: 'process',  href: '#proceso' },
] as const;

const Footer = () => {
  const t      = useTranslations('footer');
  const tn     = useTranslations('nav');
  const locale = useLocale();
  const year   = new Date().getFullYear();
  const base   = locale === 'en' ? '/en' : '';

  return (
    <footer className="bg-white dark:bg-slate-950 border-t border-slate-100 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-14">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-10">

          {/* Marca */}
          <div className="lg:col-span-2">
            <Link href={base || '/'} className="inline-flex items-center gap-2.5 mb-4">
              <Logo className="w-7 h-7 text-slate-900 dark:text-white" />
              <span className="font-heading font-black text-base tracking-tight text-slate-900 dark:text-white">
                NEXORA<span className="text-brand-600">TECH</span>
              </span>
            </Link>
            <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed max-w-xs mb-4">
              {t('description')}
            </p>
            <div className="flex items-center gap-1.5 text-xs text-slate-400 dark:text-slate-500">
              <MapPin size={11} className="shrink-0" />
              {t('location')}
            </div>
          </div>

          {/* Navegación */}
          <div>
            <p className="text-xs font-semibold text-slate-400 dark:text-slate-500 mb-4">{t('navTitle')}</p>
            <ul className="space-y-2.5">
              {NAV_ITEMS.map(({ key, href }) => (
                <li key={key}>
                  <Link
                    href={href.startsWith('#') ? `${base}/${href}` : `${base}${href}`}
                    className="text-sm text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
                  >
                    {tn(key)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contacto */}
          <div>
            <p className="text-xs font-semibold text-slate-400 dark:text-slate-500 mb-4">{t('contactTitle')}</p>
            <div className="space-y-2.5">
              <a
                href="https://www.linkedin.com/in/juan-ramon-moreno-bravo-0830b1271/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
              >
                <Linkedin size={13} className="shrink-0" /> {t('linkedinLabel')}
              </a>
              <a
                href={`${base}/#contacto-form`}
                className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
              >
                <Mail size={13} className="shrink-0" /> {t('formLabel')}
              </a>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-8 border-t border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row justify-between items-center gap-3">
          <p className="text-xs text-slate-400 dark:text-slate-500">
            © {year} Nexora Tech · {t('copyright')}
          </p>
          <div className="flex items-center gap-4">
            <a href={`${base}/privacy`} className="text-xs text-slate-400 dark:text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 transition-colors">{t('privacy')}</a>
            <a href={`${base}/terms`}   className="text-xs text-slate-400 dark:text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 transition-colors">{t('terms')}</a>
            <a href={`${base}/cookies`} className="text-xs text-slate-400 dark:text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 transition-colors">{t('cookies')}</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
