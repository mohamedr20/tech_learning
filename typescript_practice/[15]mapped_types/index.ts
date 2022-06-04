type MyFlexibleCatInfo = {
  name: string;
} & Record<string, string>;

const cat: MyFlexibleCatInfo = {
  name: 'Lucky',
  breed: 'Tabby',
};

type MyFlexibleDogInfo = {
  name: string;
  [key: string]: string;
};

const dog = {
  name: 'Doggy',
  age: 25,
};

interface DogInfo {
  name: string;
  age: number;
}

type OptionsFlags<Type> = {
  [Property in keyof Type]: boolean;
};

type DogInfoOptions = OptionsFlags<DogInfo>;

type Listeners<Type> = {
  [Property in keyof Type as `on${Capitalize<string & Property>}Change`]?: (
    newValue: Type[Property]
  ) => void;
} & {
  [Property in keyof Type as `on${Capitalize<
    string & Property
  >}Delete`]?: () => void;
};

function listenToObject<Type>(obj: Type, listeners: Listeners<Type>): void {
  throw 'Needs to implemented';
}

const albert: DogInfo = {
  name: 'albert',
  age: 25,
};

type DogInfoListeners = Listeners<DogInfo>;

listenToObject(albert, {
  onNameChange: (name: string) => {},
  onAgeChange: (age: number) => {},
  onNameDelete: () => {},
});
