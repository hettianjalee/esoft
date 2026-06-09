const { test, expect } = require('@playwright/test');


// Test 1 - Check all login page elements are visible
test('Login page elements should be visible', async ({ page }) => {

  // Load the Login page
  await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
  await page.waitForLoadState('networkidle');
  await page.waitForSelector('.orangehrm-login-form');

  // Logo
  const logo = page.locator('.orangehrm-login-branding');
  await expect(logo).toBeVisible();

  // Login title
  const loginTitle = page.locator('h5:has-text("Login")');
  await expect(loginTitle).toBeVisible();
  await expect(loginTitle).toHaveText('Login');

  // Username label
  const usernameLabel = page.locator(':text-is("Username")');
  await expect(usernameLabel).toBeVisible();

  // Username input field
  const usernameInput = page.locator('input[name="username"]');
  await expect(usernameInput).toBeVisible();
  await expect(usernameInput).toHaveAttribute('placeholder', 'Username');

  // Password label
  const passwordLabel = page.locator(':text-is("Password")');
  await expect(passwordLabel).toBeVisible();

  // Password input field
  const passwordInput = page.locator('input[name="password"]');
  await expect(passwordInput).toBeVisible();
  await expect(passwordInput).toHaveAttribute('placeholder', 'Password');

  // Login button
  const loginButton = page.locator("button[type='submit']");
  await expect(loginButton).toBeVisible();
  await expect(loginButton).toContainText('Login');

  // Forgot password link
  const forgotPasswordLink = page.locator(':text-is("Forgot your password?")');
  await expect(forgotPasswordLink).toBeVisible();
  await expect(forgotPasswordLink).toContainText('Forgot your password?');
});


// Test 2 - Login with valid username and password goes to dashboard
test('Valid login redirects to dashboard', async ({ page }) => {
  await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
  await page.waitForSelector('input[name="username"]');

  //  Valid username and password
  await page.fill('input[name="username"]', 'Admin');
  await page.fill('input[name="password"]', 'admin123');
  await page.click('button[type="submit"]');

  // Check URL changed to dashboard
  await expect(page).toHaveURL(/dashboard/);;

  // Check dashboard header is visible
  await expect(page.locator('.oxd-topbar-header')).toBeVisible();
  

});


// Test 3 - Verify My Info sidebar tab and Personal Details form
test('My Info tab opens Personal Details form', async ({ page }) => {
  await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
  await page.waitForSelector('input[name="username"]');

  // Login with valid credentials
  await page.fill('input[name="username"]', 'Admin');
  await page.fill('input[name="password"]', 'admin123');
  await page.click('button[type="submit"]');

  // Verify we are on dashboard
  await expect(page).toHaveURL(/dashboard/);

  // Verify left sidebar "My Info" tab is visible and click it
  const myInfoTab = page.locator('xpath=//*[@id="app"]/div[1]/div[1]/aside');
  await expect(myInfoTab).toBeVisible();
  await myInfoTab.click();

  // Verify URL navigates to Personal Details page
  await expect(page).toHaveURL(/\/pim\/viewPersonalDetails\/empNumber\/\d+$/);

  // Verify Personal Details form heading and key fields
  //const heading = page.locator('xpath=/html/body/div[1]/div[1]/div[2]/div[2]/div/div/div/div[2]/div[1]/h6');
  page.locator('xpath=//h6[text()="Personal Details"]');



  // const fullNameInput = page.locator('/html/body/div[1]/div[1]/div[2]/div[2]/div/div/div/div[2]/div[1]/form/div[1]/div[1]/div/div/div[2]/input');
  // const employeeIdInput = page.locator('/html/body/div[1]/div[1]/div[2]/div[2]/div/div/div/div[2]/div[1]/form/div[2]/div[1]/div[1]/div/div[1]/input');
  // const otherIdInput = page.locator('/html/body/div[1]/div[1]/div[2]/div[2]/div/div/div/div[2]/div[1]/form/div[2]/div[1]/div[2]/div/div[2]/input');

  const fullNameInput = page.getByLabel('Full Name');
  const employeeIdInput = page.getByLabel('Employee Id');
  const otherIdInput = page.getByLabel('Other Id');

});