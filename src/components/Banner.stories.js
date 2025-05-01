// Banner.stories.js
import Banner from './Banner.svelte';

export default {
	title: 'Components/Banner',
	component: Banner,
	argTypes: {
		heading: {
			control: 'text',
			defaultValue: 'Cedar App'
		},
		text: {
			control: 'text',
			defaultValue: 'Send & Receive Cross-border Payments Globally.'
		},
		linkText: {
			control: 'text',
			defaultValue: 'Start Sending'
		},
		linkUrl: {
			control: 'text',
			defaultValue: 'https://cedar.app'
		}
	}
};

const Template = (/** @type {any} */ args) => ({
	Component: Banner,
	props: args
});

export const Default = Template.bind({});
// @ts-ignore
Default.args = {
	heading: 'Cedar App',
	text: 'Send & Receive Cross-border Payments Globally.',
	linkText: 'Start Sending',
	linkUrl: 'https://cedar.app'
};
