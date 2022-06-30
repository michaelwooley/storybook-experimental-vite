const preprocess = require('svelte-preprocess');
const path = require('path');

module.exports = {
	stories: ['../src/**/*.stories.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx|svelte)'],
	addons: [
		'@storybook/addon-links',
		'@storybook/addon-essentials',
		'@storybook/addon-interactions'
		// '@storybook/addon-svelte-csf' // Ought to work but simplify for now.
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
		preprocess: preprocess(), // necessary to work currently. But does that mean that other stuff is ignored?
		experimental: { inspector: false }
	},

	async viteFinal(config) {
		config.resolve.alias = {
			...(config.resolve.alias || {}),
			...{
				$app: path.resolve('./.svelte-kit/runtime/app'),
				$lib: path.resolve('./src/lib')
			}
		};
		config.server.fs.strict = false;
		config.server.fs.allow = ['.'];
		// Merge custom configuration into the default config
		return config;
	}
};
