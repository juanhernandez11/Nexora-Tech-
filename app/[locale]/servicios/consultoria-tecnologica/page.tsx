import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import Link from 'next/link';
import ServicePageClient from '@/components/sections/ServicePageClient';

const BASE = 'https://nexorate.netlify.app';

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }): Promise<Metadata> {
  return {
    title: 'Consultoría Tecnológica para Empresas en México | Nexora Tech',
    description: 'Toma decisiones tecnológicas con expertos. Auditorías de sistemas, arquitectura de software, roadmap digital y selección de tecnologías. Primera sesión gratuita.',
    alternates: {
      canonical: locale === 'es' ? `${BASE}/servicios/consultoria-tecnologica` : `${BASE}/en/servicios/consultoria-tecnologica`,
      languages: { es: `${BASE}/servicios/consultoria-tecnologica`, en: `${BASE}/en/servicios/consultoria-tecnologica` },
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
        { '@type': 'ListItem', position: 3, name: 'Consultoría Tecnológica', item: `${BASE}/servicios/consultoria-tecnologica` },
      ],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'Service',
      name: 'Consultoría Tecnológica',
      description: 'Consultoría tecnológica para empresas en México. Auditorías de sistemas, arquitectura de software y roadmap de transformación digital.',
      provider: { '@id': `${BASE}/#organization` },
      areaServed: { '@type': 'Country', name: 'México' },
      offers: { '@type': 'Offer', priceCurrency: 'USD', priceRange: '0-2000' },
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
          <span className="text-slate-600 dark:text-slate-300">Consultoría Tecnológica</span>
        </nav>
      </div>
      <ServicePageClient
        locale={locale}
        badge="Consultoría Tecnológica"
        h1="Consultoría Tecnológica:"
        h1Highlight="Toma decisiones con expertos en tu lado."
        subtitle="Antes de invertir en tecnología, asegúrate de invertir en la correcta. Auditamos tus sistemas actuales, identificamos los cuellos de botella reales y diseñamos el roadmap tecnológico exacto para tu empresa."
        benefits={[
          { title: 'Primera sesión gratuita', desc: '30 minutos de análisis sin costo ni compromiso de contratación.' },
          { title: 'Sin conflicto de interés', desc: 'Te recomendamos lo que necesitas, no lo más caro.' },
          { title: 'Experiencia en múltiples industrias', desc: 'Salud, educación, retail, logística y servicios profesionales.' },
        ]}
        sections={[
          {
            h2: '¿Qué incluye la consultoría tecnológica?',
            content: 'La consultoría tecnológica no es solo dar recomendaciones. Es analizar tu situación actual, entender tus objetivos de negocio y diseñar un plan concreto y ejecutable con presupuestos reales.',
            items: ['Auditoría de sistemas y procesos actuales', 'Identificación de cuellos de botella tecnológicos', 'Evaluación de deuda técnica', 'Diseño de arquitectura de solución', 'Selección de tecnologías y proveedores', 'Roadmap de implementación por fases', 'Estimación de costos y ROI', 'Acompañamiento en la toma de decisiones'],
          },
          {
            h2: '¿Cuándo necesitas consultoría tecnológica?',
            content: 'Necesitas consultoría cuando estás considerando una inversión tecnológica importante y no sabes por dónde empezar. Cuando tienes sistemas que no funcionan bien pero no sabes si repararlos o reemplazarlos. Cuando quieres implementar IA o automatización pero no sabes qué es viable para tu caso. O cuando necesitas justificar una inversión tecnológica ante tu consejo directivo.',
          },
          {
            h2: 'Tipos de consultoría que ofrecemos',
            content: 'Cada empresa tiene necesidades distintas. Adaptamos el alcance de la consultoría a tu situación específica.',
            items: ['Auditoría técnica de sistemas existentes', 'Consultoría de arquitectura de software', 'Evaluación de proveedores tecnológicos', 'Roadmap de transformación digital', 'Consultoría de seguridad informática', 'Evaluación de viabilidad de proyectos', 'Consultoría de selección de ERP/CRM', 'Acompañamiento en licitaciones tecnológicas'],
          },
          {
            h2: '¿Cuánto cuesta la consultoría tecnológica?',
            content: 'La primera sesión de 30 minutos es completamente gratuita. Consultorías puntuales: desde $200 USD. Proyectos de consultoría completos con entregables: $500-$2,000 USD según alcance.',
          },
        ]}
        faqs={[
          { q: '¿La consultoría incluye el desarrollo posterior?', a: 'No necesariamente. Puedes contratar solo la consultoría y ejecutar el plan con tu equipo interno o con otro proveedor. Si decides trabajar con nosotros en el desarrollo, el costo de la consultoría se descuenta del proyecto.' },
          { q: '¿Qué entregables recibo de la consultoría?', a: 'Depende del alcance. Típicamente: documento de diagnóstico, arquitectura de solución propuesta, roadmap de implementación con tiempos y costos estimados, y recomendaciones de tecnologías.' },
          { q: '¿Pueden auditar el trabajo de otro proveedor?', a: 'Sí. Realizamos auditorías de código y sistemas desarrollados por terceros para identificar problemas de calidad, seguridad o escalabilidad.' },
          { q: '¿Trabajan con empresas que ya tienen equipo de TI interno?', a: 'Sí. Podemos trabajar como consultores externos que complementan a tu equipo interno, aportando perspectiva externa y experiencia en proyectos similares.' },
        ]}
        tech={['React', 'Next.js', 'Node.js', 'Firebase', 'AWS', 'MySQL', 'MongoDB', 'Docker', 'Git', 'Figma']}
        ctaText="Agendar consultoría gratuita"
        relatedServices={[
          { name: 'Desarrollo de Software', href: '/servicios/desarrollo-software' },
          { name: 'Automatización Empresarial', href: '/servicios/automatizacion-empresarial' },
          { name: 'ERP Empresarial', href: '/servicios/erp-empresarial' },
          { name: 'Inteligencia Artificial', href: '/servicios/inteligencia-artificial' },
        ]}
      />
    </>
  );
}
