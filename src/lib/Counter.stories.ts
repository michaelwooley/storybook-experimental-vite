// <script lang="ts">
// 	import { Meta, Template, Story } from '@storybook/addon-svelte-csf';
// 	import Counter from './Counter.svelte';
// </script>

// <Meta title="Counter" component={Counter} argTypes={{}} />

// <Template let:args>
// 	<Counter {...args} />
// </Template>

// <Story
// 	name="Basic"
// 	args={{
// 		user: {}
// 	}}
// />
import Header from './Counter.svelte';

export default {
	title: 'Counter',
	component: Header,
	parameters: {},
	argTypes: {}
};

const Template = (args: Record<string, unknown>) => ({
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
