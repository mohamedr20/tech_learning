type Name = {
  first: string;
  last: string;
};

function addFullName(name: Name): Name & {
  fullName: string;
} {
  return {
    ...name,
    fullName: `${name.first} ${name.last}`,
  };
}

function permuteRows<T extends (...arg: any[]) => any>(
  iteratorFunc: T,
  data: Parameters<T>[0][]
): ReturnType<T>[] {
  return data.map(iteratorFunc);
}

console.log(
  permuteRows(addFullName, [
    {
      first: 'bill',
      last: 'myers',
    },
    {
      first: 'bill',
      last: 'myron',
    },
  ])
);

class PersonWithFullName {
  constructor(public name: Name) {}

  get fullName() {
    return `${this.name.first} ${this.name.last}`;
  }
}

function permuteRowsForClass<T extends new (...arg: any[]) => any>(
  objectType: T,
  data: ConstructorParameters<T>[0][]
): InstanceType<T>[] {
  return data.map((item) => new objectType(item));
}

console.log(
  permuteRowsForClass(PersonWithFullName, [
    {
      first: 'bill',
      last: 'myers',
    },
    {
      first: 'bill',
      last: 'myron',
    },
  ])
);
