import { Model, RelationMappings, RelationMappingsThunk } from "objection";
import Book from "../../book/models/book.model";

class Author extends Model {
  static get tableName(): string {
    return "author";
  }

  static get relationMappings(): RelationMappings | RelationMappingsThunk {
    return {
      books: {
        relation: Model.ManyToManyRelation,
        modelClass: Book,
        join: {
          from: "author.id",
          through: {
            // persons_movies is the join table.
            from: "book_author.author_id",
            to: "book_author.book_id"
          },
          to: "book.id"
        }
      }
    };
  }
}

export default Author;
