import axios from 'axios';

interface PokemonResults {
  count: number;
  next?: string;
  previous?: string;
  results: {
    name: string;
    url: string;
  }[];
}

type FetchPokemonResult<T> = T extends undefined
  ? Promise<PokemonResults>
  : void;

function fetchPokemon<
  T extends undefined | ((value: PokemonResults | unknown) => void)
>(url: string, cb?: T): FetchPokemonResult<T> {
  if (cb) {
    axios
      .get(url)
      .then((res) => res.data)
      .then(cb);
    return undefined as FetchPokemonResult<T>;
  } else {
    return fetch(url).then((res) => res.json()) as FetchPokemonResult<T>;
  }
}

fetchPokemon(
  'https://pokeapi.co/api/v2/pokemon?limit=10',
  (value: PokemonResults | unknown) => {
    (value as PokemonResults).results.forEach((pokemon) => {
      console.log(pokemon);
    });
  }
);
