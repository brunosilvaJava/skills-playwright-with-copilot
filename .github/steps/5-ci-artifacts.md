# Passo 5: CI com GitHub Actions + Artifacts

Testes só protegem de verdade quando rodam automaticamente. Você vai criar uma
pipeline que executa o Playwright a cada push/PR e **publica o relatório e os
traces como artifacts**.

## Objetivo

Criar `.github/workflows/e2e.yml` que instala, roda os testes E2E e faz upload
dos artefatos do Playwright.

## O que você vai fazer

Crie `.github/workflows/e2e.yml`:

```yaml
name: E2E

on:
  push:
    branches: [main, "feature/**"]
  pull_request:

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - uses: pnpm/action-setup@v4

      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: pnpm

      - name: Instalar dependências
        run: pnpm install --frozen-lockfile

      - name: Instalar navegadores do Playwright
        run: pnpm exec playwright install --with-deps chromium

      - name: Rodar testes E2E
        run: pnpm test:e2e

      - name: Publicar relatório HTML
        if: "!cancelled()"
        uses: actions/upload-artifact@v4
        with:
          name: playwright-report
          path: playwright-report/
          retention-days: 7

      - name: Publicar traces em caso de falha
        if: failure()
        uses: actions/upload-artifact@v4
        with:
          name: playwright-traces
          path: test-results/
          retention-days: 7
```

## Conceito: artifacts

**Artifacts** guardam arquivos gerados por um job (relatórios, traces,
screenshots) para você baixar depois da execução. Combinados com
`if: !cancelled()` / `if: failure()`, garantem evidências mesmo quando o build
quebra — chave para depurar falhas de CI.

## Conclusão do passo

Faça commit da pipeline na branch `feature/e2e`:

```bash
git add .github/workflows/e2e.yml
git commit -m "ci: pipeline E2E com upload de relatório e traces"
git push
```

A automação valida a presença de `.github/workflows/e2e.yml` e libera o Passo 6.
