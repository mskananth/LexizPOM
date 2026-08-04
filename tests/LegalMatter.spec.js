require("dotenv").config();

const { test, expect } = require("@playwright/test");
const LoginPage = require("../pages/LoginPage");
const MatterPage = require("../pages/LegalMatterPage");

test.describe("Login", () => {
  let loginPage;
  let matterPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    matterPage = new MatterPage(page);

    await loginPage.open();
  });

  test("Valid Registered Email", async () => {
    await expect(loginPage.sendOtpBtn).toBeEnabled();

    await loginPage.login(process.env.EMAIL);
  });

  test("Side Menu Logo", async () => {
    await loginPage.login(process.env.EMAIL);

    await expect(await matterPage.isLogoVisible()).toBeTruthy();
  });

  test("Matter Menu Click", async () => {
    await matterPage.clickMattersMenu();
    await expect(await matterPage.matterCreateBtn).toBeVisible();
  });
});
