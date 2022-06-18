module.exports = (io, socket) => {
  const handler = () => {
		io.to(socket.id).emit('echo', 'hi')
		/*
		const proc = spawn('echo hi', [], {shell: true})
		proc.on('close', (status)=>{
			console.log('closing')
			io.to(socket.id).emit('run', {
				'status': status,
			})
		})
		proc.stdout.on('data', (data)=>{
			console.log(data.toString('utf8'))
			io.to(socket.id).emit('stdout', {
				'stdout': data.toString('utf8'),
			})
		})
		proc.stderr.on('data', (data)=>{
			console.log(data.toString('utf8'))
			io.to(socket.id).emit('stderr', {
				'stderr': data.toString('utf8'),
			})
		})
		*/
  }
  socket.on('echo', handler) 
}

