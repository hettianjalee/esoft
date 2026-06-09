import { test } from '../src/config/page.config';
import { users, loginExpected as expected } from '../src/config/page-loader';
 
test.describe('OrangeHRM - authentication', () => {
 
  // ─────────────────────────────────────────────
  // VALID LOGIN FLOWS
  // ─────────────────────────────────────────────
 
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
 
  test('should reject a valid username paired with a wrong password', async ({ loginPage }) => {
    await loginPage.step_navigate();
    await loginPage.step_login(users.validUsernameWrongPassword);
    await loginPage.verify_errorMessage(expected.errors.invalidCredentials);
  });
 
  test('should reject a wrong username paired with a valid password', async ({ loginPage }) => {
    await loginPage.step_navigate();
    await loginPage.step_login(users.wrongUsernameValidPassword);
    await loginPage.verify_errorMessage(expected.errors.invalidCredentials);
  });
 
  test('should reject SQL injection string in username field', async ({ loginPage }) => {
    await loginPage.step_navigate();
    await loginPage.step_login(users.sqlInjectionUsername);
    await loginPage.verify_errorMessage(expected.errors.invalidCredentials);
  });
 
  test('should reject XSS payload in username field', async ({ loginPage }) => {
    await loginPage.step_navigate();
    await loginPage.step_login(users.xssUsername);
    await loginPage.verify_errorMessage(expected.errors.invalidCredentials);
  });
 
 
 
  test('should show required-field error when password is empty', async ({ loginPage }) => {
    await loginPage.step_navigate();
    await loginPage.step_login(users.emptyPassword);
    await loginPage.verify_passwordFieldError(expected.errors.requiredField);
  });
 
  test('should show required-field error when username is empty', async ({ loginPage }) => {
    await loginPage.step_navigate();
    await loginPage.step_login(users.emptyUsername);
    await loginPage.verify_usernameFieldError(expected.errors.requiredField);
  });
 
  test('should show required-field errors on both fields when form is submitted empty', async ({ loginPage }) => {
    await loginPage.step_navigate();
    await loginPage.step_submitEmptyForm();
    await loginPage.verify_usernameFieldError(expected.errors.requiredField);
    await loginPage.verify_passwordFieldError(expected.errors.requiredField);
  });
 
  test('should show required-field error for username but not password when only password is filled', async ({ loginPage }) => {
    await loginPage.step_navigate();
    await loginPage.step_login(users.emptyUsername);
    await loginPage.verify_usernameFieldError(expected.errors.requiredField);
    await loginPage.verify_passwordFieldError_notVisible();
  });
 
 
  test('should mask the password field by default', async ({ loginPage }) => {
    await loginPage.step_navigate();
    await loginPage.step_typePassword(users.admin.password);
    await loginPage.verify_passwordFieldType('password');
  });
 
  test('should not clear the username field after a failed login attempt', async ({ loginPage }) => {
    await loginPage.step_navigate();
    await loginPage.step_login(users.invalid);
    await loginPage.verify_errorMessage(expected.errors.invalidCredentials);
    await loginPage.verify_usernameFieldValue(users.invalid.username);
  });
 
  test('should clear the password field after a failed login attempt', async ({ loginPage }) => {
    await loginPage.step_navigate();
    await loginPage.step_login(users.invalid);
    await loginPage.verify_errorMessage(expected.errors.invalidCredentials);
    await loginPage.verify_passwordFieldEmpty();
  });
 
 
  test('should navigate to the forgot-password page when link is clicked', async ({ loginPage, forgotPasswordPage }) => {
    await loginPage.step_navigate();
    await loginPage.step_clickForgotPassword();
    await forgotPasswordPage.verify_onForgotPasswordPage();
    await forgotPasswordPage.verify_pageTitle(expected.labels.forgotPasswordTitle);
  });
 
  test('should submit a password reset request with a valid username', async ({ loginPage, forgotPasswordPage }) => {
    await loginPage.step_navigate();
    await loginPage.step_clickForgotPassword();
    await forgotPasswordPage.step_submitUsername(users.admin.username);
    await forgotPasswordPage.verify_resetConfirmationMessage(expected.labels.resetEmailSent);
  });
 
  test('should show an error on forgot-password page when username field is empty', async ({ loginPage, forgotPasswordPage }) => {
    await loginPage.step_navigate();
    await loginPage.step_clickForgotPassword();
    await forgotPasswordPage.step_submitUsername('');
    await forgotPasswordPage.verify_usernameFieldError(expected.errors.requiredField);
  });
 
  test('should return to login page when Cancel is clicked on forgot-password page', async ({ loginPage, forgotPasswordPage }) => {
    await loginPage.step_navigate();
    await loginPage.step_clickForgotPassword();
    await forgotPasswordPage.step_clickCancel();
    await loginPage.verify_onLoginPage();
  });
 
  test('should log out successfully and redirect to login page', async ({ loginPage, dashboardPage }) => {
    await loginPage.step_navigate();
    await loginPage.step_login(users.admin);
    await dashboardPage.verify_onDashboard();
    await dashboardPage.step_logout();
    await loginPage.verify_onLoginPage();
  });
 
  test('should redirect to login page when accessing a protected route after logout', async ({ loginPage, dashboardPage }) => {
    await loginPage.step_navigate();
    await loginPage.step_login(users.admin);
    await dashboardPage.verify_onDashboard();
    await dashboardPage.step_logout();
    await dashboardPage.step_navigateDirect();
    await loginPage.verify_onLoginPage();
  });
 
  test('should not allow browser back-button access to dashboard after logout', async ({ loginPage, dashboardPage }) => {
    await loginPage.step_navigate();
    await loginPage.step_login(users.admin);
    await dashboardPage.verify_onDashboard();
    await dashboardPage.step_logout();
    await loginPage.step_navigateBack();
    await loginPage.verify_onLoginPage();
  });
 
 
  test('should display the OrangeHRM logo on the login page', async ({ loginPage }) => {
    await loginPage.step_navigate();
    await loginPage.verify_logoVisible();
  });
 
  test('should display the login page title', async ({ loginPage }) => {
    await loginPage.step_navigate();
    await loginPage.verify_pageTitle(expected.labels.loginTitle);
  });
 
  test('should display username and password fields on the login page', async ({ loginPage }) => {
    await loginPage.step_navigate();
    await loginPage.verify_usernameFieldVisible();
    await loginPage.verify_passwordFieldVisible();
  });
 
  test('should display the Login button on the login page', async ({ loginPage }) => {
    await loginPage.step_navigate();
    await loginPage.verify_loginButtonVisible();
  });
 
  test('should display the Forgot Password link on the login page', async ({ loginPage }) => {
    await loginPage.step_navigate();
    await loginPage.verify_forgotPasswordLinkVisible();
  });
 
  
 
  test('should reject username entered in uppercase when credentials are case-sensitive', async ({ loginPage }) => {
    await loginPage.step_navigate();
    await loginPage.step_login(users.uppercaseUsername);
    await loginPage.verify_errorMessage(expected.errors.invalidCredentials);
  });
 
  test('should reject password entered in uppercase when credentials are case-sensitive', async ({ loginPage }) => {
    await loginPage.step_navigate();
    await loginPage.step_login(users.uppercasePassword);
    await loginPage.verify_errorMessage(expected.errors.invalidCredentials);
  });
 

  test('should reject username containing only whitespace', async ({ loginPage }) => {
    await loginPage.step_navigate();
    await loginPage.step_login(users.whitespaceUsername);
    await loginPage.verify_errorMessage(expected.errors.invalidCredentials);
  });
 
  test('should reject credentials with leading and trailing spaces in the username', async ({ loginPage }) => {
    await loginPage.step_navigate();
    await loginPage.step_login(users.paddedUsername);
    await loginPage.verify_errorMessage(expected.errors.invalidCredentials);
  });
 
});
 