import * as dotenv from "dotenv";

dotenv.config({ path: `.env` });

interface EnvironmentValues {
  baseUrlFe: string;
  baseUrlBe: string;
  companyName: string;
  candidateEmail: string;
  clientId: string;
  clientSecret: string;
  redirectUrl: string;
  confirmLinkUrl: string;
  creditorIban: string;
}

const environmentValues: EnvironmentValues = {
  baseUrlFe: process.env.BASE_URL_FE as string,
  baseUrlBe: process.env.BASE_URL_BE as string,
  companyName: process.env.COMPANY_NAME as string,
  candidateEmail: process.env.CANDIDATE_EMAIL as string,
  clientId: process.env.CLIENT_ID as string,
  clientSecret: process.env.CLIENT_SECRET as string,
  redirectUrl: process.env.REDIRECT_URL as string,
  confirmLinkUrl: process.env.CONFIRM_LINK_URL as string,
  creditorIban: process.env.CREDITOR_IBAN as string,
};

export default environmentValues;
