// @ts-check
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
	// URL pública (canonical y Open Graph). Se define con SITE_URL en .env.
	site: process.env.SITE_URL || undefined,
});
