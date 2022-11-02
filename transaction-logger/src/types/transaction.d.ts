export interface Author {
  cpf: string
  fullName: string
  phoneNumber: string
  birthDate: Date
}

export interface CreditCard {
  number: number
  validity: Date
  cvv: number
}

export interface Transaction {
  author: Author
  creditCard: CreditCard
  value: string,
  status: 'valid' | 'invalid'
}