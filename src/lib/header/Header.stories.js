// <!-- <script lang="ts">
// 	import { Meta, Template, Story } from '@storybook/addon-svelte-csf';
// 	import Header from './Header.svelte';
// </script>

// <Meta title="Header" component={Header} argTypes={{}} />

// <Template let:args>
// 	<Header {...args} />
// </Template>

// <Story
// 	name="Basic"
// 	args={{
// 		user: {}
// 	}}
// />
import Header from './Header.svelte';

export default {
	title: 'Header',
	component: Header,
	parameters: {},
	argTypes: {}
};

const Template = (args) => ({
	Component: Header,
	props: args,
	on: {
		login: args.onLogin,
		logout: args.onLogout,
		createAccount: args.onCreateAccount
	}
});

export const Basic = Template.bind({});
Basic.args = {};
