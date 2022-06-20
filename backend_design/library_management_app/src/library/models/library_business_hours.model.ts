import { Model, RelationMappings, RelationMappingsThunk } from "objection";
import { Library } from "./index";

class LibraryBusinessHours extends Model {
  id!: number;
  library_id!: number;
  day!: string;
  open_time!: Date;
  close_time!: Date;

  static get tableName(): string {
    return "library";
  }

  static get relationMappings(): RelationMappings | RelationMappingsThunk {
    return {
      library: {
        relation: Model.HasOneRelation,
        modelClass: Library,
        join: {
          from: "library_business_hours.library_id",
          to: "library.id"
        }
      }
    };
  }
}

export default LibraryBusinessHours;
