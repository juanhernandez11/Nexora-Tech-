'use client';

import { useState, useEffect } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
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

export default function Navbar() {
  const t = useTranslations('nav');
  const locale = useLocale();
  const pathname = usePathname();
  const { setMobileMenuOpen, darkMode, toggleTheme } = useApp();
  const homeHref = locale === 'en' ? '/en' : '/';
  const isHomePage = pathname === '/' || pathname === '/en' || pathname === '/es';
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav
      data-scrolled={scrolled}
      className={`theme-nav fixed w-full z-50 transition-all duration-300 ${
        scrolled
          ? 'theme-surface bg-black/80 backdrop-blur-2xl border-b border-white/[0.06]'
          : 'bg-transparent border-b border-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 sm:h-18 flex items-center justify-between">

        {/* Logo */}
        <Link href={homeHref} className="flex items-center gap-2.5 group" aria-label="Inicio">
          <div className="p-1.5 rounded-lg bg-white/[0.06] border border-white/[0.1] group-hover:border-white/20 transition-all">
            <Logo className="w-4.5 h-4.5 text-white" />
          </div>
          <span className="font-heading font-black text-sm tracking-[-0.03em] text-white">
            NEXORA<span className="text-white/30">/</span><span className="text-[#2997ff]">TECH</span>
          </span>
        </Link>

        {/* Desktop nav pill */}
        <div className="hidden lg:flex items-center gap-1 bg-white/[0.04] border border-white/[0.08] rounded-full px-1.5 py-1.5 backdrop-blur-md">
          {NAV_ITEMS.map(({ key, href }) => (
            <Link
              key={key}
              href={href.startsWith('#')
                ? (isHomePage ? href : `${homeHref}${href}`)
                : `${locale === 'en' ? '/en' : ''}${href}`}
              className="px-4 py-1.5 text-xs font-semibold tracking-wide text-white/50 hover:text-white hover:bg-white/[0.06] rounded-full transition-all duration-200"
            >
              {t(key)}
            </Link>
          ))}
        </div>

        {/* Right side */}
        <div className="hidden lg:flex items-center gap-3">
          <button
            type="button"
            onClick={(event) => toggleTheme({ x: event.clientX, y: event.clientY })}
            aria-label={darkMode ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
            title={darkMode ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
            className="rounded-full p-2 text-white/60 transition-colors hover:bg-white/[0.08] hover:text-white"
          >
            {darkMode ? <Sun size={17} /> : <Moon size={17} />}
          </button>
          <LanguageSwitcher />
          <Link
            href={isHomePage ? '#contacto-form' : `${homeHref}#contacto-form`}
            className="text-xs font-bold bg-white text-black px-5 py-2.5 rounded-full transition-all hover:bg-white/90 hover:scale-[1.02] active:scale-[0.98]"
          >
            {t('cta')}
          </Link>
        </div>

        {/* Mobile */}
        <div className="flex items-center gap-2 lg:hidden">
          <LanguageSwitcher />
          <button
            type="button"
            onClick={() => setMobileMenuOpen(true)}
            aria-label="Abrir menú"
            className="p-2 text-white/60 hover:text-white transition-colors"
          >
            <Menu size={20} />
          </button>
        </div>
      </div>
    </nav>
  );
}
