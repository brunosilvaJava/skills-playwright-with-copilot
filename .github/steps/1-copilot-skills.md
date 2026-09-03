# Passo 1: Copilot Skills — criando um Skill

Antes de escrever testes, você vai conhecer os recursos de **customização do
GitHub Copilot** e criar o primitivo que ainda falta neste repositório: um
**Skill** (`SKILL.md`).

## Objetivo

Criar um **Skill** em `.github/skills/e2e-testing/SKILL.md` que empacota o fluxo
de testes E2E do projeto (com um asset reutilizável).

## Primitivos de customização

Já existem neste repositório (abra e explore):

- `.github/copilot-instructions.md` — instruções do projeto, sempre ativas.
- `.github/instructions/playwright.instructions.md` — instruções por `applyTo`
  (só em `tests/**`).
- `.github/agents/` — agentes `planner`, `playwright`, `tdd`, `code-reviewer`.
- `.github/prompts/` — prompts `/gerar-teste-e2e`, `/explorar-com-mcp`.

Falta um: o **Skill**. Diferente de um prompt (tarefa única), um Skill é um
**workflow sob demanda** que carrega instruções e **assets** (scripts,
templates, docs) só quando é acionado.

## O que você vai fazer

1. Crie a pasta `.github/skills/e2e-testing/` com um `SKILL.md`:

   ````markdown
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
   ````

2. Crie o asset do Skill copiando o modelo existente:

   ```bash
   mkdir -p .github/skills/e2e-testing/assets
   cp docs/test-plan-template.md .github/skills/e2e-testing/assets/test-plan-template.md
   ```

3. No Copilot Chat, digite `/` e confirme que o Skill **`e2e-testing`** aparece.
   Acione-o e gere um plano de testes salvando em `docs/test-plan.md`.

## Conceito: Skill vs. Prompt vs. Agente

- **Prompt**: uma tarefa única e parametrizada.
- **Skill**: um workflow sob demanda com **assets** empacotados; é descoberto
  pela `description` (por isso ela deve ser rica em palavras-chave).
- **Agente**: isolamento de contexto e/ou restrições de ferramentas por etapa.

O `name` do Skill **precisa** ser igual ao nome da pasta.

## Conclusão do passo

Faça commit do Skill na branch `feature/e2e`:

```bash
git add .github/skills/e2e-testing
git commit -m "feat: skill e2e-testing com asset de plano de testes"
git push
```

A automação valida a presença do `SKILL.md` e libera o Passo 2.
