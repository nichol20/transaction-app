import { randomNumber } from "../utils"

const firstNames = ["Jacob","Michael","Ethan","Joshua","Daniel","Alexander","Anthony","William","Christopher","Matthew","Jayden","Andrew","Joseph", "Emma","Isabella","Emily","Madison","Ava","Olivia","Sophia","Abigail","Elizabeth","Chloe","Samantha"]

const surnames = ["Smith","Johnson","Williams","Brown","Jones","Miller","Davis","Garcia","Rodriguez","Wilson","Martinez","Anderson","Taylor","Thomas","Hernandez","Moore","Martin","Jackson","Thompson","White","Lopez","Lee","Gonzalez","Harris","Clark","Lewis","Robinson","Walker","Perez","Hall","Young","Allen","Sanchez","Wright","King","Scott","Green","Baker","Adams","Nelson","Hill","Ramirez"]

export class Person {
  cpf: string
  fullName: string
  phoneNumber: string
  birthDate: Date

  constructor(cpf: string, fullName: string, phoneNumber: string, birthDate: Date){
    this.cpf = cpf
    this.fullName = fullName
    this.phoneNumber = phoneNumber
    this.birthDate = birthDate
  }

  private _generateValidCpf() {
    let nums = []
    let str = ''
    let sum = 0

    for(let i = 0; i < 9; i++) {
      const rn = randomNumber(0, 9)
      nums.push(rn)
      sum += rn * (10 - i)
      if(i % 3 === 0 && i !== 0) str += '.'
      str += rn
    }

    let fd = sum * 10 % 11
    fd = fd === 10 ? 0 : fd
    nums.push(fd)
    str += '-' + fd
    sum = 0

    for(let i = 0; i < 10; i++) {
      sum += nums[i] * (11 - i)
    }

    let sd = sum * 10 % 11
    sd = sd === 10 ? 0 : sd
    str += sd

    return str
  }

  generateRandomCpf(): string {
    if(randomNumber(0, 100) < 80) return this._generateValidCpf()

    const n1 = randomNumber(100, 999)
    const n2 = randomNumber(100, 999)
    const n3 = randomNumber(100, 999)
    const dig = randomNumber(10, 99)

    return `${n1}.${n2}.${n3}-${dig}`
  }

  generateFullName(): string {
    const firstName = firstNames[Math.floor(Math.random() * firstNames.length)]
    const lastName = surnames[Math.floor(Math.random() * surnames.length)]

    return `${firstName} ${lastName}`
  }

  generatePhoneNumber(): string {
    const areaCode = randomNumber(11, 99)
    const subscriberNumber = [randomNumber(1000, 9999), randomNumber(1000, 9999)]

    return `+55 (${areaCode}) 9${subscriberNumber[0]}-${subscriberNumber[1]}`
  }

  generateBirthDate(): Date {
    const year = randomNumber(1950, new Date().getFullYear() - 18)
    const month = randomNumber(1, 12)
    const day = randomNumber(1, 30)

    return new Date(year, month, day)
  }
}