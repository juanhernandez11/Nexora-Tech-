import { getTranslations, setRequestLocale } from 'next-intl/server';
import type { Metadata } from 'next';
import Link from 'next/link';
import FAQClient from './FAQClient';

const faqItems = [
  // Comerciales
  { q: '¿Cuánto cuesta desarrollar software a medida en México?', a: 'Los proyectos van desde $500 USD para sitios web hasta $5,000+ USD para aplicaciones empresariales complejas. El costo depende del alcance, tecnologías y tiempo de desarrollo. Ofrecemos consultoría gratuita para darte un presupuesto exacto sin compromiso.' },
  { q: '¿Cuánto tiempo tarda un proyecto de desarrollo de software?', a: 'Un sitio web optimizado tarda 1-2 semanas. Aplicaciones web con lógica de negocio compleja o integración de IA pueden tomar 4-8 semanas. En la consultoría inicial entregamos un timeline exacto con hitos claros.' },
  { q: '¿Trabajan con empresas fuera de Puebla y fuera de México?', a: 'Sí. Trabajamos con clientes en toda Latinoamérica y Estados Unidos. Toda la comunicación es remota usando herramientas colaborativas modernas. El huso horario no es un obstáculo.' },
  { q: '¿Qué incluye la consultoría gratuita?', a: 'Una sesión de 30 minutos donde analizamos tu caso, identificamos el problema técnico, proponemos una solución y te entregamos un presupuesto estimado. Sin costo y sin compromiso de contratación.' },
  { q: '¿Cómo es el proceso de pago y qué garantías ofrecen?', a: '50% al inicio del proyecto para reservar la agenda y comenzar el desarrollo. El 50% restante se liquida en la entrega final aprobada. Si no cumplimos con lo acordado, ofrecemos garantía de devolución proporcional.' },
  { q: '¿Puedo ver ejemplos de proyectos anteriores?', a: 'Sí. En la sección Casos de Éxito puedes ver proyectos reales con métricas verificables. Estudio Genius tiene un link funcional que puedes visitar ahora mismo. En la consultoría podemos compartir más ejemplos según tu industria.' },
  { q: '¿Qué pasa si el proyecto no cumple mis expectativas?', a: 'Trabajamos con revisiones ilimitadas durante el desarrollo hasta que estés 100% satisfecho. Si no cumplimos con lo acordado en el contrato, ofrecemos garantía de devolución proporcional al trabajo no entregado.' },
  { q: '¿Ofrecen mantenimiento y soporte después del lanzamiento?', a: 'Sí. Incluimos 30 días de soporte técnico gratuito post-lanzamiento. Después ofrecemos planes de mantenimiento mensual desde $100 USD con actualizaciones, backups y soporte prioritario.' },
  { q: '¿Cuál es el proyecto mínimo que aceptan?', a: 'Aceptamos proyectos desde $500 USD. Lo importante es que el proyecto tenga un objetivo claro y un problema real que resolver. No hay mínimo de tamaño de empresa.' },
  { q: '¿Trabajan con startups o solo con empresas establecidas?', a: 'Trabajamos con ambas. Tenemos experiencia desarrollando MVPs para startups y sistemas empresariales para corporativos. Adaptamos el proceso y presupuesto a cada etapa de negocio.' },
  { q: '¿Pueden desarrollar un CRM personalizado para mi empresa?', a: 'Sí. Desarrollamos CRM a medida adaptados a tu proceso de ventas específico. Sin licencias mensuales, 100% tuyo, con las funcionalidades exactas que necesitas y sin las que no usarías.' },
  { q: '¿Firman NDA y acuerdos de confidencialidad?', a: 'Sí. Firmamos acuerdos de confidencialidad antes de iniciar cualquier proyecto. La información de tu negocio, estrategias y datos son completamente confidenciales.' },
  { q: '¿Qué diferencia a Nexora Tech de otras empresas de software?', a: 'Entregamos resultados medibles, no solo código. Cada proyecto incluye métricas de éxito definidas desde el inicio, entregas parciales para que veas el avance, y garantía de devolución si no cumplimos.' },
  { q: '¿Puedo escalar el proyecto después de la entrega inicial?', a: 'Sí. Desarrollamos con arquitecturas escalables desde el inicio. Puedes empezar con un MVP y agregar funcionalidades en fases posteriores sin necesidad de reescribir el sistema.' },
  { q: '¿Tienen experiencia en mi industria específica?', a: 'Tenemos experiencia en salud, educación, retail, logística y servicios profesionales. En la consultoría inicial evaluamos tu industria y te mostramos casos relevantes.' },
  // Técnicas
  { q: '¿Qué tecnologías utilizan para el desarrollo?', a: 'React, TypeScript, Next.js, Node.js, Firebase, MySQL, MongoDB, WordPress y Google Gemini para IA. Seleccionamos el stack óptimo para cada proyecto específico, no el que está de moda.' },
  { q: '¿Pueden integrarse con mis sistemas actuales?', a: 'Sí. Desarrollamos integraciones con APIs REST, webhooks y conectores personalizados para conectar el nuevo software con tus sistemas existentes como ERP, CRM, SAP o cualquier plataforma con API disponible.' },
  { q: '¿Cómo garantizan la seguridad del software que desarrollan?', a: 'Implementamos HTTPS, sanitización de inputs, validación server-side, headers de seguridad (CSP, X-Frame-Options), autenticación segura y revisión de vulnerabilidades OWASP en cada proyecto.' },
  { q: '¿Pueden migrar mi sistema actual a tecnología moderna?', a: 'Sí. Realizamos migraciones de sistemas legacy a tecnologías modernas con zero downtime. Analizamos el sistema actual, diseñamos la arquitectura nueva y migramos por fases para no interrumpir tu operación.' },
  { q: '¿Qué es Next.js y por qué lo usan?', a: 'Next.js es el framework de React más usado en producción. Lo usamos porque genera sitios ultra-rápidos (Core Web Vitals en verde), tiene SEO nativo, soporta internacionalización y escala sin problemas.' },
  { q: '¿Qué es un ERP y cuándo necesita mi empresa uno?', a: 'Un ERP es un sistema que integra todas las áreas de tu empresa (ventas, inventario, finanzas, RRHH) en una sola plataforma. Lo necesitas cuando manejas múltiples áreas con sistemas desconectados o en hojas de cálculo.' },
  { q: '¿Cómo integran inteligencia artificial en sistemas existentes?', a: 'Conectamos APIs de IA (Google Gemini, OpenAI) a tus sistemas actuales mediante integraciones. No necesitas reemplazar tu software, simplemente le agregamos capacidades inteligentes como análisis, predicciones o asistentes.' },
  { q: '¿Qué es Core Web Vitals y por qué importa para mi sitio?', a: 'Son las métricas de Google que miden la experiencia del usuario: velocidad de carga, estabilidad visual e interactividad. Un sitio con Core Web Vitals en verde posiciona mejor en Google y convierte más visitantes.' },
  { q: '¿El código desarrollado es 100% mío al finalizar?', a: 'Sí. Una vez liquidado el pago total, recibes la propiedad completa del código fuente y todos los activos digitales. Sin licencias ni dependencias de Nexora Tech.' },
  { q: '¿Pueden optimizar mi sitio WordPress actual?', a: 'Sí. Realizamos auditorías técnicas completas de WordPress: optimización de imágenes, caché avanzado, corrección de Core Web Vitals, SEO on-page y seguridad. Hemos llevado sitios de LCP 6s a 1.8s.' },
  { q: '¿Qué es Firebase y cuándo lo recomiendan?', a: 'Firebase es la plataforma cloud de Google. Lo recomendamos para aplicaciones que necesitan base de datos en tiempo real, autenticación rápida y escalabilidad automática sin gestionar servidores.' },
  { q: '¿Pueden desarrollar software que funcione sin internet?', a: 'Sí. Desarrollamos aplicaciones PWA (Progressive Web Apps) que funcionan offline y se sincronizan cuando hay conexión. Ideal para equipos en campo o zonas con conectividad limitada.' },
  { q: '¿Qué es un MVP y cuándo conviene desarrollar uno?', a: 'Un MVP (Producto Mínimo Viable) es la versión más simple de tu software que valida la idea con usuarios reales. Conviene cuando quieres probar el mercado antes de invertir en el producto completo.' },
  { q: '¿Cómo manejan las copias de seguridad del sistema?', a: 'Configuramos backups automáticos diarios en la nube. En caso de fallo, el sistema puede restaurarse en minutos. Los planes de mantenimiento mensual incluyen monitoreo de backups.' },
  { q: '¿Desarrollan aplicaciones móviles además de web?', a: 'Desarrollamos aplicaciones web progresivas (PWA) que funcionan como apps nativas en móvil sin necesidad de publicar en App Store o Google Play. Para apps nativas complejas, evaluamos el caso específico.' },
  // Contratación
  { q: '¿Cómo inicio un proyecto con Nexora Tech?', a: 'Llena el formulario de contacto o escríbenos por LinkedIn. En menos de 24 horas agendamos una consultoría gratuita de 30 minutos, analizamos tu caso y te entregamos una propuesta personalizada.' },
  { q: '¿Qué información necesitan para darme un presupuesto?', a: 'Descripción del problema que quieres resolver, funcionalidades principales que necesitas, plazo estimado y presupuesto aproximado. Con eso podemos darte un estimado en la primera consultoría.' },
  { q: '¿Tienen contratos formales o trabajan de forma informal?', a: 'Trabajamos con contratos formales que especifican alcance, entregables, plazos, costos y garantías. Esto protege a ambas partes y establece expectativas claras desde el inicio.' },
  { q: '¿Cómo se manejan los cambios de alcance durante el proyecto?', a: 'Los cambios dentro del alcance original se incluyen sin costo adicional. Los cambios que amplían el alcance se cotizan por separado y requieren aprobación escrita antes de implementarse.' },
  { q: '¿Qué métodos de pago aceptan?', a: 'Aceptamos transferencia bancaria (SPEI para México) y PayPal para pagos internacionales. El 50% inicial se paga al firmar el contrato y el 50% restante en la entrega final aprobada.' },
  { q: '¿Puedo cancelar el proyecto a mitad del desarrollo?', a: 'Sí, con aviso de 5 días hábiles. El anticipo del 50% no es reembolsable. Si Nexora Tech cancela el proyecto, se reembolsa el proporcional del trabajo no realizado.' },
  { q: '¿Cómo me mantengo informado del avance del proyecto?', a: 'Hacemos entregas parciales cada 1-2 semanas para que veas el progreso real. Usamos herramientas colaborativas (Notion, GitHub, Figma) donde puedes ver el estado en tiempo real.' },
  { q: '¿Puedo participar activamente en el desarrollo?', a: 'Sí y lo recomendamos. Tu participación en revisiones y feedback acelera el proyecto y garantiza que el resultado final sea exactamente lo que necesitas.' },
  { q: '¿Ofrecen capacitación para usar el software entregado?', a: 'Sí. Incluimos sesión de capacitación al momento de la entrega y documentación de usuario. Los planes de mantenimiento incluyen soporte continuo para dudas de uso.' },
  { q: '¿Qué pasa si necesito soporte urgente después del lanzamiento?', a: 'Durante los 30 días de soporte gratuito respondemos en menos de 24 horas. Los planes de mantenimiento mensual incluyen soporte prioritario con respuesta en menos de 4 horas.' },
  { q: '¿Pueden trabajar bajo la modalidad de equipo extendido?', a: 'Sí. Podemos integrarnos a tu equipo existente como desarrolladores externos, trabajando bajo tu metodología y herramientas. Ideal para empresas que necesitan capacidad adicional de desarrollo.' },
  { q: '¿Pueden contratar solo consultoría sin desarrollo?', a: 'Sí. Ofrecemos consultoría tecnológica independiente: auditorías de sistemas, definición de arquitectura, selección de tecnologías y roadmap digital. Sin necesidad de contratar desarrollo.' },
  { q: '¿Cuántas personas trabajan en mi proyecto simultáneamente?', a: 'Dependiendo del tamaño del proyecto, puede ser 1 desarrollador senior para proyectos pequeños o un equipo de 2-3 personas para proyectos complejos. Siempre con un punto de contacto único.' },
  { q: '¿Tienen referencias de clientes que pueda contactar?', a: 'Sí. Podemos conectarte con clientes anteriores que hayan dado su autorización para ser referencia. También puedes verificar los testimonios en nuestra sección de casos de éxito.' },
  { q: '¿Pueden contratar por horas o solo por proyecto completo?', a: 'Principalmente trabajamos por proyecto con alcance definido. Para mantenimiento y mejoras continuas ofrecemos paquetes de horas mensuales desde $100 USD.' },
  { q: '¿Qué herramientas usan para la gestión del proyecto?', a: 'GitHub para control de versiones, Notion para documentación y seguimiento, Figma para diseño y prototipos, y comunicación por WhatsApp o email según preferencia del cliente.' },
  { q: '¿Trabajan con startups o solo con empresas establecidas?', a: 'Con ambas. Para startups desarrollamos MVPs ágiles y económicos. Para empresas establecidas construimos sistemas robustos y escalables. El enfoque se adapta a cada etapa.' },
  { q: '¿Pueden hacer una auditoría de mi sistema actual antes de proponer solución?', a: 'Sí. Realizamos auditorías técnicas de sistemas existentes para identificar cuellos de botella, vulnerabilidades y oportunidades de mejora. Es parte de nuestro proceso de descubrimiento.' },
  { q: '¿Qué garantías tienen de que el proyecto se entregará a tiempo?', a: 'Cumplimos los plazos acordados o devolvemos el proporcional. Usamos metodología ágil con hitos claros y entregas parciales para detectar desviaciones a tiempo y corregirlas.' },
  { q: '¿Cómo protegen la propiedad intelectual de mi idea o negocio?', a: 'Firmamos NDA antes de cualquier conversación técnica. El código y todos los activos desarrollados son 100% tuyos al finalizar. No reutilizamos código propietario de un cliente en otro proyecto.' },
];

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const baseUrl = 'https://nexorate.netlify.app';
  const isEs = locale === 'es';
  return {
    title: isEs
      ? 'Preguntas Frecuentes sobre Desarrollo de Software | Nexora Tech'
      : 'FAQ — Software Development Questions | Nexora Tech',
    description: isEs
      ? '50 respuestas a las preguntas más comunes sobre desarrollo de software, automatización, IA y contratación. Costos, tiempos, tecnologías y garantías.'
      : '50 answers to the most common questions about software development, automation, AI and hiring. Costs, timelines, technologies and guarantees.',
    alternates: {
      canonical: isEs ? `${baseUrl}/faq` : `${baseUrl}/en/faq`,
      languages: { es: `${baseUrl}/faq`, en: `${baseUrl}/en/faq` },
    },
  };
}

