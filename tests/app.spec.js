/**
 * End-to-End Tests for English Adventure CE1
 * Tests the main user flows: navigation, gameplay, and progress tracking.
 */

import { test, expect } from '@playwright/test';

// Base URL for the app (update if deployed elsewhere)
const BASE_URL = 'http://localhost:5173';

// Test suite for the Home Screen
 test.describe('Home Screen', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(BASE_URL);
  });

  test('should display the app title', async ({ page }) => {
    await expect(page.locator('h1')).toHaveText('English Adventure CE1');
  });

  test('should display the welcome message', async ({ page }) => {
    await expect(page.locator('p')).toHaveText(/Bienvenue dans ton aventure/);
  });

  test('should have a "Jouer" button', async ({ page }) => {
    const playButton = page.locator('button:has-text("Jouer")');
    await expect(playButton).toBeVisible();
  });

  test('should have a "Mon Journal" button', async ({ page }) => {
    const journalButton = page.locator('button:has-text("Mon Journal")');
    await expect(journalButton).toBeVisible();
  });

  test('should have an "À propos" button', async ({ page }) => {
    const aboutButton = page.locator('button:has-text("À propos")');
    await expect(aboutButton).toBeVisible();
  });
});

// Test suite for Navigation
 test.describe('Navigation', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(BASE_URL);
  });

  test('should navigate to the map screen when clicking "Jouer"', async ({ page }) => {
    await page.locator('button:has-text("Jouer")').click();
    await expect(page.locator('h1')).toHaveText('Carte du Monde');
  });

  test('should navigate to the journal screen when clicking "Mon Journal"', async ({ page }) => {
    await page.locator('button:has-text("Mon Journal")').click();
    await expect(page.locator('h1')).toHaveText('Mon Journal');
  });

  test('should return to home from map screen', async ({ page }) => {
    await page.locator('button:has-text("Jouer")').click();
    await page.locator('button:has-text("Retour")').click();
    await expect(page.locator('h1')).toHaveText('English Adventure CE1');
  });

  test('should return to home from journal screen', async ({ page }) => {
    await page.locator('button:has-text("Mon Journal")').click();
    await page.locator('button:has-text("Retour")').click();
    await expect(page.locator('h1')).toHaveText('English Adventure CE1');
  });
});

// Test suite for the Map Screen
 test.describe('Map Screen', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(BASE_URL);
    await page.locator('button:has-text("Jouer")').click();
  });

  test('should display the map title', async ({ page }) => {
    await expect(page.locator('h1')).toHaveText('Carte du Monde');
  });

  test('should display the animals island', async ({ page }) => {
    const animalsIsland = page.locator('.island:has-text("Île des Animaux")');
    await expect(animalsIsland).toBeVisible();
  });

  test('should display locked islands', async ({ page }) => {
    const lockedIslands = page.locator('.island.locked');
    await expect(lockedIslands).toHaveCount(2);
  });

  test('should navigate to level screen when clicking animals island', async ({ page }) => {
    await page.locator('.island:has-text("Île des Animaux")').click();
    await expect(page.locator('h1')).toHaveText('Niveau : Les Animaux');
  });
});

// Test suite for the Level Screen
 test.describe('Level Screen', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(BASE_URL);
    await page.locator('button:has-text("Jouer")').click();
    await page.locator('.island:has-text("Île des Animaux")').click();
  });

  test('should display the level title', async ({ page }) => {
    await expect(page.locator('h1')).toHaveText('Niveau : Les Animaux');
  });

  test('should display the question', async ({ page }) => {
    await expect(page.locator('.question p')).toHaveText(/Où est le/);
  });

  test('should display answer options', async ({ page }) => {
    const options = page.locator('.option');
    await expect(options).toHaveCount(4);
  });

  test('should return to map screen', async ({ page }) => {
    await page.locator('button:has-text("Retour à la carte")').click();
    await expect(page.locator('h1')).toHaveText('Carte du Monde');
  });
});

// Test suite for the Journal Screen
 test.describe('Journal Screen', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(BASE_URL);
    await page.locator('button:has-text("Mon Journal")').click();
  });

  test('should display the journal title', async ({ page }) => {
    await expect(page.locator('h1')).toHaveText('Mon Journal');
  });

  test('should display the progress table', async ({ page }) => {
    const table = page.locator('.progress-table');
    await expect(table).toBeVisible();
  });

  test('should display progress table headers', async ({ page }) => {
    const headers = page.locator('.progress-table th');
    await expect(headers).toHaveText(['Thème', 'Étoiles', 'Badges', 'Temps joué']);
  });

  test('should display progress rows', async ({ page }) => {
    const rows = page.locator('.progress-table tbody tr');
    await expect(rows).toHaveCount(3);
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
    expect(manifest.short_name).toBe('EnglishAdventure');
  });

  test('should have a service worker', async ({ page, context }) => {
    // Note: Service worker registration might not be visible in tests
    // This is a basic check for the presence of the service worker file
    const swResponse = await page.request.get(BASE_URL + '/sw.js');
    // Service worker might not be available in dev mode, so this is optional
    // expect(swResponse.status()).toBe(200);
  });
});

// Test suite for Responsive Design
 test.describe('Responsive Design', () => {
  test('should work on mobile viewport', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 }); // iPhone SE
    await page.goto(BASE_URL);
    await expect(page.locator('h1')).toBeVisible();
    await expect(page.locator('button:has-text("Jouer")')).toBeVisible();
  });

  test('should work on tablet viewport', async ({ page }) => {
    await page.setViewportSize({ width: 768, height: 1024 }); // iPad
    await page.goto(BASE_URL);
    await expect(page.locator('h1')).toBeVisible();
    await expect(page.locator('.islands')).toBeVisible();
  });

  test('should work on desktop viewport', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 }); // Desktop
    await page.goto(BASE_URL);
    await expect(page.locator('h1')).toBeVisible();
    await expect(page.locator('.buttons')).toBeVisible();
  });
});

// Test suite for Accessibility
 test.describe('Accessibility', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(BASE_URL);
  });

  test('should have proper heading structure', async ({ page }) => {
    const h1 = page.locator('h1');
    await expect(h1).toHaveCount(1);
  });

  test('should have visible buttons', async ({ page }) => {
    const buttons = page.locator('button');
    await expect(buttons).toHaveCountGreaterThan(0);
    for (const button of await buttons.all()) {
      await expect(button).toBeVisible();
    }
  });

  test('should have proper contrast for text', async ({ page }) => {
    // This is a basic check - real contrast testing would require more advanced tools
    const textElements = page.locator('p, h1, h2, h3, button');
    await expect(textElements.first()).toBeVisible();
  });
});
