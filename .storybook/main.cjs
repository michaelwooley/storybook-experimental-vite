const preprocess = require('svelte-preprocess');
const path = require('path');
const { loadConfigFromFile, mergeConfig } = require('vite');

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

	async viteFinal(config, { configType }) {
		const { config: userConfig } = await loadConfigFromFile(
			path.resolve(__dirname, "../vite.config.js")
		);
		// Remove Svelte plugins that would duplicate those added by the Storybook plugin
		const plugins = userConfig.plugins.flat(1)
			.filter(p => !p.name.startsWith('vite-plugin-svelte') || p.name === 'vite-plugin-svelte-kit');
		return mergeConfig(config, {
			...userConfig,
			plugins,
			server: {
				fs: {
					allow: ['.storybook']
				}
			}
		});
  	}
};
