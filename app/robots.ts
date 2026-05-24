import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: '/api/',
    },
    sitemap: 'https://nexorate.netlify.app/sitemap.xml',
    host: 'https://nexorate.netlify.app',
  };
}
