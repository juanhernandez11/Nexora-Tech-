const d = require('@iconify-json/simple-icons');
const fs = require('fs');
const path = require('path');

const ic = d.icons.icons;

const needed = {
  react:             '#61DAFB',
  typescript:        '#3178C6',
  nextdotjs:         '#000000',
  tailwindcss:       '#06B6D4',
  angular:           '#DD0031',
  vuedotjs:          '#41B883',
  nodedotjs:         '#339933',
  express:           '#404040',
  firebase:          '#FFCA28',
  mysql:             '#4479A1',
  mongodb:           '#47A248',
  postgresql:        '#4169E1',
  javascript:        '#F7DF1E',
  python:            '#3776AB',
  php:               '#777BB4',
  googlegemini:      '#8E75B2',
  openai:            '#412991',
  amazonwebservices: '#FF9900',
  git:               '#F05032',
  github:            '#181717',
  docker:            '#2496ED',
  postman:           '#FF6C37',
  visualstudiocode:  '#007ACC',
  wordpress:         '#21759B',
  netlify:           '#00C7B7',
  vercel:            '#000000',
  githubcopilot:     '#7B61FF',
  n8n:               '#EA4B71',
};

const result = {};
for (const [key, color] of Object.entries(needed)) {
  if (ic[key]) {
    result[key] = {
      body:  ic[key].body,
      color,
      w:     ic[key].width  || 24,
      h:     ic[key].height || 24,
    };
  } else {
    console.warn('MISSING ICON:', key);
  }
}

const out = path.join(__dirname, '..', 'components', 'ui', 'tech-icon-data.ts');
const content = `// AUTO-GENERATED — do not edit manually\nexport const TECH_ICON_DATA = ${JSON.stringify(result, null, 2)} as const;\n`;
fs.writeFileSync(out, content, 'utf8');
console.log(`Written ${Object.keys(result).length} icons to ${out}`);
