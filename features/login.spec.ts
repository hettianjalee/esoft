import { test } from '../src/config/page.config';
import { users, loginExpected as expected } from '../src/config/page-loader';
 
test.describe('OrangeHRM - authentication', () => {
 
 
  test('should reach the dashboard after valid login', async ({ loginPage, dashboardPage }) => {
    await loginPage.step_navigate();
    await loginPage.step_login(users.admin);
    await dashboardPage.verify_onDashboard();
    await dashboardPage.verify_pageTitle(expected.labels.pageTitle);
  });
 
  test('should display the correct username in the top bar after login', async ({ loginPage, dashboardPage }) => {
    await loginPage.step_navigate();
    await loginPage.step_login(users.admin);
    await dashboardPage.verify_onDashboard();
    await dashboardPage.verify_loggedInUsername(users.admin.username);
  });
 
  test('should persist session and remain on dashboard after page reload', async ({ loginPage, dashboardPage }) => {
    await loginPage.step_navigate();
    await loginPage.step_login(users.admin);
    await dashboardPage.verify_onDashboard();
    await dashboardPage.step_reloadPage();
    await dashboardPage.verify_onDashboard();
  });
 
  test('should redirect to dashboard when visiting login page while already authenticated', async ({ loginPage, dashboardPage }) => {
    await loginPage.step_navigate();
    await loginPage.step_login(users.admin);
    await dashboardPage.verify_onDashboard();
    await loginPage.step_navigate();
    await dashboardPage.verify_onDashboard();
  });
 
 
  test('should reject invalid credentials and show alert message', async ({ loginPage }) => {
    await loginPage.step_navigate();
    await loginPage.step_login(users.invalid);
    await loginPage.verify_errorMessage(expected.errors.invalidCredentials);
  });