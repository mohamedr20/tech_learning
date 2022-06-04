class Dog {
  // expose member variables directly
  constructor(public readonly name: string, public readonly age: number) {}
}

const dog1 = new Dog('Copper', 25);
console.log(`${dog1.age} ${dog1.name}`);

class DogList {
  private dogs: Dog[] = [];

  // Single instance of this class, means we have only one
  // instance of this dogList
  static instance: DogList = new DogList();

  // This means we make the constructor private
  // and disable creating a DogList class via calling the constructor
  private constructor() {}

  static addDog(dog: Dog) {
    DogList.instance.dogs.push(dog);
  }

  getDogs() {
    return this.dogs;
  }
}

DogList.addDog(dog1);
console.log(DogList.instance.getDogs());
