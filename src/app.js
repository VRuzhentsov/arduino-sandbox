const { Led: { RGB: RGBLed } } = require('johnny-five');
const { ioServer } = require('./ioServer');

exports.app = () => {
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
};
