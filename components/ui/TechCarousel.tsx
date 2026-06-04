'use client';

import { useTranslations } from 'next-intl';
import { Icon } from '@iconify/react';

const TECH_LOGOS = [
  // Frontend
  { name: 'React',       icon: 'simple-icons:react',          color: '#61DAFB' },
  { name: 'TypeScript',  icon: 'simple-icons:typescript',     color: '#3178C6' },
  { name: 'Next.js',     icon: 'simple-icons:nextdotjs',      color: '#000000' },
  { name: 'Tailwind',    icon: 'simple-icons:tailwindcss',    color: '#06B6D4' },
  { name: 'Angular',     icon: 'simple-icons:angular',        color: '#DD0031' },
  { name: 'Vue.js',      icon: 'simple-icons:vuedotjs',       color: '#41B883' },
  // Backend & DB
  { name: 'Node.js',     icon: 'simple-icons:nodedotjs',      color: '#339933' },
  { name: 'Express',     icon: 'simple-icons:express',        color: '#000000' },
  { name: 'Firebase',    icon: 'simple-icons:firebase',       color: '#FFCA28' },
  { name: 'MySQL',       icon: 'simple-icons:mysql',          color: '#4479A1' },
  { name: 'MongoDB',     icon: 'simple-icons:mongodb',        color: '#47A248' },
  { name: 'PostgreSQL',  icon: 'simple-icons:postgresql',     color: '#4169E1' },
  // Lenguajes
  { name: 'JavaScript',  icon: 'simple-icons:javascript',     color: '#F7DF1E' },
  { name: 'Python',      icon: 'simple-icons:python',         color: '#3776AB' },
  { name: 'PHP',         icon: 'simple-icons:php',            color: '#777BB4' },
  // IA
  { name: 'Gemini AI',   icon: 'simple-icons:googlegemini',   color: '#8E75B2' },
  { name: 'OpenAI',      icon: 'simple-icons:openai',         color: '#412991' },
  { name: 'AWS',         icon: 'simple-icons:amazonaws',      color: '#FF9900' },
  // Herramientas
  { name: 'Git',         icon: 'simple-icons:git',            color: '#F05032' },
  { name: 'GitHub',      icon: 'simple-icons:github',         color: '#181717' },
  { name: 'Docker',      icon: 'simple-icons:docker',         color: '#2496ED' },
  { name: 'Postman',     icon: 'simple-icons:postman',        color: '#FF6C37' },
  { name: 'VS Code',     icon: 'simple-icons:visualstudiocode', color: '#007ACC' },
  { name: 'WordPress',   icon: 'simple-icons:wordpress',      color: '#21759B' },
  { name: 'Netlify',     icon: 'simple-icons:netlify',        color: '#00C7B7' },
  { name: 'Vercel',      icon: 'simple-icons:vercel',         color: '#000000' },
  // Copilot no tiene icono en Simple Icons, usamos uno custom
  { name: 'Copilot',     icon: 'simple-icons:githubcopilot',  color: '#7B61FF' },
  { name: 'n8n',         icon: 'simple-icons:n8n',            color: '#EA4B71' },
];

const LOGOS_DOUBLED = [...TECH_LOGOS, ...TECH_LOGOS];

const TechCarousel = () => {
  const t = useTranslations('process');

  return (
    <div>
      <div className="text-center mb-10">
        <h3 className="font-heading text-2xl sm:text-3xl font-black text-slate-900 dark:text-white mb-3">
          {t('techTitle')}
        </h3>
        <p className="text-slate-500 dark:text-slate-400 text-sm font-medium max-w-xl mx-auto">
          {t('techSubtitle')}
        </p>
      </div>

      <div className="relative overflow-hidden">
        <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-24 bg-gradient-to-r from-white dark:from-slate-950 to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-24 bg-gradient-to-l from-white dark:from-slate-950 to-transparent z-10 pointer-events-none" />

        <div className="flex gap-4 animate-scroll-x" style={{ width: 'max-content' }}>
          {LOGOS_DOUBLED.map((tech, i) => (
            <div
              key={`${tech.name}-${i}`}
              className="flex flex-col items-center gap-2.5 px-5 py-4 bg-white dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-2xl shadow-sm hover:shadow-md hover:border-brand-300 dark:hover:border-brand-600 hover:-translate-y-0.5 transition-all duration-200 flex-shrink-0 w-[104px] cursor-default"
              title={tech.name}
            >
              <Icon
                icon={tech.icon}
                width={28}
                height={28}
                style={{ color: tech.color }}
                className="dark:brightness-90"
              />
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
