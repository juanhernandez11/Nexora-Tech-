import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import Link from 'next/link';
import ServicePageClient from '@/components/sections/ServicePageClient';

const BASE = 'https://nexorate.netlify.app';

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }): Promise<Metadata> {
  return {
    title: 'Inteligencia Artificial para Empresas en México | Nexora Tech',
    description: 'Integramos IA en tus sistemas empresariales. Chatbots, análisis predictivo, automatización inteligente con Google Gemini y OpenAI. Resultados reales desde $1,500 USD.',
    alternates: {
      canonical: locale === 'es' ? `${BASE}/servicios/inteligencia-artificial` : `${BASE}/en/servicios/inteligencia-artificial`,
      languages: { es: `${BASE}/servicios/inteligencia-artificial`, en: `${BASE}/en/servicios/inteligencia-artificial` },
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
        { '@type': 'ListItem', position: 3, name: 'Inteligencia Artificial', item: `${BASE}/servicios/inteligencia-artificial` },
      ],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'Service',
      name: 'Inteligencia Artificial para Empresas',
      description: 'Integración de IA en sistemas empresariales existentes. Chatbots, análisis predictivo y automatización inteligente para empresas en México.',
      provider: { '@id': `${BASE}/#organization` },
      areaServed: { '@type': 'Country', name: 'México' },
      offers: { '@type': 'Offer', priceCurrency: 'USD', priceRange: '1500-6000' },
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
          <span className="text-slate-600 dark:text-slate-300">Inteligencia Artificial</span>
        </nav>
      </div>
      <ServicePageClient
        locale={locale}
        badge="IA para Empresas"
        h1="Inteligencia Artificial para Empresas:"
        h1Highlight="Resultados reales, no promesas."
        subtitle="Integramos IA directamente en tus sistemas empresariales existentes. No necesitas reemplazar nada. Agregamos capacidades inteligentes que automatizan decisiones, analizan datos y mejoran la experiencia de tus clientes."
        benefits={[
          { title: 'Sin reemplazar tus sistemas', desc: 'La IA se integra sobre lo que ya tienes. Sin migraciones costosas.' },
          { title: 'Resultados desde el día 1', desc: 'Implementaciones funcionales en 2-4 semanas con métricas claras.' },
          { title: 'IA de nivel empresarial', desc: 'Google Gemini, OpenAI y AWS SageMaker al alcance de tu PyME.' },
        ]}
        sections={[
          {
            h2: '¿Qué puede hacer la IA por tu empresa hoy?',
            content: 'La IA ya no es ciencia ficción ni exclusiva de grandes corporaciones. Hoy puedes integrarla en tu empresa con presupuestos accesibles y resultados medibles desde las primeras semanas.',
            items: ['Chatbot de atención al cliente 24/7', 'Análisis automático de documentos y contratos', 'Predicción de demanda e inventarios', 'Generación automática de reportes narrativos', 'Asistente interno para tu equipo', 'Clasificación automática de tickets y solicitudes', 'Análisis de sentimiento en reseñas de clientes', 'Recomendaciones personalizadas de productos'],
          },
          {
            h2: 'Tecnologías de IA que implementamos',
            content: 'Seleccionamos la tecnología de IA más adecuada para cada caso. No usamos la misma solución para todos los problemas.',
            items: ['Google Gemini — IA multimodal para texto, imágenes y datos', 'OpenAI GPT-4 — procesamiento de lenguaje natural avanzado', 'AWS SageMaker — machine learning personalizado a escala', 'Hugging Face — modelos open source para casos específicos', 'LangChain — orquestación de agentes IA complejos'],
          },
          {
            h2: 'Caso real: Estudio Genius',
            content: 'Plataforma educativa sin herramienta centralizada para organizar materias y recursos con asistencia inteligente. Desarrollamos una Web App full-stack con React + TypeScript + Firebase e integración de Google Gemini para recomendaciones académicas personalizadas en tiempo real. Arquitectura escalable a 10,000+ usuarios desde el primer día.',
          },
          {
            h2: '¿Cuánto cuesta integrar IA en mi empresa?',
            content: 'Los proyectos de integración de IA van desde $1,500 USD para chatbots simples hasta $6,000+ USD para sistemas de machine learning personalizados. El costo de las APIs de IA (Gemini, OpenAI) es adicional y varía según el uso, típicamente $20-200 USD/mes para PyMEs.',
          },
        ]}
        faqs={[
          { q: '¿Necesito datos históricos para implementar IA?', a: 'Depende del caso. Para chatbots y asistentes no necesitas datos históricos. Para predicciones y machine learning sí necesitas datos, generalmente 6-12 meses de historial.' },
          { q: '¿La IA reemplazará a mis empleados?', a: 'No. La IA automatiza tareas repetitivas y libera a tu equipo para trabajo de mayor valor. Es una herramienta que potencia a las personas, no las reemplaza.' },
          { q: '¿Qué tan segura es la IA con datos confidenciales?', a: 'Implementamos las mejores prácticas de seguridad. Los datos sensibles nunca se envían a APIs externas sin encriptación. Podemos usar modelos locales para casos con alta confidencialidad.' },
          { q: '¿Cuánto tiempo tarda implementar IA?', a: 'Chatbots y asistentes simples: 2-3 semanas. Sistemas de análisis predictivo: 4-8 semanas. Machine learning personalizado: 8-16 semanas.' },
        ]}
        tech={['Google Gemini', 'OpenAI GPT-4', 'AWS SageMaker', 'LangChain', 'Python', 'Node.js', 'Firebase', 'REST APIs', 'TypeScript']}
        ctaText="Descubrir cómo la IA puede ayudarte"
        relatedServices={[
          { name: 'Automatización Empresarial', href: '/servicios/automatizacion-empresarial' },
          { name: 'Desarrollo de Software', href: '/servicios/desarrollo-software' },
          { name: 'Consultoría Tecnológica', href: '/servicios/consultoria-tecnologica' },
          { name: 'CRM Personalizado', href: '/servicios/crm-personalizado' },
        ]}
      />
    </>
  );
}
