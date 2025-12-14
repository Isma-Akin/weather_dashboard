import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('http://localhost:3000/');
  await page.getByRole('link', { name: 'London' }).click();
  await expect(page.locator('#weather')).toContainText('City of London Greater London');

  await page.getByPlaceholder('Enter city name').click();
  await page.getByPlaceholder('Enter city name').fill('Brussels');
  await page.getByRole('button', { name: 'Get the weather' }).click();
});