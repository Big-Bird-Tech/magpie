import { FeatureUser as FeatureUserEntity} from './feature-user.entity'
import { ifConnected } from '../connection'
import { User as UserEntity } from '../user/user.entity'
import { Feature as FeatureEntity } from '../feature/feature.entity'

export class FeatureUserService {
  async assignTo(featureId: string, userId: string) {
    ifConnected(knex => {
      return knex
      .insert<FeatureUserEntity>(new FeatureUserEntity(userId, featureId))
      .into(FeatureUserEntity.schema.tableName)
    })
  }

  async findByFeatureId(featureId: string) {
    return ifConnected(knex => {
      return knex
        .select<FeatureUserEntity[]>(FeatureEntity.schema.all)
        .from(FeatureEntity.schema.tableName)
    })
  }

  async findByUserId(UserId: string) {
    return ifConnected(knex => {
      return knex
        .select<FeatureUserEntity[]>(UserEntity.schema.all)
        .from(UserEntity.schema.tableName)
    })
  }
}
