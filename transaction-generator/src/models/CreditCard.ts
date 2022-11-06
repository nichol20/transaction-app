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

  private _generateValidCardNumber(): number {
    let cardNumber = ''
  
    for(let i = 0; i < 15; i++) {
      cardNumber += randomNumber(0, 9)
    }
    
    let n = parseInt(cardNumber + '0')
    let sum = 0
    
    while(n > 0) {
      let a = n % 10
      n = Math.floor(n/10)

      let b = (n % 10) * 2
      n = Math.floor(n/10)

      if(b > 9) b -= 9

      sum += a + b
    }

    let lastNumber = 10 - (sum % 10)

    return parseInt(cardNumber + lastNumber)
  }

  generateRandomCardNumber(): number {

    if(randomNumber(0, 100) < 80) return this._generateValidCardNumber()

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

