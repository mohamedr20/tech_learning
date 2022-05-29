// We can type a function's parameters as well as it's return value type
const addOne = (a: number, b: number): number => {
  return a + b;
};

// We can also set default values for function parameters
const addStrings = (a: string, b: string = '') => {
  return `${a} ${b}`;
};

//Param can be either a string or a number, this is a union type
const format = (title: string, param: string | number): string => {
  return `${title} ${param}`;
};

// A void return type means this function doesn't return anything
const printFormat = (title: string, param: string | number): void => {
  console.log(format(title, param));
};

// We can also type promises as return values along with what they return
const fetchData = (userId: string): Promise<string> => {
  return Promise.resolve(`${userId} from the database`);
};

// Destructred params can also be typed as well
const introduce = (salutation: string, ...message: string[]): string => {
  return `${salutation} ${message.join('')}`;
};

export {};
