const WebSocket = require('ws');

const PORT = process.env.PORT || 8080;

const wss = new WebSocket.Server({ port: PORT });

// Function to broadcast messages to all connected clients
const broadcast = (data, ws) => {
    wss.clients.forEach(client => {
        if (client !== ws && client.readyState === WebSocket.OPEN) {
            client.send(data);
        }
    });
};

// Event listener for new connections
wss.on('connection', (ws) => {
    console.log('Client connected');

    // Send a welcome message to the newly connected client
    ws.send('Welcome to the WebSocket server!');

    // Event listener for when a message is received from a client
    ws.on('message', (message) => {
        console.log(`Received message: ${message}`);

        // Broadcast the received message to all other connected clients
        broadcast(message, ws);
    });

    // Event listener for when the connection is closed
    ws.on('close', () => {
        console.log('Client disconnected');
    });

    // Event listener for errors
    ws.on('error', (error) => {
        console.error(`WebSocket error: ${error}`);
    });
});

console.log('WebSocket server is running on ws://localhost:8080');
