let userName: string = 'User';
let userId: number = 1;

let myRegex: RegExp = /foo/;

const names: string[] = userName.split('');
const myValues: Array<number> = [1, 2, 3, 4];

const myPerson: Person = {
  first: 'Mohamed',
  last: 'Isse',
};

// Use interfaces to type objects

interface Person {
  first: string;
  last: string;
  isLoggedIn?: boolean;
}

export function reverseWords(str: string): string {
  // your code here
  console.log(str.split(' '));
  return 'Go for it';
}

console.log(reverseWords('The quick brown fox jumps over the lazy dog.'));
// ehT kciuq nworb xof spmuj revo eht yzal .god'

// We can also use objects as maps, if we use the Record type
const ids: Record<number, string> = {
  10: 'a',
  20: 'b',
};

ids[30] = 'd';

// We should let typescript infer types when it comes to loops
for (let i = 0; i <= 10; i++) {
  //console.log(i);
}

const addOne: number[] = [1, 2, 3].map((a) => a + 1);

export {};
