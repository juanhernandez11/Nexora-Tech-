export type Locale = 'es' | 'en';

export const solutionsData: Record<Locale, Array<{ type: string; title: string; description: string; features: string[] }>> = {
  es: [
    { type: 'Small Business', title: 'PyMEs & Negocios Locales', description: 'Tu sitio web es tu vendedor 24/7. Lo construimos para que cargue en menos de 2 segundos, aparezca en Google y convierta visitantes en clientes reales.', features: ['SEO Local Avanzado', 'Optimización de WordPress', 'Diseño Ultra-Responsivo'] },
    { type: 'Mid-Market', title: 'Medianas Empresas', description: 'Cada proceso manual que automatizamos es tiempo y dinero que recuperas. Sistemas de gestión, dashboards y flujos automáticos que eliminan el trabajo repetitivo.', features: ['Sistemas de Inventario', 'Dashboards de Datos', 'Automatización de Reportes'] },
    { type: 'Enterprise', title: 'Grandes Corporativos', description: 'Infraestructuras que soportan 10x el crecimiento sin refactorizar. React, TypeScript e IA generativa para empresas que no pueden permitirse la lentitud.', features: ['Integración de IA Generativa', 'Arquitecturas Cloud', 'Seguridad de Grado Bancario'] },
  ],
  en: [
    { type: 'Small Business', title: 'SMBs & Local Businesses', description: 'Your website is your 24/7 salesperson. We build it to load in under 2 seconds, rank on Google and convert visitors into real customers.', features: ['Advanced Local SEO', 'WordPress Optimization', 'Ultra-Responsive Design'] },
    { type: 'Mid-Market', title: 'Mid-Size Companies', description: 'Every manual process we automate is time and money you recover. Management systems, dashboards and automated workflows that eliminate repetitive work.', features: ['Inventory Systems', 'Data Dashboards', 'Report Automation'] },
    { type: 'Enterprise', title: 'Large Corporations', description: 'Infrastructures that support 10x growth without refactoring. React, TypeScript and generative AI for companies that can\'t afford slowness.', features: ['Generative AI Integration', 'Cloud Architectures', 'Bank-Grade Security'] },
  ],
};

