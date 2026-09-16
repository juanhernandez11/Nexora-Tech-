import { MetadataRoute } from 'next';
import { getLocalizedSlug, getPostsByLocale } from '../lib/blog-data';

const BASE = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://nexorate.netlify.app';

// Fecha de última modificación — actualizar en cada deploy significativo
const lastMod = new Date('2026-09-15');

// Slugs de servicios (URLs en español para ambos idiomas — mismo slug, distinto locale prefix)
const servicios = [
  'desarrollo-software',
  'software-a-medida',
  'automatizacion-empresarial',
  'inteligencia-artificial',
  'desarrollo-web-corporativo',
  'aplicaciones-web',
  'crm-personalizado',
  'erp-empresarial',
  'consultoria-tecnologica',
];

// Páginas estáticas con señal SEO relevante (excluye páginas legales para no desperdiciar crawl budget)
const staticPages = [
  { slug: 'servicios', priority: 0.9, freq: 'monthly' as const },
  { slug: 'faq',       priority: 0.8, freq: 'monthly' as const },
  { slug: 'blog',      priority: 0.8, freq: 'weekly'  as const },
];

export default function sitemap(): MetadataRoute.Sitemap {
  // ─── HOME ──────────────────────────────────────────────────────────────────
  // ES: / (sin prefijo, localePrefix: as-needed)
  // EN: /en
  const homeUrls: MetadataRoute.Sitemap = [
    {
      url: BASE,
      lastModified: lastMod,
      changeFrequency: 'monthly',
      priority: 1,
      alternates: {
        languages: {
          es: BASE,
          en: `${BASE}/en`,
          'x-default': BASE,
        },
      },
    },
    {
      url: `${BASE}/en`,
      lastModified: lastMod,
      changeFrequency: 'monthly',
      priority: 1,
      alternates: {
        languages: {
          es: BASE,
          en: `${BASE}/en`,
          'x-default': BASE,
        },
      },
    },
  ];

  // ─── SERVICIOS ─────────────────────────────────────────────────────────────
  // ES: /servicios/slug (sin prefijo)
  // EN: /en/servicios/slug
  const servicioUrls: MetadataRoute.Sitemap = servicios.flatMap((slug) => [
    {
      url: `${BASE}/servicios/${slug}`,
      lastModified: lastMod,
      changeFrequency: 'monthly' as const,
      priority: 0.9,
      alternates: {
        languages: {
          es: `${BASE}/servicios/${slug}`,
          en: `${BASE}/en/servicios/${slug}`,
          'x-default': `${BASE}/servicios/${slug}`,
        },
      },
    },
    {
      url: `${BASE}/en/servicios/${slug}`,
      lastModified: lastMod,
      changeFrequency: 'monthly' as const,
      priority: 0.9,
      alternates: {
        languages: {
          es: `${BASE}/servicios/${slug}`,
          en: `${BASE}/en/servicios/${slug}`,
          'x-default': `${BASE}/servicios/${slug}`,
        },
      },
    },
  ]);

  // ─── PÁGINAS ESTÁTICAS ─────────────────────────────────────────────────────
  const staticUrls: MetadataRoute.Sitemap = staticPages.flatMap(({ slug, priority, freq }) => [
    {
      url: `${BASE}/${slug}`,
      lastModified: lastMod,
      changeFrequency: freq,
      priority,
      alternates: {
        languages: {
          es: `${BASE}/${slug}`,
          en: `${BASE}/en/${slug}`,
          'x-default': `${BASE}/${slug}`,
        },
      },
    },
    {
      url: `${BASE}/en/${slug}`,
      lastModified: lastMod,
      changeFrequency: freq,
      priority,
      alternates: {
        languages: {
          es: `${BASE}/${slug}`,
          en: `${BASE}/en/${slug}`,
          'x-default': `${BASE}/${slug}`,
        },
      },
    },
  ]);

  // ─── BLOG ──────────────────────────────────────────────────────────────────
  const esPosts = getPostsByLocale('es');
  const enPosts = getPostsByLocale('en');

  const blogArticleUrls: MetadataRoute.Sitemap = [
    ...esPosts.map((post) => {
      const enSlug = getLocalizedSlug(post.slug);
      return {
        url: `${BASE}/blog/${post.slug}`,
        lastModified: new Date(post.date),
        changeFrequency: 'monthly' as const,
        priority: 0.7,
        alternates: {
          languages: {
            es: `${BASE}/blog/${post.slug}`,
            en: `${BASE}/en/blog/${enSlug ?? post.slug}`,
            'x-default': `${BASE}/blog/${post.slug}`,
          },
        },
      };
    }),
    ...enPosts.map((post) => {
      const esSlug = getLocalizedSlug(post.slug);
      return {
        url: `${BASE}/en/blog/${post.slug}`,
        lastModified: new Date(post.date),
        changeFrequency: 'monthly' as const,
        priority: 0.7,
        alternates: {
          languages: {
            es: `${BASE}/blog/${esSlug ?? post.slug}`,
            en: `${BASE}/en/blog/${post.slug}`,
            'x-default': `${BASE}/blog/${esSlug ?? post.slug}`,
          },
        },
      };
    }),
  ];

  return [
    ...homeUrls,
    ...staticUrls,
    ...servicioUrls,
    ...blogArticleUrls,
  ];
}
