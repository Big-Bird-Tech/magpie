import { Knex } from "knex"
import { id, timestamps } from '@bbt/bowerbird'
import { FeatureEntity } from '../src/index'


export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable(FeatureEntity.schema.tableName, (table) => {
    id(table)
    timestamps(table)
    table.boolean('state')
    table
      .string(FeatureEntity.schema.name)
      .notNullable()
      .unique()
  })
}


export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTableIfExists(FeatureEntity.schema.tableName)
}

