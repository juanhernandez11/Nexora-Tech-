'use client';

import { useLocale } from 'next-intl';
import { Globe } from 'lucide-react';

const getCleanPath = (pathname: string): string => {
  if (!pathname) return '/';
  // Strip leading /es or /en (optionally followed by / or end of string)
  let clean = pathname.replace(/^\/(?:es|en)(?=\/|$)/, '');
  if (!clean || !clean.startsWith('/')) clean = '/' + clean;
  return clean;
};

const getTargetLocaleUrl = (currentPathname: string, nextLocale: 'es' | 'en'): string => {
  const clean = getCleanPath(currentPathname);
  if (nextLocale === 'en') {
    return clean === '/' ? '/en' : `/en${clean}`;
  }
  return clean;
};

const LanguageSwitcher = () => {
  const locale = useLocale();

  const switchLocale = (e?: React.MouseEvent) => {
    if (e) e.preventDefault();
    const nextLocale = locale === 'es' ? 'en' : 'es';
    const currentPath = typeof window !== 'undefined' ? window.location.pathname : '/';
    const targetUrl = getTargetLocaleUrl(currentPath, nextLocale);
    const search = typeof window !== 'undefined' ? window.location.search : '';
    const hash = typeof window !== 'undefined' ? window.location.hash : '';

    // Synchronize NEXT_LOCALE cookie so server components and middleware align
    if (typeof document !== 'undefined') {
      document.cookie = `NEXT_LOCALE=${nextLocale};path=/;max-age=31536000;SameSite=Lax`;
    }

    if (typeof window !== 'undefined') {
      window.location.assign(`${targetUrl}${search}${hash}`);
    }
  };

  return (
    <button
      type="button"
      onClick={switchLocale}
      aria-label={locale === 'es' ? 'Switch to English' : 'Cambiar a Español'}
      className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium text-[#1d1d1f]/80 dark:text-slate-300 hover:text-[#0071e3] dark:hover:text-[#2997ff] hover:bg-black/[0.04] dark:hover:bg-white/[0.08] transition-colors cursor-pointer"
    >
      <Globe size={13} />
      <span>{locale === 'es' ? 'EN' : 'ES'}</span>
    </button>
  );
};

export default LanguageSwitcher;
