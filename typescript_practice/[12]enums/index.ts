const beforeLoad = 'beforeLoad';
const loading = 'loading';
const loaded = 'loaded';

enum LoadingState {
  beforeLoad = 'beforeLoad',
  loading = 'loading',
  loaded = 'loaded',
}
const isLoading = (state: LoadingState) => state === loading;

console.log(isLoading(LoadingState.loading));

// Literal types

// only accept 1,2 or a 3 as a param
function rollDice(dice: 1 | 2 | 3): number {
  let pip = 0;
  for (let i = 0; i < dice; i++) {
    pip += Math.floor(Math.random() * 5) + 1;
  }
  return pip;
}

// Will not accept this
//console.log(rollDice(4));

console.log(rollDice(2));

function sendEvent(name: 'addToCart', data: { productId: number }): void;
function sendEvent(name: 'checkout', data: { cartCount: number }): void;
function sendEvent(name: string, data: unknown): void {
  console.log(`${name}, ${JSON.stringify(data)}`);
}

console.log(sendEvent('addToCart', { productId: 4 }));
console.log(sendEvent('checkout', { cartCount: 4 }));
