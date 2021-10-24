import makeUsersDb from './usersDAO'
import mongodb from 'mongodb'

const MongoClient = mongodb.MongoClient
const url = process.env.SIMPLEWEBAPI_DB_URI
const dbName = process.env.SIMPLEWEBAPI_NS
const client = new MongoClient(url, { poolSize:50, wtimeout:2500, useNewUrlParser: true })

export async function makeDb () {
  if (!client.isConnected()) {
    await client.connect()
  }
  return client.db(dbName)
}

const usersDb = makeUsersDb({ makeDb })
export default usersDb