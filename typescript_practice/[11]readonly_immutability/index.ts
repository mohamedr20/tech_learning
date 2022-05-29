interface Cat {
  name: string;
  breed: string;
}

type ReadOnlyCat = Readonly<Cat>;

// Properties can now only be read and not mutated
function makeCat(name: string, breed: string): ReadOnlyCat {
  return { name, breed };
}

const umar = makeCat('Umar', 'Tabby');

function makeCoordinate(
  x: number,
  y: number,
  z: number
): readonly [number, number, number] {
  return [x, y, z];
}

const c1 = makeCoordinate(10, 20, 30);
// c1[0] = 50;

// Means the contents of the array are also constants
const reallyAConstant = [1, 2, 3] as const;
// reallyAConstant[0] = 50;
