import { Knex } from "knex"
import { id, timestamps } from '@bbt/bowerbird'
import { UserEntity } from '../src/index'


export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable(UserEntity.schema.tableName, (table) => {
    id(table)
    timestamps(table)
    table.string(UserEntity.schema.externalId)
  })
}


export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTableIfExists(UserEntity.schema.tableName)
}

