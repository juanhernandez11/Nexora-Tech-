'use client';

import { useState, useEffect } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import Link from 'next/link';
import { Menu, Moon, Sun } from 'lucide-react';
import Logo from '@/components/ui/Logo';
import LanguageSwitcher from '@/components/ui/LanguageSwitcher';
import { useApp } from '@/context/AppContext';
import GsapMagnetic from '@/components/ui/GsapMagnetic';

const NAV_ITEMS = [
  { key: 'services', href: '/servicios' },
  { key: 'cases',    href: '#casos-de-exito' },
  { key: 'process',  href: '#proceso' },
  { key: 'blog',     href: '/blog' },
] as const;

const Navbar = () => {
  const t = useTranslations('nav');
  const locale = useLocale();
  const { darkMode, setDarkMode, setMobileMenuOpen } = useApp();
  const homeHref = locale === 'en' ? '/en' : '/';
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollTo = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (!href.startsWith('#')) return;
    e.preventDefault();
    const el = document.getElementById(href.replace('#', ''));
    if (el) {
      window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 80, behavior: 'smooth' });
    }
  };

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/80 dark:bg-black/80 backdrop-blur-xl border-b border-black/[0.08] dark:border-white/[0.08] shadow-sm dark:shadow-2xl dark:shadow-black/60'
          : 'bg-white/40 dark:bg-black/30 backdrop-blur-md border-b border-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 sm:h-20 flex items-center justify-between">

        {/* Logo */}
        <Link href={homeHref} className="flex items-center gap-2.5 group" aria-label="Inicio">
          <div className="p-1.5 rounded-xl bg-[#0071e3]/10 dark:bg-white/10 border border-[#0071e3]/20 dark:border-white/15 group-hover:border-[#0071e3]/40 dark:group-hover:border-white/30 transition-all">
            <Logo className="w-5 h-5 text-[#0071e3] dark:text-[#2997ff] group-hover:scale-105 transition-transform" />
          </div>
          <span className="font-heading font-black text-base tracking-tight text-[#1d1d1f] dark:text-white">
            NEXORA<span className="text-[#0071e3] dark:text-[#2997ff]">/TECH</span>
          </span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden lg:flex items-center gap-6">
          <div className="flex items-center gap-1 bg-black/[0.04] dark:bg-white/[0.05] border border-black/[0.06] dark:border-white/[0.08] rounded-full px-4 py-1.5 backdrop-blur-md">
            {NAV_ITEMS.map(({ key, href }) =>
              href.startsWith('#') ? (
                <a
                  key={key}
                  href={href}
                  onClick={(e) => scrollTo(e, href)}
                  className="text-xs font-semibold tracking-wider uppercase text-[#1d1d1f]/75 dark:text-slate-300 hover:text-[#1d1d1f] dark:hover:text-white hover:bg-black/[0.04] dark:hover:bg-white/[0.08] px-3.5 py-1.5 rounded-full transition-all"
                >
                  {t(key)}
                </a>
              ) : (
                <Link
                  key={key}
                  href={`${locale === 'en' ? '/en' : ''}${href}`}
                  className="text-xs font-semibold tracking-wider uppercase text-[#1d1d1f]/75 dark:text-slate-300 hover:text-[#1d1d1f] dark:hover:text-white hover:bg-black/[0.04] dark:hover:bg-white/[0.08] px-3.5 py-1.5 rounded-full transition-all"
                >
                  {t(key)}
                </Link>
              )
            )}
          </div>

          <GsapMagnetic strength={0.25}>
            <a
              href="#contacto-form"
              onClick={(e) => scrollTo(e, '#contacto-form')}
              className="text-xs font-medium bg-[#0071e3] hover:bg-[#0077ed] text-white px-5 py-2.5 rounded-full transition-all shadow-sm shadow-[#0071e3]/20"
            >
              {t('cta')}
            </a>
          </GsapMagnetic>

          <div className="flex items-center gap-2 pl-2 border-l border-black/[0.1] dark:border-white/[0.1]">
            <LanguageSwitcher />

            <button
              onClick={() => setDarkMode(v => !v)}
              aria-label={darkMode ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
              title={darkMode ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
              className="p-2 rounded-full text-[#1d1d1f]/70 dark:text-slate-400 hover:text-[#1d1d1f] dark:hover:text-white hover:bg-black/[0.06] dark:hover:bg-white/[0.08] transition-all"
            >
              {darkMode ? <Sun size={17} className="text-[#1d1d1f] dark:text-[#f5f5f7]" /> : <Moon size={17} className="text-[#1d1d1f] dark:text-[#f5f5f7]" />}
            </button>
          </div>
        </div>

        {/* Mobile */}
        <div className="flex items-center gap-1.5 lg:hidden">
          <LanguageSwitcher />
          <button
            onClick={() => setDarkMode(v => !v)}
            aria-label={darkMode ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
            className="p-2 rounded-full text-[#1d1d1f]/80 dark:text-slate-300 hover:text-[#1d1d1f] dark:hover:text-white transition-colors"
          >
            {darkMode ? <Sun size={17} className="text-[#1d1d1f] dark:text-[#f5f5f7]" /> : <Moon size={17} className="text-[#1d1d1f] dark:text-[#f5f5f7]" />}
          </button>
          <button
            onClick={() => setMobileMenuOpen(true)}
            aria-label="Abrir menú"
            className="p-2 text-[#1d1d1f] dark:text-[#f5f5f7]"
          >
            <Menu size={22} />
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
