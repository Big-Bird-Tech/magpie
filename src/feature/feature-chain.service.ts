import { Feature as FeatureEntity } from './feature.entity'
import { ifConnected } from '../connection'

export class FeatureChain {
  constructor(readonly name: string, private feature: FeatureEntity) {}

  async disabled() {
    return (await this.findFeatureWithState()).state === false
  }

  async enabled() {
    return (await this.findFeatureWithState()).state === true
  }

  private findFeatureWithState() {
    return ifConnected((knex) => {
      return knex
        .select<FeatureEntity>(FeatureEntity.schema.all)
        .from(FeatureEntity.schema.tableName)
        .where({ name: this.name })
        .first()
    })
  }
}
