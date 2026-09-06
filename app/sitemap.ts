import { MetadataRoute } from 'next';
import { getPostsByLocale } from '../lib/blog-data';

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://nexorate.netlify.app';
const lastMod = new Date('2026-08-12');

// Slugs de servicios — mismos en ambos idiomas (URL en español para ambos locales)
// Nota: el locale EN usa el mismo slug porque el contenido es el mismo servicio
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

// Solo se incluyen páginas que pueden satisfacer una intención de búsqueda.
// Las páginas legales siguen siendo accesibles desde el footer, pero no necesitan
// consumir señales de descubrimiento ni crawl budget orgánico.
const staticPages = [
  { slug: 'servicios', priority: 0.9, freq: 'monthly' as const },
  { slug: 'faq',       priority: 0.8, freq: 'monthly' as const },
  { slug: 'blog',      priority: 0.8, freq: 'weekly'  as const },
];

// Mapeo de slugs entre idiomas (ES <-> EN)
const slugMapping: Record<string, string> = {
  'que-es-software-a-medida': 'what-is-custom-software',
  'what-is-custom-software': 'que-es-software-a-medida',
  'crm-vs-erp-diferencias': 'crm-vs-erp-differences',
  'crm-vs-erp-differences': 'crm-vs-erp-diferencias',
  'automatizacion-empresarial-reducir-costos': 'business-automation-reduce-costs',
  'business-automation-reduce-costs': 'automatizacion-empresarial-reducir-costos',
};

export default function sitemap(): MetadataRoute.Sitemap {
  // Home
  const homeUrls: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: lastMod,
      changeFrequency: 'monthly',
      priority: 1,
      alternates: {
        languages: {
          es: baseUrl,
          en: `${baseUrl}/en`,
          'x-default': baseUrl,
        },
      },
    },
    {
      url: `${baseUrl}/en`,
      lastModified: lastMod,
      changeFrequency: 'monthly',
      priority: 1,
      alternates: {
        languages: {
          es: baseUrl,
          en: `${baseUrl}/en`,
          'x-default': baseUrl,
        },
      },
    },
  ];

  // Servicios: páginas transaccionales principales del sitio.
  const servicioUrls: MetadataRoute.Sitemap = servicios.flatMap((slug) => [
    {
      url: `${baseUrl}/servicios/${slug}`,
      lastModified: lastMod,
      changeFrequency: 'monthly' as const,
      priority: 0.9,
      alternates: {
        languages: {
          es: `${baseUrl}/servicios/${slug}`,
          en: `${baseUrl}/en/servicios/${slug}`,
          'x-default': `${baseUrl}/servicios/${slug}`,
        },
      },
    },
    {
      url: `${baseUrl}/en/servicios/${slug}`,
      lastModified: lastMod,
      changeFrequency: 'monthly' as const,
      priority: 0.9,
      alternates: {
        languages: {
          es: `${baseUrl}/servicios/${slug}`,
          en: `${baseUrl}/en/servicios/${slug}`,
          'x-default': `${baseUrl}/servicios/${slug}`,
        },
      },
    },
  ]);

  // Páginas estáticas
  const staticUrls: MetadataRoute.Sitemap = staticPages.flatMap(({ slug, priority, freq }) => [
    {
      url: `${baseUrl}/${slug}`,
      lastModified: lastMod,
      changeFrequency: freq,
      priority,
      alternates: {
        languages: {
          es: `${baseUrl}/${slug}`,
          en: `${baseUrl}/en/${slug}`,
          'x-default': `${baseUrl}/${slug}`,
        },
      },
    },
    {
      url: `${baseUrl}/en/${slug}`,
      lastModified: lastMod,
      changeFrequency: freq,
      priority,
      alternates: {
        languages: {
          es: `${baseUrl}/${slug}`,
          en: `${baseUrl}/en/${slug}`,
          'x-default': `${baseUrl}/${slug}`,
        },
      },
    },
  ]);

  // Blog articles
  const esPosts = getPostsByLocale('es');
  const enPosts = getPostsByLocale('en');

  const blogArticleUrls: MetadataRoute.Sitemap = [
    ...esPosts.map((post) => {
      const enSlug = slugMapping[post.slug] || post.slug;
      return {
        url: `${baseUrl}/blog/${post.slug}`,
        lastModified: new Date(post.date),
        changeFrequency: 'monthly' as const,
        priority: 0.7,
        alternates: {
          languages: {
            es: `${baseUrl}/blog/${post.slug}`,
            en: `${baseUrl}/en/blog/${enSlug}`,
            'x-default': `${baseUrl}/blog/${post.slug}`,
          },
        },
      };
    }),
    ...enPosts.map((post) => {
      const esSlug = slugMapping[post.slug] || post.slug;
      return {
        url: `${baseUrl}/en/blog/${post.slug}`,
        lastModified: new Date(post.date),
        changeFrequency: 'monthly' as const,
        priority: 0.7,
        alternates: {
          languages: {
            es: `${baseUrl}/blog/${esSlug}`,
            en: `${baseUrl}/en/blog/${post.slug}`,
            'x-default': `${baseUrl}/blog/${esSlug}`,
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
