enum UserStatus {
  Active = "Active",
  Banned = "Banned",
  None = "None",
  Closed = "Closed"
}

interface User {
  id: number;
  email: string;
  password: string;
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
  libraryId: number;
  userId: number;
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

export { UserStatus, User, Library, LibraryCard, Address };
