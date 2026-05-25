import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import Link from 'next/link';
import ServicePageClient from '@/components/sections/ServicePageClient';

const BASE = 'https://nexorate.netlify.app';

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }): Promise<Metadata> {
  return {
    title: 'Desarrollo Web Corporativo en México | Nexora Tech',
    description: 'Sitios web corporativos que cargan en menos de 2 segundos, posicionan en Google y convierten visitantes en clientes. Core Web Vitals en verde. Desde $800 USD.',
    alternates: {
      canonical: locale === 'es' ? `${BASE}/servicios/desarrollo-web-corporativo` : `${BASE}/en/servicios/desarrollo-web-corporativo`,
      languages: { es: `${BASE}/servicios/desarrollo-web-corporativo`, en: `${BASE}/en/servicios/desarrollo-web-corporativo` },
    },
  };
}

export default function Page({ params: { locale } }: { params: { locale: string } }) {
  setRequestLocale(locale);
  const base = locale === 'en' ? '/en' : '';

  const schemas = [
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Inicio', item: BASE },
        { '@type': 'ListItem', position: 2, name: 'Servicios', item: `${BASE}/servicios` },
        { '@type': 'ListItem', position: 3, name: 'Desarrollo Web Corporativo', item: `${BASE}/servicios/desarrollo-web-corporativo` },
      ],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'Service',
      name: 'Desarrollo Web Corporativo',
      description: 'Desarrollo de sitios web corporativos de alto rendimiento con Core Web Vitals en verde y SEO optimizado para empresas en México.',
      provider: { '@id': `${BASE}/#organization` },
      areaServed: { '@type': 'Country', name: 'México' },
      offers: { '@type': 'Offer', priceCurrency: 'USD', priceRange: '800-3000' },
    },
  ];

  return (
    <>
      {schemas.map((s, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(s) }} />
      ))}
      <div className="pt-20">
        <nav className="max-w-5xl mx-auto px-4 sm:px-6 pt-6 text-xs text-slate-400 flex items-center gap-2">
          <Link href={`${base}/`} className="hover:text-brand-600 transition-colors">Inicio</Link>
          <span>/</span>
          <Link href={`${base}/servicios`} className="hover:text-brand-600 transition-colors">Servicios</Link>
          <span>/</span>
          <span className="text-slate-600 dark:text-slate-300">Desarrollo Web Corporativo</span>
        </nav>
      </div>
      <ServicePageClient
        locale={locale}
        badge="Desarrollo Web Corporativo"
        h1="Desarrollo Web Corporativo:"
        h1Highlight="Sitios que generan negocio."
        subtitle="Tu sitio web es tu vendedor 24/7. Lo construimos para que cargue en menos de 2 segundos, aparezca en los primeros resultados de Google y convierta visitantes en clientes reales con métricas verificables."
        benefits={[
          { title: 'Core Web Vitals en verde', desc: 'LCP < 2.5s, CLS < 0.1, INP < 200ms. Google te premia con mejor posicionamiento.' },
          { title: 'SEO técnico incluido', desc: 'Schema markup, sitemap, canonical URLs, hreflang y optimización on-page.' },
          { title: 'Diseño que convierte', desc: 'UX orientada a conversión con CTAs estratégicos y flujos optimizados.' },
        ]}
        sections={[
          {
            h2: '¿Por qué tu sitio web actual no genera clientes?',
            content: 'La mayoría de sitios corporativos fallan por las mismas razones: cargan lento (más de 3 segundos), no están optimizados para Google, no tienen CTAs claros o no se ven bien en móvil. Cada segundo de carga adicional reduce las conversiones un 7%. Un sitio lento no es solo un problema técnico, es un problema de negocio.',
            items: ['Velocidad de carga < 2 segundos', 'Diseño responsive para todos los dispositivos', 'SEO técnico y on-page completo', 'Integración con Google Analytics y Search Console', 'Formularios de contacto funcionales', 'Certificado SSL y seguridad incluidos'],
          },
          {
            h2: 'Caso real: ARH Consultores',
            content: 'Sitio WordPress con Core Web Vitals en rojo, LCP de 6.2 segundos y pérdida de posicionamiento orgánico en Google. Realizamos auditoría técnica completa, optimización de imágenes, caché avanzado y reestructuración SEO on-page. Resultado: LCP reducido de 6.2s a 1.8s, todos los Core Web Vitals en verde y recuperación del posicionamiento orgánico.',
          },
          {
            h2: 'Tecnologías para desarrollo web corporativo',
            content: 'Seleccionamos la tecnología según el caso. Next.js para sitios que necesitan máximo rendimiento y SEO. WordPress para sitios que el cliente necesita gestionar sin conocimientos técnicos. Siempre con Core Web Vitals en verde.',
          },
          {
            h2: '¿Cuánto cuesta un sitio web corporativo?',
            content: 'Sitios corporativos desde $800 USD. Landing pages de alta conversión desde $500 USD. Plataformas web complejas desde $2,000 USD. Todos incluyen diseño responsive, SEO técnico y 30 días de soporte.',
          },
        ]}
        faqs={[
          { q: '¿Cuánto tiempo tarda desarrollar un sitio web corporativo?', a: 'Sitios de 5-10 páginas: 1-2 semanas. Sitios con funcionalidades avanzadas: 2-4 semanas. Siempre con entregas parciales para revisión.' },
          { q: '¿Incluye el diseño o solo el desarrollo?', a: 'Incluye diseño y desarrollo completo. Trabajamos con tu identidad de marca existente o creamos una nueva si lo necesitas.' },
          { q: '¿Puedo actualizar el contenido yo mismo?', a: 'Sí. Para sitios que necesitas gestionar sin conocimientos técnicos usamos WordPress con panel de administración intuitivo. Para sitios Next.js integramos un CMS headless.' },
          { q: '¿El sitio aparecerá en Google?', a: 'Implementamos SEO técnico completo desde el inicio. El posicionamiento orgánico tarda 3-6 meses en consolidarse, pero la base técnica estará perfecta desde el día 1.' },
        ]}
        tech={['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'WordPress', 'WP Rocket', 'Yoast SEO', 'Google Analytics', 'Netlify', 'Vercel']}
        ctaText="Solicitar consultoría gratuita"
        relatedServices={[
          { name: 'Aplicaciones Web', href: '/servicios/aplicaciones-web' },
          { name: 'Software a Medida', href: '/servicios/software-a-medida' },
          { name: 'Consultoría Tecnológica', href: '/servicios/consultoria-tecnologica' },
          { name: 'Desarrollo de Software', href: '/servicios/desarrollo-software' },
        ]}
      />
    </>
  );
}
