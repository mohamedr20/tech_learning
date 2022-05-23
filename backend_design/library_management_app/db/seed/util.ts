import uuid from "uuid";
import {
  UserStatus,
  Address,
  Library,
  LibraryCard,
  User
} from "../../src/utils/interfaces";

const getUser = (id: number, users: User[]) => {
  return users.find((user) => user.id === id);
};

const getAddress = (id: number, addresses: Address[]) => {
  return addresses.find((address) => address.id === id);
};

const getLibraryCard = (id: number, libraryCards: LibraryCard[]) => {
  return libraryCards.find((card) => card.id === id);
};

const getLibrary = (id: number, libraries: Library[]) => {
  return libraries.find((library) => library.id === id);
};

const users = [
  {
    id: 1,
    email: "misse11@email.com",
    password: "heyhey12@",
    first_name: "Mohamed",
    last_name: "Isse",
    username: "mohamedr20",
    phone: "7033593717",
    date_of_birth: "2022-05-23T02:02:21.970Z",
    age: 24,
    card_id: 1,
    address_id: 1
  },
  {
    id: 2,
    email: "misse12@email.com",
    password: "testing12@",
    first_name: "Test",
    last_name: "User",
    username: "tester20",
    phone: "202-600-5012",
    date_of_birth: "2022-05-23T02:02:21.970Z",
    age: 32,
    card_id: 2,
    address_id: 2
  }
];

const libraryCards: LibraryCard[] = [
  {
    id: 1,
    libraryId: 1,
    userId: 1,
    card_number: uuid.v4(),
    member_status: UserStatus.Active
  },
  {
    id: 2,
    libraryId: 1,
    userId: 2,
    card_number: uuid.v4(),
    member_status: UserStatus.Closed
  }
];

const libraries: Library[] = [
  {
    id: 1,
    address_id: 3,
    name: "Fairfax Regional Library",
    description: `The library offers a quiet study room, 
    free WiFi, and dozens of Internet workstations. 
    The library has a collection of adult and children's books`,
    phone: "703-123-9901",
    is_closed: false
  },
  {
    id: 2,
    address_id: 4,
    name: "Chantilly Regional Library",
    description: `The Chantilly Regional Library opened on January 7, 1995. 
    The library has become an integral part of the community 
    and highlights dynamic preschool, school age and teen services.`,
    phone: "703-502-3883",
    is_closed: false
  }
];

const addresses: Address[] = [
  {
    id: 1,
    address_1: "9807 Alwaes Drive",
    address_2: "",
    city: "Fairfax",
    state: "VA",
    country: "US",
    zip_code: "22031"
  },
  {
    id: 2,
    address_1: "3171 Ranger Rd",
    address_2: "",
    city: "Fairfax",
    state: "VA",
    country: "US",
    zip_code: "22031"
  },
  {
    id: 3,
    address_1: "10360 North Street",
    address_2: "",
    city: "Fairfax",
    state: "VA",
    country: "US",
    zip_code: "22030-2514"
  },
  {
    id: 4,
    address_1: "4000 Stringfellow Rd",
    address_2: "",
    city: "Chantilly",
    state: "VA",
    country: "US",
    zip_code: "20151-2628"
  }
];

export default {
  users,
  libraryCards,
  libraries,
  addresses,
  getAddress,
  getLibrary,
  getLibraryCard,
  getUser
};
