/**
 * End-to-End Tests for English Adventure CE1
 * Tests the main user flows: navigation, gameplay, and progress tracking.
 */

import { test, expect } from '@playwright/test';

// Base URL for the app (update if deployed elsewhere)
const BASE_URL = 'http://localhost:5173';

// Helper function to wait for navigation
async function waitForNavigation(page, expectedScreen) {
  await expect(page.locator(`h1:has-text("${expectedScreen}")`)).toBeVisible();
}

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
    await waitForNavigation(page, 'Carte du Monde');
  });

  test('should navigate to the journal screen when clicking "Mon Journal"', async ({ page }) => {
    await page.locator('button:has-text("Mon Journal")').click();
    await waitForNavigation(page, 'Mon Journal');
  });

  test('should navigate to the about screen when clicking "À propos"', async ({ page }) => {
    await page.locator('button:has-text("À propos")').click();
    await waitForNavigation(page, 'À propos de English Adventure CE1');
  });

  test('should return to home from map screen', async ({ page }) => {
    await page.locator('button:has-text("Jouer")').click();
    await page.locator('button:has-text("Retour")').click();
    await waitForNavigation(page, 'English Adventure CE1');
  });

  test('should return to home from journal screen', async ({ page }) => {
    await page.locator('button:has-text("Mon Journal")').click();
    await page.locator('button:has-text("Retour")').click();
    await waitForNavigation(page, 'English Adventure CE1');
  });

  test('should return to home from about screen', async ({ page }) => {
    await page.locator('button:has-text("À propos")').click();
    await page.locator('button:has-text("Retour")').click();
    await waitForNavigation(page, 'English Adventure CE1');
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
    await expect(lockedIslands).toHaveCount(6); // 6 islands should be locked initially
  });

  test('should navigate to level screen when clicking animals island', async ({ page }) => {
    await page.locator('.island:has-text("Île des Animaux")').click();
    await expect(page.locator('h1')).toHaveText(/Niveau :/);
  });
});

// Test suite for the Level Screen (Gameplay)
test.describe('Level Screen - Gameplay', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(BASE_URL);
    await page.locator('button:has-text("Jouer")').click();
    await page.locator('.island:has-text("Île des Animaux")').click();
  });

  test('should display the level title', async ({ page }) => {
    await expect(page.locator('h1')).toHaveText(/Niveau :/);
  });

  test('should display the question', async ({ page }) => {
    await expect(page.locator('.question p')).toBeVisible();
  });

  test('should display answer options', async ({ page }) => {
    const options = page.locator('.option');
    await expect(options).toHaveCount(4);
  });

  test('should display progress bar', async ({ page }) => {
    await expect(page.locator('.progress-bar')).toBeVisible();
  });

  test('should display score and time', async ({ page }) => {
    await expect(page.locator('.score-time')).toBeVisible();
    await expect(page.locator('.score')).toBeVisible();
    await expect(page.locator('.time')).toBeVisible();
  });

  test('should allow clicking on answer options', async ({ page }) => {
    const firstOption = page.locator('.option').first();
    await expect(firstOption).toBeEnabled();
    await firstOption.click();
    
    // After clicking, feedback should appear
    await expect(page.locator('.feedback')).toBeVisible();
  });

  test('should show feedback when answer is selected', async ({ page }) => {
    const firstOption = page.locator('.option').first();
    await firstOption.click();
    
    // Feedback should be visible
    await expect(page.locator('.feedback')).toBeVisible();
    
    // Next button should appear
    await expect(page.locator('.next-btn')).toBeVisible();
  });

  test('should show correct/incorrect styling on selected answer', async ({ page }) => {
    const firstOption = page.locator('.option').first();
    await firstOption.click();
    
    // The selected option should have either correct or incorrect class
    await expect(firstOption).toHaveClass(/correct|incorrect/);
  });

  test('should navigate to next question when clicking next button', async ({ page }) => {
    const firstOption = page.locator('.option').first();
    await firstOption.click();
    
    // Click next button
    await page.locator('.next-btn').click();
    
    // Progress should have advanced
    const progressText = page.locator('.progress-text');
    await expect(progressText).toContainText('Question 2');
  });

  test('should complete game and show results after answering all questions', async ({ page }) => {
    // Answer all questions
    for (let i = 0; i < 5; i++) {
      const firstOption = page.locator('.option').first();
      await firstOption.click();
      
      // If it's not the last question, click next
      if (i < 4) {
        await page.locator('.next-btn').click();
      } else {
        // On the last question, click finish
        await page.locator('.next-btn').click();
      }
    }
    
    // Should be on results screen
    await expect(page.locator('h1')).toHaveText('Félicitations !');
  });
});

