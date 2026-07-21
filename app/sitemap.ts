import { MetadataRoute } from 'next';

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://nexorate.netlify.app';
const lastMod = new Date('2026-01-01');

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

const staticPages = ['servicios', 'faq', 'privacy', 'terms'];

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
  ];
}
