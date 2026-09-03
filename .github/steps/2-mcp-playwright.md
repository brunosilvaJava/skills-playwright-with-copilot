# Passo 2: Playwright + MCP — o primeiro teste

Agora você vai conectar o Copilot ao **Playwright MCP** e deixar o agente
**dirigir o navegador** para explorar a aplicação e gerar o primeiro teste.

## Objetivo

Configurar o servidor Playwright MCP e criar o primeiro teste E2E em
`tests/e2e/`.

## O que você vai fazer

1. Crie o arquivo `.vscode/mcp.json` registrando o servidor Playwright MCP:

   ```json
   {
     "servers": {
       "playwright": {
         "command": "pnpm",
         "args": ["dlx", "@playwright/mcp@latest"]
       }
     }
   }
   ```

2. Recarregue a janela e confirme, no Copilot Chat (modo **Agent**), que as
   ferramentas do `playwright` MCP aparecem disponíveis.
3. Com a aplicação rodando (`pnpm dev`), use o prompt `/explorar-com-mcp`
   para o agente navegar até `http://localhost:5173/?seed=42`, ler o snapshot de
   acessibilidade e propor cenários.
4. Gere o primeiro teste (smoke) e salve em `tests/e2e/smoke.spec.js`.

## Conceito: MCP (Model Context Protocol)

O MCP padroniza como o Copilot conversa com ferramentas externas. O **Playwright
MCP** dá ao agente ferramentas para navegar, clicar, digitar e inspecionar o DOM
real — em vez de "adivinhar" seletores, ele **observa** a página e escreve
testes fundamentados no que existe.

## Exemplo de smoke test

```js
import { test, expect } from '@playwright/test';

test('renders the board with the win state hidden', async ({ page }) => {
  await page.goto('/?seed=42');
  await expect(page.getByTestId('board')).toBeVisible();
  await expect(page.getByTestId('card')).toHaveCount(8);
  await expect(page.getByTestId('moves')).toHaveText('0');
});
```

## Conclusão do passo

Rode os testes localmente:

```bash
pnpm test:e2e
```

Faça commit do `.vscode/mcp.json` e do primeiro teste na branch `feature/e2e`:

```bash
git add .vscode/mcp.json tests/e2e
git commit -m "test: primeiro smoke test gerado via Playwright MCP"
git push
```

A automação valida a presença de um teste em `tests/e2e/` e libera o Passo 3.
