function pluck<DataType, KeyType extends keyof DataType>(
  items: DataType[],
  key: KeyType
): DataType[KeyType][] {
  return items.map((item) => item[key]);
}

console.log(
  pluck(
    [
      {
        name: 'John',
        age: 20,
        1: 55,
      },
      {
        name: 'Billy',
        age: 25,
        1: 66,
      },
    ],
    1
  )
);

interface BaseEvent {
  time: number;
  user: string;
}

interface EventMap {
  addToCart: BaseEvent & { quantity: number; productId: string };
  checkoutEvent: BaseEvent;
}

function sendEvent<Name extends keyof EventMap>(
  name: Name,
  data: EventMap[Name]
): void {
  console.log([name, data]);
}

console.log(
  sendEvent('addToCart', { time: 20, user: 'Mo', quantity: 55, productId: '3' })
);

console.log(sendEvent('checkoutEvent', { time: 22, user: 'Billy' }));

export {};
