const WebSocket = require('ws');

// Create a WebSocket server
const wss = new WebSocket.Server({ port: 8080 });

// Handle WebSocket connections
wss.on('connection', ws => {
    console.log('Client connected');

    // Handle messages from clients
    ws.on('message', message => {
        console.log('Received message:', message);
        // Process received message if needed
    });

    // Handle WebSocket disconnections
    ws.on('close', () => {
        console.log('Client disconnected');
    });
});

console.log('WebSocket server running on port 8080');
