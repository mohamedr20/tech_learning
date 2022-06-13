import { Model, RelationMappings, RelationMappingsThunk } from "objection";
import Category from "./Category";

class Book extends Model {
  static get tableName(): string {
    return "books";
  }

  static get relationMappings(): RelationMappings | RelationMappingsThunk {
    return {
      // Many to many w/ category [bookCategory] is link table
      categories: {
        relation: Model.ManyToManyRelation,
        modelClass: Category,
        join: {
          from: "book.id",
          through: {
            from: "book_category.book_id",
            to: "book_category.category_id"
          },
          to: "category.id"
        }
      }
    };
  }
}

export default Book;
