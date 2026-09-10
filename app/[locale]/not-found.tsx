import Link from 'next/link';
import { ArrowLeft, Compass } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#f4f1e9] dark:bg-[#11150f] text-slate-900 dark:text-slate-100 flex items-center justify-center p-6">
      <div className="max-w-md w-full text-center space-y-6">
        <div className="w-16 h-16 rounded-2xl bg-brand-500/10 text-brand-600 flex items-center justify-center mx-auto">
          <Compass className="w-8 h-8" />
        </div>
        <div className="space-y-2">
          <h1 className="text-4xl font-extrabold tracking-tight">404</h1>
          <p className="text-slate-600 dark:text-slate-400 font-medium">
            Página no encontrada / Page not found
          </p>
        </div>
        <p className="text-sm text-slate-500">
          La página que buscas no existe o ha sido movida.
        </p>
        <div>
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold text-sm hover:opacity-90 transition-opacity"
          >
            <ArrowLeft className="w-4 h-4" />
            Volver al inicio
          </Link>
        </div>
      </div>
    </div>
  );
}
