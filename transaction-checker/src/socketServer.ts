import { Server } from 'socket.io'

export default class SocketServer {
  private _io: Server

  constructor(port: number) {
    this._io = new Server(port, {
      cors: {
        origin: ["http://localhost:3000"]
      }
    })
    this._io.on('connection', socket => console.log('Web socket connection created'))
  }

  emit(eventName: string, ...args: any[]) {
    this._io.sockets.emit(eventName, ...args)
  }
}