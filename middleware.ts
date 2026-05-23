import createMiddleware from 'next-intl/middleware';

export default createMiddleware({
  locales: ['es', 'en'],
  defaultLocale: 'es',
  localePrefix: 'as-needed', // /es es default sin prefijo, /en con prefijo
});

export const config = {
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)'],
};
