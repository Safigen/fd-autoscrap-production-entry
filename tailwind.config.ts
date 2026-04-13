import { resolve } from 'path';
import gwPreset from '@guidewheel/ui/tailwind.preset';

const GW_UI_DIST = resolve(process.cwd(), 'node_modules', '@guidewheel', 'ui', 'dist');

export default {
  presets: [gwPreset],
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
    resolve(GW_UI_DIST, '**/*.{js,mjs}'),
  ],
};