export const casesData: Record<Locale, Array<{ title: string; company: string; tag: string; problem: string; solution: string; description: string; metricsShort: string; link?: string; gradient: string; tech: string[] }>> = {
  es: [
    { title: 'Ecosistema Educativo Inteligente', company: 'Estudio Genius', tag: 'IA & React', problem: 'Estudiantes sin herramienta centralizada para organizar materias, tareas y recursos con asistencia inteligente.', solution: 'Web App full-stack con React + TypeScript + Firebase e integración de Google Gemini para recomendaciones académicas personalizadas en tiempo real.', description: 'Plataforma educativa completa con autenticación, base de datos en tiempo real y asistente IA operativo desde el primer día.', metricsShort: 'Arquitectura escalable a 10,000+ usuarios', link: 'https://estudiogenius.netlify.app/', gradient: 'from-indigo-600 to-violet-600', tech: ['React', 'TypeScript', 'Gemini IA', 'Firebase', 'Netlify'] },
    { title: 'Infraestructura WordPress Corporativa', company: 'ARH Consultores', tag: 'Performance & SEO', problem: 'Sitio WordPress con Core Web Vitals en rojo, LCP de 6.2 segundos y pérdida de posicionamiento orgánico en Google.', solution: 'Auditoría técnica completa, optimización de imágenes, caché avanzado, reestructuración SEO on-page y corrección de estructura de headings.', description: 'Optimización técnica integral que llevó todos los Core Web Vitals a verde y recuperó el posicionamiento orgánico del sitio.', metricsShort: 'LCP reducido de 6.2s a 1.8s', gradient: 'from-blue-600 to-indigo-500', tech: ['WordPress', 'WP Rocket', 'Yoast SEO', 'Core Web Vitals'] },
    { title: 'Automatización Sector Salud', company: 'Jurisdicción Sanitaria Núm. 10', tag: 'Software de Inventario', problem: 'Control de suministros médicos en hojas de cálculo manuales, con errores frecuentes y tiempos de consulta de 15+ minutos.', solution: 'Sistema web de gestión de inventarios con control de entradas/salidas, alertas de stock mínimo y reportes automáticos.', description: 'Digitalización completa del proceso de inventario para institución de salud pública con trazabilidad total.', metricsShort: 'Reducción del 20% en tiempos de gestión', gradient: 'from-emerald-500 to-teal-600', tech: ['HTML5', 'CSS3', 'JavaScript', 'Gestión de Datos'] },
    { title: 'Sistema de Gestión de Aparcamiento', company: 'Software Comercial', tag: 'Gestión & Pagos', problem: 'Estacionamiento con registro manual de entradas/salidas, cobros inconsistentes y sin reportes de ocupación.', solution: 'Software de gestión completa de espacios, cálculo automático de tarifas y reportes diarios/semanales/mensuales.', description: 'Producto comercializable listo para venta a estacionamientos en México con lógica de cobro robusta.', metricsShort: 'Producto listo para comercialización', gradient: 'from-slate-700 to-slate-900', tech: ['MySQL', 'Lógica de Cobro', 'Gestión de Espacios'] },
  ],
  en: [
    { title: 'Intelligent Educational Ecosystem', company: 'Estudio Genius', tag: 'AI & React', problem: 'Students without a centralized tool to organize subjects, tasks and resources with intelligent assistance.', solution: 'Full-stack Web App with React + TypeScript + Firebase and Google Gemini integration for personalized academic recommendations in real time.', description: 'Complete educational platform with authentication, real-time database and operational AI assistant from day one.', metricsShort: 'Scalable architecture to 10,000+ users', link: 'https://estudiogenius.netlify.app/', gradient: 'from-indigo-600 to-violet-600', tech: ['React', 'TypeScript', 'Gemini AI', 'Firebase', 'Netlify'] },
    { title: 'Corporate WordPress Infrastructure', company: 'ARH Consultores', tag: 'Performance & SEO', problem: 'WordPress site with red Core Web Vitals, 6.2 second LCP and loss of organic ranking on Google.', solution: 'Complete technical audit, image optimization, advanced caching, SEO on-page restructuring and heading structure correction.', description: 'Comprehensive technical optimization that turned all Core Web Vitals green and recovered the site\'s organic ranking.', metricsShort: 'LCP reduced from 6.2s to 1.8s', gradient: 'from-blue-600 to-indigo-500', tech: ['WordPress', 'WP Rocket', 'Yoast SEO', 'Core Web Vitals'] },
    { title: 'Healthcare Automation', company: 'Jurisdicción Sanitaria Núm. 10', tag: 'Inventory Software', problem: 'Medical supply control in manual spreadsheets, with frequent errors and 15+ minute query times per operation.', solution: 'Web inventory management system with entry/exit control, minimum stock alerts and automatic reports.', description: 'Complete digitization of the inventory process for a public health institution with full movement traceability.', metricsShort: '20% reduction in management time', gradient: 'from-emerald-500 to-teal-600', tech: ['HTML5', 'CSS3', 'JavaScript', 'Data Management'] },
    { title: 'Parking Management System', company: 'Commercial Software', tag: 'Management & Payments', problem: 'Parking lot with manual entry/exit records, inconsistent charges and no occupancy reports.', solution: 'Complete space management software, automatic rate calculation and daily/weekly/monthly reports.', description: 'Marketable product ready for sale to parking lots in Mexico with robust billing logic.', metricsShort: 'Product ready for commercialization', gradient: 'from-slate-700 to-slate-900', tech: ['MySQL', 'Billing Logic', 'Space Management'] },
  ],
};

