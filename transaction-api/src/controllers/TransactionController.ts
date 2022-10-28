import mongoose from 'mongoose'
import { getOrSetCache } from '../config/redis'

export interface Transaction {
  author: {
    cpf: string
    fullName: string
    phoneNumber: string
    birthDate: Date
  }
  creditCard: {
    number: number
    validity: Date
    cvv: number
  }
  value: string,
  status: "valid"
}

export class TransactionController {
  private _transactionCollection = mongoose.connection.collection<Transaction>('transactions')

  async findOne(id: string) {
    let _id: mongoose.Types.ObjectId | null

    try { _id = new mongoose.Types.ObjectId(id)}
    catch (error) { _id = null }

    const data = await getOrSetCache(`transactions:${id}`, async () => {
      return await this._transactionCollection.findOne({ _id })
    })
    
    return data
  }

  async findLastTransactions(quantity: number) {
    if(isNaN(quantity)) quantity=10
    
    return await getOrSetCache(`transactions?quantity=${quantity}`, async () => {
      return await this._transactionCollection.find().sort({ _id: -1 }).limit(quantity).toArray()
    })
  }
}