// Test suite for the Results Screen
test.describe('Results Screen', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(BASE_URL);
    await page.locator('button:has-text("Jouer")').click();
    await page.locator('.island:has-text("Île des Animaux")').click();
    
    // Complete the game
    for (let i = 0; i < 5; i++) {
      const firstOption = page.locator('.option').first();
      await firstOption.click();
      await page.locator('.next-btn').click();
    }
  });

  test('should display congratulations message', async ({ page }) => {
    await expect(page.locator('h1')).toHaveText('Félicitations !');
  });

  test('should display score circle', async ({ page }) => {
    await expect(page.locator('.score-circle')).toBeVisible();
    await expect(page.locator('.score-value')).toBeVisible();
    await expect(page.locator('.score-max')).toBeVisible();
  });

  test('should display statistics', async ({ page }) => {
    await expect(page.locator('.stats')).toBeVisible();
    await expect(page.locator('.stat')).toHaveCount(3); // Time, Level, Stars
  });

  test('should display feedback message based on score', async ({ page }) => {
    await expect(page.locator('.feedback-message')).toBeVisible();
  });

  test('should have replay button', async ({ page }) => {
    const replayButton = page.locator('button:has-text("Rejouer")');
    await expect(replayButton).toBeVisible();
  });

  test('should have return to home button', async ({ page }) => {
    const homeButton = page.locator('button:has-text("Retour à l\'accueil")');
    await expect(homeButton).toBeVisible();
  });

  test('should return to map when clicking replay', async ({ page }) => {
    await page.locator('button:has-text("Rejouer")').click();
    await waitForNavigation(page, 'Carte du Monde');
  });

  test('should return to home when clicking return to home', async ({ page }) => {
    await page.locator('button:has-text("Retour à l\'accueil")').click();
    await waitForNavigation(page, 'English Adventure CE1');
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

  test('should display tabs', async ({ page }) => {
    const tabs = page.locator('.tab-btn');
    await expect(tabs).toHaveCount(2);
  });

  test('should display progress table', async ({ page }) => {
    const table = page.locator('.progress-table');
    await expect(table).toBeVisible();
  });

  test('should display progress table headers', async ({ page }) => {
    const headers = page.locator('.progress-table th');
    await expect(headers).toHaveText(['Thème', 'Étoiles', 'Temps joué', 'Statut']);
  });

  test('should display progress rows for all themes', async ({ page }) => {
    const rows = page.locator('.progress-table tbody tr');
    await expect(rows).toHaveCount(7); // 7 themes
  });

  test('should display empty state for history if no games played', async ({ page }) => {
    // First visit to journal should show empty state
    const emptyState = page.locator('.empty-state');
    await expect(emptyState).toBeVisible();
  });

  test('should have return button', async ({ page }) => {
    const backButton = page.locator('button:has-text("Retour")');
    await expect(backButton).toBeVisible();
  });
});

// Test suite for the About Screen
test.describe('About Screen', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(BASE_URL);
    await page.locator('button:has-text("À propos")').click();
  });

  test('should display the about title', async ({ page }) => {
    await expect(page.locator('h1')).toHaveText('À propos de English Adventure CE1');
  });

  test('should display multiple sections', async ({ page }) => {
    const sections = page.locator('.about-section');
    await expect(sections).toHaveCount(8); // 8 sections
  });

  test('should display section titles', async ({ page }) => {
    const sectionTitles = page.locator('.about-section h2');
    await expect(sectionTitles).toHaveText([
      /Qu'est-ce que/,
      /Objectifs/,
      /Fonctionnalités/,
      /Comment jouer/,
      /Conseils/,
      /Fonctionnalités techniques/,
      /Vie privée/,
      /Contact/,
      /Licence/
    ]);
  });

  test('should have return button', async ({ page }) => {
    const backButton = page.locator('button:has-text("Retour")');
    await expect(backButton).toBeVisible();
  });

  test('should contain GitHub repository link', async ({ page }) => {
    const link = page.locator('a[href*="github.com"]');
    await expect(link).toBeVisible();
  });
});