export default async function FAQPage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  setRequestLocale(locale);

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqItems.map((item) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: { '@type': 'Answer', text: item.a },
    })),
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Inicio', item: 'https://nexorate.netlify.app' },
      { '@type': 'ListItem', position: 2, name: 'FAQ', item: 'https://nexorate.netlify.app/faq' },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <div className="min-h-screen bg-[#FAFAFA] dark:bg-slate-950 text-slate-900 dark:text-slate-100">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-20">
          <nav className="text-xs text-slate-400 mb-10 flex items-center gap-2">
            <Link href="/" className="hover:text-brand-600 transition-colors">Inicio</Link>
            <span>/</span>
            <span className="text-slate-600 dark:text-slate-300">FAQ</span>
          </nav>

          <div className="mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-brand-50 dark:bg-brand-900/30 border border-brand-100 dark:border-brand-800 rounded-full mb-6">
              <span className="text-[11px] font-black text-brand-600 dark:text-brand-400 uppercase tracking-widest">
                {locale === 'es' ? 'Preguntas Frecuentes' : 'Frequently Asked Questions'}
              </span>
            </div>
            <h1 className="font-heading text-4xl sm:text-5xl font-black tracking-tighter text-slate-900 dark:text-white mb-4">
              {locale === 'es' ? 'Todo lo que necesitas saber' : 'Everything you need to know'}
            </h1>
            <p className="text-slate-500 dark:text-slate-400 text-lg">
              {locale === 'es'
                ? '50 respuestas a las preguntas más comunes antes de iniciar un proyecto.'
                : '50 answers to the most common questions before starting a project.'}
            </p>
          </div>

          <FAQClient items={faqItems} locale={locale} />

          <div className="mt-16 bg-gradient-to-br from-brand-600 to-violet-600 rounded-2xl p-8 text-white text-center">
            <h2 className="font-heading text-2xl font-black mb-3">
              {locale === 'es' ? '¿No encontraste tu respuesta?' : "Didn't find your answer?"}
            </h2>
            <p className="text-brand-100 mb-6">
              {locale === 'es'
                ? 'Escríbenos directamente y respondemos en menos de 24 horas.'
                : 'Write to us directly and we will respond within 24 hours.'}
            </p>
            <Link
              href="/#contacto-form"
              className="inline-block bg-white text-brand-600 px-8 py-3.5 rounded-xl font-black uppercase tracking-widest text-sm hover:bg-brand-50 transition-all shadow-xl"
            >
              {locale === 'es' ? 'Hacer mi pregunta' : 'Ask my question'}
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
