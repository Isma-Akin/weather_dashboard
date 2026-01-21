import { test, expect } from '@playwright/test';

test('has text', async ({ page }) => {
  await page.goto('http://localhost:3000/');
  await page.getByRole('link', { name: 'London' }).click();
  await expect(page.locator('#loader')).toBeVisible();
  await expect(page.locator('#weather')).toContainText('City of London Greater London');
});

test('has image div', async ({ page }) => {
  await page.goto('http://localhost:3000/');
  await page.locator('#city').click();
  await page.locator('#city').fill('Brussels');
  await page.getByRole('button', { name: 'Get the weather' }).click();
  await expect(page.locator('div').filter({ hasText: 'Brussels' }).nth(1)).toBeVisible();
});