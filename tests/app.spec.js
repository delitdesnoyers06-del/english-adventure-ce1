/**
 * End-to-End Tests for English Adventure CE1
 * Simplified tests for CI
 */

import { test, expect } from '@playwright/test';

const BASE_URL = 'http://localhost:5173';

// Helper function to wait for navigation
async function waitForNavigation(page, expectedText) {
  await expect(page.getByRole('heading', { name: expectedText })).toBeVisible();
}

// Test suite for the Home Screen
test.describe('Home Screen', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(BASE_URL);
  });

  test('should display the app title', async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'English Adventure CE1' })).toBeVisible();
  });

  test('should have a Jouer button', async ({ page }) => {
    await expect(page.getByRole('button', { name: 'Jouer' })).toBeVisible();
  });

  test('should have a Mon Journal button', async ({ page }) => {
    await expect(page.getByRole('button', { name: 'Mon Journal' })).toBeVisible();
  });

  test('should have an À propos button', async ({ page }) => {
    await expect(page.getByRole('button', { name: 'À propos' })).toBeVisible();
  });
});

// Test suite for Navigation
test.describe('Navigation', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(BASE_URL);
  });

  test('should navigate to map when clicking Jouer', async ({ page }) => {
    await page.getByRole('button', { name: 'Jouer' }).click();
    await waitForNavigation(page, 'Carte du Monde');
  });

  test('should navigate to journal when clicking Mon Journal', async ({ page }) => {
    await page.getByRole('button', { name: 'Mon Journal' }).click();
    await waitForNavigation(page, 'Mon Journal');
  });

  test('should navigate to about when clicking À propos', async ({ page }) => {
    await page.getByRole('button', { name: 'À propos' }).click();
    await waitForNavigation(page, 'À propos de English Adventure CE1');
  });
});

// Test suite for Map Screen
test.describe('Map Screen', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(BASE_URL);
    await page.getByRole('button', { name: 'Jouer' }).click();
  });

  test('should display map title', async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'Carte du Monde' })).toBeVisible();
  });

  test('should display animals island', async ({ page }) => {
    await expect(page.getByText('Île des Animaux')).toBeVisible();
  });

  test('should navigate to level when clicking animals island', async ({ page }) => {
    await page.getByText('Île des Animaux').click();
    await expect(page.getByRole('heading', { name: /Niveau :/ })).toBeVisible();
  });
});

// Test suite for Level Screen
test.describe('Level Screen', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(BASE_URL);
    await page.getByRole('button', { name: 'Jouer' }).click();
    await page.getByText('Île des Animaux').click();
  });

  test('should display level title', async ({ page }) => {
    await expect(page.getByRole('heading', { name: /Niveau :/ })).toBeVisible();
  });

  test('should display question', async ({ page }) => {
    await expect(page.locator('.question p')).toBeVisible();
  });

  test('should display answer options', async ({ page }) => {
    const options = page.locator('.option');
    await expect(options).toHaveCount(4);
  });

  test('should be able to click on answer', async ({ page }) => {
    const firstOption = page.locator('.option').first();
    await firstOption.click();
    
    // After clicking, feedback should appear
    await expect(page.locator('.feedback')).toBeVisible();
  });
});

// Test suite for About Screen
test.describe('About Screen', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(BASE_URL);
    await page.getByRole('button', { name: 'À propos' }).click();
  });

  test('should display about title', async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'À propos de English Adventure CE1' })).toBeVisible();
  });

  test('should have return button', async ({ page }) => {
    await expect(page.getByRole('button', { name: 'Retour' })).toBeVisible();
  });
});

// Test suite for Journal Screen
test.describe('Journal Screen', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(BASE_URL);
    await page.getByRole('button', { name: 'Mon Journal' }).click();
  });

  test('should display journal title', async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'Mon Journal' })).toBeVisible();
  });

  test('should have return button', async ({ page }) => {
    await expect(page.getByRole('button', { name: 'Retour' })).toBeVisible();
  });
});

// Test suite for PWA Features
test.describe('PWA Features', () => {
  test('should have a manifest file', async ({ page }) => {
    await page.goto(BASE_URL);
    const manifestResponse = await page.request.get(BASE_URL + '/manifest.json');
    expect(manifestResponse.status()).toBe(200);
    const manifest = await manifestResponse.json();
    expect(manifest.name).toBe('English Adventure CE1');
  });
});

// Test suite for Responsive Design
test.describe('Responsive Design', () => {
  test('should work on mobile viewport', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto(BASE_URL);
    await expect(page.getByRole('heading', { name: 'English Adventure CE1' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Jouer' })).toBeVisible();
  });

  test('should work on desktop viewport', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto(BASE_URL);
    await expect(page.getByRole('heading', { name: 'English Adventure CE1' })).toBeVisible();
  });
});
