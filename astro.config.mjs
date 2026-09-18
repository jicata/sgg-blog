// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// GitHub Pages project site until the custom domain lands.
// When it does: set `site` to the domain, `base` to '/', and add public/CNAME.
export default defineConfig({
  site: 'https://jicata.github.io',
  base: '/sgg-blog',
  trailingSlash: 'always',
  output: 'static',
  integrations: [sitemap()],
  build: { format: 'directory' },
});
