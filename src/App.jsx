import { Board } from './components/Board.jsx';
import { Scoreboard } from './components/Scoreboard.jsx';
import { useMemoryGame } from './game/useMemoryGame.js';

// Lê a seed opcional da URL (?seed=NNN) para tornar o embaralhamento
// reproduzível durante os testes E2E.
function getSeedFromUrl() {
  const params = new URLSearchParams(window.location.search);
  const raw = params.get('seed');
  return raw !== null ? Number(raw) : undefined;
}

export default function App() {
  const seed = getSeedFromUrl();
  const game = useMemoryGame({ difficulty: 'easy', seed });

  return (
    <main className="app">
      <h1>Jogo da Memória</h1>

      <Scoreboard
        moves={game.moves}
        seconds={game.seconds}
        level={game.level}
        onLevelChange={(nextLevel) => game.reset(nextLevel)}
        onRestart={() => game.reset()}
      />

      <Board cards={game.cards} stateOf={game.stateOf} onFlip={game.flip} />

      {/*
        Passo 3 (TDD): a mensagem de vitória ainda NÃO é exibida.
        Você vai escrever um teste E2E que falha e, então, implementar aqui
        a renderização usando `game.won` para o teste passar.
      */}
    </main>
  );
}
