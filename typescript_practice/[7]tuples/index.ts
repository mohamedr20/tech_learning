type ThreeDCoordinate = [x: number, y: number, z: number];

function add3DCoordinate(c1: ThreeDCoordinate, c2: ThreeDCoordinate) {
  return [c1[0] + c2[0], c1[1] + c2[1], c1[1] + c2[2]];
}

console.log(add3DCoordinate([1, 2, 3], [4, 5, 6]));

function simpleStringState(
  initialState: string
): [() => string, (v: string) => void] {
  let str: string = initialState;
  return [
    () => str,
    (v: string) => {
      str = v;
    },
  ];
}

const [str1Getter, str1Setter] = simpleStringState('hello');
console.log(str1Getter());
str1Setter('goodbye');
console.log(str1Getter());

// Execution steps

// 1) The simpleStringState function is defined in the global state
// 2) simpleStringState is passed in "hello"
// 3) "hello" is assigned to the variable "str"
// 4) simpleStringState evaluates and returns and array with two functions
// - () => str [This function gets the value of str]
// - (v) => {str = v} [Accepts a variable v and reassigns the value
//                    v to str]
// 5) str1Getter() fetches the str value from it's parent function
// 6) str1Setter('goodbye) assigns str = 'goodbye' (v)
// 7) The simpleStringState str variable is now 'goodbye'
