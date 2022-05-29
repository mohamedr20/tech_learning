interface Database {
  get(id: string): string;
  set(id: string, value: string): void;
}

interface Persistable {
  saveToString(): string;
  restoreFromString(storedString: string): void;
}

class inMemoryDatabase implements Database {
  // private means only this class can see it
  // protected means this class and
  //any of it's decendants can see and change it

  // public means any class can see and change it
  protected db: Record<string, string> = {};
  get(id: string): string {
    return this.db[id];
  }
  set(id: string, value: string): void {
    this.db[id] = value;
  }
}

class PersistentMemoryDb extends inMemoryDatabase implements Persistable {
  saveToString(): string {
    return JSON.stringify(this.db);
  }
  restoreFromString(storedState: string): void {
    this.db = JSON.parse(storedState);
  }
}

//const myDb = new inMemoryDatabase();
//myDb.set('name', 'Mohamed');

//console.log(myDb.get('name'));
//////////////////////////////////////
const myDb1 = new PersistentMemoryDb();
myDb1.set('name', 'Maxi');

console.log(myDb1.get('name'));

const saved = myDb1.saveToString(); // Freeze state as JSON string

myDb1.set('name', 'Maxi - 1'); // Mutate name field
console.log(myDb1.get('name'));
//////////////////////////////////////

const myDb2 = new PersistentMemoryDb();
myDb2.restoreFromString(saved); // Fetch state from JSON string
console.log(myDb2.get('name')); // Outputs old state

export {};
