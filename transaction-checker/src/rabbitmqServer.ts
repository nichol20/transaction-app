import { Connection, Channel, connect, Message } from 'amqplib'

export default class RabbitmqServer {
  private _conn: Connection
  private _channel: Channel

  constructor(private _uri: string){}

  async start(): Promise<void> {
    this._conn = await connect(this._uri)
    this._channel = await this._conn.createChannel()
  }

  async assertQueue(queue: string): Promise<void> {
    this._channel.assertQueue(queue)
  }

  async consume(queue: string, callback: (messge: Message) => void) {
    return this._channel.consume(queue, message => {
      if(message) {
        callback(message)
      }
    })
  }

  ack(message: Message) {
    this._channel.ack(message)
  }
}