import { useTranslations } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';
import Link from 'next/link';

export default function PrivacyPage({ params: { locale } }: { params: { locale: string } }) {
  setRequestLocale(locale);
  return <PrivacyContent />;
}

function PrivacyContent() {
  const t = useTranslations('privacy');
  return (
    <main className="min-h-screen bg-[#FAFAFA] dark:bg-slate-950 text-slate-900 dark:text-slate-100 py-20 px-4">
      <div className="max-w-3xl mx-auto">
        <Link href="/" className="inline-flex items-center gap-2 text-sm font-bold text-brand-600 hover:text-brand-700 mb-10 transition-colors">
          ← {t('back')}
        </Link>
        <h1 className="font-heading text-4xl font-black mb-2">{t('title')}</h1>
        <p className="text-slate-400 text-sm mb-10">{t('updated')}</p>
        <div className="prose prose-slate dark:prose-invert max-w-none space-y-6 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
          <p>En <strong>Nexora Tech</strong> nos comprometemos a proteger tu privacidad. Esta política describe cómo recopilamos, usamos y protegemos tu información personal.</p>
          <h2 className="font-heading text-xl font-black text-slate-900 dark:text-white mt-8">1. Información que recopilamos</h2>
          <p>Recopilamos únicamente la información que nos proporcionas voluntariamente a través del formulario de contacto: nombre, correo electrónico y descripción de tu proyecto.</p>
          <h2 className="font-heading text-xl font-black text-slate-900 dark:text-white mt-8">2. Uso de la información</h2>
          <p>Usamos tu información exclusivamente para responder a tu consulta y enviarte una propuesta personalizada. No compartimos tus datos con terceros ni los usamos para fines publicitarios.</p>
          <h2 className="font-heading text-xl font-black text-slate-900 dark:text-white mt-8">3. Seguridad</h2>
          <p>Implementamos medidas técnicas y organizativas para proteger tu información contra acceso no autorizado, pérdida o alteración.</p>
          <h2 className="font-heading text-xl font-black text-slate-900 dark:text-white mt-8">4. Contacto</h2>
          <p>Si tienes preguntas sobre esta política, puedes contactarnos a través del formulario en la página principal.</p>
        </div>
      </div>
    </main>
  );
}
