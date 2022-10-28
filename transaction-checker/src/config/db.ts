import { connect } from "mongoose"

export async function connectToMongoDb() {
  connect(process.env.MONGODB_URL)
}