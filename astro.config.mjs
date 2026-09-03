// @ts-check
import { defineConfig } from 'astro/config';

// GitHub Pages project site: https://teassty.github.io/put-auto/
const isPages = process.env.GITHUB_PAGES === 'true';

export default defineConfig({
  site: isPages ? 'https://teassty.github.io' : 'https://put-auto.ru',
  base: isPages ? '/put-auto' : '/',
  compressHTML: true,
  build: {
    inlineStylesheets: 'auto',
  },
});
