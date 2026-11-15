import { useTranslations, useLocale } from 'next-intl';
import Link from 'next/link';
import { Linkedin, MapPin, Mail, ArrowUpRight } from 'lucide-react';
import Logo from '@/components/ui/Logo';

const NAV_ITEMS = [
  { key: 'services', href: '/servicios' },
  { key: 'faq', href: '/faq' },
  { key: 'blog', href: '/blog' },
  { key: 'cases', href: '#casos-de-exito' },
  { key: 'process', href: '#proceso' },
] as const;

export default function Footer() {
  const t = useTranslations('footer');
  const tn = useTranslations('nav');
  const locale = useLocale();
  const year = new Date().getFullYear();
  const base = locale === 'en' ? '/en' : '';

  return (
    <footer className="theme-surface relative overflow-hidden bg-[#000] border-t border-white/[0.06] text-white/40">

      {/* Orbit glow */}
      <div className="pointer-events-none absolute -bottom-40 left-1/2 -translate-x-1/2 w-[800px] h-[400px] rounded-full bg-[#2997ff]/5 blur-[120px]" />

      {/* Grid */}
      <div className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.015) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.015) 1px, transparent 1px)',
          backgroundSize: '48px 48px',
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 pt-16 pb-8">

        {/* CTA band */}
        <div className="mb-16 p-8 sm:p-10 rounded-2xl border border-white/[0.06] bg-white/[0.02] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div>
            <h3 className="text-xl sm:text-2xl font-black tracking-[-0.03em] text-white mb-1">
              ¿Listo para empezar?
            </h3>
            <p className="text-sm text-white/30">Consultoría gratuita · Respuesta en 24h</p>
          </div>
          <a
            href="#contacto-form"
            className="inline-flex items-center gap-2 bg-white text-black text-sm font-bold px-6 py-3.5 rounded-full transition-all hover:bg-white/90 hover:scale-[1.02] shrink-0"
          >
            {tn('cta')} <ArrowUpRight size={15} />
          </a>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 mb-14">
          {/* Brand */}
          <div className="col-span-2">
            <Link href={base || '/'} className="inline-flex items-center gap-2.5 mb-5 group">
              <div className="p-1.5 rounded-lg bg-white/[0.06] border border-white/[0.08]">
                <Logo className="w-4 h-4 text-white" />
              </div>
              <span className="font-heading font-black text-sm tracking-[-0.03em] text-white">
                NEXORA<span className="text-white/20">/</span><span className="text-[#2997ff]">TECH</span>
              </span>
            </Link>
            <p className="text-xs text-white/30 leading-relaxed max-w-xs mb-5">
              {t('description')}
            </p>
            <div className="inline-flex items-center gap-2 text-xs text-white/30 bg-white/[0.04] px-3 py-1.5 rounded-full border border-white/[0.06]">
              <MapPin size={11} className="text-[#2997ff] shrink-0" />
              {t('location')}
            </div>
          </div>

          {/* Nav */}
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/20 mb-4">{t('navTitle')}</p>
            <ul className="space-y-2.5">
              {NAV_ITEMS.map(({ key, href }) => (
                <li key={key}>
                  <Link
                    href={href.startsWith('#') ? `${base}/${href}` : `${base}${href}`}
                    className="text-xs text-white/30 hover:text-white transition-colors"
                  >
                    {tn(key)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/20 mb-4">{t('contactTitle')}</p>
            <div className="space-y-3">
              <a
                href="https://www.linkedin.com/company/nexoratech-tehuacan"
                target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-2 text-xs text-white/30 hover:text-white transition-colors"
              >
                <Linkedin size={12} className="text-[#2997ff]" />
                {t('linkedinLabel')}
              </a>
              <a
                href={`${base}/#contacto-form`}
                className="flex items-center gap-2 text-xs text-white/30 hover:text-white transition-colors"
              >
                <Mail size={12} className="text-[#2997ff]" />
                {t('formLabel')}
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-6 border-t border-white/[0.06] flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-[11px] text-white/20">
            © {year} Nexora Tech · {t('copyright')}
          </p>
          <div className="flex items-center gap-6 text-[11px] text-white/20">
            <a href={`${base}/privacy`} className="hover:text-white transition-colors">{t('privacy')}</a>
            <a href={`${base}/terms`} className="hover:text-white transition-colors">{t('terms')}</a>
            <a href={`${base}/cookies`} className="hover:text-white transition-colors">{t('cookies')}</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
