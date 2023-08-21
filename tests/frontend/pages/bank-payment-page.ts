import { Page, Locator } from "@playwright/test";
import { BaseTest } from "../../../tests/base-test";
import environmentValues from "../../../environment";

export class BankPaymentPage extends BaseTest {
  readonly page: Page;
  readonly acceptBtnName: string = "Accept";
  readonly paymentAmountInputName: string = "Amount";
  readonly paymentAmount: string = "0.01";
  readonly emailInputName: string = "Email";
  readonly payButtonName: string = "Pay";
  readonly cookieName: string = `${environmentValues.companyName}-demo-page-necessary-cookies`;
  readonly checkbox: string = "checkmark-icon";

  readonly swedbankButton: Locator;

  constructor(page: Page) {
    super(page);
    this.page = page;
    this.swedbankButton = this.page
      .locator("div:nth-child(4) > ._radioGroup_q9fbc_25 > label")
      .first();
  }

  async acceptCookies(): Promise<void> {
    await this.page.getByRole("button", { name: this.acceptBtnName }).click();
  }

  async selectBankPaymentOption(): Promise<void> {
    await this.page.getByTestId("bank-payment-btn").click();
  }

  async submitForm(): Promise<void> {
    await this.page.getByRole("button", { name: this.payButtonName }).click();
  }

  async fillPaymentInformation(): Promise<void> {
    await this.page
      .getByRole("textbox", { name: this.paymentAmountInputName })
      .fill(this.paymentAmount);
    await this.page
      .getByRole("textbox", { name: this.emailInputName })
      .fill(environmentValues.candidateEmail);
    await this.swedbankButton.click();
    await this.page.getByRole("button", { name: this.payButtonName }).click();
    await this.submitForm();
  }

  async markTermsAndConditionsCheckbox(): Promise<void> {
    await this.page.getByTestId(this.checkbox).getByRole("img").click();
  }

  async navigateBack(): Promise<void> {
    await this.page.goBack();
  }
}
