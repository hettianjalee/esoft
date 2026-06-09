import { test } from '../src/config/page.config';
import { users, loginExpected as expected } from '../src/config/page-loader';

test.describe('OrangeHRM - authentication', () => {
  test('should reach the dashboard after valid login', async ({ loginPage, dashboardPage }) => {
    await loginPage.step_navigate();
    await loginPage.step_login(users.admin);
    await dashboardPage.verify_onDashboard();
    await dashboardPage.verify_pageTitle(expected.labels.pageTitle);
  });

  test('should reject invalid credentials and empty password', async ({ loginPage }) => {
    await loginPage.step_navigate();
    await loginPage.step_login(users.invalid);
    await loginPage.verify_errorMessage(expected.errors.invalidCredentials);
    await loginPage.step_navigate();
    await loginPage.step_login(users.emptyPassword);
    await loginPage.verify_passwordFieldError(expected.errors.requiredField); 
  });
  test('should reject invalid credentials and empty password', async ({ loginPage }) => {
    await loginPage.step_navigate();
    await loginPage.step_login(users.invalid);
    await loginPage.verify_errorMessage(expected.errors.invalidCredentials);
    await loginPage.step_navigate();
    await loginPage.step_login(users.emptyPassword);
    await loginPage.verify_passwordFieldError(expected.errors.requiredField); 
  });



});
