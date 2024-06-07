const express = require("express");
const app = express();

app.use(express.static("public")); // uses the public folder for static files
// let rand = Math.floor(Math.random() * (3100 - 3000 + 1)) + 3000;
app.listen(3000);


const { WebSocketServer } = require('ws');

const wss = new WebSocketServer({ port: 8080 });

wss.on('connection', function connection(ws) {
  ws.on('error', console.error);

  ws.on('message', function message(data) {
    console.log('received: %s', data);
  });

  ws.send('something');
});



// const {Server} = require('net')

// const server = new Server(socket=> {
//   console.log('client connected')

//   // Attach listeners for the socket
//   socket.on('data', message => {
//     console.log('message')

//     // Write back to the client
//     socket.write('world')
//   })

//   // Send the client a message to disconnect from the server after a minute
//   setTimeout(() => socket.write('disconnect'), 5000)

//   socket.on('end', () => console.log('client disconnected'))
// })

// server.listen('localhost', () => console.log('listening'))
