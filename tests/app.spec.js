/**
 * End-to-End Tests for English Adventure CE1
 * Minimal tests for CI
 */

import { test, expect } from '@playwright/test';

const BASE_URL = 'http://localhost:5173';

test.describe('Basic Navigation', () => {
  test('Home page loads', async ({ page }) => {
    await page.goto(BASE_URL);
    await expect(page.getByRole('heading', { name: 'English Adventure CE1' })).toBeVisible();
  });

  test('Can navigate to map', async ({ page }) => {
    await page.goto(BASE_URL);
    await page.getByRole('button', { name: 'Jouer' }).click();
    await expect(page.getByRole('heading', { name: 'Carte du Monde' })).toBeVisible();
  });

  test('Can navigate to journal', async ({ page }) => {
    await page.goto(BASE_URL);
    await page.getByRole('button', { name: 'Mon Journal' }).click();
    await expect(page.getByRole('heading', { name: 'Mon Journal' })).toBeVisible();
  });

  test('Can navigate to about', async ({ page }) => {
    await page.goto(BASE_URL);
    await page.getByRole('button', { name: 'À propos' }).click();
    await expect(page.getByRole('heading', { name: 'À propos de English Adventure CE1' })).toBeVisible();
  });
});

test.describe('Game Level', () => {
  test('Can start a game level', async ({ page }) => {
    await page.goto(BASE_URL);
    await page.getByRole('button', { name: 'Jouer' }).click();
    await page.getByText('Île des Animaux').click();
    await expect(page.getByRole('heading', { name: /Niveau :/ })).toBeVisible();
  });

  test('Level displays question and options', async ({ page }) => {
    await page.goto(BASE_URL);
    await page.getByRole('button', { name: 'Jouer' }).click();
    await page.getByText('Île des Animaux').click();
    
    await expect(page.locator('.question p')).toBeVisible();
    const options = page.locator('.option');
    await expect(options).toHaveCount(4);
  });

  test('Can click on answer option', async ({ page }) => {
    await page.goto(BASE_URL);
    await page.getByRole('button', { name: 'Jouer' }).click();
    await page.getByText('Île des Animaux').click();
    
    const firstOption = page.locator('.option').first();
    await firstOption.click();
    
    // After clicking, feedback should appear
    await expect(page.locator('.feedback')).toBeVisible();
  });
});

test.describe('PWA Features', () => {
  test('Has manifest file', async ({ page }) => {
    await page.goto(BASE_URL);
    const manifestResponse = await page.request.get(BASE_URL + '/manifest.json');
    expect(manifestResponse.status()).toBe(200);
  });
});
