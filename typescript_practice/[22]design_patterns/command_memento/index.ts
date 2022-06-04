abstract class Command<State> {
  abstract execute(state: State): State;
}

class CommandStack<State> {
  private stack: string[] = [];
  constructor(private _state: State) {
    this.stack.push(JSON.stringify(_state));
  }

  get state() {
    return JSON.parse(this.stack[this.stack.length - 1]);
  }

  execute(command: Command<State>) {
    const stringState = JSON.stringify(command.execute(this.state));
    this.stack.push(stringState);
  }

  undo() {
    if (this.stack.length > 1) {
      this.stack.pop();
    }
  }
}

class AddOne extends Command<number> {
  execute(state: number): number {
    return state + 1;
  }
}

const commandStack = new CommandStack<number>(0);
console.log(commandStack.state);
commandStack.execute(new AddOne());
console.log(commandStack.state);
commandStack.undo();
console.log(commandStack.state);

//=============Function===============/

type CommandFunction<State> = (
  state: State
) => [State, (state: State) => State];

function createCommandStack<State>(state: State) {
  const stack: ((state: State) => State)[] = [];
  let _state = state;

  return {
    execute(command: CommandFunction<State>) {
      const [newState, undoFn] = command(_state);
      _state = newState;
      stack.push(undoFn);
      return _state;
    },

    undo() {
      const command = stack.pop();
      if (command) {
        _state = command(_state);
      }
    },
  };
}

const addOne: CommandFunction<number> = (state) => [
  state + 1,
  (state) => state - 1,
];

const cStack = createCommandStack(0);
console.log(cStack.execute(addOne));
console.log(cStack.undo());

const subtractOne: CommandFunction<number> = (state) => [
  state - 1,
  (state) => state + 1,
];

const cStack1 = createCommandStack(3);
console.log(cStack1.execute(subtractOne)); //2
console.log(cStack1.undo()); // 3
console.log(cStack1.execute(subtractOne)); //2
