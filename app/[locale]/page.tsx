import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import Navbar from '@/components/layout/Navbar';
import MobileMenu from '@/components/layout/MobileMenu';
import HeroIntroReveal from '@/components/HeroIntroReveal';
import Solutions from '@/components/sections/Solutions';
import SuccessCases from '@/components/sections/SuccessCases';
import Testimonials from '@/components/sections/Testimonials';
import WorkProcess from '@/components/sections/WorkProcess';
import FAQ from '@/components/sections/FAQ';
import ContactForm from '@/components/sections/ContactForm';
import Footer from '@/components/layout/Footer';
import AccessibilityWidget from '@/components/layout/AccessibilityWidget';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://nexorate.netlify.app';

export async function generateMetadata({ params }: { params: { locale?: string } }): Promise<Metadata> {
  const locale = params?.locale || 'es';
  const canonicalUrl = locale === 'es' ? SITE_URL : `${SITE_URL}/en`;

  return {
    alternates: {
      canonical: canonicalUrl,
      languages: {
        es: SITE_URL,
        en: `${SITE_URL}/en`,
        'x-default': SITE_URL,
      },
    },
    openGraph: {
      url: canonicalUrl,
    },
  };
}

export default function HomePage({ params }: { params: { locale?: string } }) {
  const locale = params?.locale || 'es';
  setRequestLocale(locale);

  return (
    <div className="theme-page min-h-screen bg-[#fbfbfd] text-[#1d1d1f] dark:bg-black dark:text-white font-sans antialiased selection:bg-[#2997ff]/20 selection:text-white">
      <a href="#main-content" className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[200] focus:bg-brand-600 focus:text-white focus:px-4 focus:py-2 focus:rounded-xl focus:font-bold focus:text-sm">
        Skip to main content
      </a>
      <Navbar />
      <MobileMenu />
      <AccessibilityWidget />
      <main id="main-content">
        <HeroIntroReveal />
        <Solutions />
        <SuccessCases />
        <Testimonials />
        <WorkProcess />
        <FAQ />
        <ContactForm />
      </main>
      <Footer />
    </div>
  );
}
