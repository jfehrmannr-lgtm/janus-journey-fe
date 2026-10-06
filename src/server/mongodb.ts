import { MongoClient, type Db } from 'mongodb'

interface BetterAuthMongoConnection {
  client: MongoClient
  database: Db
}

/**
 * Creates the Better Auth MongoDB client and selected database handle from server environment configuration.
 *
 * @returns A new Better Auth MongoDB connection.
 * @throws Error when required MongoDB environment variables are missing.
 */
const createConnection = (): BetterAuthMongoConnection => {
  const uri = process.env.MONGODB_URI
  const databaseName = process.env.BETTER_AUTH_DATABASE_NAME

  if (!uri) {
    throw new Error('MONGODB_URI is required to initialize Better Auth persistence.')
  }

  if (!databaseName) {
    throw new Error('BETTER_AUTH_DATABASE_NAME is required to initialize Better Auth persistence.')
  }

  const client = new MongoClient(uri)

  return {
    client,
    database: client.db(databaseName)
  }
}

/**
 * Reuses the Better Auth MongoDB client during development hot reloads and
 * exposes the server-side database handle selected by environment configuration.
 *
 * @returns The reusable Better Auth MongoDB connection.
 */
const getConnection = (): BetterAuthMongoConnection => {
  const globalWithMongo = globalThis as typeof globalThis & {
    betterAuthMongoConnection?: BetterAuthMongoConnection
  }

  if (globalWithMongo.betterAuthMongoConnection) {
    return globalWithMongo.betterAuthMongoConnection
  }

  const connection = createConnection()

  if (process.env.NODE_ENV !== 'production') {
    globalWithMongo.betterAuthMongoConnection = connection
  }

  return connection
}

const connection = getConnection()

const betterAuthMongoClient = connection.client
const betterAuthDb = connection.database

export { betterAuthDb, betterAuthMongoClient }
