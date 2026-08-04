require("dotenv").config();

const { test, expect } = require("@playwright/test");
const LoginPage = require("../pages/LoginPage");

test.describe("Login", () => {
  let loginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.open();
  });

  test("Valid Registered Email", async ({ page }) => {
    await expect(loginPage.sendOtpBtn).toBeEnabled();

    await loginPage.login(process.env.EMAIL);

    await expect(page).toHaveTitle("LexiZ Lawyers");
  });
});
