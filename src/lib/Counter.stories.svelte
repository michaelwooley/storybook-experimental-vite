<script lang="ts">
	import { Meta, Template, Story } from '@storybook/addon-svelte-csf';
	import Counter from './Counter.svelte';
</script>

<Meta title="Counter" component={Counter} argTypes={{}} />

<Template let:args>
	<Counter {...args} />
</Template>

<Story
	name="Basic"
	args={{
		user: {}
	}}
/>
