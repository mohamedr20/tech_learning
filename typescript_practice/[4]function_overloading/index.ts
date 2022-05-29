interface Coordinate {
  x: number;
  y: number;
}

function parseCoordinate(str: string): Coordinate;
function parseCoordinate(obj: Coordinate): Coordinate;
function parseCoordinate(x: number, y: number): Coordinate;
// Unknown is like any, but it has to be typed before it's used
function parseCoordinate(arg1: unknown, arg2?: unknown): Coordinate {
  let coord: Coordinate = {
    x: 0,
    y: 0,
  };

  if (typeof arg1 === 'string') {
    (arg1 as string).split(',').forEach((str) => {
      const [key, value] = str.split(':');
      console.log(key, value);
      coord[key as keyof Coordinate] = parseInt(value, 10);
    });
  } else if (typeof arg1 === 'object') {
    coord = {
      ...(arg1 as Coordinate), // Need to type cast for first case
    };
  } else {
    coord = {
      x: arg1 as number, // Type cast to match the second case
      y: arg2 as number, // Type cast to match the second case
    };
  }

  return coord;
}

// Function overloads allow us to have different params
// for the same function
console.log(parseCoordinate(10, 20));
console.log(parseCoordinate({ x: 52, y: 32 }));
console.log(parseCoordinate('x:12,y:22'));
export {};
