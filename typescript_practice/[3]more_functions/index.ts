// Function passed in as parameters can also be typed
function printToFile(text: string, callback: () => void): void {
  console.log(text);
  callback();
}

type MutationFunction = (n: number) => number;

function arrayMutate(numbers: number[], mutate: MutationFunction): number[] {
  return numbers.map(mutate);
}

console.log(arrayMutate([1, 2, 3], (n) => n * 10)); // [10, 20, 30];

// A return value that is a function can also be typed
function createAdder(n: number): (val: number) => number {
  return (val: number) => n + val;
}

const add = createAdder(5)(3);

export {};
