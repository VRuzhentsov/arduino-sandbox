const {Board: FirmataBoard} = require('firmata');
const {Board: J5Board, Led: {RGB: RGBLed}} = require("johnny-five");
const {SerialPort: VirtualSerialPort} = require('udp-serial');

const app = require('http').createServer(handler)
const ioServer = require('socket.io')(app);
const fs = require('fs');

const path = require('path');

app.listen(8080);

function handler (request, response) {
    console.log('request starting...');
    const clientFolder = '/client-app';

    var filePath =`.${clientFolder}${request.url}`;
    if (filePath == `.${clientFolder}/`)
        filePath = `.${clientFolder}/index.html`;

    var extname = path.extname(filePath);
    var contentType = 'text/html';
    switch (extname) {
        case '.js':
            contentType = 'text/javascript';
            break;
        case '.css':
            contentType = 'text/css';
            break;
        case '.json':
            contentType = 'application/json';
            break;
        case '.png':
            contentType = 'image/png';
            break;
        case '.jpg':
            contentType = 'image/jpg';
            break;
        case '.wav':
            contentType = 'audio/wav';
            break;
    }

    fs.readFile(filePath, function(error, content) {
        if (error) {
            if(error.code == 'ENOENT'){
                fs.readFile('./404.html', function(error, content) {
                    response.writeHead(200, { 'Content-Type': contentType });
                    response.end(content, 'utf-8');
                });
            }
            else {
                response.writeHead(500);
                response.end('Sorry, check with the site admin for error: '+error.code+' ..\n');
                response.end();
            }
        }
        else {
            response.writeHead(200, { 'Content-Type': contentType });
            response.end(content, 'utf-8');
        }
    });

}

//create the udp serialport and specify the host and port to connect to
const UDPSerialPort = new VirtualSerialPort({
    host: '192.168.4.1',
    type: 'udp4',
    port: 1025
});
console.log('init');

const nodeMCUBoard = new FirmataBoard(UDPSerialPort);



nodeMCUBoard.once('ready', function () {
    console.log('NodeMCU ready!');
    console.log(
        nodeMCUBoard.firmware.name + "-" +
        nodeMCUBoard.firmware.version.major + "." +
        nodeMCUBoard.firmware.version.minor
    );
    nodeMCUBoard.isReady = true;

    const arduinoUno = new J5Board({
        io: nodeMCUBoard,
        timeout: 1e5,
        repl: false
    });

    arduinoUno.on('ready', function () {
        console.log('UNO ready!');

        let currentColor = '000000';
        const rgb = new RGBLed([5, 6, 3]);

        ioServer.on('connection', function (socket) {
            socket.on('message', function (data) {
                const {color} = data
                console.log(color);
                rgb.color(color);
            });
        });

        // this.loop(100, function () {
        //     const countedColor = '112233';
            console.log('countedColor', currentColor);
            rgb.color(currentColor);
        // });
    });

});
