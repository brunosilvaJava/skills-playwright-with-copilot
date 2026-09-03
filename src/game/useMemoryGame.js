import { useCallback, useEffect, useState } from 'react';
import { createDeck, DIFFICULTIES } from './deck.js';

// Hook com toda a máquina de estados do jogo: virar cartas, detectar pares,
// contar movimentos, cronometrar e reconhecer a vitória.
export function useMemoryGame({ difficulty = 'easy', seed } = {}) {
  const [level, setLevel] = useState(difficulty);
  const [cards, setCards] = useState(() =>
    createDeck(DIFFICULTIES[difficulty], seed),
  );
  const [revealed, setRevealed] = useState([]); // índices virados agora (máx. 2)
  const [matched, setMatched] = useState([]); // índices já encontrados
  const [moves, setMoves] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [locked, setLocked] = useState(false); // trava breve ao errar o par

  const won = matched.length > 0 && matched.length === cards.length;

  // Cronômetro: começa após o primeiro movimento e para na vitória.
  useEffect(() => {
    if (moves === 0 || won) return undefined;
    const id = setInterval(() => setSeconds((s) => s + 1), 1000);
    return () => clearInterval(id);
  }, [moves, won]);

  const reset = useCallback(
    (nextLevel = level) => {
      setLevel(nextLevel);
      setCards(createDeck(DIFFICULTIES[nextLevel], seed));
      setRevealed([]);
      setMatched([]);
      setMoves(0);
      setSeconds(0);
      setLocked(false);
    },
    [level, seed],
  );

  const flip = useCallback(
    (index) => {
      if (locked) return;
      if (revealed.includes(index) || matched.includes(index)) return;

      const next = [...revealed, index];
      setRevealed(next);

      if (next.length === 2) {
        setMoves((m) => m + 1);
        const [a, b] = next;
        if (cards[a].value === cards[b].value) {
          setMatched((prev) => [...prev, a, b]);
          setRevealed([]);
        } else {
          setLocked(true);
          setTimeout(() => {
            setRevealed([]);
            setLocked(false);
          }, 700);
        }
      }
    },
    [locked, revealed, matched, cards],
  );

  const stateOf = useCallback(
    (index) => {
      if (matched.includes(index)) return 'matched';
      if (revealed.includes(index)) return 'revealed';
      return 'hidden';
    },
    [matched, revealed],
  );

  return { cards, level, moves, seconds, won, flip, reset, stateOf };
}