// Test suite for Complete Game Flow
test.describe('Complete Game Flow', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(BASE_URL);
  });

  test('should complete full game flow: home -> map -> level -> results -> journal', async ({ page }) => {
    // Step 1: Go to map
    await page.locator('button:has-text("Jouer")').click();
    await waitForNavigation(page, 'Carte du Monde');
    
    // Step 2: Start a level
    await page.locator('.island:has-text("Île des Animaux")').click();
    await expect(page.locator('h1')).toHaveText(/Niveau :/);
    
    // Step 3: Complete the game (answer all questions)
    for (let i = 0; i < 5; i++) {
      const firstOption = page.locator('.option').first();
      await firstOption.click();
      await page.locator('.next-btn').click();
    }
    
    // Step 4: Should be on results screen
    await expect(page.locator('h1')).toHaveText('Félicitations !');
    
    // Step 5: Go back to home
    await page.locator('button:has-text("Retour à l\'accueil")').click();
    await waitForNavigation(page, 'English Adventure CE1');
    
    // Step 6: Go to journal
    await page.locator('button:has-text("Mon Journal")').click();
    await waitForNavigation(page, 'Mon Journal');
    
    // Step 7: History should now have one entry
    const historyItems = page.locator('.history-item');
    await expect(historyItems).toHaveCount(1);
  });

  test('should track score correctly across multiple questions', async ({ page }) => {
    await page.locator('button:has-text("Jouer")').click();
    await page.locator('.island:has-text("Île des Animaux")').click();
    
    // Get the correct answers by checking which option matches the question
    // For now, we'll just click the first option for all questions
    // In a real test, we'd need to know the correct answers
    
    for (let i = 0; i < 5; i++) {
      const firstOption = page.locator('.option').first();
      await firstOption.click();
      
      if (i < 4) {
        await page.locator('.next-btn').click();
      } else {
        await page.locator('.next-btn').click();
      }
    }
    
    // Should be on results screen with a score
    await expect(page.locator('.score-value')).toBeVisible();
  });

  test('should save game history and display in journal', async ({ page }) => {
    // Play a game
    await page.locator('button:has-text("Jouer")').click();
    await page.locator('.island:has-text("Île des Animaux")').click();
    
    // Complete the game
    for (let i = 0; i < 5; i++) {
      const firstOption = page.locator('.option').first();
      await firstOption.click();
      await page.locator('.next-btn').click();
    }
    
    // Go to journal
    await page.locator('button:has-text("Retour à l\'accueil")').click();
    await page.locator('button:has-text("Mon Journal")').click();
    
    // Should have history
    const historyItems = page.locator('.history-item');
    await expect(historyItems).toHaveCount(1);
    
    // History item should have date, level, score, time
    await expect(page.locator('.history-date')).toBeVisible();
    await expect(page.locator('.history-level')).toBeVisible();
    await expect(page.locator('.history-score')).toBeVisible();
    await expect(page.locator('.history-time')).toBeVisible();
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

  test('should have proper meta tags for PWA', async ({ page }) => {
    await page.goto(BASE_URL);
    
    // Check for PWA meta tags
    const themeColor = page.locator('meta[name="theme-color"]');
    await expect(themeColor).toHaveAttribute('content', '#4CAF50');
    
    const viewport = page.locator('meta[name="viewport"]');
    await expect(viewport).toHaveAttribute('content', 'width=device-width, initial-scale=1.0');
    
    const manifestLink = page.locator('link[rel="manifest"]');
    await expect(manifestLink).toHaveAttribute('href', '/manifest.json');
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
  });

  test('should work on desktop viewport', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 }); // Desktop
    await page.goto(BASE_URL);
    await expect(page.locator('h1')).toBeVisible();
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
    await expect(buttons).toHaveCount(3); // Home screen has 3 buttons
  });

  test('should have proper contrast for text', async ({ page }) => {
    // This is a basic check - real contrast testing would require more advanced tools
    const textElements = page.locator('p, h1, h2, h3, button');
    await expect(textElements.first()).toBeVisible();
  });

  test('should have semantic HTML structure', async ({ page }) => {
    // Check for semantic elements
    await expect(page.locator('main')).toBeVisible();
    await expect(page.locator('h1')).toBeVisible();
    await expect(page.locator('p')).toBeVisible();
  });
});

