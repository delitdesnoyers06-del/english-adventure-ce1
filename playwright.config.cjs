/** @type {import('@playwright/test').PlaywrightTestConfig} */
const { devices } = require('@playwright/test');

const config = {
  // Test directory
  testDir: './tests',
  
  // Timeout for each test (reduced for CI)
  timeout: process.env.CI ? 15000 : 30000,
  
  // Expect timeout
  expect: {
    timeout: 3000,
  },
  
  // Run tests in parallel
  fullyParallel: true,
  
  // Fail the build on CI if you accidentally left test.only in the source code
  forbidOnly: !!process.env.CI,
  
  // Retry on CI only (reduced for faster feedback)
  retries: process.env.CI ? 1 : 0,
  
  // Opt out of parallel tests on CI
  workers: process.env.CI ? 1 : undefined,
  
  // Reporter to use
  reporter: [
    ['html', { outputFolder: 'playwright-report' }],
    ['json', { outputFile: 'test-results/results.json' }]
  ],
  
  // Shared settings for all the projects below
  use: {
    // Base URL for the app
    baseURL: 'http://localhost:5173',
    
    // Collect trace only on failure
    trace: 'on-first-retry',
    
    // Record video only on failure (disabled on CI to save time)
    video: process.env.CI ? 'off' : 'retain-on-failure',
    
    // Take screenshot only on failure (disabled on CI to save time)
    screenshot: process.env.CI ? 'only-on-failure' : 'only-on-failure',
    
    // Viewport size
    viewport: { width: 1280, height: 720 },
    
    // Headless mode
    headless: true,
    
    // Slow down by 50ms for better debugging
    launchOptions: {
      slowMo: process.env.CI ? 0 : 50,
    },
  },
  
  // Projects for different browsers (only chromium on CI)
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
  
  // Web server configuration
  webServer: {
    command: 'npm run dev',
    url: 'http://localhost:5173',
    reuseExistingServer: true,
    timeout: 60000, // 1 minute for server to start
  },
};

export default config;
