import { getTranslations, setRequestLocale } from 'next-intl/server';
import Link from 'next/link';
import { FileText } from 'lucide-react';

export default async function TermsPage({ params: { locale } }: { params: { locale: string } }) {
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'terms' });

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
            <FileText size={24} className="text-brand-600 dark:text-brand-400" />
          </div>
          <div>
            <h1 className="font-heading text-3xl font-black tracking-tighter">{t('title')}</h1>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">{t('updated')}</p>
          </div>
        </div>

        <div className="space-y-10 text-slate-600 dark:text-slate-300 leading-relaxed">
          <section>
            <h2 className="text-lg font-black text-slate-900 dark:text-slate-100 mb-3">1. Aceptación de los términos</h2>
            <p>Al acceder y utilizar este sitio web o contratar los servicios de NEXORATECH Solutions, usted acepta quedar vinculado por los presentes Términos y Condiciones. Si no está de acuerdo con alguno de estos términos, le pedimos que no utilice nuestros servicios.</p>
          </section>
          <section>
            <h2 className="text-lg font-black text-slate-900 dark:text-slate-100 mb-3">2. Descripción de los servicios</h2>
            <p>NEXORATECH Solutions ofrece servicios de desarrollo de software, diseño web, optimización SEO, integración de inteligencia artificial y consultoría tecnológica. Los servicios específicos, alcance, plazos y costos se definen en una propuesta o contrato individual acordado con cada cliente.</p>
          </section>
          <section>
            <h2 className="text-lg font-black text-slate-900 dark:text-slate-100 mb-3">3. Proceso de contratación</h2>
            <ul className="list-disc list-inside space-y-2 text-sm mt-2">
              <li>El proceso inicia con una consultoría gratuita de 30 minutos.</li>
              <li>Se elabora una propuesta técnica y económica personalizada.</li>
              <li>El servicio comienza una vez confirmado el acuerdo y el pago inicial acordado.</li>
              <li>Cualquier cambio de alcance durante el proyecto debe acordarse por escrito.</li>
            </ul>
          </section>
          <section>
            <h2 className="text-lg font-black text-slate-900 dark:text-slate-100 mb-3">4. Pagos y facturación</h2>
            <ul className="list-disc list-inside space-y-2 text-sm mt-2">
              <li>Los precios se cotizan en <strong>USD</strong> según propuesta personalizada.</li>
              <li>Se requiere un anticipo del 50% para iniciar el proyecto.</li>
              <li>El saldo restante se liquida al momento de la entrega final.</li>
              <li>Los pagos no son reembolsables una vez iniciado el desarrollo, salvo incumplimiento por parte de NEXORATECH Solutions.</li>
            </ul>
          </section>
          <section>
            <h2 className="text-lg font-black text-slate-900 dark:text-slate-100 mb-3">5. Propiedad intelectual</h2>
            <p>Una vez liquidado el pago total, el cliente adquiere los derechos de uso del producto entregado. NEXORATECH Solutions se reserva el derecho de mencionar el proyecto en su portafolio, salvo acuerdo de confidencialidad expreso. Las herramientas, librerías y frameworks de terceros utilizados están sujetos a sus propias licencias.</p>
          </section>
          <section>
            <h2 className="text-lg font-black text-slate-900 dark:text-slate-100 mb-3">6. Revisiones y cambios</h2>
            <p>Cada proyecto incluye <strong>revisiones ilimitadas</strong> durante el desarrollo dentro del alcance acordado, hasta que el cliente esté 100% satisfecho con el resultado. Las modificaciones que excedan el alcance original serán cotizadas por separado.</p>
          </section>
          <section>
            <h2 className="text-lg font-black text-slate-900 dark:text-slate-100 mb-3">7. Soporte post-entrega</h2>
            <p>Se incluyen <strong>30 días de soporte técnico gratuito</strong> tras la entrega del proyecto. Este soporte cubre corrección de errores del desarrollo original, no nuevas funcionalidades. Pasado este período, el soporte se cotiza mediante planes mensuales.</p>
          </section>
          <section>
            <h2 className="text-lg font-black text-slate-900 dark:text-slate-100 mb-3">8. Limitación de responsabilidad</h2>
            <p>NEXORATECH Solutions no se hace responsable por pérdidas de negocio, datos o ingresos derivados del uso o imposibilidad de uso del software entregado, más allá de lo estipulado en el contrato individual. La responsabilidad máxima se limita al monto pagado por el servicio.</p>
          </section>
          <section>
            <h2 className="text-lg font-black text-slate-900 dark:text-slate-100 mb-3">9. Confidencialidad</h2>
            <p>Ambas partes se comprometen a mantener la confidencialidad de la información sensible compartida durante el proyecto. Esto incluye datos de negocio, estrategias, credenciales y cualquier información marcada como confidencial.</p>
          </section>
          <section>
            <h2 className="text-lg font-black text-slate-900 dark:text-slate-100 mb-3">10. Cancelación del servicio</h2>
            <ul className="list-disc list-inside space-y-2 text-sm mt-2">
              <li><strong>Por parte del cliente:</strong> puede cancelar con aviso de 5 días hábiles. El anticipo no es reembolsable.</li>
              <li><strong>Por parte de NEXORATECH:</strong> en caso de cancelación, se reembolsará el proporcional del trabajo no realizado.</li>
            </ul>
          </section>
          <section>
            <h2 className="text-lg font-black text-slate-900 dark:text-slate-100 mb-3">11. Ley aplicable</h2>
            <p>Estos términos se rigen por las leyes de los Estados Unidos Mexicanos. Cualquier disputa se resolverá preferentemente de forma amistosa; en caso contrario, se someterá a la jurisdicción de los tribunales competentes de Tehuacán, Puebla, México.</p>
          </section>
          <section>
            <h2 className="text-lg font-black text-slate-900 dark:text-slate-100 mb-3">12. Modificaciones</h2>
            <p>NEXORATECH Solutions se reserva el derecho de actualizar estos términos en cualquier momento. Los cambios serán publicados en esta página con la fecha de actualización. El uso continuado del servicio implica la aceptación de los términos vigentes.</p>
          </section>
          <section>
            <h2 className="text-lg font-black text-slate-900 dark:text-slate-100 mb-3">13. Contacto</h2>
            <p>Para cualquier consulta sobre estos términos, contáctenos a través del formulario de la página principal o por LinkedIn.</p>
          </section>
        </div>

        <div className="mt-16 pt-8 border-t border-slate-100 dark:border-slate-800">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">© {new Date().getFullYear()} NEXORATECH Solutions · Tehuacán, Puebla, México</p>
        </div>
      </div>
    </div>
  );
}
