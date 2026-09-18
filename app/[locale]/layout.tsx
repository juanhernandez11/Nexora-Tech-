import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, getTranslations, setRequestLocale } from 'next-intl/server';
import { AppProvider } from '@/context/AppContext';
import GoogleAnalytics from '@/components/GoogleAnalytics';
import ClientGuard from '@/lib/client-guard';
import '../globals.css';

const locales = ['es', 'en'];
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://nexorate.netlify.app';

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

  return {
    // metadataBase es el único campo que va aquí — cada page.tsx declara su propio canonical.
    // Sin metadataBase Next.js no puede resolver URLs relativas en las imágenes OG.
    metadataBase: new URL(SITE_URL),
    icons: {
      icon: [
        { url: '/favicon.svg', type: 'image/svg+xml' },
      ],
      apple: '/favicon.svg',
      shortcut: '/favicon.svg',
    },
    // El título y descripción son fallback — cada page.tsx los sobreescribe
    title: {
      default: t('title'),
      template: `%s | Nexora Tech`,
    },
    description: t('description'),
    openGraph: {
      type: 'website',
      title: t('ogTitle'),
      description: t('ogDescription'),
      images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: t('ogTitle') }],
      locale: locale === 'es' ? 'es_MX' : 'en_US',
      siteName: 'Nexora Tech',
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

// ─── Schema: WebSite con SitelinksSearchBox ────────────────────────────────────
// Habilita la búsqueda directa desde los resultados de Google
const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': `${SITE_URL}/#website`,
  name: 'Nexora Tech',
  alternateName: ['Nexora Tech Solutions', 'Nexora'],
  url: SITE_URL,
  description: 'Desarrollo de software a medida, automatización empresarial e integración de IA para empresas en México.',
  inLanguage: ['es-MX', 'en-US'],
  publisher: { '@id': `${SITE_URL}/#organization` },
  potentialAction: {
    '@type': 'SearchAction',
    target: {
      '@type': 'EntryPoint',
      urlTemplate: `${SITE_URL}/blog?q={search_term_string}`,
    },
    'query-input': 'required name=search_term_string',
  },
};

// ─── Schema: Organization (Local Business) ────────────────────────────────────
// Datos completos de la empresa — fuente principal para Knowledge Panel de Google
const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': ['Organization', 'LocalBusiness'],
  '@id': `${SITE_URL}/#organization`,
  name: 'Nexora Tech',
  legalName: 'Nexora Tech Solutions',
  description: 'Empresa especializada en desarrollo de software a medida, automatización empresarial e integración de inteligencia artificial para PyMEs y corporativos en México.',
  url: SITE_URL,
  logo: {
    '@type': 'ImageObject',
    '@id': `${SITE_URL}/#logo`,
    url: `${SITE_URL}/favicon.svg`,
    width: 512,
    height: 512,
    contentUrl: `${SITE_URL}/favicon.svg`,
  },
  image: {
    '@type': 'ImageObject',
    url: `${SITE_URL}/og-image.jpg`,
    width: 1200,
    height: 630,
  },
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
  sameAs: ['https://www.linkedin.com/company/nexoratech-tehuacan'],
  priceRange: '$$',
  openingHoursSpecification: {
    '@type': 'OpeningHoursSpecification',
    dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
    opens: '09:00',
    closes: '18:00',
  },
  // hasOfferCatalog — Google usa esto para generar sitelinks de servicios
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Servicios de Software',
    itemListElement: [
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Desarrollo de Software a Medida', url: `${SITE_URL}/servicios/desarrollo-software` } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Automatización Empresarial', url: `${SITE_URL}/servicios/automatizacion-empresarial` } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Integración de Inteligencia Artificial', url: `${SITE_URL}/servicios/inteligencia-artificial` } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Desarrollo Web Corporativo', url: `${SITE_URL}/servicios/desarrollo-web-corporativo` } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'CRM Personalizado', url: `${SITE_URL}/servicios/crm-personalizado` } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'ERP Empresarial', url: `${SITE_URL}/servicios/erp-empresarial` } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Software a Medida', url: `${SITE_URL}/servicios/software-a-medida` } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Aplicaciones Web', url: `${SITE_URL}/servicios/aplicaciones-web` } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Consultoría Tecnológica', url: `${SITE_URL}/servicios/consultoria-tecnologica` } },
    ],
  },
};

