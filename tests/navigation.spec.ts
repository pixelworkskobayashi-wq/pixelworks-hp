import { test, expect } from '@playwright/test';

test('固定ヘッダーが表示される', async ({ page }) => {
  await page.goto('/');
  const header = page.locator('header');
  await expect(header).toBeVisible();
});

test('ロゴ PIXEL WORKS が表示される', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('header')).toContainText('PIXEL WORKS');
});

test('ABOUT クリックで /about に遷移する', async ({ page }) => {
  await page.goto('/');
  await page.click('a[href="/about"]');
  await expect(page).toHaveURL('/about');
});

test('CONTACT クリックで /contact に遷移する', async ({ page }) => {
  await page.goto('/');
  await page.click('a[href="/contact"]');
  await expect(page).toHaveURL('/contact');
});

test('スクロールするとヘッダーが見える位置に固定されている', async ({ page }) => {
  await page.goto('/');
  await page.evaluate(() => window.scrollTo(0, 500));
  const header = page.locator('header');
  await expect(header).toBeVisible();
  const box = await header.boundingBox();
  expect(box).not.toBeNull();
  expect(box!.y).toBeCloseTo(0, 0);
});
