'use client';

import { useTranslations } from 'next-intl';
import { TECH_ICON_DATA } from './tech-icon-data';

const TECH_LOGOS: { name: string; key: keyof typeof TECH_ICON_DATA }[] = [
  { name: 'React',           key: 'react' },
  { name: 'TypeScript',      key: 'typescript' },
  { name: 'Next.js',         key: 'nextdotjs' },
  { name: 'Tailwind',        key: 'tailwindcss' },
  { name: 'Angular',         key: 'angular' },
  { name: 'Vue.js',          key: 'vuedotjs' },
  { name: 'Node.js',         key: 'nodedotjs' },
  { name: 'Express',         key: 'express' },
  { name: 'Firebase',        key: 'firebase' },
  { name: 'MySQL',           key: 'mysql' },
  { name: 'MongoDB',         key: 'mongodb' },
  { name: 'PostgreSQL',      key: 'postgresql' },
  { name: 'JavaScript',      key: 'javascript' },
  { name: 'PHP',             key: 'php' },
  { name: 'Gemini AI',       key: 'googlegemini' },
  { name: 'OpenAI',          key: 'openai' },
  { name: 'Git',             key: 'git' },
  { name: 'GitHub',          key: 'github' },
  { name: 'Postman',         key: 'postman' },
  { name: 'VS Code',         key: 'visualstudiocode' },
  { name: 'WordPress',       key: 'wordpress' },
  { name: 'Netlify',         key: 'netlify' },
  { name: 'Vercel',          key: 'vercel' },
  { name: 'HTML5',           key: 'html5' },
  { name: 'CSS3',            key: 'css3' },
  { name: 'Sass',            key: 'sass' },
  { name: 'Bootstrap',       key: 'bootstrap' },
  { name: 'Railway',         key: 'railway' },
  { name: 'Copilot',         key: 'githubcopilot' },
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
          {LOGOS_DOUBLED.map((tech, i) => {
            const data = TECH_ICON_DATA[tech.key];
            return (
              <div
                key={`${tech.key}-${i}`}
                className="flex flex-col items-center gap-2.5 px-5 py-4 bg-white dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-2xl shadow-sm hover:shadow-md hover:border-brand-300 dark:hover:border-brand-600 hover:-translate-y-0.5 transition-all duration-200 flex-shrink-0 w-[104px] cursor-default"
                title={tech.name}
              >
                <svg
                  viewBox={`0 0 ${data.w} ${data.h}`}
                  width={28}
                  height={28}
                  fill={data.color}
                  dangerouslySetInnerHTML={{ __html: data.body }}
                  aria-label={tech.name}
                />
                <span className="text-[10px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest text-center leading-tight">
                  {tech.name}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default TechCarousel;
