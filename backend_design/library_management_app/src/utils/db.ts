import { Knex } from "knex";
import * as uuid from "uuid";
import {
  UserStatus,
  Address,
  Library,
  LibraryCard,
  User,
  Book,
  Author,
  BookCategory,
  Category
} from "./interfaces";

const createDefaultColumns = (knex: Knex, table: Knex.TableBuilder) => {
  table.dateTime("created_at").defaultTo(knex.fn.now());
  table.dateTime("updated_at").defaultTo(knex.fn.now());
};

const users = [
  {
    id: 1,
    email: "misse11@email.com",
    password_hash:
      "$2b$10$VTst4dr1emwn0LzMJCAjeOG.0gfVjtk1XrViVNH/p5BWEwzbJZWPC",
    first_name: "Mohamed",
    last_name: "Isse",
    username: "mohamedr20",
    phone: "7033593717",
    date_of_birth: new Date(),
    age: 24,
    library_card_id: 1,
    address_id: 1
  },
  {
    id: 2,
    email: "misse12@email.com",
    password_hash:
      "$2b$10$VTst4dr1emwn0LzMJCAjeOG.0gfVjtk1XrViVNH/p5BWEwzbJZWPC",
    first_name: "Test",
    last_name: "User",
    username: "tester20",
    phone: "202-600-5012",
    date_of_birth: new Date(),
    age: 32,
    library_card_id: 2,
    address_id: 2
  }
];

const libraryCards: LibraryCard[] = [
  {
    id: 1,
    library_id: 1,
    card_number: uuid.v4(),
    member_status: UserStatus.Active
  },
  {
    id: 2,
    library_id: 1,
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

const books: Book[] = [
  {
    id: 1,
    title: "Clean Code: A Handbook of Agile Software Craftsmanship",
    description: `Even bad code can function. But if code isn’t clean, 
    it can bring a development organization to its knees. Every year, countless hours 
    and significant resources are lost because of poorly written code. `,
    publication_date: new Date(),
    isbn: uuid.v4(),
    is_best_seller: true,
    is_reference: false
  },
  {
    id: 2,
    title:
      "Eloquent JavaScript, 3rd Edition: A Modern Introduction to Programming",
    description: `JavaScript lies at the heart of almost every modern web application, 
    from social apps like Twitter to browser-based game frameworks like Phaser and Babylon.`,
    publication_date: new Date(),
    isbn: uuid.v4(),
    is_best_seller: false,
    is_reference: false
  },
  {
    id: 3,
    title: "Front-End Back-End Development with HTML, CSS, JavaScrip",
    description: `Together these three books form an ideal platform for anyone who wants to master 
    HTML and CSS, step up to the additional front-end`,
    publication_date: new Date(),
    isbn: uuid.v4(),
    is_best_seller: false,
    is_reference: false
  },
  {
    id: 4,
    title: "JavaScript: The Good Parts: The Good Parts",
    description: `Most programming languages contain good and bad parts, 
    but JavaScript has more than its share of the bad, having been developed and released`,
    publication_date: new Date(),
    isbn: uuid.v4(),
    is_best_seller: false,
    is_reference: false
  }
];

const authors: Author[] = [
  {
    id: 1,
    book_id: 1,
    name: `Test Author`,
    description: `The greatest author of all time, legendary writer.`,
    is_best_seller: true
  },
  {
    id: 2,
    book_id: 1,
    name: `Marjin Haverbeke`,
    description:
      "Independent software person. Editors and programming languages.",
    is_best_seller: false
  },
  {
    id: 3,
    book_id: 2,
    name: "Douglas Crockfors",
    description: `American computer programmer who is involved in the development of the JavaScript language`,
    is_best_seller: true
  },
  {
    id: 4,
    book_id: 3,
    name: "Micheal Smith",
    description: `Author and founding member of Test Publication Co. 
    has been doing this for about 20-25 years`,
    is_best_seller: false
  },
  {
    id: 5,
    book_id: 4,
    name: "Random Author",
    description:
      "Has been doing this type of work for a while now, veteran of the game.",
    is_best_seller: false
  }
];

const bookCategory: BookCategory[] = [
  {
    book_id: 1,
    category_id: 1
  },
  {
    book_id: 1,
    category_id: 2
  },
  {
    book_id: 2,
    category_id: 1
  },
  {
    book_id: 3,
    category_id: 2
  },
  {
    book_id: 4,
    category_id: 3
  }
];

const category: Category[] = [
  {
    id: 1,
    category_name: "Technology"
  },
  {
    id: 2,
    category_name: "Web Development"
  },
  {
    id: 3,
    category_name: "Test Category"
  }
];

export {
  createDefaultColumns,
  users,
  authors,
  books,
  libraryCards,
  libraries,
  addresses,
  bookCategory,
  category
};
