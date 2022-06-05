import { Router } from "express";

enum UserStatus {
  Active = "Active",
  Banned = "Banned",
  None = "None",
  Closed = "Closed"
}

interface User {
  id: number;
  email: string;
  password_hash: string;
  first_name: string;
  last_name: string;
  username: string;
  phone: string;
  date_of_birth: Date;
  age: number;
  card_id: number;
  address_id: number;
}

interface LibraryCard {
  id: number;
  library_id: number;
  card_number: string;
  member_status: UserStatus;
}

interface Library {
  id: number;
  address_id: number;
  name: string;
  description: string;
  phone: string;
  is_closed: boolean;
}

interface Address {
  id: number;
  address_1: string;
  address_2: string;
  city: string;
  state: string;
  country: string;
  zip_code: string;
}

interface Book {
  id: number;
  title: string;
  description: string;
  publication_date: Date;
  isbn: string;
  is_best_seller: boolean;
  is_reference: boolean;
}

interface Author {
  id: number;
  book_id: number;
  name: string;
  description: string;
  is_best_seller: boolean;
}

interface Controller {
  path: string;
  router: Router;
}

export {
  UserStatus,
  User,
  Library,
  LibraryCard,
  Address,
  Book,
  Author,
  Controller
};
