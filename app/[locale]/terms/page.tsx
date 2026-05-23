import { useTranslations } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';
import Link from 'next/link';

export default function TermsPage({ params: { locale } }: { params: { locale: string } }) {
  setRequestLocale(locale);
  return <TermsContent />;
}

function TermsContent() {
  const t = useTranslations('terms');
  return (
    <main className="min-h-screen bg-[#FAFAFA] dark:bg-slate-950 text-slate-900 dark:text-slate-100 py-20 px-4">
      <div className="max-w-3xl mx-auto">
        <Link href="/" className="inline-flex items-center gap-2 text-sm font-bold text-brand-600 hover:text-brand-700 mb-10 transition-colors">
          ← {t('back')}
        </Link>
        <h1 className="font-heading text-4xl font-black mb-2">{t('title')}</h1>
        <p className="text-slate-400 text-sm mb-10">{t('updated')}</p>
        <div className="prose prose-slate dark:prose-invert max-w-none space-y-6 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
          <p>Al contratar los servicios de <strong>Nexora Tech</strong>, aceptas los siguientes términos y condiciones.</p>
          <h2 className="font-heading text-xl font-black text-slate-900 dark:text-white mt-8">1. Servicios</h2>
          <p>Nexora Tech ofrece servicios de desarrollo de software a medida, automatización de procesos, integración de IA y optimización web. El alcance de cada proyecto se define en una propuesta escrita acordada por ambas partes.</p>
          <h2 className="font-heading text-xl font-black text-slate-900 dark:text-white mt-8">2. Pagos</h2>
          <p>Los proyectos requieren un pago inicial del 50% para comenzar el desarrollo. El 50% restante se liquida en la entrega final aprobada. Aceptamos transferencia bancaria y PayPal.</p>
          <h2 className="font-heading text-xl font-black text-slate-900 dark:text-white mt-8">3. Entregas y revisiones</h2>
          <p>Incluimos revisiones ilimitadas durante el desarrollo hasta alcanzar el resultado acordado. Los cambios fuera del alcance original se cotizan por separado.</p>
          <h2 className="font-heading text-xl font-black text-slate-900 dark:text-white mt-8">4. Propiedad intelectual</h2>
          <p>Una vez liquidado el pago total, el cliente recibe la propiedad completa del código y los activos digitales desarrollados.</p>
          <h2 className="font-heading text-xl font-black text-slate-900 dark:text-white mt-8">5. Garantía</h2>
          <p>Ofrecemos 30 días de soporte técnico gratuito post-lanzamiento. Si no cumplimos con lo acordado, aplicamos una garantía de devolución proporcional.</p>
        </div>
      </div>
    </main>
  );
}
