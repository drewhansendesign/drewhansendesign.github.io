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
});
