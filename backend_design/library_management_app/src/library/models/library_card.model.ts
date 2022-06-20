import { Model, RelationMappings, RelationMappingsThunk } from "objection";
import { Library } from "./index";

class LibraryCard extends Model {
  id!: number;
  library_id!: number;
  card_number!: string;
  member_status?: string;

  static get tableName(): string {
    return "library_card";
  }

  static get relationMappings(): RelationMappings | RelationMappingsThunk {
    return {
      library: {
        relation: Model.BelongsToOneRelation,
        modelClass: Library,
        join: {
          from: "library_card.library_id",
          to: "library.id"
        }
      }
    };
  }
}

export default LibraryCard;
