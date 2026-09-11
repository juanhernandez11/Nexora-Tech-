import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import Link from 'next/link';
import { ArrowRight, Code, Zap, Brain, Globe, Smartphone, Database, BarChart3, Settings, Lightbulb } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import TechCarousel from '@/components/ui/TechCarousel';

const SERVICES_ES = [
  { icon: Code,        slug: 'desarrollo-software',        name: 'Desarrollo de Software',         desc: 'Aplicaciones empresariales a medida con React, TypeScript y Node.js.',          keyword: 'desarrollo de software méxico' },
  { icon: Settings,    slug: 'software-a-medida',           name: 'Software a Medida',               desc: 'La solución exacta que tu empresa necesita, sin funciones que no usarás.',       keyword: 'software a medida empresas' },
  { icon: Zap,         slug: 'automatizacion-empresarial',  name: 'Automatización Empresarial',      desc: 'Elimina el trabajo manual y reduce costos operativos hasta un 40%.',             keyword: 'automatización empresarial méxico' },
  { icon: Globe,       slug: 'desarrollo-web-corporativo',  name: 'Desarrollo Web Corporativo',      desc: 'Sitios y plataformas web que cargan en menos de 2 segundos y convierten.',       keyword: 'desarrollo web corporativo méxico' },
  { icon: Smartphone,  slug: 'aplicaciones-web',            name: 'Aplicaciones Web',                desc: 'Apps web progresivas que funcionan en cualquier dispositivo y escalan.',         keyword: 'desarrollo aplicaciones web méxico' },
  { icon: Brain,       slug: 'inteligencia-artificial',     name: 'Inteligencia Artificial',         desc: 'Integración de IA en tus sistemas para automatizar decisiones y análisis.',      keyword: 'inteligencia artificial para empresas' },
  { icon: Database,    slug: 'crm-personalizado',           name: 'CRM Personalizado',               desc: 'Gestiona tus clientes con un CRM hecho para tu proceso de ventas específico.',   keyword: 'crm personalizado méxico' },
  { icon: BarChart3,   slug: 'erp-empresarial',             name: 'ERP Empresarial',                 desc: 'Integra todas las áreas de tu empresa en un solo sistema centralizado.',         keyword: 'erp personalizado pymes méxico' },
  { icon: Lightbulb,   slug: 'consultoria-tecnologica',     name: 'Consultoría Tecnológica',         desc: 'Toma decisiones tecnológicas con expertos que conocen tu industria.',            keyword: 'consultoría tecnológica empresas méxico' },
];

const SERVICES_EN = [
  { icon: Code,        slug: 'desarrollo-software',        name: 'Custom Software Development',   desc: 'Tailored enterprise applications built with React, TypeScript, and Node.js.',    keyword: 'software development services' },
  { icon: Settings,    slug: 'software-a-medida',           name: 'Tailored Business Software',     desc: 'The exact software solution your company needs, without unused complexity.',      keyword: 'tailored business software' },
  { icon: Zap,         slug: 'automatizacion-empresarial',  name: 'Business Automation',            desc: 'Eliminate repetitive manual workloads and reduce operational costs by up to 40%.', keyword: 'business process automation' },
  { icon: Globe,       slug: 'desarrollo-web-corporativo',  name: 'Corporate Web Development',      desc: 'High-performance corporate sites and web platforms that load in <2s and convert.', keyword: 'corporate web development' },
  { icon: Smartphone,  slug: 'aplicaciones-web',            name: 'Web Applications',              desc: 'Progressive, responsive web apps designed to scale on any modern device.',        keyword: 'custom web applications' },
  { icon: Brain,       slug: 'inteligencia-artificial',     name: 'Artificial Intelligence',       desc: 'Seamless AI integration into your business workflows to automate tasks and analysis.', keyword: 'enterprise artificial intelligence' },
  { icon: Database,    slug: 'crm-personalizado',           name: 'Custom CRM',                     desc: 'Manage and close deals with a CRM customized for your exact sales cycle.',        keyword: 'custom crm software' },
  { icon: BarChart3,   slug: 'erp-empresarial',             name: 'Enterprise ERP',                 desc: 'Unify finance, inventory, and operations into a single connected platform.',     keyword: 'enterprise erp solutions' },
  { icon: Lightbulb,   slug: 'consultoria-tecnologica',     name: 'Technology Consulting',          desc: 'Strategic engineering guidance from senior technical leaders who know your market.', keyword: 'technology consulting' },
];

export async function generateStaticParams() {
  return [{ locale: 'es' }, { locale: 'en' }];
}

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }): Promise<Metadata> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://nexorate.netlify.app';
  const isEn = locale === 'en';
  return {
    title: isEn
      ? 'Custom Software Development & Automation Services | Nexora Tech'
      : 'Servicios de Desarrollo de Software y Automatización | Nexora Tech',
    description: isEn
      ? 'Custom software development, business automation, AI, CRM, ERP, and technology consulting for growing companies. Free consultation.'
      : 'Desarrollo de software a medida, automatización empresarial, IA, CRM, ERP y consultoría tecnológica para empresas en México. Consultoría gratuita.',
    alternates: {
      canonical: locale === 'es' ? `${baseUrl}/servicios` : `${baseUrl}/en/servicios`,
      languages: { es: `${baseUrl}/servicios`, en: `${baseUrl}/en/servicios` },
    },
  };
}

