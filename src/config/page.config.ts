import {
  test as base,
  expect,
  chromium,
  type BrowserContext,
  type Page,
} from '@playwright/test';
import * as dotenv from 'dotenv';
import * as path from 'path';
import { LoginPage, DashboardPage } from '@config/page-loader';

dotenv.config({ path: path.resolve(__dirname, '../../.env') });

const useOrdinoCdp =
  process.env.ORDINO_PLAYWRIGHT_USE_CDP === '1' &&
  Boolean(String(process.env.ORDINO_CDP_URL || '').trim());

function pickConnectorPage(context: BrowserContext): Page | null {
  const pages = context.pages();
  if (pages.length === 0) return null;
  const isDevTools = (p: Page) => {
    try {
      const u = p.url();
      return u.includes('devtools') || u.startsWith('chrome-devtools:');
    } catch {
      return false;
    }
  };
  const usable = pages.filter((p) => !isDevTools(p));
  const pool = usable.length > 0 ? usable : pages;
  const filePages = pool.filter((p) => {
    try {
      return p.url().startsWith('file:');
    } catch {
      return false;
    }
  });
  if (filePages.length > 0) return filePages[filePages.length - 1]!;
  return pool[pool.length - 1]!;
}

const baseTest = useOrdinoCdp
  ? base.extend({
      browser: async ({}, use) => {
        const url = String(process.env.ORDINO_CDP_URL || '').trim();
        const browser = await chromium.connectOverCDP(url, { timeout: 30_000 });
        await use(browser);
      },
      context: async ({ browser }, use) => {
        const ctx = browser.contexts()[0] ?? (await browser.newContext());
        await use(ctx);
      },
      page: async ({ context }, use) => {
        const chosen = pickConnectorPage(context);
        const page = chosen ?? (await context.newPage());
        await use(page);
      },
    })
  : base;

type MyFixtures = {
  loginPage: LoginPage;
  dashboardPage: DashboardPage;
};

const test = baseTest.extend<MyFixtures>({
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },
  dashboardPage: async ({ page }, use) => {
    await use(new DashboardPage(page));
  },
});

export { test, expect };
