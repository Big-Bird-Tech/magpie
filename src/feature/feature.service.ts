import knex, { Knex } from 'knex'
import { Feature as FeatureEntity} from './feature.entity'
import { FeatureChain } from './feature-chain.service'
import { on, off } from '../constants'
import { ifConnected } from '../connection'
import { FeatureUserService } from '../feature-user/feature-user.service'

export class Feature {
  private feature: FeatureEntity | null

  constructor() {

  }

  static async list(page = 0) {
    return ifConnected((knex) => {
      return knex
        .select(FeatureEntity.schema.all)
        .from(FeatureEntity.schema.tableName)
        .limit(30)
        .offset(page)
    })
  }

  async create(name: string) {
    await ifConnected((knex) => {
      this.feature = new FeatureEntity(name, off)
      return knex
        .insert(this.feature)
        .into(FeatureEntity.schema.tableName)
    })

    return this
  }


  async find(name: string) {
    return ifConnected((knex) => {
      if (!this.feature) {
        return knex
          .select<FeatureEntity[]>(FeatureEntity.schema.all)
          .from(FeatureEntity.schema.tableName)
          .where({ name })
          .first()
      } else {
        return Promise.resolve(this.feature)
      }
    })
  }

  async enable(name: string) {
    return ifConnected((knex) => {
      return knex
        .update({ state: on })
        .from(FeatureEntity.schema.tableName)
        .where({ name })
    })
  }

  async disable(name: string) {
    return ifConnected((knex) => {
      return knex
        .update({ state: off })
        .from(FeatureEntity.schema.tableName)
        .where({ name })
    })
  }

  async delete(userId: string) {
    return ifConnected(knex => {
      return knex
        .delete()
        .from(FeatureEntity.schema.tableName)
        .where({ id: userId })
    })
  }

  async assignTo(userId: string, featureName: string) {
    return ifConnected(async () => {
      const featureUserAssignmentService = new FeatureUserService()
      const feature = await this.find(featureName)
      const featureUserAssignment = await featureUserAssignmentService
        .findByUserId(userId)

      if (!feature) {
        await this.create(featureName)
      }

      if(!featureUserAssignment) {
        await featureUserAssignmentService
          .assignTo(feature.id, userId)
      }
    })
  }

  is() {
    return new FeatureChain(this.name, this.feature)
  }
}
