import { Model, RelationMappings, RelationMappingsThunk } from "objection";
import Address from "../../utils/models/address.model";
import LibraryBusinessHours from "./library_business_hours.model";

class Library extends Model {
  id!: number;
  address_id!: number;
  name!: string;
  description!: string;
  phone!: string;
  is_closed!: boolean;

  static get tableName(): string {
    return "library";
  }

  static get relationMappings(): RelationMappings | RelationMappingsThunk {
    return {
      address: {
        relation: Model.HasOneRelation,
        modelClass: Address,
        join: {
          from: "library.address_id",
          to: "address.id"
        }
      },
      businessHours: {
        relation: Model.HasManyRelation,
        modelClass: LibraryBusinessHours,
        join: {
          from: "library.id",
          to: "library_business_hours.library_id"
        }
      }
    };
  }
}

export default Library;
