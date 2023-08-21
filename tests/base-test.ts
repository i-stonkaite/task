import { Page } from "@playwright/test";
import config from "../playwright.config";

export class BaseTest {
  page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async goTo() {
    await this.page?.goto(config.baseUrl);
  }
}
