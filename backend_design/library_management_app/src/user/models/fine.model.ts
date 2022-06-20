import { Model } from "objection";

class Fine extends Model {
  id!: number;
  user_id!: number;
  fine_type!: string;
  amount!: number;

  static get tableName(): string {
    return "fine";
  }
}

export default Fine;
