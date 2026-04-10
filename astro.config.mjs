import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://bizzybonemusic.com',
  integrations: [sitemap()],
  legacy: {
    collectionsBackwardsCompat: true,
  },
});
