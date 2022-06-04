// Foreach
// forEach((element, index, array))

function myForEach<Type>(items: Type[], forEachFn: (item: Type) => void): void {
  items.reduce((previousValue, currentValue) => {
    forEachFn(currentValue);
    return undefined;
  }, undefined);
}

myForEach([1, 2, 3, 4], (item) => console.log(item));

// filter

function myFilter<Type>(
  items: Type[],
  filterFn: (item: Type) => boolean
): Type[] {
  return items.reduce((previousValue: never | Type[], currentValue) => {
    filterFn(currentValue) ? previousValue.push(currentValue) : previousValue;
    return previousValue;
  }, []);
}

console.log(myFilter([1, 2, 3, 4], (item) => item % 2 === 0));

// map

function myMap<Type, K>(items: Type[], mapFn: (item: Type) => K): K[] {
  return items.reduce((previousVal, currentVal) => {
    return [...previousVal, mapFn(currentVal)];
  }, [] as K[]);
}

console.log(myMap([3, 6, 9], (item) => item * 2));
//using the reduce function
