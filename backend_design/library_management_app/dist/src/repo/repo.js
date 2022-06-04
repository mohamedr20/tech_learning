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
    findOne(fields) {
        return this.queryBuilder
            .select(...fields)
            .from(this.tableName)
            .first();
    }
}
exports.KnexRepository = KnexRepository;
exports.default = KnexRepository;
