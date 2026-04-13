import { resolve } from 'path';
import gwPreset from '@guidewheel/ui/tailwind.preset';

const GW_UI_BUILD = resolve(process.cwd(), 'node_modules', '@guidewheel', 'ui', 'build');

export default {
  presets: [gwPreset],
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
    resolve(GW_UI_BUILD, '**/*.{js,mjs}'),
  ],
};
