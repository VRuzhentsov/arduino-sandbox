const VirtualSerialPort = require('udp-serial').SerialPort;
const net = require('net');
const {Board} = require('firmata');
const {Board: J5Board} = require("johnny-five");
const SerialPort = require('serialport');
const io = require('socket.io-client');
console.log('init')

const options = {
    host: '192.168.193.10',
        port: 8080
};
const WebSocket = require('ws');
const socket = new WebSocket('ws://192.168.193.10:81');
// const socket = io('ws://192.168.193.10:81');

socket.on('open', (socket) => {
   console.log('socket connected')
});

// const virtualSerialPort = new VirtualSerialPort(options);

// const io  = new Board(virtualSerialPort);

// var client = net.connect(options, function() { //'connect' listener
//     console.log('connected to server!');
//
//     var socketClient = client;
//
//     //we can use the socketClient instead of a serial port as our transport
//     var io = new Board(socketClient);
//
//     io.on('ready', function(){
//         console.log('io ready');
//         io.isReady = true;
//
//         var board = new J5Board({io: io, repl: true});
//
//         board.on('ready', function(){
//             console.log('five ready');
//
//             //Full Johnny-Five support here:
//
//
//
//         });
//     });
//
// });
