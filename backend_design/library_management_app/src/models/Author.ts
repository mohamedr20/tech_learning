import { Model, RelationMappings, RelationMappingsThunk } from "objection";

class Author extends Model {
  static get tableName(): string {
    return "author";
  }

  static get relationMappings(): RelationMappings | RelationMappingsThunk {
    return {
      children: {
        relation: Model.HasManyRelation,
        modelClass: Author,
        join: {
          from: "",
          to: ""
        }
      }
    };
  }
}

export default Author;
