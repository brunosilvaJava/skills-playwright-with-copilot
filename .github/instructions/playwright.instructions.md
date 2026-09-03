---
description: Convenções para escrever testes E2E com Playwright neste repositório.
applyTo: "tests/**/*.{js,ts}"
---

# Convenções de testes E2E (Playwright)

Ao criar ou editar arquivos em `tests/`:

- Use `import { test, expect } from '@playwright/test';`.
- Prefira **locators semânticos** (`getByRole`, `getByText`, `getByLabel`) e só
  recorra a `data-testid` quando necessário.
- **Nunca** use `page.waitForTimeout` para sincronizar. Use asserts com
  auto-espera (`await expect(locator).toBeVisible()`, `toHaveText`, etc.).
- Torne os testes determinísticos navegando para `/?seed=42` (ordem de cartas
  reproduzível).
- Agrupe cenários relacionados com `test.describe` e prepare estado comum em
  `test.beforeEach`.
- Nomes de teste descritivos em inglês (ex.: `counts moves when flipping cards`).
- Um comportamento por teste; asserts explícitos e no ponto certo.

## Ganchos disponíveis na aplicação

- `getByTestId('board')`, `getByTestId('card')` (com `data-value`/`data-state`).
- `getByTestId('moves')`, `getByTestId('timer')`.
- `getByTestId('win-message')` / `getByRole('status')`.
- `getByRole('button', { name: 'Reiniciar' })`.
- `getByTestId('difficulty')`.
