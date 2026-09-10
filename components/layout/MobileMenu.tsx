'use client';

import { useTranslations, useLocale } from 'next-intl';
import Link from 'next/link';
import { X, ArrowRight, Sun, Moon } from 'lucide-react';
import Logo from '@/components/ui/Logo';
import { useApp } from '@/context/AppContext';
import LanguageSwitcher from '@/components/ui/LanguageSwitcher';

const NAV_ITEMS = [
  { key: 'services', href: '/servicios' },
  { key: 'cases',    href: '#casos-de-exito' },
  { key: 'process',  href: '#proceso' },
  { key: 'contact',  href: '#contacto-form' },
] as const;

const MobileMenu = () => {
  const t = useTranslations('nav');
  const locale = useLocale();
  const { mobileMenuOpen, setMobileMenuOpen, darkMode, setDarkMode } = useApp();

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (!href.startsWith('#')) {
      setMobileMenuOpen(false);
      return;
    }
    e.preventDefault();
    setMobileMenuOpen(false);
    setTimeout(() => {
      const el = document.getElementById(href.replace('#', ''));
      if (el) {
        const top = el.getBoundingClientRect().top + window.pageYOffset - 80;
        window.scrollTo({ top, behavior: 'smooth' });
      } else {
        window.location.href = locale === 'en' ? `/en/${href}` : `/${href}`;
      }
    }, 300);
  };

  return (
    <div className={`fixed inset-0 z-[60] lg:hidden transition-all duration-500 ${mobileMenuOpen ? 'visible' : 'invisible'}`}>
      <div
        className={`absolute inset-0 bg-black/40 backdrop-blur-md transition-opacity duration-500 ${mobileMenuOpen ? 'opacity-100' : 'opacity-0'}`}
        onClick={() => setMobileMenuOpen(false)}
      />
      <div className={`absolute right-0 top-0 bottom-0 w-[85%] max-w-sm bg-[#fbfbfd] dark:bg-[#161617] border-l border-black/[0.06] dark:border-white/[0.08] shadow-2xl transition-transform duration-500 ease-out flex flex-col ${mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="flex justify-between items-center px-7 py-6 border-b border-black/[0.06] dark:border-white/[0.08]">
          <div className="flex items-center gap-2.5">
            <div className="p-1.5 rounded-xl bg-black/[0.04] dark:bg-white/[0.08]">
              <Logo className="w-5 h-5 text-[#0071e3] dark:text-[#2997ff]" />
            </div>
            <span className="font-heading font-bold text-base tracking-tight uppercase text-[#1d1d1f] dark:text-white">
              NEXORA<span className="text-[#0071e3] dark:text-[#2997ff]">TECH</span>
            </span>
          </div>
          <button onClick={() => setMobileMenuOpen(false)} className="p-2 hover:bg-black/[0.05] dark:hover:bg-white/[0.1] rounded-full transition-colors" aria-label="Cerrar menú">
            <X size={20} className="text-[#1d1d1f] dark:text-white" />
          </button>
        </div>

        <nav className="flex flex-col gap-1 px-5 py-6 flex-grow">
          {NAV_ITEMS.map(({ key, href }) => href.startsWith('#') ? (
            <a
              key={key}
              href={href}
              onClick={(e) => handleClick(e, href)}
              className="text-lg font-bold text-[#1d1d1f] dark:text-white hover:text-[#0071e3] dark:hover:text-[#2997ff] px-3 py-3 rounded-2xl hover:bg-black/[0.03] dark:hover:bg-white/[0.05] transition-all tracking-tight"
            >
              {t(key)}
            </a>
          ) : (
            <Link
              key={key}
              href={`${locale === 'en' ? '/en' : ''}${href}`}
              onClick={() => setMobileMenuOpen(false)}
              className="text-lg font-bold text-[#1d1d1f] dark:text-white hover:text-[#0071e3] dark:hover:text-[#2997ff] px-3 py-3 rounded-2xl hover:bg-black/[0.03] dark:hover:bg-white/[0.05] transition-all tracking-tight"
            >
              {t(key)}
            </Link>
          ))}
          <Link
            href={locale === 'en' ? '/en/blog' : '/blog'}
            onClick={() => setMobileMenuOpen(false)}
            className="text-lg font-bold text-[#1d1d1f] dark:text-white hover:text-[#0071e3] dark:hover:text-[#2997ff] px-3 py-3 rounded-2xl hover:bg-black/[0.03] dark:hover:bg-white/[0.05] transition-all tracking-tight"
          >
            {t('blog')}
          </Link>
        </nav>

        <div className="px-6 pb-8 pt-4 border-t border-black/[0.06] dark:border-white/[0.08] space-y-4">
          <div className="flex items-center justify-between px-1">
            <span className="text-xs text-[#86868b] dark:text-slate-400 font-medium">Preferencias</span>
            <div className="flex items-center gap-2">
              <LanguageSwitcher />
              <button
                onClick={() => setDarkMode(v => !v)}
                aria-label={darkMode ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
                className="p-2 rounded-full text-[#1d1d1f]/80 dark:text-slate-300 hover:text-[#1d1d1f] dark:hover:text-white hover:bg-black/[0.04] dark:hover:bg-white/[0.08] transition-colors"
              >
                {darkMode ? <Sun size={17} className="text-[#1d1d1f] dark:text-[#f5f5f7]" /> : <Moon size={17} className="text-[#1d1d1f] dark:text-[#f5f5f7]" />}
              </button>
            </div>
          </div>

          <a
            href="#contacto-form"
            onClick={(e) => handleClick(e, '#contacto-form')}
            className="w-full bg-[#0071e3] hover:bg-[#0077ed] text-white py-3.5 rounded-full font-medium text-sm flex items-center justify-center gap-2 shadow-sm shadow-[#0071e3]/20 transition-all group"
          >
            <span>{t('cta')}</span>
            <ArrowRight size={16} className="group-hover:translate-x-0.5 transition-transform" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default MobileMenu;