export const testimonialsData: Record<Locale, Array<{ name: string; role: string; company: string; avatar: string; avatarColor: string; rating: number; text: string; project: string }>> = {
  es: [
    { name: 'María González', role: 'Directora de Marketing', company: 'Grupo Empresarial del Sureste', avatar: 'MG', avatarColor: 'bg-indigo-500', rating: 5, text: 'NEXORATECH transformó completamente nuestra presencia digital. El sitio web carga en menos de 2 segundos y nuestras conversiones aumentaron un 40% en el primer trimestre.', project: 'Rediseño Web Corporativo' },
    { name: 'Carlos Ramírez', role: 'CEO', company: 'Innovatech Solutions', avatar: 'CR', avatarColor: 'bg-emerald-500', rating: 5, text: 'La implementación del sistema de inventarios automatizado redujo nuestros tiempos operativos en un 35%. Profesionalismo y entrega a tiempo garantizados.', project: 'Sistema de Gestión' },
    { name: 'Ana Martínez', role: 'Gerente de Operaciones', company: 'Comercializadora del Centro', avatar: 'AM', avatarColor: 'bg-blue-500', rating: 5, text: 'Excelente comunicación durante todo el proyecto. El dashboard de datos nos permite tomar decisiones informadas en tiempo real. Altamente recomendado.', project: 'Dashboard Analytics' },
    { name: 'Roberto Sánchez', role: 'Director de TI', company: 'Corporativo Nacional', avatar: 'RS', avatarColor: 'bg-violet-500', rating: 5, text: 'La integración de IA en nuestro sistema superó nuestras expectativas. NEXORATECH demostró dominio técnico y visión estratégica excepcionales.', project: 'Integración IA' },
  ],
  en: [
    { name: 'María González', role: 'Marketing Director', company: 'Grupo Empresarial del Sureste', avatar: 'MG', avatarColor: 'bg-indigo-500', rating: 5, text: 'NEXORATECH completely transformed our digital presence. The website loads in under 2 seconds and our conversions increased 40% in the first quarter.', project: 'Corporate Web Redesign' },
    { name: 'Carlos Ramírez', role: 'CEO', company: 'Innovatech Solutions', avatar: 'CR', avatarColor: 'bg-emerald-500', rating: 5, text: 'The automated inventory system reduced our operational times by 35%. Professionalism and on-time delivery guaranteed.', project: 'Management System' },
    { name: 'Ana Martínez', role: 'Operations Manager', company: 'Comercializadora del Centro', avatar: 'AM', avatarColor: 'bg-blue-500', rating: 5, text: 'Excellent communication throughout the project. The data dashboard allows us to make informed decisions in real time. Highly recommended.', project: 'Analytics Dashboard' },
    { name: 'Roberto Sánchez', role: 'IT Director', company: 'Corporativo Nacional', avatar: 'RS', avatarColor: 'bg-violet-500', rating: 5, text: 'The AI integration in our system exceeded our expectations. NEXORATECH demonstrated exceptional technical mastery and strategic vision.', project: 'AI Integration' },
  ],
};

export const processData: Record<Locale, { steps: Array<{ number: string; title: string; description: string; duration: string }>; guarantees: Array<{ title: string; desc: string }>; techStack: Array<{ title: string; content: string }> }> = {
  es: {
    steps: [
      { number: '01', title: 'Descubrimiento',  description: 'Analizamos tus necesidades, objetivos y audiencia. Auditamos tu infraestructura actual e identificamos los cuellos de botella.', duration: '1-2 días' },
      { number: '02', title: 'Planificación',   description: 'Diseñamos la arquitectura, wireframes y definimos el stack tecnológico óptimo para tu caso específico.', duration: '2-3 días' },
      { number: '03', title: 'Desarrollo',      description: 'Construimos tu solución con código limpio, escalable y documentado. Entregas parciales para que veas el avance.', duration: '1-4 semanas' },
      { number: '04', title: 'Lanzamiento',     description: 'Desplegamos, optimizamos y te capacitamos. 30 días de soporte técnico incluidos sin costo adicional.', duration: '1-2 días' },
    ],
    guarantees: [
      { title: 'Entregas a tiempo',   desc: 'Cumplimos los plazos acordados o devolvemos el proporcional.' },
      { title: '30 días de soporte',  desc: 'Soporte técnico post-lanzamiento incluido sin costo adicional.' },
      { title: 'Código documentado',  desc: 'Código limpio, documentado y entregado al 100% al cliente.' },
    ],
    techStack: [
      { title: 'Frontend',            content: 'React, TypeScript, Next.js, Tailwind CSS, Angular' },
      { title: 'Backend & Cloud',     content: 'Node.js, Firebase, MySQL, MongoDB, APIs REST' },
      { title: 'Optimización',        content: 'Core Web Vitals, SEO On-Page, WordPress Pro, Accesibilidad WCAG' },
      { title: 'IA & Automatización', content: 'Google Gemini, AWS SageMaker, Office Scripts, Git/GitHub' },
    ],
  },
  en: {
    steps: [
      { number: '01', title: 'Discovery',   description: 'We analyze your needs, goals and audience. We audit your current infrastructure and identify bottlenecks.', duration: '1-2 days' },
      { number: '02', title: 'Planning',    description: 'We design the architecture, wireframes and define the optimal technology stack for your specific case.', duration: '2-3 days' },
      { number: '03', title: 'Development', description: 'We build your solution with clean, scalable and documented code. Partial deliveries so you can see progress.', duration: '1-4 weeks' },
      { number: '04', title: 'Launch',      description: 'We deploy, optimize and train you. 30 days of technical support included at no additional cost.', duration: '1-2 days' },
    ],
    guarantees: [
      { title: 'On-time delivery',    desc: 'We meet agreed deadlines or return the proportional amount.' },
      { title: '30 days of support',  desc: 'Post-launch technical support included at no additional cost.' },
      { title: 'Documented code',     desc: 'Clean, documented code delivered 100% to the client.' },
    ],
    techStack: [
      { title: 'Frontend',            content: 'React, TypeScript, Next.js, Tailwind CSS, Angular' },
      { title: 'Backend & Cloud',     content: 'Node.js, Firebase, MySQL, MongoDB, REST APIs' },
      { title: 'Optimization',        content: 'Core Web Vitals, On-Page SEO, WordPress Pro, WCAG Accessibility' },
      { title: 'AI & Automation',     content: 'Google Gemini, AWS SageMaker, Office Scripts, Git/GitHub' },
    ],
  },
};

