import { expect, test, type Page } from '@playwright/test';

const publicRoutes = [
  '/',
  '/cases',
  '/services',
  '/about',
  '/team',
  '/careers',
  '/lab',
  '/contact',
  '/privacy',
  '/cases/arden',
  '/cases/greenflow',
  '/cases/orbit'
];

const waitForRuntime = async (page: Page): Promise<void> => {
  await page.waitForFunction(() => typeof (window as unknown as { __acorRuntimeCleanup?: unknown }).__acorRuntimeCleanup === 'function');
};

for (const route of publicRoutes) {
  test(`${route} renders its route shell`, async ({ page }) => {
    await page.goto(route);
    await expect(page.locator('main#main')).toBeVisible();
    await expect(page.locator('#route-root')).toHaveAttribute('data-route');
    await expect(page).toHaveTitle(/Acor Web/);
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', `https://acor-web.vercel.app${route}`);
  });
}

test.describe('navigation and appearance', () => {
  test('mobile menu opens and navigates without a reload', async ({ page }, testInfo) => {
    if (testInfo.project.name === 'chromium') test.skip();

    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto('/');
    await waitForRuntime(page);

    await page.locator('.menu-toggle').click();
    await expect(page.locator('#mobile-nav')).toBeVisible();
    await page.locator('#mobile-nav a[href="/cases"]').click();
    await page.waitForURL('**/cases');
    await expect(page.locator('#route-root')).toHaveAttribute('data-route', 'cases');
  });

  test('runtime remount keeps one control instance after SPA navigation', async ({ page }) => {
    await page.goto('/');
    await waitForRuntime(page);

    await page.locator('.header-contact').click();
    await expect(page.locator('#route-root')).toHaveAttribute('data-route', 'contact');
    await expect(page.locator('.connection-status')).toHaveCount(1);
    await expect(page.locator('.command-palette')).toHaveCount(1);

    await page.locator('.site-header .brand').click();
    await expect(page.locator('#route-root')).toHaveAttribute('data-route', 'home');
    await expect(page.locator('.connection-status')).toHaveCount(1);
    await expect(page.locator('.command-palette')).toHaveCount(1);
  });

  test('language and theme controls update the document', async ({ page }, testInfo) => {
    if (testInfo.project.name !== 'chromium') test.skip();

    await page.goto('/');
    await waitForRuntime(page);

    await page.locator('.language-select').selectOption('en');
    await expect(page.locator('html')).toHaveAttribute('lang', 'en');
    await expect(page.locator('.desktop-nav a').first()).toHaveText('Projects');

    await page.locator('.theme-toggle').click();
    await expect(page.locator('body')).toHaveClass(/theme-night/);
  });

  test('command palette searches and opens', async ({ page }, testInfo) => {
    if (testInfo.project.name !== 'chromium') test.skip();

    await page.goto('/');
    await waitForRuntime(page);

    await page.locator('.command-trigger').click();
    const palette = page.locator('.command-palette');
    await expect(palette).toBeVisible();
    await palette.locator('input[type="search"]').fill('команда');
    await expect(palette.locator('.command-results a')).toHaveCount(1);
    await expect(palette.locator('.command-results a').first()).toContainText('Команда');
  });
});

test.describe('interactive pages', () => {
  test('cases filter and quick view stay functional', async ({ page }, testInfo) => {
    if (testInfo.project.name !== 'chromium') test.skip();

    await page.goto('/cases');
    await waitForRuntime(page);

    await page.locator('[data-filter="commerce"]').click();
    await expect(page.locator('.project[data-category="commerce"]')).toBeVisible();
    await expect(page.locator('.project[data-category="product"]')).toBeHidden();
    await expect(page.locator('#filter-status')).toContainText('1');

    const quickView = page.locator('.project[data-category="commerce"] [data-gallery-open]');
    await expect(quickView).toBeVisible();
    await quickView.click();
    await expect(page.locator('#project-gallery')).toBeVisible();
    await expect(page.locator('#gallery-title')).toHaveText('GreenFlow');
    await page.locator('.gallery-close').click();
    await expect(page.locator('#project-gallery')).toBeHidden();
  });

  test('brief builder advances and preserves selected context in the URL', async ({ page }) => {
    await page.goto('/contact');
    await waitForRuntime(page);

    await page.locator('[data-brief-option="type"][data-brief-value="app"]').click();
    await expect(page.locator('#brief-summary-title')).toContainText('Приложение');
    await page.locator('#brief-next').click();
    await expect(page.locator('[data-brief-step="1"]')).toBeVisible();
    await expect(page).toHaveURL(/type=app/);
  });

  test('team search and profile dialog work', async ({ page }) => {
    await page.goto('/team');
    await waitForRuntime(page);

    await page.locator('#team-search').fill('Илья');
    await expect(page.locator('#team-result')).toContainText('1');
    const person = page.locator('[data-person][data-name="Илья Горин"]');
    await expect(person).toBeVisible();
    await person.click();
    await expect(page.locator('#person-dialog')).toBeVisible();
    await expect(page.locator('#person-dialog-name')).toHaveText('Илья Горин');
    await page.locator('#person-dialog .dialog-close').click();
  });
});
