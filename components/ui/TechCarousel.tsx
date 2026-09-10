'use client';

import { useApp } from '@/context/AppContext';
import { TECH_ICON_DATA } from './tech-icon-data';

const TECH_LOGOS: { name: string; key: keyof typeof TECH_ICON_DATA }[] = [
  { name: 'React',            key: 'react' },
  { name: 'TypeScript',       key: 'typescript' },
  { name: 'Next.js',          key: 'nextdotjs' },
  { name: 'Tailwind',         key: 'tailwindcss' },
  { name: 'Supabase',         key: 'supabase' },
  { name: 'Neon',             key: 'neon' },
  { name: 'Cloudflare Pages', key: 'cloudflarepages' },
  { name: 'PostgreSQL',       key: 'postgresql' },
  { name: 'MySQL',            key: 'mysql' },
  { name: 'MongoDB',          key: 'mongodb' },
  { name: 'Firebase',         key: 'firebase' },
  { name: 'Angular',          key: 'angular' },
  { name: 'Vue.js',           key: 'vuedotjs' },
  { name: 'Node.js',          key: 'nodedotjs' },
  { name: 'Express',          key: 'express' },
  { name: 'Railway',          key: 'railway' },
  { name: 'Vercel',           key: 'vercel' },
  { name: 'Netlify',          key: 'netlify' },
  { name: 'Gemini AI',        key: 'googlegemini' },
  { name: 'OpenAI',           key: 'openai' },
  { name: 'Copilot',          key: 'githubcopilot' },
  { name: 'Git',              key: 'git' },
  { name: 'GitHub',           key: 'github' },
  { name: 'Postman',          key: 'postman' },
  { name: 'VS Code',          key: 'visualstudiocode' },
  { name: 'WordPress',        key: 'wordpress' },
  { name: 'HTML5',            key: 'html5' },
  { name: 'CSS3',             key: 'css3' },
  { name: 'Sass',             key: 'sass' },
  { name: 'Bootstrap',        key: 'bootstrap' },
  { name: 'PHP',              key: 'php' },
  { name: 'JavaScript',       key: 'javascript' },
];

const LOGOS_DOUBLED = [...TECH_LOGOS, ...TECH_LOGOS];

const TechCarousel = () => {
  const { darkMode } = useApp();

  return (
    <div className="relative overflow-hidden py-4">
      {/* Máscaras de desvanecimiento lateral */}
      <div className="absolute left-0 top-0 bottom-0 w-12 sm:w-20 bg-gradient-to-r from-white dark:from-black to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-12 sm:w-20 bg-gradient-to-l from-white dark:from-black to-transparent z-10 pointer-events-none" />

      <div className="flex gap-3.5 animate-scroll-x" style={{ width: 'max-content' }}>
        {LOGOS_DOUBLED.map((tech, i) => {
          const data = TECH_ICON_DATA[tech.key];
          if (!data) return null;
          const activeColor = darkMode ? (data.darkColor || data.color) : data.color;

          return (
            <div
              key={`${tech.key}-${i}`}
              className="flex flex-col items-center justify-center gap-2 px-3 py-3 bg-[#f5f5f7] dark:bg-[#161617] border border-black/[0.05] dark:border-white/[0.08] rounded-2xl hover:scale-105 transition-all duration-200 flex-shrink-0 w-[108px] sm:w-[114px] cursor-default group shadow-xs"
              title={tech.name}
            >
              <span className="w-7 h-7 flex items-center justify-center transition-transform duration-200 group-hover:scale-110">
                <svg
                  viewBox={`0 0 ${data.w} ${data.h}`}
                  width={26}
                  height={26}
                  fill={activeColor}
                  dangerouslySetInnerHTML={{ __html: data.body }}
                  aria-label={tech.name}
                  className="transition-colors duration-200"
                />
              </span>
              <span className="text-[11px] font-medium text-[#1d1d1f]/80 dark:text-slate-300 tracking-tight text-center leading-tight truncate w-full px-1">
                {tech.name}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TechCarousel;
