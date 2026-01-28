import { test, expect } from '@playwright/test';

const BASE_URL = 'http://localhost:3000/';

test('has header 1', async ({ page }) => {
  await page.goto(BASE_URL);
  expect(page.getByRole('heading', { name: 'City Weather Forecast' })).toBeVisible();
});

test('has header 2', async ({ page }) => {
  await page.goto(BASE_URL);
  expect(page.getByRole('heading', { name: 'Select a city below' })).toBeVisible();;
});

test('has header 3', async ({ page }) => {
  await page.goto(BASE_URL);
  expect(page.getByRole('heading', { name: 'Or enter a city name:' })).toBeVisible();
});

test('has text', async ({ page }) => {
  await page.goto(BASE_URL);
  await page.getByRole('link', { name: 'London' }).click();
  await expect(page.locator('#loader')).toBeVisible();
  await expect(page.locator('#weather')).toContainText('City of London Greater London');
});

test('has image div', async ({ page }) => {
  await page.goto(BASE_URL);
  await page.locator('#city').click();
  await page.locator('#city').fill('Brussels');
  await page.getByRole('button', { name: 'Get the weather' }).click();
  await expect(page.locator('#loader')).toBeVisible();
  await expect(page.locator('div').filter({ hasText: 'Brussels' }).nth(1)).toBeVisible();
});

test('has loader', async ({ page }) => {
  await page.goto(BASE_URL);
  await page.locator('#city').click();
  await page.locator('#city').fill('Brussels');
  await page.getByRole('button', { name: 'Get the weather' }).click();
  await expect(page.locator('#loader')).toBeVisible();
});

test('div exists', async ({ page }) => {
  await page.goto(BASE_URL);
  const count = await page.locator('#weatherClass').count();
  if (count > 0){
  await page.getByRole('link', { name: 'London' }).click();
  }
});