import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://165cm.github.io',
  base: '/aircon-tool-gear',
  trailingSlash: 'always',
  build: {
    format: 'directory',
  },
  integrations: [tailwind(), sitemap()],
});
