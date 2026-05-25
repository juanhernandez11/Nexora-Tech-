import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import Link from 'next/link';
import { ArrowRight, Code, Zap, Brain, Globe, Smartphone, Database, BarChart3, Settings, Lightbulb } from 'lucide-react';

const SERVICES = [
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

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }): Promise<Metadata> {
  const baseUrl = 'https://nexorate.netlify.app';
  return {
    title: 'Servicios de Desarrollo de Software y Automatización | Nexora Tech',
    description: 'Desarrollo de software a medida, automatización empresarial, IA, CRM, ERP y consultoría tecnológica para empresas en México. Consultoría gratuita.',
    alternates: {
      canonical: locale === 'es' ? `${baseUrl}/servicios` : `${baseUrl}/en/servicios`,
      languages: { es: `${baseUrl}/servicios`, en: `${baseUrl}/en/servicios` },
    },
  };
}

export default function ServiciosPage({ params: { locale } }: { params: { locale: string } }) {
  setRequestLocale(locale);
  const base = locale === 'en' ? '/en' : '';

  const breadcrumb = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Inicio', item: 'https://nexorate.netlify.app' },
      { '@type': 'ListItem', position: 2, name: 'Servicios', item: 'https://nexorate.netlify.app/servicios' },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      <div className="min-h-screen bg-[#FAFAFA] dark:bg-slate-950 text-slate-900 dark:text-slate-100">
        <section className="relative pt-32 pb-20 overflow-hidden">
          <div className="absolute inset-0 -z-10">
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-brand-600/5 dark:bg-brand-600/10 rounded-full blur-3xl translate-x-1/3 -translate-y-1/4" />
          </div>
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <nav className="text-xs text-slate-400 mb-8 flex items-center gap-2">
              <Link href={`${base}/`} className="hover:text-brand-600 transition-colors">Inicio</Link>
              <span>/</span>
              <span className="text-slate-600 dark:text-slate-300">Servicios</span>
            </nav>
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-brand-50 dark:bg-brand-900/30 border border-brand-100 dark:border-brand-800 rounded-full mb-6">
              <span className="text-[11px] font-black text-brand-600 dark:text-brand-400 uppercase tracking-widest">Servicios</span>
            </div>
            <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-black tracking-tighter text-slate-900 dark:text-white mb-6">
              Soluciones tecnológicas <span className="text-brand-600">que generan resultados.</span>
            </h1>
            <p className="text-lg sm:text-xl text-slate-600 dark:text-slate-300 max-w-3xl leading-relaxed">
              No vendemos tecnología. Resolvemos problemas de negocio con la solución exacta para cada caso. Desde $500 USD con entrega garantizada.
            </p>
          </div>
        </section>

        <section className="pb-24">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {SERVICES.map((s) => {
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
                      Ver servicio <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>

        <section className="py-20 bg-slate-900 text-white">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
            <h2 className="font-heading text-3xl sm:text-4xl font-black mb-4">¿No sabes cuál servicio necesitas?</h2>
            <p className="text-slate-300 text-lg mb-8">En la consultoría gratuita analizamos tu caso y te recomendamos la solución exacta.</p>
            <Link href={`${base}/#contacto-form`} className="inline-flex items-center gap-3 bg-brand-600 text-white px-10 py-4 rounded-xl font-black uppercase tracking-widest text-sm hover:bg-brand-700 transition-all shadow-brand group">
              Consultoría gratuita <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </section>
      </div>
    </>
  );
}
