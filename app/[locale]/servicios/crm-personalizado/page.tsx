import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import Link from 'next/link';
import ServicePageClient from '@/components/sections/ServicePageClient';

const BASE = 'https://nexorate.netlify.app';

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }): Promise<Metadata> {
  return {
    title: 'CRM Personalizado para Empresas en México | Nexora Tech',
    description: 'Desarrollamos CRM a medida adaptado a tu proceso de ventas. Sin licencias mensuales, 100% tuyo, con las funciones exactas que necesitas. Desde $2,000 USD.',
    alternates: {
      canonical: locale === 'es' ? `${BASE}/servicios/crm-personalizado` : `${BASE}/en/servicios/crm-personalizado`,
      languages: { es: `${BASE}/servicios/crm-personalizado`, en: `${BASE}/en/servicios/crm-personalizado` },
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
        { '@type': 'ListItem', position: 3, name: 'CRM Personalizado', item: `${BASE}/servicios/crm-personalizado` },
      ],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'Service',
      name: 'CRM Personalizado',
      description: 'Desarrollo de CRM a medida adaptado al proceso de ventas específico de cada empresa en México. Sin licencias mensuales.',
      provider: { '@id': `${BASE}/#organization` },
      areaServed: { '@type': 'Country', name: 'México' },
      offers: { '@type': 'Offer', priceCurrency: 'USD', priceRange: '2000-5000' },
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
          <span className="text-slate-600 dark:text-slate-300">CRM Personalizado</span>
        </nav>
      </div>
      <ServicePageClient
        locale={locale}
        badge="CRM Personalizado"
        h1="CRM Personalizado:"
        h1Highlight="Gestiona tus clientes a tu manera."
        subtitle="Salesforce cuesta $150 USD/usuario/mes y tiene 500 funciones que nunca usarás. Nosotros construimos el CRM exacto para tu proceso de ventas, con las funciones que necesitas y sin las que no. Pagas una vez y es tuyo para siempre."
        benefits={[
          { title: 'Sin licencias mensuales', desc: 'Pagas el desarrollo una vez. El CRM es tuyo para siempre.' },
          { title: 'Tu proceso de ventas', desc: 'El CRM se adapta a cómo vendes tú, no al revés.' },
          { title: 'Integrado con tus herramientas', desc: 'Conectado con tu email, WhatsApp, facturación y más.' },
        ]}
        sections={[
          {
            h2: '¿Por qué un CRM personalizado vs Salesforce o HubSpot?',
            content: 'Los CRM genéricos están diseñados para el promedio de empresas. Tu proceso de ventas no es promedio. Pagas por módulos que nunca usas, te adaptas a su flujo de trabajo y dependes de sus precios para siempre. Con un CRM personalizado tienes exactamente lo que necesitas, integrado con tus sistemas actuales y sin costos recurrentes.',
            items: ['Sin $150 USD/usuario/mes de Salesforce', 'Pipeline de ventas según tu proceso real', 'Campos y etapas personalizadas', 'Reportes exactos que necesitas', 'Integración con WhatsApp Business', 'Conexión con tu sistema de facturación'],
          },
          {
            h2: 'Funcionalidades de un CRM a medida',
            content: 'Desarrollamos las funcionalidades exactas que tu equipo de ventas necesita para cerrar más negocios en menos tiempo.',
            items: ['Pipeline visual de oportunidades', 'Seguimiento automático de prospectos', 'Historial completo de interacciones', 'Alertas y recordatorios automáticos', 'Reportes de conversión y proyecciones', 'Gestión de cotizaciones y propuestas', 'Integración con email y calendario', 'App móvil para vendedores en campo'],
          },
          {
            h2: 'Comparativa: CRM propio vs CRM genérico',
            content: 'Si tienes 5 vendedores y pagas $50 USD/usuario/mes en HubSpot, en 12 meses gastaste $3,000 USD sin ser dueño de nada. Con ese mismo presupuesto desarrollamos un CRM personalizado que es tuyo para siempre y se adapta exactamente a tu negocio.',
          },
          {
            h2: '¿Cuánto cuesta desarrollar un CRM personalizado?',
            content: 'CRM básico con pipeline, contactos y reportes: desde $2,000 USD. CRM completo con integraciones, app móvil y automatizaciones: $3,500-$5,000 USD. Sin costos mensuales de licencia.',
          },
        ]}
        faqs={[
          { q: '¿Cuánto tiempo tarda desarrollar un CRM?', a: 'CRM básico: 3-4 semanas. CRM completo con integraciones: 6-8 semanas. Con entregas parciales para que tu equipo empiece a usarlo antes de la entrega final.' },
          { q: '¿Puede integrarse con mi sistema de facturación?', a: 'Sí. Desarrollamos integraciones con sistemas de facturación electrónica, ERP y cualquier sistema con API disponible.' },
          { q: '¿Mi equipo puede aprender a usarlo fácilmente?', a: 'Sí. Diseñamos la UX pensando en usuarios no técnicos. Incluimos capacitación y documentación de usuario en la entrega.' },
          { q: '¿Puedo agregar módulos después?', a: 'Sí. Desarrollamos con arquitectura modular. Puedes empezar con el pipeline básico y agregar módulos de marketing, soporte o facturación en fases posteriores.' },
        ]}
        tech={['React', 'TypeScript', 'Node.js', 'MySQL', 'Firebase', 'REST APIs', 'WhatsApp Business API', 'Tailwind CSS', 'Next.js']}
        ctaText="Diseñar mi CRM ideal — Gratis"
        relatedServices={[
          { name: 'ERP Empresarial', href: '/servicios/erp-empresarial' },
          { name: 'Software a Medida', href: '/servicios/software-a-medida' },
          { name: 'Automatización Empresarial', href: '/servicios/automatizacion-empresarial' },
          { name: 'Inteligencia Artificial', href: '/servicios/inteligencia-artificial' },
        ]}
      />
    </>
  );
}
