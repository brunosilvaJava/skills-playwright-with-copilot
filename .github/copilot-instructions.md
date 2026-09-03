# Instruções do projeto para o GitHub Copilot

Este repositório é um treinamento de **testes end-to-end (E2E)** com
**Playwright**, dirigido por **GitHub Copilot** e integrado ao **GitHub Actions**.
A aplicação-alvo é um **Jogo da Memória** (React + Vite) na raiz do repositório.

## Estrutura

- `src/` — Jogo da Memória (React 19 + Vite). Client-side, sem backend.
- `index.html` / `vite.config.js` — entrada e configuração do Vite.
- `tests/e2e/` — specs do Playwright (`*.spec.js`).
- `playwright.config.js` — configuração do Playwright (na raiz).
- `.github/` — curso interativo (steps + workflows), instructions, agents,
  prompts e skills do Copilot.

## Convenções de código

- Código, nomes de arquivos, identificadores e nomes de teste em **en-us**.
- Textos didáticos e comentários explicativos em **pt-br**.
- JavaScript com ESM (`type: module`). Sem TypeScript.
- Testes usam `@playwright/test` (`test`, `expect`).
- Gerenciador de pacotes: **pnpm** (use `pnpm`, `pnpm dev`, `pnpm test:e2e`,
  `pnpm exec ...`).
- Lint e formatação: **Biome** (`pnpm lint` e `pnpm format`). Sem ESLint/Prettier.

## Convenções de testes E2E

- Prefira **locators semânticos**: `getByRole`, `getByText`, `getByLabel`.
- Use `data-testid` apenas quando não houver um papel/acessível adequado.
- Nada de `waitForTimeout` fixo: confie na auto-espera do Playwright e em
  asserts com `expect(...).toHaveText/toBeVisible`.
- Deixe os testes determinísticos usando a seed do jogo: navegue para
  `/?seed=42` para uma ordem de cartas reproduzível.
- Um teste, um comportamento. Mantenha os testes curtos, isolados e legíveis.

## Contrato de testabilidade da aplicação

- Tabuleiro: `data-testid="board"`.
- Carta: `data-testid="card"` com `data-index`, `data-value` (sempre presente,
  gancho de teste) e `data-state` = `hidden | revealed | matched`.
- Movimentos: `data-testid="moves"`. Tempo: `data-testid="timer"`.
- Vitória: `data-testid="win-message"` (`role="status"`).
- Botão reiniciar: `getByRole('button', { name: 'Reiniciar' })`.
- Dificuldade: `data-testid="difficulty"` (`Fácil` / `Médio` / `Difícil`).
