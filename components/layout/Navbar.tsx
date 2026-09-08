'use client';

import { useState, useEffect } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import Link from 'next/link';
import { Menu, Moon, Sun } from 'lucide-react';
import Logo from '@/components/ui/Logo';
import LanguageSwitcher from '@/components/ui/LanguageSwitcher';
import { useApp } from '@/context/AppContext';

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
      window.scrollTo({ top: el.getBoundingClientRect().top + window.pageYOffset - 80, behavior: 'smooth' });
    }
  };

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#f4f1e9]/95 dark:bg-[#11150f]/95 backdrop-blur-md border-b border-[#d8d8ca] dark:border-[#273022]'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">

        {/* Logo */}
        <Link href={homeHref} className="flex items-center gap-2.5" aria-label="Inicio">
          <Logo className="w-7 h-7 text-slate-900 dark:text-white" />
          <span className="font-heading font-bold text-base tracking-tight text-slate-900 dark:text-white">
            NEXORA<span className="text-brand-600">/TECH</span>
          </span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden lg:flex items-center gap-6">
          {NAV_ITEMS.map(({ key, href }) =>
            href.startsWith('#') ? (
              <a
                key={key}
                href={href}
                onClick={(e) => scrollTo(e, href)}
                className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
              >
                {t(key)}
              </a>
            ) : (
              <Link
                key={key}
                href={`${locale === 'en' ? '/en' : ''}${href}`}
                className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
              >
                {t(key)}
              </Link>
            )
          )}

          <a
            href="#contacto-form"
            onClick={(e) => scrollTo(e, '#contacto-form')}
            className="text-xs font-bold uppercase tracking-[0.12em] bg-slate-900 dark:bg-brand-500 text-white dark:text-slate-950 px-4 py-2.5 rounded-none hover:bg-brand-600 dark:hover:bg-brand-400 transition-colors"
          >
            {t('cta')}
          </a>

          <LanguageSwitcher />

          <button
            onClick={() => setDarkMode(v => !v)}
            aria-label={darkMode ? 'Modo claro' : 'Modo oscuro'}
            className="p-1.5 rounded-md text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 transition-colors"
          >
            {darkMode ? <Sun size={16} /> : <Moon size={16} />}
          </button>
        </div>

        {/* Mobile */}
        <div className="flex items-center gap-2 lg:hidden">
          <LanguageSwitcher />
          <button
            onClick={() => setDarkMode(v => !v)}
            aria-label={darkMode ? 'Modo claro' : 'Modo oscuro'}
            className="p-1.5 rounded-md text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 transition-colors"
          >
            {darkMode ? <Sun size={16} /> : <Moon size={16} />}
          </button>
          <button
            onClick={() => setMobileMenuOpen(true)}
            aria-label="Abrir menú"
            className="p-1.5 text-slate-700 dark:text-slate-200"
          >
            <Menu size={22} />
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
