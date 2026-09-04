import { test as base, expect } from '@playwright/test';

export const test = base.extend({
  gamePage: async ({ page }, use) => {
    await page.goto('/?seed=42');
    await use(page);
  },
});

export { expect };