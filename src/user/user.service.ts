import { ifConnected } from '../connection'
import { User as UserEntity } from './user.entity'
import { FeatureUser as FeatureUserEntity } from '../feature-user/feature-user.entity'

type UserEntities = Array<UserEntities>

export class UserService {
  async save(item: UserEntity) {
    return ifConnected(knex => {
      return knex
        .insert(item)
        .into(UserEntity.schema.tableName)
    })
  }

  async find(userId: string) {
    return ifConnected(knex => {
      return knex
        .select<UserEntities>(UserEntity.schema.all)
        .from(UserEntity.schema.tableName)
        .where({ id: userId })
    })
  }

  async update(userId: string, data: Partial<UserEntity>) {
    return ifConnected(knex => {
      return knex
        .update(data)
        .from(UserEntity.schema.tableName)
        .where({ id: userId })
    })
  }

  async delete(userId: string) {
    return ifConnected(knex => {
      return knex
        .delete()
        .from(UserEntity.schema.tableName)
        .where({ id: userId })
    })
  }

  // async features(userId: string) {
  //   return ifConnected(knex => {
  //     return knex
  //       .select(FeatureUserEntity.schema.all)
  //       .from(FeatureUserEntity.schema.tableName)
  //       .where({ userId })


  //       // .innerJoin(
  //       //   `${Permission.schema.tableName}`,
  //       //   `${Permission.schema.tableName}.${Permission.schema.id}`,
  //       //   `${PermissionsRoles.schema.permissionId}`,
  //       // )
  //   })
  // }
}
