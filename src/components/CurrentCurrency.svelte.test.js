// CurrentCurrencyRate.spec.js
import { render, screen, fireEvent } from '@testing-library/svelte';
import CurrentCurrencyRate from './CurrentCurrencyRate.svelte';
import { expect, it, vi } from 'vitest';

// Mock global fetch
global.fetch = vi.fn();

// Mock DotDivider component (since we don't need to test it)
vi.mock('../utilities/DotDivider.svelte', () => ({
	default: () => 'Mocked DotDivider'
}));

it('should update when fromCurrency or toCurrency props change', async () => {
	const initialMock = {
		amount: 1,
		base: 'USD',
		date: '2023-07-20',
		rates: { NGN: 1611.28 }
	};

	const updatedMock = {
		amount: 1,
		base: 'EUR',
		date: '2023-07-20',
		rates: { GBP: 0.85 }
	};

	// @ts-ignore
	fetch.mockResolvedValueOnce({
		ok: true,
		json: () => Promise.resolve(initialMock)
	});

	const { component } = render(CurrentCurrencyRate, {
		props: { fromCurrency: 'USD', toCurrency: 'NGN' }
	});

	// Wait for initial render
	await new Promise((resolve) => setTimeout(resolve, 100));
	expect(screen.getByText('USD/NGN:')).toBeInTheDocument();

	// Mock new response and change props
	// @ts-ignore
	fetch.mockResolvedValueOnce({
		ok: true,
		json: () => Promise.resolve(updatedMock)
	});

	await component.updateProps({ fromCurrency: 'EUR', toCurrency: 'GBP' });

	// Wait for update
	await new Promise((resolve) => setTimeout(resolve, 100));
	expect(screen.getByText('EUR/GBP:')).toBeInTheDocument();
	expect(screen.getByText('0.85')).toBeInTheDocument();
});

it('should format rates with exactly 2 decimal places', async () => {
	const mockData = {
		amount: 1,
		base: 'USD',
		date: '2023-07-20',
		rates: { NGN: 1611.28345 } // Test with more than 2 decimal places
	};

	// @ts-ignore
	fetch.mockResolvedValueOnce({
		ok: true,
		json: () => Promise.resolve(mockData)
	});

	render(CurrentCurrencyRate);

	// Wait for component to update
	await new Promise((resolve) => setTimeout(resolve, 100));

	const rateSpan = screen.getByText(/1,611\.28/);
	expect(rateSpan).toBeInTheDocument();
});

it('should display -- when rate is null', async () => {
	const mockData = {
		amount: 1,
		base: 'USD',
		date: '2023-07-20',
		rates: { NGN: null }
	};

	// @ts-ignore
	fetch.mockResolvedValueOnce({
		ok: true,
		json: () => Promise.resolve(mockData)
	});

	render(CurrentCurrencyRate);

	// Wait for component to update
	await new Promise((resolve) => setTimeout(resolve, 100));

	expect(screen.getByText('USD/NGN:')).toBeInTheDocument();
	expect(screen.getByText('--')).toBeInTheDocument();
});

it('should not show percentage change when previousRate is null', async () => {
	const mockData = {
		amount: 1,
		base: 'USD',
		date: '2023-07-20',
		rates: { NGN: 1611.28 }
	};

	// @ts-ignore
	fetch.mockResolvedValueOnce({
		ok: true,
		json: () => Promise.resolve(mockData)
	});

	render(CurrentCurrencyRate, {
		props: { showChange: true }
	});

	// Wait for component to update
	await new Promise((resolve) => setTimeout(resolve, 100));

	expect(screen.queryByText(/%/)).not.toBeInTheDocument();
});

it('should clean up interval when component is destroyed', async () => {
	const mockData = {
		amount: 1,
		base: 'USD',
		date: '2023-07-20',
		rates: { NGN: 1611.28 }
	};

	// @ts-ignore
	fetch.mockResolvedValue({
		ok: true,
		json: () => Promise.resolve(mockData)
	});

	const { unmount } = render(CurrentCurrencyRate);

	// Wait for initial fetch
	await new Promise((resolve) => setTimeout(resolve, 100));

	// Spy on clearInterval
	const clearIntervalSpy = vi.spyOn(global, 'clearInterval');

	unmount();

	expect(clearIntervalSpy).toHaveBeenCalled();
	clearIntervalSpy.mockRestore();
});

it('should display different currency pairs correctly', async () => {
	const mockData = {
		amount: 1,
		base: 'EUR',
		date: '2023-07-20',
		rates: { GBP: 0.85 }
	};

	// @ts-ignore
	fetch.mockResolvedValueOnce({
		ok: true,
		json: () => Promise.resolve(mockData)
	});

	render(CurrentCurrencyRate, {
		props: { fromCurrency: 'EUR', toCurrency: 'GBP' }
	});

	// Wait for component to update
	await new Promise((resolve) => setTimeout(resolve, 100));

	expect(screen.getByText('EUR/GBP:')).toBeInTheDocument();
	expect(screen.getByText('0.85')).toBeInTheDocument();
});