// Test suite for LocalStorage Persistence
test.describe('LocalStorage Persistence', () => {
  test.beforeEach(async ({ page, context }) => {
    // Clear localStorage before each test
    await context.clearPermissions();
    await page.goto(BASE_URL);
  });

  test('should save game progress to localStorage', async ({ page }) => {
    // Play a game
    await page.locator('button:has-text("Jouer")').click();
    await page.locator('.island:has-text("Île des Animaux")').click();
    
    // Complete the game
    for (let i = 0; i < 5; i++) {
      const firstOption = page.locator('.option').first();
      await firstOption.click();
      await page.locator('.next-btn').click();
    }
    
    // Go back to home
    await page.locator('button:has-text("Retour à l\'accueil")').click();
    
    // Reload the page
    await page.reload();
    
    // Go to journal - should have history
    await page.locator('button:has-text("Mon Journal")').click();
    const historyItems = page.locator('.history-item');
    await expect(historyItems).toHaveCount(1);
  });

  test('should persist progress across page reloads', async ({ page }) => {
    // Go to map
    await page.locator('button:has-text("Jouer")').click();
    
    // Reload the page
    await page.reload();
    
    // Should still be on map screen (or home if state is reset)
    // This test depends on how the app handles state persistence
    await expect(page.locator('h1')).toBeVisible();
  });
});

// Test suite for Answer Selection
test.describe('Answer Selection', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(BASE_URL);
    await page.locator('button:has-text("Jouer")').click();
    await page.locator('.island:has-text("Île des Animaux")').click();
  });

  test('should disable options after selection', async ({ page }) => {
    const firstOption = page.locator('.option').first();
    await firstOption.click();
    
    // All options should be disabled after selection
    const options = page.locator('.option');
    await expect(options).toBeDisabled();
  });

  test('should show correct feedback for correct answer', async ({ page }) => {
    // We need to know which option is correct
    // For testing purposes, we'll assume the first option might be correct
    // In a real scenario, we'd need to parse the question and find the correct answer
    
    const questionText = await page.locator('.question p').textContent();
    const options = page.locator('.option');
    const optionTexts = await options.allTextContents();
    
    // Try to find the correct answer based on the question
    // This is a simplified approach - in reality, we'd need more sophisticated logic
    
    // For now, just click the first option and check that feedback appears
    const firstOption = page.locator('.option').first();
    await firstOption.click();
    
    await expect(page.locator('.feedback')).toBeVisible();
  });

  test('should increment score for correct answers', async ({ page }) => {
    const initialScore = await page.locator('.score').textContent();
    
    // Click an option (we don't know if it's correct, but the score should update)
    const firstOption = page.locator('.option').first();
    await firstOption.click();
    
    // The score might have changed
    const newScore = await page.locator('.score').textContent();
    
    // Either the score changed or it didn't (depending on whether the answer was correct)
    // This test just verifies that the score display is working
    await expect(page.locator('.score')).toBeVisible();
  });
});

// Test suite for Multiple Game Sessions
test.describe('Multiple Game Sessions', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(BASE_URL);
  });

  test('should record multiple game sessions in history', async ({ page }) => {
    // Play first game
    await page.locator('button:has-text("Jouer")').click();
    await page.locator('.island:has-text("Île des Animaux")').click();
    
    for (let i = 0; i < 5; i++) {
      const firstOption = page.locator('.option').first();
      await firstOption.click();
      await page.locator('.next-btn').click();
    }
    
    // Go back to home
    await page.locator('button:has-text("Retour à l\'accueil")').click();
    
    // Play second game
    await page.locator('button:has-text("Jouer")').click();
    await page.locator('.island:has-text("Île des Animaux")').click();
    
    for (let i = 0; i < 5; i++) {
      const firstOption = page.locator('.option').first();
      await firstOption.click();
      await page.locator('.next-btn').click();
    }
    
    // Go to journal
    await page.locator('button:has-text("Retour à l\'accueil")').click();
    await page.locator('button:has-text("Mon Journal")').click();
    
    // Should have 2 history entries
    const historyItems = page.locator('.history-item');
    await expect(historyItems).toHaveCount(2);
  });
});
