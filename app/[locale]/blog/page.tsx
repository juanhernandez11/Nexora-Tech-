import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import Link from 'next/link';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { getPostsByLocale } from '@/lib/blog-data';

export async function generateStaticParams() {
  return [{ locale: 'es' }, { locale: 'en' }];
}

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }): Promise<Metadata> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://nexoratech.com';
  const isEs = locale === 'es';

  return {
    title: isEs
      ? 'Blog de Tecnología y Software para Empresas | Nexora Tech'
      : 'Technology & Software Blog for Businesses | Nexora Tech',
    description: isEs
      ? 'Artículos sobre desarrollo de software a medida, automatización empresarial, CRM, ERP y transformación digital para empresas. Consejos prácticos de expertos.'
      : 'Articles about custom software development, business automation, CRM, ERP, and digital transformation. Practical expert advice for businesses.',
    alternates: {
      canonical: isEs ? `${baseUrl}/blog` : `${baseUrl}/en/blog`,
      languages: { es: `${baseUrl}/blog`, en: `${baseUrl}/en/blog` },
    },
  };
}

export default function BlogPage({ params: { locale } }: { params: { locale: string } }) {
  setRequestLocale(locale);

  const posts = getPostsByLocale(locale);
  const base = locale === 'en' ? '/en' : '';
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://nexoratech.com';
  const isEs = locale === 'es';

  const breadcrumb = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: isEs ? 'Inicio' : 'Home', item: baseUrl },
      { '@type': 'ListItem', position: 2, name: 'Blog', item: `${baseUrl}${base}/blog` },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      <Navbar />
      <div className="min-h-screen bg-white dark:bg-slate-900 text-slate-900 dark:text-white">
        {/* Header */}
        <section className="relative pt-32 pb-16 overflow-hidden">
          <div className="absolute inset-0 -z-10">
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-brand-600/5 dark:bg-brand-600/10 rounded-full blur-3xl translate-x-1/3 -translate-y-1/4" />
          </div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <nav className="text-xs text-slate-400 mb-8 flex items-center gap-2" aria-label="Breadcrumb">
              <Link href={`${base}/`} className="hover:text-brand-600 transition-colors">
                {isEs ? 'Inicio' : 'Home'}
              </Link>
              <span>/</span>
              <span className="text-slate-600 dark:text-slate-300">Blog</span>
            </nav>
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-brand-50 dark:bg-brand-900/30 border border-brand-100 dark:border-brand-800 rounded-full mb-6">
              <span className="text-[11px] font-black text-brand-600 dark:text-brand-400 uppercase tracking-widest">Blog</span>
            </div>
            <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-black tracking-tighter text-slate-900 dark:text-white mb-6">
              {isEs ? (
                <>Artículos sobre <span className="text-brand-600">tecnología empresarial.</span></>
              ) : (
                <>Articles on <span className="text-brand-600">business technology.</span></>
              )}
            </h1>
            <p className="text-lg sm:text-xl text-slate-600 dark:text-slate-300 max-w-3xl leading-relaxed">
              {isEs
                ? 'Guías prácticas, comparativas y tendencias sobre software a medida, automatización y transformación digital para hacer crecer tu empresa.'
                : 'Practical guides, comparisons, and trends on custom software, automation, and digital transformation to grow your business.'}
            </p>
          </div>
        </section>

        {/* Posts Grid */}
        <section className="pb-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {posts.map((post) => (
                <Link
                  key={post.slug}
                  href={`${base}/blog/${post.slug}`}
                  className="group flex flex-col bg-white dark:bg-slate-800/60 rounded-2xl border border-slate-200 dark:border-slate-700 hover:border-brand-300 dark:hover:border-brand-600 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 hover:scale-[1.02] overflow-hidden"
                >
                  {/* Card Content */}
                  <div className="flex flex-col flex-grow p-7">
                    {/* Category Badge */}
                    <div className="mb-4">
                      <span className="inline-block px-3 py-1 text-xs font-bold rounded-full bg-brand-50 text-brand-700 dark:bg-brand-900/30 dark:text-brand-400">
                        {post.category}
                      </span>
                    </div>

                    {/* Title */}
                    <h2 className="font-heading text-xl font-black text-slate-900 dark:text-white mb-3 group-hover:text-brand-600 transition-colors line-clamp-2">
                      {post.title}
                    </h2>

                    {/* Description */}
                    <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed flex-grow mb-4 line-clamp-3">
                      {post.description}
                    </p>

                    {/* Meta */}
                    <div className="flex items-center justify-between text-xs text-slate-400 dark:text-slate-500 pt-4 border-t border-slate-100 dark:border-slate-700/50">
                      <time dateTime={post.date}>
                        {new Date(post.date).toLocaleDateString(locale === 'es' ? 'es-MX' : 'en-US', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric',
                        })}
                      </time>
                      <span className="flex items-center gap-1">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-3.5 h-3.5">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm.75-13a.75.75 0 00-1.5 0v5c0 .414.336.75.75.75h4a.75.75 0 000-1.5h-3.25V5z" clipRule="evenodd" />
                        </svg>
                        {post.readTime}
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-slate-900 text-white">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
            <h2 className="font-heading text-3xl sm:text-4xl font-black mb-4">
              {isEs ? '¿Listo para transformar tu empresa?' : 'Ready to transform your business?'}
            </h2>
            <p className="text-slate-300 text-lg mb-8">
              {isEs
                ? 'Solicita una consultoría gratuita y descubre cómo la tecnología puede impulsar tu crecimiento.'
                : 'Request a free consultation and discover how technology can drive your growth.'}
            </p>
            <Link
              href={`${base}/#contacto-form`}
              className="inline-flex items-center gap-3 bg-brand-600 text-white px-10 py-4 rounded-xl font-black uppercase tracking-widest text-sm hover:bg-brand-700 transition-all shadow-brand group"
            >
              {isEs ? 'Consultoría gratuita' : 'Free consultation'}
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 group-hover:translate-x-1 transition-transform">
                <path fillRule="evenodd" d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z" clipRule="evenodd" />
              </svg>
            </Link>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
}
