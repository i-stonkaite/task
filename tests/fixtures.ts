import { test as base } from "@playwright/test";
import { BankPaymentPage } from "../tests/frontend/pages/bank-payment-page";
import { BankPaymentPageAssertions } from "./frontend/assertions/bank-payment-assertions";

type PageFixtures = {
  bankPaymentPage: BankPaymentPageAssertions;
};

export const test = base.extend<PageFixtures>({
  bankPaymentPage: async ({ page }, use) => {
    await use(new BankPaymentPageAssertions(page));
  },
});

export { expect } from "@playwright/test";
