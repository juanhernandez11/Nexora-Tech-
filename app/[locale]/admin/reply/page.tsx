'use client';

import { useState } from 'react';
import { Send, CheckCircle, AlertCircle, User, Mail, MessageSquare, Lock, Briefcase } from 'lucide-react';

interface FormData {
  clientName: string;
  clientEmail: string;
  projectType: string;
  replyMessage: string;
  secret: string;
}

const PROJECT_TYPES = [
  'Sitio web o landing page',
  'Automatización de procesos',
  'Integración de IA',
  'Sistema de gestión / inventario',
  'Optimización SEO y performance',
  'Otro',
];

export default function AdminReplyPage() {
  const [form, setForm] = useState<FormData>({
    clientName: '',
    clientEmail: '',
    projectType: '',
    replyMessage: '',
    secret: '',
  });
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');
    setErrorMsg('');
    try {
      const res = await fetch('/api/reply', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (data.success) {
        setStatus('success');
        setForm({ clientName: '', clientEmail: '', projectType: '', replyMessage: '', secret: '' });
        setTimeout(() => setStatus('idle'), 5000);
      } else {
        setErrorMsg(res.status === 401 ? 'Clave secreta incorrecta.' : 'Error al enviar. Intenta de nuevo.');
        setStatus('error');
        setTimeout(() => setStatus('idle'), 4000);
      }
    } catch {
      setErrorMsg('Error de conexión.');
      setStatus('error');
      setTimeout(() => setStatus('idle'), 4000);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center px-4 py-16">
      <div className="w-full max-w-lg">

        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-brand-600/20 border border-brand-600/30 rounded-full mb-4">
            <span className="w-2 h-2 bg-brand-400 rounded-full animate-pulse" />
            <span className="text-xs font-black text-brand-400 uppercase tracking-widest">Panel Privado</span>
          </div>
          <h1 className="font-heading text-3xl font-black text-white tracking-tighter">
            Responder a cliente
          </h1>
          <p className="text-slate-400 text-sm mt-2">Nexora Tech · Admin</p>
        </div>

        {/* Card */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 shadow-2xl">

          {status === 'success' ? (
            <div className="text-center py-10">
              <div className="w-16 h-16 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle size={32} className="text-emerald-400" />
              </div>
              <h2 className="font-heading text-xl font-black text-white mb-2">¡Correo enviado!</h2>
              <p className="text-slate-400 text-sm">El cliente recibió tu respuesta con el diseño premium.</p>
            </div>
          ) : status === 'error' ? (
            <div className="text-center py-10">
              <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <AlertCircle size={32} className="text-red-400" />
              </div>
              <h2 className="font-heading text-xl font-black text-white mb-2">Error al enviar</h2>
              <p className="text-slate-400 text-sm">{errorMsg}</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">

              {/* Nombre */}
              <div>
                <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-2">
                  Nombre del cliente *
                </label>
                <div className="relative">
                  <User size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
                  <input
                    type="text"
                    name="clientName"
                    value={form.clientName}
                    onChange={handleChange}
                    required
                    placeholder="María González"
                    className="w-full pl-11 pr-4 py-3 bg-slate-800 border border-slate-700 rounded-xl text-white text-sm placeholder-slate-500 focus:border-brand-500 focus:outline-none transition-colors"
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-2">
                  Email del cliente *
                </label>
                <div className="relative">
                  <Mail size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
                  <input
                    type="email"
                    name="clientEmail"
                    value={form.clientEmail}
                    onChange={handleChange}
                    required
                    placeholder="maria@empresa.com"
                    className="w-full pl-11 pr-4 py-3 bg-slate-800 border border-slate-700 rounded-xl text-white text-sm placeholder-slate-500 focus:border-brand-500 focus:outline-none transition-colors"
                  />
                </div>
              </div>

              {/* Tipo de proyecto */}
              <div>
                <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-2">
                  Tipo de proyecto
                </label>
                <div className="relative">
                  <Briefcase size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none" />
                  <select
                    name="projectType"
                    value={form.projectType}
                    onChange={handleChange}
                    className="w-full pl-11 pr-4 py-3 bg-slate-800 border border-slate-700 rounded-xl text-white text-sm focus:border-brand-500 focus:outline-none transition-colors appearance-none cursor-pointer"
                  >
                    <option value="">Selecciona una opción...</option>
                    {PROJECT_TYPES.map(pt => (
                      <option key={pt} value={pt}>{pt}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Mensaje */}
              <div>
                <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-2">
                  Tu respuesta *
                </label>
                <div className="relative">
                  <MessageSquare size={15} className="absolute left-4 top-4 text-slate-500" />
                  <textarea
                    name="replyMessage"
                    value={form.replyMessage}
                    onChange={handleChange}
                    required
                    rows={6}
                    placeholder="Hola María, revisé tu solicitud y me parece un proyecto muy interesante..."
                    className="w-full pl-11 pr-4 py-3 bg-slate-800 border border-slate-700 rounded-xl text-white text-sm placeholder-slate-500 focus:border-brand-500 focus:outline-none transition-colors resize-none"
                  />
                </div>
              </div>

              {/* Secret */}
              <div>
                <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-2">
                  Clave secreta *
                </label>
                <div className="relative">
                  <Lock size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
                  <input
                    type="password"
                    name="secret"
                    value={form.secret}
                    onChange={handleChange}
                    required
                    placeholder="••••••••••••"
                    className="w-full pl-11 pr-4 py-3 bg-slate-800 border border-slate-700 rounded-xl text-white text-sm placeholder-slate-500 focus:border-brand-500 focus:outline-none transition-colors"
                  />
                </div>
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={status === 'sending'}
                className="w-full bg-brand-600 hover:bg-brand-700 disabled:opacity-50 disabled:cursor-not-allowed text-white py-3.5 rounded-xl font-black uppercase tracking-widest text-sm transition-all shadow-brand flex items-center justify-center gap-3 group"
              >
                {status === 'sending' ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Enviando...
                  </>
                ) : (
                  <>
                    Enviar respuesta
                    <Send size={15} className="group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </button>

            </form>
          )}
        </div>

        <p className="text-center text-xs text-slate-600 mt-6">
          Esta página es privada · Nexora Tech
        </p>
      </div>
    </div>
  );
}
