# Passo 3: TDD E2E — Red, Green, Refactor

A aplicação ainda **não anuncia a vitória**. Você vai adicionar essa feature
guiado por testes, no ciclo Red-Green-Refactor, com o agente `tdd`.

## Objetivo

Fazer o Jogo da Memória exibir a mensagem de vitória, começando por um teste E2E
que falha.

## O que você vai fazer

1. Selecione o agente **`tdd`** no Copilot Chat.
2. **Red** — escreva um teste em `tests/e2e/win.spec.js` que completa o jogo (com
   `?seed=42`) e espera ver a mensagem de vitória. Rode e veja **falhar**.
3. **Green** — implemente em `src/App.jsx` a renderização da mensagem usando
   `game.won`, com `data-testid="win-message"` e `role="status"`.
4. **Refactor** — melhore o que for preciso mantendo o teste verde.

## Dica: como completar o jogo com a seed

Com `?seed=42`, a ordem das cartas é fixa. Leia o `data-value` de cada carta
para encontrar os pares e vire-os na sequência. O agente `playwright` pode
ajudar a montar essa lógica.

## Prompt sugerido (Red)

```
Escreva um teste E2E em tests/e2e/win.spec.js que abra /?seed=42, complete todos
os pares do Jogo da Memória e verifique que aparece getByTestId('win-message')
com o texto de vitória e o total de movimentos. Use locators semânticos e não
use waitForTimeout. Rode o teste e confirme que ele falha.
```

## Conceito: TDD em E2E

Escrever o teste primeiro força você a definir o **comportamento observável**
antes da implementação. O teste vermelho vira sua especificação executável; o
verde comprova que a feature atende ao esperado.

## Conclusão do passo

Com o teste verde, faça commit na branch `feature/e2e`:

```bash
git add src/App.jsx tests/e2e/win.spec.js
git commit -m "feat: exibe mensagem de vitória (TDD)"
git push
```

A automação valida a mensagem de vitória na aplicação e o teste e libera o Passo 4.
