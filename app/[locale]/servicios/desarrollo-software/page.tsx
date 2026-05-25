import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import Link from 'next/link';
import ServicePageClient from '@/components/sections/ServicePageClient';

const BASE = 'https://nexorate.netlify.app';

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }): Promise<Metadata> {
  return {
    title: 'Desarrollo de Software a Medida en México | Nexora Tech',
    description: 'Desarrollamos software empresarial personalizado con React, TypeScript y Node.js. Entrega garantizada, revisiones ilimitadas. Desde $500 USD. Consultoría gratuita.',
    alternates: {
      canonical: locale === 'es' ? `${BASE}/servicios/desarrollo-software` : `${BASE}/en/servicios/desarrollo-software`,
      languages: { es: `${BASE}/servicios/desarrollo-software`, en: `${BASE}/en/servicios/desarrollo-software` },
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
        { '@type': 'ListItem', position: 3, name: 'Desarrollo de Software', item: `${BASE}/servicios/desarrollo-software` },
      ],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'Service',
      name: 'Desarrollo de Software a Medida',
      description: 'Desarrollo de aplicaciones web y sistemas empresariales personalizados con React, TypeScript y Node.js para PyMEs y corporativos en México.',
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
          <span className="text-slate-600 dark:text-slate-300">Desarrollo de Software</span>
        </nav>
      </div>
      <ServicePageClient
        locale={locale}
        badge="Desarrollo de Software"
        h1="Desarrollo de Software a Medida"
        h1Highlight="en México"
        subtitle="Construimos aplicaciones empresariales personalizadas que resuelven el problema exacto de tu negocio. React, TypeScript, Node.js y arquitecturas escalables. Entrega garantizada o devolución."
        benefits={[
          { title: 'Entrega garantizada', desc: 'Cumplimos plazos o devolvemos el proporcional. Sin excusas.' },
          { title: 'Código 100% tuyo', desc: 'Al finalizar recibes el código fuente completo sin dependencias.' },
          { title: 'Revisiones ilimitadas', desc: 'Trabajamos hasta que estés 100% satisfecho con el resultado.' },
        ]}
        sections={[
          {
            h2: '¿Por qué elegir software a medida sobre soluciones genéricas?',
            content: 'Las soluciones genéricas como SAP, Salesforce o cualquier SaaS están diseñadas para el promedio de empresas, no para la tuya. Pagas por funciones que nunca usarás, te adaptas a sus procesos en lugar de que el software se adapte a los tuyos, y dependes de sus precios y decisiones para siempre. El software a medida resuelve exactamente tu problema, se integra con tus sistemas actuales y es tuyo para siempre.',
            items: ['Sin licencias mensuales eternas', 'Funcionalidades exactas que necesitas', 'Integración con tus sistemas actuales', 'Escalable según tu crecimiento', 'Soporte directo sin tickets de soporte masivo', 'Ventaja competitiva real sobre tu industria'],
          },
          {
            h2: 'Nuestro proceso de desarrollo de software',
            content: 'Usamos metodología ágil con entregas parciales cada 1-2 semanas para que veas el progreso real. No desaparecemos 3 meses y aparecemos con algo que no esperabas.',
            items: ['Descubrimiento y análisis de requerimientos (1-2 días)', 'Arquitectura y diseño técnico (2-3 días)', 'Desarrollo con entregas parciales (1-4 semanas)', 'QA y pruebas de usuario (incluido)', 'Despliegue y capacitación (1-2 días)', '30 días de soporte técnico gratuito'],
          },
          {
            h2: '¿Cuánto cuesta desarrollar software a medida?',
            content: 'Los proyectos van desde $500 USD para aplicaciones simples hasta $5,000+ USD para sistemas empresariales complejos. El costo depende del alcance, número de funcionalidades y tiempo de desarrollo. En la consultoría gratuita te damos un presupuesto exacto sin compromiso.',
          },
          {
            h2: 'Casos de éxito en desarrollo de software',
            content: 'Hemos desarrollado desde plataformas educativas con IA integrada hasta sistemas de gestión de inventarios para instituciones de salud pública. Cada proyecto con métricas verificables y clientes satisfechos.',
          },
        ]}
        faqs={[
          { q: '¿Cuánto tiempo tarda desarrollar software a medida?', a: 'Depende del alcance. Un sistema simple tarda 1-2 semanas. Aplicaciones complejas con múltiples módulos pueden tomar 4-8 semanas. En la consultoría inicial te entregamos un timeline exacto.' },
          { q: '¿Puedo ver el avance durante el desarrollo?', a: 'Sí. Hacemos entregas parciales cada 1-2 semanas. Tienes acceso al repositorio y a demos funcionales en todo momento.' },
          { q: '¿Qué pasa si necesito cambios después de la entrega?', a: 'Los 30 días de soporte gratuito cubren correcciones del alcance original. Nuevas funcionalidades se cotizan por separado con precios preferenciales para clientes existentes.' },
          { q: '¿Pueden integrarse con mis sistemas actuales?', a: 'Sí. Desarrollamos integraciones con APIs REST, webhooks y conectores personalizados para cualquier sistema con API disponible.' },
          { q: '¿El software funciona en móvil?', a: 'Sí. Desarrollamos con diseño responsive por defecto. Para apps móviles nativas evaluamos el caso específico.' },
        ]}
        tech={['React', 'TypeScript', 'Next.js', 'Node.js', 'Firebase', 'MySQL', 'MongoDB', 'REST APIs', 'Git', 'Netlify', 'Vercel']}
        ctaText="Solicitar consultoría gratuita"
        relatedServices={[
          { name: 'Software a Medida', href: '/servicios/software-a-medida' },
          { name: 'Automatización Empresarial', href: '/servicios/automatizacion-empresarial' },
          { name: 'Aplicaciones Web', href: '/servicios/aplicaciones-web' },
          { name: 'Consultoría Tecnológica', href: '/servicios/consultoria-tecnologica' },
        ]}
      />
    </>
  );
}