export default function ServiciosPage({ params: { locale } }: { params: { locale: string } }) {
  setRequestLocale(locale);
  const isEn = locale === 'en';
  const base = isEn ? '/en' : '';
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://nexorate.netlify.app';
  const servicesList = isEn ? SERVICES_EN : SERVICES_ES;

  const breadcrumb = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: isEn ? 'Home' : 'Inicio', item: isEn ? `${baseUrl}/en` : baseUrl },
      { '@type': 'ListItem', position: 2, name: isEn ? 'Services' : 'Servicios', item: `${baseUrl}${base}/servicios` },
    ],
  };

  return (
    <div className="min-h-screen bg-[#FAFAFA] dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col justify-between">
      <script id="servicios-breadcrumb-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      <Navbar />
      <main className="flex-grow">
        <section className="relative pt-32 pb-20 overflow-hidden">
          <div className="absolute inset-0 -z-10">
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-brand-600/5 dark:bg-brand-600/10 rounded-full blur-3xl translate-x-1/3 -translate-y-1/4" />
          </div>
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <nav className="text-xs text-slate-400 mb-8 flex items-center gap-2">
              <Link href={`${base}/`} className="hover:text-brand-600 transition-colors">
                {isEn ? 'Home' : 'Inicio'}
              </Link>
              <span>/</span>
              <span className="text-slate-600 dark:text-slate-300">{isEn ? 'Services' : 'Servicios'}</span>
            </nav>
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-brand-50 dark:bg-brand-900/30 border border-brand-100 dark:border-brand-800 rounded-full mb-6">
              <span className="text-[11px] font-black text-brand-600 dark:text-brand-400 uppercase tracking-widest">
                {isEn ? 'Services' : 'Servicios'}
              </span>
            </div>
            <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-black tracking-tighter text-slate-900 dark:text-white mb-6">
              {isEn ? 'Technology solutions ' : 'Soluciones tecnológicas '}
              <span className="text-brand-600">
                {isEn ? 'that drive real results.' : 'que generan resultados.'}
              </span>
            </h1>
            <p className="text-lg sm:text-xl text-slate-600 dark:text-slate-300 max-w-3xl leading-relaxed">
              {isEn
                ? "We don't sell generic technology. We solve business bottlenecks with precision-engineered software. Starting at $500 USD with guaranteed delivery."
                : 'No vendemos tecnología. Resolvemos problemas de negocio con la solución exacta para cada caso. Desde $500 USD con entrega garantizada.'}
            </p>
          </div>
        </section>

        <section className="pb-24">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {servicesList.map((s) => {
                const Icon = s.icon;
                return (
                  <Link
                    key={s.slug}
                    href={`${base}/servicios/${s.slug}`}
                    className="group p-7 bg-white dark:bg-slate-800/60 rounded-2xl border-2 border-slate-100 dark:border-slate-700 hover:border-brand-300 dark:hover:border-brand-600 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col"
                  >
                    <div className="w-12 h-12 bg-brand-50 dark:bg-brand-900/30 rounded-xl flex items-center justify-center mb-5 group-hover:bg-brand-600 transition-colors duration-300">
                      <Icon size={22} className="text-brand-600 group-hover:text-white transition-colors duration-300" />
                    </div>
                    <h2 className="font-heading text-xl font-black text-slate-900 dark:text-white mb-2 group-hover:text-brand-600 transition-colors">{s.name}</h2>
                    <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed flex-grow mb-4">{s.desc}</p>
                    <div className="flex items-center gap-2 text-xs font-black text-brand-600 uppercase tracking-widest">
                      {isEn ? 'View service' : 'Ver servicio'} <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>

        {/* Stack Tecnológico Transversal */}
        <section className="py-16 bg-white dark:bg-[#111113] border-t border-black/[0.06] dark:border-white/[0.08] overflow-hidden">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center mb-6">
            <h2 className="font-heading text-2xl sm:text-3xl font-bold tracking-tight text-[#1d1d1f] dark:text-white mb-2">
              {locale === 'en' ? 'Technologies powering our systems' : 'Tecnologías que impulsan nuestras soluciones'}
            </h2>
            <p className="text-xs sm:text-sm text-[#86868b] dark:text-slate-400 max-w-lg mx-auto">
              {locale === 'en'
                ? 'High-performance stack and modern architecture selected for speed, stability, and scale.'
                : 'Arquitectura moderna y tecnologías de alto rendimiento seleccionadas para garantizar máxima velocidad, seguridad y escalabilidad.'}
            </p>
          </div>
          <div className="max-w-7xl mx-auto px-2 sm:px-4">
            <TechCarousel />
          </div>
        </section>

        <section className="py-20 bg-slate-900 text-white">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
            <h2 className="font-heading text-3xl sm:text-4xl font-black mb-4">
              {isEn ? 'Not sure which service fits your business?' : '¿No sabes cuál servicio necesitas?'}
            </h2>
            <p className="text-slate-300 text-lg mb-8">
              {isEn
                ? 'In our free consultation, we analyze your current workflow and recommend the exact solution.'
                : 'En la consultoría gratuita analizamos tu caso y te recomendamos la solución exacta.'}
            </p>
            <Link href={`${base}/#contacto-form`} className="inline-flex items-center gap-3 bg-brand-600 text-white px-10 py-4 rounded-xl font-black uppercase tracking-widest text-sm hover:bg-brand-700 transition-all shadow-brand group">
              {isEn ? 'Free consultation' : 'Consultoría gratuita'} <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
