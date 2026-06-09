import { Page, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export type LoginCredentials = { username: string; password: string };

export class LoginPage extends BasePage {
  readonly path = '/web/index.php/auth/login';

  private usernameInput = this.page.locator('//input[@name="username"]');
  private passwordInput = this.page.locator('//input[@name="password"]');
  private loginButton = this.page.locator('//button[@type="submit"]');
  private errorMessage = this.page.locator("//p[contains(@class,'oxd-alert-content-text')]");
  private passwordFieldError = this.page.locator(
    "//input[@name='password']/ancestor::div[contains(@class,'oxd-input-group')]//span[contains(@class,'oxd-input-field-error-message')]",
  );

  constructor(page: Page) {
    super(page);
  }

  /**
   * Opens the login route and waits for DOM readiness.
   * @returns this for chaining
   */
  async step_navigate(): Promise<this> {
    await this.page.goto(this.path);
    await this.waitForPageLoad();
    return this;
  }

  /**
   * Fills credentials and submits the login form.
   * @param credentials - Username + password pair
   * @returns this for chaining
   */
  async step_login(credentials: LoginCredentials): Promise<this> {
    await this.usernameInput.fill(credentials.username);
    await this.passwordInput.fill(credentials.password);
    await this.loginButton.click();
    await this.waitForPageLoad();
    return this;
  }

  /**
   * Verifies the login error text matches expectations.
   * @param expectedText - Substring expected in the error message
   * @returns this for chaining
   */
  async verify_errorMessage(expectedText: string): Promise<this> {
    await this.errorMessage.waitFor({ state: 'visible' });
    expect((await this.errorMessage.innerText()).trim()).toContain(expectedText);
    return this;
  }

  /**
   * Verifies the password field shows inline validation text.
   * @param expectedText - Substring expected on the password field error
   * @returns this for chaining
   */
  async verify_passwordFieldError(expectedText: string): Promise<this> {
    await this.passwordFieldError.waitFor({ state: 'visible' });
    expect((await this.passwordFieldError.innerText()).trim()).toContain(expectedText);
    return this;
  }
}
