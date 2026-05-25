import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import Link from 'next/link';
import ServicePageClient from '@/components/sections/ServicePageClient';

const BASE = 'https://nexorate.netlify.app';

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }): Promise<Metadata> {
  return {
    title: 'Automatización Empresarial en México | Nexora Tech',
    description: 'Automatizamos los procesos repetitivos de tu empresa. Reduce costos operativos hasta un 40%, elimina errores humanos y libera tiempo de tu equipo. Consultoría gratuita.',
    alternates: {
      canonical: locale === 'es' ? `${BASE}/servicios/automatizacion-empresarial` : `${BASE}/en/servicios/automatizacion-empresarial`,
      languages: { es: `${BASE}/servicios/automatizacion-empresarial`, en: `${BASE}/en/servicios/automatizacion-empresarial` },
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
        { '@type': 'ListItem', position: 3, name: 'Automatización Empresarial', item: `${BASE}/servicios/automatizacion-empresarial` },
      ],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'Service',
      name: 'Automatización Empresarial',
      description: 'Automatización de procesos empresariales repetitivos para reducir costos operativos y eliminar errores humanos en empresas mexicanas.',
      provider: { '@id': `${BASE}/#organization` },
      areaServed: { '@type': 'Country', name: 'México' },
      offers: { '@type': 'Offer', priceCurrency: 'USD', priceRange: '800-4000' },
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
          <span className="text-slate-600 dark:text-slate-300">Automatización Empresarial</span>
        </nav>
      </div>
      <ServicePageClient
        locale={locale}
        badge="Automatización Empresarial"
        h1="Automatización Empresarial:"
        h1Highlight="Elimina el trabajo manual en tu empresa."
        subtitle="Cada proceso manual que automatizamos es tiempo y dinero que recuperas. Sistemas de gestión, dashboards automáticos y flujos de trabajo que eliminan el trabajo repetitivo y los errores humanos."
        benefits={[
          { title: 'Hasta 40% menos costos', desc: 'Reducción real en costos operativos medida en proyectos anteriores.' },
          { title: 'Cero errores humanos', desc: 'Los procesos automatizados ejecutan exactamente lo programado, siempre.' },
          { title: 'ROI en 3-6 meses', desc: 'La mayoría de automatizaciones se pagan solas en menos de 6 meses.' },
        ]}
        sections={[
          {
            h2: '¿Qué procesos de tu empresa se pueden automatizar?',
            content: 'Si un proceso se repite más de 10 veces al día y sigue pasos predecibles, se puede automatizar. Estos son los más comunes en empresas mexicanas:',
            items: ['Gestión y control de inventarios', 'Generación automática de reportes', 'Facturación y seguimiento de cobranza', 'Notificaciones y alertas automáticas', 'Flujos de aprobación internos', 'Sincronización entre sistemas', 'Procesamiento de pedidos', 'Onboarding de clientes y empleados'],
          },
          {
            h2: 'Beneficios reales de la automatización empresarial',
            content: 'La automatización no es solo ahorro de tiempo. Es una ventaja competitiva estructural. Tu equipo deja de hacer trabajo repetitivo y se enfoca en actividades de alto valor. Los errores humanos desaparecen. Los reportes están disponibles en tiempo real. Y puedes escalar operaciones sin contratar más personal.',
          },
          {
            h2: 'Caso real: Jurisdicción Sanitaria Núm. 10',
            content: 'Control de suministros médicos en hojas de cálculo manuales con errores frecuentes y tiempos de consulta de 15+ minutos. Implementamos un sistema web de gestión de inventarios con control de entradas/salidas, alertas de stock mínimo y reportes automáticos. Resultado: reducción del 20% en tiempos de gestión y eliminación total de errores manuales.',
          },
          {
            h2: '¿Cuánto cuesta implementar automatización empresarial?',
            content: 'Los proyectos de automatización van desde $800 USD para flujos simples hasta $4,000+ USD para sistemas complejos con múltiples integraciones. El ROI típico es de 3-6 meses. En la consultoría gratuita calculamos el ROI específico para tu caso.',
          },
        ]}
        faqs={[
          { q: '¿Cuánto tiempo tarda implementar automatización?', a: 'Automatizaciones simples: 1-2 semanas. Sistemas complejos con múltiples integraciones: 3-6 semanas. Siempre con entregas parciales para que veas el avance.' },
          { q: '¿Necesito cambiar mis sistemas actuales?', a: 'No necesariamente. Desarrollamos integraciones que conectan tus sistemas actuales entre sí. La automatización se agrega encima de lo que ya tienes.' },
          { q: '¿Qué pasa si el proceso cambia después?', a: 'Los sistemas que desarrollamos son configurables. Cambios menores los hacemos en el soporte post-lanzamiento. Cambios mayores se cotizan por separado.' },
          { q: '¿Pueden automatizar procesos con Excel o Google Sheets?', a: 'Sí. Podemos automatizar la generación, actualización y distribución de reportes en Excel/Sheets, o migrar esos procesos a un sistema más robusto.' },
        ]}
        tech={['Node.js', 'Python', 'REST APIs', 'Webhooks', 'Firebase', 'MySQL', 'Google Sheets API', 'Office Scripts', 'Zapier', 'n8n']}
        ctaText="Analizar qué automatizar — Gratis"
        relatedServices={[
          { name: 'Software a Medida', href: '/servicios/software-a-medida' },
          { name: 'Inteligencia Artificial', href: '/servicios/inteligencia-artificial' },
          { name: 'ERP Empresarial', href: '/servicios/erp-empresarial' },
          { name: 'Consultoría Tecnológica', href: '/servicios/consultoria-tecnologica' },
        ]}
      />
    </>
  );
}
