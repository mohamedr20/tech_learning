import { Knex } from "knex";

interface Reader<T> {
  find(fields: Array<keyof T>): Promise<T[]>;
  findOne(id: string): Promise<T>;
}

interface Writer<T> {
  insert(insertBody: Partial<T>): Promise<number>;
  update(id: string, updateBody: Partial<T>): Promise<number>;
  delete(id: string): Promise<number>;
}

export abstract class KnexRepository<T> implements Reader<T>, Writer<T> {
  constructor(public readonly knex: Knex, public readonly tableName: string) {}

  public get queryBuilder(): Knex.QueryBuilder {
    return this.knex(this.tableName);
  }

  find(fields: Array<keyof T>): Promise<T[]> {
    return this.queryBuilder.select(...fields).from(this.tableName) as Promise<
      T[]
    >;
  }

  findOne(id: string): Promise<T> {
    return this.queryBuilder
      .select(id)
      .from(this.tableName)
      .first() as Promise<T>;
  }

  insert(insertBody: Partial<T>): Promise<number> {
    return this.queryBuilder.insert({ ...insertBody }).returning("id");
  }
  update(id: string, updateBody: Partial<T>): Promise<number> {
    return this.queryBuilder.where("id", "=", id).update({ ...updateBody });
  }

  delete(id: string): Promise<number> {
    return this.queryBuilder.where("id", "=", id).del();
  }
}

export default KnexRepository;
