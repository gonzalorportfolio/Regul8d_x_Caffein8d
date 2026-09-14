import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { axe } from 'vitest-axe';
import ExternalLink from '@/components/ExternalLink';

vi.mock('next/navigation', () => ({
  usePathname: () => '/',
}));

describe('ExternalLink', () => {
  it('announces that the link opens in a new tab', () => {
    render(
      <ExternalLink href="https://example.com" className="cta-btn">
        Read more
      </ExternalLink>
    );

    const link = screen.getByRole('link', { name: /read more/i });
    expect(link).toHaveAttribute('target', '_blank');
    expect(link).toHaveAttribute('rel', 'noopener noreferrer');
    expect(link.textContent).toMatch(/opens in a new tab/i);
  });

  it('has no serious axe violations', async () => {
    const { container } = render(
      <ExternalLink href="https://example.com">Instagram</ExternalLink>
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
