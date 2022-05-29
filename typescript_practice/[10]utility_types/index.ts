interface MyUser {
  name: string;
  id: number;
  email?: string;
}

type MyUserOptionals = Partial<MyUser>;

// Partial<> takes a type and make everything in it optional
function merge(user: MyUser, override: MyUserOptionals): MyUser {
  return {
    ...user,
    ...override,
  };
}

console.log(
  merge(
    {
      name: 'Steve',
      id: 5,
      email: 'test@email.com',
    },
    {
      id: 6,
      email: 'm@email.com',
    }
  )
);

// Required<> takes a type and make everything in it required
type RequiredUser = Required<MyUser>;

// Pick takes a type and return a type that matches only the keys passed in
type JustEmailAndId = Pick<MyUser, 'name' | 'id'>;

type UserWithoutId = Omit<MyUser, 'id'>;

const mapById = (users: MyUser[]): Record<MyUser['id'], UserWithoutId> => {
  return users.reduce((prevValue, currentValue) => {
    const { id, ...other } = currentValue;
    return {
      ...prevValue,
      [currentValue.id]: other,
    };
  }, {});
};

console.log(
  mapById([
    {
      name: 'Steve',
      id: 5,
      email: 'test@email.com',
    },
    {
      name: 'Billy',
      id: 6,
      email: 'm@email.com',
    },
  ])
);
