import { Connection, Channel, connect } from 'amqplib'

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

  async publishInQueue(queue: string, message: string): Promise<boolean> {
    return this._channel.sendToQueue(queue, Buffer.from(message))
  }
}