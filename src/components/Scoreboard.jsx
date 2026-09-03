// Placar e controles: movimentos, tempo, dificuldade e reiniciar.
export function Scoreboard({
  moves,
  seconds,
  level,
  onLevelChange,
  onRestart,
}) {
  return (
    <section className="scoreboard">
      <div className="stats">
        <span>
          Movimentos: <strong data-testid="moves">{moves}</strong>
        </span>
        <span>
          Tempo: <strong data-testid="timer">{seconds}</strong>s
        </span>
      </div>
      <div className="controls">
        <label>
          Dificuldade
          <select
            data-testid="difficulty"
            value={level}
            onChange={(event) => onLevelChange(event.target.value)}
          >
            <option value="easy">Fácil</option>
            <option value="medium">Médio</option>
            <option value="hard">Difícil</option>
          </select>
        </label>
        <button type="button" data-testid="restart" onClick={onRestart}>
          Reiniciar
        </button>
      </div>
    </section>
  );
}
