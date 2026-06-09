import { Page, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class DashboardPage extends BasePage {
  readonly path = '/web/index.php/dashboard/index';

  private activeDashboardNav = this.page.locator(
    "//a[contains(@href,'dashboard/index') and contains(@class,'active')]",
  );

  constructor(page: Page) {
    super(page);
  }

  /**
   * Asserts the Dashboard module is active in the sidebar.
   * @returns this for chaining
   */
  async verify_onDashboard(): Promise<this> {
    await this.activeDashboardNav.waitFor({ state: 'visible' });
    await expect(this.activeDashboardNav).toBeVisible();
    return this;
  }

  /**
   * Verifies the document title contains the given substring.
   * @param expectedSubstring - Case-sensitive substring expected in the title
   * @returns this for chaining
   */
  async verify_pageTitle(expectedSubstring: string): Promise<this> {
    expect(await this.getTitle()).toContain(expectedSubstring);
    return this;
  }
}
