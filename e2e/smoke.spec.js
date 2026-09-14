import { expect, test } from '@playwright/test';

test.describe('smoke', () => {
  test('home has skip link and main landmark', async ({ page }) => {
    await page.goto('/');
    const skip = page.getByRole('link', { name: 'Skip to content' });
    await expect(skip).toBeAttached();
    await skip.focus();
    await page.keyboard.press('Enter');
    await expect(page.locator('#main-content')).toBeVisible();
    await expect(page.getByRole('heading', { level: 1 })).toContainText('REGUL8D');
  });

  test('robots and sitemap are reachable', async ({ request }) => {
    const robots = await request.get('/robots.txt');
    expect(robots.ok()).toBeTruthy();
    const robotsText = await robots.text();
    expect(robotsText).toContain('User-Agent: *');
    expect(robotsText).toContain('Sitemap:');

    const sitemap = await request.get('/sitemap.xml');
    expect(sitemap.ok()).toBeTruthy();
    const sitemapText = await sitemap.text();
    expect(sitemapText).toContain('<urlset');
    expect(sitemapText).toContain('/glossary');
  });
});

test.describe('mobile nav', () => {
  test.use({ viewport: { width: 390, height: 844 } });

  test('menu is inert when closed and Escape restores focus', async ({ page }) => {
    await page.goto('/');
    const hamburger = page.getByRole('button', { name: /navigation menu/i });
    await expect(hamburger).toBeVisible();

    const menu = page.locator('nav ul');
    await expect(menu).toHaveAttribute('aria-hidden', 'true');

    await hamburger.click();
    await expect(hamburger).toHaveAttribute('aria-expanded', 'true');
    await expect(menu).not.toHaveAttribute('aria-hidden', 'true');

    await page.keyboard.press('Escape');
    await expect(hamburger).toHaveAttribute('aria-expanded', 'false');
    await expect(hamburger).toBeFocused();
  });
});
