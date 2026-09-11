import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, getTranslations, setRequestLocale } from 'next-intl/server';
import { AppProvider } from '@/context/AppContext';
import GoogleAnalytics from '@/components/GoogleAnalytics';
import ClientGuard from '@/lib/client-guard';
import '../globals.css';

const locales = ['es', 'en'];

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: { locale?: string };
}): Promise<Metadata> {
  const locale = params?.locale && locales.includes(params.locale) ? params.locale : 'es';
  const t = await getTranslations({ locale, namespace: 'meta' });
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://nexorate.netlify.app';
  const canonicalUrl = locale === 'es' ? baseUrl : `${baseUrl}/${locale}`;

  return {
    title: t('title'),
    description: t('description'),
    metadataBase: new URL(baseUrl),
    icons: {
      icon: [
        { url: '/favicon.svg', type: 'image/svg+xml' },
      ],
      apple: '/favicon.svg',
      shortcut: '/favicon.svg',
    },
    alternates: {
      canonical: canonicalUrl,
      languages: {
        'es': baseUrl,
        'en': `${baseUrl}/en`,
        'x-default': baseUrl,
      },
    },
    openGraph: {
      type: 'website',
      url: canonicalUrl,
      title: t('ogTitle'),
      description: t('ogDescription'),
      images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: t('ogTitle') }],
      locale: locale === 'es' ? 'es_MX' : 'en_US',
    },
    twitter: {
      card: 'summary_large_image',
      title: t('ogTitle'),
      description: t('ogDescription'),
      images: ['/og-image.jpg'],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true, 'max-image-preview': 'large' },
    },
  };
}

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://nexorate.netlify.app';

// Schema WebSite con SearchAction — habilita Sitelinks Search Box en Google
const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': `${SITE_URL}/#website`,
  name: 'Nexora Tech',
  url: SITE_URL,
  description: 'Desarrollo de software a medida, automatización empresarial e integración de IA para empresas en México.',
  inLanguage: ['es-MX', 'en-US'],
  publisher: { '@id': `${SITE_URL}/#organization` },
  potentialAction: {
    '@type': 'SearchAction',
    target: { '@type': 'EntryPoint', urlTemplate: `${SITE_URL}/blog?q={search_term_string}` },
    'query-input': 'required name=search_term_string',
  },
};

const jsonLd = [
  {
    '@context': 'https://schema.org',
    '@type': ['Organization', 'LocalBusiness'],
    '@id': `${SITE_URL}/#organization`,
    name: 'Nexora Tech',
    legalName: 'Nexora Tech Solutions',
    description: 'Empresa especializada en desarrollo de software a medida, automatización empresarial e integración de inteligencia artificial para PyMEs y corporativos en México.',
    url: SITE_URL,
    logo: {
      '@type': 'ImageObject',
      url: `${SITE_URL}/favicon.svg`,
      width: 512,
      height: 512,
    },
    image: `${SITE_URL}/og-image.jpg`,
    email: 'contactonexoratech@gmail.com',
    foundingDate: '2023',
    numberOfEmployees: { '@type': 'QuantitativeValue', minValue: 1, maxValue: 5 },
    knowsLanguage: ['es', 'en'],
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Tehuacán',
      addressRegion: 'Puebla',
      postalCode: '75700',
      addressCountry: 'MX',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 18.4653,
      longitude: -97.3921,
    },
    areaServed: [
      { '@type': 'Country', name: 'México' },
      { '@type': 'Country', name: 'Estados Unidos' },
      { '@type': 'Place', name: 'Latinoamérica' },
    ],
    sameAs: ['https://www.linkedin.com/in/juan-ramon-moreno-bravo-0830b1271/'],
    priceRange: '$$',
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: '09:00',
      closes: '18:00',
    },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Servicios de Software',
      itemListElement: [
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Desarrollo de Software a Medida' } },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Automatización Empresarial' } },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Integración de Inteligencia Artificial' } },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Desarrollo Web Corporativo' } },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'CRM Personalizado' } },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Consultoría Tecnológica' } },
      ],
    },
  },
  {
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': `${SITE_URL}/#founder`,
    name: 'Juan Bv.',
    jobTitle: 'Software & Full-Stack Developer',
    description: 'Especialista en desarrollo de software a medida, automatización empresarial e integración de IA con más de 2 años de experiencia y 15+ proyectos entregados en México.',
    url: SITE_URL,
    sameAs: ['https://www.linkedin.com/in/juan-ramon-moreno-bravo-0830b1271/'],
    knowsAbout: ['Desarrollo de Software', 'React', 'TypeScript', 'Next.js', 'Node.js', 'Inteligencia Artificial', 'Automatización Empresarial', 'Firebase', 'MySQL', 'Google Gemini'],
    worksFor: { '@id': `${SITE_URL}/#organization` },
  },
];

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { locale?: string };
}) {
  const locale = params?.locale && locales.includes(params.locale) ? params.locale : 'es';

  // Habilita static rendering para next-intl
  setRequestLocale(locale);

  const messages = await getMessages({ locale });

  return (
    <html lang={locale} className="dark" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var saved = localStorage.getItem('darkMode');
                  if (saved === 'false') {
                    document.documentElement.classList.remove('dark');
                  } else if (saved === 'true') {
                    document.documentElement.classList.add('dark');
                  } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
                    document.documentElement.classList.remove('dark');
                  }
                } catch (e) {}
              })();
            `,
          }}
        />
        {/* DNS preconnect primero — reduce latencia de fuentes */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* display=swap evita FOIT y no bloquea el render — mejora LCP */}
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700;800&family=Space+Grotesk:wght@500;600;700&display=swap"
        />
        <meta name="google-site-verification" content="K2Pr9c4pJIz1illvhuu03_TDfK_ggSnMsylbPK7HBds" />
        {[...jsonLd, websiteSchema].map((schema, i) => (
          <script
            key={i}
            id={`root-schema-${i}`}
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
          />
        ))}
      </head>
      <body suppressHydrationWarning className="bg-white dark:bg-black text-[#1d1d1f] dark:text-white antialiased">
        <ClientGuard />
        <GoogleAnalytics />
        <NextIntlClientProvider messages={messages}>
          <AppProvider>
            {children}
          </AppProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
