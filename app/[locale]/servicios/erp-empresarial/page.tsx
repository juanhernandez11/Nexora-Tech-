import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import Link from 'next/link';
import ServicePageClient from '@/components/sections/ServicePageClient';

const BASE = 'https://nexorate.netlify.app';

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }): Promise<Metadata> {
  return {
    title: 'ERP Personalizado para PyMEs en México | Nexora Tech',
    description: 'Desarrollamos ERP a medida que integra todas las áreas de tu empresa. Sin las complejidades de SAP. Desde $2,500 USD. Consultoría gratuita.',
    alternates: {
      canonical: locale === 'es' ? `${BASE}/servicios/erp-empresarial` : `${BASE}/en/servicios/erp-empresarial`,
      languages: { es: `${BASE}/servicios/erp-empresarial`, en: `${BASE}/en/servicios/erp-empresarial` },
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
        { '@type': 'ListItem', position: 3, name: 'ERP Empresarial', item: `${BASE}/servicios/erp-empresarial` },
      ],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'Service',
      name: 'ERP Empresarial Personalizado',
      description: 'Desarrollo de ERP a medida que integra ventas, inventario, finanzas y operaciones para PyMEs en México sin las complejidades de SAP.',
      provider: { '@id': `${BASE}/#organization` },
      areaServed: { '@type': 'Country', name: 'México' },
      offers: { '@type': 'Offer', priceCurrency: 'USD', priceRange: '2500-8000' },
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
          <span className="text-slate-600 dark:text-slate-300">ERP Empresarial</span>
        </nav>
      </div>
      <ServicePageClient
        locale={locale}
        badge="ERP Empresarial"
        h1="ERP Personalizado:"
        h1Highlight="Gestiona toda tu empresa desde un solo sistema."
        subtitle="SAP cuesta $200,000+ USD y tarda 2 años en implementarse. Nosotros desarrollamos un ERP a medida para tu PyME que integra exactamente las áreas que necesitas, en semanas, no años, y a una fracción del costo."
        benefits={[
          { title: 'Sin la complejidad de SAP', desc: 'ERP diseñado para tu empresa, no para una multinacional.' },
          { title: 'Implementación en semanas', desc: 'No en años. Con entregas parciales por módulo.' },
          { title: 'Todos tus datos en un lugar', desc: 'Ventas, inventario, finanzas y operaciones integrados.' },
        ]}
        sections={[
          {
            h2: '¿Qué es un ERP y cuándo lo necesita tu empresa?',
            content: 'Un ERP (Enterprise Resource Planning) es un sistema que integra todas las áreas de tu empresa en una sola plataforma. Lo necesitas cuando tienes múltiples sistemas desconectados, cuando la información no fluye entre departamentos, cuando tomas decisiones con datos desactualizados o cuando el crecimiento de tu empresa supera la capacidad de tus herramientas actuales.',
            items: ['Ventas y CRM integrados', 'Control de inventario en tiempo real', 'Gestión financiera y contabilidad', 'Compras y proveedores', 'Producción y operaciones', 'Recursos humanos y nómina', 'Reportes ejecutivos automáticos', 'Dashboard de KPIs en tiempo real'],
          },
          {
            h2: 'ERP a medida vs SAP vs Odoo',
            content: 'SAP es para empresas con 500+ empleados y presupuestos de $200,000+ USD. Odoo es genérico y requiere costosas personalizaciones. Un ERP a medida se construye exactamente para tu empresa, con los módulos que necesitas, integrado con tus procesos actuales y a un costo accesible para PyMEs.',
          },
          {
            h2: 'Implementación por fases',
            content: 'No tienes que implementar todo de golpe. Empezamos con los módulos más críticos para tu operación y agregamos funcionalidades en fases. Así tu equipo se adapta gradualmente y el impacto en la operación diaria es mínimo.',
            items: ['Fase 1: Inventario y ventas (2-3 semanas)', 'Fase 2: Finanzas y compras (2-3 semanas)', 'Fase 3: Reportes y dashboards (1-2 semanas)', 'Fase 4: Módulos adicionales según necesidad'],
          },
          {
            h2: '¿Cuánto cuesta un ERP personalizado?',
            content: 'ERP básico con 2-3 módulos: desde $2,500 USD. ERP completo con todos los módulos: $5,000-$8,000 USD. Sin costos de licencia mensuales. Sin consultores externos para cada cambio.',
          },
        ]}
        faqs={[
          { q: '¿Cuánto tiempo tarda implementar un ERP?', a: 'ERP básico con 2-3 módulos: 4-6 semanas. ERP completo: 8-16 semanas implementado por fases. Siempre con entregas parciales funcionales.' },
          { q: '¿Pueden migrar mis datos actuales al nuevo ERP?', a: 'Sí. Realizamos migración de datos desde Excel, sistemas legacy o cualquier fuente con exportación disponible. La migración incluye validación y limpieza de datos.' },
          { q: '¿El ERP funciona en móvil?', a: 'Sí. Desarrollamos con diseño responsive. Tu equipo puede acceder desde cualquier dispositivo sin instalar nada.' },
          { q: '¿Qué pasa si necesito un módulo que no estaba en el plan original?', a: 'Los módulos adicionales se cotizan por separado con precios preferenciales para clientes existentes. La arquitectura modular facilita agregar funcionalidades sin afectar lo que ya funciona.' },
        ]}
        tech={['React', 'TypeScript', 'Node.js', 'MySQL', 'PostgreSQL', 'Firebase', 'REST APIs', 'Next.js', 'Tailwind CSS', 'Docker']}
        ctaText="Analizar qué módulos necesito — Gratis"
        relatedServices={[
          { name: 'CRM Personalizado', href: '/servicios/crm-personalizado' },
          { name: 'Software a Medida', href: '/servicios/software-a-medida' },
          { name: 'Automatización Empresarial', href: '/servicios/automatizacion-empresarial' },
          { name: 'Consultoría Tecnológica', href: '/servicios/consultoria-tecnologica' },
        ]}
      />
    </>
  );
}
