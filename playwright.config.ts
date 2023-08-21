import { PlaywrightTestConfig, devices } from "@playwright/test";
import environmentValues from "./environment";

interface customConfig extends PlaywrightTestConfig {
  baseUrl: string;
  apiUrl: string;
}

const defaultConfig: PlaywrightTestConfig = {
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: "html",

  use: {
    trace: "on-first-retry",
    ignoreHTTPSErrors: true,
  },

  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
  ],
};

// let's assume these are tests for the 'test' environment
const testConfig: customConfig = {
  baseUrl: environmentValues.baseUrlFe,
  apiUrl: environmentValues.baseUrlBe,
};

// example of adding another env
const prodConfig: customConfig = {
  baseUrl: "",
  apiUrl: "",
};

const envForTests = process.env.TEST_ENV;

const config: customConfig = {
  ...defaultConfig,
  ...(envForTests === "test" ? testConfig : prodConfig),
};

export default config;
