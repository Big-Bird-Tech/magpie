import knex, { Knex } from "knex"

let connection: Knex | null = null

export const connect = (config: Knex.Config) => {
  if (!connection) {
    connection = knex(config)
  }
}

export function ifConnected<T>(func: (conn: Knex) => Promise<T>) {
  if (connection === null) {
    throw new Error(
      'The feature service has not been connected to the feature database. Please call Feature.connect(config: Knex.Config).',
    )
  } else {
    return func(connection)
  }
}
