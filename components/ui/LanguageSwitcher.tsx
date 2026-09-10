'use client';

import { useLocale } from 'next-intl';
import { useRouter, usePathname } from '@/i18n/navigation';
import { Globe } from 'lucide-react';

const LanguageSwitcher = () => {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const switchLocale = () => {
    const nextLocale = locale === 'es' ? 'en' : 'es';
    router.replace(pathname, { locale: nextLocale });
  };

  return (
    <button
      onClick={switchLocale}
      aria-label={locale === 'es' ? 'Switch to English' : 'Cambiar a Español'}
      className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium text-[#1d1d1f]/80 dark:text-slate-300 hover:text-[#0071e3] dark:hover:text-[#2997ff] hover:bg-black/[0.04] dark:hover:bg-white/[0.08] transition-colors"
    >
      <Globe size={13} />
      <span>{locale === 'es' ? 'EN' : 'ES'}</span>
    </button>
  );
};

export default LanguageSwitcher;
