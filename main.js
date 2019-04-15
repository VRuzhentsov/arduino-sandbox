const SerialPort = require('serialport');
const { Board, Led: { RGB: RGBLed } } = require('johnny-five');

const http = require('http');
const socketIo = require('socket.io');

const { router } = require('./src/router/index');

const app = http.createServer(router);
const ioServer = socketIo(app);

app.listen(8080);

console.log('init');

const serialPort = new SerialPort('COM4', {
  baudRate: 115200,
});

const arduinoUno = new Board({
  port: serialPort,
  repl: true,
});

arduinoUno.on('ready', () => {
  console.log('UNO ready!');

  const currentColor = '000000';
  const rgb = new RGBLed([5, 6, 3]);

  ioServer.on('connection', (socket) => {
    console.log('Socket client connected:');
    socket.on('message', (data) => {
      const { color } = data;
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
