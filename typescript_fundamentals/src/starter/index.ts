

/**
 * Create a promise that resolves after some time
 * @param n is the number of miliseconds before promise resolve
 */

function timeout(n:number){
  return new Promise((res) => setTimeout(res,n))
}

/**
 * Add three numbers
 * @param a is the first number
 * @param b is the second number
 */

export async function addNumbers(a: number, b: number):Promise<number>{
  await timeout(2000)
  return a + b;
}

(async () => {
  console.log(await addNumbers(3,4));
})()