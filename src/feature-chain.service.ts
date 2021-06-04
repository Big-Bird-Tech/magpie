import knex, { Knex } from "knex";
import { FeaturesEntity } from "src";
import { on, off } from "./constants";

export class FeatureChain {
  constructor(readonly feature: string, readonly knex: Knex) {}

  async disabled() {
    const feature = await knex(FeaturesEntity.schema.tableName)
      .select<FeaturesEntity>(FeaturesEntity.schema.name)
      .where({ name: this.feature, state: off })
      .first();

    return feature.state;
  }

  async enabled() {
    const feature = await knex(FeaturesEntity.schema.tableName)
      .select<FeaturesEntity>(FeaturesEntity.schema.name)
      .where({ name: this.feature, state: on })
      .first();

    return feature.state;
  }
}
