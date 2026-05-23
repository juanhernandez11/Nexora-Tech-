'use client';

import { useTranslations } from 'next-intl';

// Unique gradient IDs per logo to avoid SVG conflicts
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
  // ── Lenguajes ──
  {
    name: 'JavaScript',
    svg: (
      <svg viewBox="0 0 24 24" className="w-7 h-7">
        <rect width="24" height="24" rx="3" fill="#F7DF1E"/>
        <path d="M7 17.5c.4.7 1 1.2 2 1.2 1.1 0 1.7-.5 1.7-1.3 0-.9-.7-1.2-1.8-1.7l-.6-.3C6.8 14.8 6 14 6 12.5c0-1.4 1-2.4 2.7-2.4 1.1 0 2 .4 2.6 1.4l-1.4.9c-.3-.5-.6-.7-1.2-.7-.6 0-.9.3-.9.7 0 .5.3.7 1.3 1.1l.6.3c1.6.7 2.4 1.5 2.4 3 0 1.7-1.3 2.7-3.1 2.7-1.7 0-2.8-.8-3.4-2l1.4-.9zm7.5.2c.5.8 1.1 1.4 2.2 1.4 1 0 1.6-.5 1.6-1.1 0-.8-.6-1.1-1.7-1.5l-.6-.3c-1.6-.7-2.7-1.5-2.7-3.2 0-1.6 1.2-2.8 3-2.8 1.3 0 2.2.5 2.9 1.6l-1.5.9c-.3-.6-.7-.9-1.4-.9-.6 0-1 .3-1 .9 0 .6.4.9 1.4 1.3l.6.2c1.9.8 2.9 1.6 2.9 3.3 0 1.9-1.5 2.9-3.4 2.9-1.9 0-3.1-.9-3.7-2.2l1.9-.5z" fill="#000"/>
      </svg>
    ),
  },
  {
    name: 'Python',
    svg: (
      <svg viewBox="0 0 24 24" className="w-7 h-7">
        <defs>
          <linearGradient id="py-g" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#3776AB"/>
            <stop offset="100%" stopColor="#FFD43B"/>
          </linearGradient>
        </defs>
        <path d="M12 2C9.5 2 8 3.1 8 4.5V7h4v1H5.5C4 8 3 9.2 3 11s1 3.5 2.5 3.5H6v-2.5C6 10.6 7.6 9 9.5 9H14c1.4 0 2.5-1.1 2.5-2.5v-2C16.5 3.1 14.5 2 12 2zm-1.5 1.5a.75.75 0 1 1 0 1.5.75.75 0 0 1 0-1.5z" fill="#3776AB"/>
        <path d="M12 22c2.5 0 4-1.1 4-2.5V17h-4v-1h6.5c1.5 0 2.5-1.2 2.5-3s-1-3.5-2.5-3.5H18v2.5C18 13.4 16.4 15 14.5 15H10c-1.4 0-2.5 1.1-2.5 2.5v2C7.5 20.9 9.5 22 12 22zm1.5-1.5a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5z" fill="#FFD43B"/>
      </svg>
    ),
  },
  {
    name: 'PHP',
    svg: (
      <svg viewBox="0 0 24 24" className="w-7 h-7">
        <ellipse cx="12" cy="12" rx="11" ry="7" fill="#777BB4"/>
        <path d="M5.5 14.5l1-5h1.8c.9 0 1.5.4 1.5 1.2 0 1.1-.8 1.8-2 1.8H7l-.3 2H5.5zm1.7-3h.5c.5 0 .8-.2.8-.6 0-.3-.2-.4-.6-.4h-.5l-.2 1zM10 14.5l1-5h1.8c.9 0 1.5.4 1.5 1.2 0 1.1-.8 1.8-2 1.8h-.8l-.3 2H10zm1.7-3h.5c.5 0 .8-.2.8-.6 0-.3-.2-.4-.6-.4h-.5l-.2 1zM14 14.5l.7-3.5h-.9l.2-1.5h.9l.2-1h1.5l-.2 1h1l-.2 1.5h-1l-.7 3.5H14z" fill="white"/>
      </svg>
    ),
  },
  // ── Frameworks / UI ──
  {
    name: 'Angular',
    svg: (
      <svg viewBox="0 0 24 24" className="w-7 h-7">
        <path d="M12 2L3 5.5l1.4 12L12 22l7.6-4.5L21 5.5 12 2z" fill="#DD0031"/>
        <path d="M12 2v20l7.6-4.5L21 5.5 12 2z" fill="#C3002F"/>
        <path d="M12 5.5L7.5 16h1.7l.9-2.3h3.8l.9 2.3h1.7L12 5.5zm0 3l1.4 3.7h-2.8L12 8.5z" fill="white"/>
      </svg>
    ),
  },
  {
    name: 'Vue.js',
    svg: (
      <svg viewBox="0 0 24 24" className="w-7 h-7">
        <path d="M12 21L1 3h4.5L12 14.5 18.5 3H23L12 21z" fill="#41B883"/>
        <path d="M12 21L7.5 13 5 9h4l3 5.5L15 9h4l-2.5 4L12 21z" fill="#35495E"/>
      </svg>
    ),
  },
  {
    name: 'Express',
    svg: (
      <svg viewBox="0 0 24 24" className="w-7 h-7">
        <rect width="24" height="24" rx="3" fill="#000"/>
        <text x="3" y="15" fontSize="7.5" fontWeight="bold" fill="white" fontFamily="Arial">express</text>
      </svg>
    ),
  },
  // ── IAs ──
  {
    name: 'ChatGPT',
    svg: (
      <svg viewBox="0 0 24 24" className="w-7 h-7">
        <circle cx="12" cy="12" r="11" fill="#10A37F"/>
        <path d="M12 5.5a4.5 4.5 0 0 1 4.24 6.01l.01.01A3.5 3.5 0 0 1 13 18.5H11a3.5 3.5 0 0 1-3.25-4.98A4.5 4.5 0 0 1 12 5.5zm0 1.5a3 3 0 0 0-2.6 4.5l.3.5-.2.55A2 2 0 0 0 11 15h2a2 2 0 0 0 1.5-3.35l-.2-.3.1-.4A3 3 0 0 0 12 7z" fill="white"/>
      </svg>
    ),
  },
  {
    name: 'Claude',
    svg: (
      <svg viewBox="0 0 24 24" className="w-7 h-7">
        <rect width="24" height="24" rx="6" fill="#D97757"/>
        <text x="12" y="16" textAnchor="middle" fontSize="9" fontWeight="bold" fill="white" fontFamily="Arial">C</text>
      </svg>
    ),
  },
  {
    name: 'Copilot',
    svg: (
      <svg viewBox="0 0 24 24" className="w-7 h-7">
        <defs>
          <linearGradient id="cop-g" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#7B61FF"/>
            <stop offset="100%" stopColor="#00B4D8"/>
          </linearGradient>
        </defs>
        <rect width="24" height="24" rx="6" fill="url(#cop-g)"/>
        <circle cx="9" cy="10" r="2.5" fill="white"/>
        <circle cx="15" cy="10" r="2.5" fill="white"/>
        <circle cx="9" cy="10" r="1" fill="#7B61FF"/>
        <circle cx="15" cy="10" r="1" fill="#7B61FF"/>
        <path d="M8 15c0-2.2 1.8-4 4-4s4 1.8 4 4" stroke="white" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
      </svg>
    ),
  },
  // ── Herramientas / Testing ──
  {
    name: 'Postman',
    svg: (
      <svg viewBox="0 0 24 24" className="w-7 h-7">
        <circle cx="12" cy="12" r="11" fill="#FF6C37"/>
        <path d="M13.5 8.5a4 4 0 1 1-5.66 5.66L13.5 8.5z" fill="white" opacity=".9"/>
        <path d="M10 10l4 4" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
        <circle cx="14.5" cy="9.5" r="1.5" fill="white"/>
      </svg>
    ),
  },
  {
    name: 'VS Code',
    svg: (
      <svg viewBox="0 0 24 24" className="w-7 h-7">
        <defs>
          <linearGradient id="vsc-g" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#0065A9"/>
            <stop offset="100%" stopColor="#0078D4"/>
          </linearGradient>
        </defs>
        <path d="M17 2L7 12.5 3 9l-1 1 4.5 4.5L2 18l1 1 4-2.5L17 22l4-2V4l-4-2zm2 17.5l-9-5.5 9-5.5v11z" fill="url(#vsc-g)"/>
      </svg>
    ),
  },
  {
    name: 'Docker',
    svg: (
      <svg viewBox="0 0 24 24" className="w-7 h-7">
        <path d="M13 8h2V6h-2v2zm-3 0h2V6h-2v2zm-3 0h2V6H7v2zm3-3h2V3h-2v2zm-3 3h2V6H4v2zm9 0h2V6h-2v2z" fill="#2496ED"/>
        <path d="M21.8 10.3c-.4-.3-1.4-.4-2.1-.3-.1-.8-.6-1.5-1.4-2l-.5-.3-.3.5c-.3.5-.4 1.3-.3 1.9-.4-.2-.9-.3-1.4-.3H2.2l-.1.5C2 11.5 2 12.5 2.5 13.5c.5 1.1 1.4 1.9 2.5 2.3.5.2 1 .3 1.5.3.7 0 1.3-.1 1.9-.4.5.4 1.1.6 1.8.6h1.1c.4 0 .8-.1 1.1-.3.3.2.7.3 1.1.3h.5c.4 0 .8-.1 1.1-.3.3.2.7.3 1.1.3h.2c1.5 0 2.8-.8 3.5-2 .8.1 1.8-.1 2.3-.7l.3-.3-.2-.3z" fill="#2496ED"/>
      </svg>
    ),
  },
  {
    name: 'GitHub',
    svg: (
      <svg viewBox="0 0 24 24" className="w-7 h-7">
        <path d="M12 2C6.48 2 2 6.48 2 12c0 4.42 2.87 8.17 6.84 9.49.5.09.68-.22.68-.48v-1.7C6.73 19.91 6.14 18 6.14 18c-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.61.07-.61 1 .07 1.53 1.03 1.53 1.03.89 1.52 2.34 1.08 2.91.83.09-.65.35-1.08.63-1.33-2.22-.25-4.56-1.11-4.56-4.95 0-1.09.39-1.99 1.03-2.69-.1-.25-.45-1.27.1-2.65 0 0 .84-.27 2.75 1.02A9.56 9.56 0 0 1 12 6.8c.85 0 1.71.11 2.51.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.38.2 2.4.1 2.65.64.7 1.03 1.6 1.03 2.69 0 3.85-2.34 4.7-4.57 4.95.36.31.68.92.68 1.85v2.74c0 .27.18.58.69.48A10.01 10.01 0 0 0 22 12c0-5.52-4.48-10-10-10z" fill="#181717"/>
      </svg>
    ),
  },
  {
    name: 'Netlify',
    svg: (
      <svg viewBox="0 0 24 24" className="w-7 h-7">
        <path d="M16.9 10.6l-.4-.1-2.8-2.8.1-.5 1-4.6L13.5 2l-3.4 5.3-.3.2-5.6.8L3 9.5l4 3.9.1.4-.9 5.5 1.3.7 4.9-2.6.4.1 4.9 2.6 1.3-.7-.9-5.5.1-.4 4-3.9-1.3-1.2-4 .2zm-5.4 4.5l-2.9 1.5.5-3.3-2.4-2.3 3.3-.5 1.5-3 1.5 3 3.3.5-2.4 2.3.5 3.3-2.9-1.5z" fill="#00C7B7"/>
      </svg>
    ),
  },
  {
    name: 'Vercel',
    svg: (
      <svg viewBox="0 0 24 24" className="w-7 h-7">
        <path d="M12 2L2 20h20L12 2z" fill="#000"/>
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
