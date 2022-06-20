import {
  Model,
  ModelOptions,
  QueryContext,
  RelationMappings,
  RelationMappingsThunk,
} from "objection";

import Category from "../../category/models/category.model";
import Author from "../../author/models/author.model";
import { User } from "../../user/models/index";

class Book extends Model {
  id!: number;
  title!: string;
  description!: string;
  publication_date!: string;
  isbn!: string;
  is_best_seller: boolean = false;
  is_reference: boolean = false;
  createdAt?: string;
  updatedAt?: string;

  static get tableName(): string {
    return "book";
  }

  async $beforeInsert(context: QueryContext) {
    this.createdAt = new Date().toISOString();
  }

  async $afterUpdate(opt: ModelOptions, context: QueryContext) {
    this.updatedAt = new Date().toISOString();
  }

  static get relationMappings(): RelationMappings | RelationMappingsThunk {
    return {
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
      },

      authors: {
        relation: Model.ManyToManyRelation,
        modelClass: Author,
        join: {
          from: "book.id",
          through: {
            from: "book_author.book_id",
            to: "book_author.author_id"
          },
          to: "author.id"
        }
      },

      users: {
        relation: Model.ManyToManyRelation,
        modelClass: User,
        join: {
          from: "book.id",
          through: {
            from: "book_item.book_id",
            to: "book_item.user_id"
          },
          to: "user.id"
        }
      }
    };
  }
}

export default Book;
