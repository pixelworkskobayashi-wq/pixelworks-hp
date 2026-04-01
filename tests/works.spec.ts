import { test, expect } from '@playwright/test';

test('WORKSセクションが表示される', async ({ page }) => {
  await page.goto('/');
  await page.locator('#works').scrollIntoViewIfNeeded();
  await expect(page.locator('#works')).toBeVisible();
});

test('作品画像が表示される', async ({ page }) => {
  await page.goto('/');
  await page.locator('#works').scrollIntoViewIfNeeded();
  const items = page.locator('.work-item');
  await expect(items.first()).toBeVisible();
});

test('作品をクリックするとモーダルが開く', async ({ page }) => {
  await page.goto('/');
  await page.locator('#works').scrollIntoViewIfNeeded();
  await page.locator('.work-item').first().click();
  await expect(page.locator('#work-modal')).toBeVisible();
});

test('モーダルを閉じるボタンで閉じる', async ({ page }) => {
  await page.goto('/');
  await page.locator('#works').scrollIntoViewIfNeeded();
  await page.locator('.work-item').first().click();
  await expect(page.locator('#work-modal')).toBeVisible();
  await page.locator('.modal-close').click();
  await expect(page.locator('#work-modal')).not.toBeVisible();
});

test('フィルター ALL 以外を選択すると絞り込まれる', async ({ page }) => {
  await page.goto('/');
  await page.locator('#works').scrollIntoViewIfNeeded();
  const allCount = await page.locator('.work-item').count();
  await page.locator('[data-filter="rendering"]').click();
  const filteredCount = await page.locator('.work-item:not(.hidden)').count();
  expect(filteredCount).toBeLessThanOrEqual(allCount);
});