// ─── Schema: SiteNavigationElement ────────────────────────────────────────────
// Señala explícitamente la estructura de navegación para sitelinks en Google.
// Google usa esto para decidir qué páginas mostrar bajo el resultado principal.
const siteNavigationSchema = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  name: 'Navegación principal de Nexora Tech',
  itemListElement: [
    {
      '@type': 'SiteNavigationElement',
      position: 1,
      name: 'Inicio',
      description: 'Nexora Tech — Desarrollo de software a medida en México',
      url: SITE_URL,
    },
    {
      '@type': 'SiteNavigationElement',
      position: 2,
      name: 'Servicios',
      description: 'Todos los servicios de desarrollo de software de Nexora Tech',
      url: `${SITE_URL}/servicios`,
    },
    {
      '@type': 'SiteNavigationElement',
      position: 3,
      name: 'Desarrollo de Software',
      description: 'Desarrollo de software a medida con React, TypeScript y Node.js',
      url: `${SITE_URL}/servicios/desarrollo-software`,
    },
    {
      '@type': 'SiteNavigationElement',
      position: 4,
      name: 'Automatización Empresarial',
      description: 'Automatización de procesos empresariales con IA y scripts inteligentes',
      url: `${SITE_URL}/servicios/automatizacion-empresarial`,
    },
    {
      '@type': 'SiteNavigationElement',
      position: 5,
      name: 'Inteligencia Artificial',
      description: 'Integración de IA y modelos de lenguaje en sistemas empresariales',
      url: `${SITE_URL}/servicios/inteligencia-artificial`,
    },
    {
      '@type': 'SiteNavigationElement',
      position: 6,
      name: 'Blog',
      description: 'Artículos sobre desarrollo de software, automatización e IA',
      url: `${SITE_URL}/blog`,
    },
    {
      '@type': 'SiteNavigationElement',
      position: 7,
      name: 'FAQ',
      description: 'Preguntas frecuentes sobre desarrollo de software y precios',
      url: `${SITE_URL}/faq`,
    },
  ],
};

// ─── Schema: Person (Founder) ─────────────────────────────────────────────────
const founderSchema = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  '@id': `${SITE_URL}/#founder`,
  name: 'Juan Bv.',
  jobTitle: 'Software & Full-Stack Developer',
  description: 'Especialista en desarrollo de software a medida, automatización empresarial e integración de IA con más de 2 años de experiencia y 15+ proyectos entregados en México.',
  url: SITE_URL,
  sameAs: ['https://www.linkedin.com/company/nexoratech-tehuacan'],
  knowsAbout: [
    'Desarrollo de Software', 'React', 'TypeScript', 'Next.js', 'Node.js',
    'Inteligencia Artificial', 'Automatización Empresarial', 'Firebase', 'MySQL', 'Google Gemini',
  ],
  worksFor: { '@id': `${SITE_URL}/#organization` },
};

const allSchemas = [organizationSchema, websiteSchema, siteNavigationSchema, founderSchema];

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
        {/* ── Tema oscuro/claro sin FOUC ── */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var s=localStorage.getItem('darkMode');if(s==='false')document.documentElement.classList.remove('dark');else if(s==='true')document.documentElement.classList.add('dark');else if(window.matchMedia&&window.matchMedia('(prefers-color-scheme: light)').matches)document.documentElement.classList.remove('dark');}catch(e){}})();`,
          }}
        />

        {/* ── DNS preconnect — reduce latencia de fuentes ── */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700;800&family=Space+Grotesk:wght@500;600;700&display=swap"
        />

        {/* ── Google Search Console verification ── */}
        <meta name="google-site-verification" content="K2Pr9c4pJIz1illvhuu03_TDfK_ggSnMsylbPK7HBds" />

        {/* ── Structured Data (JSON-LD) ── */}
        {allSchemas.map((schema, i) => (
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
