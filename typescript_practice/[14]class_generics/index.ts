interface Database<DataType, KeyType> {
  get(id: KeyType): DataType;
  set(id: KeyType, value: DataType): void;
}

interface Persistable {
  saveToString(): string;
  restoreFromString(storedString: string): void;
}

type DBKeyType = string | number | symbol;

class inMemoryDatabase<DataType, KeyType extends DBKeyType>
  implements Database<DataType, KeyType>
{
  // private means only this class can see it
  // protected means this class and
  //any of it's decendants can see and change it

  // public means any class can see and change it
  protected db: Record<KeyType, DataType> = {} as Record<KeyType, DataType>;
  get(id: KeyType): DataType {
    return this.db[id];
  }
  set(id: KeyType, value: DataType): void {
    this.db[id] = value;
  }
}

class PersistentMemoryDb<DataType, KeyType extends DBKeyType>
  extends inMemoryDatabase<DataType, KeyType>
  implements Persistable
{
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
const myDb1 = new PersistentMemoryDb<number, string>();
myDb1.set('age', 25);

console.log(myDb1.get('age'));

const saved = myDb1.saveToString(); // Freeze state as JSON string

myDb1.set('age', 33); // Mutate name field
console.log(myDb1.get('age'));
//////////////////////////////////////

const myDb2 = new PersistentMemoryDb<number, string>();
myDb2.restoreFromString(saved); // Fetch state from JSON string
console.log(myDb2.get('age')); // Outputs old state

export {};
