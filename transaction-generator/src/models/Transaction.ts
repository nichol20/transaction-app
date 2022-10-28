import { randomNumber } from "../utils"
import { CreditCard } from "./CreditCard"
import { Person } from "./Person"

export class Transaction {
  author: Person
  creditCard: CreditCard
  value: string

  constructor(author: Person, creditCard: CreditCard, value: string) {
    this.author = author
    this.creditCard = creditCard
    this.value = value
  }

  generateRandomValue(): string {
    return `$${randomNumber(0, 9999)}.${randomNumber(0, 9)}${randomNumber(0, 9)}`
  }
}