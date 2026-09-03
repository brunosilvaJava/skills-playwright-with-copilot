# Passo 6: Reusable workflows

Sua pipeline funciona, mas a lógica de rodar testes vai se repetir em outros
projetos e branches. Você vai extrair essa lógica para um **workflow
reutilizável** (`workflow_call`) e chamá-lo a partir do `e2e.yml`.

## Objetivo

Criar `.github/workflows/reusable-e2e.yml` (chamável) e transformar o `e2e.yml`
em um **caller**.

## O que você vai fazer

1. Crie `.github/workflows/reusable-e2e.yml`:

   ```yaml
   name: Reusable E2E

   on:
     workflow_call:
       inputs:
         browser:
           description: Navegador do Playwright
           type: string
           default: chromium
         node-version:
           type: string
           default: "20"

   jobs:
     test:
       runs-on: ubuntu-latest
       steps:
         - uses: actions/checkout@v4
         - uses: pnpm/action-setup@v4
         - uses: actions/setup-node@v4
           with:
             node-version: ${{ inputs.node-version }}
             cache: pnpm
         - run: pnpm install --frozen-lockfile
         - run: pnpm exec playwright install --with-deps ${{ inputs.browser }}
         - run: pnpm test:e2e --project=${{ inputs.browser }}
         - if: ${{ !cancelled() }}
           uses: actions/upload-artifact@v4
           with:
             name: playwright-report-${{ inputs.browser }}
             path: playwright-report/
             retention-days: 7
   ```

2. Reescreva `.github/workflows/e2e.yml` para **chamar** o reutilizável:

   ```yaml
   name: E2E

   on:
     push:
       branches: [main, "feature/**"]
     pull_request:

   jobs:
     chromium:
       uses: ./.github/workflows/reusable-e2e.yml
       with:
         browser: chromium
   ```

## Conceito: reusable workflows

Um workflow com `on: workflow_call` pode ser invocado por outros via `uses:`,
recebendo `inputs` (e `secrets`) e devolvendo `outputs`. Isso **elimina
duplicação** e centraliza a manutenção da CI — mude num lugar, aproveite em
todos os callers. (É também a base para rodar uma **matriz** de navegadores
chamando o mesmo reutilizável com `browser` diferente.)

## Conclusão do passo

Faça commit dos workflows na branch `feature/e2e`:

```bash
git add .github/workflows/reusable-e2e.yml .github/workflows/e2e.yml
git commit -m "ci: extrai workflow reutilizável de E2E"
git push
```

A automação valida o workflow reutilizável e libera o encerramento. Para concluir
o treinamento, **abra um Pull Request da `feature/e2e` para a `main` e faça o
merge**.
