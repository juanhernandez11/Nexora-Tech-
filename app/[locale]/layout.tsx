import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, getTranslations, setRequestLocale } from 'next-intl/server';
import { AppProvider } from '@/context/AppContext';
import '../globals.css';

const locales = ['es', 'en'];

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'meta' });
  const baseUrl = 'https://NEXORATECH.com';
  const canonicalUrl = locale === 'es' ? baseUrl : `${baseUrl}/${locale}`;

  return {
    title: t('title'),
    description: t('description'),
    metadataBase: new URL(baseUrl),
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

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: 'Nexora Tech',
  description: 'Desarrollo de software a medida, automatización de procesos e integración de IA para empresas en México.',
  url: 'https://NEXORATECH.com',
  logo: 'https://NEXORATECH.com/favicon.svg',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Tehuacán',
    addressRegion: 'Puebla',
    addressCountry: 'MX',
  },
  founder: {
    '@type': 'Person',
    name: 'Ing. Juan R.',
    jobTitle: 'Software Architect & Full-Stack Developer',
    sameAs: 'https://www.linkedin.com/in/juan-ramon-moreno-bravo-0830b1271/',
  },
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Software Services',
    itemListElement: [
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Custom Web Development' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Process Automation' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'AI Integration' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'SEO & Core Web Vitals Optimization' } },
    ],
  },
};

export default async function LocaleLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  if (!locales.includes(locale)) notFound();

  // Habilita static rendering para next-intl
  setRequestLocale(locale);

  const messages = await getMessages();

  return (
    <html lang={locale} suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        <NextIntlClientProvider messages={messages}>
          <AppProvider>
            {children}
          </AppProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
