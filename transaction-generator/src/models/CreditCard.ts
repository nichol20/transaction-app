import { randomNumber } from '../utils'

export class CreditCard {
  number: number
  validity: Date
  cvv: number

  constructor(number: number, validity: Date, cvv: number) {
    this.number = number
    this.validity = validity
    this.cvv = cvv
  }

  generateRandomCardNumber(): number {
    let cardNumber = ''
    for(let i = 0; i < 4; i++ ) {
      const rn = randomNumber(1000, 9999)
      cardNumber += String(rn)
    }
  
    return parseInt(cardNumber)
  }

  generateRandomCVV(): number {
    return randomNumber(100, 999)
  }

  generateRandomValidity(): Date {
    const year = randomNumber(1600, 3000)
    const month = randomNumber(1, 12)

    return new Date(year, month)
  }
}

