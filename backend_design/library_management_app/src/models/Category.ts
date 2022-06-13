import { Model } from "objection";
import Book from "./Book";

class Category extends Model {
  id!: number;
  category_name!: string;

  static get tableName(): string {
    return "category";
  }

  static get relationMappings() {
    return {
      books: {
        relation: Model.ManyToManyRelation,
        modelClass: Book,
        join: {
          from: "category.id",
          through: {
            from: "book_category.category_id",
            to: "book_category.book_id"
          },
          to: "book.id"
        }
      }
    };
  }
}

export default Category;
