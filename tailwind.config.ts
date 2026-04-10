import { resolve } from 'path';

const GW_UI_DIR = resolve(process.env.HOME!, '.guidewheel', 'ui');

export default {
  presets: [require(resolve(GW_UI_DIR, 'dist', 'tailwind.preset.js'))],
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
    resolve(GW_UI_DIR, 'dist', '**/*.{js,mjs}'),
  ],
};
