const http = require('http');
const websocket = require('websocket');

const server = http.createServer((req, res) => {
  // Handle other HTTP requests (if needed)
  res.writeHead(404);
  res.end();
});

server.listen(3000, () => {
  console.log('WebSocket server listening on port 3000');
});

const wsServer = new websocket.server({
  httpServer: server
});

const connections = []; // Array to store all active WebSocket connections

wsServer.on('request', (request) => {
  const connection = request.accept(null, request.origin);
  console.log('WebSocket connection accepted');
  connections.push(connection); // Store the new connection

  connection.on('close', () => {
    console.log('WebSocket connection closed');
    const index = connections.indexOf(connection);
    if (index !== -1) {
      connections.splice(index, 1); // Remove the closed connection from the array
    }
  });
});

const { spawn } = require('child_process');
const child = spawn('node', ['receive.js']); // Replace 'your_script_name.js' with the name of your Node.js script file.

child.stdout.on('data', (data) => {
  console.log(`Received data from script: ${data}`);
  const message = data.toString(); // Convert the data to a string
  sendToAll(message); // Send data to all WebSocket clients
});

child.stderr.on('data', (data) => {
  console.error(`Error from script: ${data}`);
});

child.on('close', (code) => {
  console.log(`Child process exited with code ${code}`);
  connections.forEach((connection) => {
    connection.close();
  });
});

function sendToAll(message) {
  connections.forEach((connection) => {
    connection.sendUTF(message);
  });
}
