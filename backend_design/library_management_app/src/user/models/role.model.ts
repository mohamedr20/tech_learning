import { Model, RelationMappings, RelationMappingsThunk } from "objection";
import User from "./user.model";

class Role extends Model {
  id!: number;
  name!: string;

  static get tableName(): string {
    return "role";
  }

  static get relationMappings(): RelationMappings | RelationMappingsThunk {
    return {
      users: {
        relation: Model.ManyToManyRelation,
        modelClass: User,
        join: {
          from: "role.id",
          through: {
            from: "user_role.role_id",
            to: "user_role.user_id"
          },
          to: "user.id"
        }
      }
    };
  }
}

export default Role;
