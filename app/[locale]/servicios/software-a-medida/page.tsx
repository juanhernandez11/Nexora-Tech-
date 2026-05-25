import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import Link from 'next/link';
import ServicePageClient from '@/components/sections/ServicePageClient';

const BASE = 'https://nexorate.netlify.app';

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }): Promise<Metadata> {
  return {
    title: 'Software a Medida para Empresas en México | Nexora Tech',
    description: 'Software empresarial personalizado 100% adaptado a tus procesos. Sin licencias mensuales, sin funciones innecesarias. Desde $500 USD. Entrega garantizada.',
    alternates: {
      canonical: locale === 'es' ? `${BASE}/servicios/software-a-medida` : `${BASE}/en/servicios/software-a-medida`,
      languages: { es: `${BASE}/servicios/software-a-medida`, en: `${BASE}/en/servicios/software-a-medida` },
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
        { '@type': 'ListItem', position: 3, name: 'Software a Medida', item: `${BASE}/servicios/software-a-medida` },
      ],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'Service',
      name: 'Software a Medida',
      description: 'Software empresarial personalizado 100% adaptado a los procesos específicos de cada empresa en México.',
      provider: { '@id': `${BASE}/#organization` },
      areaServed: { '@type': 'Country', name: 'México' },
      offers: { '@type': 'Offer', priceCurrency: 'USD', priceRange: '500-5000' },
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
          <span className="text-slate-600 dark:text-slate-300">Software a Medida</span>
        </nav>
      </div>
      <ServicePageClient
        locale={locale}
        badge="Software a Medida"
        h1="Software a Medida:"
        h1Highlight="La solución exacta que tu empresa necesita."
        subtitle="Tu empresa tiene procesos únicos. El software genérico te obliga a adaptarte a él. Nosotros construimos el software que se adapta a ti, con las funciones exactas que necesitas y sin las que nunca usarías."
        benefits={[
          { title: 'Sin licencias eternas', desc: 'Pagas una vez y el software es tuyo para siempre.' },
          { title: 'Procesos a tu medida', desc: 'El software se adapta a tu empresa, no al revés.' },
          { title: 'Ventaja competitiva', desc: 'Tu competencia no puede comprar exactamente lo mismo.' },
        ]}
        sections={[
          {
            h2: 'Software a medida vs software genérico: la diferencia real',
            content: 'El software genérico resuelve el 70% de tus necesidades. El 30% restante lo cubres con procesos manuales, hojas de cálculo paralelas o pagando módulos adicionales. El software a medida resuelve el 100% de tu caso específico desde el primer día.',
            items: ['Funcionalidades exactas para tu industria', 'Integración nativa con tus herramientas actuales', 'Sin pagar por módulos que no usas', 'Escalable según tu crecimiento real', 'Soporte directo sin intermediarios', 'Propiedad total del código fuente'],
          },
          {
            h2: '¿Cuándo tiene sentido invertir en software a medida?',
            content: 'Tiene sentido cuando tienes procesos repetitivos que consumen tiempo de tu equipo, cuando el software genérico no se adapta a tu flujo de trabajo, cuando pagas licencias mensuales que superan el costo de desarrollo en 12-18 meses, o cuando necesitas una ventaja competitiva real en tu industria.',
          },
          {
            h2: 'Tipos de software a medida que desarrollamos',
            content: 'Desarrollamos cualquier tipo de sistema empresarial personalizado según las necesidades específicas de cada cliente.',
            items: ['Sistemas de gestión de inventarios', 'Plataformas de e-commerce personalizadas', 'Dashboards y reportes automáticos', 'Sistemas de facturación y cobranza', 'Portales de clientes y proveedores', 'Aplicaciones de gestión de proyectos', 'Sistemas de control de producción', 'Plataformas educativas y e-learning'],
          },
          {
            h2: '¿Cuánto cuesta el software a medida?',
            content: 'Los proyectos van desde $500 USD para sistemas simples hasta $5,000+ USD para plataformas empresariales complejas. Ofrecemos planes de pago flexibles: 50% al inicio y 50% en la entrega final aprobada.',
          },
        ]}
        faqs={[
          { q: '¿El software a medida es más caro que el genérico?', a: 'A corto plazo sí. A largo plazo no. Si pagas $200 USD/mes en licencias, en 25 meses ya pagaste $5,000 USD sin ser dueño de nada. Con software a medida pagas una vez y es tuyo para siempre.' },
          { q: '¿Cuánto tiempo tarda desarrollar software a medida?', a: 'Proyectos simples: 1-2 semanas. Sistemas complejos: 4-8 semanas. En la consultoría inicial te damos un timeline exacto con hitos claros.' },
          { q: '¿Puedo agregar funcionalidades después?', a: 'Sí. Desarrollamos con arquitecturas escalables. Puedes empezar con las funciones esenciales y agregar módulos en fases posteriores.' },
          { q: '¿Qué pasa si el desarrollador ya no está disponible?', a: 'Entregamos código limpio, documentado y con comentarios. Cualquier desarrollador puede continuar el proyecto. Además ofrecemos planes de mantenimiento continuo.' },
        ]}
        tech={['React', 'TypeScript', 'Next.js', 'Node.js', 'Firebase', 'MySQL', 'MongoDB', 'PostgreSQL', 'REST APIs', 'Docker']}
        ctaText="Solicitar consultoría gratuita"
        relatedServices={[
          { name: 'Desarrollo de Software', href: '/servicios/desarrollo-software' },
          { name: 'CRM Personalizado', href: '/servicios/crm-personalizado' },
          { name: 'ERP Empresarial', href: '/servicios/erp-empresarial' },
          { name: 'Automatización Empresarial', href: '/servicios/automatizacion-empresarial' },
        ]}
      />
    </>
  );
}
