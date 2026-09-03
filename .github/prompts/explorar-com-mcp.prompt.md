---
description: Explora a aplicação com o servidor Playwright MCP e propõe cenários de teste.
name: explorar-com-mcp
argument-hint: fluxo a explorar (ex. vitória com a seed 42)
agent: agent
---

# Explorar com Playwright MCP

Usando as ferramentas do servidor **Playwright MCP**, abra a aplicação em
`http://localhost:5173/?seed=42` e explore o fluxo:
`${input:fluxo:fluxo a explorar}`.

Passos:

1. Navegue até a aplicação e capture o snapshot de acessibilidade da página.
2. Interaja com o tabuleiro (virar cartas, reiniciar, trocar dificuldade)
   conforme o fluxo pedido.
3. A partir do que observar, proponha 2 a 3 cenários de teste E2E, listando os
   locators e asserts recomendados.
4. Não crie os arquivos ainda; apenas descreva os cenários para revisão.
