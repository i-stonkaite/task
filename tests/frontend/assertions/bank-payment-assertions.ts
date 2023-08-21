import { Page, expect } from "@playwright/test";
import { BankPaymentPage } from "../pages/bank-payment-page";
import config from "../../../playwright.config";

export class BankPaymentPageAssertions extends BankPaymentPage {
  readonly page: Page;
  readonly agreementErrorMessage: string =
    "You have to agree to the terms and conditions and privacy policy";
  readonly redTextWrapper: string = "_wrapper_1ucqt_1 _error_72pu9_20";
  readonly redirectUrlForSelectedBank: RegExp = /login.swedbank/;

  constructor(page: Page) {
    super(page);
    this.page = page;
  }

  async validateNecessaryCookieIsSet(): Promise<void> {
    const cookies = await this.page.context().cookies(config.baseUrl);
    expect(cookies[0].name).toEqual(this.cookieName);
  }

  async validateUrlChange(): Promise<void> {
    const url: string = this.page.url();
    expect(url).toBe(`${config.baseUrl}bank-payment/LT`);
  }

  async validateAgreementsErrorMessage(): Promise<void> {
    const errorMessage = await this.page.getByText(this.agreementErrorMessage);
    await expect(errorMessage).toBeVisible();
    await expect(errorMessage).toHaveClass(this.redTextWrapper);
  }

  async validateRedirectToBankDomain(): Promise<void> {
    await this.page.waitForURL(this.redirectUrlForSelectedBank);
    const url: string = this.page.url();
    await expect(this.page).toHaveURL(this.redirectUrlForSelectedBank);
  }
}
