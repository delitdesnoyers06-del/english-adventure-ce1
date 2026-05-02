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
  retries: process.env.CI ? 2 : 0,
  
  // Opt out of parallel tests on CI
  workers: process.env.CI ? 1 : undefined,
  
  // Reporter to use
  reporter: 'html',
  
  // Shared settings for all the projects below
  use: {
    // Base URL for the app
    baseURL: 'http://localhost:5173',
    
    // Collect trace when retrying the failed test
    trace: 'on-first-retry',
    
    // Record video only when retrying
    video: 'retain-on-failure',
    
    // Take screenshot on test failure
    screenshot: 'only-on-failure',
    
    // Viewport size
    viewport: { width: 1280, height: 720 },
    
    // Headless mode
    headless: true,
    
    // Slow down by 50ms for better debugging
    launchOptions: {
      slowMo: process.env.CI ? 0 : 50,
    },
  },
  
  // Projects for different browsers
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
    
    // Mobile viewports
    {
      name: 'Mobile Chrome',
      use: { ...devices['iPhone 12'] },
    },
    
    {
      name: 'Mobile Safari',
      use: { ...devices['iPhone 12'] },
      use: {
        browserName: 'webkit',
        ...devices['iPhone 12'],
      },
    },
  ],
  
  // Web server configuration
  webServer: {
    command: 'npm run dev',
    url: 'http://localhost:5173',
    reuseExistingServer: true,
    timeout: 120000, // 2 minutes for server to start
  },
};

export default config;
