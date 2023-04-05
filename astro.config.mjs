import path from 'path';
import { fileURLToPath } from 'url';
import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';
import image from '@astrojs/image';
import compress from 'astro-compress';
import node from '@astrojs/node';
import netlify from '@astrojs/netlify/functions';
import critters from "astro-critters";
import robotsTxt from 'astro-robots-txt';
import partytown from '@astrojs/partytown';
import magnolia from './src/utils/magnolia';

const __dirname = path.dirname(fileURLToPath(import.meta.url));


/** @type {import('astro').AstroUserConfig} */
export default defineConfig({
	site: 'https://stupendous-travesseiro-c8e474.netlify.app',
	base: '/',
	trailingSlash: 'never',
	output: 'server',
	experimental: {
		integrations: true,
		assets: true
	},
	server: {
		port: 5000
	},
	integrations: [
		tailwind({
			config: {
				applyBaseStyles: false
			}
		}),
		sitemap(),
		// image({
		// 	serviceEntryPoint: '@astrojs/image/sharp',
		// }),
		compress({
			css: true,
			html: {
				removeAttributeQuotes: false
			},
			img: false,
			js: true,
			svg: false,
			logger: 1
		}),
		critters(),
		robotsTxt(),
		// partytown(),
		magnolia()
	],
	vite: {
		resolve: {
			alias: {
				'~': path.resolve(__dirname, './src')
			}
		}
	},
	adapter: netlify()
	// adapter: node({
	// 	mode: 'standalone'
	// })
});
