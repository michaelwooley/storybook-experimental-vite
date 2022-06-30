// module.exports = {
// 	stories: ['../src/**/*.stories.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx|svelte)'],
// 	addons: [
// 		'@storybook/addon-links',
// 		'@storybook/addon-essentials',
// 		'@storybook/addon-interactions'
// 	],
// 	framework: '@storybook/svelte',
// 	core: {
// 		builder: '@storybook/builder-vite'
// 	},
// 	svelteOptions: {
// 		// "preprocess": require("../svelte.config.js").preprocess
// 	},
// 	features: {
// 		storyStoreV7: true
// 	},
// 	typescript: {}
// };

// .storybook/main.ts

// import type { StorybookViteConfig } from '@storybook/builder-vite';

// const config =
const preprocess = require('svelte-preprocess');
const path = require('path');
// const viteConfig = require('../vite.config');

const { mergeConfig } = require('vite');
module.exports = {
	stories: ['../src/**/*.stories.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx|svelte)'],
	addons: [
		'@storybook/addon-links',
		'@storybook/addon-essentials',
		'@storybook/addon-interactions',
		'@storybook/addon-svelte-csf'
	],
	framework: '@storybook/svelte',
	core: {
		builder: '@storybook/builder-vite',
		disableTelemetry: true
	},

	features: {
		// On-demand store does not work for .svelte stories, only CSF.
		// Requires all stories to be loaded in bulk.
		// REFERENCE https://storybook.js.org/docs/svelte/configure/overview#feature-flags
		storyStoreV7: false
	},
	svelteOptions: {
		preprocess: preprocess(),
		// Possible with @sveltejs/vite-plugin-svelte version 1.0.0-next.43 or higher.
		// Focus a story iframe and press cmd+shift (mac) or ctrl+shift (windows) to activate.
		experimental: { inspector: false }
	},
	// async viteFinal(config, options) {
	// 	console.log(config.plugins);
	// 	config.plugins = config.plugins.concat(viteConfig.config);
	// 	config.resolve.alias = {
	// 		...(config.resolve.alias || {}),
	// 		...{
	// 			// $app:
	// 			// 	//  path.resolve(__dirname, '../node_modules/@sveltejs/kit/assets/runtime/app')
	// 			// 	path.resolve(__dirname, '../.svelte-kit/runtime/app')

	// $app: path.resolve('./.svelte-kit/runtime/app'),
	// $src: path.resolve('./src')
	// 		}
	// 	};
	// 	// Allow files outside root for any aliased modules
	// 	config.server.fs.strict = false;
	// 	console.log(config.resolve);

	// 	return config;
	// }
	async viteFinal(config) {
		const c = (await import('../vite.config.js')).default;
		console.log(c.resolve);

		config.resolve.alias = {
			...(config.resolve.alias || {}),
			...{
				$app: path.resolve('./.svelte-kit/runtime/app')
			}
		};
		config.server.fs.strict = false;
		// Merge custom configuration into the default config
		return mergeConfig(config, {
			// Use the same "resolve" configuration as your app
			resolve: (await import('../vite.config.js')).default.resolve
		});
	}
};
