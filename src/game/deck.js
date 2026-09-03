// Lógica pura do baralho do Jogo da Memória.
// Mantida separada dos componentes React para ser fácil de testar e de raciocinar.

export const DIFFICULTIES = { easy: 4, medium: 6, hard: 8 };

const SYMBOLS = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];

// PRNG determinístico (mulberry32). Com a mesma seed, a ordem das cartas é
// sempre a mesma — essencial para testes E2E estáveis (use ?seed=NNN na URL).
export function mulberry32(seed) {
  let a = seed >>> 0;
  return function next() {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

// Embaralhamento de Fisher-Yates usando o gerador fornecido.
export function shuffle(items, rng) {
  const result = [...items];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

// Cria o baralho embaralhado com `pairs` pares de cartas.
// Sem seed, usa Math.random (jogo real). Com seed, é reproduzível.
export function createDeck(pairs, seed) {
  const values = SYMBOLS.slice(0, pairs);
  const cards = values.flatMap((value, i) => [
    { id: i * 2, value },
    { id: i * 2 + 1, value },
  ]);
  const rng =
    seed === undefined || Number.isNaN(seed) ? Math.random : mulberry32(seed);
  return shuffle(cards, rng);
}
