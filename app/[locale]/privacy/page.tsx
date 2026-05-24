import { getTranslations, setRequestLocale } from 'next-intl/server';
import Link from 'next/link';
import { Shield } from 'lucide-react';

export default async function PrivacyPage({ params: { locale } }: { params: { locale: string } }) {
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'privacy' });

  return (
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
            <h2 className="text-lg font-black text-slate-900 dark:text-slate-100 mb-3">1. Responsable del tratamiento</h2>
            <p>NEXORATECH Solutions, con sede en Tehuacán, Puebla, México, es el responsable del tratamiento de los datos personales que usted nos proporcione a través de este sitio web.</p>
          </section>
          <section>
            <h2 className="text-lg font-black text-slate-900 dark:text-slate-100 mb-3">2. Datos que recopilamos</h2>
            <p>A través del formulario de contacto recopilamos únicamente:</p>
            <ul className="list-disc list-inside mt-2 space-y-1 text-sm">
              <li>Nombre completo</li>
              <li>Correo electrónico</li>
              <li>Tipo de proyecto o servicio de interés</li>
              <li>Mensaje o descripción del proyecto</li>
            </ul>
            <p className="mt-3">No recopilamos datos sensibles, financieros ni de menores de edad.</p>
          </section>
          <section>
            <h2 className="text-lg font-black text-slate-900 dark:text-slate-100 mb-3">3. Finalidad del tratamiento</h2>
            <p>Los datos recopilados se utilizan exclusivamente para:</p>
            <ul className="list-disc list-inside mt-2 space-y-1 text-sm">
              <li>Responder a sus consultas y solicitudes de servicio</li>
              <li>Enviar información relacionada con los servicios solicitados</li>
              <li>Gestionar la relación comercial entre las partes</li>
            </ul>
          </section>
          <section>
            <h2 className="text-lg font-black text-slate-900 dark:text-slate-100 mb-3">4. Compartición de datos</h2>
            <p>Sus datos personales <strong>no serán vendidos, cedidos ni compartidos</strong> con terceros, salvo obligación legal o cuando sea estrictamente necesario para prestar el servicio contratado (por ejemplo, plataformas de envío de correo como Nodemailer/SMTP).</p>
          </section>
          <section>
            <h2 className="text-lg font-black text-slate-900 dark:text-slate-100 mb-3">5. Conservación de datos</h2>
            <p>Los datos se conservarán durante el tiempo necesario para atender su solicitud y, posteriormente, durante el plazo legalmente exigido o hasta que usted solicite su eliminación.</p>
          </section>
          <section>
            <h2 className="text-lg font-black text-slate-900 dark:text-slate-100 mb-3">6. Sus derechos (ARCO)</h2>
            <p>De conformidad con la Ley Federal de Protección de Datos Personales en Posesión de los Particulares (México), usted tiene derecho a:</p>
            <ul className="list-disc list-inside mt-2 space-y-1 text-sm">
              <li><strong>Acceso</strong> — conocer qué datos tenemos sobre usted</li>
              <li><strong>Rectificación</strong> — corregir datos inexactos</li>
              <li><strong>Cancelación</strong> — solicitar la eliminación de sus datos</li>
              <li><strong>Oposición</strong> — oponerse al tratamiento de sus datos</li>
            </ul>
            <p className="mt-3">Para ejercer estos derechos, contáctenos a través del formulario de contacto del sitio.</p>
          </section>
          <section>
            <h2 className="text-lg font-black text-slate-900 dark:text-slate-100 mb-3">7. Cookies y tecnologías de rastreo</h2>
            <p>Este sitio web no utiliza cookies de rastreo ni herramientas de analítica de terceros. Únicamente se utiliza <code className="bg-slate-100 dark:bg-slate-800 px-1 rounded text-xs">localStorage</code> del navegador para guardar preferencias de accesibilidad y modo oscuro de forma local en su dispositivo.</p>
          </section>
          <section>
            <h2 className="text-lg font-black text-slate-900 dark:text-slate-100 mb-3">8. Seguridad</h2>
            <p>Implementamos medidas técnicas y organizativas razonables para proteger sus datos contra acceso no autorizado, pérdida o alteración.</p>
          </section>
          <section>
            <h2 className="text-lg font-black text-slate-900 dark:text-slate-100 mb-3">9. Cambios en esta política</h2>
            <p>Nos reservamos el derecho de actualizar esta política. Cualquier cambio será publicado en esta misma página con la fecha de actualización correspondiente.</p>
          </section>
          <section>
            <h2 className="text-lg font-black text-slate-900 dark:text-slate-100 mb-3">10. Contacto</h2>
            <p>Para cualquier consulta relacionada con esta política, puede contactarnos a través del formulario disponible en la página principal o mediante LinkedIn.</p>
          </section>
        </div>

        <div className="mt-16 pt-8 border-t border-slate-100 dark:border-slate-800">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">© {new Date().getFullYear()} NEXORATECH Solutions · Tehuacán, Puebla, México</p>
        </div>
      </div>
    </div>
  );
}
