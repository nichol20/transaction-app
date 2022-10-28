import express, { NextFunction, Request, Response } from 'express'
import { connectToMongoDb } from './config/db'
import { connectToRedis } from './config/redis'
import { transactionRoutes } from './routes/transaction'

const app = express()
const PORT = process.env.PORT || 5000

app.use(express.json())
app.use(transactionRoutes)

// Global error handling
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.log(err.stack)
  res.status(500).send('Something broke!')
})

async function bootstrap() {
  try {
    await connectToMongoDb()
    await connectToRedis()
    app.listen(PORT, () => console.log(`Server is running on port: ${PORT}🥵🥶🤡`))
  } catch (error) {
    console.log(error)
    process.exit()
  }
}

bootstrap()