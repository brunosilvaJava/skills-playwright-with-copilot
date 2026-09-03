import { Card } from './Card.jsx';

// Tabuleiro em grade. O número de colunas acompanha a quantidade de cartas.
export function Board({ cards, stateOf, onFlip }) {
  const columns = Math.ceil(Math.sqrt(cards.length));

  return (
    <section
      className="board"
      data-testid="board"
      style={{ '--columns': columns }}
    >
      {cards.map((card, index) => (
        <Card
          key={card.id}
          index={index}
          value={card.value}
          state={stateOf(index)}
          onFlip={onFlip}
        />
      ))}
    </section>
  );
}
