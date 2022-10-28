import { connectToMongoDb } from "./config/db"
import { Transaction, TransactionController } from "./controllers/TransactionController"
import { TransactionStatus } from "./enums/TransactionStatus"
import RabbitmqServer from "./rabbitmqServer"
import SocketServer from "./socketServer"

async function bootstrap() {
  const rabbitmqServer = new RabbitmqServer(process.env.AMQP_SERVER_URI)
  const socketServer = new SocketServer(5000)
  
  await rabbitmqServer.start()
  await rabbitmqServer.assertQueue(process.env.QUEUE_NAME)
  await connectToMongoDb()

  rabbitmqServer.consume(process.env.QUEUE_NAME, async message => {
    const transactionController = new TransactionController
    const jsonContent = JSON.parse(message.content.toString())
    const newTransaction: Transaction = {
      ...jsonContent,
      status: TransactionStatus.UNDETERMINED,
      author: {
        ...jsonContent.author,
        birthDate: new Date(jsonContent.author.birthDate)
      },
      creditCard: {
        ...jsonContent.creditCard,
        validity: new Date(jsonContent.creditCard.validity)
      }
    }

    if(transactionController.isTransactionValid(newTransaction)) {
      newTransaction.status = TransactionStatus.VALID  
      await transactionController.save(newTransaction)
    } else {
      newTransaction.status = TransactionStatus.INVALID
    }

    socketServer.emit('new-transaction', newTransaction)
    rabbitmqServer.ack(message)
  })
}

bootstrap()