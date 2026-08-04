const BasePage = require("./BasePage");
const { getOTP } = require("../utils/emailHelper");
const { extractOTP } = require("../utils/otpExtractor");
const MatterPage = require("./LegalMatterPage");

class LegalMatterPage extends BasePage {
  constructor(page) {
    super(page);

    this.logo = page.locator(".material-icons.nav-icon");

    this.mattersMenu = page.locator(".material-icons.nav-icon");
    this.matterCreateBtn = page.locator('button:has-text("Create Matter")');
    this.caseTitle = page.locator("#title");
    this.caseNumber = page.locator("#caseNumbr");
    this.createDate = page.locator('input[formcontrolname="created_date"]');
    this.saveForLaterBtn = page.getByRole("button", {
      name: "Save for Later",
    });
  }
  async open(url = process.env.BASE_URL) {
    await this.goto(url);
  }

  async isLogoVisible() {
    return await this.logo.isVisible();
  }

  async clickMattersMenu() {
    await this.mattersMenu.click();
  }

  async clickCreateMatterBtn() {
    await this.matterCreateBtn.click();
  }
  async fillCaseDetails(title, caseNumber, createDate) {
    await this.caseTitle.fill(title);
    await this.caseNumber.fill(caseNumber);
    await this.createDate.fill(createDate);
  }

  async clickSaveForLaterBtn() {
    await this.saveForLaterBtn.click();
  }
}

module.exports = LegalMatterPage;
