/** @type {import('@playwright/test').PlaywrightTestConfig} */
const { devices } = require('@playwright/test');

const config = {
  // Test directory
  testDir: './tests',
  
  // Timeout for each test
  timeout: 30000,
  
  // Expect timeout
  expect: {
    timeout: 5000,
  },
  
  // Run tests in parallel
  fullyParallel: true,
  
  // Fail the build on CI if you accidentally left test.only in the source code
  forbidOnly: !!process.env.CI,
  
  // Retry on CI only
  retries: process.env.CI ? 1 : 0,
  
  // Reporter to use
  reporter: ['html', 'json'],
  
  // Shared settings for all the projects below
  use: {
    // Base URL for the app
    baseURL: 'http://localhost:5173',
    
    // Collect trace only on failure
    trace: 'on-first-retry',
    
    // Take screenshot only on failure
    screenshot: 'only-on-failure',
    
    // Viewport size
    viewport: { width: 1280, height: 720 },
    
    // Headless mode
    headless: true,
  },
  
  // Projects for different browsers
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
};

export default config;
