// Uma carta do tabuleiro.
// data-value fica SEMPRE no DOM como gancho de teste (permite localizar o par),
// mas o valor só aparece visualmente quando a carta está virada para cima.
export function Card({ index, value, state, onFlip }) {
  const isFaceUp = state === 'revealed' || state === 'matched';

  return (
    <button
      type="button"
      className={`card card--${state}`}
      data-testid="card"
      data-index={index}
      data-value={value}
      data-state={state}
      aria-label={isFaceUp ? `Carta ${value}` : 'Carta virada para baixo'}
      onClick={() => onFlip(index)}
    >
      <span className="card__face" aria-hidden={!isFaceUp}>
        {isFaceUp ? value : ''}
      </span>
    </button>
  );
}
