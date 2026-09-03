# Modelo de plano de testes E2E

Use este modelo como base ao gerar `docs/test-plan.md` no Passo 1.
Preencha com o agente `planner` do Copilot.

## Fluxos críticos

- Renderização inicial do tabuleiro
- Virar cartas e revelar valor
- Formar um par (match)
- Errar o par (as cartas voltam a esconder)
- Contagem de movimentos
- Cronômetro
- Vitória
- Reiniciar
- Trocar dificuldade

## Cenários

Para cada cenário, descreva:

| Campo | Descrição |
| --- | --- |
| Cenário | Nome curto do comportamento |
| Pré-condições | Estado inicial (ex.: `/?seed=42`) |
| Ações | Passos do usuário |
| Asserts | Resultado observável esperado |
| Locators | `getByRole` / `getByTestId` a usar |
| Riscos | Pontos de flakiness e mitigação |
