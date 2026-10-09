import { expect, test } from '@playwright/test';

const QUESTIONS = 10;

async function startQuiz(page) {
  await page.goto('/quiz');
  await page.getByRole('button', { name: 'Take the Quiz' }).click();
  await expect(page.getByRole('progressbar')).toBeVisible();
}

async function answerCurrentQuestion(page, label = 'Neutral') {
  const progress = page.getByRole('progressbar');
  const current = Number(await progress.getAttribute('aria-valuenow'));
  await page.getByRole('radio', { name: label }).click();
  if (current < QUESTIONS) {
    await expect(progress).toHaveAttribute('aria-valuenow', String(current + 1));
  }
}

test.describe('quiz', () => {
  test.beforeEach(async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' });
  });

  test.use({ viewport: { width: 375, height: 812 } });

  test('keyboard flow reaches a result and retake resets', async ({ page }) => {
    await page.goto('/quiz');
    await page.getByRole('button', { name: 'Take the Quiz' }).focus();
    await page.keyboard.press('Enter');
    await expect(page.getByRole('progressbar')).toBeVisible();

    const progress = page.getByRole('progressbar');
    for (let i = 0; i < QUESTIONS; i += 1) {
      await page.keyboard.press('Tab');
      await page.keyboard.press('ArrowRight');
      await page.keyboard.press('ArrowRight');
      await page.keyboard.press('Enter');
      if (i < QUESTIONS - 1) {
        await expect(progress).toHaveAttribute('aria-valuenow', String(i + 2));
      }
    }

    const heading = page.getByRole('heading', { name: /^You're / });
    await expect(heading).toBeVisible({ timeout: 5000 });

    await page.getByRole('button', { name: 'Retake Quiz' }).click();
    await expect(page.getByRole('heading', { level: 1, name: 'What Watch Are You?' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Take the Quiz' })).toBeVisible();
  });

  test('clicking through the scale shows a result', async ({ page }) => {
    await startQuiz(page);
    for (let i = 0; i < QUESTIONS; i += 1) {
      await answerCurrentQuestion(page);
    }
    await expect(page.getByRole('heading', { name: /^You're / })).toBeVisible({ timeout: 5000 });
    await expect(page.locator('.quiz-result-photo img')).toBeVisible();
    await expect(page.locator('.quiz-result-photo img')).toHaveAttribute('alt', /.+/);
    await expect(page.getByRole('link', { name: 'Explore the Collection' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Learn the Lingo' })).toBeVisible();
  });
});

test.describe('quiz share card', () => {
  test.beforeEach(async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' });
  });

  test('share downloads a png on chromium', async ({ page }, testInfo) => {
    test.skip(testInfo.project.name !== 'chromium', 'download fallback is asserted on desktop Chromium');

    await startQuiz(page);
    for (let i = 0; i < QUESTIONS; i += 1) {
      await answerCurrentQuestion(page);
    }
    await expect(page.getByRole('heading', { name: /^You're / })).toBeVisible({ timeout: 5000 });

    const downloadPromise = page.waitForEvent('download');
    await page.getByRole('button', { name: 'Share to Story' }).click();
    const download = await downloadPromise;
    expect(download.suggestedFilename()).toMatch(/^my-watch-result-.+-story\.png$/);
  });
});

test.describe('quiz without javascript', () => {
  test.use({ javaScriptEnabled: false });

  test('shows a javascript required message', async ({ page }) => {
    await page.goto('/quiz');
    await expect(page.getByText('This quiz requires JavaScript. Enable it to find your watch.')).toBeVisible();
    await expect(page.getByRole('button', { name: 'Take the Quiz' })).toHaveCount(0);
  });
});
