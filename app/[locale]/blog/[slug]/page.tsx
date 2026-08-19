import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import BlogAdBanner from '@/components/BlogAdBanner';
import ShareButton from '@/components/ShareButton';
import { getPostBySlug, getPostsByLocale, getAllSlugs } from '@/lib/blog-data';

export async function generateStaticParams() {
  const slugs = getAllSlugs();
  const locales = ['es', 'en'];
  const params: { locale: string; slug: string }[] = [];

  for (const locale of locales) {
    for (const slug of slugs) {
      const post = getPostBySlug(slug, locale);
      if (post) {
        params.push({ locale, slug });
      }
    }
  }

  return params;
}

export async function generateMetadata({ params: { locale, slug } }: { params: { locale: string; slug: string } }): Promise<Metadata> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://nexoratech.com';
  const post = getPostBySlug(slug, locale);
  const base = locale === 'en' ? '/en' : '';

  if (!post) {
    return { title: 'Article Not Found' };
  }

  return {
    title: `${post.title} | Nexora Tech`,
    description: post.description,
    keywords: post.keywords,
    alternates: {
      canonical: `${baseUrl}${base}/blog/${slug}`,
      languages: {
        es: `${baseUrl}/blog/${slug}`,
        en: `${baseUrl}/en/blog/${slug}`,
      },
    },
    openGraph: {
      title: post.title,
      description: post.description,
      type: 'article',
      publishedTime: post.date,
      authors: [post.author],
      tags: post.tags,
      url: `${baseUrl}${base}/blog/${slug}`,
      siteName: 'Nexora Tech',
    },
  };
}

