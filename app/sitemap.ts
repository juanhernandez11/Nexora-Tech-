import { MetadataRoute } from 'next';
import { getPostsByLocale, getAllSlugs, getPostBySlug } from '../lib/blog-data';

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://nexorate.netlify.app';
const lastMod = new Date('2025-07-01');

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

const staticPages = ['servicios', 'faq', 'privacy', 'terms', 'cookies'];

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
  const servicioUrls: MetadataRoute.Sitemap = servicios.flatMap((slug) => [
    {
      url: `${baseUrl}/servicios/${slug}`,
      lastModified: lastMod,
      changeFrequency: 'monthly',
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
      changeFrequency: 'monthly',
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

  const staticUrls: MetadataRoute.Sitemap = staticPages.flatMap((page) => [
    {
      url: `${baseUrl}/${page}`,
      lastModified: lastMod,
      changeFrequency: page === 'faq' || page === 'servicios' ? 'monthly' : 'yearly',
      priority: page === 'servicios' ? 0.9 : page === 'faq' ? 0.8 : 0.3,
      alternates: {
        languages: {
          es: `${baseUrl}/${page}`,
          en: `${baseUrl}/en/${page}`,
          'x-default': `${baseUrl}/${page}`,
        },
      },
    },
    {
      url: `${baseUrl}/en/${page}`,
      lastModified: lastMod,
      changeFrequency: page === 'faq' || page === 'servicios' ? 'monthly' : 'yearly',
      priority: page === 'servicios' ? 0.9 : page === 'faq' ? 0.8 : 0.3,
      alternates: {
        languages: {
          es: `${baseUrl}/${page}`,
          en: `${baseUrl}/en/${page}`,
          'x-default': `${baseUrl}/${page}`,
        },
      },
    },
  ]);

  // Blog index pages
  const blogIndexUrls: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
      alternates: {
        languages: {
          es: `${baseUrl}/blog`,
          en: `${baseUrl}/en/blog`,
          'x-default': `${baseUrl}/blog`,
        },
      },
    },
    {
      url: `${baseUrl}/en/blog`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
      alternates: {
        languages: {
          es: `${baseUrl}/blog`,
          en: `${baseUrl}/en/blog`,
          'x-default': `${baseUrl}/blog`,
        },
      },
    },
  ];

  // Blog article pages
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
    ...staticUrls,
    ...servicioUrls,
    ...blogIndexUrls,
    ...blogArticleUrls,
  ];
}
