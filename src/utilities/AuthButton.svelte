<script lang="ts">
	/**
	 * @typedef {Object} AuthButtonProps
	 * @property {'login' | 'register' | 'custom'} type - Button type
	 * @property {string} [customHref] - Custom URL (required when type='custom')
	 * @property {string} [customText] - Custom button text (required when type='custom')
	 * @property {'primary' | 'secondary'} [variant='primary'] - Button style variant
	 * @property {boolean} [fullWidth=false] - Whether button should take full width
	 */

	export let type: 'login' | 'register' | 'custom' = 'login';
	export let customHref: string | undefined;
	export let customText: string | undefined;
	export let variant: 'primary' | 'secondary' = 'primary';
	export let fullWidth: boolean = false;

	// Derived values
	$: buttonConfig = {
		login: { href: '/login', text: 'Login' },
		register: { href: '/register', text: 'Sign Up' },
		custom: { href: customHref, text: customText }
	};

	$: currentHref = buttonConfig[type].href;
	$: currentText = buttonConfig[type].text;

	// Validate props
	$: if (type === 'custom' && (!customHref || !customText)) {
		console.error('AuthButton: customHref and customText are required when type="custom"');
	}

	const navigate = () => {
		if (currentHref) {
			window.location.href = currentHref;
		}
	};
</script>

<button
	class="auth-button"
	class:primary={variant === 'primary'}
	class:secondary={variant === 'secondary'}
	class:full-width={fullWidth}
	on:click={navigate}
>
	<span class="auth-button-text">{currentText}</span>
</button>

<style>
	.auth-button {
		padding: 0.75rem 1.5rem;
		border-radius: 6px;
		font-weight: 600;
		font-size: 1rem;
		cursor: pointer;
		transition: all 0.2s ease;
		display: inline-flex;
		justify-content: center;
		align-items: center;
		border: 2px solid transparent;
	}

	.auth-button.primary {
		background-color: var(--blue-primary);
		color: white;
	}

	.auth-button.primary:hover {
		background-color: var(--blue-primary);
	}

	.auth-button.secondary {
		background-color: transparent;
		color: var(--blue-primary);
		border-color: var(--blue-primary);
	}

	.auth-button.secondary:hover {
		background-color: var(--primary-light, #eff6ff);
	}

	.auth-button.full-width {
		width: 100%;
	}

	.auth-button-text {
		display: inline-block;
		white-space: nowrap;
	}
</style>
