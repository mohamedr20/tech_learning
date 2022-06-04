// Functor: function that creates another function
function myLogFunction() {
  return (str: string) => {
    console.log(str);
  };
}

const logger = myLogFunction();
logger('First log');

function createLoggerClass() {
  return class MyLoggerClass {
    private completeLog: string = '';
    log(str: string) {
      console.log(str);
      this.completeLog += str + '\n';
    }
    dumpLog() {
      return this.completeLog;
    }
  };
}

const MyLogger = createLoggerClass();
const logger2 = new MyLogger();

logger2.log('Second log');

function CreateSimpleMemoryDatabase<T>() {
  return class SimpleMemoryDatabase {
    private db: Record<string, T> = {};

    set(id: string | number, value: T) {
      this.db[id] = value;
    }

    get(id: string | number) {
      return this.db[id];
    }

    getObject(): object {
      return this.db;
    }
  };
}

const StringDatabase = CreateSimpleMemoryDatabase<string>();

const sdb1 = new StringDatabase();
sdb1.set(1, 'Hello there');
console.log(sdb1.get(1));
console.log(sdb1.getObject());

type Constructor<T> = new (...args: any[]) => T;

function Dumpable<
  T extends Constructor<{
    getObject(): object;
  }>
>(Base: T) {
  return class Dumpable extends Base {
    dump() {
      console.log(this.getObject());
    }
  };
}

const DumpableStringDatabase = Dumpable(StringDatabase);
const sdb2 = new DumpableStringDatabase();
sdb2.set('a', 'hello');
sdb2.dump();
