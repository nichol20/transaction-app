import { TransactionStatus } from "../enums/TransactionStatus"
import { TransactionModel } from "../models/TransactionModel"

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

export class TransactionController {

  private _isCreditCardNumberValid(number: number): boolean {
    let sum = 0

    while(number > 0) {
      let a = number % 10
      number = Math.floor(number/10)

      let b = (number % 10) * 2
      number = Math.floor(number/10)

      if(b > 9) b -= 9

      sum += a + b
    }
    
    return sum % 10 === 0
  }

  private _isCreditCardValidityValid(validity: Date): boolean {
    return validity.getTime() > Date.now()
  }

  private _isCpfValid(cpf: string): boolean {
    let sum = 0
    let rest: number
    // '123.456.789-09' -> '12345678909'
    let strCpf = cpf.split(/[.-]/).join('')

    if(strCpf.length !== 11 || parseInt(strCpf) === 0) return false

    // first 'Digito Verificador'
    for(let i = 0; i < 9; i++) {
      sum += parseInt(strCpf.substring(i, i+1)) * (10 - i)
    }

    rest = sum * 10 % 11
    rest = rest === 10 ? 0 : rest

    if(rest !== parseInt(strCpf[9])) return false

    // reset sum
    sum = 0

    // second 'Digito Verificador'
    for(let i = 0; i < 10; i++) {
      sum += parseInt(strCpf.substring(i, i+1)) * (11 - i)
    }

    rest = sum * 10 % 11
    rest = rest === 10 ? 0 : rest

    return rest === parseInt(strCpf[10])
  }

  isTransactionValid(transaction: Transaction): boolean {
    return this._isCreditCardNumberValid(transaction.creditCard.number)
      && this._isCreditCardValidityValid(transaction.creditCard.validity)
      && this._isCpfValid(transaction.author.cpf)
  }

  async save(transaction: Transaction): Promise<Transaction> {
    return TransactionModel.create(transaction)
  }
}