export default function BlogArticlePage({ params: { locale, slug } }: { params: { locale: string; slug: string } }) {
  setRequestLocale(locale);

  const post = getPostBySlug(slug, locale);
  if (!post) {
    notFound();
  }

  const allPosts = getPostsByLocale(locale);
  const relatedPosts = allPosts.filter((p) => p.slug !== post.slug).slice(0, 3);
  const base = locale === 'en' ? '/en' : '';
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://nexoratech.com';
  const isEs = locale === 'es';
  const articleUrl = `${baseUrl}${base}/blog/${slug}`;

  // Split content for ad insertion
  const contentParts = post.content.split('</h2>');
  let firstHalf = '';
  let secondHalf = '';

  if (contentParts.length > 2) {
    const midPoint = Math.ceil(contentParts.length / 2);
    firstHalf = contentParts.slice(0, midPoint).join('</h2>');
    secondHalf = contentParts.slice(midPoint).join('</h2>');
  } else {
    firstHalf = post.content;
    secondHalf = '';
  }

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.description,
    author: {
      '@type': 'Person',
      name: post.author,
    },
    datePublished: post.date,
    publisher: {
      '@type': 'Organization',
      name: 'Nexora Tech',
      url: baseUrl,
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': articleUrl,
    },
    keywords: post.tags.join(', '),
  };

  const breadcrumb = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: isEs ? 'Inicio' : 'Home', item: baseUrl },
      { '@type': 'ListItem', position: 2, name: 'Blog', item: `${baseUrl}${base}/blog` },
      { '@type': 'ListItem', position: 3, name: post.title, item: articleUrl },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      <Navbar />
      <div className="min-h-screen bg-white dark:bg-slate-900 text-slate-900 dark:text-white">
        {/* Header */}
        <section className="relative pt-32 pb-12 overflow-hidden">
          <div className="absolute inset-0 -z-10">
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-brand-600/5 dark:bg-brand-600/10 rounded-full blur-3xl translate-x-1/3 -translate-y-1/4" />
          </div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            {/* Breadcrumb Navigation */}
            <nav className="text-xs text-slate-400 mb-8 flex items-center gap-2" aria-label="Breadcrumb">
              <Link href={`${base}/`} className="hover:text-brand-600 transition-colors">
                {isEs ? 'Inicio' : 'Home'}
              </Link>
              <span>/</span>
              <Link href={`${base}/blog`} className="hover:text-brand-600 transition-colors">
                Blog
              </Link>
              <span>/</span>
              <span className="text-slate-600 dark:text-slate-300 truncate max-w-[200px]">{post.title}</span>
            </nav>

            {/* Category & Meta */}
            <div className="flex flex-wrap items-center gap-3 mb-6">
              <span className="inline-block px-3 py-1 text-xs font-bold rounded-full bg-brand-50 text-brand-700 dark:bg-brand-900/30 dark:text-brand-400">
                {post.category}
              </span>
              <span className="text-sm text-slate-400 dark:text-slate-500">
                {new Date(post.date).toLocaleDateString(isEs ? 'es-MX' : 'en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </span>
              <span className="text-sm text-slate-400 dark:text-slate-500 flex items-center gap-1">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-3.5 h-3.5">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm.75-13a.75.75 0 00-1.5 0v5c0 .414.336.75.75.75h4a.75.75 0 000-1.5h-3.25V5z" clipRule="evenodd" />
                </svg>
                {post.readTime}
              </span>
            </div>

            {/* Title */}
            <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-black tracking-tighter text-slate-900 dark:text-white mb-4 max-w-4xl">
              {post.title}
            </h1>

            {/* Author */}
            <p className="text-slate-500 dark:text-slate-400 text-sm">
              {isEs ? 'Por' : 'By'} <span className="font-semibold text-slate-700 dark:text-slate-300">{post.author}</span>
            </p>
          </div>
        </section>

        {/* Main Content + Sidebar */}
        <section className="pb-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="grid lg:grid-cols-[1fr_320px] gap-12">
              {/* Article Content */}
              <article className="min-w-0">
                {/* First half of content */}
                <div
                  className="prose prose-lg prose-slate dark:prose-invert max-w-none prose-headings:font-heading prose-headings:font-black prose-headings:tracking-tight prose-a:text-brand-600 prose-a:no-underline hover:prose-a:underline"
                  dangerouslySetInnerHTML={{ __html: firstHalf }}
                />

                {/* Ad Banner between sections */}
                {secondHalf && <BlogAdBanner className="my-10" />}

                {/* Second half of content */}
                {secondHalf && (
                  <div
                    className="prose prose-lg prose-slate dark:prose-invert max-w-none prose-headings:font-heading prose-headings:font-black prose-headings:tracking-tight prose-a:text-brand-600 prose-a:no-underline hover:prose-a:underline"
                    dangerouslySetInnerHTML={{ __html: secondHalf }}
                  />
                )}

                {/* Share & Navigation */}
                <div className="mt-12 pt-8 border-t border-slate-200 dark:border-slate-700">
                  <div className="flex flex-wrap items-center justify-between gap-4">
                    {/* Share Buttons */}
                    <div className="flex items-center gap-3">
                      <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                        {isEs ? 'Compartir:' : 'Share:'}
                      </span>
                      <ShareButton url={articleUrl} label={isEs ? 'Copiar enlace' : 'Copy link'} />
                    </div>

                    {/* Back to Blog */}
                    <Link
                      href={`${base}/blog`}
                      className="inline-flex items-center gap-2 text-sm font-bold text-brand-600 hover:text-brand-700 transition-colors"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                        <path fillRule="evenodd" d="M17 10a.75.75 0 01-.75.75H5.612l4.158 3.96a.75.75 0 11-1.04 1.08l-5.5-5.25a.75.75 0 010-1.08l5.5-5.25a.75.75 0 111.04 1.08L5.612 9.25H16.25A.75.75 0 0117 10z" clipRule="evenodd" />
                      </svg>
                      {isEs ? 'Volver al blog' : 'Back to blog'}
                    </Link>
                  </div>

                  {/* Tags */}
                  <div className="mt-6 flex flex-wrap gap-2">
                    {post.tags.map((tag) => (
                      <span
                        key={tag}
                        className="inline-block px-3 py-1 text-xs font-medium rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              </article>

              {/* Sidebar */}
              <aside className="hidden lg:block">
                <div className="sticky top-28">
                  <h3 className="font-heading text-lg font-black text-slate-900 dark:text-white mb-6">
                    {isEs ? 'Artículos relacionados' : 'Related articles'}
                  </h3>
                  <div className="space-y-4">
                    {relatedPosts.map((related) => (
                      <Link
                        key={related.slug}
                        href={`${base}/blog/${related.slug}`}
                        className="group block p-4 bg-slate-50 dark:bg-slate-800/60 rounded-2xl border border-slate-200 dark:border-slate-700 hover:border-brand-300 dark:hover:border-brand-600 hover:shadow-lg transition-all duration-300 hover:scale-[1.02]"
                      >
                        <span className="inline-block px-2 py-0.5 text-[10px] font-bold rounded-full bg-brand-50 text-brand-700 dark:bg-brand-900/30 dark:text-brand-400 mb-2">
                          {related.category}
                        </span>
                        <h4 className="font-heading text-sm font-bold text-slate-900 dark:text-white group-hover:text-brand-600 transition-colors line-clamp-2 mb-1">
                          {related.title}
                        </h4>
                        <p className="text-xs text-slate-400 dark:text-slate-500">
                          {related.readTime}
                        </p>
                      </Link>
                    ))}
                  </div>

                  {/* Sidebar Ad */}
                  <BlogAdBanner format="rectangle" className="mt-8" />

                  {/* CTA */}
                  <div className="mt-8 p-6 bg-brand-600 rounded-2xl text-white text-center">
                    <h4 className="font-heading text-lg font-black mb-2">
                      {isEs ? '¿Necesitas una solución?' : 'Need a solution?'}
                    </h4>
                    <p className="text-brand-100 text-sm mb-4">
                      {isEs
                        ? 'Consultoría gratuita para tu proyecto tecnológico.'
                        : 'Free consultation for your tech project.'}
                    </p>
                    <Link
                      href={`${base}/#contacto-form`}
                      className="inline-block px-6 py-2.5 bg-white text-brand-700 font-bold text-sm rounded-lg hover:bg-brand-50 transition-colors"
                    >
                      {isEs ? 'Contactar' : 'Contact us'}
                    </Link>
                  </div>
                </div>
              </aside>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
}
