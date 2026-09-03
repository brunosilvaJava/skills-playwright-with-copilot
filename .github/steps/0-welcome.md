# Setup do ambiente

Bem-vindo ao treinamento de **testes E2E com Playwright, MCP, GitHub Copilot e
GitHub Actions**. Neste passo você prepara o ambiente.

## O que você vai fazer

1. Confirmar que o repositório foi criado a partir do template.
2. Abrir o projeto em um GitHub Codespace.
3. Instalar dependências e os navegadores do Playwright.
4. Validar que o Copilot e o servidor Playwright MCP estão disponíveis.

## Passo a passo

1. Abra o projeto em um Codespace (ou clone localmente):

   [![Open in GitHub Codespaces](https://github.com/codespaces/badge.svg)](https://codespaces.new/{{full_repo_name}}?quickstart=1)

2. Instale as dependências (Playwright, React e Vite):

   ```bash
   pnpm install
   ```

3. Instale os navegadores do Playwright:

   ```bash
   pnpm exec playwright install --with-deps
   ```

4. Suba a aplicação e confirme o Jogo da Memória no navegador:

   ```bash
   pnpm dev
   ```

   Abra `http://localhost:5173/?seed=42`. A `seed` torna a ordem das cartas
   reproduzível — essencial para testes estáveis.

5. Confirme que o **GitHub Copilot Chat** responde e que você consegue trocar de
   modo (Ask / Edit / Agent).

6. Crie a branch de trabalho do exercício e publique-a. Você vai desenvolver os
   Passos 1 a 4 nela:

   ```bash
   git checkout -b feature/e2e
   git push -u origin feature/e2e
   ```

## Conceito: contrato de testabilidade

A aplicação expõe ganchos estáveis para testes (`data-testid`, `role`, `?seed=`).
Eles estão documentados em `.github/copilot-instructions.md`. Bons ganchos são a
base de testes E2E confiáveis.

## Conclusão do passo

O setup não exige validação automática. Com a aplicação rodando, os navegadores
instalados e a branch `feature/e2e` publicada, siga para o **Passo 1**, publicado
logo abaixo nesta issue.
