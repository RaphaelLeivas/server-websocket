const WebSocket = require('ws');

function onError(ws, err) {
    console.error(`WS error: ${err.message}`);
}

function onMessage(ws, data) {
    console.log(`Message received: ${data}`);
    ws.send(`recebido!`);
}

function onConnection(ws, req) {
    ws.on('message', data => onMessage(ws, data));
    ws.on('error', error => onError(ws, error));
    console.log(`Connection sucessfully established.`);
}

module.exports = (server) => {
    const wss = new WebSocket.Server({
        server
    });

    wss.on('connection', onConnection);

    console.log(`App Web Socket Server is running!`);
    return wss;
}