'use client';

import { useMemo } from 'react';
import { TECH_ICON_DATA } from './tech-icon-data';

const TECH_LOGOS: { name: string; key: keyof typeof TECH_ICON_DATA }[] = [
  { name: 'React',            key: 'react' },
  { name: 'TypeScript',       key: 'typescript' },
  { name: 'Next.js',          key: 'nextdotjs' },
  { name: 'Tailwind',         key: 'tailwindcss' },
  { name: 'Supabase',         key: 'supabase' },
  { name: 'Neon',             key: 'neon' },
  { name: 'Cloudflare Pages', key: 'cloudflarepages' },
  { name: 'Docker',           key: 'docker' },
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
  { name: 'Figma',            key: 'figma' },
  { name: 'PWA',              key: 'pwa' },
  { name: 'Python',           key: 'python' },
  { name: 'VS Code',          key: 'visualstudiocode' },
  { name: 'WordPress',        key: 'wordpress' },
  { name: 'HTML5',            key: 'html5' },
  { name: 'CSS3',             key: 'css3' },
  { name: 'Sass',             key: 'sass' },
  { name: 'Bootstrap',        key: 'bootstrap' },
  { name: 'PHP',              key: 'php' },
  { name: 'JavaScript',       key: 'javascript' },
];

const NAME_TO_KEY: Record<string, keyof typeof TECH_ICON_DATA> = {
  react: 'react',
  typescript: 'typescript',
  'next.js': 'nextdotjs',
  nextjs: 'nextdotjs',
  tailwind: 'tailwindcss',
  'tailwind css': 'tailwindcss',
  node: 'nodedotjs',
  'node.js': 'nodedotjs',
  nodejs: 'nodedotjs',
  express: 'express',
  firebase: 'firebase',
  supabase: 'supabase',
  neon: 'neon',
  postgresql: 'postgresql',
  postgres: 'postgresql',
  mysql: 'mysql',
  mongodb: 'mongodb',
  'cloudflare pages': 'cloudflarepages',
  cloudflare: 'cloudflarepages',
  docker: 'docker',
  git: 'git',
  github: 'github',
  postman: 'postman',
  'rest apis': 'postman',
  'rest api': 'postman',
  webhooks: 'postman',
  'vs code': 'visualstudiocode',
  vscode: 'visualstudiocode',
  wordpress: 'wordpress',
  'wp rocket': 'wordpress',
  'yoast seo': 'wordpress',
  netlify: 'netlify',
  vercel: 'vercel',
  html5: 'html5',
  css3: 'css3',
  sass: 'sass',
  bootstrap: 'bootstrap',
  php: 'php',
  javascript: 'javascript',
  python: 'python',
  angular: 'angular',
  vue: 'vuedotjs',
  'vue.js': 'vuedotjs',
  railway: 'railway',
  'google gemini': 'googlegemini',
  'gemini ai': 'googlegemini',
  gemini: 'googlegemini',
  openai: 'openai',
  'openai gpt-4': 'openai',
  'gpt-4': 'openai',
  copilot: 'githubcopilot',
  'github copilot': 'githubcopilot',
  figma: 'figma',
  pwa: 'pwa',
  'service workers': 'pwa',
  zapier: 'zapier',
  n8n: 'n8n',
  whatsapp: 'whatsapp',
  'whatsapp business api': 'whatsapp',
  'google analytics': 'googleanalytics',
  analytics: 'googleanalytics',
  'google cloud': 'googlecloud',
  aws: 'googlecloud',
  'aws sagemaker': 'googlecloud',
  langchain: 'python',
  'google sheets api': 'googlecloud',
  'office scripts': 'typescript',
  iconify: 'visualstudiocode',
  'simple icons': 'github',
};

interface TechCarouselProps {
  techNames?: string[];
  className?: string;
}

const TechCarousel = ({ techNames, className = '' }: TechCarouselProps) => {
  const activeLogos = useMemo(() => {
    if (!techNames || techNames.length === 0) {
      return [...TECH_LOGOS, ...TECH_LOGOS];
    }

    const mapped = techNames.map((rawName) => {
      const clean = rawName.trim().toLowerCase();
      let key = NAME_TO_KEY[clean];

      if (!key) {
        const found = Object.keys(NAME_TO_KEY).find(
          (k) => clean.includes(k) || k.includes(clean)
        );
        key = found ? NAME_TO_KEY[found] : 'typescript';
      }

      return { name: rawName, key };
    });

    let repeated = [...mapped];
    while (repeated.length < 20) {
      repeated = [...repeated, ...mapped];
    }

    return [...repeated, ...repeated];
  }, [techNames]);

  return (
    <div className={`relative overflow-hidden py-4 ${className}`}>
      {/* Máscaras de desvanecimiento lateral */}
      <div className="absolute left-0 top-0 bottom-0 w-12 sm:w-20 bg-gradient-to-r from-white dark:from-black to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-12 sm:w-20 bg-gradient-to-l from-white dark:from-black to-transparent z-10 pointer-events-none" />

      <div className="flex gap-3.5 animate-scroll-x" style={{ width: 'max-content' }}>
        {activeLogos.map((tech, i) => {
          const data = TECH_ICON_DATA[tech.key];
          if (!data) return null;
          const isAdaptive = Boolean(data.darkColor && data.darkColor !== data.color);

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
                  fill={isAdaptive ? 'currentColor' : data.color}
                  dangerouslySetInnerHTML={{ __html: data.body }}
                  aria-label={tech.name}
                  className={isAdaptive ? 'text-[#1d1d1f] dark:text-white transition-colors duration-200' : 'transition-colors duration-200'}
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
