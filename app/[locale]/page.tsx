import { setRequestLocale } from 'next-intl/server';
import dynamic from 'next/dynamic';
import Navbar from '@/components/layout/Navbar';
import MobileMenu from '@/components/layout/MobileMenu';
import Hero from '@/components/sections/Hero';
import Solutions from '@/components/sections/Solutions';
import SuccessCases from '@/components/sections/SuccessCases';
import Testimonials from '@/components/sections/Testimonials';
import WorkProcess from '@/components/sections/WorkProcess';
import FAQ from '@/components/sections/FAQ';
import ContactForm from '@/components/sections/ContactForm';
import Footer from '@/components/layout/Footer';

const AccessibilityWidget = dynamic(
  () => import('@/components/layout/AccessibilityWidget'),
  { ssr: false }
);

export default function HomePage({ params: { locale } }: { params: { locale: string } }) {
  setRequestLocale(locale);

  return (
    <div className="min-h-screen bg-[#FAFAFA] dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans transition-colors duration-300">
      <a href="#main-content" className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[200] focus:bg-brand-600 focus:text-white focus:px-4 focus:py-2 focus:rounded-xl focus:font-bold focus:text-sm">
        Skip to main content
      </a>
      <Navbar />
      <MobileMenu />
      <AccessibilityWidget />
      <main id="main-content">
        <Hero />
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
