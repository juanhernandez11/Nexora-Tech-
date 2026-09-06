import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://nexorate.netlify.app';
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/admin/', '/*/admin/', '/_next/'],
      },
      {
        // Evitar que Googlebot desperdicie crawl budget en rutas de API
        userAgent: 'Googlebot',
        allow: '/',
        disallow: ['/api/', '/admin/', '/*/admin/'],
      },
    ],
    sitemap: `${siteUrl}/sitemap.xml`,
    host: siteUrl,
  };
}
