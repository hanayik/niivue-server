const httpServer = require('http').createServer() // part of nodejs standard lib
// socket.io is a npm installed package
// pass it the server instance
const socketio = require('socket.io')(httpServer, {
  cors: {origin: '*'}
})
// import individual handle functions. 
const registerEchoHandler = require('./handle_funcs/echo')

// define a SocketServer class that we can export and reuse
class SocketServer {
	// port=0 will find and reserve an open port on the system
  constructor(port=0) {
    this.port = port
    this.io = socketio
  }
	// start method on the SocketServer 
	// use like: let socketServer = new SocketServer(0)
	// socketServer.start()
  start() {
    let svr = httpServer.listen(this.port)
    this.port = svr.address().port
    this.io.on('connection', this.onConnection)
		console.log(`listening at ws://localhost:${this.port}`)
		return this
  }
  onConnection(socket) {
    registerEchoHandler(socketio, socket) // must use socketio rather than this.io here
  }
  quit() {
    this.io.close()
  }

}
module.exports.SocketServer = SocketServer

if (require.main === module) {
	const socketServer = new SocketServer()
	socketServer.start()
}


