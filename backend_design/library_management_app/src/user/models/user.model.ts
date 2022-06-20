import { Model, RelationMappings, RelationMappingsThunk } from "objection";

import Address from "../../utils/models/address.model";
import Book from "../../book/models/book.model";
import { Role } from "./index";
import { LibraryCard } from "../../library/models/index";
import { Fine } from "./index";

class User extends Model {
  id!: number;
  first_name!: string;
  last_name!: string;
  username!: string;
  age!: number;
  email!: string;
  password_hash!: string;
  phone!: string;
  date_of_birth!: Date;

  static get tableName(): string {
    return "user";
  }

  static get relationMappings(): RelationMappings | RelationMappingsThunk {
    return {
      address: {
        relation: Model.BelongsToOneRelation,
        modelClass: Address,
        join: {
          from: "user.address_id",
          to: "address.id"
        }
      },

      libraryCard: {
        relation: Model.HasOneRelation,
        modelClass: LibraryCard,
        join: {
          from: "user.id",
          to: "library_card.user_id"
        }
      },

      books: {
        relation: Model.ManyToManyRelation,
        modelClass: Book,
        join: {
          from: "user.id",
          through: {
            from: "book_item.user_id",
            to: "book_item.book_id"
          },
          to: "book.id"
        }
      },

      roles: {
        relation: Model.ManyToManyRelation,
        modelClass: Role,
        join: {
          from: "user.id",
          through: {
            from: "user_role.user_id",
            to: "user_role.role_id"
          },
          to: "role.id"
        }
      },

      fines: {
        relation: Model.HasManyRelation,
        modelClass: Fine,
        join: {
          from: "user.id",
          to: "fine.user_id"
        }
      }
    };
  }
}

export default User;
