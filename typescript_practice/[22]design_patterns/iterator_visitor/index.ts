import axios from 'axios';

//type Visitor<DataType> = (results: DataType[]) => void;
type Maybe<T> = T | undefined;

class VisitAllPages<DataType> {
  constructor(private baseUrl: string) {}

  async visit(visitor: (results: DataType[]) => void) {
    let nextUrl: Maybe<string> = this.baseUrl;
    do {
      const response = await axios.get(nextUrl);
      const json: {
        next?: string;
        results: DataType[];
      } = await response.data;

      visitor(json.results);
      nextUrl = json.next;
    } while (nextUrl);
  }
}

interface Pokemon {
  name: string;
  url: string;
}

const visitor = new VisitAllPages<Pokemon[]>(
  'https://pokeapi.co/api/v2/pokemon'
);

//visitor.visit((results) => {
// console.log(results);
//});

//===============Function==================/

async function visit<DataType>(
  baseUrl: string,
  visitor: (results: DataType[]) => void
) {
  let nextUrl: Maybe<string> = baseUrl;

  do {
    const response = await axios.get(nextUrl);
    const json: {
      next?: string;
      results: DataType[];
    } = await response.data;

    visitor(json.results);
    nextUrl = json.next;
  } while (nextUrl);
}

//visit<Pokemon[]>('https://pokeapi.co/api/v2/pokemon', (results) => {
// console.log(results);
//});

//=================Iterator=================/

async function* iterateResults<DataType>(baseUrl: string) {
  let nextUrl: Maybe<string> = baseUrl;
  do {
    const response = await axios.get(nextUrl);
    const json: {
      next?: string;
      results: DataType[];
    } = await response.data;

    yield* json.results;
    nextUrl = json.next;
  } while (nextUrl);
}

(async function () {
  for await (const result of iterateResults<Pokemon>(
    'https://pokeapi.co/api/v2/pokemon'
  )) {
    if (result.name === 'pikachu') {
      break;
    }
    console.log(result);
  }
})();
