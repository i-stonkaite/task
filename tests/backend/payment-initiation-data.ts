import environmentValues from "../../environment";

interface PaymentInitiationValidRequestData {
  amount: number;
  currencyCode: string;
  description: string;
  bankPaymentMethod: BankPaymentMethod;
}

export interface BankPaymentMethod {
  creditorName: string;
  endToEndId: string;
  informationStructured: InformationStructured;
  creditorAccount: CreditorAccount;
}

interface InformationStructured {
  reference: string;
}

interface CreditorAccount {
  iban: string;
}

export const paymentInitiationValidRequestData: PaymentInitiationValidRequestData =
  {
    amount: 0.01,
    currencyCode: "EUR",
    description: "Payment initiation service auto test",
    bankPaymentMethod: {
      creditorName: "Padėk gatvės vaikams",
      endToEndId: "1234567890",
      informationStructured: {
        reference: "test",
      },
      creditorAccount: {
        iban: environmentValues.creditorIban,
      },
    },
  };

interface PaymentInitiationHeaders {
  [key: string]: string;
}

export const paymentInitiationHeaders: PaymentInitiationHeaders = {
  "Client-Id": environmentValues.clientId,
  "Client-Secret": environmentValues.clientSecret,
  "Redirect-URL": environmentValues.redirectUrl,
};

interface PaymentStatus {
  bankStatus: string;
  statusGroup: string;
}

export const paymentStatus: PaymentStatus = {
  bankStatus: "STRD",
  statusGroup: "started",
};
