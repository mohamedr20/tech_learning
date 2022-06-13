import { Model, RelationMappings, RelationMappingsThunk } from "objection";
import Address from "./Address";
import Book from "./Book";
import Role from "./Role";

class User extends Model {
  id!: number;
  first_name!: string;
  last_name!: number;
  email!: string;
  password_hash!: number;
  phone!: string;
  date_of_birth!: number;

  static get tableName(): string {
    return "user";
  }

  static get relationMappings(): RelationMappings | RelationMappingsThunk {
    return {
      address: {
        relation: Model.HasOneRelation,
        modelClass: Address,
        join: {
          from: "user.address_id",
          to: "address.id"
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

      bookItems: {
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
      }

      // libraryCard: {
      //   relation: Model.HasOneRelation,
      //   //modelClass: libraryCards,
      //   join: {
      //     from: "user.library_card_id",
      //     to: "library_card.id"
      //   }
      // }

      // fines: {
      //   relation: Model.HasManyRelation,
      //   modelClass: UserFine,
      //   join: {
      //     from: 'user.id',
      //     to: 'user_fine.user_id'
      //   }
      // }
    };
  }
}

export default User;
