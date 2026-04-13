import { resolve } from 'path';

const GW_UI_DIST = resolve(__dirname, 'node_modules', '@guidewheel', 'ui', 'dist');

export default {
  presets: [require(resolve(GW_UI_DIST, 'tailwind.preset.js'))],
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
    resolve(GW_UI_DIST, '**/*.{js,mjs}'),
  ],
};
