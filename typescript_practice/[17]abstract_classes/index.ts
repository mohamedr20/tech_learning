// Abstract means we cannot instiate it directly
abstract class StreetFighter {
  constructor() {}

  move() {}
  fight() {
    console.log(`${this.name} attack with ${this.getSpecialAttack()}`);
  }

  abstract getSpecialAttack(): string;
  abstract get name(): string;
}

// Can't instiate instance of an abstract class
//const ryu = new StreetFighter()

class Ryu extends StreetFighter {
  getSpecialAttack(): string {
    return 'Hadoken';
  }

  get name(): string {
    return 'Ryu';
  }
}

class ChunLi extends StreetFighter {
  getSpecialAttack(): string {
    return 'Lightning Kick';
  }

  get name(): string {
    return 'ChunLi';
  }
}

const ryu = new Ryu();
const chunLi = new ChunLi();

console.log(ryu.getSpecialAttack());
console.log(ryu.fight());

console.log(chunLi.getSpecialAttack());
console.log(chunLi.fight());

export {};
