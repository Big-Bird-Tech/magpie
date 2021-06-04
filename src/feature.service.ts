import knex, { Knex } from "knex";
import { Features } from "./feature.entity";
import { FeatureChain } from "./feature-chain.service";

let connection: Knex | null = null;
const on = true;
const off = false;

function ifConnected(func: (conn: Knex) => Promise<any>) {
  if (connection === null) {
    throw new Error(
      "The feature service has not been connected to the feature database. Please call Feature.connect(config: Knex.Config)."
    );
  } else {
    return func(connection);
  }
}

export class Feature {
  constructor(readonly feature: string) {
    ifConnected(async (knex) => {
      const result = await knex.select(Features.schema.id).from(Features.schema.tableName).where({ name: feature }).first()

      if (!result) {
        throw new Error(`Feature: ${feature} , does not exist.First create it, then use this class`)
      }
    })
  }

  static connect(config: Knex.Config) {
    // establish connection to features database via knex
    connection = knex(config);
  }

  static async create(feature: string) {
    await ifConnected((knex) => {
      return knex
        .insert(new Features(feature, off))
        .into(Features.schema.tableName)
    })
    return new Feature(feature)
  }

  is() {
    return new FeatureChain(this.feature, connection);
  }

  async enable() {
    return await ifConnected((knex) => {
      return knex(Features.schema.tableName)
        .select(Features.schema.name)
        .where({ name: this.feature, state: on })
        .first();
    });
  }

  async disable() {
    return await ifConnected((knex) => {
      return knex(Features.schema.tableName)
        .select(Features.schema.name)
        .where({ name: this.feature, state: off })
        .first();
    });
  }
}
