import { CreditCard } from "./models/CreditCard"
import { Person } from "./models/Person"
import { Transaction } from "./models/Transaction"
import RabbitmqServer from "./rabbitmqServer"
import { sleep } from './utils'

async function generateTransactions() {
  const rabbitmqServer = new RabbitmqServer(process.env.AMQP_SERVER_URI)
  await rabbitmqServer.start()
  await rabbitmqServer.assertQueue(process.env.QUEUE_NAME)

  while(true) {
    const person = new Person(
      Person.prototype.generateRandomCpf(), 
      Person.prototype.generateFullName(), 
      Person.prototype.generatePhoneNumber(), 
      Person.prototype.generateBirthDate()
    )
    const creditCard = new CreditCard(
      CreditCard.prototype.generateRandomCardNumber(), 
      CreditCard.prototype.generateRandomValidity(), 
      CreditCard.prototype.generateRandomCVV()
    )
    const transaction = new Transaction(
      person,
      creditCard,
      Transaction.prototype.generateRandomValue()
    )

    rabbitmqServer.publishInQueue(process.env.QUEUE_NAME, JSON.stringify(transaction))
    await sleep(1000)
  }
}

generateTransactions()