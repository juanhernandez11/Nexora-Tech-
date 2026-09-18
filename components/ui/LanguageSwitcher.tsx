'use client';

import { useLocale } from 'next-intl';
import { useRouter, usePathname } from '@/i18n/navigation';
import { Globe } from 'lucide-react';

const LanguageSwitcher = () => {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname(); // next-intl devuelve el pathname sin prefijo de locale

  const switchLocale = () => {
    const nextLocale = locale === 'es' ? 'en' : 'es';

    // Sincronizar cookie para que middleware y server components estén alineados
    document.cookie = `NEXT_LOCALE=${nextLocale};path=/;max-age=31536000;SameSite=Lax`;

    // router.replace de next-intl: transición client-side sin recarga, sin parpadeo
    router.replace(pathname, { locale: nextLocale });
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
