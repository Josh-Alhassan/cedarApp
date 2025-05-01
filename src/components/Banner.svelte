<script>
	import './Banner.css';

	/**
	 * @typedef {Object} BannerProps
	 * @property {string} [heading="Cedar App"] - The main heading text
	 * @property {string} [text="Send & Receive Cross-border Payments Globally."] - The descriptive text
	 * @property {string} [linkText="Start Sending"] - The call-to-action text
	 * @property {string} [linkUrl="https://cedar.app"] - The URL the CTA links to
	 * @property {string} [iconName="right-arrow-alt"] - The Boxicon name for the arrow
	 * @property {string} [iconColor="#1F75FE"] - Color of the Boxicon
	 */

	/** @type {string} */
	export let heading = 'Cedar App';
	/** @type {string} */
	export let text = 'Send & Receive Cross-border Payments Globally.';
	/** @type {string} */
	export let linkText = 'Start Sending';
	/** @type {string} */
	export let linkUrl = 'https://cedar.app';
	/** @type {string} */
	export let iconName = 'right-arrow-alt';
	/** @type {string} */
	export let iconColor = '#1F75FE';
</script>

<!--
    Promotional Banner Component
    
    @component
    @name Banner
    @description A promotional banner with heading, descriptive text, and call-to-action link.
    @prop {string} [heading="Cedar App"] - The main heading text
    @prop {string} [text="Send & Receive Cross-border Payments Globally."] - The descriptive text
    @prop {string} [linkText="Start Sending"] - The call-to-action text
    @prop {string} [linkUrl="https://cedar.app"] - The URL the CTA links to (opens in new tab)
    @prop {string} [iconName="right-arrow-alt"] - The Boxicon name for the arrow
    @prop {string} [iconColor="#1F75FE"] - Color of the Boxicon
  -->
<div class="banner">
	<h4 class="banner-heading">{heading}</h4>

	<div class="banner-dot"></div>

	<span class="banner-span">{text}</span>

	<a class="banner-link" href={linkUrl} target="_blank" rel="noopener noreferrer">
		{linkText} <box-icon name={iconName} color={iconColor}></box-icon>
	</a>
</div>
