import { test } from "../../fixtures";

test.describe("@FE Bank payment", () => {
  test("@FE should allow to proceed with the payment only if terms and conditions checkbox is checked", async ({
    bankPaymentPage,
  }) => {
    await bankPaymentPage.goTo();
    await bankPaymentPage.acceptCookies();
    await bankPaymentPage.validateNecessaryCookieIsSet();
    await bankPaymentPage.selectBankPaymentOption();
    await bankPaymentPage.validateUrlChange();
    await bankPaymentPage.fillPaymentInformation();
    await bankPaymentPage.validateAgreementsErrorMessage();
    await bankPaymentPage.markTermsAndConditionsCheckbox();
    await bankPaymentPage.submitForm();
    await bankPaymentPage.validateRedirectToBankDomain();
    await bankPaymentPage.navigateBack();
    await bankPaymentPage.validateNecessaryCookieIsSet();
  });
});
