import { defineConfig } from 'astro/config';
import { rm } from 'node:fs/promises';

// Direction sketches are dev-only: available under `astro dev`, stripped from production builds.
const devOnlySketches = {
  name: 'dev-only-sketches',
  hooks: {
    'astro:build:done': async ({ dir }) => {
      await rm(new URL('sketches/', dir), { recursive: true, force: true });
    },
  },
};

export default defineConfig({
  site: 'https://drewhansen.design',
  devToolbar: { enabled: false },
  integrations: [devOnlySketches],
  // The v1 (Framer) site's URLs, from its sitemap, so old links and search
  // results still land somewhere sensible. GitHub Pages can't send real
  // redirects, so these build as small pages that forward on load.
  redirects: {
    '/projects/sams-club': '/work/sams-club/',
    '/projects/tinder': '/work/tinder/',
    '/projects/the-north-face': '/work/the-north-face/',
    '/projects/jumpcloud': '/work/jumpcloud/',
    '/projects': '/#work',
    '/about': '/#about',
    '/experience': '/#experience',
    '/contact': '/#contact',
  },
});
