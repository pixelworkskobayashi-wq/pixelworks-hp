import { test, expect } from '@playwright/test';

test('お問い合わせフォームが表示される', async ({ page }) => {
  await page.goto('/contact');
  await expect(page.locator('form')).toBeVisible();
});

test('必須項目が空のとき送信できない', async ({ page }) => {
  await page.goto('/contact');
  await page.click('button[type="submit"]');
  await expect(page).toHaveURL('/contact');
});

test('名前・メール・内容を入力するとsubmitボタンが有効になる', async ({ page }) => {
  await page.goto('/contact');
  await page.fill('input[name="name"]', 'テスト 太郎');
  await page.fill('input[name="email"]', 'test@example.com');
  await page.fill('textarea[name="message"]', 'テストメッセージです。');
  const submit = page.locator('button[type="submit"]');
  await expect(submit).toBeEnabled();
});
