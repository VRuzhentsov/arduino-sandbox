const _ = require('underscore');
const {
  Stepper, Led: { RGB: RGBLed }, IMU, Servo,
} = require('johnny-five');
const { ioServer } = require('./ioServer');
const { stepperMotorThrottledCB } = require('./controllers/stepperMotorThrottled');
const { accelerometerSandbox } = require('./controllers/accelerometerSandbox');

exports.app = function () {
  console.log('UNO ready!');

  const stepperInstalled = false;
  let stepper;

  if (stepperInstalled) {
    stepper = new Stepper({
      type: Stepper.TYPE.FOUR_WIRE,
      stepsPerRev: 200,
      pins: [8, 10, 9, 11],
    });

    stepper.currentDegree = 0;
  }

  const currentColor = '000000';
  const rgb = new RGBLed([5, 6, 3]);

  const imu = new IMU({
    controller: 'MPU6050',
  });

  const servo = new Servo({
    pin: 10,
    type: 'continuous',
  });

  ioServer.on('connection', (socket) => {
    console.log('Socket client connected:');

    socket.on('message.stepper', stepperMotorThrottledCB(stepper));
    socket.on('message.rgbled', (data) => {
      const { color } = data;
      console.log(color);
      rgb.color(color);
    });

    imu.on('change', accelerometerSandbox(socket, servo, rgb));
  });

  rgb.color(currentColor);
};
