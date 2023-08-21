import { test, expect } from "../fixtures";
import config from "../../playwright.config";
import {
  paymentInitiationValidRequestData,
  paymentInitiationHeaders,
  BankPaymentMethod,
  paymentStatus,
} from "./payment-initiation-data";
import environmentValues from "../../environment";

test.describe("@BE Payment initiation service", () => {
  test("should initiate payment if valid data is provided", async ({
    request,
  }) => {
    const newPaymentInitiation = await request.post(
      `${config.apiUrl}pis/payment`,
      {
        headers: paymentInitiationHeaders,
        data: paymentInitiationValidRequestData,
      }
    );

    const newPaymentInitiationResponse = await newPaymentInitiation.json();
    const paymentId: string = Object.values(
      newPaymentInitiationResponse
    )[0] as string;
    const bankStatus: string = Object.values(
      newPaymentInitiationResponse
    )[1] as string;
    const statusGroup: string = Object.values(
      newPaymentInitiationResponse
    )[2] as string;
    const confirmLink: string = Object.values(
      newPaymentInitiationResponse
    )[3] as string;

    expect(newPaymentInitiation.ok()).toBeTruthy();
    expect(paymentId).toBeTruthy();
    expect(bankStatus).toEqual(paymentStatus.bankStatus);
    expect(statusGroup).toEqual(paymentStatus.statusGroup);
    expect(confirmLink).toBe(`${environmentValues.confirmLinkUrl}${paymentId}`);
  });

  https: test("should get initiated payment details if valid data is provided", async ({
    request,
  }) => {
    const newPaymentInitiation = await request.post(
      `${config.apiUrl}pis/payment`,
      {
        headers: paymentInitiationHeaders,
        data: paymentInitiationValidRequestData,
      }
    );

    const newPaymentInitiationResponse = await newPaymentInitiation.json();
    const paymentId: string = Object.values(
      newPaymentInitiationResponse
    )[0] as string;

    const getPaymentDetails = await request.get(
      `${config.apiUrl}pis/payment/${paymentId}`,
      {
        headers: paymentInitiationHeaders,
        data: paymentInitiationValidRequestData,
      }
    );

    const getPaymentDetailsResponse = await getPaymentDetails.json();

    const paymentIdResponse: string = Object.values(
      getPaymentDetailsResponse
    )[0] as string;
    const bankStatus: string = Object.values(
      getPaymentDetailsResponse
    )[1] as string;
    const statusGroup: string = Object.values(
      getPaymentDetailsResponse
    )[2] as string;
    const amount: string = Object.values(
      getPaymentDetailsResponse
    )[3] as string;
    const currencyCode: string = Object.values(
      getPaymentDetailsResponse
    )[4] as string;

    const bankPaymentMethod: BankPaymentMethod = Object.values(
      getPaymentDetailsResponse
    )[6] as BankPaymentMethod;
    const creditorName: string = bankPaymentMethod.creditorName;
    const endToEndId: string = bankPaymentMethod.endToEndId;
    const creditorAccount: string = bankPaymentMethod.creditorAccount.iban;

    expect(getPaymentDetails.ok()).toBeTruthy();
    expect(paymentIdResponse).toEqual(paymentId);
    expect(bankStatus).toEqual(paymentStatus.bankStatus);
    expect(statusGroup).toEqual(paymentStatus.statusGroup);
    expect(parseFloat(amount)).toEqual(
      paymentInitiationValidRequestData.amount
    );
    expect(currencyCode).toEqual(
      paymentInitiationValidRequestData.currencyCode
    );
    expect(endToEndId).toEqual(
      paymentInitiationValidRequestData.bankPaymentMethod.endToEndId
    );
    expect(creditorAccount).toEqual(
      paymentInitiationValidRequestData.bankPaymentMethod.creditorAccount.iban
    );
  });
});
