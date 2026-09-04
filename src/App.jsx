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

      {game.won ? (
        <p className="win" data-testid="win-message" role="status">
          Você venceu! Você fez {game.moves} movimentos.
        </p>
      ) : null}
    </main>
  );
}
