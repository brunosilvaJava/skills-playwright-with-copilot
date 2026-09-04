import { test, expect } from '@playwright/test';

test('loads the memory game board', async ({ page }) => {
  await page.goto('/?seed=42');

  await expect(
    page.getByRole('heading', { name: 'Jogo da Memória' }),
  ).toBeVisible();
  await expect(page.getByTestId('moves')).toHaveText('0');
  await expect(page.getByTestId('timer')).toHaveText('0');
  await expect(page.getByLabel('Dificuldade')).toHaveValue('easy');

  const cards = page.getByTestId('card');
  await expect(cards).toHaveCount(8);
  await expect(cards.first()).toHaveAttribute('data-state', 'hidden');
});
