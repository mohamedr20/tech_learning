function simpleState<T>(initialState: T): [() => T, (v: T) => void] {
  let val: T = initialState;
  return [
    () => val,
    (v: T) => {
      val = v;
    },
  ];
}

// This set the <T> type to number
const [state1Getter, state1Setter] = simpleState(1);
console.log(state1Getter()); //1
state1Setter(252);
console.log(state1Getter()); // 252

// We can override the <T> type
const [state2Getter, state2Setter] = simpleState<string | null>(null);
console.log(state2Getter());

interface Rank<RankItem> {
  item: RankItem;
  rank: number;
}

function ranker<RankItem>(
  items: RankItem[],
  rank: (v: RankItem) => number
): RankItem[] {
  const ranks: Rank<RankItem>[] = items.map((item) => ({
    item,
    rank: rank(item),
  }));

  ranks.sort((a, b) => a.rank - b.rank);

  return ranks.map((rank) => rank.item);
}

interface Pokemon {
  name: string;
  hp: number;
}

const pokemon: Pokemon[] = [
  {
    name: 'Bulbasaur',
    hp: 30,
  },
  {
    name: 'Squirtle',
    hp: 25,
  },
];

const ranks = ranker(pokemon, ({ hp }) => hp);

console.log(ranks);
export {};
