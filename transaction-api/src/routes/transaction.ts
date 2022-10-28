import express from 'express'
import { TransactionController } from '../controllers/TransactionController'

interface LatestQuery {
  quantity: string
}

export const transactionRoutes = express.Router()

transactionRoutes.get('/transactions/latest', async (req: express.Request<{},{},{}, LatestQuery>, res) => {
  const transactionController = new TransactionController
  const quantity = parseInt(req.query.quantity)
  const data = await transactionController.findLastTransactions(quantity)

  res.send(data)
})

transactionRoutes.get('/transactions/:id', async (req, res) => {
  const transactionController = new TransactionController
  const id = req.params.id
  const data = await transactionController.findOne(id)

  res.send(data)
})
