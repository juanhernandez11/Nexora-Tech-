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
  const baseUrl = 'https://nexorate.netlify.app';
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

const jsonLd = [
  {
    '@context': 'https://schema.org',
    '@type': ['Organization', 'LocalBusiness'],
    '@id': 'https://nexorate.netlify.app/#organization',
    name: 'Nexora Tech',
    legalName: 'Nexora Tech Solutions',
    description: 'Empresa especializada en desarrollo de software a medida, automatización empresarial e integración de inteligencia artificial para PyMEs y corporativos en México.',
    url: 'https://nexorate.netlify.app',
    logo: {
      '@type': 'ImageObject',
      url: 'https://nexorate.netlify.app/favicon.svg',
      width: 512,
      height: 512,
    },
    image: 'https://nexorate.netlify.app/og-image.jpg',
    email: 'freelancejuanbvtech4@gmail.com',
    foundingDate: '2023',
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
    '@id': 'https://nexorate.netlify.app/#founder',
    name: 'Juan Ramón Moreno Bravo',
    jobTitle: 'Software Architect & Full-Stack Developer',
    description: 'Especialista en desarrollo de software a medida, automatización empresarial e integración de IA con más de 2 años de experiencia y 15+ proyectos entregados en México.',
    url: 'https://nexorate.netlify.app',
    sameAs: ['https://www.linkedin.com/in/juan-ramon-moreno-bravo-0830b1271/'],
    knowsAbout: ['Desarrollo de Software', 'React', 'TypeScript', 'Next.js', 'Node.js', 'Inteligencia Artificial', 'Automatización Empresarial', 'Firebase', 'MySQL', 'Google Gemini'],
    worksFor: { '@id': 'https://nexorate.netlify.app/#organization' },
  },
];

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
        <link
          rel="preload"
          as="style"
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Sora:wght@700;800&display=swap"
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Sora:wght@700;800&display=swap"
          media="print"
          // @ts-ignore
          onLoad="this.media='all'"
        />
        <noscript>
          <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Sora:wght@700;800&display=swap" />
        </noscript>
        <meta name="google-site-verification" content="K2Pr9c4pJIz1illvhuu03_TDfK_ggSnMsylbPK7HBds" />
        {jsonLd.map((schema, i) => (
          <script
            key={i}
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
          />
        ))}
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
