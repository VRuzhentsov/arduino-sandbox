const { Stepper, Led: { RGB: RGBLed } } = require('johnny-five');
const { ioServer } = require('./ioServer');
const { stepperMotorThrottledCB } = require('./controllers/stepperMotorThrottled');

exports.app = () => {
  console.log('UNO ready!');

  const stepper = new Stepper({
    type: Stepper.TYPE.FOUR_WIRE,
    stepsPerRev: 200,
    pins: [8, 10, 9, 11],
  });
  const currentColor = '000000';
  const rgb = new RGBLed([5, 6, 3]);

  stepper.currentDegree = 0;

  ioServer.on('connection', (socket) => {
    console.log('Socket client connected:');

    socket.on('message.stepper', stepperMotorThrottledCB(stepper));
    socket.on('message.rgbled', (data) => {
      const { color } = data;
      console.log(color);
      rgb.color(color);
    });
  });

  rgb.color(currentColor);
};
