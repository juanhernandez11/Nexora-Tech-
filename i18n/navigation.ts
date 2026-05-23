import { createSharedPathnamesNavigation } from 'next-intl/navigation';

export const { useRouter, usePathname, Link, redirect } = createSharedPathnamesNavigation({
  locales: ['es', 'en'] as const,
  localePrefix: 'as-needed',
});
