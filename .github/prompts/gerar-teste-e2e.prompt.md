---
description: Gera um teste E2E com Playwright para um comportamento do Jogo da Memória.
name: gerar-teste-e2e
argument-hint: comportamento a testar (ex. contar movimentos ao virar duas cartas)
agent: playwright
---

# Gerar teste E2E

Crie um teste E2E com `@playwright/test` para o comportamento:
`${input:comportamento:comportamento a testar}`.

Requisitos:

- Coloque o arquivo em `tests/e2e/` com nome descritivo em inglês
  (ex.: `moves.spec.js`).
- Use locators semânticos; recorra a `data-testid` só quando necessário.
- Torne o teste determinístico navegando para `/?seed=42`.
- Não use `waitForTimeout`; confie na auto-espera e em asserts do `expect`.
- Consulte o contrato de testabilidade em `.github/copilot-instructions.md`.
- Ao final, rode `pnpm test:e2e` e mostre o resultado.
