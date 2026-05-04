import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://www.bizzybonemusic.com',
  trailingSlash: 'never',
  integrations: [sitemap()],
  legacy: {
    collectionsBackwardsCompat: true,
  },
});
