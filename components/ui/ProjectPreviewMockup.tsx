'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import {
  Lock,
  ExternalLink,
  Activity,
  CheckCircle2,
  Sparkles,
  Cpu,
  Layers,
  Network,
  LayoutDashboard,
  Globe,
  ArrowRight,
  Database,
  Server,
  Smartphone,
  ShieldCheck,
} from 'lucide-react';

interface ProjectPreviewMockupProps {
  title: string;
  company: string;
  url?: string;
  image?: string;
  tag: string;
  gradient: string;
  tech: string[];
}

export default function ProjectPreviewMockup({
  title,
  company,
  url,
  image,
  tag,
  gradient,
  tech,
}: ProjectPreviewMockupProps) {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'architecture' | 'live'>(
    url ? 'live' : 'dashboard'
  );
  const [screenshotError, setScreenshotError] = useState(false);

  const isEstudioGenius = company.toLowerCase().includes('genius');
  const isARH = company.toLowerCase().includes('arh');
  const isSalud = company.toLowerCase().includes('jurisdicción') || company.toLowerCase().includes('salud');
  const isParking = company.toLowerCase().includes('comercial') || company.toLowerCase().includes('aparcamiento');

  const displayUrl = url ? url.replace(/^https?:\/\//, '') : `${company.toLowerCase().replace(/\s+/g, '')}.internal/app`;

  // WordPress automated screenshot service (Captura real en vivo de navegadores reales sin IA)
  const automatedScreenshotUrl = url
    ? `https://s0.wp.com/mshots/v1/${encodeURIComponent(url)}?w=1000`
    : null;

  return (
    <div className="mt-4 rounded-2xl border border-black/[0.08] dark:border-white/[0.08] bg-[#f5f5f7] dark:bg-[#121214] text-[#1d1d1f] dark:text-slate-100 overflow-hidden shadow-md transition-all duration-300">
      {/* Top Window Bar */}
      <div className="flex flex-wrap items-center justify-between px-3.5 py-2.5 bg-[#ebebed] dark:bg-[#1a1a1c] border-b border-black/[0.06] dark:border-white/[0.08] gap-2">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f56] inline-block" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e] inline-block" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#27c93f] inline-block" />
          </div>

          {/* View Mode Toggle Buttons */}
          <div className="flex items-center gap-1 bg-white/70 dark:bg-black/40 p-0.5 rounded-full border border-black/[0.06] dark:border-white/[0.08] text-[11px]">
            {url && (
              <button
                type="button"
                onClick={() => setActiveTab('live')}
                className={`flex items-center gap-1.5 px-3 py-1 rounded-full transition-colors ${
                  activeTab === 'live'
                    ? 'bg-[#0071e3] text-white font-medium shadow-xs'
                    : 'text-[#86868b] dark:text-slate-400 hover:text-[#1d1d1f] dark:hover:text-white'
                }`}
              >
                <Globe size={11} />
                <span>Web Real</span>
              </button>
            )}

            <button
              type="button"
              onClick={() => setActiveTab('dashboard')}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-full transition-colors ${
                activeTab === 'dashboard'
                  ? 'bg-[#0071e3] text-white font-medium shadow-xs'
                  : 'text-[#86868b] dark:text-slate-400 hover:text-[#1d1d1f] dark:hover:text-white'
              }`}
            >
              <LayoutDashboard size={11} />
              <span>Interfaz</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('architecture')}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-full transition-colors ${
                activeTab === 'architecture'
                  ? 'bg-[#0071e3] text-white font-medium shadow-xs'
                  : 'text-[#86868b] dark:text-slate-400 hover:text-[#1d1d1f] dark:hover:text-white'
              }`}
            >
              <Network size={11} />
              <span>Arquitectura</span>
            </button>
          </div>
        </div>

        {/* URL Bar */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white dark:bg-black/60 border border-black/[0.06] dark:border-white/[0.08] text-[11px] text-[#1d1d1f] dark:text-slate-300 max-w-[220px] sm:max-w-[320px] truncate">
            <Lock size={11} className="text-[#0071e3] dark:text-[#2997ff] shrink-0" />
            <span className="truncate">{displayUrl}</span>
          </div>

          {url && (
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#86868b] hover:text-[#0071e3] dark:text-slate-400 dark:hover:text-[#2997ff] transition-colors p-1"
              title="Abrir en pestaña nueva"
            >
              <ExternalLink size={13} />
            </a>
          )}
        </div>
      </div>

      {/* Screen Viewport */}
      <div className="relative min-h-[260px] sm:min-h-[290px] bg-white dark:bg-[#0a0d14] p-4 sm:p-6 overflow-hidden flex flex-col justify-between">
        {/* Ambient Glow */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-[#0071e3]/[0.05] dark:bg-[#0071e3]/[0.08] blur-3xl pointer-events-none rounded-full" />

        {/* TAB 1: Real Live Website Screenshot (via automated browser renderer, NO AI) */}
        {activeTab === 'live' && automatedScreenshotUrl && !screenshotError && (
          <div className="relative z-10 space-y-3">
            <div className="flex items-center justify-between text-xs text-[#86868b] dark:text-slate-400 pb-1">
              <span className="flex items-center gap-1.5 font-mono text-[11px] text-[#0071e3] dark:text-[#2997ff]">
                <span className="w-2 h-2 rounded-full bg-[#0071e3] dark:bg-[#2997ff]" />
                Renderizado de navegador Chromium en tiempo real
              </span>
              <a
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[11px] text-[#0071e3] dark:text-[#2997ff] hover:underline flex items-center gap-1"
              >
                Visitar sitio oficial <ExternalLink size={11} />
              </a>
            </div>

            <div className="relative w-full h-64 sm:h-72 rounded-xl overflow-hidden border border-black/[0.08] dark:border-white/[0.1] bg-black/[0.03] dark:bg-[#1c1c1e] group">
              <Image
                src={automatedScreenshotUrl}
                alt={`Captura real de ${company}`}
                fill
                className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.02]"
                referrerPolicy="no-referrer"
                onError={() => setScreenshotError(true)}
                unoptimized
              />
            </div>
          </div>
        )}

        {/* TAB 2: Architecture & System Blueprint (Zero AI, Pure Engineering Schema) */}
        {activeTab === 'architecture' && (
          <div className="relative z-10 space-y-4 py-2">
            <div className="flex items-center justify-between border-b border-black/[0.06] dark:border-white/[0.08] pb-2.5">
              <div>
                <p className="text-xs font-bold text-[#1d1d1f] dark:text-white font-heading uppercase tracking-wider">
                  Topología del Sistema & Flujo de Datos
                </p>
                <p className="text-[11px] text-[#86868b] dark:text-slate-400">
                  Esquema de ingeniería de software implementado para {company}
                </p>
              </div>
              <span className="text-[10px] px-2.5 py-1 rounded-full bg-black/[0.04] dark:bg-white/[0.08] border border-black/[0.06] dark:border-white/[0.08] text-[#1d1d1f] dark:text-slate-300 font-mono">
                SSL / TLS 1.3
              </span>
            </div>

            {/* Architecture Flow Nodes */}
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 items-center pt-2">
              {/* Node 1: Client */}
              <div className="p-3.5 rounded-2xl bg-black/[0.02] dark:bg-white/[0.03] border border-black/[0.06] dark:border-white/[0.08] flex flex-col items-center text-center">
                <div className="w-9 h-9 rounded-xl bg-[#0071e3]/10 dark:bg-[#0071e3]/20 flex items-center justify-center text-[#0071e3] dark:text-[#2997ff] mb-2">
                  <Smartphone size={18} />
                </div>
                <p className="text-xs font-bold text-[#1d1d1f] dark:text-white">Cliente Web</p>
                <p className="text-[10px] text-[#86868b] dark:text-slate-400 mt-0.5">SPA Responsive</p>
                <span className="mt-2 text-[9px] font-mono text-[#0071e3] dark:text-[#2997ff] bg-[#0071e3]/10 dark:bg-[#0071e3]/20 px-2 py-0.5 rounded-md">
                  HTTPS / REST
                </span>
              </div>

              {/* Node 2: Gateway / CDN */}
              <div className="p-3.5 rounded-2xl bg-black/[0.02] dark:bg-white/[0.03] border border-black/[0.06] dark:border-white/[0.08] flex flex-col items-center text-center">
                <div className="w-9 h-9 rounded-xl bg-[#0071e3]/10 dark:bg-[#0071e3]/20 flex items-center justify-center text-[#0071e3] dark:text-[#2997ff] mb-2">
                  <Server size={18} />
                </div>
                <p className="text-xs font-bold text-[#1d1d1f] dark:text-white">Edge & Caché</p>
                <p className="text-[10px] text-[#86868b] dark:text-slate-400 mt-0.5">CDN Global / Nginx</p>
                <span className="mt-2 text-[9px] font-mono text-[#0071e3] dark:text-[#2997ff] bg-[#0071e3]/10 dark:bg-[#0071e3]/20 px-2 py-0.5 rounded-md">
                  Brotli & Gzip
                </span>
              </div>

              {/* Node 3: Core Logic */}
              <div className="p-3.5 rounded-2xl bg-black/[0.02] dark:bg-white/[0.03] border border-black/[0.06] dark:border-white/[0.08] flex flex-col items-center text-center">
                <div className="w-9 h-9 rounded-xl bg-[#0071e3]/10 dark:bg-[#0071e3]/20 flex items-center justify-center text-[#0071e3] dark:text-[#2997ff] mb-2">
                  <Cpu size={18} />
                </div>
                <p className="text-xs font-bold text-[#1d1d1f] dark:text-white">Lógica de Negocio</p>
                <p className="text-[10px] text-[#86868b] dark:text-slate-400 mt-0.5">
                  {isEstudioGenius ? 'Procesamiento IA' : isARH ? 'WordPress Engine' : isSalud ? 'Control de Stock' : 'Tarificación'}
                </p>
                <span className="mt-2 text-[9px] font-mono text-[#0071e3] dark:text-[#2997ff] bg-[#0071e3]/10 dark:bg-[#0071e3]/20 px-2 py-0.5 rounded-md">
                  TypeScript / API
                </span>
              </div>

              {/* Node 4: Database / Persistence */}
              <div className="p-3.5 rounded-2xl bg-black/[0.02] dark:bg-white/[0.03] border border-black/[0.06] dark:border-white/[0.08] flex flex-col items-center text-center">
                <div className="w-9 h-9 rounded-xl bg-[#0071e3]/10 dark:bg-[#0071e3]/20 flex items-center justify-center text-[#0071e3] dark:text-[#2997ff] mb-2">
                  <Database size={18} />
                </div>
                <p className="text-xs font-bold text-[#1d1d1f] dark:text-white">Almacenamiento</p>
                <p className="text-[10px] text-[#86868b] dark:text-slate-400 mt-0.5">
                  {isEstudioGenius ? 'Firebase Firestore' : isParking ? 'MySQL Relacional' : 'Base de Datos Segura'}
                </p>
                <span className="mt-2 text-[9px] font-mono text-[#0071e3] dark:text-[#2997ff] bg-[#0071e3]/10 dark:bg-[#0071e3]/20 px-2 py-0.5 rounded-md">
                  ACID & Backup
                </span>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: Interactive Native UI Mockup (Rendered via React + Tailwind, Zero AI) */}
        {(activeTab === 'dashboard' || (activeTab === 'live' && screenshotError)) && (
          <div className="relative z-10 space-y-3">
            {isEstudioGenius && (
              <>
                <div className="flex items-center justify-between border-b border-black/[0.06] dark:border-white/[0.08] pb-3">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-xl bg-[#0071e3]/10 dark:bg-[#0071e3]/20 flex items-center justify-center text-[#0071e3] dark:text-[#2997ff]">
                      <Sparkles size={16} />
                    </div>
                    <div>
                      <h4 className="font-heading font-bold text-sm text-[#1d1d1f] dark:text-white flex items-center gap-2">
                        Estudio Genius <span className="text-[10px] px-2 py-0.5 rounded-full bg-black/[0.04] dark:bg-white/[0.08] text-[#0071e3] dark:text-[#2997ff] font-medium">Assistant</span>
                      </h4>
                      <p className="text-[11px] text-[#86868b] dark:text-slate-400">Recomendaciones personalizadas para estudiantes</p>
                    </div>
                  </div>
                  <span className="hidden sm:inline-flex text-[11px] items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/[0.04] dark:bg-white/[0.08] text-[#1d1d1f] dark:text-slate-300 font-medium">
                    <CheckCircle2 size={12} className="text-[#0071e3] dark:text-[#2997ff]" /> 10k+ sesiones
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-1">
                  <div className="p-3.5 rounded-2xl bg-black/[0.02] dark:bg-white/[0.03] border border-black/[0.06] dark:border-white/[0.08]">
                    <p className="text-[10px] uppercase tracking-wider text-[#86868b] dark:text-slate-400 mb-1 font-medium">Módulo de Asistencia</p>
                    <p className="text-xs font-semibold text-[#1d1d1f] dark:text-white">Generación de resúmenes</p>
                    <div className="mt-2 h-1.5 w-full bg-black/[0.06] dark:bg-white/[0.1] rounded-full overflow-hidden">
                      <div className="h-full bg-[#0071e3] dark:bg-[#2997ff] rounded-full w-4/5" />
                    </div>
                  </div>
                  <div className="p-3.5 rounded-2xl bg-black/[0.02] dark:bg-white/[0.03] border border-black/[0.06] dark:border-white/[0.08]">
                    <p className="text-[10px] uppercase tracking-wider text-[#86868b] dark:text-slate-400 mb-1 font-medium">Base de Datos</p>
                    <p className="text-xs font-semibold text-[#1d1d1f] dark:text-white">Firebase Real-time sync</p>
                    <p className="text-[10px] text-[#0071e3] dark:text-[#2997ff] mt-1 font-mono">Latencia &lt; 85ms</p>
                  </div>
                  <div className="p-3.5 rounded-2xl bg-black/[0.02] dark:bg-white/[0.03] border border-black/[0.06] dark:border-white/[0.08]">
                    <p className="text-[10px] uppercase tracking-wider text-[#86868b] dark:text-slate-400 mb-1 font-medium">Frontend Stack</p>
                    <p className="text-xs font-semibold text-[#1d1d1f] dark:text-white">React + TypeScript</p>
                    <p className="text-[10px] text-[#0071e3] dark:text-[#2997ff] mt-1 font-mono">Core Web Vitals 98/100</p>
                  </div>
                </div>
              </>
            )}

            {isARH && (
              <>
                <div className="flex items-center justify-between border-b border-black/[0.06] dark:border-white/[0.08] pb-3">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-xl bg-[#0071e3]/10 dark:bg-[#0071e3]/20 flex items-center justify-center text-[#0071e3] dark:text-[#2997ff]">
                      <Activity size={16} />
                    </div>
                    <div>
                      <h4 className="font-heading font-bold text-sm text-[#1d1d1f] dark:text-white flex items-center gap-2">
                        ARH Consultores <span className="text-[10px] px-2 py-0.5 rounded-full bg-black/[0.04] dark:bg-white/[0.08] text-[#0071e3] dark:text-[#2997ff] font-medium">Audit 100/100</span>
                      </h4>
                      <p className="text-[11px] text-[#86868b] dark:text-slate-400">Optimización de Core Web Vitals & Arquitectura WordPress</p>
                    </div>
                  </div>
                  <span className="hidden sm:inline-flex text-[11px] items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/[0.04] dark:bg-white/[0.08] text-[#1d1d1f] dark:text-slate-300 font-medium">
                    <CheckCircle2 size={12} className="text-[#0071e3] dark:text-[#2997ff]" /> LCP 1.8s
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-1">
                  <div className="p-3 rounded-2xl bg-black/[0.02] dark:bg-white/[0.03] border border-black/[0.06] dark:border-white/[0.08] text-center">
                    <span className="text-xl font-bold text-[#1d1d1f] dark:text-white font-heading">99</span>
                    <p className="text-[10px] text-[#86868b] dark:text-slate-400 mt-0.5">Performance</p>
                  </div>
                  <div className="p-3 rounded-2xl bg-black/[0.02] dark:bg-white/[0.03] border border-black/[0.06] dark:border-white/[0.08] text-center">
                    <span className="text-xl font-bold text-[#1d1d1f] dark:text-white font-heading">100</span>
                    <p className="text-[10px] text-[#86868b] dark:text-slate-400 mt-0.5">Accesibilidad</p>
                  </div>
                  <div className="p-3 rounded-2xl bg-black/[0.02] dark:bg-white/[0.03] border border-black/[0.06] dark:border-white/[0.08] text-center">
                    <span className="text-xl font-bold text-[#0071e3] dark:text-[#2997ff] font-heading">100</span>
                    <p className="text-[10px] text-[#86868b] dark:text-slate-400 mt-0.5">Mejores Prácticas</p>
                  </div>
                  <div className="p-3 rounded-2xl bg-black/[0.02] dark:bg-white/[0.03] border border-black/[0.06] dark:border-white/[0.08] text-center">
                    <span className="text-xl font-bold text-[#0071e3] dark:text-[#2997ff] font-heading">100</span>
                    <p className="text-[10px] text-[#86868b] dark:text-slate-400 mt-0.5">SEO On-Page</p>
                  </div>
                </div>
              </>
            )}

            {isSalud && (
              <>
                <div className="flex items-center justify-between border-b border-black/[0.06] dark:border-white/[0.08] pb-3">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-xl bg-[#0071e3]/10 dark:bg-[#0071e3]/20 flex items-center justify-center text-[#0071e3] dark:text-[#2997ff]">
                      <Cpu size={16} />
                    </div>
                    <div>
                      <h4 className="font-heading font-bold text-sm text-[#1d1d1f] dark:text-white flex items-center gap-2">
                        Jurisdicción Sanitaria Núm. 10 <span className="text-[10px] px-2 py-0.5 rounded-full bg-black/[0.04] dark:bg-white/[0.08] text-[#0071e3] dark:text-[#2997ff] font-medium">En Operación</span>
                      </h4>
                      <p className="text-[11px] text-[#86868b] dark:text-slate-400">Trazabilidad de insumos médicos y control de stock mínimo</p>
                    </div>
                  </div>
                  <span className="hidden sm:inline-flex text-[11px] items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/[0.04] dark:bg-white/[0.08] text-[#1d1d1f] dark:text-slate-300 font-medium">
                    <CheckCircle2 size={12} className="text-[#0071e3] dark:text-[#2997ff]" /> -20% tiempo operativo
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-1">
                  <div className="p-3.5 rounded-2xl bg-black/[0.02] dark:bg-white/[0.03] border border-black/[0.06] dark:border-white/[0.08]">
                    <p className="text-[10px] uppercase tracking-wider text-[#86868b] dark:text-slate-400 mb-1 font-medium">Módulo de Alertas</p>
                    <p className="text-xs font-semibold text-[#0071e3] dark:text-[#2997ff] flex items-center gap-1.5">
                      Reabastecimiento Automático
                    </p>
                  </div>
                  <div className="p-3.5 rounded-2xl bg-black/[0.02] dark:bg-white/[0.03] border border-black/[0.06] dark:border-white/[0.08]">
                    <p className="text-[10px] uppercase tracking-wider text-[#86868b] dark:text-slate-400 mb-1 font-medium">Tiempo de Consulta</p>
                    <p className="text-xs font-semibold text-[#1d1d1f] dark:text-white">De 15 min a 4 segundos</p>
                  </div>
                  <div className="p-3.5 rounded-2xl bg-black/[0.02] dark:bg-white/[0.03] border border-black/[0.06] dark:border-white/[0.08]">
                    <p className="text-[10px] uppercase tracking-wider text-[#86868b] dark:text-slate-400 mb-1 font-medium">Auditoría</p>
                    <p className="text-xs font-semibold text-[#0071e3] dark:text-[#2997ff]">Bitácora 100% digital</p>
                  </div>
                </div>
              </>
            )}

            {isParking && (
              <>
                <div className="flex items-center justify-between border-b border-black/[0.06] dark:border-white/[0.08] pb-3">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-xl bg-[#0071e3]/10 dark:bg-[#0071e3]/20 flex items-center justify-center text-[#0071e3] dark:text-[#2997ff]">
                      <Layers size={16} />
                    </div>
                    <div>
                      <h4 className="font-heading font-bold text-sm text-[#1d1d1f] dark:text-white flex items-center gap-2">
                        Control de Aparcamiento <span className="text-[10px] px-2 py-0.5 rounded-full bg-black/[0.04] dark:bg-white/[0.08] text-[#0071e3] dark:text-[#2997ff] font-medium">Comercializable</span>
                      </h4>
                      <p className="text-[11px] text-[#86868b] dark:text-slate-400">Tarificación dinámica, turnos, corte de caja y control de accesos</p>
                    </div>
                  </div>
                  <span className="hidden sm:inline-flex text-[11px] items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/[0.04] dark:bg-white/[0.08] text-[#1d1d1f] dark:text-slate-300 font-medium">
                    <CheckCircle2 size={12} className="text-[#0071e3] dark:text-[#2997ff]" /> Listo para venta
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-1">
                  <div className="p-3.5 rounded-2xl bg-black/[0.02] dark:bg-white/[0.03] border border-black/[0.06] dark:border-white/[0.08]">
                    <p className="text-[10px] uppercase tracking-wider text-[#86868b] dark:text-slate-400 mb-1 font-medium">Ocupación</p>
                    <p className="text-xs font-semibold text-[#1d1d1f] dark:text-white">Monitoreo de cajones libres</p>
                  </div>
                  <div className="p-3.5 rounded-2xl bg-black/[0.02] dark:bg-white/[0.03] border border-black/[0.06] dark:border-white/[0.08]">
                    <p className="text-[10px] uppercase tracking-wider text-[#86868b] dark:text-slate-400 mb-1 font-medium">Corte de Caja</p>
                    <p className="text-xs font-semibold text-[#0071e3] dark:text-[#2997ff]">Reportes automáticos</p>
                  </div>
                  <div className="p-3.5 rounded-2xl bg-black/[0.02] dark:bg-white/[0.03] border border-black/[0.06] dark:border-white/[0.08]">
                    <p className="text-[10px] uppercase tracking-wider text-[#86868b] dark:text-slate-400 mb-1 font-medium">Base de Datos</p>
                    <p className="text-xs font-semibold text-[#0071e3] dark:text-[#2997ff]">MySQL relacional optimizado</p>
                  </div>
                </div>
              </>
            )}
          </div>
        )}

        {/* Tech Badges Footer */}
        <div className="flex flex-wrap items-center gap-1.5 pt-4 mt-3 border-t border-black/[0.06] dark:border-white/[0.08] text-[10px]">
          <span className="text-[#86868b] dark:text-slate-400 mr-1">Stack:</span>
          {tech.map((t) => (
            <span
              key={t}
              className="px-2.5 py-0.5 rounded-full bg-black/[0.03] dark:bg-white/[0.05] border border-black/[0.05] dark:border-white/[0.08] text-[#1d1d1f] dark:text-slate-300 font-mono"
            >
              {t}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

