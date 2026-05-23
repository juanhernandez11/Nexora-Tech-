'use client';

import { useTranslations } from 'next-intl';
import { X, ArrowRight } from 'lucide-react';
import Logo from '@/components/ui/Logo';
import { useApp } from '@/context/AppContext';

const NAV_ITEMS = [
  { key: 'services', href: '#soluciones' },
  { key: 'cases',    href: '#casos-de-exito' },
  { key: 'process',  href: '#proceso' },
  { key: 'contact',  href: '#contacto-form' },
] as const;

const MobileMenu = () => {
  const t = useTranslations('nav');
  const { mobileMenuOpen, setMobileMenuOpen } = useApp();

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    setTimeout(() => {
      const el = document.getElementById(href.replace('#', ''));
      if (el) {
        const top = el.getBoundingClientRect().top + window.pageYOffset - 80;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    }, 300);
  };

  return (
    <div className={`fixed inset-0 z-[60] lg:hidden transition-all duration-500 ${mobileMenuOpen ? 'visible' : 'invisible'}`}>
      <div
        className={`absolute inset-0 bg-slate-900/50 backdrop-blur-sm transition-opacity duration-500 ${mobileMenuOpen ? 'opacity-100' : 'opacity-0'}`}
        onClick={() => setMobileMenuOpen(false)}
      />
      <div className={`absolute right-0 top-0 bottom-0 w-[85%] max-w-sm bg-white dark:bg-slate-900 shadow-2xl transition-transform duration-500 ease-out flex flex-col ${mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="flex justify-between items-center px-7 py-6 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-3">
            <Logo className="w-8 h-8 text-slate-900 dark:text-white" />
            <span className="font-heading font-black text-base tracking-tighter uppercase text-slate-900 dark:text-white">
              NEXORA<span className="text-brand-600">TECH</span>
            </span>
          </div>
          <button onClick={() => setMobileMenuOpen(false)} className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors" aria-label="Cerrar menú">
            <X size={22} className="text-slate-700 dark:text-white" />
          </button>
        </div>

        <nav className="flex flex-col gap-1 px-4 py-6 flex-grow">
          {NAV_ITEMS.map(({ key, href }) => (
            <a
              key={key}
              href={href}
              onClick={(e) => handleClick(e, href)}
              className="text-lg font-black text-slate-900 dark:text-white hover:text-brand-600 dark:hover:text-brand-400 px-3 py-3 rounded-xl hover:bg-brand-50 dark:hover:bg-brand-900/20 transition-all tracking-tight"
            >
              {t(key)}
            </a>
          ))}
        </nav>

        <div className="px-4 pb-8 pt-4 border-t border-slate-100 dark:border-slate-800">
          <a
            href="#contacto-form"
            onClick={(e) => handleClick(e, '#contacto-form')}
            className="w-full bg-brand-600 text-white py-4 rounded-xl font-black uppercase tracking-widest text-sm flex items-center justify-center gap-3 hover:bg-brand-700 transition-colors shadow-brand"
          >
            {t('cta')} <ArrowRight size={16} />
          </a>
        </div>
      </div>
    </div>
  );
};

export default MobileMenu;
