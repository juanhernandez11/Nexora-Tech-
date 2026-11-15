'use client';

import '@/lib/client-guard';
import React, { createContext, useContext, useState, useEffect } from 'react';
import { flushSync } from 'react-dom';

interface AppContextType {
  darkMode: boolean;
  setDarkMode: (v: boolean | ((prev: boolean) => boolean)) => void;
  toggleTheme: (origin?: { x: number; y: number }) => void;
  fontSize: number;
  setFontSize: (v: number | ((prev: number) => number)) => void;
  highContrast: boolean;
  setHighContrast: (v: boolean | ((prev: boolean) => boolean)) => void;
  screenReader: boolean;
  setScreenReader: (v: boolean | ((prev: boolean) => boolean)) => void;
  reduceMotion: boolean;
  setReduceMotion: (v: boolean | ((prev: boolean) => boolean)) => void;
  dyslexiaFont: boolean;
  setDyslexiaFont: (v: boolean | ((prev: boolean) => boolean)) => void;
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (v: boolean | ((prev: boolean) => boolean)) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const getLS = (key: string, fallback: string) => {
  if (typeof window === 'undefined') return fallback;
  return localStorage.getItem(key) ?? fallback;
};

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [darkMode,       setDarkMode]       = useState(true);
  const [fontSize,       setFontSize]       = useState(100);
  const [highContrast,   setHighContrast]   = useState(false);
  const [screenReader,   setScreenReader]   = useState(false);
  const [reduceMotion,   setReduceMotion]   = useState(false);
  const [dyslexiaFont,   setDyslexiaFont]   = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [themeReady, setThemeReady] = useState(false);

  const toggleTheme = (origin?: { x: number; y: number }) => {
    const nextDarkMode = !darkMode;
    const applyTheme = () => {
      document.documentElement.classList.toggle('dark', nextDarkMode);
      localStorage.setItem('darkMode', String(nextDarkMode));
      flushSync(() => setDarkMode(nextDarkMode));
    };
    const viewTransitionDocument = document as Document & {
      startViewTransition?: (callback: () => void) => { finished: Promise<void> };
    };

    if (
      !themeReady ||
      reduceMotion ||
      !viewTransitionDocument.startViewTransition ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      setDarkMode(nextDarkMode);
      return;
    }

    const x = origin?.x ?? window.innerWidth / 2;
    const y = origin?.y ?? window.innerHeight / 2;
    const radius = Math.max(
      Math.hypot(x, y),
      Math.hypot(window.innerWidth - x, y),
      Math.hypot(x, window.innerHeight - y),
      Math.hypot(window.innerWidth - x, window.innerHeight - y),
    );

    document.documentElement.style.setProperty('--theme-reveal-x', `${x}px`);
    document.documentElement.style.setProperty('--theme-reveal-y', `${y}px`);
    document.documentElement.style.setProperty('--theme-reveal-radius', `${radius}px`);

    const clearRevealOrigin = () => {
      document.documentElement.style.removeProperty('--theme-reveal-x');
      document.documentElement.style.removeProperty('--theme-reveal-y');
      document.documentElement.style.removeProperty('--theme-reveal-radius');
    };
    try {
      const transition = viewTransitionDocument.startViewTransition(applyTheme);
      void transition.finished.then(clearRevealOrigin, clearRevealOrigin);
    } catch {
      clearRevealOrigin();
      setDarkMode(nextDarkMode);
    }
  };

  // Hidratación desde localStorage solo en cliente
  useEffect(() => {
    const systemTheme = document.documentElement.classList.contains('dark');
    setDarkMode(getLS('darkMode', String(systemTheme)) === 'true');
    setFontSize(Number(getLS('fontSize', '100')));
    setHighContrast(getLS('highContrast', 'false') === 'true');
    setScreenReader(getLS('screenReader', 'false') === 'true');
    setReduceMotion(getLS('reduceMotion', 'false') === 'true');
    setDyslexiaFont(getLS('dyslexiaFont', 'false') === 'true');
    setThemeReady(true);
  }, []);

  useEffect(() => {
    if (!themeReady) return;
    document.documentElement.classList.toggle('dark', darkMode);
    localStorage.setItem('darkMode', String(darkMode));
  }, [darkMode, themeReady]);

  useEffect(() => {
    document.documentElement.style.fontSize = `${fontSize}%`;
    localStorage.setItem('fontSize', String(fontSize));
  }, [fontSize]);

  useEffect(() => {
    document.documentElement.classList.toggle('high-contrast', highContrast);
    localStorage.setItem('highContrast', String(highContrast));
  }, [highContrast]);

  useEffect(() => {
    document.documentElement.classList.toggle('screen-reader-mode', screenReader);
    localStorage.setItem('screenReader', String(screenReader));
  }, [screenReader]);

  useEffect(() => {
    document.documentElement.classList.toggle('reduce-motion', reduceMotion);
    localStorage.setItem('reduceMotion', String(reduceMotion));
  }, [reduceMotion]);

  useEffect(() => {
    document.documentElement.classList.toggle('dyslexia-font', dyslexiaFont);
    localStorage.setItem('dyslexiaFont', String(dyslexiaFont));
  }, [dyslexiaFont]);

  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? 'hidden' : 'unset';
  }, [mobileMenuOpen]);

  return (
    <AppContext.Provider value={{
      darkMode, setDarkMode,
      toggleTheme,
      fontSize, setFontSize,
      highContrast, setHighContrast,
      screenReader, setScreenReader,
      reduceMotion, setReduceMotion,
      dyslexiaFont, setDyslexiaFont,
      mobileMenuOpen, setMobileMenuOpen,
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
};
