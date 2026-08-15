import { getTranslations, setRequestLocale } from 'next-intl/server';
import Link from 'next/link';
import { Shield } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

export async function generateStaticParams() {
  return [{ locale: 'es' }, { locale: 'en' }];
}

export default async function PrivacyPage({ params: { locale } }: { params: { locale: string } }) {
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'privacy' });

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-[#FDFDFD] dark:bg-slate-950 text-slate-900 dark:text-slate-100">
      <div className="max-w-3xl mx-auto px-6 py-20">
        <Link
          href={locale === 'en' ? '/en' : '/'}
          className="flex items-center gap-2 text-sm font-bold text-slate-500 dark:text-slate-400 hover:text-brand-600 dark:hover:text-brand-400 mb-12 transition-colors"
        >
          ← {t('back')}
        </Link>

        <div className="flex items-center gap-4 mb-10">
          <div className="w-12 h-12 bg-brand-100 dark:bg-brand-900 rounded-2xl flex items-center justify-center">
            <Shield size={24} className="text-brand-600 dark:text-brand-400" />
          </div>
          <div>
            <h1 className="font-heading text-3xl font-black tracking-tighter">{t('title')}</h1>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">{t('updated')}</p>
          </div>
        </div>

        <div className="space-y-10 text-slate-600 dark:text-slate-300 leading-relaxed">
          <section>
            <h2 className="text-lg font-black text-slate-900 dark:text-slate-100 mb-3">{t('s1Title')}</h2>
            <p>{t('s1Text')}</p>
          </section>
          <section>
            <h2 className="text-lg font-black text-slate-900 dark:text-slate-100 mb-3">{t('s2Title')}</h2>
            <p>{t('s2Text')}</p>
            <ul className="list-disc list-inside mt-2 space-y-1 text-sm">
              {(t.raw('s2Items') as string[]).map((item: string, i: number) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
            <p className="mt-3">{t('s2Note')}</p>
          </section>
          <section>
            <h2 className="text-lg font-black text-slate-900 dark:text-slate-100 mb-3">{t('s3Title')}</h2>
            <p>{t('s3Text')}</p>
            <ul className="list-disc list-inside mt-2 space-y-1 text-sm">
              {(t.raw('s3Items') as string[]).map((item: string, i: number) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </section>
          <section>
            <h2 className="text-lg font-black text-slate-900 dark:text-slate-100 mb-3">{t('s4Title')}</h2>
            <p>{t('s4Text')}</p>
          </section>
          <section>
            <h2 className="text-lg font-black text-slate-900 dark:text-slate-100 mb-3">{t('s5Title')}</h2>
            <p>{t('s5Text')}</p>
          </section>
          <section>
            <h2 className="text-lg font-black text-slate-900 dark:text-slate-100 mb-3">{t('s6Title')}</h2>
            <p>{t('s6Text')}</p>
            <ul className="list-disc list-inside mt-2 space-y-1 text-sm">
              {(t.raw('s6Items') as string[]).map((item: string, i: number) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
            <p className="mt-3">{t('s6Note')}</p>
          </section>
          <section>
            <h2 className="text-lg font-black text-slate-900 dark:text-slate-100 mb-3">{t('s7Title')}</h2>
            <p>{t('s7Text')}</p>
          </section>
          <section>
            <h2 className="text-lg font-black text-slate-900 dark:text-slate-100 mb-3">{t('s8Title')}</h2>
            <p>{t('s8Text')}</p>
          </section>
          <section>
            <h2 className="text-lg font-black text-slate-900 dark:text-slate-100 mb-3">{t('s9Title')}</h2>
            <p>{t('s9Text')}</p>
          </section>
          <section>
            <h2 className="text-lg font-black text-slate-900 dark:text-slate-100 mb-3">{t('s10Title')}</h2>
            <p>{t('s10Text')}</p>
          </section>
        </div>

        <div className="mt-16 pt-8 border-t border-slate-100 dark:border-slate-800">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">© {new Date().getFullYear()} NEXORATECH Solutions · Tehuacán, Puebla, México</p>
        </div>
      </div>
      </div>
      <Footer />
    </>
  );
}
