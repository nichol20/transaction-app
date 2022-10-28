import { model, Schema } from 'mongoose'
import { Transaction } from '../controllers/TransactionController'

const transactionSchema = new Schema<Transaction>({
  author: {
    cpf: { type: String, required: true },
    fullName: { type: String, required: true },
    phoneNumber: { type: String, required: true},
    birthDate: { type: Date, required: true }
  },
  creditCard: {
    number: { type: Number, required: true },
    validity: { type: Date, required: true },
    cvv: { type: Number, required: true }
  },
  value: { type: String, required: true },
  status: { type: String, required: true }
})

export const TransactionModel = model<Transaction>('Transaction', transactionSchema)