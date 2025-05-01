import { render, screen } from '@testing-library/svelte';
import userEvent from '@testing-library/user-event';
import Banner from './Banner.svelte';
import { describe, it, expect, vi } from 'vitest';

vi.mock('boxicons', () => ({
	default: {
		prototype: {
			connectedCallback: vi.fn()
		}
	}
}));

describe('Banner Component', () => {
	it("should render the heading 'Cedar App'", () => {
		render(Banner);
		expect(screen.getByText('Cedar App')).toBeInTheDocument();
	});

	it('should display the promotional text', () => {
		render(Banner);
		expect(screen.getByText(/Send & Receive Cross-border Payments Globally/i)).toBeInTheDocument();
	});

	it('should have a working link to cedar.app', () => {
		render(Banner);
		const link = screen.getByRole('link', { name: /Start Sending/i });
		expect(link).toHaveAttribute('href', 'https://cedar.app');
		expect(link).toHaveAttribute('target', '_blank');
	});

	it('should render the dot decoration', () => {
		render(Banner);
		const dot = document.querySelector('.banner-dot');
		expect(dot).toBeInTheDocument();
	});

	it('should include the right-arrow icon', () => {
		render(Banner);
		const icon = document.querySelector("box-icon[name='right-arrow-alt']");
		expect(icon).toBeInTheDocument();
	});
});
