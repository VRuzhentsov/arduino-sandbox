const SerialPort = require('serialport');
const { Board } = require('johnny-five');

const { httpServer, httpServerPort } = require('./src/httpServer');
const { app } = require('./src/app');


const main = () => {
  httpServer.listen(httpServerPort);

  console.log(`Server start listening on port: ${httpServerPort}`);

  const serialPort = new SerialPort('COM5', {
    baudRate: 115200,
  });

  const arduinoUno = new Board({
    port: serialPort,
    repl: true,
  });

  arduinoUno.on('ready', app);
};

main();
