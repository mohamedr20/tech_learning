import { Model } from "objection";

class Address extends Model {
  id!: number;
  address_1!: string;
  address_2?: string;
  city!: string;
  state!: string;
  country!: string;
  zip_code!: string;

  static get tableName(): string {
    return "address";
  }
}

export default Address;
