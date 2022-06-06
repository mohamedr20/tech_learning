"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.KnexRepository = void 0;
class KnexRepository {
    constructor(knex, tableName) {
        this.knex = knex;
        this.tableName = tableName;
    }
    get queryBuilder() {
        return this.knex(this.tableName);
    }
    find(fields) {
        return this.queryBuilder.select(...fields).from(this.tableName);
    }
    findOne(id) {
        return this.queryBuilder
            .select(id)
            .from(this.tableName)
            .first();
    }
    insert(insertBody) {
        return this.queryBuilder.insert({ ...insertBody }).returning("id");
    }
    update(id, updateBody) {
        return this.queryBuilder.where("id", "=", id).update({ ...updateBody });
    }
    delete(id) {
        return this.queryBuilder.where("id", "=", id).del();
    }
}
exports.KnexRepository = KnexRepository;
exports.default = KnexRepository;
