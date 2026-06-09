import { defineConfig, devices } from '@playwright/test';
import * as dotenv from 'dotenv';

dotenv.config();

if (!process.env.BASE_URL) {
  throw new Error('Missing BASE_URL in environment (.env).');
}

const useOrdinoCdp =
  process.env.ORDINO_PLAYWRIGHT_USE_CDP === '1' &&
  Boolean(String(process.env.ORDINO_CDP_URL || '').trim());

export default defineConfig({
  testDir: './features',
  fullyParallel: false,
  retries: process.env.CI ? 2 : 0,
  workers: useOrdinoCdp ? 1 : process.env.CI ? 1 : undefined,
  outputDir: './test-results/runs',
  preserveOutput: 'failures-only',

  reporter: [
    ['html', { outputFolder: 'test-results/html-report', open: 'never' }],
    ['json', { outputFile: 'test-results/results.json' }],
    ['junit', { outputFile: 'test-results/results.xml' }],
    ['list'],
  ],

  use: {
    baseURL: process.env.BASE_URL,
    trace: 'on',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    actionTimeout: 15000,
    navigationTimeout: 15000,
  },

  projects: [
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
        ...(useOrdinoCdp ? {} : { launchOptions: { args: ['--no-sandbox'] } }),
      },
    },
  ],
});
