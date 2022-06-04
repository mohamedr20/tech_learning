interface House {
  name: string;
  planet?: string;
  planets?: string[];
}

interface HouseWithId extends House {
  id: number;
}

const houses: House[] = [
  { name: 'Atredies', planet: 'Calladan' },
  { name: 'Corrino', planets: ['Kaitan', 'Salusa Secundus'] },
];

// Houses are a JSON string in this case
function findHouses(houses: string): HouseWithId[]; //done
// Houses are map over and given an Id
function findHouses(houses: House[]): HouseWithId[]; // done
// Given a JSON of houses, filter the houses that match the boolean expression
function findHouses(
  houses: string,
  filter: (house: House) => boolean
): HouseWithId[];
// Given an array of houses, filter the houses that match the boolean expression
function findHouses(
  houses: House[],
  filter: (house: House) => boolean
): HouseWithId[];

function findHouses(arg1: unknown, arg2?: unknown) {
  if (typeof arg1 === 'string' && arg2 === undefined) {
    const houses = JSON.parse(arg1);
    return houses.map((house: House, index: number) => {
      return { id: index, ...house };
    });
  } else if (Array.isArray(arg1) && arg2 === undefined) {
    return arg1.map((house: House, index: number) => {
      return { id: index, ...house };
    });
  } else if (typeof arg1 === 'string') {
    const houses: House[] = JSON.parse(arg1);
    return houses
      .map((house: House, index: number) => {
        return { id: index, ...house };
      })
      .filter(arg2 as (house: House) => boolean);
  } else {
    return (arg1 as House[])
      .map((house: House, index: number) => {
        return { id: index, ...house };
      })
      .filter(arg2 as (house: House) => boolean);
  }
}

function refactoredFindHouses(
  input: string | House[],
  filter?: (house: House) => boolean
): HouseWithId[] {
  const houses: House[] = typeof input === 'string' ? JSON.parse(input) : input;

  return (filter ? houses.filter(filter) : houses).map((house) => ({
    id: houses.indexOf(house),
    ...house,
  }));
}

console.log(findHouses(JSON.stringify(houses)));
console.log(findHouses(houses));
console.log(
  findHouses(JSON.stringify(houses), (house) => house.name !== 'Corrino')
);
console.log(findHouses(houses, (house) => house.name !== 'Atredies'));
