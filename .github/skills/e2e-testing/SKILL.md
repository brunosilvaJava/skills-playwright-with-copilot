---
name: e2e-testing
description: 'Cria e roda testes E2E com Playwright no Jogo da Memória. Use ao planejar cenários, gerar specs ou depurar falhas de UI.'
argument-hint: comportamento a testar (ex. contar movimentos)
---

# Testes E2E do Jogo da Memória

## Quando usar
- Planejar cenários de teste do Jogo da Memória.
- Gerar novas specs de Playwright.
- Depurar falhas de UI.

## Procedimento
1. Consulte o contrato de testabilidade em `.github/copilot-instructions.md`.
2. Explore o fluxo com `/explorar-com-mcp` (Playwright MCP) usando `/?seed=42`.
3. Gere a spec em `tests/e2e/` com locators semânticos, sem `waitForTimeout`.
4. Preencha o plano a partir do template em [assets](./assets/test-plan-template.md).
5. Rode `pnpm test:e2e` e reporte o resultado.