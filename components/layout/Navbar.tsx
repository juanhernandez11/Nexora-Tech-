'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { Menu, Moon, Sun } from 'lucide-react';
import Logo from '@/components/ui/Logo';
import LanguageSwitcher from '@/components/ui/LanguageSwitcher';
import { useApp } from '@/context/AppContext';

const NAV_ITEMS = [
  { key: 'services', href: '#soluciones' },
  { key: 'cases',    href: '#casos-de-exito' },
  { key: 'process',  href: '#proceso' },
  { key: 'contact',  href: '#contacto-form' },
] as const;

const Navbar = () => {
  const t = useTranslations('nav');
  const { darkMode, setDarkMode, setMobileMenuOpen } = useApp();
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 50);
      const ids = ['soluciones', 'casos-de-exito', 'proceso', 'contacto-form'];
      let current = '';
      for (const id of ids) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= 120) current = id;
      }
      setActiveSection(current);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollTo = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const id = href.replace('#', '');
    const el = document.getElementById(id);
    if (el) {
      const top = el.getBoundingClientRect().top + window.pageYOffset - 80;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  };

  return (
    <nav className={`fixed w-full z-50 transition-all duration-500 ${
      scrolled
        ? 'bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl border-b border-slate-100 dark:border-slate-800 py-3 shadow-sm'
        : 'bg-transparent py-5'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex justify-between items-center">

        {/* Logo */}
        <a
          href="/"
          onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
          className="flex items-center gap-3 cursor-pointer"
          aria-label="Ir al inicio"
        >
          <Logo className="w-9 h-9 text-slate-900 dark:text-white" />
          <div className="flex flex-col leading-none">
            <span className="font-heading font-black text-lg tracking-tighter uppercase text-slate-900 dark:text-white">
              NEXORA<span className="text-brand-600">TECH</span>
            </span>
            <span className="text-[9px] font-bold text-slate-400 uppercase tracking-[0.3em] mt-0.5">{t('tagline')}</span>
          </div>
        </a>

        {/* Desktop nav */}
        <div className="hidden lg:flex items-center gap-7">
          {NAV_ITEMS.map(({ key, href }) => (
            <a
              key={key}
              href={href}
              onClick={(e) => scrollTo(e, href)}
              aria-current={activeSection === href.replace('#', '') ? 'page' : undefined}
              className={`text-[11px] font-black uppercase tracking-widest transition-colors ${
                activeSection === href.replace('#', '')
                  ? 'text-brand-600'
                  : 'text-slate-500 dark:text-slate-400 hover:text-brand-600 dark:hover:text-brand-400'
              }`}
            >
              {t(key)}
            </a>
          ))}

          <a
            href="#contacto-form"
            onClick={(e) => scrollTo(e, '#contacto-form')}
            className="bg-brand-600 text-white px-6 py-2.5 rounded-xl text-[11px] font-black uppercase tracking-widest hover:bg-brand-700 transition-all shadow-brand hover:shadow-brand-lg active:scale-95"
          >
            {t('cta')}
          </a>

          <LanguageSwitcher />

          <button
            onClick={() => setDarkMode(v => !v)}
            aria-label={darkMode ? 'Activar modo claro' : 'Activar modo oscuro'}
            className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            {darkMode ? <Sun size={17} className="text-yellow-400" /> : <Moon size={17} className="text-slate-500" />}
          </button>
        </div>

        {/* Mobile controls */}
        <div className="flex items-center gap-2 lg:hidden">
          <LanguageSwitcher />
          <button
            onClick={() => setDarkMode(v => !v)}
            aria-label={darkMode ? 'Activar modo claro' : 'Activar modo oscuro'}
            className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            {darkMode ? <Sun size={17} className="text-yellow-400" /> : <Moon size={17} className="text-slate-500 dark:text-slate-400" />}
          </button>
          <button
            className="p-2 text-slate-900 dark:text-white hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl"
            onClick={() => setMobileMenuOpen(true)}
            aria-label="Abrir menú"
          >
            <Menu size={26} />
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
