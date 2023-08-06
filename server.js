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

wsServer.on('request', (request) => {
  const connection = request.accept(null, request.origin);

  console.log('WebSocket connection accepted');

  const { spawn } = require('child_process');
  const child = spawn('node', ['receive.js']); // Replace 'your_script_name.js' with the name of your Node.js script file.

  child.stdout.on('data', (data) => {
    console.log(`Received data from script: ${data}`);
    connection.sendUTF(data); // Send data to the WebSocket client
  });

  child.stderr.on('data', (data) => {
    console.error(`Error from script: ${data}`);
  });

  child.on('close', (code) => {
    console.log(`Child process exited with code ${code}`);
    connection.close();
  });
});

