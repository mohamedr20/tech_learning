import { Model } from "objection";

class LibraryRack extends Model {
  id!: number;
  rack_number!: number;
  floor_number!: number;

  static get tableName(): string {
    return "library_rack";
  }
}

export default LibraryRack;
