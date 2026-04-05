import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://bizzybonemusic.vercel.app',
  integrations: [sitemap()],
  legacy: {
    collectionsBackwardsCompat: true,
  },
});
