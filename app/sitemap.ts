import { MetadataRoute } from 'next';

const baseUrl = 'https://nexorate.netlify.app';

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

export default function sitemap(): MetadataRoute.Sitemap {
  const servicioUrls: MetadataRoute.Sitemap = servicios.flatMap((slug) => [
    { url: `${baseUrl}/servicios/${slug}`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.9 },
    { url: `${baseUrl}/en/servicios/${slug}`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.9 },
  ]);

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
      alternates: { languages: { es: baseUrl, en: `${baseUrl}/en` } },
    },
    { url: `${baseUrl}/en`,             lastModified: new Date(), changeFrequency: 'monthly', priority: 1 },
    { url: `${baseUrl}/servicios`,      lastModified: new Date(), changeFrequency: 'monthly', priority: 0.9 },
    { url: `${baseUrl}/en/servicios`,   lastModified: new Date(), changeFrequency: 'monthly', priority: 0.9 },
    ...servicioUrls,
    { url: `${baseUrl}/faq`,            lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/en/faq`,         lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/privacy`,        lastModified: new Date(), changeFrequency: 'yearly',  priority: 0.3 },
    { url: `${baseUrl}/en/privacy`,     lastModified: new Date(), changeFrequency: 'yearly',  priority: 0.3 },
    { url: `${baseUrl}/terms`,          lastModified: new Date(), changeFrequency: 'yearly',  priority: 0.3 },
    { url: `${baseUrl}/en/terms`,       lastModified: new Date(), changeFrequency: 'yearly',  priority: 0.3 },
  ];
}
