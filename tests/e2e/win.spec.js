import { test, expect } from '@playwright/test';

test('completes the game and shows the win message', async ({ page }) => {
  await page.goto('/?seed=42');

  const cards = page.getByTestId('card');
  const values = await cards.evaluateAll((cardElements) => [
    ...new Set(cardElements.map((card) => card.dataset.value)),
  ]);

  for (const value of values) {
    const pair = page.locator(
      `[data-testid="card"][data-value="${value}"]`,
    );
    await pair.nth(0).click();
    await pair.nth(1).click();
  }

  await expect(page.getByTestId('moves')).toHaveText('4');

  const winMessage = page.getByTestId('win-message');
  await expect(winMessage).toContainText('Você venceu!');
  await expect(winMessage).toContainText('4 movimentos');
});