'use client';

import { useTranslations } from 'next-intl';

const TECH_LOGOS = [
  {
    name: 'React',
    svg: (
      <svg viewBox="0 0 24 24" className="w-7 h-7" fill="none">
        <circle cx="12" cy="12" r="2.05" fill="#61DAFB"/>
        <ellipse cx="12" cy="12" rx="10" ry="3.8" stroke="#61DAFB" strokeWidth="1.2" fill="none"/>
        <ellipse cx="12" cy="12" rx="10" ry="3.8" stroke="#61DAFB" strokeWidth="1.2" fill="none" transform="rotate(60 12 12)"/>
        <ellipse cx="12" cy="12" rx="10" ry="3.8" stroke="#61DAFB" strokeWidth="1.2" fill="none" transform="rotate(120 12 12)"/>
      </svg>
    ),
  },
  {
    name: 'TypeScript',
    svg: (
      <svg viewBox="0 0 24 24" className="w-7 h-7">
        <rect width="24" height="24" rx="3" fill="#3178C6"/>
        <path d="M13.5 14.5v1.8c.3.15.65.27 1.05.35.4.08.82.12 1.25.12.42 0 .82-.04 1.2-.13.38-.09.71-.23.99-.43.28-.2.5-.46.66-.78.16-.32.24-.71.24-1.17 0-.34-.05-.63-.14-.88a2.1 2.1 0 0 0-.41-.67 3.1 3.1 0 0 0-.65-.52 7.5 7.5 0 0 0-.87-.44 5.8 5.8 0 0 1-.57-.27 1.7 1.7 0 0 1-.37-.27.97.97 0 0 1-.2-.3.9.9 0 0 1-.07-.36c0-.12.02-.23.07-.33.05-.1.12-.18.21-.25.09-.07.2-.12.33-.16.13-.04.27-.06.43-.06.12 0 .24.01.37.03.13.02.25.06.37.11.12.05.23.12.33.2.1.08.19.18.26.3V12c-.27-.1-.56-.17-.87-.22a5.8 5.8 0 0 0-1.01-.07c-.4 0-.78.05-1.14.14-.36.09-.68.24-.95.44-.27.2-.49.45-.64.76-.16.3-.24.67-.24 1.09 0 .54.15.99.44 1.36.3.37.74.68 1.34.93.22.09.43.18.62.27.19.09.36.19.5.3.14.11.25.23.33.37.08.14.12.3.12.48 0 .13-.02.25-.07.36-.05.11-.12.2-.22.28-.1.08-.22.14-.37.18-.15.04-.32.06-.52.06-.34 0-.67-.06-.99-.19a3.1 3.1 0 0 1-.87-.56zm-3.5-3.5H7.5V9.5h7v1.5h-2.5V18h-2v-7z" fill="white"/>
      </svg>
    ),
  },
  {
    name: 'Next.js',
    svg: (
      <svg viewBox="0 0 24 24" className="w-7 h-7">
        <circle cx="12" cy="12" r="12" fill="#000"/>
        <path d="M9.5 7.5v9l7-9v9" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
      </svg>
    ),
  },
  {
    name: 'Node.js',
    svg: (
      <svg viewBox="0 0 24 24" className="w-7 h-7">
        <path d="M12 2L2 7.5v9L12 22l10-5.5v-9L12 2z" fill="#339933"/>
        <path d="M12 5.5l6.5 3.6v7.2L12 19.8l-6.5-3.5V9.1L12 5.5z" fill="#fff" opacity=".15"/>
        <text x="12" y="15.5" textAnchor="middle" fontSize="7" fontWeight="bold" fill="white" fontFamily="Arial">JS</text>
      </svg>
    ),
  },
  {
    name: 'Firebase',
    svg: (
      <svg viewBox="0 0 24 24" className="w-7 h-7">
        <path d="M5.5 19.5L8 10l3 3-5.5 6.5z" fill="#FFA000"/>
        <path d="M8 10l3 3 3-8-2-3.5L8 10z" fill="#F57F17"/>
        <path d="M14 5l-3 8 3.5 3.5 4-8.5L14 5z" fill="#FFCA28"/>
        <path d="M5.5 19.5l13-8-3.5-3.5-9.5 11.5z" fill="#FFA000"/>
      </svg>
    ),
  },
  {
    name: 'Tailwind',
    svg: (
      <svg viewBox="0 0 24 24" className="w-7 h-7">
        <path d="M12 6c-2.67 0-4.33 1.33-5 4 1-1.33 2.17-1.83 3.5-1.5.76.19 1.3.74 1.9 1.35.98 1 2.09 2.15 4.6 2.15 2.67 0 4.33-1.33 5-4-1 1.33-2.17 1.83-3.5 1.5-.76-.19-1.3-.74-1.9-1.35C15.62 7.15 14.51 6 12 6zm-5 6c-2.67 0-4.33 1.33-5 4 1-1.33 2.17-1.83 3.5-1.5.76.19 1.3.74 1.9 1.35C8.38 17.85 9.49 19 12 19c2.67 0 4.33-1.33 5-4-1 1.33-2.17 1.83-3.5 1.5-.76-.19-1.3-.74-1.9-1.35C10.62 13.15 9.51 12 7 12z" fill="#06B6D4"/>
      </svg>
    ),
  },
  {
    name: 'MySQL',
    svg: (
      <svg viewBox="0 0 24 24" className="w-7 h-7">
        <path d="M12 3C7 3 3 5.24 3 8s4 5 9 5 9-2.24 9-5-4-5-9-5z" fill="#00758F"/>
        <path d="M3 8v4c0 2.76 4 5 9 5s9-2.24 9-5V8" fill="none" stroke="#00758F" strokeWidth="1.5"/>
        <path d="M3 12v4c0 2.76 4 5 9 5s9-2.24 9-5v-4" fill="none" stroke="#F29111" strokeWidth="1.5"/>
        <ellipse cx="12" cy="8" rx="9" ry="5" fill="none" stroke="#F29111" strokeWidth="1.2"/>
      </svg>
    ),
  },
  {
    name: 'WordPress',
    svg: (
      <svg viewBox="0 0 24 24" className="w-7 h-7">
        <circle cx="12" cy="12" r="10" fill="#21759B"/>
        <path d="M3.6 12c0 3.5 2.04 6.54 5 8.03L4.37 9.1A8.4 8.4 0 0 0 3.6 12zm14.1-1.07c0-1.1-.4-1.86-.74-2.45-.45-.74-.88-1.36-.88-2.1 0-.82.62-1.59 1.5-1.59.04 0 .08 0 .12.01A8.4 8.4 0 0 0 12 3.6c-2.9 0-5.46 1.49-6.95 3.74.2.01.38.01.54.01 1.87 0 4.76-.23 4.76-.23.96-.06 1.07 1.36.11 1.47 0 0-.97.11-2.05.17l3.52 10.47 2.12-6.34-1.5-4.13c-.96-.06-1.87-.17-1.87-.17-.96-.06-.85-1.53.11-1.47 0 0 2.95.23 4.7.23.96 0 1.87-.06 2.7-.17.04-.01.08-.01.12-.01.88 0 1.5.77 1.5 1.59 0 .74-.43 1.36-.88 2.1-.34.59-.74 1.35-.74 2.45 0 .76.29 1.63.68 2.85l.9 3-3.27-9.73zm-2.1 12.04l3.27-9.5.03-.08c.37 1.1.58 2.26.58 3.47 0 2.67-1.02 5.1-2.7 6.93l-.18-.82zm-3.6.43c-.67.21-1.38.33-2.1.33-1.1 0-2.14-.22-3.09-.62l3.28-9.54 2.9 8.6-.99 1.23z" fill="white"/>
      </svg>
    ),
  },
  {
    name: 'Gemini AI',
    svg: (
      <svg viewBox="0 0 24 24" className="w-7 h-7">
        <defs>
          <linearGradient id="gem-g" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#4285F4"/>
            <stop offset="50%" stopColor="#9B72CB"/>
            <stop offset="100%" stopColor="#D96570"/>
          </linearGradient>
        </defs>
        <path d="M12 2C12 2 14.5 8.5 22 12C14.5 15.5 12 22 12 22C12 22 9.5 15.5 2 12C9.5 8.5 12 2 12 2Z" fill="url(#gem-g)"/>
      </svg>
    ),
  },
  {
    name: 'AWS',
    svg: (
      <svg viewBox="0 0 24 24" className="w-7 h-7" fill="none">
        <path d="M7 13.5c-.28.5-.44 1.07-.44 1.67 0 1.9 1.54 3.44 3.44 3.44.63 0 1.22-.17 1.72-.47" stroke="#FF9900" strokeWidth="1.3" strokeLinecap="round"/>
        <path d="M6.5 11C5.12 11 4 12.12 4 13.5S5.12 16 6.5 16" stroke="#FF9900" strokeWidth="1.3" strokeLinecap="round"/>
        <path d="M17.5 11c1.38 0 2.5 1.12 2.5 2.5S18.88 16 17.5 16" stroke="#FF9900" strokeWidth="1.3" strokeLinecap="round"/>
        <path d="M8 11.5C8 9.01 10.01 7 12.5 7S17 9.01 17 11.5" stroke="#FF9900" strokeWidth="1.3" strokeLinecap="round"/>
        <path d="M4 19l2-1.5M20 19l-2-1.5M12 20v-2" stroke="#FF9900" strokeWidth="1.3" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    name: 'Git',
    svg: (
      <svg viewBox="0 0 24 24" className="w-7 h-7">
        <path d="M22.17 10.83L13.17 1.83a2.83 2.83 0 0 0-4 0L7.34 3.66l2.54 2.54a2.38 2.38 0 0 1 3 3.03l2.45 2.45a2.38 2.38 0 1 1-1.42 1.42l-2.28-2.28v6a2.38 2.38 0 1 1-1.96-.07V10.7a2.38 2.38 0 0 1-1.29-3.12L5.85 5.05 1.83 9.07a2.83 2.83 0 0 0 0 4l9 9a2.83 2.83 0 0 0 4 0l9.34-9.34a2.83 2.83 0 0 0 0-3.9z" fill="#F05032"/>
      </svg>
    ),
  },
  {
    name: 'MongoDB',
    svg: (
      <svg viewBox="0 0 24 24" className="w-7 h-7">
        <path d="M12 2C12 2 7 8 7 13.5a5 5 0 0 0 10 0C17 8 12 2 12 2z" fill="#47A248"/>
        <path d="M12 4v16" stroke="#fff" strokeWidth="1" opacity=".5"/>
        <path d="M12 4C12 4 9 9 9 13.5" stroke="#3D8B3D" strokeWidth="1.5" fill="none"/>
      </svg>
    ),
  },
];

// Duplicar para loop infinito
const LOGOS_DOUBLED = [...TECH_LOGOS, ...TECH_LOGOS];

const TechCarousel = () => {
  const t = useTranslations('process');

  return (
    <div>
      {/* Título */}
      <div className="text-center mb-10">
        <h3 className="font-heading text-2xl sm:text-3xl font-black text-slate-900 dark:text-white mb-3">
          {t('techTitle')}
        </h3>
        <p className="text-slate-500 dark:text-slate-400 text-sm font-medium max-w-xl mx-auto">
          {t('techSubtitle')}
        </p>
      </div>

      {/* Carrusel */}
      <div className="relative overflow-hidden">
        {/* Fades laterales */}
        <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-24 bg-gradient-to-r from-white dark:from-slate-950 to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-24 bg-gradient-to-l from-white dark:from-slate-950 to-transparent z-10 pointer-events-none" />

        {/* Track — usa clase CSS global animate-scroll-x */}
        <div className="flex gap-4 animate-scroll-x" style={{ width: 'max-content' }}>
          {LOGOS_DOUBLED.map((tech, i) => (
            <div
              key={`${tech.name}-${i}`}
              className="flex flex-col items-center gap-2.5 px-5 py-4 bg-white dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-2xl shadow-sm hover:shadow-md hover:border-brand-300 dark:hover:border-brand-600 hover:-translate-y-0.5 transition-all duration-200 flex-shrink-0 w-[104px] cursor-default"
              title={tech.name}
            >
              {tech.svg}
              <span className="text-[10px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest text-center leading-tight">
                {tech.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TechCarousel;
