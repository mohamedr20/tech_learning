// We can add optional params into a function param
function printIngredient(quantity: string, ingredient: string, extra?: string) {
  console.log(`${quantity} ${ingredient} ${extra}`);
}

printIngredient('1C', 'Flour');
printIngredient('2C', 'Sugar', 'something else');

interface User {
  id: string;
  info?: {
    email?: string;
  };
}

// Exclamation marks are placed to make compiler
// sure that a value is there
function getEmail(user: User): string {
  if (user.info) {
    return user.info!.email!;
  }
  return '';
}

// Return user email if they exsist otherwise return null
function getEmailEasy(user: User): string {
  return user?.info?.email ?? '';
}

function addWithCallback(x: number, y: number, callback?: () => void) {
  console.log([x, y]);
  callback?.(); // Only call this function if it is defined
}
