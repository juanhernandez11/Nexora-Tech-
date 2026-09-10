import { useTranslations, useLocale } from 'next-intl';
import Link from 'next/link';
import { Linkedin, MapPin, Mail } from 'lucide-react';
import Logo from '@/components/ui/Logo';

const NAV_ITEMS = [
  { key: 'services', href: '/servicios' },
  { key: 'faq', href: '/faq' },
  { key: 'blog', href: '/blog' },
  { key: 'cases', href: '#casos-de-exito' },
  { key: 'process', href: '#proceso' },
] as const;

const Footer = () => {
  const t = useTranslations('footer');
  const tn = useTranslations('nav');
  const locale = useLocale();
  const year = new Date().getFullYear();
  const base = locale === 'en' ? '/en' : '';

  return (
    <footer className="bg-[#f5f5f7] dark:bg-[#161617] border-t border-black/[0.06] dark:border-white/[0.08] text-[#86868b] dark:text-slate-400 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-14">
          {/* Marca */}
          <div className="lg:col-span-2">
            <Link href={base || '/'} className="inline-flex items-center gap-2.5 mb-4 group">
              <div className="p-2 rounded-2xl bg-white dark:bg-white/10 border border-black/[0.06] dark:border-white/[0.1] shadow-xs">
                <Logo className="w-5 h-5 text-[#0071e3] dark:text-[#2997ff]" />
              </div>
              <span className="font-heading font-bold text-base tracking-tight text-[#1d1d1f] dark:text-white">
                NEXORA<span className="text-[#0071e3] dark:text-[#2997ff]">/TECH</span>
              </span>
            </Link>
            <p className="text-xs sm:text-sm text-[#86868b] dark:text-slate-400 leading-relaxed max-w-sm mb-5">
              {t('description')}
            </p>
            <div className="inline-flex items-center gap-2 text-xs text-[#1d1d1f] dark:text-slate-300 bg-black/[0.04] dark:bg-white/[0.08] px-3.5 py-1.5 rounded-full border border-black/[0.06] dark:border-white/[0.08]">
              <MapPin size={13} className="shrink-0 text-[#0071e3] dark:text-[#2997ff]" />
              <span>{t('location')}</span>
            </div>
          </div>

          {/* Navegación */}
          <div>
            <p className="text-xs uppercase tracking-wider text-[#1d1d1f] dark:text-white mb-4 font-semibold">{t('navTitle')}</p>
            <ul className="space-y-2.5">
              {NAV_ITEMS.map(({ key, href }) => (
                <li key={key}>
                  <Link
                    href={href.startsWith('#') ? `${base}/${href}` : `${base}${href}`}
                    className="text-xs text-[#86868b] dark:text-slate-400 hover:text-[#1d1d1f] dark:hover:text-white transition-colors"
                  >
                    {tn(key)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contacto */}
          <div>
            <p className="text-xs uppercase tracking-wider text-[#1d1d1f] dark:text-white mb-4 font-semibold">{t('contactTitle')}</p>
            <div className="space-y-3">
              <a
                href="https://www.linkedin.com/in/juan-ramon-moreno-bravo-0830b1271/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 text-xs text-[#86868b] dark:text-slate-400 hover:text-[#0071e3] dark:hover:text-white transition-colors"
              >
                <Linkedin size={14} className="shrink-0 text-[#0071e3] dark:text-[#2997ff]" />
                <span>{t('linkedinLabel')}</span>
              </a>
              <a
                href={`${base}/#contacto-form`}
                className="flex items-center gap-2.5 text-xs text-[#86868b] dark:text-slate-400 hover:text-[#0071e3] dark:hover:text-white transition-colors"
              >
                <Mail size={14} className="shrink-0 text-[#0071e3] dark:text-[#2997ff]" />
                <span>{t('formLabel')}</span>
              </a>
            </div>
          </div>
        </div>

        {/* Pie inferior estilo Apple */}
        <div className="pt-8 border-t border-black/[0.06] dark:border-white/[0.08] flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xs text-[#86868b] dark:text-slate-500">
            © {year} Nexora Tech · {t('copyright')}
          </p>
          <div className="flex items-center gap-6 text-xs text-[#86868b] dark:text-slate-400">
            <a href={`${base}/privacy`} className="hover:text-[#1d1d1f] dark:hover:text-white transition-colors">{t('privacy')}</a>
            <a href={`${base}/terms`} className="hover:text-[#1d1d1f] dark:hover:text-white transition-colors">{t('terms')}</a>
            <a href={`${base}/cookies`} className="hover:text-[#1d1d1f] dark:hover:text-white transition-colors">{t('cookies')}</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
