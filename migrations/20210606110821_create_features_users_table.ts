import { Knex } from "knex"
import { id, timestamps } from '@bbt/bowerbird'
import { FeatureEntity, FeatureUserEntity, UserEntity } from '../src/index'


export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable(FeatureUserEntity.schema.tableName, (table) => {
    id(table)
    timestamps(table)
    table.string(FeatureUserEntity.schema.userId)
    table.string(FeatureUserEntity.schema.featureId)
    table
      .foreign(FeatureUserEntity.schema.userId)
      .references(`${UserEntity.schema.tableName}.${UserEntity.schema.id}`)
    table
      .foreign(FeatureUserEntity.schema.featureId)
      .references(`${FeatureEntity.schema.tableName}.${FeatureEntity.schema.id}`)
  })
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTableIfExists(FeatureUserEntity.schema.tableName)
}
