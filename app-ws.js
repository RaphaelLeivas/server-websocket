const WebSocket = require('ws');

module.exports = (server) => {
    const wss = new WebSocket.Server({
        server
    });

    wss.broadcast = function broadcast(msg) {
        console.log(`Received message: ${msg}`);
        wss.clients.forEach(function each(client) {
            client.send("Message received!");
        });
    };

    wss.on('connection', function(ws, req) {
        ws.on('message', data => wss.broadcast(data));
        ws.on('error', error => console.error(`WS error: ${err.message}`));
        console.log(`Connection sucessfully established.`);
    });

    console.log(`App Web Socket Server is running!`);
    return wss;
}