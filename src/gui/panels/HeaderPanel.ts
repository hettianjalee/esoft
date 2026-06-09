import { Page, Locator } from '@playwright/test';

export class HeaderPanel {
  private profileBadge: Locator;
  private profileName: Locator;

  constructor(private page: Page) {
    this.profileBadge = page.locator("//li[contains(@class,'oxd-userdropdown')]");
    this.profileName = page.locator("//p[contains(@class,'oxd-userdropdown-name')]");
  }

  /**
   * Returns the visible profile-name text from the header.
   * @returns Trimmed profile-name string
   */
  async getProfileName(): Promise<string> {
    await this.profileName.waitFor({ state: 'visible' });
    return (await this.profileName.innerText()).trim();
  }

  /**
   * Opens the profile dropdown menu in the header.
   * @returns this for chaining
   */
  async openProfileMenu(): Promise<this> {
    await this.profileBadge.click();
    return this;
  }
}
