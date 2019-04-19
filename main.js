const SerialPort = require('serialport');
const { Board } = require('johnny-five');

const { httpServer, httpServerPort } = require('./src/httpServer');
const { app } = require('./src/app');


const main = () => {
  httpServer.listen(httpServerPort);

  console.log(`Server start listening on port: ${httpServerPort}`);

  const serialPort = new SerialPort('COM5', {
    baudRate: 57600,
  });

  const arduinoUno = new Board({
    port: serialPort,
    repl: true,
  });

  arduinoUno.on('error', function (error) {
    console.log(console.log(error, error.stack.split('\n')));
  });

  arduinoUno.on('ready', app);
};

main();
