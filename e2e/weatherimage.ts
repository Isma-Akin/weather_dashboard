import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  // Navigate to the application
  await page.goto('http://localhost:3000/');
  await expect(page.getByRole('link', { name: 'Cloud' })).toBeHidden();
  await page.getByPlaceholder('Enter city name').click();
  await page.getByPlaceholder('Enter city name').fill('Brussels');
  await page.getByRole('button', { name: 'Get the weather' }).click();
  await expect(page.getByRole('img', { name: 'Weather image' })).toBeVisible();
});