export const faqData: Record<Locale, Array<{ q: string; a: string }>> = {
  es: [
    { q: '¿Cuánto tiempo toma desarrollar un proyecto?', a: 'Depende de la complejidad. Un sitio web optimizado toma 1-2 semanas. Aplicaciones web complejas o con IA pueden tomar 4-8 semanas. En la consultoría inicial te entregamos un timeline exacto con hitos claros.' },
    { q: '¿Cuál es el costo de los servicios?', a: 'Los proyectos van desde $500 USD para sitios web hasta $5,000+ USD para aplicaciones empresariales. Ofrecemos planes de pago flexibles (50% al inicio, 50% a la entrega) y presupuestos personalizados.' },
    { q: '¿Ofrecen mantenimiento después del lanzamiento?', a: 'Sí. Incluimos 30 días de soporte técnico gratuito post-lanzamiento. Después ofrecemos planes de mantenimiento mensual desde $100 USD con actualizaciones, backups y soporte prioritario.' },
    { q: '¿Trabajan con clientes fuera de México?', a: 'Absolutamente. Trabajamos con clientes en toda Latinoamérica y Estados Unidos. Toda la comunicación es remota usando herramientas colaborativas modernas.' },
    { q: '¿Qué tecnologías utilizan?', a: 'React, TypeScript, Next.js, Node.js, Firebase, MySQL, MongoDB, WordPress y Google Gemini para IA. Seleccionamos el stack óptimo para cada proyecto específico.' },
    { q: '¿Qué pasa si no estoy satisfecho con el resultado?', a: 'Trabajamos con revisiones ilimitadas durante el desarrollo hasta que estés 100% satisfecho. Si no cumplimos con lo acordado, ofrecemos garantía de devolución proporcional.' },
    { q: '¿Cómo es el proceso de pago?', a: '50% al inicio del proyecto para reservar la agenda y comenzar el desarrollo. El 50% restante se liquida en la entrega final aprobada. Aceptamos transferencia bancaria y PayPal.' },
  ],
  en: [
    { q: 'How long does it take to develop a project?', a: 'It depends on complexity. An optimized website takes 1-2 weeks. Complex web applications or AI integrations can take 4-8 weeks. In the initial consultation we give you an exact timeline with clear milestones.' },
    { q: 'What is the cost of your services?', a: 'Projects range from $500 USD for websites to $5,000+ USD for enterprise applications. We offer flexible payment plans (50% upfront, 50% on delivery) and personalized quotes.' },
    { q: 'Do you offer maintenance after launch?', a: 'Yes. We include 30 days of free technical support post-launch. Afterwards we offer monthly maintenance plans from $100 USD with updates, backups and priority support.' },
    { q: 'Do you work with clients outside Mexico?', a: 'Absolutely. We work with clients throughout Latin America and the United States. All communication is remote using modern collaborative tools.' },
    { q: 'What technologies do you use?', a: 'React, TypeScript, Next.js, Node.js, Firebase, MySQL, MongoDB, WordPress and Google Gemini for AI. We select the optimal stack for each specific project.' },
    { q: 'What if I\'m not satisfied with the result?', a: 'We work with unlimited revisions during development until you are 100% satisfied. If we don\'t meet what was agreed, we offer a proportional refund guarantee.' },
    { q: 'How does the payment process work?', a: '50% at the start of the project to reserve the schedule and begin development. The remaining 50% is paid upon approved final delivery. We accept bank transfer and PayPal.' },
  ],
};

export const projectTypesData: Record<Locale, string[]> = {
  es: ['Sitio web o landing page', 'Automatización de procesos', 'Integración de IA', 'Sistema de gestión / inventario', 'Optimización SEO y performance', 'Otro'],
  en: ['Website or landing page', 'Process automation', 'AI integration', 'Management / inventory system', 'SEO and performance optimization', 'Other'],
};
