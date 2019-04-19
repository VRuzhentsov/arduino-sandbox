const _ = require('underscore');
const { Stepper, Led: { RGB: RGBLed }, IMU } = require('johnny-five');
const { ioServer } = require('./ioServer');
const { stepperMotorThrottledCB } = require('./controllers/stepperMotorThrottled');

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

  ioServer.on('connection', (socket) => {
    console.log('Socket client connected:');

    socket.on('message.stepper', stepperMotorThrottledCB(stepper));
    socket.on('message.rgbled', (data) => {
      const { color } = data;
      console.log(color);
      rgb.color(color);
    });

    imu.on('change', function (changedObject, objectName) {
      const data = {
        accelerometer: _.pick(this.accelerometer, [
          'zeroV',
          'pitch',
          'roll',
          'x',
          'y',
          'z',
          'acceleration',
          'inclination',
          'orientation',
        ]),
        gyro: _.pick(this.gyro, [
          'x',
          'y',
          'z',
          'isCalibrated',
          'pitch',
          'rate',
          'roll',
          'yaw',
        ]),
        thermometer: _.pick(this.thermometer, [
          'celsius',
          'fahrenheit',
          'kelvin',
          'C',
          'F',
          'K',
          'freq',
        ]),
      };
      socket.emit('message.imu', data);
    });
  });

  rgb.color(currentColor);
};
