import { connect } from "mongoose"

const MONGODB_URL = 'mongodb://mongo:27017/transactions'

export async function connectToMongoDb() {
  connect(MONGODB_URL)
}