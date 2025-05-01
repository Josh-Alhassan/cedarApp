<script>
	import AuthButton from '../utilities/AuthButton.svelte';
	import CurrentCurrencyRate from './CurrentCurrencyRate.svelte';
</script>

<section class="currency-rate-section">
	<CurrentCurrencyRate
		fromCurrency="EUR"
		toCurrency="GBP"
		showChange={true}
		refreshInterval={60000}
	/>
	<CurrentCurrencyRate
		fromCurrency="USD"
		toCurrency="EUR"
		showChange={true}
		refreshInterval={60000}
	/>
	<CurrentCurrencyRate
		fromCurrency="EUR"
		toCurrency="AUD"
		showChange={true}
		refreshInterval={60000}
	/>
	<CurrentCurrencyRate
		fromCurrency="EUR"
		toCurrency="CAD"
		showChange={true}
		refreshInterval={60000}
	/>

	<CurrentCurrencyRate
		fromCurrency="EUR"
		toCurrency="BRL"
		showChange={true}
		refreshInterval={60000}
	/>

	<CurrentCurrencyRate
		fromCurrency="EUR"
		toCurrency="BGN"
		showChange={true}
		refreshInterval={60000}
	/>

	<div class="cta-authentication">
		<div class="auth-buttons-container">
			<AuthButton type="login" variant="secondary" customHref="/login" customText="Login" />
			<AuthButton type="register" customHref="/register" customText="Register" />
		</div>
	</div>
</section>

<style>
	.currency-rate-section {
		/* background: orange; */
		border-bottom: 1px solid #b3b0b0;
		padding: 23px 53px;

		display: flex;
		justify-content: center;
		align-items: center;
		gap: 25px;
	}

	.auth-buttons-container {
		display: flex;
		gap: 1rem;
		/* margin-top: 1.5rem; */
	}
</style>
