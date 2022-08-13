let io;

module.exports = {
    init: httpServer => {
       io = require('socket.io')(httpServer, {
         cors: {
           prigin: 'http://localhost:3000',
           methods: ['GET', 'POST', "PATCH", "DELETE"],
           credentials: true,
         },
       });
       return io;
    },
    getIo: () =>{ 
        if(!io) throw new Error('Socket not initialized')
        return io
    }
}