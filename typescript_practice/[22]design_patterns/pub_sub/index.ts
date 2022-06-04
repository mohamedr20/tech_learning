export class Subscribable<MessageType> {
  private subscribers: Set<(msg: MessageType) => void> = new Set();
  constructor() {}

  subscribe(cb: (msg: MessageType) => void): () => void {
    this.subscribers.add(cb);
    return () => {
      this.subscribers.delete(cb);
    };
  }

  publish(msg: MessageType): void {
    this.subscribers.forEach((subscriber) => {
      subscriber(msg);
    });
  }
}

const sub = new Subscribable<string>();
const unsubscribe = sub.subscribe(console.log);
sub.publish('Hello');
sub.publish('fello');
unsubscribe();
sub.publish('tello');

class DataClass extends Subscribable<number> {
  constructor(public value: number) {
    super();
  }

  setValue(n: number) {
    this.value = n;
    this.publish(n);
  }
}

const dc = new DataClass(0);
const dcUnsub = dc.subscribe((v: number) => console.log(`DC data ${v}`));

dc.setValue(45);

dcUnsub();

dc.setValue(22);

function createSubscribable<MessageType>() {
  const subscribers: Set<(msg: MessageType) => void> = new Set();

  return {
    subscribe(cb: (msg: MessageType) => void): () => void {
      subscribers.add(cb);
      return () => {
        subscribers.delete(cb);
      };
    },

    publish(msg: MessageType): void {
      subscribers.forEach((subscriber) => {
        subscriber(msg);
      });
    },
  };
}

console.log(`================Function=============`);

const sub1 = createSubscribable();
const unsubscribe1 = sub1.subscribe(console.log);
sub1.publish('Hello');
sub1.publish('fello');
unsubscribe1();
sub1.publish('tello');
