'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

interface AppContextType {
  darkMode: boolean;
  setDarkMode: (v: boolean | ((prev: boolean) => boolean)) => void;
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
  const [darkMode,       setDarkMode]       = useState(false);
  const [fontSize,       setFontSize]       = useState(100);
  const [highContrast,   setHighContrast]   = useState(false);
  const [screenReader,   setScreenReader]   = useState(false);
  const [reduceMotion,   setReduceMotion]   = useState(false);
  const [dyslexiaFont,   setDyslexiaFont]   = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Hidratación desde localStorage solo en cliente
  useEffect(() => {
    setDarkMode(getLS('darkMode', 'false') === 'true');
    setFontSize(Number(getLS('fontSize', '100')));
    setHighContrast(getLS('highContrast', 'false') === 'true');
    setScreenReader(getLS('screenReader', 'false') === 'true');
    setReduceMotion(getLS('reduceMotion', 'false') === 'true');
    setDyslexiaFont(getLS('dyslexiaFont', 'false') === 'true');
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode);
    localStorage.setItem('darkMode', String(darkMode));
  }, [darkMode]);

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
