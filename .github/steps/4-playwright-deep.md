# Passo 4: Playwright a fundo — fixtures, locators, trace e navegadores

Com testes funcionando, é hora de deixá-los mais robustos e reaproveitáveis:
**fixtures**, **locators semânticos**, **trace** e execução em **múltiplos
navegadores**.

## Objetivo

Evoluir a configuração e os testes: uma fixture reutilizável, projetos para
mais navegadores e captura de trace.

## O que você vai fazer

1. **Fixtures** — crie `tests/e2e/fixtures.js` com uma fixture que já abre a
   aplicação com a seed:

   ```js
   import { test as base, expect } from '@playwright/test';

   export const test = base.extend({
     gamePage: async ({ page }, use) => {
       await page.goto('/?seed=42');
       await use(page);
     },
   });

   export { expect };
   ```

   Reescreva ao menos um teste importando `test`/`expect` da fixture em vez de
   `@playwright/test`.

2. **Navegadores** — adicione projetos para Firefox e WebKit em
   `playwright.config.js`:

   ```js
   projects: [
     { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
     { name: 'firefox', use: { ...devices['Desktop Firefox'] } },
     { name: 'webkit', use: { ...devices['Desktop Safari'] } },
   ],
   ```

   Instale os navegadores que faltarem: `pnpm exec playwright install`.

3. **Trace** — rode com trace e abra o visualizador:

   ```bash
   pnpm exec playwright test --trace on
   pnpm exec playwright show-trace
   ```

## Conceito: por que fixtures e locators semânticos

- **Fixtures** removem repetição e deixam o *setup* explícito e reutilizável.
- **Locators semânticos** (`getByRole`, `getByText`, `getByLabel`) tornam os
  testes resilientes a mudanças de marcação e mais próximos da experiência real
  do usuário.
- O **trace** grava cada ação, snapshot do DOM e rede — sua melhor ferramenta
  para depurar falhas (inclusive as intermitentes).

## Conclusão do passo

Faça commit da fixture e da configuração na branch `feature/e2e`:

```bash
git add playwright.config.js tests/e2e
git commit -m "test: fixtures, locators e execução multi-navegador"
git push
```

A automação valida a fixture e os projetos de navegador e libera o Passo 5.
