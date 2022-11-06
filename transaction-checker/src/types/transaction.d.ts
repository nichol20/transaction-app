import { TransactionStatus } from "../enums/TransactionStatus"

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
  status: TransactionStatus
}