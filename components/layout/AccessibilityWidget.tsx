'use client';

import { useState, useEffect, useRef } from 'react';
import { useTranslations } from 'next-intl';
import { Accessibility, X, ZoomIn, ZoomOut, Contrast, Volume2, VolumeX, RotateCcw, Zap, Type } from 'lucide-react';
import { useApp } from '@/context/AppContext';

const speak = (text: string) => {
  if (!window.speechSynthesis) return;
  window.speechSynthesis.cancel();
  const u = new SpeechSynthesisUtterance(text);
  u.lang = 'es-MX';
  u.rate = 0.95;
  window.speechSynthesis.speak(u);
};

const AccessibilityWidget = () => {
  const [mounted, setMounted] = useState(false);
  const t = useTranslations('accessibility');
  const [open, setOpen] = useState(false);
  const [speaking, setSpeaking] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const { fontSize, setFontSize, highContrast, setHighContrast, screenReader, setScreenReader, reduceMotion, setReduceMotion, dyslexiaFont, setDyslexiaFont } = useApp();

  useEffect(() => {
    setMounted(true);
  }, []);

  const reset = () => {
    setFontSize(100); setHighContrast(false); setScreenReader(false);
    setReduceMotion(false); setDyslexiaFont(false);
    window.speechSynthesis?.cancel(); setSpeaking(false);
  };

  const handleReadPage = () => {
    if (speaking) { window.speechSynthesis?.cancel(); setSpeaking(false); return; }
    const text = (document.querySelector('main') || document.body).innerText;
    speak(text); setSpeaking(true);
  };

  useEffect(() => {
    if (!screenReader) return;
    const handler = (e: MouseEvent) => {
      const el = (e.target as Element).closest('a,button,h1,h2,h3,h4,p,li,label,span');
      if (el) { const txt = el.getAttribute('aria-label') || (el as HTMLElement).innerText; if (txt?.trim()) speak(txt.trim()); }
    };
    document.addEventListener('click', handler);
    return () => document.removeEventListener('click', handler);
  }, [screenReader]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape' && open) { setOpen(false); triggerRef.current?.focus(); } };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [open]);

  useEffect(() => () => { window.speechSynthesis?.cancel(); }, []);

  const hasSpeech = typeof window !== 'undefined' && !!window.speechSynthesis;

  if (!mounted) return null;

  return (
    <div className="fixed bottom-6 left-6 z-[100]">
      {open && (
        <div role="dialog" aria-modal="true" aria-label={t('title')} className="mb-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl shadow-2xl p-4 w-64">
          <div className="flex justify-between items-center mb-4">
            <span className="text-xs font-black uppercase tracking-widest text-slate-700 dark:text-slate-200">{t('title')}</span>
            <button onClick={() => { setOpen(false); triggerRef.current?.focus(); }} aria-label={t('close')} className="p-1 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-full">
              <X size={14} className="text-slate-500 dark:text-slate-400" />
            </button>
          </div>
          <div className="space-y-2">
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">{t('textSize')}</p>
              <div className="flex items-center gap-2">
                <button onClick={() => setFontSize(f => Math.max(80, f - 10))} aria-label={t('decrease')} className="flex-1 flex items-center justify-center gap-1 py-2 bg-black/[0.04] dark:bg-white/[0.06] hover:bg-black/[0.08] dark:hover:bg-white/[0.1] text-[#1d1d1f] dark:text-white rounded-xl text-xs font-semibold transition-colors"><ZoomOut size={13} /> A-</button>
                <span aria-live="polite" className="text-xs font-semibold text-[#1d1d1f] dark:text-slate-200 w-10 text-center">{fontSize}%</span>
                <button onClick={() => setFontSize(f => Math.min(150, f + 10))} aria-label={t('increase')} className="flex-1 flex items-center justify-center gap-1 py-2 bg-black/[0.04] dark:bg-white/[0.06] hover:bg-black/[0.08] dark:hover:bg-white/[0.1] text-[#1d1d1f] dark:text-white rounded-xl text-xs font-semibold transition-colors"><ZoomIn size={13} /> A+</button>
              </div>
            </div>
            {([
              { state: highContrast, set: setHighContrast, icon: Contrast,  label: t('highContrast') },
              { state: dyslexiaFont, set: setDyslexiaFont, icon: Type,      label: t('dyslexiaFont') },
              { state: reduceMotion, set: setReduceMotion, icon: Zap,       label: t('reduceMotion') },
              { state: screenReader, set: setScreenReader, icon: Volume2,   label: t('clickReader') },
            ] as const).map(({ state, set, icon: Icon, label }) => (
              <button key={label} onClick={() => set((v: boolean) => !v)} aria-pressed={state}
                className={`w-full flex items-center gap-3 py-2.5 px-3 rounded-xl text-xs font-medium transition-colors ${state ? 'bg-[#0071e3] text-white' : 'bg-black/[0.04] dark:bg-white/[0.06] text-[#1d1d1f] dark:text-slate-200 hover:bg-black/[0.08] dark:hover:bg-white/[0.1]'}`}>
                <Icon size={14} /><span>{label}</span>{state && <span className="ml-auto text-[10px] font-semibold">{t('active')}</span>}
              </button>
            ))}
            {hasSpeech && (
              <button onClick={handleReadPage} aria-label={speaking ? t('stopReading') : t('readPage')}
                className={`w-full flex items-center gap-3 py-2.5 px-3 rounded-xl text-xs font-medium transition-colors ${speaking ? 'bg-[#0071e3] text-white' : 'bg-black/[0.04] dark:bg-white/[0.06] text-[#1d1d1f] dark:text-slate-200 hover:bg-black/[0.08] dark:hover:bg-white/[0.1]'}`}>
                {speaking ? <VolumeX size={14} /> : <Volume2 size={14} />}
                <span>{speaking ? t('stopReading') : t('readPage')}</span>
                {speaking && <span className="ml-auto text-[10px] font-semibold animate-pulse">●</span>}
              </button>
            )}
            <button onClick={reset} aria-label={t('reset')} className="w-full flex items-center gap-3 py-2.5 px-3 rounded-xl text-xs font-medium bg-black/[0.04] dark:bg-white/[0.06] text-[#86868b] dark:text-slate-400 hover:text-[#1d1d1f] dark:hover:text-white transition-colors">
              <RotateCcw size={14} /> {t('reset')}
            </button>
          </div>
        </div>
      )}
      <button ref={triggerRef} onClick={() => setOpen(v => !v)} aria-label={open ? t('close') : t('open')} aria-expanded={open} aria-haspopup="dialog"
        className="w-12 h-12 bg-[#0071e3] hover:bg-[#0077ed] text-white rounded-full shadow-lg shadow-[#0071e3]/20 flex items-center justify-center transition-all hover:scale-105 active:scale-95 focus:outline-none">
        <Accessibility size={20} />
      </button>
    </div>
  );
};

export default AccessibilityWidget;
