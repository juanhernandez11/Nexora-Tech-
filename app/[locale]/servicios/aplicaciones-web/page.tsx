import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import Link from 'next/link';
import ServicePageClient from '@/components/sections/ServicePageClient';

const BASE = 'https://nexorate.netlify.app';

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }): Promise<Metadata> {
  return {
    title: 'Desarrollo de Aplicaciones Web Empresariales en México | Nexora Tech',
    description: 'Desarrollamos aplicaciones web progresivas (PWA) y plataformas empresariales que escalan. React, TypeScript, Firebase. Funcionan en cualquier dispositivo. Desde $1,000 USD.',
    alternates: {
      canonical: locale === 'es' ? `${BASE}/servicios/aplicaciones-web` : `${BASE}/en/servicios/aplicaciones-web`,
      languages: { es: `${BASE}/servicios/aplicaciones-web`, en: `${BASE}/en/servicios/aplicaciones-web` },
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
        { '@type': 'ListItem', position: 3, name: 'Aplicaciones Web', item: `${BASE}/servicios/aplicaciones-web` },
      ],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'Service',
      name: 'Desarrollo de Aplicaciones Web',
      description: 'Desarrollo de aplicaciones web progresivas y plataformas empresariales escalables con React y TypeScript para empresas en México.',
      provider: { '@id': `${BASE}/#organization` },
      areaServed: { '@type': 'Country', name: 'México' },
      offers: { '@type': 'Offer', priceCurrency: 'USD', priceRange: '1000-5000' },
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
          <span className="text-slate-600 dark:text-slate-300">Aplicaciones Web</span>
        </nav>
      </div>
      <ServicePageClient
        locale={locale}
        badge="Aplicaciones Web"
        h1="Aplicaciones Web Empresariales"
        h1Highlight="que escalan contigo."
        subtitle="Desarrollamos plataformas web progresivas que funcionan en cualquier dispositivo, escalan sin límites y se integran con tus sistemas actuales. Sin apps nativas, sin App Store, sin costos de distribución."
        benefits={[
          { title: 'Funciona en cualquier dispositivo', desc: 'Web, móvil y tablet con una sola base de código. Sin apps nativas.' },
          { title: 'Escalable a millones de usuarios', desc: 'Arquitecturas cloud que crecen con tu negocio sin refactorizar.' },
          { title: 'Sin App Store ni Google Play', desc: 'Distribución instantánea. Actualizaciones sin aprobaciones externas.' },
        ]}
        sections={[
          {
            h2: '¿Qué es una aplicación web progresiva (PWA)?',
            content: 'Una PWA es una aplicación web que se comporta como una app nativa. Se instala en el dispositivo del usuario, funciona offline, envía notificaciones push y carga instantáneamente. Sin necesidad de publicar en App Store o Google Play. Es la solución ideal para empresas que necesitan una app pero quieren evitar los costos y complejidad del desarrollo nativo.',
            items: ['Instalable en móvil sin App Store', 'Funciona sin conexión a internet', 'Notificaciones push nativas', 'Carga instantánea con caché inteligente', 'Actualización automática sin intervención del usuario', 'Compatible con iOS y Android'],
          },
          {
            h2: 'Tipos de aplicaciones web que desarrollamos',
            content: 'Desarrollamos cualquier tipo de plataforma web empresarial, desde dashboards internos hasta plataformas de cara al cliente.',
            items: ['Plataformas SaaS empresariales', 'Dashboards y herramientas de análisis', 'Portales de clientes y proveedores', 'Sistemas de gestión internos', 'Plataformas educativas y e-learning', 'Marketplaces y plataformas de comercio', 'Herramientas de colaboración en equipo', 'Aplicaciones de campo con soporte offline'],
          },
          {
            h2: 'Arquitectura para escalar sin límites',
            content: 'Diseñamos la arquitectura desde el inicio pensando en el crecimiento. Firebase para tiempo real y escalabilidad automática. Next.js para rendimiento máximo. TypeScript para código mantenible a largo plazo. Así evitamos la trampa de tener que reescribir todo cuando la aplicación crece.',
          },
          {
            h2: '¿Cuánto cuesta desarrollar una aplicación web?',
            content: 'Aplicaciones simples con autenticación y CRUD básico: desde $1,000 USD. Plataformas complejas con múltiples roles, integraciones y lógica de negocio avanzada: $3,000-$5,000+ USD. En la consultoría gratuita te damos un presupuesto exacto.',
          },
        ]}
        faqs={[
          { q: '¿Es mejor una app nativa o una aplicación web?', a: 'Para la mayoría de casos empresariales, una PWA es suficiente y mucho más económica. Las apps nativas solo tienen ventaja cuando necesitas acceso a hardware específico del dispositivo (cámara avanzada, GPS de alta precisión, Bluetooth).' },
          { q: '¿La aplicación web funciona sin internet?', a: 'Sí, si la desarrollamos como PWA con service workers. Puede funcionar offline con datos en caché y sincronizar cuando recupera conexión.' },
          { q: '¿Cuántos usuarios puede soportar?', a: 'Con arquitectura Firebase o cloud, la aplicación escala automáticamente. Hemos diseñado arquitecturas para 10,000+ usuarios concurrentes desde el inicio.' },
          { q: '¿Puedo tener múltiples roles de usuario?', a: 'Sí. Implementamos sistemas de roles y permisos granulares. Administradores, supervisores, operadores, clientes — cada uno con acceso exactamente a lo que necesita.' },
        ]}
        tech={['React', 'TypeScript', 'Next.js', 'Firebase', 'Node.js', 'PWA', 'Service Workers', 'MySQL', 'MongoDB', 'Tailwind CSS']}
        ctaText="Solicitar consultoría gratuita"
        relatedServices={[
          { name: 'Desarrollo de Software', href: '/servicios/desarrollo-software' },
          { name: 'Software a Medida', href: '/servicios/software-a-medida' },
          { name: 'Inteligencia Artificial', href: '/servicios/inteligencia-artificial' },
          { name: 'CRM Personalizado', href: '/servicios/crm-personalizado' },
        ]}
      />
    </>
  );
}
