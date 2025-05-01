<script lang="ts">
	import DotDivider from '../utilities/DotDivider.svelte';
	import { onMount } from 'svelte';

	// Types
	type CurrencyCode = 'USD' | 'EUR' | 'GBP' | 'NGN' | string; // Extend with more currencies
	interface RateData {
		amount: number;
		base: CurrencyCode;
		date: string;
		rates: Record<CurrencyCode, number>;
	}

	// Props
	export let fromCurrency: CurrencyCode = 'USD';
	export let toCurrency: CurrencyCode = 'NGN';
	export let showChange: boolean = true;
	export let refreshInterval: number = 30000; // 30 seconds

	// State
	let rate: number | null = null;
	let previousRate: number | null = null;
	let changePercentage: number | null = null;
	let isLoading: boolean = true;
	let error: string | null = null;
	let lastUpdated: string | null = null;

	// Derived values
	$: isIncreasing = changePercentage ? changePercentage > 0 : false;
	$: arrowIcon = isIncreasing ? 'up-arrow' : 'down-arrow';
	$: changeColor = isIncreasing ? '#05A615' : '#FF0000';

	// Fetch data from Frankfurter.app
	const fetchRateData = async (): Promise<void> => {
		try {
			isLoading = true;
			error = null;
			previousRate = rate;

			const response = await fetch(
				`https://api.frankfurter.app/latest?from=${fromCurrency}&to=${toCurrency}`
			);

			if (!response.ok) {
				throw new Error(`HTTP error! status: ${response.status}`);
			}

			const data: RateData = await response.json();
			rate = data.rates[toCurrency];
			lastUpdated = new Date().toLocaleTimeString();

			// Calculate percentage change if we have previous rate
			if (previousRate && rate) {
				changePercentage = ((rate - previousRate) / previousRate) * 100;
			}
		} catch (err) {
			error = err instanceof Error ? err.message : 'Failed to fetch rates';
			console.error('CurrencyRate error:', err);
		} finally {
			isLoading = false;
		}
	};

	// Initial fetch and setup polling
	onMount(() => {
		fetchRateData();
		const interval = setInterval(fetchRateData, refreshInterval);
		return () => clearInterval(interval);
	});

	// Refetch when currencies change
	$: if (fromCurrency && toCurrency) fetchRateData();
</script>

<section class="currency-rate-container">
	{#if isLoading && rate === null}
		<div class="loading-state">Loading exchange rates...</div>
	{:else if error}
		<div class="error-state">
			⚠️ Rate unavailable
			<button on:click={fetchRateData}>Retry</button>
		</div>
	{:else}
		<div class="current-currencyRate">
			<h4 class="current-currencyRate-heading">
				{fromCurrency}/{toCurrency}:
				<span class="current-currencyRate-span">
					{rate?.toLocaleString(undefined, {
						minimumFractionDigits: 4,
						maximumFractionDigits: 4
					}) ?? '--'}
				</span>
			</h4>

			{#if showChange && changePercentage !== null}
				<span class="current-currencyRate-link {isIncreasing ? 'positive' : 'negative'}">
					<box-icon type="solid" size="xs" name={arrowIcon} color={changeColor}></box-icon>
					{Math.abs(changePercentage).toFixed(2)}%
				</span>
			{/if}

			<DotDivider />

			{#if lastUpdated}
				<div class="last-updated">Updated: {lastUpdated}</div>
			{/if}
		</div>
	{/if}
</section>

<style>
	.currency-rate-container {
		font-family: system-ui, sans-serif;
		min-width: 280px;
	}

	.current-currencyRate {
		font-size: 1.2rem;
		display: flex;
		align-items: center;
		gap: 5px;
		flex-wrap: wrap;
	}

	.current-currencyRate-heading {
		color: #555;
		font-weight: 500;
	}

	.current-currencyRate-span {
		color: #1a73e8;
		font-weight: 600;
	}

	.current-currencyRate-link {
		display: inline-flex;
		align-items: center;
		gap: 4px;
		font-size: 0.9em;
		font-weight: 500;
	}

	.positive {
		color: #05a615;
	}

	.negative {
		color: #ff0000;
	}

	.loading-state,
	.error-state {
		font-size: 0.9rem;
		color: #666;
		display: flex;
		align-items: center;
		gap: 8px;
	}

	.error-state button {
		background: none;
		border: 1px solid currentColor;
		border-radius: 4px;
		padding: 2px 6px;
		cursor: pointer;
		font-size: 0.8em;
	}

	.last-updated {
		font-size: 0.7rem;
		color: #999;
		width: 100%;
		margin-top: 4px;

		display: none;
	}
</style>
