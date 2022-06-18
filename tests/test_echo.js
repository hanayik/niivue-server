const Client = require("socket.io-client")
const {SocketServer} = require("../src/main.js")
// initialize outer scoped variables to be assigned later
let socketServer
let clientSocket

// runs once before all tests in this file
// constructs an instance of our SocketServer class and starts it
beforeAll((done) => {
	// new socket server
	socketServer = new SocketServer(0)
	socketServer.start()
	// initialize a socket client for testing (used to send messages to the socket server)
	clientSocket = new Client(`http://localhost:${socketServer.port}`);
	// when the connection is established, call the 'done' Jest testing method so we don't spin our wheels here
	clientSocket.on("connect", done);
});

// runs once after all tests in this file. 
afterAll(() => {
	socketServer.quit()
	clientSocket.close();
});

// defines a test to run with the title 'echo'
test("echo", (done) => {
	// wait for the 'echo message'
	clientSocket.on("echo", (arg) => {
		// expect the value of the message (a simple string in this case) to be 'hi'
		expect(arg).toBe("hi");
		// call the Jest testing 'done' method
		done();
	});
	// emit the echo event from our test client (this will trigger the 'on' echo event we just set up above)
	clientSocket.emit('echo')
});
